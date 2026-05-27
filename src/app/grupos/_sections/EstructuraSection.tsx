/* Equipo de Investigación — org-hero-card design: face-forward portrait cards */

const director = {
  nombre: "William Klinger Brahan",
  cargo: "Director General",
  foto: "/assets/comunes/DIRECTOR.jpeg",
};

const subdirector = {
  nombre: "Giovanny Ramírez",
  cargo: "Subdirector de Investigaciones",
  foto: "/assets/comunes/SUBDIRECTOR.jpeg",
};

const coordinadores = [
  { nombre: "Carlos Ariel Rentería Jiménez", cargo: "Coord. Sociocultural", foto: "/assets/comunes/CARLOS_ARIEL.jpeg" },
  { nombre: "Lady Yulenis Vargas Porras",    cargo: "Coord. Ambiental",     foto: "/assets/comunes/LADY_VARGAS.png" },
  { nombre: "Moisés Mosquera Blandón",       cargo: "Coord. Productivo",    foto: "/assets/comunes/MOISES.jpeg" },
  { nombre: "Zulmary Valoyez Cardozo",       cargo: "Coord. Ecosistémico",  foto: "/assets/comunes/ZULMARY.jpeg" },
  { nombre: "Edsson Nagle Ramírez",          cargo: "Lab. de Datos",        foto: "/assets/comunes/EDSSON_NAGLE.jpeg" },
];

const gestores = [
  { nombre: "Gestor Subregión 1", cargo: "Gestor Subregional", foto: "/assets/comunes/DIRECTOR.jpeg" },
  { nombre: "Gestor Subregión 2", cargo: "Gestor Subregional", foto: "/assets/comunes/DIRECTOR.jpeg" },
  { nombre: "Gestor Subregión 3", cargo: "Gestor Subregional", foto: "/assets/comunes/DIRECTOR.jpeg" },
];

/* ── Hero Portrait Card ── */
function OrgHeroCard({
  nombre, cargo, foto, size = "lg",
}: {
  nombre: string; cargo: string; foto: string; size?: "lg" | "md";
}) {
  return (
    <div className={`org-hero-card org-hero-${size}`}>
      <div className="flip-shimmer-bar" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={foto} alt={nombre} className="org-hero-photo" loading="lazy" />
      <div className="org-hero-overlay" aria-hidden="true" />
      <div className="org-hero-info">
        <span className="org-hero-cargo">{cargo}</span>
        <h3 className="org-hero-nombre">{nombre}</h3>
      </div>
    </div>
  );
}

/* ── Small Portrait Card (coordinadores) ── */
function OrgSmCard({
  nombre, cargo, foto,
}: {
  nombre: string; cargo: string; foto: string;
}) {
  return (
    <div className="org-sm-card">
      <div className="org-sm-bar" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={foto} alt={nombre} className="org-sm-photo" loading="lazy" />
      <div className="org-sm-overlay" aria-hidden="true" />
      <div className="org-sm-info">
        <span className="org-sm-cargo">{cargo}</span>
        <p className="org-sm-nombre">{nombre}</p>
      </div>
    </div>
  );
}

/* ── Vertical connector ── */
function Connector() {
  return (
    <div className="org-connector" aria-hidden="true">
      <div className="org-connector-line" />
    </div>
  );
}

/* ── Horizontal spread line ── */
function SpreadLine() {
  return (
    <div className="org-spread" aria-hidden="true">
      <div className="org-spread-line" />
    </div>
  );
}

