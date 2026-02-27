import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/site';
import { isLocale } from '@/lib/site';
import { getPageData } from '@/lib/content';
import { toMetadata } from '@/lib/seo';
import { BLOG_POSTS } from '@/lib/blog';

function parseLocaleAndSegments(slug: string[]): { locale: Locale; segments: string[] } {
  const first = slug[0];
  if (first && isLocale(first) && first !== 'fr') return { locale: first, segments: slug.slice(1) };
  if (first === 'fr') return { locale: 'fr', segments: slug.slice(1) };
  return { locale: 'fr', segments: slug };
}

export async function generateStaticParams() {
  const locales: Locale[] = ['fr', 'en', 'es', 'de'];

  const basePagesByLocale: Record<Locale, string[][]> = {
    fr: [['blog'], ['bitpanda'], ['mentions-legales'], ['politique-de-confidentialite']],
    en: [[], ['blog'], ['bitpanda'], ['legal-notice'], ['privacy-policy']],
    es: [[], ['blog'], ['bitpanda'], ['legal-notice'], ['privacy-policy']],
    de: [[], ['blog'], ['bitpanda'], ['legal-notice'], ['privacy-policy']],
  };

  const params: Array<{ slug: string[] }> = [];

  for (const locale of locales) {
    for (const segments of basePagesByLocale[locale]) {
      if (locale === 'fr' && segments.length === 0) continue;
      const slug = locale === 'fr' ? segments : [locale, ...segments];
      params.push({ slug });
    }
  }

  for (const post of BLOG_POSTS) {
    for (const locale of locales) {
      const slug = post.slugsByLocale[locale];
      const segments = ['blog', slug];
      params.push({ slug: locale === 'fr' ? segments : [locale, ...segments] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const { locale, segments } = parseLocaleAndSegments(slug);
  const page = await getPageData(locale, segments);
  if (!page) return {};
  return toMetadata(page);
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const { locale, segments } = parseLocaleAndSegments(slug);
  const page = await getPageData(locale, segments);
  if (!page) return notFound();
  return (
    <>
      <div lang={page.locale === 'fr' ? 'fr' : page.locale}>{page.content}</div>
      {page.jsonLdBlocks.map((block, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: block }} />
      ))}
    </>
  );
}
