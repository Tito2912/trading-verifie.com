import type { ReactNode } from 'react';
import type { Locale } from '@/lib/site';
import { HREFLANG, routePath, toAbsoluteUrl } from '@/lib/site';
import { getMdxPage } from '@/lib/mdx';
import { getLegacyPage } from '@/lib/legacy';
import { getBlogPostAlternatePaths, getBlogPostByTranslationKey } from '@/lib/blog';

export type PageData = {
  locale: Locale;
  segments: string[];
  title: string;
  description: string;
  canonical: string;
  alternates: Record<string, string>;
  openGraph: {
    type: 'website' | 'article';
    image?: string;
  };
  jsonLdBlocks: string[];
  content: ReactNode;
};

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

function buildArticleJsonLdBlocks(opts: { locale: Locale; title: string; canonical: string; image: string }): string[] {
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

function buildDefaultAlternatesFromLocalePaths(pathsByLocale: Record<Locale, string>): Record<string, string> {
  return {
    [HREFLANG.fr]: toAbsoluteUrl(pathsByLocale.fr),
    [HREFLANG.en]: toAbsoluteUrl(pathsByLocale.en),
    [HREFLANG.es]: toAbsoluteUrl(pathsByLocale.es),
    [HREFLANG.de]: toAbsoluteUrl(pathsByLocale.de),
    'x-default': toAbsoluteUrl(pathsByLocale.fr),
  };
}

export async function getPageData(locale: Locale, segments: string[]): Promise<PageData | null> {
  const mdx = await getMdxPage(locale, segments);
  if (mdx) {
    const canonicalPath = routePath(locale, segments);
    const canonical = toAbsoluteUrl(canonicalPath);

    const post = getBlogPostByTranslationKey(mdx.frontmatter.translationKey);
    const alternates = post
      ? buildDefaultAlternatesFromLocalePaths(getBlogPostAlternatePaths(post.translationKey))
      : buildDefaultAlternatesFromLocalePaths({
        fr: routePath('fr', segments),
        en: routePath('en', segments),
        es: routePath('es', segments),
        de: routePath('de', segments),
      });

    const image = mdx.frontmatter.ogImage ? toAbsoluteUrl(mdx.frontmatter.ogImage) : undefined;

    return {
      locale,
      segments,
      title: mdx.frontmatter.title,
      description: mdx.frontmatter.description,
      canonical,
      alternates,
      openGraph: { type: 'article', image },
      jsonLdBlocks: image ? buildArticleJsonLdBlocks({ locale, title: mdx.frontmatter.title, canonical, image }) : [],
      content: mdx.content,
    };
  }

  const legacy = await getLegacyPage(locale, segments);
  if (!legacy) return null;

  const canonical = legacy.canonical ? legacy.canonical : toAbsoluteUrl(routePath(locale, segments));

  return {
    locale,
    segments,
    title: legacy.title,
    description: legacy.description,
    canonical,
    alternates: legacy.alternates,
    openGraph: {
      type: legacy.openGraph.type === 'article' ? 'article' : 'website',
      image: legacy.openGraph.image,
    },
    jsonLdBlocks: legacy.jsonLdBlocks,
    content: <div dangerouslySetInnerHTML={{ __html: legacy.htmlContent }} />,
  };
}
