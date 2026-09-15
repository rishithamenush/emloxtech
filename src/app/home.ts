import { Icon } from './icon';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectArt } from './project-art';
import { services, articles, faqs } from './content';
@Component({
  selector: 'app-home',
  imports: [Icon, RouterLink, ProjectArt],
  templateUrl: './home.html',
})
export class Home {
  services = services;
  articles = articles;
  faqs = faqs;
}
