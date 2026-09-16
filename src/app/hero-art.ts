import { Component } from '@angular/core';
// Striped line-art rendering of the EmloX ribbon X: gray rules clipped to the mark,
// with a single accent rule crossing it.
const rows = Array.from({ length: 23 }, (_, i) => 92 + i * 19);
@Component({
  selector: 'app-hero-art',
  template: `<svg class="stripe-mark" viewBox="93 82 435 440" aria-hidden="true" focusable="false">
    <defs>
      <!-- clipPath accepts shapes only (no <g>), so each path carries the logo transform. -->
      <clipPath id="stripe-x">
        <path
          [attr.transform]="mark"
          d="M143 96 C210 50 251 113 300 209 L459 471 C475 503 432 548 395 510 L199 207 C177 172 156 147 143 96Z"
        />
        <path
          [attr.transform]="mark"
          d="M446 96 C492 126 469 181 424 251 L216 499 C188 535 126 506 151 461 L355 162 C385 119 412 98 446 96Z"
        />
      </clipPath>
    </defs>
    <g clip-path="url(#stripe-x)">
      @for (y of rows; track y; let i = $index) {
        <rect
          class="stripe"
          [class.stripe-accent]="i === 7"
          x="60"
          [attr.y]="y"
          width="500"
          [attr.height]="i === 7 ? 6 : 8"
          [style.animation-delay.ms]="i * 28"
        />
      }
    </g>
  </svg>`,
})
export class HeroArt {
  rows = rows;
  mark = 'translate(310.5 0) scale(1.22 1) translate(-310.5 0) rotate(-2.12 307 302)';
}
