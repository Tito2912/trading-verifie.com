import type { ReactNode } from 'react';
import Script from 'next/script';
import './globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

export default function RootLayout({ children }: { children: ReactNode }) {
  const assetVersion = process.env.COMMIT_REF?.slice(0, 8) ?? 'dev';
  return (
    <html lang="fr">
      <head>
        <link href="/images/favicon.png" rel="icon" type="image/png" />
        <link href="/images/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />

        <link as="font" crossOrigin="anonymous" href="/fonts/Inter-400-latin.woff2" rel="preload" type="font/woff2" />
        <link as="font" crossOrigin="anonymous" href="/fonts/Inter-600-latin.woff2" rel="preload" type="font/woff2" />
        <link as="font" crossOrigin="anonymous" href="/fonts/Inter-700-latin.woff2" rel="preload" type="font/woff2" />

        <link href={`/style.min.css?v=${assetVersion}`} rel="stylesheet" />
      </head>
      <body>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('consent','default', {
              'ad_storage':'denied',
              'ad_user_data':'denied',
              'ad_personalization':'denied',
              'analytics_storage':'denied',
              'wait_for_update': 500
            });
            window.__GA_MEASUREMENT_ID__ = 'G-7936NTC37J';
          `}
        </Script>

        <SiteHeader />
        {children}
        <SiteFooter />

        <Script src={`/main.min.js?v=${assetVersion}`} strategy="beforeInteractive" />
      </body>
    </html>
  );
}
