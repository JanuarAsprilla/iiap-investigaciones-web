"use client";

import SiteNav from "@/components/layout/SiteNav";
import ModuleHero from "@/components/ui/ModuleHero";
import ComponentesSection  from "../grupos/_sections/ComponentesSection";
import EstructuraSection   from "../grupos/_sections/EstructuraSection";
import TalentoSection      from "../grupos/_sections/TalentoSection";
import AudiovisualSection  from "../grupos/_sections/AudiovisualSection";
import TimelineSection     from "../grupos/_sections/TimelineSection";

const heroBgs = [
  "/assets/grupos/componente-ecosistemico.webp",
  "/assets/grupos/componente-ambiental.webp",
  "/assets/grupos/componente-sociocultural.webp",
  "/assets/grupos/laboratorio-datos.webp",
];

export default function ComponentesPage() {
  return (
    <>
      <SiteNav />

      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        <ModuleHero
          headingId="comp-page-heading"
          eyebrow="Ciencia del Pacífico"
          backgrounds={heroBgs}
          radialGradient="radial-gradient(ellipse at 30% 50%, rgba(232,150,15,.12) 0%, transparent 55%)"
          heading={<>COMPONENTES DE<br /><span style={{ color: "var(--amber)" }}>INVESTIGACIÓN</span></>}
          description="Cuatro componentes programáticos y un Laboratorio de Datos que articulan el conocimiento científico con las comunidades étnicas del Chocó Biogeográfico."
        />

        <ComponentesSection />
        <EstructuraSection />
        <TalentoSection />
        <AudiovisualSection />
        <TimelineSection />

        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} IIAP — Componentes y Grupos de Investigación
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
