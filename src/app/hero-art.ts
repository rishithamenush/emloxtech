import { Component } from '@angular/core';
@Component({
  selector: 'app-hero-art',
  template: `<div class="art-scene">
    <div class="art-grid"></div>
    <div class="art-top"><span>THE EMLOX EFFECT</span><span>01 — ∞</span></div>
    <svg
      class="ribbon-art"
      viewBox="0 0 600 600"
      role="img"
      aria-label="Sculptural interlocking lime ribbons forming an abstract X"
    >
      <defs>
        <linearGradient id="ribbonA" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#f0ff9a" />
          <stop offset=".25" stop-color="#d1f769" />
          <stop offset=".52" stop-color="#789f26" />
          <stop offset=".72" stop-color="#d6fc77" />
          <stop offset="1" stop-color="#91b838" />
        </linearGradient>
        <linearGradient id="ribbonB" x1="0" y1="1" x2="1" y2="0">
          <stop stop-color="#74932c" />
          <stop offset=".28" stop-color="#d0ef84" />
          <stop offset=".49" stop-color="#f0ffc1" />
          <stop offset=".7" stop-color="#a7ce54" />
          <stop offset="1" stop-color="#496021" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="5" dy="22" stdDeviation="17" flood-color="#000" flood-opacity=".4" />
        </filter>
      </defs>
      <g filter="url(#shadow)" transform="translate(300 300) rotate(-18) translate(-300 -300)">
        <path
          d="M143 96 C210 50 251 113 300 209 L459 471 C475 503 432 548 395 510 L199 207 C177 172 156 147 143 96Z"
          fill="url(#ribbonA)"
        />
        <path
          d="M446 96 C492 126 469 181 424 251 L216 499 C188 535 126 506 151 461 L355 162 C385 119 412 98 446 96Z"
          fill="url(#ribbonB)"
        />
        <path
          d="M143 96 C184 83 211 121 233 160 L423 481"
          fill="none"
          stroke="#efffb9"
          stroke-opacity=".65"
          stroke-width="2"
        />
        <path
          d="M446 96 C454 141 429 171 405 204 L175 485"
          fill="none"
          stroke="#efffb9"
          stroke-opacity=".55"
          stroke-width="2"
        />
      </g>
    </svg>
    <div class="art-cross cross-one">+</div>
    <div class="art-cross cross-two">+</div>
    <div class="art-bottom">
      <span>WHERE IDEAS<br />TAKE A NEW SHAPE.</span
      ><span class="art-badge">DESIGN ×<br />TECHNOLOGY</span>
    </div>
  </div>`,
})
export class HeroArt {}
