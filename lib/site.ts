export const SITE = {
  baseUrl: 'https://trading-verifie.com',
  domain: 'trading-verifie.com',
  defaultLang: 'fr',
  supportedLangs: ['fr', 'en', 'es', 'de'] as const,
} as const;

export type Lang = (typeof SITE.supportedLangs)[number];

export const LEGAL_SLUGS: Record<Lang, string> = {
  fr: 'mentions-legales',
  en: 'legal-notice',
  es: 'legal-notice',
  de: 'legal-notice',
};

export const PRIVACY_SLUGS: Record<Lang, string> = {
  fr: 'politique-de-confidentialite',
  en: 'privacy-policy',
  es: 'privacy-policy',
  de: 'privacy-policy',
};

export const ABOUT_SLUGS: Record<Lang, string> = {
  fr: 'a-propos',
  en: 'about',
  es: 'sobre',
  de: 'uber-uns',
};

export const METHODOLOGY_SLUGS: Record<Lang, string> = {
  fr: 'methodologie',
  en: 'methodology',
  es: 'metodologia',
  de: 'methodik',
};

export const SOURCES_SLUGS: Record<Lang, string> = {
  fr: 'sources',
  en: 'sources',
  es: 'fuentes',
  de: 'quellen',
};

export const CONTACT_SLUGS: Record<Lang, string> = {
  fr: 'contact',
  en: 'contact',
  es: 'contacto',
  de: 'kontakt',
};

function normalizePathname(pathname: string): string {
  let path = pathname || '/';
  if (path !== '/') path = path.replace(/\/+$/, '');
  return path.replace(/\.html$/, '');
}

export function getLangFromPathname(pathname: string): Lang {
  const clean = normalizePathname(pathname);
  const first = clean.split('/').filter(Boolean)[0];
  if (first === 'en' || first === 'es' || first === 'de') return first;
  return SITE.defaultLang;
}

export function prefixPath(lang: Lang): string {
  return lang === SITE.defaultLang ? '' : `/${lang}`;
}

export function homeHref(lang: Lang): string {
  const prefix = prefixPath(lang);
  return prefix || '/';
}

export function blogIndexHref(lang: Lang): string {
  const prefix = prefixPath(lang);
  return `${prefix}/blog` || '/blog';
}

export function pageHref(lang: Lang, slug: string): string {
  const prefix = prefixPath(lang);
  return `${prefix}/${slug}`.replace(/\/{2,}/g, '/');
}
