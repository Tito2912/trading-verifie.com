import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} — trading-verifie.com</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/politique-de-confidentialite">Confidentialité</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
          <a href="mailto:contact.ecomshopfrance@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}

