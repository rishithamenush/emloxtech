import { Component, input } from '@angular/core';

@Component({
  selector: 'app-insight-art',
  template: `<svg viewBox="0 0 400 240" aria-hidden="true">
    @switch (index() % 3) {
      @case (0) {
        <rect width="400" height="240" fill="#e1e7d9" />
        <path
          d="M0 48H400M0 96H400M0 144H400M0 192H400M48 0V240M96 0V240M144 0V240M192 0V240M240 0V240M288 0V240M336 0V240M384 0V240"
          stroke="#cdd7c3"
          stroke-width=".6"
        />
        <g transform="translate(56 27) rotate(-7 125 92)">
          <rect x="5" y="8" width="245" height="177" rx="9" fill="#bdcbb0" />
          <rect width="245" height="177" rx="9" fill="#fafbf6" stroke="#ccd5c2" />
          <text x="19" y="27" fill="#7b876e" font-size="8" letter-spacing="1.4">
            THE PRODUCT BRIEF
          </text>
          <text x="19" y="56" fill="#293a26" font-size="21" font-weight="600">
            Start with the why.
          </text>
          <path d="M19 73H219" stroke="#dfe5d7" />
          <circle cx="26" cy="96" r="7" fill="#e2ebd5" />
          <path d="m23 96 2 2 4-4" fill="none" stroke="#587f1e" stroke-width="1.5" />
          <text x="43" y="99" fill="#526149" font-size="10">Understand the problem</text>
          <circle cx="26" cy="123" r="7" fill="#e2ebd5" />
          <path d="m23 123 2 2 4-4" fill="none" stroke="#587f1e" stroke-width="1.5" />
          <text x="43" y="126" fill="#526149" font-size="10">Define the first release</text>
          <rect x="19" y="147" width="133" height="5" rx="2.5" fill="#e1e6d9" />
        </g>
        <g transform="translate(260 142) rotate(8)">
          <rect width="104" height="65" rx="7" fill="#587f1e" />
          <text x="13" y="22" fill="#e7f3d2" font-size="8">LESS GUESSWORK.</text>
          <text x="13" y="43" fill="#fff" font-size="13" font-weight="500">More direction ↗</text>
        </g>
      }
      @case (1) {
        <rect width="400" height="240" fill="#233429" />
        <g fill="none" stroke="#3c5140">
          <circle cx="200" cy="120" r="102" />
          <circle cx="200" cy="120" r="77" />
        </g>
        <g fill="none" stroke="#8baa67" stroke-width="1.5">
          <path
            d="M95 76H135Q147 76 147 90V110H164M95 171H135Q147 171 147 157V132H164M236 120H261Q274 120 274 104V76H302M274 120V167H302"
          />
        </g>
        <rect x="35" y="54" width="74" height="45" rx="7" fill="#f0f4e8" />
        <path
          d="M48 69H78M48 76H93M48 83H83"
          stroke="#81916f"
          stroke-width="3"
          stroke-linecap="round"
        />
        <rect x="35" y="150" width="74" height="45" rx="7" fill="#f0f4e8" />
        <path d="M49 165H95M49 174H95M61 159V185M78 159V185" stroke="#98a789" />
        <rect x="160" y="83" width="80" height="80" rx="20" fill="#b5de77" />
        <path
          d="M181 131l11-26h7l11 26m-26-7h21m12-19v26"
          stroke="#2d4226"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />
        <rect x="297" y="53" width="70" height="46" rx="7" fill="#344c38" stroke="#638350" />
        <path
          d="m321 76 7 7 14-15"
          stroke="#c5e792"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />
        <rect x="297" y="145" width="70" height="46" rx="7" fill="#344c38" stroke="#638350" />
        <circle cx="332" cy="161" r="6" fill="#c5e792" />
        <path d="M320 180q0-13 12-13t12 13" fill="#c5e792" />
        <text x="160" y="191" font-size="8" fill="#bacbb0" letter-spacing="1.1">
          A HUMAN IN THE LOOP
        </text>
        <circle cx="147" cy="110" r="3" fill="#c5e792" />
        <circle cx="274" cy="120" r="3" fill="#c5e792" />
      }
      @default {
        <rect width="400" height="240" fill="#e9e5da" />
        <g transform="translate(50 29) rotate(-5 150 95)">
          <rect x="6" y="7" width="300" height="186" rx="10" fill="#cecbbb" />
          <rect width="300" height="186" rx="10" fill="#fafaf6" stroke="#d6d6c9" />
          <text x="18" y="24" fill="#76816c" font-size="8" letter-spacing="1.1">
            A SHARED VISUAL LANGUAGE
          </text>
          <path d="M18 35H282" stroke="#e0e4d7" />
          <text x="17" y="103" fill="#293b28" font-size="61" letter-spacing="-4">Aa</text>
          <text x="21" y="123" fill="#7b8572" font-size="7">TYPE / SPACE / COLOUR</text>
          <rect x="133" y="52" width="43" height="44" rx="8" fill="#283d2b" />
          <rect x="184" y="52" width="43" height="44" rx="8" fill="#587f1e" />
          <rect x="235" y="52" width="43" height="44" rx="8" fill="#c5e693" />
          <rect x="133" y="109" width="90" height="27" rx="5" fill="#587f1e" />
          <text x="151" y="126" font-size="9" fill="white">Get started ↗</text>
          <rect x="233" y="109" width="45" height="27" rx="14" fill="#e4edda" />
          <circle cx="264" cy="122.5" r="10" fill="#587f1e" />
          <rect x="20" y="150" width="259" height="20" rx="4" fill="#f0f2e9" />
          <circle cx="31" cy="160" r="4" fill="#83a955" />
          <path
            d="M43 160H153M224 160H268"
            stroke="#c5cfb9"
            stroke-width="4"
            stroke-linecap="round"
          />
        </g>
      }
    }
  </svg>`,
})
export class InsightArt {
  index = input(0);
}