export default function EstructuraSection() {
  return (
    <section
      aria-labelledby="org-heading"
      style={{
        padding: "clamp(4rem,7vw,7rem) clamp(1.25rem,4vw,3rem)",
        background: "var(--surface)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header — centered */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem,5vw,5rem)" }}>
          <p className="sec-eyebrow">Liderazgo Científico</p>
          <h2 id="org-heading" className="sec-h2">EQUIPO DE INVESTIGACIÓN</h2>
          <p className="sec-sub" style={{ marginTop: ".6rem" }}>
            Equipo directivo comprometido con la conservación del Chocó Biogeográfico
          </p>
        </div>

        {/* Org tree */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* ── DIRECTOR ── */}
          <p className="org-level-label">Dirección General</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OrgHeroCard {...director} size="lg" />
          </div>

          <Connector />

          {/* ── SUBDIRECTOR ── */}
          <p className="org-level-label">Subdirección de Investigaciones</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <OrgHeroCard {...subdirector} size="md" />
          </div>

          <Connector />
          <SpreadLine />

          {/* ── COORDINADORES ── */}
          <p className="org-level-label">Coordinadores de Componente</p>
          <div id="org-coords">
            {coordinadores.map((c) => (
              <OrgSmCard key={c.nombre} {...c} />
            ))}
          </div>

          <Connector />
          <SpreadLine />

          {/* ── GESTORES ── */}
          <p className="org-level-label">Gestores de las Subregiones</p>
          <div id="org-gestores">
            {gestores.map((g) => (
              <OrgSmCard key={g.nombre} {...g} />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        /* ── Level label ── */
        .org-level-label {
          font-family: var(--font-ui);
          font-size: .60rem; font-weight: 800;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: var(--forest); margin-bottom: .85rem;
        }

        /* ── Hero Card (Director / Subdirector) ── */
        .org-hero-card {
          position: relative; border-radius: 18px; overflow: hidden;
          border: 2px solid rgba(232,150,15,.45);
          box-shadow: 0 24px 64px rgba(13,59,36,.28), 0 4px 16px rgba(13,59,36,.14);
          transition: transform .35s var(--ease), box-shadow .35s;
          flex-shrink: 0;
        }
        .org-hero-card:hover { transform:translateY(-5px) scale(1.015); box-shadow:0 36px 80px rgba(13,59,36,.35); }

        .org-hero-lg { width: 320px; height: 400px; }
        .org-hero-md { width: 280px; height: 340px; }

        .org-hero-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        .org-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 45%,
            rgba(9,40,25,.60) 72%,
            rgba(9,40,25,.93) 100%
          );
        }
        .org-hero-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1.4rem 1.6rem; z-index: 2;
        }
        .org-hero-cargo {
          display: block;
          font-family: var(--font-ui); font-size: .58rem; font-weight: 800;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: var(--amber); margin-bottom: .4rem;
        }
        .org-hero-nombre {
          font-family: var(--font-display);
          font-size: clamp(1.2rem,2vw,1.55rem);
          color: #fff; letter-spacing: .04em; line-height: 1.0;
        }

        /* ── Small Card (Coordinadores) ── */
        #org-coords {
          display: grid; grid-template-columns: repeat(5,1fr);
          gap: 12px; width: 100%;
        }
        .org-sm-card {
          position: relative; border-radius: 14px; overflow: hidden;
          height: 280px;
          border: 1.5px solid rgba(232,150,15,.35);
          box-shadow: 0 10px 30px rgba(13,59,36,.16);
          transition: transform .3s var(--ease), box-shadow .3s;
          cursor: default;
        }
        .org-sm-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 50px rgba(13,59,36,.25); }

        /* Gradient top bar for sm cards */
        .org-sm-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, var(--forest), var(--amber));
          z-index: 5;
        }
        .org-sm-photo {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }
        .org-sm-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(9,40,25,.65) 76%,
            rgba(9,40,25,.95) 100%
          );
        }
        .org-sm-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1rem 1rem .9rem; z-index: 2;
        }
        .org-sm-cargo {
          display: block;
          font-family: var(--font-ui); font-size: .54rem; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--amber); margin-bottom: .3rem;
        }
        .org-sm-nombre {
          font-family: var(--font-ui); font-size: .80rem; font-weight: 700;
          color: #fff; line-height: 1.25;
        }

        /* ── Connector ── */
        .org-connector {
          display: flex; justify-content: center;
          padding: .6rem 0;
        }
        .org-connector-line {
          width: 2px; height: 32px;
          background: linear-gradient(to bottom, var(--amber), var(--forest));
        }

        /* ── Spread line (before coordinadores row) ── */
        .org-spread { width: 100%; display: flex; justify-content: center; margin-bottom: .85rem; }
        .org-spread-line {
          width: 80%; height: 2px;
          background: linear-gradient(to right, transparent 5%, var(--border-active) 50%, transparent 95%);
        }

        /* ── Gestores grid ── */
        #org-gestores {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 12px; width: 100%; max-width: 740px;
        }

        /* ── Responsive ── */
        @media(max-width:1000px){
          #org-coords { grid-template-columns: repeat(3,1fr) !important; }
          #org-gestores { grid-template-columns: repeat(3,1fr) !important; }
          .org-sm-card { height: 240px; }
        }
        @media(max-width:640px){
          .org-hero-lg { width: 260px; height: 320px; }
          .org-hero-md { width: 230px; height: 280px; }
          #org-coords { grid-template-columns: repeat(2,1fr) !important; }
          #org-gestores { grid-template-columns: repeat(2,1fr) !important; }
          .org-sm-card { height: 220px; }
          .org-spread-line { width: 95%; }
        }
      `}</style>
    </section>
  );
}
