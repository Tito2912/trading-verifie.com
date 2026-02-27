'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LanguageSelect } from '@/components/LanguageSelect';
import { COPY, ETORO_AFFILIATE_URL, legalSegments } from '@/lib/copy';
import { pathFor, parsePathname, translateSegments } from '@/lib/navigation';
import { SITE } from '@/lib/site';

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const parsed = parsePathname(pathname);
  const locale = parsed.locale;
  const segments = parsed.segments;
  const copy = COPY[locale];

  const home = pathFor(locale, []);

  const blogHref = pathFor(locale, ['blog']);
  const bitpandaHref = pathFor(locale, ['bitpanda']);
  const legalHref = pathFor(locale, legalSegments(locale));

  const languageOptions = SITE.locales.map((l) => ({
    label: l.toUpperCase(),
    value: pathFor(l, translateSegments(parsed, l)),
  }));

  const currentLangValue = pathFor(locale, segments);

  return (
    <>
      <div className="affiliation-disclosure">
        {copy.disclosure} <a href={`${legalHref}#affiliation`}>{copy.disclosureLinkText}</a>
      </div>

      <header className="header" role="banner">
        <div className="container">
          <a aria-label={copy.ariaLogo} className="logo" href={home}>
            <Image alt={copy.altLogo} height={60} loading="lazy" src="/images/logo.png" width={160} />
          </a>

          <button aria-controls="site-nav" aria-expanded="false" aria-label={copy.ariaMenu} className="burger">
            <span />
            <span />
            <span />
          </button>

          <nav aria-label={copy.navAria} className="nav" id="site-nav" role="navigation">
            <div className="nav-inner">
              <a className="nav-link" href={`${home}#avantages`}>{copy.navWhy}</a>
              <a className="nav-link" href={`${home}#video`}>{copy.navVideo}</a>
              <a className="nav-link" href={`${home}#temoignages`}>{copy.navTestimonials}</a>
              <a className="nav-link" href={blogHref}>{copy.navBlog}</a>
              <a className="nav-link" href={`${home}#faq`}>{copy.navFaq}</a>
              <a className="nav-link" href={`${home}#newsletter`}>{copy.navNewsletter}</a>
              <a className="nav-link" href={`${home}#footer`}>{copy.navContact}</a>
            </div>
          </nav>

          <div className="header-actions">
            <div className="lang-select-container">
              <span className="globe-icon">
                <Image alt="Langue" height={18} src="/images/globe.svg" style={{ opacity: 0.7 }} width={18} />
              </span>
              <LanguageSelect ariaLabel={copy.langLabel} options={languageOptions} value={currentLangValue} />
            </div>

            <a aria-label={copy.bitpandaLabel} className="header-link" href={bitpandaHref}>
              {copy.bitpandaLabel}
            </a>

            <a aria-label={copy.etoroCta} className="cta-btn header-cta" href={ETORO_AFFILIATE_URL} rel="noopener">
              {copy.etoroCta}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

