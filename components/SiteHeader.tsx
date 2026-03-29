'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSelect } from '@/components/LanguageSelect';
import {
  LEGAL_SLUGS,
  METHODOLOGY_SLUGS,
  SOURCES_SLUGS,
  blogIndexHref,
  homeHref,
  pageHref,
} from '@/lib/site';

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
  const labels =
    lang === 'en'
      ? { home: 'Home', blog: 'Blog', methodology: 'Methodology', sources: 'Sources', legal: 'Legal notice' }
      : lang === 'es'
        ? { home: 'Inicio', blog: 'Blog', methodology: 'Metodología', sources: 'Fuentes', legal: 'Aviso legal' }
        : lang === 'de'
          ? { home: 'Startseite', blog: 'Blog', methodology: 'Methodik', sources: 'Quellen', legal: 'Rechtliche Hinweise' }
          : { home: 'Accueil', blog: 'Blog', methodology: 'Méthodo', sources: 'Sources', legal: 'Mentions légales' };

  const guideEtoroHref = pageHref(lang, 'guide-etoro');
  const bitpandaHref = pageHref(lang, 'bitpanda');
  const nickelHref = '/compte-nickel';
  const blogHref = blogIndexHref(lang);
  const methodologyHref = pageHref(lang, METHODOLOGY_SLUGS[lang]);
  const sourcesHref = pageHref(lang, SOURCES_SLUGS[lang]);
  const legalHref = pageHref(lang, LEGAL_SLUGS[lang]);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand-group">
          <a aria-label={labels.home} className="brand" href={homeHref(lang)}>
            <Image alt="Guide eToro" height={36} priority src="/images/logo.png" width={120} />
          </a>
          <Link className="brand" href={guideEtoroHref}>
            Guide eToro
          </Link>
          <Link className="brand" href={bitpandaHref}>
            Guide Bitpanda
          </Link>
          {lang === 'fr' ? (
            <Link className="brand" href={nickelHref}>
              Nickel
            </Link>
          ) : null}
        </div>

        <div className="header-right">
          <nav aria-label="Primary" className="nav">
            <Link href={blogHref}>{labels.blog}</Link>
            <Link href={methodologyHref}>{labels.methodology}</Link>
            <Link href={sourcesHref}>{labels.sources}</Link>
            <Link href={legalHref}>{labels.legal}</Link>
          </nav>
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
}
