import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';
const valid = { name: 'Example Tester', email: 'tester@example.com', company: '', service: 'Mobile application development', budget: 'Let’s discuss', message: 'A test enquiry about an application.', website: '', requestId: '12345678-1234-1234-1234-123456789012' };
async function request(method='POST', body=valid, extra={}) {
  const req = {method, body, headers:{origin:'https://www.emloxtech.com','content-type':'application/json','x-forwarded-for':'test-client',...extra}};
  const res = { headers:{}, setHeader(k,v){this.headers[k]=v}, status(code){this.code=code;return this}, json(data){this.data=data;return this} };
  await handler(req,res); return res;
}
test('contact validation, provider failure, retry identity and throttling', async () => {
  const originalFetch=globalThis.fetch;
  const oldKey=process.env.RESEND_API_KEY, oldFrom=process.env.CONTACT_FROM;
  try {
    delete process.env.RESEND_API_KEY; delete process.env.CONTACT_FROM;
    assert.equal((await request('GET')).data.available,false);
    assert.equal((await request()).code,503);
    assert.equal((await request('DELETE')).code,405);
    assert.equal((await request('POST',valid,{origin:'https://unrelated.example'})).code,403);
    assert.equal((await request('POST',{...valid,email:'bad\r\nBcc:other@example.com'})).code,400);
    assert.equal((await request('POST',{...valid,message:'short'})).code,400);
    assert.equal((await request('POST',{...valid,website:'spam'})).code,400);
    assert.equal((await request('POST',valid,{'content-length':'13000'})).code,413);
    process.env.RESEND_API_KEY='test-only'; process.env.CONTACT_FROM='Website <contact@example.com>';
    let payload, headers;
    globalThis.fetch=async (url, init) => { assert.equal(url,'https://api.resend.com/emails'); payload=JSON.parse(init.body); headers=init.headers; return {ok:true,json:async()=>({id:'test-id'})}; };
    assert.equal((await request()).data.ok,true);
    assert.deepEqual(payload.to,['info@emloxtech.com']);
    assert.equal(payload.reply_to,valid.email);
    assert.equal(headers['Idempotency-Key'],valid.requestId);
    assert.equal(payload.html,undefined);
    globalThis.fetch=async()=>({ok:false});
    assert.equal((await request()).code,502);
    globalThis.fetch=async()=>{throw new Error('network failure')};
    assert.equal((await request()).code,502);
    await request(); await request();
    assert.equal((await request()).code,429);
  } finally { globalThis.fetch=originalFetch; if(oldKey===undefined)delete process.env.RESEND_API_KEY;else process.env.RESEND_API_KEY=oldKey; if(oldFrom===undefined)delete process.env.CONTACT_FROM;else process.env.CONTACT_FROM=oldFrom; }
});
