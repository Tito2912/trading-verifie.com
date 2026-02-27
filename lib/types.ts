import type { ReactNode } from 'react';
import type { Locale } from '@/lib/site';

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

