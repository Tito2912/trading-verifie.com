import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/SiteShell';
import { getPageData } from '@/lib/page-data';
import { toMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('fr', []);
  if (!page) return {};
  return toMetadata(page);
}

export default async function HomePage() {
  const page = await getPageData('fr', []);
  if (!page) return notFound();
  return <SiteShell page={page}>{page.content}</SiteShell>;
}

