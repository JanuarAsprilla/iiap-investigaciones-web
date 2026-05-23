/* Comunidad Digital — social media grid */

const redes = [
  {
    nombre: "Facebook",
    handle: "@IIAP.Colombia",
    href: "https://www.facebook.com/IIAPCO",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    nombre: "Instagram",
    handle: "@iiap_pacifico",
    href: "https://www.instagram.com/iiap_col",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    nombre: "YouTube",
    handle: "IIAP Oficial",
    href: "https://www.youtube.com/channel/UCuxOL0BAHcc_AqXHTH4Vaiw",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    nombre: "X / Twitter",
    handle: "@IIAP_oficial",
    href: "https://x.com/iiap_co",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.836L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    nombre: "LinkedIn",
    handle: "IIAP Colombia",
    href: "https://co.linkedin.com/in/instituto-de-investigaciones-ambientales-del-pac%C3%ADfico-iiap-john-von-neumann-169883377",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5ZM0 8h5V24H0V8ZM8 8h4.8v2.2h.07c.66-1.26 2.28-2.7 4.72-2.7 5.05 0 5.98 3.33 5.98 7.65V24h-5v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.96V24h-5V8Z"/>
      </svg>
    ),
  },
  {
    nombre: "TikTok",
    handle: "@iiap_pacifico",
    href: "https://www.tiktok.com/@iiapcolombia",
    color: "#010101",
    icon: (
      <svg viewBox="0 0 448 512" fill="currentColor" width="26" height="26">
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
      </svg>
    ),
  },
  {
    nombre: "Spotify",
    handle: "IIAP Podcast",
    href: "https://open.spotify.com/user/31plbjolzlfec7pjx6qcqejxwsua",
    color: "#1DB954",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.1 17.04c-.18.28-.52.37-.8.2-2.2-1.34-4.96-1.64-8.2-.84-.33.08-.66-.13-.75-.47-.08-.33.12-.66.47-.75 3.52-.88 6.62-.53 9.08.99.28.18.37.52.2.84zm1.17-3.58c-.22.34-.64.46-.98.24-2.53-1.55-6.39-2.01-9.4-1.03-.37.13-.78-.06-.92-.43-.13-.37.06-.78.43-.92 3.32-1.17 7.62-.67 10.51 1.21.35.22.45.65.36.93zm.09-3.6c-.26.4-.8.53-1.2.27-2.9-1.72-7.34-2.22-10.8-1.13-.46.14-.96-.11-1.1-.58-.14-.47.11-.97.58-1.1 3.88-1.18 8.7-.63 11.9 1.3.42.25.55.82.62 1.14z"/>
      </svg>
    ),
  },
];

export default function ComunidadSection() {
  return (
    <section
      aria-labelledby="social-heading"
      style={{
        padding: "clamp(4rem,7vw,7rem) clamp(1.25rem,4vw,3rem)",
        background: "var(--surface)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,4vw,4rem)" }}>
          <p className="sec-eyebrow">Presencia Digital</p>
          <h2 id="social-heading" className="sec-h2">COMUNIDAD DIGITAL</h2>
          <p className="sec-sub" style={{ marginTop: ".6rem", maxWidth: "52ch", margin: ".6rem auto 0" }}>
            Conecta con nuestra comunidad científica y accede a contenido de investigación en tiempo real
          </p>
        </div>

        {/* Social grid */}
        <div
          id="soc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "14px",
          }}
        >
          {redes.map((red) => (
            <a
              key={red.nombre}
              href={red.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar ${red.nombre} del IIAP`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".75rem",
                padding: "1.75rem 1.25rem",
                background: "var(--bg)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--r-lg)",
                textDecoration: "none",
                transition: "transform .3s var(--ease), box-shadow .3s, border-color .3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px) scale(1.02)";
                el.style.boxShadow = "var(--sh)";
                el.style.borderColor = "var(--border-active)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow = "none";
                el.style.borderColor = "var(--border-subtle)";
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: "56px", height: "56px",
                  borderRadius: "50%",
                  background: `${red.color}18`,
                  border: `1.5px solid ${red.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: red.color,
                  transition: "transform .25s",
                }}
              >
                {red.icon}
              </div>

              {/* Name */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: ".85rem", fontWeight: 700, color: "var(--text)", marginBottom: ".2rem" }}>
                  {red.nombre}
                </p>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: ".72rem", color: "var(--text-muted)" }}>
                  {red.handle}
                </p>
              </div>

              {/* Follow CTA */}
              <span style={{ fontFamily: "var(--font-ui)", fontSize: ".62rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--forest)" }}>
                Seguir ↗
              </span>
            </a>
          ))}
        </div>

      </div>
      <style>{`
        @media(max-width:900px){#soc-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:560px){#soc-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  );
}
