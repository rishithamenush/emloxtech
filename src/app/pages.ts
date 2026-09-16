import { Icon } from './icon';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { services, projects, articles, faqs } from './content';
import { ProjectArt } from './project-art';
import { InsightArt } from './insight-art';
@Component({
  selector: 'app-pages',
  imports: [Icon, RouterLink, ProjectArt, InsightArt],
  templateUrl: './pages.html',
  styleUrl: './pages.css',
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
  capabilities = [
    {
      label: 'Customer experience',
      title: 'AI assistants & customer support',
      description:
        'Help people find answers, navigate your services, and reach the right person when a conversation needs human attention.',
      example:
        'A website assistant that answers from your approved content and hands off complex enquiries.',
      link: '/services/ai-data',
    },
    {
      label: 'Business operations',
      title: 'Workflow automation',
      description:
        'Connect routine steps across your tools, with AI where interpretation is useful and clear rules where consistency matters.',
      example:
        'Classify incoming enquiries, draft a response, and route it to your team for approval.',
      link: '/services/ai-data',
    },
    {
      label: 'Documents & knowledge',
      title: 'Document intelligence',
      description:
        'Extract, organize, and search business information while keeping sources and review steps close at hand.',
      example:
        'Capture invoice fields for review or search internal guides with links back to the source.',
      link: '/services/ai-data',
    },
    {
      label: 'Data & decisions',
      title: 'Analytics that explain more',
      description:
        'Bring scattered information into clear dashboards and explore AI-assisted summaries that help your team investigate trends.',
      example:
        'An operations dashboard that highlights changes and summarizes reports for human review.',
      link: '/services/ai-data',
    },
    {
      label: 'Digital products',
      title: 'AI-enabled web & mobile apps',
      description:
        'Turn a useful idea into an application, combining intuitive interfaces, business logic, and relevant AI features.',
      example:
        'A customer portal with guided search, personalized workflows, and a connected backend.',
      link: '/services/product-engineering',
    },
    {
      label: 'Strategy & integration',
      title: 'A practical plan for AI',
      description:
        'Identify a focused use case, assess data readiness, and plan integrations, evaluation, and running costs before expanding.',
      example: 'A scoped pilot to check whether an AI-assisted workflow is useful for your team.',
      link: '/services/ai-data',
    },
  ];
}
