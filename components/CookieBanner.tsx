'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLangFromPathname, pageHref, PRIVACY_SLUGS, SITE } from '@/lib/site';

type Consent = 'accepted' | 'refused';

const STORAGE_KEY = 'trading_verifie_cookies_v1';

function ensureGa4Loaded() {
  const id = SITE.ga4Id;
  if (!id) return;

  const w = window as any;
  if (w.__trading_verifie_ga4_loaded) return;
  w.__trading_verifie_ga4_loaded = true;

  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };

  const ext = document.createElement('script');
  ext.async = true;
  ext.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(ext);

  w.gtag('js', new Date());
  w.gtag('config', id, { anonymize_ip: true });
}

const COPY = {
  fr: {
    text: "Nous utilisons des cookies analytiques (Google Analytics 4) pour améliorer le site.",
    accept: 'Accepter',
    refuse: 'Refuser',
    privacy: 'Politique de confidentialité',
  },
  en: {
    text: 'We use analytics cookies (Google Analytics 4) to improve the site.',
    accept: 'Accept',
    refuse: 'Refuse',
    privacy: 'Privacy policy',
  },
  es: {
    text: 'Usamos cookies analíticas (Google Analytics 4) para mejorar el sitio.',
    accept: 'Aceptar',
    refuse: 'Rechazar',
    privacy: 'Política de privacidad',
  },
  de: {
    text: 'Wir verwenden Analyse-Cookies (Google Analytics 4), um die Website zu verbessern.',
    accept: 'Akzeptieren',
    refuse: 'Ablehnen',
    privacy: 'Datenschutz',
  },
} as const;

export function CookieBanner() {
  const pathname = usePathname() ?? '/';
  const lang = getLangFromPathname(pathname);
  const t = COPY[lang] ?? COPY.fr;
  const privacyHref = pageHref(lang, PRIVACY_SLUGS[lang]);

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY) as Consent | null;
      if (consent === 'accepted') ensureGa4Loaded();
      if (consent === 'accepted' || consent === 'refused') {
        setHidden(true);
        return;
      }
      setHidden(false);
    } catch {
      setHidden(false);
    }
  }, []);

  function set(consent: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      // ignore
    }
    if (consent === 'accepted') ensureGa4Loaded();
    setHidden(true);
  }

  return (
    <div aria-label="Cookie banner" aria-live="polite" className={`cookie-banner ${hidden ? 'hidden' : ''}`} role="dialog">
      <p>
        {t.text} <Link href={privacyHref}>{t.privacy}</Link>
      </p>
      <div className="cookie-actions">
        <button className="cta-btn" onClick={() => set('accepted')} type="button">
          {t.accept}
        </button>
        <button className="cookie-btn" onClick={() => set('refused')} type="button">
          {t.refuse}
        </button>
      </div>
    </div>
  );
}

