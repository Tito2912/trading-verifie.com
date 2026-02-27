import fs from 'node:fs/promises';
import path from 'node:path';
import type { Locale } from '@/lib/site';

export type LegacyPage = {
  title: string;
  description: string;
  canonical?: string;
  alternates: Record<string, string>;
  openGraph: {
    type?: string;
    image?: string;
  };
  jsonLdBlocks: string[];
  htmlContent: string;
};

function decodeHtmlEntities(input: string): string {
  return input
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .trim();
}

function getAttr(tag: string, name: string): string | null {
  const re = new RegExp(`${name}\\s*=\\s*(\"([^\"]*)\"|'([^']*)')`, 'i');
  const m = re.exec(tag);
  return m ? (m[2] ?? m[3] ?? '').trim() : null;
}

function findAllTags(html: string, tagName: string): string[] {
  const re = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  return Array.from(html.matchAll(re)).map((m) => m[0]);
}

function extractBetween(html: string, startNeedle: string, endNeedle: string): string | null {
  const start = html.indexOf(startNeedle);
  if (start === -1) return null;
  const end = html.indexOf(endNeedle, start + startNeedle.length);
  if (end === -1) return null;
  return html.slice(start + startNeedle.length, end).trim();
}

function absolutizeAssetUrls(fragment: string): string {
  return fragment.replace(
    /(\b(?:src|href)=)(["'])(?!https?:|\/|data:|mailto:|tel:|#)(?:\.{1,2}\/)*((?:images|fonts|pdf)\/)/gi,
    '$1$2/$3',
  );
}

function legacyHtmlFile(locale: Locale, segments: string[]): string {
  if (locale === 'fr') {
    if (segments.length === 0) return 'index.html';
    if (segments.length === 1) return `${segments[0]}.html`;
    return `${segments.join('/')}.html`;
  }

  if (segments.length === 0) return path.join(locale, 'index.html');
  if (segments.length === 1) return path.join(locale, `${segments[0]}.html`);
  return path.join(locale, `${segments.join('/')}.html`);
}

export async function getLegacyPage(locale: Locale, segments: string[]): Promise<LegacyPage | null> {
  const fileRel = legacyHtmlFile(locale, segments);
  const filePath = path.join(process.cwd(), fileRel);

  let html: string;
  try {
    html = await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }

  const titleRaw = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '';
  const title = decodeHtmlEntities(titleRaw);

  let description = '';
  const metaTags = findAllTags(html, 'meta');
  for (const tag of metaTags) {
    const name = getAttr(tag, 'name');
    if (name?.toLowerCase() !== 'description') continue;
    const content = getAttr(tag, 'content');
    if (content) {
      description = decodeHtmlEntities(content);
      break;
    }
  }

  let canonical: string | undefined;
  const linkTags = findAllTags(html, 'link');
  const alternates: Record<string, string> = {};
  for (const tag of linkTags) {
    const rel = getAttr(tag, 'rel')?.toLowerCase();
    if (!rel) continue;
    if (rel === 'canonical') {
      const href = getAttr(tag, 'href');
      if (href) canonical = href;
      continue;
    }
    if (rel === 'alternate') {
      const hreflang = getAttr(tag, 'hreflang');
      const href = getAttr(tag, 'href');
      if (hreflang && href) alternates[hreflang] = href;
      continue;
    }
  }

  const openGraph: LegacyPage['openGraph'] = {};
  for (const tag of metaTags) {
    const prop = getAttr(tag, 'property');
    if (!prop) continue;
    const key = prop.toLowerCase();
    if (key === 'og:type') openGraph.type = getAttr(tag, 'content') ?? undefined;
    if (key === 'og:image') openGraph.image = getAttr(tag, 'content') ?? undefined;
  }

  const jsonLdBlocks = Array.from(
    html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ).map((m) => m[1].trim());

  const htmlContent = absolutizeAssetUrls(extractBetween(html, '</header>', '<footer') ?? '');

  return {
    title,
    description,
    canonical,
    alternates,
    openGraph,
    jsonLdBlocks,
    htmlContent,
  };
}
