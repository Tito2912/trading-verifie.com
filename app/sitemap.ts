import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { getAllSlugs, getPostBySlug } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://trading-verifie.com';
  const slugs = await getAllSlugs();

  const pages = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      const canonical = post?.canonical ?? `/${slug}`;
      const lastModified = post?.updatedAt ?? post?.date ?? new Date().toISOString();
      return {
        url: new URL(canonical, baseUrl).toString(),
        lastModified: new Date(lastModified),
      };
    }),
  );

  const urls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    ...pages,
  ];

  urls.sort((a, b) => a.url.localeCompare(b.url));
  return urls;
}
