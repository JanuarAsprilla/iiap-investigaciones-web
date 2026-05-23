"use client";

import { useState, useEffect } from "react";
import SiteNav from "@/components/layout/SiteNav";
import ComponentesSection   from "./_sections/ComponentesSection";
import GruposSection        from "./_sections/GruposSection";
import EstructuraSection    from "./_sections/EstructuraSection";
import TalentoSection       from "./_sections/TalentoSection";
import AudiovisualSection   from "./_sections/AudiovisualSection";
import TimelineSection      from "./_sections/TimelineSection";
import ReconocimientoSection from "./_sections/ReconocimientoSection";
import ComunidadSection     from "./_sections/ComunidadSection";

/* Carousel background images for the hero */
const heroBgs = [
  "/assets/grupos/COMPONENTE_ECOSISTEMICO.jpeg",
  "/assets/grupos/COMPONENTE_SOCIOCULTURAL.jpeg",
  "/assets/grupos/COMPONENTE_AMBIENTAL.jpeg",
  "/assets/grupos/LABORATORIO_DATOS.jpeg",
];

export default function GruposPage() {
  const [bgIndex, setBgIndex] = useState(0);

  /* Auto-cycle every 4 s */
  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBgs.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <SiteNav />

      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ════════════════════════════════════════
            HERO — Carousel background + Forest overlay
        ════════════════════════════════════════ */}
        <section
          aria-labelledby="grupos-heading"
          style={{
            position: "relative", overflow: "hidden",
            padding: "clamp(7rem,12vh,10rem) clamp(1.25rem,4vw,3rem) clamp(4rem,7vh,6rem)",
          }}
        >
          {/* ── Carousel images — crossfade ── */}
          {heroBgs.map((src, i) => (
            <div
              key={src}
              aria-hidden="true"
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: i === bgIndex ? 1 : 0,
                transition: "opacity 1.4s ease-in-out",
                willChange: i === bgIndex ? "opacity" : "auto",
              }}
            />
          ))}

          {/* ── Dark forest overlay ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background:
                "linear-gradient(150deg, rgba(13,59,36,.85) 0%, rgba(9,40,25,.90) 100%)",
            }}
          />

          {/* ── Amber glow ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 75% 50%, rgba(232,150,15,.12) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Content ── */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, var(--amber), var(--amber-d))",
                color: "var(--forest-d)",
                fontFamily: "var(--font-ui)", fontSize: ".72rem", fontWeight: 800,
                letterSpacing: "2px", textTransform: "uppercase",
                padding: ".3rem 1.1rem", borderRadius: "var(--r-pill)",
                marginBottom: "1.25rem",
              }}
            >
              Ciencia y Comunidad
            </span>

            <h1
              id="grupos-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-4xl)",
                lineHeight: .9,
                color: "#fff",
                letterSpacing: ".01em",
                marginBottom: "1.25rem",
              }}
            >
              GRUPOS DE
              <br />
              <span style={{ color: "var(--amber)" }}>INVESTIGACIÓN</span>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-lg)",
                color: "rgba(255,255,255,.78)",
                maxWidth: "55ch", lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              Cinco componentes programáticos y cuatro grupos que articulan el conocimiento
              científico con las comunidades étnicas del Chocó Biogeográfico.
            </p>

            {/* Carousel indicator dots */}
            <div style={{ display: "flex", gap: "8px" }} aria-hidden="true">
              {heroBgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBgIndex(i)}
                  style={{
                    width: i === bgIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: i === bgIndex ? "var(--amber)" : "rgba(255,255,255,.35)",
                    border: "none",
                    cursor: "pointer",
                    transition: "width .4s var(--ease), background .3s",
                    padding: 0,
                  }}
                  aria-label={`Imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Sections ── */}
        <ComponentesSection />
        <GruposSection />
        <EstructuraSection />
        <TalentoSection />
        <AudiovisualSection />
        <TimelineSection />
        <ReconocimientoSection />
        <ComunidadSection />

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} IIAP — Grupos de Investigación
            </p>
            <a href="/" style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)", textDecoration: "none" }}>
              ← Volver al portal
            </a>
          </div>
        </footer>

      </main>
    </>
  );
}
