import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link aria-label="Accueil" className="brand" href="/">
          <Image alt="Guide eToro" height={36} priority src="/images/logo.png" width={120} />
          <span>Guide eToro</span>
        </Link>

        <nav aria-label="Primary" className="nav">
          <Link href="/bitpanda">Bitpanda</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
        </nav>
      </div>
    </header>
  );
}

