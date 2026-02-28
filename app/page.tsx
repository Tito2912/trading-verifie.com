import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPages, getPostBySlug } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const home = await getPostBySlug('_home');
  if (!home) return {};

  return {
    title: home.title,
    description: home.description,
    alternates: { canonical: home.canonical ?? '/' },
    openGraph: {
      type: 'website',
      title: home.title,
      description: home.description,
      url: home.canonical ?? '/',
    },
  };
}

export default async function HomePage() {
  const home = await getPostBySlug('_home');
  if (!home) return notFound();

  const pages = await getAllPages();

  return (
    <div className="stack">
      <div lang="fr">{home.content}</div>

      <section className="card" aria-label="Pages du site">
        <h2>Toutes les pages</h2>
        <ul className="list">
          <li>
            <Link href="/blog">Blog</Link>
            <div className="muted">Tous les articles et guides.</div>
          </li>
          {pages.map((p) => (
            <li key={p.slug}>
              <Link href={`/${p.slug}`}>{p.title}</Link>
              <div className="muted">{p.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
