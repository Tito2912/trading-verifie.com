import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { NewsletterEnhancer } from '@/components/NewsletterEnhancer';
import { LangHtmlUpdater } from '@/components/LangHtmlUpdater';

export const metadata: Metadata = {
  title: {
    default: 'Guide eToro',
    template: '%s | Guide eToro',
  },
  description:
    'Avis eToro : CopyTrading, trading social, actions 0% commission, analyse des frais, sécurité et guide pas à pas pour bien débuter.',
  metadataBase: new URL('https://trading-verifie.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Guide eToro',
    description:
      'Avis eToro : CopyTrading, trading social, actions 0% commission, analyse des frais, sécurité et guide pas à pas pour bien débuter.',
    url: 'https://trading-verifie.com',
    images: [{ url: '/images/image-hero-fr.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guide eToro',
    description:
      'Avis eToro : CopyTrading, trading social, actions 0% commission, analyse des frais, sécurité et guide pas à pas pour bien débuter.',
    images: ['/images/image-hero-fr.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <LangHtmlUpdater />
        <SiteHeader />
        <main className="container">{children}</main>
        <NewsletterEnhancer />
        <SiteFooter />
      </body>
    </html>
  );
}
