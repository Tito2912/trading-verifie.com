import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'eToro & Bitpanda Guides (2026) — Trading Verifie',
  description: 'Practical eToro and Bitpanda guides: fees, CopyTrading, risks, withdrawals, and a “before you deposit” checklist.',
  alternates: buildAlternatesForHome('en'),
  openGraph: {
    type: 'website',
    title: 'eToro & Bitpanda Guides (2026) — Trading Verifie',
    description: 'Practical eToro and Bitpanda guides: fees, CopyTrading, risks, withdrawals, and a “before you deposit” checklist.',
    url: '/en',
    images: [{ url: getOgImage('en') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eToro & Bitpanda Guides (2026) — Trading Verifie',
    description: 'Practical eToro and Bitpanda guides: fees, CopyTrading, risks, withdrawals, and a “before you deposit” checklist.',
    images: [getOgImage('en')],
  },
};

export default async function EnHomePage() {
  const posts = await getLocalizedBlogPosts('en');

  return (
    <div className="stack">
      <section className="hero">
        <h1>Trading Verifie: eToro &amp; Bitpanda guides</h1>
        <p>
          Clear checklists to understand a platform, verify fees, and avoid mistakes before you deposit. Educational content
          (not financial advice).
        </p>
      </section>

      <section className="card" aria-label="Start here">
        <h2>Start here</h2>
        <ul className="list">
          <li>
            <Link href="/en/guide-etoro">eToro guide (pillar)</Link>
            <div className="muted">How it works, CopyTrading, safety checks.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-fees-2025">eToro fees</Link>
            <div className="muted">Spreads, FX conversion, key frictions.</div>
          </li>
          <li>
            <Link href="/en/blog/copytrading-start-2025">CopyTrading: how to start</Link>
            <div className="muted">Setup, common mistakes, minimal process.</div>
          </li>
          <li>
            <Link href="/en/bitpanda">Bitpanda guide</Link>
            <div className="muted">Crypto alternative: overview + risks.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="eToro cluster">
        <h2>eToro cluster</h2>
        <ul className="list">
          <li>
            <Link href="/en/guide-etoro">eToro guide</Link>
            <div className="muted">Main pillar: how it works, CopyTrading, fees and safety.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-fees-2025">eToro fees</Link>
            <div className="muted">0% commission, spreads, FX conversion and hidden costs.</div>
          </li>
          <li>
            <Link href="/en/blog/copytrading-start-2025">CopyTrading</Link>
            <div className="muted">Setup, discipline and common beginner mistakes.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-safety-regulation-2026">Safety & regulation</Link>
            <div className="muted">Legal entity, 2FA, client funds, product type and risk checks.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-deposits-withdrawals-2026">Deposits & withdrawals</Link>
            <div className="muted">Timing, payment methods, FX and operational friction.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-alternatives-2026">eToro alternatives</Link>
            <div className="muted">XTB, DEGIRO or Bitpanda depending on your use case.</div>
          </li>
          <li>
            <Link href="/en/blog/etoro-tax-2026">Tax basics</Link>
            <div className="muted">Statements, conversions, record-keeping and avoidable mistakes.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparency">
        <h2>Transparency</h2>
        <ul className="list">
          <li>
            <Link href="/en/methodology">Methodology</Link>
            <div className="muted">“Before you deposit” checklist + criteria.</div>
          </li>
          <li>
            <Link href="/en/sources">Sources</Link>
            <div className="muted">How to verify a claim fast (pricing, docs, risks).</div>
          </li>
          <li>
            <Link href="/en/about">About</Link>
            <div className="muted">Affiliates, updates, corrections.</div>
          </li>
          <li>
            <Link href="/en/contact">Contact</Link>
            <div className="muted">Questions, corrections, reports.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Site pages">
        <h2>Pages</h2>
        <ul className="list">
          <li>
            <Link href="/en/guide-etoro">eToro guide</Link>
            <div className="muted">CopyTrading, fees, safety.</div>
          </li>
          <li>
            <Link href="/en/bitpanda">Bitpanda guide</Link>
            <div className="muted">Bitpanda review: features, fees (high-level) and risks.</div>
          </li>
          <li>
            <Link href="/en/blog">Blog</Link>
            <div className="muted">All articles and guides.</div>
          </li>
          <li>
            <Link href="/en/legal-notice">Legal notice</Link>
            <div className="muted">Publisher, hosting, affiliation and liability.</div>
          </li>
          <li>
            <Link href="/en/privacy-policy">Privacy policy</Link>
            <div className="muted">Data, cookies and your rights.</div>
          </li>
          <li>
            <Link href="/en/about">About</Link>
            <div className="muted">Affiliate disclosure, updates, corrections.</div>
          </li>
          <li>
            <Link href="/en/methodology">Methodology</Link>
            <div className="muted">Our checklist before you deposit.</div>
          </li>
          <li>
            <Link href="/en/sources">Sources</Link>
            <div className="muted">Official docs and fast verification method.</div>
          </li>
          <li>
            <Link href="/en/contact">Contact</Link>
            <div className="muted">Questions, corrections, reports.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Articles">
        <h2>Articles</h2>
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/en/blog/${p.slug}`}>{p.title}</Link>
              <div className="muted">{p.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
