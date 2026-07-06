"use client";

import { useState, useCallback, useEffect } from "react";
import SiteNav from "@/components/layout/SiteNav";
import { infoCentro, instalaciones, bioespacios } from "@/data/centros";
import type { InstalacionCentro, Bioespacio } from "@/lib/types";
import ReconocimientoSection from "../grupos/_sections/ReconocimientoSection";
import ModalGallery from "@/components/ui/ModalGallery";

/* ─────────────────────────────────────────
   Modal Instalación — Warm Light
───────────────────────────────────────── */
function InstalacionModal({ inst, onClose, closing }: { inst: InstalacionCentro; onClose: () => void; closing?: boolean }) {
  const images = inst.galeria && inst.galeria.length > 0 ? inst.galeria : [inst.imagen];
  return (
    <div className={`cm-overlay${closing ? " closing" : ""}`} style={{ display: "flex" }} role="dialog" aria-modal="true" aria-label={inst.nombre} onClick={onClose} onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      <div className="cm-box" onClick={(e) => e.stopPropagation()}>
        <div className="cm-img">
          <ModalGallery images={images} alt={inst.nombre} />
        </div>
        <div className="cm-body">
          <span className="cm-tag">Instalación del Centro</span>
          <h3 className="cm-title">{inst.nombre}</h3>
          <div className="cm-divider" />

          {/* Cantidad destacada */}
          {inst.cantidad && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: ".75rem",
              background: "var(--forest-lt)", border: "1px solid var(--border)",
              borderRadius: "var(--r)", padding: ".6rem 1.25rem",
              marginBottom: "1.25rem",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--forest)", lineHeight: 1 }}>
                {inst.cantidad}
              </span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: ".62rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)", maxWidth: "9ch" }}>
                {inst.unidad ?? "Unidades"}
              </span>
            </div>
          )}

          <p className="cm-desc">{inst.descripcion}</p>

          {inst.detalle && (
            <p style={{
              fontFamily: "var(--font-body)", fontSize: ".9rem",
              color: "var(--text-muted)", lineHeight: 1.75,
              borderLeft: "2px solid var(--border)", paddingLeft: "1rem",
              marginBottom: "1.5rem",
            }}>
              {inst.detalle}
            </p>
          )}

          {inst.caracteristicas && inst.caracteristicas.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: ".60rem", fontWeight: 700,
                letterSpacing: "2px", textTransform: "uppercase",
                color: "var(--text-muted)", marginBottom: ".75rem",
              }}>
                Características
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {inst.caracteristicas.map((c) => (
                  <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: ".6rem" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "3px" }}>
                      <circle cx="7" cy="7" r="6" stroke="var(--forest)" strokeWidth="1.2" />
                      <path d="M4.5 7l2 2 3-3" stroke="var(--forest)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: ".85rem", color: "var(--text)", lineHeight: 1.5 }}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="cm-close" onClick={onClose} autoFocus>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Modal Bioespacio — Warm Light
───────────────────────────────────────── */
function BioespacioModal({ bio, onClose, closing }: { bio: Bioespacio; onClose: () => void; closing?: boolean }) {
  const images = bio.galeria && bio.galeria.length > 0 ? bio.galeria : [bio.imagen];
  return (
    <div className={`cm-overlay${closing ? " closing" : ""}`} style={{ display: "flex" }} role="dialog" aria-modal="true" aria-label={bio.nombre} onClick={onClose} onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      <div className="cm-box" onClick={(e) => e.stopPropagation()}>
        <div className="cm-img">
          <ModalGallery images={images} alt={bio.nombre} />
        </div>
        <div className="cm-body">
          <span className="cm-tag">Bioespacio de Investigación</span>
          <h3 className="cm-title">{bio.nombre}</h3>
          <div className="cm-divider" />

          {/* Tipo badge */}
          <div style={{
            display: "inline-block",
            background: "var(--forest-lt)", border: "1px solid var(--border)",
            borderRadius: "999px", padding: ".3rem 1rem",
            fontFamily: "var(--font-ui)", fontSize: ".65rem", fontWeight: 700,
            letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--forest)",
            marginBottom: "1rem",
          }}>
            {bio.descripcion}
          </div>

          <p className="cm-desc">{bio.detalle}</p>

          {/* Métricas: extensión y especies */}
          {(bio.extension || bio.especies) && (
            <div style={{
              display: "grid",
              gridTemplateColumns: bio.extension && bio.especies ? "1fr 1fr" : "1fr",
              gap: "1rem",
              background: "var(--surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--r)",
              padding: "1rem 1.25rem",
              marginBottom: "1.5rem",
            }}>
              {bio.extension && (
                <div>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: ".58rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: ".35rem" }}>
                    Extensión
                  </p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--forest)", fontWeight: 600, letterSpacing: ".03em" }}>
                    {bio.extension}
                  </p>
                </div>
              )}
              {bio.especies && (
                <div>
                  <p style={{ fontFamily: "var(--font-ui)", fontSize: ".58rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: ".35rem" }}>
                    Especies
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: ".9rem", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
                    {bio.especies}
                  </p>
                </div>
              )}
            </div>
          )}

          <button className="cm-close" onClick={onClose} autoFocus>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const heroBgs = [
  "/assets/bioespacios/piscitanques/piscitanques-1.webp",
  "/assets/bioespacios/sendero/sendero-1.webp",
  "/assets/centros/laboratorio.webp",
  "/assets/bioespacios/vivero-experimental/vivero-experimental-1.webp",
];

/* Biodiversidad — fauna del Chocó Biogeográfico (registros de campo y fototrampeo) */
const faunaGaleria = [
  { src: "/assets/bioespacios/fauna/fauna-1.webp", cat: "Anfibios",     label: "Ranas endémicas del bosque húmedo" },
  { src: "/assets/bioespacios/fauna/fauna-3.webp", cat: "Avifauna",     label: "Aves del dosel tropical" },
  { src: "/assets/bioespacios/fauna/fauna-2.webp", cat: "Herpetofauna", label: "Diversidad de anfibios" },
  { src: "/assets/bioespacios/fauna/fauna-5.webp", cat: "Artrópodos",   label: "Araña de seda dorada" },
  { src: "/assets/bioespacios/fauna/fauna-4.webp", cat: "Mamíferos",    label: "Fototrampeo nocturno" },
];

export default function CentrosPage() {
  const [modalInst,   setModalInst]   = useState<InstalacionCentro | null>(null);
  const [modalBio,    setModalBio]    = useState<Bioespacio | null>(null);
  const [closingInst, setClosingInst] = useState(false);
  const [closingBio,  setClosingBio]  = useState(false);
  const [bgIndex,     setBgIndex]     = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBgIndex((p) => (p + 1) % heroBgs.length), 4000);
    return () => clearInterval(id);
  }, []);

  const openInst  = useCallback((i: InstalacionCentro) => setModalInst(i), []);
  const openBio   = useCallback((b: Bioespacio) => setModalBio(b), []);
  const closeInst = useCallback(() => {
    setClosingInst(true);
    setTimeout(() => { setModalInst(null); setClosingInst(false); }, 220);
  }, []);
  const closeBio  = useCallback(() => {
    setClosingBio(true);
    setTimeout(() => { setModalBio(null); setClosingBio(false); }, 220);
  }, []);

  return (
    <>
      <SiteNav />
      {modalInst && <InstalacionModal inst={modalInst} onClose={closeInst} closing={closingInst} />}
      {modalBio  && <BioespacioModal  bio={modalBio}   onClose={closeBio}  closing={closingBio}  />}

      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── Hero — Carousel ── */}
        <section
          aria-labelledby="centros-heading"
          style={{ position: "relative", overflow: "hidden", padding: "clamp(7rem,12vh,10rem) clamp(1.25rem,4vw,3rem) clamp(4rem,7vh,6rem)" }}
        >
          {heroBgs.map((src, i) => (
            <div key={src} aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", opacity: i === bgIndex ? 1 : 0, transition: "opacity 1.4s ease-in-out", willChange: i === bgIndex ? "opacity" : "auto" }} />
          ))}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(13,59,36,.85) 0%,rgba(9,40,25,.90) 100%)" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%,rgba(232,150,15,.12) 0%,transparent 55%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
            <span style={{ display: "inline-block", background: "linear-gradient(135deg,var(--amber),var(--amber-d))", color: "var(--forest-d)", fontFamily: "var(--font-ui)", fontSize: ".72rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", padding: ".3rem 1.1rem", borderRadius: "var(--r-pill)", marginBottom: "1.25rem" }}>
              Infraestructura Científica
            </span>
            <h1 id="centros-heading" style={{ fontFamily: "var(--font-display)", fontSize: "var(--t-4xl)", lineHeight: .9, color: "#fff", letterSpacing: ".01em", marginBottom: "1.25rem" }}>
              CENTRO<br /><span style={{ color: "var(--amber)" }}>EXPERIMENTAL</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-lg)", color: "rgba(255,255,255,.78)", maxWidth: "55ch", lineHeight: 1.75, marginBottom: "2rem" }}>
              {infoCentro.descripcion}
            </p>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {[infoCentro.ubicacion, infoCentro.horario].map((label) => (
                <div key={label} style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.20)", borderRadius: "var(--r-pill)", padding: ".4rem 1.1rem", fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "rgba(255,255,255,.85)", backdropFilter: "blur(8px)" }}>
                  {label}
                </div>
              ))}
            </div>
            {/* Carousel dots */}
            <div style={{ display: "flex", gap: "8px" }} aria-hidden="true">
              {heroBgs.map((_, i) => (
                <button key={i} onClick={() => setBgIndex(i)} style={{ width: i === bgIndex ? "24px" : "8px", height: "8px", borderRadius: "999px", background: i === bgIndex ? "var(--amber)" : "rgba(255,255,255,.35)", border: "none", cursor: "pointer", transition: "width .4s var(--ease), background .3s", padding: 0 }} aria-label={`Imagen ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>

        <ReconocimientoSection />

        {/* ── Instalaciones ── */}
        <section aria-labelledby="instalaciones-heading" style={{ padding: "clamp(4rem,7vw,7rem) clamp(1.25rem,4vw,3rem)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ marginBottom: "clamp(2.5rem,4vw,4rem)", textAlign: "center" }}>
              <p className="sec-eyebrow">Espacios</p>
              <h2 id="instalaciones-heading" className="sec-h2">INSTALACIONES DEL CENTRO</h2>
              <p className="sec-sub" style={{ marginTop: ".6rem" }}>Haga clic en cada instalación para conocer más detalles</p>
            </div>

            <div id="inst-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "3px", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
              {instalaciones.filter((inst) => inst.id !== "oficinas").map((inst) => (
                <div
                  key={inst.id}
                  className="gc-card"
                  role="button" tabIndex={0}
                  aria-label={`Ver detalles de ${inst.nombre}`}
                  style={{ height: "280px" }}
                  onClick={() => openInst(inst)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInst(inst); } }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={inst.imagen} alt={inst.nombre} loading="lazy" />
                  <div className="gc-overlay" />
                  <div className="gc-content">
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,2vw,1.75rem)", color: "#fff", letterSpacing: ".06em", lineHeight: 1.05, margin: 0 }}>
                      {inst.nombre}
                    </h3>
                    <span className="gc-cta" style={{ opacity: 1, transform: "translateY(0)" }}>
                      Ver más
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="6" x2="10" y2="6"/><polyline points="6.5 2 10 6 6.5 10"/>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bioespacios ── */}
        <section aria-labelledby="bioespacios-heading" style={{ padding: "0 clamp(1.25rem,4vw,3rem) clamp(5rem,8vw,8rem)", borderTop: "1px solid var(--border-subtle)", background: "var(--surface)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ padding: "clamp(3rem,5vw,5rem) 0 clamp(2rem,3.5vw,3.5rem)", textAlign: "center" }}>
              <p className="sec-eyebrow">Entornos Vivos</p>
              <h2 id="bioespacios-heading" className="sec-h2">
                BIOESPACIOS DE<br /><span style={{ color: "var(--forest)" }}>INVESTIGACIÓN</span>
              </h2>
              <p className="sec-sub" style={{ marginTop: ".6rem", maxWidth: "60ch", margin: "0 auto" }}>
                Ecosistemas vivos para la investigación en biodiversidad del Pacífico colombiano
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "3px", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
              {bioespacios.map((bio) => (
                <div
                  key={bio.id}
                  className="gc-card"
                  role="button" tabIndex={0}
                  aria-label={`Ver ${bio.nombre}`}
                  style={{ height: "300px" }}
                  onClick={() => openBio(bio)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBio(bio); } }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bio.imagen} alt={bio.nombre} loading="lazy" />
                  <div className="gc-overlay" />
                  <div className="gc-content">
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: ".6rem", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: ".4rem" }}>
                      {bio.descripcion}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,2vw,1.75rem)", color: "#fff", letterSpacing: ".06em", lineHeight: 1.05, margin: 0 }}>
                      {bio.nombre}
                    </h3>
                    <span className="gc-cta" style={{ opacity: 1, transform: "translateY(0)" }}>
                      Ver más
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="6" x2="10" y2="6"/><polyline points="6.5 2 10 6 6.5 10"/>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:640px){
            section[aria-labelledby="bioespacios-heading"] > div > div:last-child{grid-template-columns:1fr!important;}
          }`}</style>
        </section>

        {/* ── Biodiversidad (Fauna) ── */}
        <section aria-labelledby="fauna-heading" style={{ padding: "0 clamp(1.25rem,4vw,3rem) clamp(5rem,8vw,8rem)", borderTop: "1px solid var(--border-subtle)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ padding: "clamp(3rem,5vw,5rem) 0 clamp(2rem,3.5vw,3.5rem)", textAlign: "center" }}>
              <p className="sec-eyebrow">Vida que investigamos</p>
              <h2 id="fauna-heading" className="sec-h2">
                BIODIVERSIDAD<br /><span style={{ color: "var(--forest)" }}>DEL CHOCÓ</span>
              </h2>
              <p className="sec-sub" style={{ marginTop: ".6rem", maxWidth: "62ch", margin: "0 auto" }}>
                Registros de campo y fototrampeo de la fauna que habita los bioespacios del Centro
              </p>
            </div>

            <div className="fauna-bento">
              {faunaGaleria.map((f, i) => (
                <figure key={f.src} className={`gc-card fauna-item${i === 0 ? " fauna-feature" : ""}`} style={{ margin: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt={`${f.cat} — ${f.label}`} loading="lazy" />
                  <div className="gc-overlay" />
                  <figcaption className="gc-content">
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: ".6rem", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: ".35rem" }}>
                      {f.cat}
                    </span>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: i === 0 ? "clamp(1.3rem,2vw,1.7rem)" : "clamp(1rem,1.4vw,1.25rem)", color: "#fff", letterSpacing: ".04em", lineHeight: 1.1, margin: 0 }}>
                      {f.label}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <style>{`
            .fauna-bento{
              display:grid;
              grid-template-columns:repeat(4,1fr);
              grid-auto-rows:200px;
              gap:3px;
              border-radius:var(--r-lg);
              overflow:hidden;
              border:1px solid var(--border-subtle);
            }
            .fauna-item{cursor:default;}
            .fauna-feature{grid-column:span 2;grid-row:span 2;}
            @media(max-width:820px){
              .fauna-bento{grid-template-columns:repeat(2,1fr);grid-auto-rows:180px;}
              .fauna-feature{grid-column:span 2;grid-row:span 1;}
            }
            @media(max-width:520px){
              .fauna-bento{grid-template-columns:1fr;}
              .fauna-feature{grid-column:span 1;}
            }
          `}</style>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} IIAP — Centros de Investigación
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
