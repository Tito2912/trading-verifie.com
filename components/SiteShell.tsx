import Image from 'next/image';
import type { PageData } from '@/lib/page-data';
import type { Locale } from '@/lib/site';
import { HREFLANG, routePath } from '@/lib/site';
import { LanguageSelect } from '@/components/LanguageSelect';

type Copy = {
  disclosure: string;
  disclosureLinkText: string;
  disclosureLinkHref: string;
  ariaLogo: string;
  altLogo: string;
  navAria: string;
  navWhy: string;
  navVideo: string;
  navTestimonials: string;
  navBlog: string;
  navFaq: string;
  navNewsletter: string;
  navContact: string;
  ariaMenu: string;
  langLabel: string;
  bitpandaLabel: string;
  etoroCta: string;
  footerLegal: string;
  footerPrivacy: string;
  footerBlog: string;
  footerBitpanda: string;
  footerNewsletter: string;
  poweredBy: string;
  otherSites: string;
  cookieText: string;
  cookieLinkText: string;
  cookieOk: string;
};

const COPY: Record<Locale, Copy> = {
  fr: {
    disclosure: "⚠️ Ce site est un guide indépendant et participe au programme d'affiliation eToro. Nous percevons une commission si vous vous inscrivez via nos liens, sans surcoût pour vous.",
    disclosureLinkText: 'En savoir plus',
    disclosureLinkHref: '/mentions-legales#affiliation',
    ariaLogo: "Accueil - Guide eToro",
    altLogo: 'Guide eToro - Site indépendant',
    navAria: 'Navigation principale',
    navWhy: 'Pourquoi eToro',
    navVideo: 'Vidéo',
    navTestimonials: 'Témoignages',
    navBlog: 'Blog',
    navFaq: 'FAQ',
    navNewsletter: 'Newsletter',
    navContact: 'Contact',
    ariaMenu: 'Menu',
    langLabel: 'Sélectionner la langue',
    bitpandaLabel: 'Avis Bitpanda',
    etoroCta: 'Essayer eToro',
    footerLegal: 'Mentions légales',
    footerPrivacy: 'Politique de confidentialité',
    footerBlog: 'Blog',
    footerBitpanda: 'Bitpanda',
    footerNewsletter: 'Newsletter',
    poweredBy: 'Propulsé par',
    otherSites: 'Nos autres sites :',
    cookieText: 'Ce site utilise des cookies pour vous garantir la meilleure expérience.',
    cookieLinkText: 'En savoir plus',
    cookieOk: 'OK',
  },
  en: {
    disclosure: '⚠️ This is an independent guide and participates in the eToro affiliate program. We earn a commission if you sign up through our links, at no extra cost to you.',
    disclosureLinkText: 'Learn more',
    disclosureLinkHref: '/en/legal-notice#affiliation',
    ariaLogo: 'Home - eToro Guide',
    altLogo: 'eToro Guide - Independent Site',
    navAria: 'Main navigation',
    navWhy: 'Why eToro',
    navVideo: 'Video',
    navTestimonials: 'Testimonials',
    navBlog: 'Blog',
    navFaq: 'FAQ',
    navNewsletter: 'Newsletter',
    navContact: 'Contact',
    ariaMenu: 'Menu',
    langLabel: 'Select language',
    bitpandaLabel: 'Bitpanda review',
    etoroCta: 'Try eToro',
    footerLegal: 'Legal notice',
    footerPrivacy: 'Privacy policy',
    footerBlog: 'Blog',
    footerBitpanda: 'Bitpanda',
    footerNewsletter: 'Newsletter',
    poweredBy: 'Powered by',
    otherSites: 'Our other sites :',
    cookieText: 'This site uses cookies to ensure the best experience.',
    cookieLinkText: 'Learn more',
    cookieOk: 'OK',
  },
  es: {
    disclosure: '⚠️ Esta es una guía independiente y participa en el programa de afiliación de eToro. Ganamos una comisión si te registras a través de nuestros enlaces, sin coste adicional para ti.',
    disclosureLinkText: 'Más información',
    disclosureLinkHref: '/es/legal-notice#affiliation',
    ariaLogo: 'Inicio - Guía eToro',
    altLogo: 'Guía eToro - Sitio independiente',
    navAria: 'Navegación principal',
    navWhy: '¿Por qué eToro',
    navVideo: 'Video',
    navTestimonials: 'Testimonios',
    navBlog: 'Blog',
    navFaq: 'FAQ',
    navNewsletter: 'Newsletter',
    navContact: 'Contacto',
    ariaMenu: 'Menú',
    langLabel: 'Seleccionar idioma',
    bitpandaLabel: 'Reseña Bitpanda',
    etoroCta: 'Probar eToro',
    footerLegal: 'Aviso legal',
    footerPrivacy: 'Política de privacidad',
    footerBlog: 'Blog',
    footerBitpanda: 'Bitpanda',
    footerNewsletter: 'Newsletter',
    poweredBy: 'Impulsado por',
    otherSites: 'Nuestros otros sitios :',
    cookieText: 'Este sitio utiliza cookies para garantizar la mejor experiencia.',
    cookieLinkText: 'Más información',
    cookieOk: 'OK',
  },
  de: {
    disclosure: '⚠️ Dies ist ein unabhängiger Leitfaden und nimmt am eToro-Affiliate-Programm teil. Wir verdienen eine Provision, wenn Sie sich über unsere Links registrieren, ohne zusätzliche Kosten für Sie.',
    disclosureLinkText: 'Mehr erfahren',
    disclosureLinkHref: '/de/legal-notice#affiliation',
    ariaLogo: 'Startseite - eToro Guide',
    altLogo: 'eToro Guide - Unabhängige Seite',
    navAria: 'Hauptnavigation',
    navWhy: 'Warum eToro',
    navVideo: 'Video',
    navTestimonials: 'Zeugnisse',
    navBlog: 'Blog',
    navFaq: 'FAQ',
    navNewsletter: 'Newsletter',
    navContact: 'Kontakt',
    ariaMenu: 'Menü',
    langLabel: 'Sprache auswählen',
    bitpandaLabel: 'Bitpanda Bewertung',
    etoroCta: 'eToro testen',
    footerLegal: 'Impressum',
    footerPrivacy: 'Datenschutz',
    footerBlog: 'Blog',
    footerBitpanda: 'Bitpanda',
    footerNewsletter: 'Newsletter',
    poweredBy: 'Bereitgestellt von',
    otherSites: 'Unsere anderen Websites :',
    cookieText: 'Diese Website verwendet Cookies, um die beste Erfahrung zu gewährleisten.',
    cookieLinkText: 'Mehr erfahren',
    cookieOk: 'OK',
  },
};

