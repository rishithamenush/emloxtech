import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import {
  provideServerRendering,
  withRoutes,
  RenderMode,
  PrerenderFallback,
  ServerRoute,
} from '@angular/ssr';
import { appConfig } from './app.config';
import { services, projects, articles } from './content';
const serverRoutes: ServerRoute[] = [
  { path: 'work/money-maker', renderMode: RenderMode.Prerender },
  ...(['services', 'work', 'insights'] as const).map((section): ServerRoute => ({
    path: `${section}/:slug`,
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    getPrerenderParams: async () =>
      ({ services, work: projects, insights: articles })[section].map(({ slug }) => ({ slug })),
  })),
  { path: '**', renderMode: RenderMode.Prerender },
];
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};
export const config = mergeApplicationConfig(appConfig, serverConfig);
