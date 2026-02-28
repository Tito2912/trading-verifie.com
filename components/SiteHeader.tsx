import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand-group">
          <a aria-label="Accueil" className="brand" href="/">
            <Image alt="Guide eToro" height={36} priority src="/images/logo.png" width={120} />
          </a>
          <Link className="brand" href="/guide-etoro">
            Guide eToro
          </Link>
          <Link className="brand" href="/bitpanda">
            Guide Bitpanda
          </Link>
        </div>

        <nav aria-label="Primary" className="nav">
          <Link href="/blog">Blog</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
        </nav>
      </div>
    </header>
  );
}
