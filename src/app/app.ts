import { Icon } from './icon';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [Icon, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  menuOpen = signal(false);
  skipHref = signal('/#main');
  year = new Date().getFullYear();
  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuOpen.set(false);
        this.skipHref.set(event.urlAfterRedirects.split('#')[0] + '#main');
      }
    });
  }
}
