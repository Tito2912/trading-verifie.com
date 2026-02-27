import type { Locale } from '@/lib/site';
import { routePath, toAbsoluteUrl } from '@/lib/site';

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'E-Com Shop',
  url: 'https://trading-verifie.com',
  logo: 'https://trading-verifie.com/images/logo.png',
  sameAs: ['https://www.youtube.com/@ByeByeSalariat'],
} as const;

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Guide eToro 2025',
  url: 'https://trading-verifie.com',
} as const;

const BREADCRUMB_HOME_NAME: Record<Locale, string> = {
  fr: 'Accueil',
  en: 'Home',
  es: 'Inicio',
  de: 'Startseite',
};

export function buildArticleJsonLdBlocks(opts: { locale: Locale; title: string; canonical: string; image: string }): string[] {
  const blogUrl = toAbsoluteUrl(routePath(opts.locale, ['blog']));

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    mainEntityOfPage: opts.canonical,
    image: opts.image,
    author: { '@type': 'Organization', name: 'E-Com Shop' },
    publisher: {
      '@type': 'Organization',
      name: 'E-Com Shop',
      logo: { '@type': 'ImageObject', url: 'https://trading-verifie.com/images/logo.png' },
    },
  } as const;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@id': toAbsoluteUrl(routePath(opts.locale, [])), name: BREADCRUMB_HOME_NAME[opts.locale] } },
      { '@type': 'ListItem', position: 2, item: { '@id': blogUrl, name: 'Blog' } },
      { '@type': 'ListItem', position: 3, item: { '@id': opts.canonical, name: opts.title } },
    ],
  } as const;

  return [
    JSON.stringify(ORG_JSON_LD),
    JSON.stringify(WEBSITE_JSON_LD),
    JSON.stringify(article),
    JSON.stringify(breadcrumb),
  ];
}

