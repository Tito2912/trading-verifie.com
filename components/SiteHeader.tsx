'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSelect } from '@/components/LanguageSelect';

type Lang = 'fr' | 'en' | 'es' | 'de';

function getLangFromPathname(pathname: string): Lang {
  if (!pathname) return 'fr';
  const p = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  if (p === '/es' || p.startsWith('/es/')) return 'es';
  if (p === '/de' || p.startsWith('/de/')) return 'de';
  return 'fr';
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const lang = getLangFromPathname(pathname);
  const prefix = lang === 'fr' ? '' : `/${lang}`;

  const homeHref = prefix || '/';
  const guideEtoroHref = `${prefix}/guide-etoro` || '/guide-etoro';
  const bitpandaHref = `${prefix}/bitpanda` || '/bitpanda';
  const blogHref = `${prefix}/blog` || '/blog';
  const legalHref = lang === 'fr' ? '/mentions-legales' : `${prefix}/legal-notice`;

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand-group">
          <a aria-label="Accueil" className="brand" href={homeHref}>
            <Image alt="Guide eToro" height={36} priority src="/images/logo.png" width={120} />
          </a>
          <Link className="brand" href={guideEtoroHref}>
            Guide eToro
          </Link>
          <Link className="brand" href={bitpandaHref}>
            Guide Bitpanda
          </Link>
        </div>

        <div className="header-right">
          <nav aria-label="Primary" className="nav">
            <Link href={blogHref}>Blog</Link>
            <Link href={legalHref}>Mentions légales</Link>
          </nav>
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
}
