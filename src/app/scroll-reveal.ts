import { afterEveryRender, DestroyRef, Directive, ElementRef, inject, NgZone } from '@angular/core';

/** Progressive enhancement: content remains visible without JS or motion support. */
@Directive({
  selector: '[appScrollReveal]',
  host: { '(focusin)': 'onFocus()' },
})
export class ScrollReveal {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly zone = inject(NgZone);
  private readonly destroy = inject(DestroyRef);
  private readonly seen = new WeakSet<Element>();
  private readonly animations = new Set<Animation>();
  private observer?: IntersectionObserver;
  private preference?: MediaQueryList;
  private readonly targets = [
    '.section-head',
    '.row',
    '.resource',
    '.card',
    '.split',
    '.showcase',
    '.showcase-grid > div',
    '.faq-list details',
    '.cta',
    '.footer-intro',
    '.footer-grid > div',
    '.studio-intro',
    '.product-stage',
    '.article-body p',
  ].join(',');

  constructor() {
    // Render callbacks run in the browser only, after Angular has updated route content.
    const render = afterEveryRender({
      read: () => this.zone.runOutsideAngular(() => this.observe()),
    });
    this.destroy.onDestroy(() => {
      render.destroy();
      this.observer?.disconnect();
      this.preference?.removeEventListener('change', this.onPreferenceChange);
      this.cancelAnimations();
    });
  }

  private readonly onPreferenceChange = () => {
    if (this.preference?.matches) {
      this.observer?.disconnect();
      this.cancelAnimations();
    } else {
      this.observe();
    }
  };

  onFocus() {
    this.cancelAnimations();
  }

  private cancelAnimations() {
    for (const animation of this.animations) animation.cancel();
    this.animations.clear();
  }

  private observe() {
    if (!('IntersectionObserver' in window) || !('animate' in Element.prototype)) return;
    if (!this.preference) {
      this.preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.preference.addEventListener('change', this.onPreferenceChange);
    }
    if (this.preference.matches) return;
    this.observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          this.observer!.unobserve(entry.target);
          this.seen.add(entry.target);
          if (!entry.target.isConnected || this.preference?.matches) continue;
          const element = entry.target as HTMLElement;
          // Keyboard navigation must never focus a temporarily transparent element.
          if (element.contains(document.activeElement)) continue;
          const siblings = element.parentElement?.children;
          const index = siblings ? Array.prototype.indexOf.call(siblings, element) : 0;
          const stagger = element.matches(
            '.resource, .card, .showcase-grid > div, .footer-grid > div',
          );
          const animation = element.animate(
            [
              { opacity: 0, translate: '0 22px' },
              { opacity: 1, translate: '0 0' },
            ],
            {
              duration: 560,
              delay: stagger ? Math.min(index, 3) * 65 : 0,
              easing: 'cubic-bezier(.22, 1, .36, 1)',
              fill: 'backwards',
            },
          );
          this.animations.add(animation);
          const finish = () => this.animations.delete(animation);
          animation.onfinish = finish;
          animation.oncancel = finish;
        }
      },
      { threshold: 0, rootMargin: '0px 0px -24px 0px' },
    );
    // Clear old route targets; disconnected elements must not be retained by the observer.
    this.observer.disconnect();
    for (const element of this.host.querySelectorAll<HTMLElement>(this.targets)) {
      if (this.seen.has(element)) continue;
      // Never delay above-the-fold content, deep links, or restored scroll positions.
      if (element.getBoundingClientRect().top < window.innerHeight - 24) {
        this.seen.add(element);
        continue;
      }
      this.observer.observe(element);
    }
  }
}
