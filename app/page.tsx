import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/content';

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

  const posts = await getAllPosts();

  return (
    <div className="stack">
      <div lang="fr">{home.content}</div>

      <section className="card" aria-label="Articles">
        <h2>Articles</h2>
        <ul className="list">
          {posts.map((p) => (
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
