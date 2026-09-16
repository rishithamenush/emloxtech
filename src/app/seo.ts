import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { services, projects, articles } from './content';

export const SITE_URL = 'https://www.emloxtech.com';
const BRAND = 'EmloX Tech';

@Injectable()
export class SeoStrategy extends TitleStrategy {
  private document = inject(DOCUMENT);
  private meta = inject(Meta);
  private title = inject(Title);

  override updateTitle(state: RouterStateSnapshot): void {
    const path = state.url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    const url = SITE_URL + (path === '/' ? '/' : path);
    const service = services.find((item) => path === '/services/' + item.slug);
    const project = projects.find((item) => path === '/work/' + item.slug);
    const article = articles.find((item) => path === '/insights/' + item.slug);
    const pages: Record<string, [string, string, string]> = {
      '/': [
        'AI Solutions & Custom Software Development',
        'EmloX Tech builds AI solutions, automates business workflows, and develops custom websites and apps. Explore practical software built around your business.',
        'WebPage',
      ],
      '/privacy': [
        'Privacy Policy',
        'EmloX Tech’s company Privacy Policy covers personal information in business communications, project enquiries, client engagements, and website use.',
        'WebPage',
      ],
      '/work/money-maker': [
        'Money Maker: Budget & Expense Android App',
        'Explore Money Maker, an EmloX Android app for tracking income, expenses, and monthly budgets. Available on Google Play.',
        'WebPage',
      ],
      '/services': [
        'Software Development, AI & UI/UX Design Services',
        'Explore web and mobile development, MVP engineering, UI/UX design, AI automation, and cloud services. Define your project scope with EmloX Tech.',
        'CollectionPage',
      ],
      '/work': [
        'AI Solutions, Automation & Digital Strategy',
        'Explore AI assistants, workflow automation, document intelligence, and digital product development. Turn business challenges into practical solutions with EmloX Tech.',
        'CollectionPage',
      ],
      '/about': [
        'About Our AI & Software Development Studio',
        'Work with EmloX Tech on your next digital product. Clear project scope, working software reviews, and remote collaboration from discovery to handover.',
        'AboutPage',
      ],
      '/insights': [
        'Blog: AI, Software Development & Design',
        'Practical articles from EmloX Tech on planning software, choosing a first AI project, and building design systems. Read our product and engineering guidance.',
        'CollectionPage',
      ],
      '/contact': [
        'Discuss Your AI or Software Project',
        'Discuss your web application, MVP, UI/UX design, or automation project with EmloX Tech. Share your goals, budget, and timeline for a tailored project estimate.',
        'ContactPage',
      ],
    };
    const serviceTitles: Record<string, string> = {
      'mobile-app-development': 'Mobile App Development for Android & iOS',
      'product-engineering': 'Custom Web Application & MVP Development',
      'ai-data': 'AI Automation & Data Engineering Services',
      'experience-design': 'UI/UX Design, Website Redesign & Brand Identity',
      'cloud-devops': 'Cloud, DevOps & Systems Integration Services',
    };
    const entry = pages[path];
    const valid = Boolean(entry || service || project || article);
    const heading = service
      ? serviceTitles[service.slug]
      : project
        ? `${project.name}: ${project.type} Concept`
        : article
          ? article.title
          : entry?.[0] || 'Page not found';
    const description =
      service?.description ||
      project?.description ||
      article?.summary ||
      entry?.[1] ||
      'This page could not be found. Explore EmloX Tech services, concepts, and insights.';
    const title = `${heading} | ${BRAND}`;
    const image = SITE_URL + (article?.image || '/social-preview.png');
    const imageAlt = article?.imageAlt || 'EmloX Tech — Web and mobile apps, from idea to launch.';
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'robots',
      content: valid && !project ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    });
    for (const [property, content] of Object.entries({
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:type': article ? 'article' : 'website',
      'og:site_name': BRAND,
      'og:locale': 'en_US',
      'og:image': image,
      'og:image:width': article ? '1536' : '1200',
      'og:image:height': article ? '1024' : '630',
      'og:image:type': article ? 'image/jpeg' : 'image/png',
      'og:image:alt': imageAlt,
    })) {
      this.meta.updateTag({ property, content });
    }
    for (const [name, content] of Object.entries({
      'twitter:card': 'summary_large_image',
      'twitter:image': image,
      'twitter:image:alt': imageAlt,
      'twitter:title': title,
      'twitter:description': description,
    }))
      this.meta.updateTag({ name, content });
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
    this.document.getElementById('site-structured-data')?.remove();
    if (!valid) return;
    const organization = {
      '@type': 'Organization',
      '@id': SITE_URL + '/#organization',
      name: BRAND,
      url: SITE_URL + '/',
      logo: SITE_URL + '/emlox-logo.svg',
      email: 'info@emloxtech.com',
      telephone: '+94 71 707 1104',
      description:
        'AI solutions and custom software studio helping businesses automate workflows, build digital products, and improve customer experiences through remote collaboration.',
    };
    const graph: object[] = [
      organization,
      {
        '@type': 'WebSite',
        '@id': SITE_URL + '/#website',
        name: BRAND,
        url: SITE_URL + '/',
        publisher: { '@id': organization['@id'] },
        inLanguage: 'en',
      },
      {
        '@type': entry?.[2] || 'WebPage',
        '@id': url + '#webpage',
        url,
        name: heading,
        description,
        inLanguage: 'en',
        isPartOf: { '@id': SITE_URL + '/#website' },
        about: { '@id': organization['@id'] },
        primaryImageOfPage: { '@type': 'ImageObject', url: image },
      },
    ];
    if (path === '/work/money-maker')
      graph.push({
        '@type': 'SoftwareApplication',
        name: 'Money Maker: Budget & Expense',
        operatingSystem: 'Android',
        applicationCategory: 'FinanceApplication',
        url,
        installUrl: 'https://play.google.com/store/apps/details?id=app.moneymaker.android',
        publisher: { '@id': organization['@id'] },
      });
    if (service)
      graph.push({
        '@type': 'Service',
        '@id': url + '#service',
        name: service.title,
        description,
        url,
        serviceType: service.tags,
        provider: { '@id': organization['@id'] },
        mainEntityOfPage: { '@id': url + '#webpage' },
      });
    if (article)
      graph.push({
        '@type': 'BlogPosting',
        '@id': url + '#article',
        headline: article.title,
        image,
        url,
        inLanguage: 'en',
        articleSection: article.category,
        wordCount: article.paragraphs.join(' ').split(/\s+/).length,
        description,
        articleBody: article.paragraphs.join('\n\n'),
        author: {
          '@type': 'Organization',
          '@id': organization['@id'],
          name: BRAND,
          url: SITE_URL + '/about',
        },
        publisher: { '@id': organization['@id'] },
        mainEntityOfPage: { '@id': url + '#webpage' },
      });
    const collection =
      path === '/services'
        ? services.map((item) => ({ name: item.title, url: SITE_URL + '/services/' + item.slug }))
        : path === '/insights'
          ? articles.map((item) => ({ name: item.title, url: SITE_URL + '/insights/' + item.slug }))
          : [];
    if (collection.length)
      graph.push({
        '@type': 'ItemList',
        '@id': url + '#list',
        numberOfItems: collection.length,
        itemListElement: collection.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          ...item,
        })),
      });
    if (path !== '/') {
      const parts = path.slice(1).split('/');
      const breadcrumbs = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      ];
      if (parts.length > 1)
        breadcrumbs.push({
          '@type': 'ListItem',
          position: 2,
          name: (
            { services: 'Services', work: 'Solutions', insights: 'Blog' } as Record<string, string>
          )[parts[0]],
          item: SITE_URL + '/' + parts[0],
        });
      breadcrumbs.push({
        '@type': 'ListItem',
        position: breadcrumbs.length + 1,
        name: service?.title || project?.name || article?.title || heading,
        item: url,
      });
      graph.push({ '@type': 'BreadcrumbList', itemListElement: breadcrumbs });
    }
    const script = this.document.createElement('script');
    script.id = 'site-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    }).replace(/</g, '\\u003c');
    this.document.head.appendChild(script);
  }
}
