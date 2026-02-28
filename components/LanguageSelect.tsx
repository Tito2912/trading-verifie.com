'use client';

import { usePathname } from 'next/navigation';
import { useId } from 'react';

type Lang = 'fr' | 'en';

const LANGS: Array<{ code: Lang; label: string }> = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

const ROUTES: Array<Record<Lang, string>> = [
  { fr: '/', en: '/en' },
  { fr: '/blog', en: '/en/blog' },
  { fr: '/guide-etoro', en: '/en/guide-etoro' },
  { fr: '/bitpanda', en: '/en/bitpanda' },
  { fr: '/mentions-legales', en: '/en/legal-notice' },
  {
    fr: '/politique-de-confidentialite',
    en: '/en/privacy-policy',
  },
  {
    fr: '/pourquoi-choisir-etoro-2025',
    en: '/en/blog/why-choose-etoro-2025',
  },
  {
    fr: '/frais-etoro-2025',
    en: '/en/blog/etoro-fees-2025',
  },
  {
    fr: '/copytrading-demarrer-2025',
    en: '/en/blog/copytrading-start-2025',
  },
];

function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

function getLangFromPathname(pathname: string): Lang {
  const p = normalizePathname(pathname);
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  return 'fr';
}

function getFallbackUrl(lang: Lang): string {
  return ROUTES[0]?.[lang] ?? '/';
}

function getTargetUrl(pathname: string, targetLang: Lang): string {
  const p = normalizePathname(pathname);
  for (const entry of ROUTES) {
    const values = Object.values(entry).map(normalizePathname);
    if (!values.includes(p)) continue;
    return entry[targetLang];
  }
  return getFallbackUrl(targetLang);
}

export function LanguageSelect() {
  const selectId = useId();
  const pathname = usePathname() ?? '/';
  const currentLang = getLangFromPathname(pathname);

  return (
    <div className="lang-select-container">
      <span aria-hidden="true" className="globe-icon">
        <img alt="" height={18} src="/images/globe.svg" width={18} />
      </span>
      <label className="sr-only" htmlFor={selectId}>
        Langue
      </label>
      <select
        className="lang-select"
        id={selectId}
        onChange={(e) => {
          const lang = e.target.value as Lang;
          const nextUrl = getTargetUrl(pathname, lang);
          window.location.assign(nextUrl);
        }}
        value={currentLang}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
