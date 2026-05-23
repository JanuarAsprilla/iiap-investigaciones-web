/* Talento Humano — researcher grid with real photos */

const team = [
  { nombre: "Yiskar Damián",     rol: "Investigador",   comp: "Ecosistémico",    foto: "/assets/comunes/YISKAR_DAMIAN.jpeg" },
  { nombre: "Robinson",          rol: "Investigador",   comp: "Productivo",      foto: "/assets/comunes/ROBINSON.jpeg" },
  { nombre: "Pedro",             rol: "Investigador",   comp: "Lab. de Datos",   foto: "/assets/comunes/PEDRO.jpeg" },
  { nombre: "Mirla",             rol: "Investigadora",  comp: "Productivo",      foto: "/assets/comunes/MIRLA.jpeg" },
  { nombre: "Ana",               rol: "Asistente",      comp: "Subdirección",    foto: "/assets/comunes/ANA.jpeg" },
  { nombre: "Silvio",            rol: "Apoyo",          comp: "Subdirección",    foto: "/assets/comunes/SILVIO.jpeg" },
  { nombre: "Yohanita",          rol: "Investigadora",  comp: "Sociocultural",   foto: "/assets/comunes/YOHANITA.jpeg" },
  { nombre: "Wilber",            rol: "Investigador",   comp: "Productivo",      foto: "/assets/comunes/WILBER.JPG" },
  { nombre: "Wilman",            rol: "Investigadora",  comp: "Sociocultural",   foto: "/assets/comunes/WILMAN.jpeg" },
  { nombre: "Eladio",            rol: "Investigador",   comp: "Ecosistémico",    foto: "/assets/comunes/ELADIO.jpeg" },
  { nombre: "Jovanny Pino",      rol: "Investigador",   comp: "Productivo",      foto: "/assets/comunes/JOVANNY_PINO.jpeg" },
  { nombre: "Luis Javier",       rol: "Investigador",   comp: "Ecosistémico",    foto: "/assets/comunes/LUIS_JAVIER.jpeg" },
  { nombre: "Zoraida",           rol: "Investigadora",  comp: "Ambiental",       foto: "/assets/comunes/ZORAIDA.JPG" },
  { nombre: "Erick Yair",        rol: "Investigador",   comp: "Ecosistémico",    foto: "/assets/comunes/ERICK_YAIR.jpeg" },
  { nombre: "Fairy Medina",      rol: "Investigadora",  comp: "Ambiental",       foto: "/assets/comunes/FAIRY.png" },
  { nombre: "Yirlesa",           rol: "Investigadora",  comp: "Ambiental",       foto: "/assets/comunes/YIRLESA.jpeg" },
  { nombre: "Reimer",            rol: "Investigador",   comp: "Ecosistémico",    foto: "/assets/comunes/REIMER.jpeg" },
  { nombre: "Nelcy",             rol: "Investigadora",  comp: "Ecosistémico",    foto: "/assets/comunes/NELCY.jpeg" },
];

/* Color por componente */
const compColor: Record<string, string> = {
  "Ecosistémico":  "var(--forest)",
  "Productivo":    "#E07B2A",
  "Ambiental":     "#26A65B",
  "Sociocultural": "#1B5E3B",
  "Lab. de Datos": "#1A3A5C",
  "Subdirección":  "var(--amber)",
};

export default function TalentoSection() {
  return (
    <section
      aria-labelledby="talento-heading"
      style={{ padding: "clamp(4rem,7vw,7rem) clamp(1.25rem,4vw,3rem)", background: "var(--surface)", borderTop: "1px solid var(--border-subtle)" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header — centered */}
        <div style={{ marginBottom: "clamp(2.5rem,4vw,4rem)", textAlign: "center", position: "relative" }}>
          {/* Ghost stat — absolute right */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", textAlign: "right" }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem,6vw,4.5rem)", color: "var(--forest-lt)", lineHeight: 1, letterSpacing: ".04em" }}>
              {team.length}+
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)" }}>
              Investigadores
            </p>
          </div>
          <p className="sec-eyebrow">Capital Humano</p>
          <h2 id="talento-heading" className="sec-h2">TALENTO HUMANO</h2>
          <p className="sec-sub" style={{ marginTop: ".5rem" }}>
            {team.length}+ profesionales dedicados a la investigación ambiental del Pacífico colombiano
          </p>
        </div>

        {/* Team grid */}
        <div
          id="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "16px",
          }}
        >
          {team.map((p) => (
            <div
              key={p.nombre}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                transition: "transform .35s var(--ease), box-shadow .35s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-5px) scale(1.02)"; el.style.boxShadow = "var(--sh)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "none"; }}
            >
              {/* Photo */}
              <div style={{ height: "170px", overflow: "hidden", position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.foto}
                  alt={p.nombre}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform .5s var(--ease)" }}
                />
                {/* Comp tag overlay */}
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: ".4rem .65rem",
                    background: "linear-gradient(to top, rgba(13,59,36,.85) 0%, transparent 100%)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: ".54rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "#fff" }}>
                    {p.comp}
                  </span>
                </div>
                {/* Color accent top bar — shimmer animated */}
                <div
                  className="talento-shimmer-bar"
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                    "--bar-color": compColor[p.comp] ?? "var(--forest)",
                  } as React.CSSProperties}
                />
              </div>

              {/* Info */}
              <div style={{ padding: ".75rem" }}>
                <h3 style={{ fontFamily: "var(--font-ui)", fontSize: ".82rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2, marginBottom: ".25rem" }}>
                  {p.nombre}
                </h3>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: ".68rem", color: "var(--text-muted)" }}>
                  {p.rol}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .talento-shimmer-bar {
          background: linear-gradient(
            to right,
            var(--bar-color) 0%,
            rgba(255,255,255,.65) 40%,
            var(--bar-color) 60%,
            var(--bar-color) 100%
          );
          background-size: 200% 100%;
          animation: talento-shimr 3.5s linear infinite;
        }
        @keyframes talento-shimr {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @media(max-width:1100px){#team-grid{grid-template-columns:repeat(4,1fr)!important;}}
        @media(max-width:720px) {#team-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:460px) {#team-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  );
}
