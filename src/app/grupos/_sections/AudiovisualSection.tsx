/* Audiovisual — YouTube embed in a warm editorial frame */

export default function AudiovisualSection() {
  return (
    <section
      aria-labelledby="av-heading"
      style={{
        background: "linear-gradient(150deg, var(--forest) 0%, var(--forest-d) 100%)",
        padding: "clamp(4rem,7vw,7rem) clamp(1.25rem,4vw,3rem)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Ambient */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 60%,rgba(232,150,15,.14) 0%,transparent 55%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(232,150,15,.20)",
              color: "var(--amber)",
              fontFamily: "var(--font-ui)", fontSize: ".68rem", fontWeight: 800,
              letterSpacing: "2.5px", textTransform: "uppercase",
              padding: ".3rem 1.1rem", borderRadius: "999px",
              border: "1px solid rgba(232,150,15,.35)", marginBottom: "1rem",
            }}
          >
            Audiovisual
          </span>
          <h2
            id="av-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--t-3xl)",
              color: "#fff", letterSpacing: ".02em", lineHeight: .92, marginBottom: ".75rem",
            }}
          >
            CONOCE EL IIAP
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-base)", color: "rgba(255,255,255,.72)", maxWidth: "50ch", margin: "0 auto", lineHeight: 1.7 }}>
            Un vistazo a nuestra labor de campo y el impacto de la investigación en el Pacífico colombiano
          </p>
        </div>

        {/* Video frame */}
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            border: "2px solid rgba(232,150,15,.30)",
            boxShadow: "0 32px 80px rgba(0,0,0,.40), 0 0 0 1px rgba(255,255,255,.06)",
            aspectRatio: "16/9",
          }}
        >
          {/* Amber corner accents */}
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "32px", height: "32px", borderTop: "3px solid var(--amber)", borderLeft: "3px solid var(--amber)", zIndex: 2, pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: "32px", height: "32px", borderTop: "3px solid var(--amber)", borderRight: "3px solid var(--amber)", zIndex: 2, pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, width: "32px", height: "32px", borderBottom: "3px solid var(--amber)", borderLeft: "3px solid var(--amber)", zIndex: 2, pointerEvents: "none" }} />
          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, right: 0, width: "32px", height: "32px", borderBottom: "3px solid var(--amber)", borderRight: "3px solid var(--amber)", zIndex: 2, pointerEvents: "none" }} />

          <iframe
            src="https://www.youtube.com/embed/kcF0rbjzYTw"
            title="IIAP — Investigaciones Ambientales del Pacífico"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-fullscreen allow-forms allow-popups allow-popups-to-escape-sandbox"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>

        {/* Caption */}
        <p style={{ textAlign: "center", fontFamily: "var(--font-ui)", fontSize: ".68rem", color: "rgba(255,255,255,.45)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "1.25rem" }}>
          Canal oficial IIAP — YouTube
        </p>
      </div>
    </section>
  );
}
