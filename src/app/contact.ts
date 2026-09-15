import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon } from './icon';
import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { services } from './content';
@Component({
  selector: 'app-contact',
  imports: [Icon, FormsModule, RouterLink],
  templateUrl: './contact.html',
})
export class Contact {
  services = services;
  private platform = inject(PLATFORM_ID);
  available = signal(false);
  sending = signal(false);
  delivered = signal(false);
  deliveryError = signal('');
  website = '';
  private lastPayload = '';
  private requestId = '';
  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {
      fetch('/api/contact')
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => this.available.set(data?.available === true))
        .catch(() => {});
    }
  }
  async send() {
    if (this.sending() || this.delivered()) return;
    const payload = JSON.stringify({ ...this.model, website: this.website });
    if (payload !== this.lastPayload) {
      this.requestId = crypto.randomUUID();
      this.lastPayload = payload;
    }
    this.sending.set(true);
    this.deliveryError.set('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...this.model, website: this.website, requestId: this.requestId }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || data.ok !== true)
        throw new Error(
          data.error || 'Delivery could not be confirmed. Please use the email option below.',
        );
      this.delivered.set(true);
    } catch (error) {
      this.deliveryError.set(
        error instanceof Error && error.name !== 'TimeoutError'
          ? error.message
          : 'Delivery could not be confirmed. Retry or use the email option below.',
      );
    } finally {
      this.sending.set(false);
    }
  }
  sent = signal(false);
  model = {
    name: '',
    email: '',
    company: '',
    service: inject(ActivatedRoute).snapshot.queryParamMap.get('service') || '',
    budget: 'Let’s discuss',
    message: '',
  };
  get brief() {
    return `Project enquiry for EmloX Tech\n\nName: ${this.model.name}\nEmail: ${this.model.email}\nCompany: ${this.model.company || 'Not specified'}\nInterested in: ${this.model.service}\nBudget: ${this.model.budget}\n\n${this.model.message}`;
  }
  get mailto() {
    return (
      'mailto:info@emloxtech.com?subject=' +
      encodeURIComponent('Project enquiry — ' + this.model.name) +
      '&body=' +
      encodeURIComponent(this.brief)
    );
  }
  submit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.sent.set(true);
    setTimeout(() => document.getElementById('brief-heading')?.focus(), 0);
  }
  download() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([this.brief], { type: 'text/plain' }));
    a.download = 'emlox-project-brief.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
