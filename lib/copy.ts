import type { Locale } from '@/lib/site';

export const ETORO_AFFILIATE_URL = 'https://med.etoro.com/B217_A126072_TClick_Setoro-landing.aspx';

export type Copy = {
  disclosure: string;
  disclosureLinkText: string;
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

export const COPY: Record<Locale, Copy> = {
  fr: {
    disclosure:
      "⚠️ Ce site est un guide indépendant et participe au programme d'affiliation eToro. Nous percevons une commission si vous vous inscrivez via nos liens, sans surcoût pour vous.",
    disclosureLinkText: 'En savoir plus',
    ariaLogo: 'Accueil - Guide eToro',
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
    disclosure:
      '⚠️ This is an independent guide and participates in the eToro affiliate program. We earn a commission if you sign up through our links, at no extra cost to you.',
    disclosureLinkText: 'Learn more',
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
    disclosure:
      '⚠️ Esta es una guía independiente y participa en el programa de afiliación de eToro. Ganamos una comisión si te registras a través de nuestros enlaces, sin coste adicional para ti.',
    disclosureLinkText: 'Más información',
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
    disclosure:
      '⚠️ Dies ist ein unabhängiger Leitfaden und nimmt am eToro-Affiliate-Programm teil. Wir verdienen eine Provision, wenn Sie sich über unsere Links registrieren, ohne zusätzliche Kosten für Sie.',
    disclosureLinkText: 'Mehr erfahren',
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

export function legalSegments(locale: Locale): string[] {
  if (locale === 'fr') return ['mentions-legales'];
  return ['legal-notice'];
}

export function privacySegments(locale: Locale): string[] {
  if (locale === 'fr') return ['politique-de-confidentialite'];
  return ['privacy-policy'];
}

