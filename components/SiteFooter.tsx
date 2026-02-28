'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const prefix = lang === 'fr' ? '' : `/${lang}`;

  const privacyHref = lang === 'fr' ? '/politique-de-confidentialite' : `${prefix}/privacy-policy`;
  const legalHref = lang === 'fr' ? '/mentions-legales' : `${prefix}/legal-notice`;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} — trading-verifie.com</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href={privacyHref}>Confidentialité</Link>
          <Link href={legalHref}>Mentions légales</Link>
          <a href="mailto:contact.ecomshopfrance@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
