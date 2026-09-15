import { Component, input } from '@angular/core';
// Vector marks for the field-notes cards. Glyph characters rendered at a fixed px size
// depended on the device's fonts and could spill out of the card; these scale with it.
@Component({
  selector: 'app-insight-art',
  template: `<svg viewBox="0 0 100 100" aria-hidden="true">
    @switch (index() % 3) {
      @case (0) {
        <g fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="square">
          <path d="M22 84 L76 20" />
          <path d="M50 26 L78 18 L72 46" />
        </g>
      }
      @case (1) {
        <g stroke="currentColor" stroke-width="7">
          <path d="M50 6 V94" />
          <path d="M6 50 H94" />
          <path d="M19 19 L81 81" />
          <path d="M81 19 L19 81" />
        </g>
      }
      @default {
        <path d="M50 8 L92 50 L50 92 L8 50Z" fill="none" stroke="currentColor" stroke-width="4.5" />
        <path d="M50 27 L73 50 L50 73 L27 50Z" fill="currentColor" />
      }
    }
  </svg>`,
})
export class InsightArt {
  index = input(0);
}
