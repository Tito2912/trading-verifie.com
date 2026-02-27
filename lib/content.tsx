import type { Locale } from '@/lib/site';
import { HREFLANG, routePath, toAbsoluteUrl } from '@/lib/site';
import { getMdxPage } from '@/lib/mdx';
import { getLegacyPage } from '@/lib/legacy';
import { getBlogPostAlternatePaths, getBlogPostByTranslationKey } from '@/lib/blog';
import type { PageData } from '@/lib/types';
import { buildArticleJsonLdBlocks } from '@/lib/schema';

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
