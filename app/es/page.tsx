import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalizedBlogPosts } from '@/lib/content';
import { buildAlternatesForHome, getOgImage } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Guías de eToro y Bitpanda (2026) — Trading Verifie',
  description: 'Guías prácticas sobre eToro y Bitpanda: comisiones, CopyTrading, riesgos, retiros y checklist antes de depositar.',
  alternates: buildAlternatesForHome('es'),
  openGraph: {
    type: 'website',
    title: 'Guías de eToro y Bitpanda (2026) — Trading Verifie',
    description: 'Guías prácticas sobre eToro y Bitpanda: comisiones, CopyTrading, riesgos, retiros y checklist antes de depositar.',
    url: '/es',
    images: [{ url: getOgImage('es') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guías de eToro y Bitpanda (2026) — Trading Verifie',
    description: 'Guías prácticas sobre eToro y Bitpanda: comisiones, CopyTrading, riesgos, retiros y checklist antes de depositar.',
    images: [getOgImage('es')],
  },
};

export default async function EsHomePage() {
  const posts = await getLocalizedBlogPosts('es');

  return (
    <div className="stack">
      <section className="hero">
        <h1>Trading Verifie: guías de eToro y Bitpanda</h1>
        <p>
          Checklists claras para entender una plataforma, verificar comisiones y evitar errores antes de depositar. Contenido
          educativo (no es asesoramiento financiero).
        </p>
      </section>

      <section className="card" aria-label="Empieza aquí">
        <h2>Empieza aquí</h2>
        <ul className="list">
          <li>
            <Link href="/es/guide-etoro">Guía de eToro (pilar)</Link>
            <div className="muted">Cómo funciona, CopyTrading, checks de seguridad.</div>
          </li>
          <li>
            <Link href="/es/blog/comisiones-etoro-2025">Comisiones de eToro</Link>
            <div className="muted">Spreads, FX, fricciones clave.</div>
          </li>
          <li>
            <Link href="/es/blog/copytrading-empezar-2025">CopyTrading: cómo empezar</Link>
            <div className="muted">Setup, errores comunes, proceso mínimo.</div>
          </li>
          <li>
            <Link href="/es/bitpanda">Guía de Bitpanda</Link>
            <div className="muted">Alternativa cripto: overview + riesgos.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Cluster eToro">
        <h2>Cluster eToro</h2>
        <ul className="list">
          <li>
            <Link href="/es/guide-etoro">Guía de eToro</Link>
            <div className="muted">Pilar principal: funcionamiento, CopyTrading, comisiones y seguridad.</div>
          </li>
          <li>
            <Link href="/es/blog/comisiones-etoro-2025">Comisiones de eToro</Link>
            <div className="muted">0% comisión, spreads, FX y costes menos visibles.</div>
          </li>
          <li>
            <Link href="/es/blog/copytrading-empezar-2025">CopyTrading</Link>
            <div className="muted">Configuración inicial, disciplina y errores frecuentes.</div>
          </li>
          <li>
            <Link href="/es/blog/etoro-seguridad-regulacion-2026">Seguridad y regulación</Link>
            <div className="muted">Entidad, 2FA, fondos de clientes, producto y riesgo.</div>
          </li>
          <li>
            <Link href="/es/blog/etoro-depositos-retiros-2026">Depósitos y retiros</Link>
            <div className="muted">Plazos, método de pago, divisa y fricción operativa.</div>
          </li>
          <li>
            <Link href="/es/blog/alternativas-etoro-2026">Alternativas a eToro</Link>
            <div className="muted">XTB, DEGIRO o Bitpanda según el uso principal.</div>
          </li>
          <li>
            <Link href="/es/blog/etoro-fiscalidad-2026">Fiscalidad de eToro</Link>
            <div className="muted">Extractos, conversiones, seguimiento y errores básicos.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Transparencia">
        <h2>Transparencia</h2>
        <ul className="list">
          <li>
            <Link href="/es/metodologia">Metodología</Link>
            <div className="muted">Checklist antes de depositar + criterios.</div>
          </li>
          <li>
            <Link href="/es/fuentes">Fuentes</Link>
            <div className="muted">Cómo verificar un dato (pricing, docs, riesgos).</div>
          </li>
          <li>
            <Link href="/es/sobre">Sobre</Link>
            <div className="muted">Afiliación, actualizaciones, correcciones.</div>
          </li>
          <li>
            <Link href="/es/contacto">Contacto</Link>
            <div className="muted">Preguntas, correcciones, reportes.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Páginas del sitio">
        <h2>Páginas</h2>
        <ul className="list">
          <li>
            <Link href="/es/guide-etoro">Guía eToro</Link>
            <div className="muted">CopyTrading, comisiones y seguridad.</div>
          </li>
          <li>
            <Link href="/es/bitpanda">Guía Bitpanda</Link>
            <div className="muted">Reseña Bitpanda: funciones, comisiones (visión general) y riesgos.</div>
          </li>
          <li>
            <Link href="/es/blog">Blog</Link>
            <div className="muted">Todos los artículos y guías.</div>
          </li>
          <li>
            <Link href="/es/legal-notice">Aviso legal</Link>
            <div className="muted">Editor, hosting, afiliación y responsabilidad.</div>
          </li>
          <li>
            <Link href="/es/privacy-policy">Política de privacidad</Link>
            <div className="muted">Datos, cookies y tus derechos.</div>
          </li>
          <li>
            <Link href="/es/sobre">Sobre</Link>
            <div className="muted">Afiliación, actualizaciones, correcciones.</div>
          </li>
          <li>
            <Link href="/es/metodologia">Metodología</Link>
            <div className="muted">Checklist antes de depositar.</div>
          </li>
          <li>
            <Link href="/es/fuentes">Fuentes</Link>
            <div className="muted">Docs oficiales y verificación rápida.</div>
          </li>
          <li>
            <Link href="/es/contacto">Contacto</Link>
            <div className="muted">Preguntas, correcciones, reportes.</div>
          </li>
        </ul>
      </section>

      <section className="card" aria-label="Artículos">
        <h2>Artículos</h2>
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/es/blog/${p.slug}`}>{p.title}</Link>
              <div className="muted">{p.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
