import { Icon } from './icon';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { services, articles, faqs } from './content';
import { InsightArt } from './insight-art';
@Component({
  selector: 'app-home',
  imports: [Icon, RouterLink, InsightArt],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  services = services;
  articles = articles;
  faqs = faqs;
  capabilities = [
    'Web applications',
    'Android apps',
    'iOS apps',
    'MVP development',
    'UI/UX design',
    'Brand identity',
    'AI automation',
    'Data pipelines',
    'Cloud & DevOps',
    'Integrations',
  ];
  steps = [
    [
      'Define the work',
      'Map the problem, users, and technical constraints. Agree on deliverables and a practical first milestone.',
    ],
    [
      'Design, build, review',
      'Review prototypes and working software. Keep priorities, feedback, and decisions visible throughout the project.',
    ],
    [
      'Launch with a plan',
      'Prepare testing, documentation, and handover. Agree on maintenance and support before launch.',
    ],
  ];
}
