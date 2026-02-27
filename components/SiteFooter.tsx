'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { COPY, legalSegments, privacySegments } from '@/lib/copy';
import { pathFor, parsePathname } from '@/lib/navigation';

export function SiteFooter() {
  const pathname = usePathname() ?? '/';
  const { locale } = parsePathname(pathname);
  const copy = COPY[locale];

  const home = pathFor(locale, []);
  const blogHref = pathFor(locale, ['blog']);
  const bitpandaHref = pathFor(locale, ['bitpanda']);
  const legalHref = pathFor(locale, legalSegments(locale));
  const privacyHref = pathFor(locale, privacySegments(locale));

  return (
    <>
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo">
              <Image alt="Logo" height={49} loading="lazy" src="/images/logo.png" width={130} />
            </div>
            <div className="footer-links">
              <a href={legalHref}>{copy.footerLegal}</a>
              <a href={privacyHref}>{copy.footerPrivacy}</a>
              <a href={blogHref}>{copy.footerBlog}</a>
              <a href={bitpandaHref}>{copy.footerBitpanda}</a>
              <a href={`${home}#newsletter`}>{copy.footerNewsletter}</a>
            </div>
            <div className="footer-contact">
              <p>© 2026 - trading-verifie.com</p>
              <p>
                {copy.poweredBy} <strong>E-Com Shop</strong>
              </p>
              <p>
                <a href="mailto:contact.ecomshopfrance@gmail.com">contact.ecomshopfrance@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="site-network" style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(128,128,128,.35)' }}>
          <div className="container" style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
            <p style={{ margin: 0 }}>
              <strong>{copy.otherSites}</strong>{' '}
              <a href="https://tradingview-avis.com/" rel="noopener noreferrer" target="_blank">tradingview-avis.com</a> ·{' '}
              <a href="https://videocaptionstudio.com/" rel="noopener noreferrer" target="_blank">videocaptionstudio.com</a> ·{' '}
              <a href="https://vidforges.com/" rel="noopener noreferrer" target="_blank">vidforges.com</a>
            </p>
          </div>
        </div>
      </footer>

      <div className="cookie-banner" id="cookie-banner" style={{ display: 'none' }}>
        <p>
          {copy.cookieText} <a href={`${privacyHref}#cookies`}>{copy.cookieLinkText}</a>
        </p>
        <button className="cta-btn" id="accept-cookies">
          {copy.cookieOk}
        </button>
      </div>
    </>
  );
}

