import SiteNav from "@/components/layout/SiteNav";
import PortalCard3D from "@/components/ui/PortalCard3D";

const portalSections = [
  {
    label: "Planeación",
    description:
      "El IIAP orienta su gestión mediante instrumentos como el POA, PICIA, PENIA y el Plan Estratégico, articulados con políticas nacionales y territoriales para el desarrollo sostenible del Chocó Biogeográfico.",
    href: "/planeacion",
    imageSrc: "/assets/planeacion/planeacion.webp",
  },
  {
    label: "Centros de Investigación",
    description:
      "Sede de investigación básica y aplicada, con bioespacios, laboratorios e infraestructura para la investigación desarrollada en el Chocó Biogeográfico.",
    href: "/centros",
    imageSrc: "/assets/centros/sendero.webp",
  },
  {
    label: "Componentes",
    description:
      "Cuatro componentes programáticos y un Laboratorio de Datos que articulan la ciencia ambiental con el territorio y las comunidades del Chocó Biogeográfico.",
    href: "/componentes",
    imageSrc: "/assets/grupos/componente-ecosistemico.webp",
  },
  {
    label: "Grupos de Investigación",
    description:
      "Cinco grupos especializados que generan conocimiento desde y para las comunidades étnicas y la biodiversidad del Chocó Biogeográfico.",
    href: "/grupos",
    imageSrc: "/assets/grupos/componente-sociocultural.webp",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteNav />

      <main id="main-content">

        {/* ════════════════════════════════════════
            HERO — Split Layout Warm
        ════════════════════════════════════════ */}
        <section aria-labelledby="portal-heading" className="hero-section">

          {/* Columna izquierda — contenido */}
          <div className="hero-inner">

            {/* Eyebrow */}
            <p className="hero-eye anim-1">
              Instituto de Investigaciones Ambientales del Pacífico
            </p>

            {/* Heading */}
            <h1 id="portal-heading" className="hero-h1 anim-2">
              SUBDIRECCIÓN
              <br />
              <span className="hero-gold-word">INVESTIGACIONES</span>
            </h1>

            {/* Descriptor */}
            <p className="hero-desc anim-3">
              Ciencia básica, experimental y aplicada desde el Chocó Biogeográfico.
              Generamos conocimiento científico y tradicional para la conservación de la biodiversidad,
              el desarrollo sostenible y las políticas públicas de la región.
            </p>



          </div>

          {/* Columna derecha — foto */}
          <div className="hero-frame-wrap" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/comunes/sede-tecnica.gif"
              alt=""
              className="hero-frame-img"
              fetchPriority="high"
            />
          </div>

        </section>

        {/* ════════════════════════════════════════
            PORTAL — 3 cards
        ════════════════════════════════════════ */}
        <div
          style={{
            background: "var(--bg)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <section
            id="portal"
            aria-label="Secciones del portal de investigación"
            className="portal-section"
          >
            {/* Header */}
            <div className="portal-meta">
              <h2 className="portal-meta-title">Cuatro ejes estratégicos</h2>
            </div>

            {/* Escenario 3D */}
            <div className="cards-stage">
              {portalSections.map((section, i) => (
                <div
                  key={section.href}
                  className="card-slot"
                  data-index={String(i)}
                >
                  <PortalCard3D {...section} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: "1px solid var(--border-subtle)",
            padding: "1.5rem clamp(1.25rem, 4vw, 3rem)",
            background: "var(--bg)",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--t-xs)",
                color: "var(--text-muted)",
              }}
            >
              © {new Date().getFullYear()} IIAP — Instituto de Investigaciones
              Ambientales del Pacífico
            </p>
            <a
              href="https://iiap.org.co"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "var(--t-xs)",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color .2s",
              }}
            >
              iiap.org.co ↗
            </a>
          </div>
        </footer>

      </main>
    </>
  );
}
