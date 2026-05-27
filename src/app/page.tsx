import SiteNav from "@/components/layout/SiteNav";
import PortalCard3D from "@/components/ui/PortalCard3D";

const portalSections = [
  {
    label: "Planeación",
    description:
      "Marco estratégico cuatrienal y plan operativo que guían la investigación ambiental del IIAP hacia el Chocó Biogeográfico.",
    href: "/planeacion",
    imageSrc: "/assets/comunes/YDRAY-YDRAY-Sede-Tecnica_02.gif",
  },
  {
    label: "Centros de Investigación",
    description:
      "Infraestructura científica de campo: instalaciones, bioespacios y laboratorios para investigación en biodiversidad tropical.",
    href: "/centros",
    imageSrc: "/assets/centros/SENDERO.jpeg",
  },
  {
    label: "Grupos de Investigación",
    description:
      "Componentes programáticos y grupos de investigación que articulan el conocimiento científico con las comunidades del Pacífico.",
    href: "/grupos",
    imageSrc: "/assets/grupos/COMPONENTE_ECOSISTEMICO.jpeg",
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
              Conocimiento científico para la biodiversidad y las comunidades
              del Chocó Biogeográfico. Tres ejes de trabajo que articulan
              planeación, territorio y ciencia.
            </p>

            {/* CTAs */}
            <div className="hero-ctas anim-4">
              <a href="#portal" className="btn-prim">
                Explorar portal
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://iiap.org.co"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-sm"
              >
                iiap.org.co ↗
              </a>
            </div>

          </div>

          {/* Columna derecha — foto */}
          <div className="hero-frame-wrap" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/comunes/YDRAY-YDRAY-Sede-Tecnica_02.gif"
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
              <p className="eyebrow" style={{ color: "var(--forest)" }}>
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: "24px", height: "1.5px",
                    background: "var(--forest)",
                    marginRight: "10px",
                    verticalAlign: "middle",
                  }}
                />
                Portal de investigación
              </p>
              <h2 className="portal-meta-title">Tres ejes estratégicos</h2>
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
