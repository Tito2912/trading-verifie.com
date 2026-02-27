import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/site';

export type MdxFrontmatter = {
  title: string;
  description: string;
  ogImage?: string;
  translationKey?: string;
  noindex?: boolean;
};

export type MdxPage = {
  frontmatter: MdxFrontmatter;
  content: ReactNode;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');

function mdxFilePath(locale: Locale, segments: string[]): string {
  return path.join(CONTENT_DIR, locale, ...segments, 'index.mdx');
}

export async function getMdxPage(locale: Locale, segments: string[]): Promise<MdxPage | null> {
  const filePath = mdxFilePath(locale, segments);

  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }

  const { content: mdxSource, data } = matter(raw);
  const frontmatter = data as MdxFrontmatter;

  const compiled = await compileMDX({
    source: mdxSource,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        // Build-time compilation of trusted local MDX.
        // @ts-expect-error - passed through to the compiler
        blockDangerousJS: true,
        blockJS: true,
      },
    },
  });

  return {
    frontmatter,
    content: compiled.content,
  };
}
