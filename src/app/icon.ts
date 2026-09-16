import { Component, input } from '@angular/core';

const paths = {
  'arrow-right': 'M4 12h16m-6-6 6 6-6 6',
  'arrow-left': 'M20 12H4m6-6-6 6 6 6',
  mail: 'M4 5h16v14H4z M4 6l8 7 8-7',
  phone:
    'M6.6 3.5h2.6l1.6 4.2-2 1.4a11.5 11.5 0 0 0 6.1 6.1l1.4-2 4.2 1.6v2.6a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z',
  pin: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  message: 'M21 11a8 8 0 0 1-8 8H8l-5 3V5a2 2 0 0 1 2-2h8a8 8 0 0 1 8 8Z M7 8h10M7 12h7',
  chat: 'M7 4h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-5l-5 4v-4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',
  cloud: 'M6 18a4 4 0 0 1-1-7.9 7 7 0 0 1 13.5-1A4.5 4.5 0 0 1 18.5 18Z',
  sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z M20 2v4m-2-2h4',
  pen: 'm4 16 12-12 4 4L8 20H4zM13 7l4 4',
  check: 'm5 12 4 4L19 6',
  file: 'M14 2H5v20h14V7zM14 2v5h5M8 12h8M8 16h6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  book: 'M12 5v16M12 5C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 1Z',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-2 5 6 6',
  growth: 'm3 17 6-6 4 4 8-10M15 5h6v6',
  users:
    'M10 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M2 21v-3a5 5 0 0 1 10 0v3M17 4a3 3 0 0 1 0 6m-2 4a5 5 0 0 1 7 4v3',
  home: 'm3 10 9-7 9 7v11h-7v-7h-4v7H3z',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  close: 'M6 6l12 12M18 6 6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  plus: 'M12 5v14M5 12h14',
} as const;
export type IconName = keyof typeof paths;

@Component({
  selector: 'app-icon',
  host: { 'aria-hidden': 'true' },
  template: `<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    focusable="false"
  >
    <path [attr.d]="paths[name()]" />
  </svg>`,
  styles: `
    :host {
      display: inline-flex;
      width: 1em;
      height: 1em;
      flex-shrink: 0;
      vertical-align: -0.15em;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  name = input<IconName>('arrow-right');
  readonly paths = paths;
}
