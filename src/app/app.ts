import { ScrollReveal } from './scroll-reveal';
import { Icon } from './icon';
import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { services, projects, articles } from './content';
@Component({
  selector: 'app-root',
  imports: [ScrollReveal, Icon, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  headerScrolled = signal(false);
  private destroyRef = inject(DestroyRef);
  menuOpen = signal(false);
  bannerOpen = signal(true);
  skipHref = signal('/#main');
  year = new Date().getFullYear();
  services = services;
  projects = projects;
  articles = articles;
  constructor(router: Router) {
    afterNextRender(() => {
      const marker = document.getElementById('header-scroll-marker');
      if (!marker || !('IntersectionObserver' in window)) return;
      const observer = new IntersectionObserver(([entry]) => {
        this.headerScrolled.set(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
      observer.observe(marker);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuOpen.set(false);
        this.skipHref.set(event.urlAfterRedirects.split('#')[0] + '#main');
      }
    });
  }
}
