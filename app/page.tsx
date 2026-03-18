import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPages } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Guides eToro & Bitpanda (2026) — Trading Vérifié',
  description:
    'Guides pratiques eToro et Bitpanda : frais, CopyTrading, risques, retraits et checklist avant dépôt. Contenu informatif (pas un conseil financier).',
  alternates: buildAlternatesForHome('fr'),
  openGraph: {
    type: 'website',
    title: 'Guides eToro & Bitpanda (2026) — Trading Vérifié',
    description:
      'Guides pratiques eToro et Bitpanda : frais, CopyTrading, risques, retraits et checklist avant dépôt.',
    url: '/',
    images: [{ url: getOgImage('fr') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides eToro & Bitpanda (2026) — Trading Vérifié',
    description:
      'Guides pratiques eToro et Bitpanda : frais, CopyTrading, risques, retraits et checklist avant dépôt.',
    images: [getOgImage('fr')],
  },
};

export default async function HomePage() {
  const pages = await getAllPages();
  const pinned = new Set(['guide-etoro', 'bitpanda', 'blog', 'methodologie', 'sources', 'a-propos', 'contact']);

  return (
    <div className="stack">
      <section className="hero">
        <h1>Trading Vérifié : guides eToro &amp; Bitpanda</h1>
        <p>
          Des checklists claires pour comprendre une plateforme, vérifier les frais et éviter les erreurs avant de déposer.
          Contenu informatif (pas un conseil financier).
        </p>
      </section>

      <section className="card" aria-label="Commencer">
        <h2>Commencer</h2>
        <ul className="list">
          <li>
            <Link href="/guide-etoro">Guide eToro (pilier)</Link>
            <div className="muted">Fonctionnement, CopyTrading, sécurité et points de vigilance.</div>
          </li>
          <li>
            <Link href="/frais-etoro-2025">Frais eToro</Link>
            <div className="muted">Spreads, conversions, commissions et frictions fréquentes.</div>
          </li>
          <li>
            <Link href="/copytrading-demarrer-2025">CopyTrading : démarrer proprement</Link>
            <div className="muted">Réglages, erreurs à éviter, cadre minimal.</div>
          </li>
          <li>
            <Link href="/bitpanda">Guide Bitpanda</Link>
            <div className="muted">Alternative crypto : fonctionnement, frais (vue d’ensemble) et risques.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Cluster eToro">
        <h2>Cluster eToro</h2>
        <ul className="list">
          <li>
            <Link href="/guide-etoro">Guide eToro</Link>
            <div className="muted">Pilier principal : fonctionnement, CopyTrading, frais et sécurité.</div>
          </li>
          <li>
            <Link href="/frais-etoro-2025">Frais eToro</Link>
            <div className="muted">0% commission, spreads, conversion et coûts cachés.</div>
          </li>
          <li>
            <Link href="/copytrading-demarrer-2025">CopyTrading</Link>
            <div className="muted">Réglages de départ, discipline et erreurs à éviter.</div>
          </li>
          <li>
            <Link href="/etoro-securite-regulation-2026">Sécurité & régulation</Link>
            <div className="muted">Entité, 2FA, fonds clients, type de produit et vigilance.</div>
          </li>
          <li>
            <Link href="/etoro-depot-retrait-2026">Dépôt & retrait</Link>
            <div className="muted">Délais, méthode de paiement, FX et points de friction.</div>
          </li>
          <li>
            <Link href="/alternatives-etoro-2026">Alternatives à eToro</Link>
            <div className="muted">XTB, DEGIRO ou Bitpanda selon votre usage principal.</div>
          </li>
          <li>
            <Link href="/etoro-fiscalite-2026">Fiscalité eToro</Link>
            <div className="muted">Relevés, conversions, suivi des opérations et erreurs de base.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparence">
        <h2>Transparence</h2>
        <ul className="list">
          <li>
            <Link href="/methodologie">Méthodologie</Link>
            <div className="muted">Checklist “avant dépôt” et critères d’évaluation.</div>
          </li>
          <li>
            <Link href="/sources">Sources</Link>
            <div className="muted">Comment vérifier rapidement une info (pricing, docs, risques).</div>
          </li>
          <li>
            <Link href="/a-propos">À propos</Link>
            <div className="muted">Affiliation, mises à jour, corrections.</div>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
            <div className="muted">Question, correction, signalement.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Pages du site">
        <h2>Toutes les pages</h2>
        <ul className="list">
          <li>
            <Link href="/guide-etoro">Guide eToro</Link>
            <div className="muted">Page principale : CopyTrading, frais et sécurité.</div>
          </li>
          <li>
            <Link href="/bitpanda">Guide Bitpanda</Link>
            <div className="muted">Avis Bitpanda : fonctionnalités, frais (vue d’ensemble) et risques.</div>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
            <div className="muted">Tous les articles et guides.</div>
          </li>
          {pages
            .filter((p) => !pinned.has(p.slug))
            .map((p) => (
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
