/* Reconocimiento Oficial — forest green editorial banner */

export default function ReconocimientoSection() {
  return (
    <section
      aria-labelledby="recon-heading"
      style={{
        background: "linear-gradient(135deg, var(--forest-d) 0%, var(--forest) 60%, var(--forest-m) 100%)",
        padding: "clamp(5rem,9vw,9rem) clamp(1.25rem,4vw,3rem)",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Ghost resolution number */}
      <p
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(14rem,30vw,32rem)",
          lineHeight: .85,
          color: "rgba(255,255,255,.04)",
          position: "absolute", left: "50%",
          top: "50%", transform: "translate(-50%,-50%)",
          pointerEvents: "none", userSelect: "none",
          letterSpacing: "-8px", whiteSpace: "nowrap",
        }}
      >
        1598
      </p>

      {/* Radial amber glow */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(232,150,15,.15) 0%,transparent 60%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>

        {/* Badge with pulse dot */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.18)",
            borderRadius: "999px", padding: ".35rem 1.1rem",
            marginBottom: "1.5rem", backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "var(--amber)",
              boxShadow: "0 0 0 3px rgba(232,150,15,.30)",
              animation: "pulse 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: ".68rem", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,.90)" }}>
            Reconocimiento Oficial
          </span>
        </div>

        {/* Date */}
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "var(--t-base)", color: "rgba(255,255,255,.65)", marginBottom: ".75rem" }}>
          30 de agosto de 2021
        </p>

        {/* Main heading */}
        <h2
          id="recon-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem,8vw,7rem)",
            color: "#fff", lineHeight: .9,
            letterSpacing: ".02em", marginBottom: "1.5rem",
          }}
        >
          RESOLUCIÓN
          <br />
          <span style={{ color: "var(--amber)" }}>1598</span>
        </h2>

        {/* Divider */}
        <div style={{ width: "3rem", height: "2px", background: "var(--amber)", margin: "0 auto 1.75rem", borderRadius: "2px" }} />

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.5vw,1.2rem)",
            color: "rgba(255,255,255,.80)", lineHeight: 1.85, marginBottom: "2rem",
          }}
        >
          A través de la resolución 1598 del 30 de agosto de 2021, el{" "}
          <strong style={{ color: "#fff", fontWeight: 600 }}>
            Ministerio de Ciencia, Tecnología e Innovación
          </strong>{" "}
          otorgó el reconocimiento como centro de investigación al{" "}
          <strong style={{ color: "#fff", fontWeight: 600 }}>
            Instituto de Investigaciones Ambientales del Pacífico
            &ldquo;John Von Neumann&rdquo;
          </strong>
          .
        </p>

        {/* Ministry chip */}
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-ui)", fontSize: ".65rem", fontWeight: 700,
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: "rgba(255,255,255,.60)",
            border: "1px solid rgba(255,255,255,.20)",
            padding: ".4rem 1.2rem", borderRadius: "999px",
          }}
        >
          Ministerio de Ciencia, Tecnología e Innovación — República de Colombia
        </span>
      </div>

      <style>{`
        @keyframes pulse{
          0%,100%{box-shadow:0 0 0 3px rgba(232,150,15,.30);}
          50%{box-shadow:0 0 0 8px rgba(232,150,15,.10);}
        }
      `}</style>
    </section>
  );
}
