import type { Locale } from '@/lib/site';
import { routePath } from '@/lib/site';

export type BlogTranslationKey = 'blog-why-choose' | 'blog-fees' | 'blog-copytrading';

export type BlogPost = {
  translationKey: BlogTranslationKey;
  slugsByLocale: Record<Locale, string>;
  legacySlugsByLocale: Record<Locale, string>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    translationKey: 'blog-why-choose',
    legacySlugsByLocale: { fr: 'blog-1', en: 'blog-1', es: 'blog-1', de: 'blog-1' },
    slugsByLocale: {
      fr: 'pourquoi-choisir-etoro-2025',
      en: 'why-choose-etoro-2025',
      es: 'por-que-elegir-etoro-2025',
      de: 'warum-etoro-2025',
    },
  },
  {
    translationKey: 'blog-fees',
    legacySlugsByLocale: { fr: 'blog-2', en: 'blog-2', es: 'blog-2', de: 'blog-2' },
    slugsByLocale: {
      fr: 'frais-etoro-2025',
      en: 'etoro-fees-2025',
      es: 'comisiones-etoro-2025',
      de: 'etoro-gebuehren-2025',
    },
  },
  {
    translationKey: 'blog-copytrading',
    legacySlugsByLocale: { fr: 'blog-3', en: 'blog-3', es: 'blog-3', de: 'blog-3' },
    slugsByLocale: {
      fr: 'copytrading-demarrer-2025',
      en: 'copytrading-start-2025',
      es: 'copytrading-empezar-2025',
      de: 'copytrading-start-2025',
    },
  },
];

export function getBlogPostByTranslationKey(key: string | undefined): BlogPost | null {
  if (!key) return null;
  return BLOG_POSTS.find((p) => p.translationKey === key) ?? null;
}

export function getBlogPostCanonicalPath(locale: Locale, translationKey: BlogTranslationKey): string {
  const post = BLOG_POSTS.find((p) => p.translationKey === translationKey);
  if (!post) return routePath(locale, ['blog']);
  return routePath(locale, ['blog', post.slugsByLocale[locale]]);
}

export function getBlogPostAlternatePaths(translationKey: BlogTranslationKey): Record<Locale, string> {
  const post = BLOG_POSTS.find((p) => p.translationKey === translationKey);
  if (!post) {
    return {
      fr: routePath('fr', ['blog']),
      en: routePath('en', ['blog']),
      es: routePath('es', ['blog']),
      de: routePath('de', ['blog']),
    };
  }
  return {
    fr: routePath('fr', ['blog', post.slugsByLocale.fr]),
    en: routePath('en', ['blog', post.slugsByLocale.en]),
    es: routePath('es', ['blog', post.slugsByLocale.es]),
    de: routePath('de', ['blog', post.slugsByLocale.de]),
  };
}

