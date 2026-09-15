import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroArt } from './hero-art';
import { ProjectArt } from './project-art';
import { services, projects, articles, faqs } from './content';
@Component({
  selector: 'app-home',
  imports: [RouterLink, HeroArt, ProjectArt],
  templateUrl: './home.html',
})
export class Home {
  services = services;
  projects = projects;
  articles = articles;
  faqs = faqs;
}
