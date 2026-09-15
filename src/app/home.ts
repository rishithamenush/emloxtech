import { Icon, IconName } from './icon';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroArt } from './hero-art';
import { ProjectArt } from './project-art';
import { InsightArt } from './insight-art';
import { services, projects, articles, faqs } from './content';
@Component({
  selector: 'app-home',
  imports: [Icon, RouterLink, HeroArt, ProjectArt, InsightArt],
  templateUrl: './home.html',
})
export class Home {
  processIcons: IconName[] = ['search', 'pen', 'code', 'growth'];
  services = services;
  projects = projects;
  articles = articles;
  faqs = faqs;
}
