function isBot() {
  const ua = (navigator.userAgent || '').toLowerCase();
  return /(bot|crawler|spider|bingpreview|google|yahoo|duckduckbot|baiduspider|yandex|sogou|exabot|facebot|ia_archiver|headlesschrome|semrush)/.test(ua);
}

// Centralise les URLs d'affiliation (évite d'exposer les URLs externes aux bots)
const AFFILIATE_TARGETS = {
  bitpanda: 'https://bitpanda.pxf.io/7XePPV'
};

function resolveAffiliateTarget(value) {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return AFFILIATE_TARGETS[value] || null;
}

function hydrateAffiliateLinks() {
  if (isBot()) return;
  document.querySelectorAll('a[data-aff]').forEach((link) => {
    const target = resolveAffiliateTarget(link.getAttribute('data-aff'));
    if (!target || link.dataset.affHydrated) return;

    link.setAttribute('href', target);
    link.dataset.affHydrated = '1';

    const relTokens = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    relTokens.add('sponsored');
    relTokens.add('nofollow');
    relTokens.add('noopener');
    link.setAttribute('rel', Array.from(relTokens).join(' '));
  });
}

function onReady() {
  hydrateAffiliateLinks();
  // -----------------------
  // Menu Burger (a11y + UX)
  // -----------------------
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (burger && nav) {
    const closeNav = () => {
      burger.classList.remove('active');
      nav.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    };

    burger.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      this.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Fermer le menu quand on clique ailleurs
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.burger') && !e.target.closest('.nav')) {
        closeNav();
      }
    });

    // Reset si on repasse en desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeNav();
    });

    // Fermer au clic sur un lien de nav
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
  }

  // ----------------
  // Newsletter Form
  // ----------------
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const popup = document.getElementById('popup-message');
      if (popup) {
        popup.classList.add('active');
        setTimeout(() => popup.classList.remove('active'), 10000);
      }
    });
  }

  // ----------------
  // Cookie Banner RGPD
  // ----------------
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');

  if (cookieBanner && acceptCookies && !localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'block'; // compatible avec tes styles
    acceptCookies.addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
      enableAnalyticsWithConsent();
    });
  }

  // -----------
  // Lite YouTube
  // -----------
  initLiteYoutube();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}

/**
 * Active GA4 uniquement APRES consentement (Consent Mode v2).
 * - Évite le double-chargement si une page l’a déjà fait.
 * - Si gtag n’existe pas encore, charge le script puis configure.
 */
function enableAnalyticsWithConsent() {
  if (window.__gaConsentApplied) return;
  window.__gaConsentApplied = true;

  // Assure l’existence de dataLayer
  window.dataLayer = window.dataLayer || [];
  // Déclare un shim gtag si absent
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { window.dataLayer.push(arguments); };
  }

  // Met à jour le consentement (nous n’activons que l’analytics)
  window.gtag('consent', 'update', {
    'analytics_storage': 'granted',
    // On laisse la pub/UA désactivée par défaut (CNIL 2025)
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });

  // Charge GA4 si nécessaire, puis configure
  if (!document.getElementById('ga4-tag')) {
    const s = document.createElement('script');
    s.id = 'ga4-tag';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-7936NTC37J';
    s.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', 'G-7936NTC37J', { anonymize_ip: true });
    };
    document.head.appendChild(s);
  } else {
    // Script déjà présent (inclus dans le <head> des pages)
    window.gtag('js', new Date());
    window.gtag('config', 'G-7936NTC37J', { anonymize_ip: true });
  }
}

function initLiteYoutube() {
  const embeds = document.querySelectorAll('.lite-youtube');
  if (!embeds.length) return;

  let connectionsWarmed = false;
  const warmConnections = () => {
    if (connectionsWarmed) return;
    connectionsWarmed = true;
    ['https://www.youtube.com', 'https://s.ytimg.com', 'https://i.ytimg.com'].forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  };

  embeds.forEach((embed) => {
    const videoId = embed.dataset.id;
    const playButton = embed.querySelector('.lite-youtube-btn');
    if (!videoId || !playButton) return;
    const title = embed.dataset.title || 'YouTube video';
    const params = embed.dataset.params ? `&${embed.dataset.params}` : '';

    const activate = () => {
      if (embed.classList.contains('lite-youtube-active')) return;
      embed.classList.add('lite-youtube-active');
      const iframe = document.createElement('iframe');
      iframe.loading = 'lazy';
      iframe.allowFullscreen = true;
      iframe.title = title;
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${params}`;
      embed.innerHTML = '';
      embed.appendChild(iframe);
    };

    playButton.addEventListener('pointerover', () => {
      warmConnections();
    }, { once: true });

    playButton.addEventListener('focus', warmConnections, { once: true });

    playButton.addEventListener('click', (event) => {
      event.preventDefault();
      warmConnections();
      activate();
    });
  });
}
