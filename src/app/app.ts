import { ScrollReveal } from './scroll-reveal';
import { Icon } from './icon';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { services, projects, articles } from './content';
@Component({
  selector: 'app-root',
  imports: [ScrollReveal, Icon, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  menuOpen = signal(false);
  bannerOpen = signal(true);
  skipHref = signal('/#main');
  year = new Date().getFullYear();
  services = services;
  projects = projects;
  articles = articles;
  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuOpen.set(false);
        this.skipHref.set(event.urlAfterRedirects.split('#')[0] + '#main');
      }
    });
  }
}
