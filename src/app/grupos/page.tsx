"use client";

import SiteNav from "@/components/layout/SiteNav";
import ModuleHero from "@/components/ui/ModuleHero";
import ComponentesSection   from "./_sections/ComponentesSection";
import GruposSection        from "./_sections/GruposSection";

const heroBgs = [
  "/assets/grupos/componente-ecosistemico.webp",
  "/assets/grupos/componente-sociocultural.webp",
  "/assets/grupos/componente-ambiental.webp",
  "/assets/grupos/laboratorio-datos.webp",
];

export default function GruposPage() {
  return (
    <>
      <SiteNav />

      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        <ModuleHero
          headingId="grupos-heading"
          eyebrow="Ciencia y Comunidad"
          backgrounds={heroBgs}
          radialGradient="radial-gradient(ellipse at 75% 50%, rgba(232,150,15,.12) 0%, transparent 55%)"
          heading={<>GRUPOS DE<br /><span style={{ color: "var(--amber)" }}>INVESTIGACIÓN</span></>}
          description="Cinco componentes programáticos y cuatro grupos que articulan el conocimiento científico con las comunidades étnicas del Chocó Biogeográfico."
        />

        <ComponentesSection
          titulo="GRUPOS DE INVESTIGACIÓN"
          subtitulo="Colectivos especializados que lideran la generación de conocimiento en el Pacífico colombiano"
        />
        <GruposSection />

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
