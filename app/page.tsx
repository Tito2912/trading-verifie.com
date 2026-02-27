import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/content';
import { toMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('fr', []);
  if (!page) return {};
  return toMetadata(page);
}

export default async function HomePage() {
  const page = await getPageData('fr', []);
  if (!page) return notFound();
  return (
    <>
      <div lang="fr">{page.content}</div>
      {page.jsonLdBlocks.map((block, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: block }} />
      ))}
    </>
  );
}
