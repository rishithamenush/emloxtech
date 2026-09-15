import { Icon } from './icon';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { services, projects, articles, faqs } from './content';
import { ProjectArt } from './project-art';
import { InsightArt } from './insight-art';
@Component({
  selector: 'app-pages',
  imports: [Icon, RouterLink, ProjectArt, InsightArt],
  templateUrl: './pages.html',
})
export class Pages {
  private route = inject(ActivatedRoute);
  data = toSignal(this.route.data);
  params = toSignal(this.route.paramMap);
  page = computed(() => this.data()?.['page'] || 'notfound');
  services = services;
  projects = projects;
  articles = articles;
  faqs = faqs;
  service = computed(() => services.find((s) => s.slug === this.params()?.get('slug')));
  project = computed(() => projects.find((s) => s.slug === this.params()?.get('slug')));
  article = computed(() => articles.find((s) => s.slug === this.params()?.get('slug')));
  filter = signal('All');
  filters = ['All', 'Product', 'Design', 'AI & Data'];
  filteredProjects = computed(() =>
    projects.filter((p) => this.filter() === 'All' || p.category === this.filter()),
  );
}
