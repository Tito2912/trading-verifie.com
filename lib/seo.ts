import type { Metadata } from 'next';
import type { PageData } from '@/lib/types';

export function toMetadata(page: PageData): Metadata {
  const images = page.openGraph.image ? [page.openGraph.image] : undefined;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical,
      languages: page.alternates,
    },
    openGraph: {
      type: page.openGraph.type,
      title: page.title,
      description: page.description,
      url: page.canonical,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images,
    },
  };
}
