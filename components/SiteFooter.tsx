'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ABOUT_SLUGS, CONTACT_SLUGS, LEGAL_SLUGS, METHODOLOGY_SLUGS, PRIVACY_SLUGS, SOURCES_SLUGS, pageHref } from '@/lib/site';

type Lang = 'fr' | 'en' | 'es' | 'de';

function getLangFromPathname(pathname: string): Lang {
  if (!pathname) return 'fr';
  const p = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  if (p === '/es' || p.startsWith('/es/')) return 'es';
  if (p === '/de' || p.startsWith('/de/')) return 'de';
  return 'fr';
}

export function SiteFooter() {
  const pathname = usePathname() ?? '/';
  const lang = getLangFromPathname(pathname);
  const labels =
    lang === 'en'
      ? { about: 'About', methodology: 'Methodology', sources: 'Sources', privacy: 'Privacy', legal: 'Legal notice', contact: 'Contact' }
      : lang === 'es'
        ? { about: 'Sobre', methodology: 'Metodología', sources: 'Fuentes', privacy: 'Privacidad', legal: 'Aviso legal', contact: 'Contacto' }
        : lang === 'de'
          ? { about: 'Über uns', methodology: 'Methodik', sources: 'Quellen', privacy: 'Datenschutz', legal: 'Rechtliche Hinweise', contact: 'Kontakt' }
          : { about: 'À propos', methodology: 'Méthodo', sources: 'Sources', privacy: 'Confidentialité', legal: 'Mentions légales', contact: 'Contact' };

  const aboutHref = pageHref(lang, ABOUT_SLUGS[lang]);
  const methodologyHref = pageHref(lang, METHODOLOGY_SLUGS[lang]);
  const sourcesHref = pageHref(lang, SOURCES_SLUGS[lang]);
  const privacyHref = pageHref(lang, PRIVACY_SLUGS[lang]);
  const legalHref = pageHref(lang, LEGAL_SLUGS[lang]);
  const contactHref = pageHref(lang, CONTACT_SLUGS[lang]);
  const nickelHref = '/compte-nickel';

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} — trading-verifie.com</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href={aboutHref}>{labels.about}</Link>
          <Link href={methodologyHref}>{labels.methodology}</Link>
          <Link href={sourcesHref}>{labels.sources}</Link>
          {lang === 'fr' ? <Link href={nickelHref}>Compte Nickel</Link> : null}
          <Link href={privacyHref}>{labels.privacy}</Link>
          <Link href={legalHref}>{labels.legal}</Link>
          <Link href={contactHref}>{labels.contact}</Link>
        </div>
      </div>
    </footer>
  );
}
