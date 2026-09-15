import { Routes } from '@angular/router';
import { services, projects, articles } from './content';
import { Home } from './home';
export const routes: Routes = [
  { path: '', component: Home, title: 'EmloX Tec — Big ideas. Bold builds. Real impact.' },
  {
    path: 'services',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'services' },
    title: 'Our expertise — EmloX Tec',
  },
  {
    path: 'services/:slug',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'service' },
    title: (route) =>
      (services.find((s) => s.slug === route.paramMap.get('slug'))?.title || 'Service not found') +
      ' — EmloX Tec',
  },
  {
    path: 'work',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'work' },
    title: 'The concept lab — EmloX Tec',
  },
  {
    path: 'work/:slug',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'project' },
    title: (route) =>
      (projects.find((p) => p.slug === route.paramMap.get('slug'))?.name || 'Concept not found') +
      ' — EmloX Tec',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'about' },
    title: 'Our mindset — EmloX Tec',
  },
  {
    path: 'insights',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'insights' },
    title: 'Field notes — EmloX Tec',
  },
  {
    path: 'insights/:slug',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'article' },
    title: (route) =>
      (articles.find((a) => a.slug === route.paramMap.get('slug'))?.title || 'Article not found') +
      ' — EmloX Tec',
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact').then((m) => m.Contact),
    title: 'Let’s talk — EmloX Tec',
  },
  { path: 'news', redirectTo: 'insights', pathMatch: 'full' },
  { path: 'contact-2', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'about-2', redirectTo: 'about', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./pages').then((m) => m.Pages),
    data: { page: 'notfound' },
    title: 'Page not found — EmloX Tec',
  },
];
