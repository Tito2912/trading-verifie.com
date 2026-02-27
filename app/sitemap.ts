import type { MetadataRoute } from 'next';
import type { Locale } from '@/lib/site';
import { SITE, routePath, toAbsoluteUrl } from '@/lib/site';
import { BLOG_POSTS } from '@/lib/blog';

export const dynamic = 'force-static';

function canonicalRoutes(): Array<{ locale: Locale; segments: string[] }> {
  const routes: Array<{ locale: Locale; segments: string[] }> = [];

  routes.push({ locale: 'fr', segments: [] });
  routes.push({ locale: 'fr', segments: ['blog'] });
  routes.push({ locale: 'fr', segments: ['bitpanda'] });
  routes.push({ locale: 'fr', segments: ['mentions-legales'] });
  routes.push({ locale: 'fr', segments: ['politique-de-confidentialite'] });

  for (const locale of ['en', 'es', 'de'] as const) {
    routes.push({ locale, segments: [] });
    routes.push({ locale, segments: ['blog'] });
    routes.push({ locale, segments: ['bitpanda'] });
    routes.push({ locale, segments: ['legal-notice'] });
    routes.push({ locale, segments: ['privacy-policy'] });
  }

  for (const post of BLOG_POSTS) {
    for (const locale of SITE.locales) {
      routes.push({ locale, segments: ['blog', post.slugsByLocale[locale]] });
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = canonicalRoutes().map(({ locale, segments }) => ({
    url: toAbsoluteUrl(segments.length === 0 && locale !== 'fr' ? `/${locale}/` : routePath(locale, segments)),
    lastModified: new Date(),
  }));

  // Ensure stable order
  urls.sort((a, b) => a.url.localeCompare(b.url));

  return urls;
}
