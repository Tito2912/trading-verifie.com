import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'eToro & Bitpanda Guides (2026) — Trading Verifie',
  description: 'Praxisnahe eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Risiken, Auszahlungen und Checkliste vor Einzahlung.',
  alternates: buildAlternatesForHome('de'),
  openGraph: {
    type: 'website',
    title: 'eToro & Bitpanda Guides (2026) — Trading Verifie',
    description: 'Praxisnahe eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Risiken, Auszahlungen und Checkliste vor Einzahlung.',
    url: '/de',
    images: [{ url: getOgImage('de') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eToro & Bitpanda Guides (2026) — Trading Verifie',
    description: 'Praxisnahe eToro- und Bitpanda-Guides: Gebühren, CopyTrading, Risiken, Auszahlungen und Checkliste vor Einzahlung.',
    images: [getOgImage('de')],
  },
};

export default async function DeHomePage() {
  const posts = await getLocalizedBlogPosts('de');

  return (
    <div className="stack">
      <section className="hero">
        <h1>Trading Verifie: eToro &amp; Bitpanda Guides</h1>
        <p>
          Klare Checklisten, um Plattformen zu verstehen, Gebühren zu prüfen und Fehler vor der Einzahlung zu vermeiden. Educational content
          (keine Anlageberatung).
        </p>
      </section>

      <section className="card" aria-label="Start">
        <h2>Start</h2>
        <ul className="list">
          <li>
            <Link href="/de/guide-etoro">eToro Guide (Pillar)</Link>
            <div className="muted">Wie es funktioniert, CopyTrading, Safety-Checks.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-gebuehren-2025">eToro Gebühren</Link>
            <div className="muted">Spreads, FX, wichtige Friktionen.</div>
          </li>
          <li>
            <Link href="/de/blog/copytrading-start-2025">CopyTrading: richtig starten</Link>
            <div className="muted">Setup, typische Fehler, Minimalprozess.</div>
          </li>
          <li>
            <Link href="/de/bitpanda">Bitpanda Guide</Link>
            <div className="muted">Krypto-Alternative: Überblick + Risiken.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="eToro Cluster">
        <h2>eToro Cluster</h2>
        <ul className="list">
          <li>
            <Link href="/de/guide-etoro">eToro Guide</Link>
            <div className="muted">Haupt-Pillar: Funktionsweise, CopyTrading, Gebühren und Sicherheit.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-gebuehren-2025">eToro Gebühren</Link>
            <div className="muted">0% Provision, Spreads, FX und weniger sichtbare Kosten.</div>
          </li>
          <li>
            <Link href="/de/blog/copytrading-start-2025">CopyTrading</Link>
            <div className="muted">Setup, Disziplin und typische Anfängerfehler.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-sicherheit-regulierung-2026">Sicherheit & Regulierung</Link>
            <div className="muted">Einheit, 2FA, Kundengelder, Produktlogik und Risiken.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-einzahlung-auszahlung-2026">Einzahlung & Auszahlung</Link>
            <div className="muted">Dauer, Zahlungsmethode, Währung und operative Friktion.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-alternativen-2026">Alternativen zu eToro</Link>
            <div className="muted">XTB, DEGIRO oder Bitpanda je nach Use Case.</div>
          </li>
          <li>
            <Link href="/de/blog/etoro-steuern-2026">eToro Steuern</Link>
            <div className="muted">Auszüge, Umrechnungen, Tracking und vermeidbare Fehler.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparenz">
        <h2>Transparenz</h2>
        <ul className="list">
          <li>
            <Link href="/de/methodik">Methodik</Link>
            <div className="muted">Checkliste vor Einzahlung + Kriterien.</div>
          </li>
          <li>
            <Link href="/de/quellen">Quellen</Link>
            <div className="muted">Claims schnell prüfen (Pricing, Docs, Risiken).</div>
          </li>
          <li>
            <Link href="/de/uber-uns">Über uns</Link>
            <div className="muted">Affiliate, Updates, Korrekturen.</div>
          </li>
          <li>
            <Link href="/de/kontakt">Kontakt</Link>
            <div className="muted">Fragen, Korrekturen, Hinweise.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Seiten der Website">
        <h2>Seiten</h2>
        <ul className="list">
          <li>
            <Link href="/de/guide-etoro">eToro Guide</Link>
            <div className="muted">CopyTrading, Gebühren, Sicherheit.</div>
          </li>
          <li>
            <Link href="/de/bitpanda">Bitpanda Guide</Link>
            <div className="muted">Bitpanda Review: Funktionen, Gebühren (Überblick) und Risiken.</div>
          </li>
          <li>
            <Link href="/de/blog">Blog</Link>
            <div className="muted">Alle Artikel und Guides.</div>
          </li>
          <li>
            <Link href="/de/legal-notice">Rechtliche Hinweise</Link>
            <div className="muted">Herausgeber, Hosting, Affiliate-Hinweis und Haftung.</div>
          </li>
          <li>
            <Link href="/de/privacy-policy">Datenschutz</Link>
            <div className="muted">Daten, Cookies und Ihre Rechte.</div>
          </li>
          <li>
            <Link href="/de/uber-uns">Über uns</Link>
            <div className="muted">Affiliate, Updates, Korrekturen.</div>
          </li>
          <li>
            <Link href="/de/methodik">Methodik</Link>
            <div className="muted">Checkliste vor Einzahlung.</div>
          </li>
          <li>
            <Link href="/de/quellen">Quellen</Link>
            <div className="muted">Offizielle Docs und schneller Check.</div>
          </li>
          <li>
            <Link href="/de/kontakt">Kontakt</Link>
            <div className="muted">Fragen, Korrekturen, Hinweise.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Artikel">
        <h2>Artikel</h2>
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/de/blog/${p.slug}`}>{p.title}</Link>
              <div className="muted">{p.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