const ETORO_AFFILIATE_URL = 'https://med.etoro.com/B217_A126072_TClick_Setoro-landing.aspx';

function buildLanguageOptions(page: PageData): Array<{ label: string; value: string }> {
  const candidates = [
    { locale: 'fr', label: 'FR', hreflang: HREFLANG.fr },
    { locale: 'en', label: 'EN', hreflang: HREFLANG.en },
    { locale: 'es', label: 'ES', hreflang: HREFLANG.es },
    { locale: 'de', label: 'DE', hreflang: HREFLANG.de },
  ] as const;

  const fallbacks = {
    fr: routePath('fr', []),
    en: routePath('en', []),
    es: routePath('es', []),
    de: routePath('de', []),
  } as const;

  return candidates.map((c) => {
    const href = page.alternates[c.hreflang] ?? page.alternates['x-default'] ?? fallbacks[c.locale];
    const relative = href.startsWith('http') ? new URL(href).pathname : href;
    return { label: c.label, value: relative };
  });
}

function currentLanguageValue(page: PageData): string {
  const href = page.alternates[HREFLANG[page.locale]];
  if (!href) return routePath(page.locale, page.segments);
  return href.startsWith('http') ? new URL(href).pathname : href;
}

export function SiteShell({ page, children }: { page: PageData; children: React.ReactNode }) {
  const copy = COPY[page.locale];
  const home = page.locale === 'fr' ? '/' : `/${page.locale}/`;

  const blogHref = routePath(page.locale, ['blog']);
  const bitpandaHref = routePath(page.locale, ['bitpanda']);
  const legalHref = page.locale === 'fr' ? routePath('fr', ['mentions-legales']) : routePath(page.locale, ['legal-notice']);
  const privacyHref = page.locale === 'fr' ? routePath('fr', ['politique-de-confidentialite']) : routePath(page.locale, ['privacy-policy']);

  const languageOptions = buildLanguageOptions(page);
  const currentLangValue = currentLanguageValue(page);

  return (
    <>
      <div className="affiliation-disclosure">
        {copy.disclosure} <a href={copy.disclosureLinkHref}>{copy.disclosureLinkText}</a>
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

      <div lang={page.locale === 'fr' ? 'fr' : page.locale}>{children}</div>

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

      {page.jsonLdBlocks.map((block, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: block }} />
      ))}
    </>
  );
}
