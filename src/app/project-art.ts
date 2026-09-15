import { Icon } from './icon';
import { Component, input } from '@angular/core';
@Component({
  selector: 'app-project-art',
  imports: [Icon],
  template: `<div class="project-art" [class]="'project-art ' + kind()" aria-hidden="true">
    @if (kind() === 'lavender') {
      <div class="orbit-app">
        <aside>
          ◉<br /><small>⌂<br />▦<br />◷<br />⚙&#xFE0E;</small>
        </aside>
        <div class="orbit-body">
          <div class="mock-top">
            <b>orbit<span> / Overview</span></b
            ><i><app-icon name="arrow-right" /></i>
          </div>
          <h4>Everything, in perspective.</h4>
          <div class="mock-stats">
            <div>
              Total revenue<b
                >$48,250 <em><app-icon name="growth" /> 12.8%</em></b
              >
            </div>
            <div>
              Active orders<b
                >128 <em><app-icon name="growth" /> 8.2%</em></b
              >
            </div>
          </div>
          <div class="chart-label">Revenue overview <span>This month⌄</span></div>
          <div class="bar-chart">
            <i style="height:30%"></i><i style="height:45%"></i><i style="height:39%"></i
            ><i style="height:63%"></i><i style="height:52%"></i><i style="height:72%"></i
            ><i style="height:65%"></i><i style="height:86%"></i><i style="height:77%"></i
            ><i style="height:100%"></i>
          </div>
        </div>
      </div>
    } @else if (kind() === 'peach') {
      <div class="forma-app">
        <div class="mock-top">forma.<span>Objects &nbsp; Our story &nbsp; Bag (0)</span></div>
        <div class="forma-copy">
          Objects for<br />the art of living.<small>CONSIDERED DESIGN. EVERY DAY.</small>
        </div>
        <div class="chair">
          <div class="chair-back"></div>
          <div class="chair-seat"></div>
          <i></i><i></i>
        </div>
        <div class="forma-bottom">
          THE EVERYDAY COLLECTION <span>Explore <app-icon name="arrow-right" /></span>
        </div>
      </div>
    } @else {
      <div class="signal-app">
        <div class="mock-top">✳&#xFE0E; signal<span>Intelligence workspace</span></div>
        <h4>See the bigger picture.</h4>
        <div class="wave-chart">
          <svg viewBox="0 0 400 110">
            <path
              d="M0 90 Q30 80 50 88 T100 55 T150 72 T200 35 T250 48 T300 15 T400 5"
              fill="none"
              stroke="#c6ee7d"
              stroke-width="3"
            />
            <path
              d="M0 100 Q30 95 50 100 T100 83 T150 90 T200 67 T250 80 T300 58 T400 35"
              fill="none"
              stroke="#738772"
              stroke-width="2"
            />
          </svg>
        </div>
        <div class="signal-note">✧ A clearer signal. A smarter next step.</div>
      </div>
    }
  </div>`,
})
export class ProjectArt {
  kind = input('lavender');
}
