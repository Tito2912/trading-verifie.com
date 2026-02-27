import type { Locale } from '@/lib/site';
import { isLocale, routePath } from '@/lib/site';
import { BLOG_POSTS } from '@/lib/blog';

export type ParsedPath = {
  locale: Locale;
  segments: string[];
};

function splitPathname(pathname: string): string[] {
  const clean = pathname.split('?')[0].split('#')[0];
  return clean
    .split('/')
    .filter(Boolean)
    .map((s) => s.replace(/\.html$/i, ''));
}

export function parsePathname(pathname: string): ParsedPath {
  const parts = splitPathname(pathname || '/');
  const first = parts[0];

  if (first && isLocale(first) && first !== 'fr') return { locale: first, segments: parts.slice(1) };
  if (first === 'fr') return { locale: 'fr', segments: parts.slice(1) };
  return { locale: 'fr', segments: parts };
}

export function pathFor(locale: Locale, segments: string[]): string {
  if (segments.length === 0) return locale === 'fr' ? '/' : `/${locale}/`;
  return routePath(locale, segments);
}

function findBlogPost(locale: Locale, slug: string): (typeof BLOG_POSTS)[number] | null {
  for (const post of BLOG_POSTS) {
    if (post.slugsByLocale[locale] === slug) return post;
  }
  return null;
}

export function translateSegments(parsed: ParsedPath, targetLocale: Locale): string[] {
  const segments = parsed.segments;
  if (segments.length === 0) return [];

  const [first, second, ...rest] = segments;

  const legalValues = new Set(['mentions-legales', 'legal-notice']);
  const privacyValues = new Set(['politique-de-confidentialite', 'privacy-policy']);

  if (first && legalValues.has(first)) return targetLocale === 'fr' ? ['mentions-legales'] : ['legal-notice'];
  if (first && privacyValues.has(first)) return targetLocale === 'fr' ? ['politique-de-confidentialite'] : ['privacy-policy'];

  if (first === 'blog' && second) {
    const post = findBlogPost(parsed.locale, second);
    if (post) return ['blog', post.slugsByLocale[targetLocale], ...rest];
    return segments;
  }

  return segments;
}

