import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { Post, PostType } from '@/lib/types';
import type { TocHeading } from '@/components/TableOfContents';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const EXCLUDE_FROM_INDEX = new Set(['mentions-legales', 'politique-de-confidentialite']);

type Frontmatter = {
  title: string;
  description: string;
  date?: string;
  updatedAt?: string;
  canonical?: string;
  type: PostType;
  primaryKeyword?: string;
  jumpLinks?: { href: string; label: string }[];
  quickAnswer?: string[];
  cta?: { title: string; body: string; buttonLabel: string; buttonHref: string };
  internalLinks?: { href: string; anchor: string }[];
  faq?: { q: string; a: string }[];
};

function extractHeadingsFromMdxSource(source: string): TocHeading[] {
  const lines = source.split(/\r?\n/);
  const headings: TocHeading[] = [];

  for (const line of lines) {
    const m = /^(#{2,4})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].replace(/`/g, '').trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function getAllSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR);
  return entries
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''))
    .filter((slug) => !slug.startsWith('_'))
    .sort();
}

export async function getAllPosts(): Promise<Array<Pick<Post, 'slug' | 'title' | 'description' | 'updatedAt' | 'date'>>> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.filter((slug) => !EXCLUDE_FROM_INDEX.has(slug)).map(readIndexItem));
  return posts;
}

export async function getAllPages(): Promise<Array<Pick<Post, 'slug' | 'title' | 'description' | 'updatedAt' | 'date'>>> {
  const slugs = await getAllSlugs();
  const pages = await Promise.all(slugs.map(readIndexItem));
  return pages;
}

async function readIndexItem(
  slug: string,
): Promise<Pick<Post, 'slug' | 'title' | 'description' | 'updatedAt' | 'date'>> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), 'utf8');
  const { data } = matter(raw);
  const fm = data as Frontmatter;
  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updatedAt: fm.updatedAt,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }

  const headings = extractHeadingsFromMdxSource(raw);
  const { content: mdxSource, data } = matter(raw);
  const frontmatter = data as Frontmatter;

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
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updatedAt: frontmatter.updatedAt,
    canonical: frontmatter.canonical,
    type: frontmatter.type,
    primaryKeyword: frontmatter.primaryKeyword,
    jumpLinks: frontmatter.jumpLinks,
    quickAnswer: frontmatter.quickAnswer,
    cta: frontmatter.cta,
    internalLinks: frontmatter.internalLinks,
    faq: frontmatter.faq,
    headings,
    content: compiled.content,
  };
}
