export const SITE = {
  baseUrl: 'https://trading-verifie.com',
  defaultLocale: 'fr',
  locales: ['fr', 'en', 'es', 'de'] as const,
} as const;

export type Locale = (typeof SITE.locales)[number];

export const HREFLANG: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es',
  de: 'de',
};

export function isLocale(value: string): value is Locale {
  return (SITE.locales as readonly string[]).includes(value);
}

export function localePrefix(locale: Locale): string {
  return locale === SITE.defaultLocale ? '' : `/${locale}`;
}

export function routePath(locale: Locale, segments: string[]): string {
  const prefix = localePrefix(locale);
  if (segments.length === 0) return prefix || '/';
  return `${prefix}/${segments.join('/')}`;
}

export function toAbsoluteUrl(urlOrPath: string): string {
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const base = SITE.baseUrl.replace(/\/$/, '');
  const p = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  return `${base}${p}`;
}

