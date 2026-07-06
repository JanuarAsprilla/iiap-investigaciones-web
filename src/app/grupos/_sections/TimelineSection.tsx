"use client";

/* ─────────────────────────────────────────────────────────
   PROCESO DE INVESTIGACIÓN — alternating timeline
   Layout: 3-col grid  [left-slot | node | right-slot]

   Even steps (01, 03, 05) → left = photo · right = text
   Odd  steps (02, 04)     → left = text  · right = photo

   Bug fixed: previously gridColumn was swapped on each div
   which does nothing — CSS grid ignores DOM order when
   grid-column is explicit, so photo always landed at col 1.
   Fix: columns are fixed (1, 2, 3) and content is swapped.

   Mobile: single column, photo always first via CSS order.
───────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";

const pasos = [
  {
    num: "01",
    titulo: "Diagnóstico Territorial",
    desc: "Levantamiento de información primaria con comunidades y ecosistemas del Chocó Biogeográfico mediante trabajo de campo participativo.",
    detalle:
      "Nuestros equipos se sumergen en el territorio: comunidades afro, indígenas y campesinas del Pacífico colombiano. Identificamos problemáticas ambientales, sociales y productivas de forma conjunta antes de diseñar cualquier intervención científica.",
    img: "/assets/comunes/sede-aerea.webp",
    tag: "Trabajo de Campo",
  },
  {
    num: "02",
    titulo: "Diseño del Proyecto",
    desc: "Formulación de proyectos de investigación con enfoque intercultural, integrando saberes ancestrales y metodología científica.",
    detalle:
      "Traducimos el diagnóstico en preguntas de investigación con rigor científico e interculturalidad. Construimos marcos metodológicos que dialogan entre el conocimiento académico y el saber comunitario del Pacífico.",
    img: "/assets/grupos/componente-sociocultural.webp",
    tag: "Diseño Metodológico",
  },
  {
    num: "03",
    titulo: "Trabajo de Campo",
    desc: "Recolección sistemática de datos biológicos, sociales y ambientales en áreas estratégicas del Pacífico colombiano.",
    detalle:
      "Expediciones científicas a ecosistemas críticos: bosques húmedos, ríos, comunidades rurales. Recolectamos especímenes, datos cuantitativos y cualitativos con protocolos estandarizados y participación comunitaria activa.",
    img: "/assets/centros/sendero.webp",
    tag: "Recolección de Datos",
  },
  {
    num: "04",
    titulo: "Análisis y Publicación",
    desc: "Procesamiento de datos, generación de conocimiento científico y publicación en revistas indexadas y documentos de política pública.",
    detalle:
      "En el Laboratorio de Datos del Centro Experimental procesamos grandes volúmenes de datos geoespaciales, biológicos y sociales. Los resultados se publican en revistas indexadas Scopus y se convierten en insumo para política pública ambiental.",
    img: "/assets/centros/laboratorio.webp",
    tag: "Generación de Conocimiento",
  },
  {
    num: "05",
    titulo: "Transferencia y Apropiación",
    desc: "Devolución del conocimiento a las comunidades, formulación de política pública y apropiación social de la ciencia en el Pacífico.",
    detalle:
      "El ciclo se cierra donde empezó: en el territorio. Devolvemos el conocimiento a las comunidades en formatos accesibles, apoyamos la formulación de ordenanzas y políticas ambientales, y sembramos capacidades científicas locales para el futuro.",
    img: "/assets/grupos/componente-ecosistemico.webp",
    tag: "Impacto Social",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const panels = root.querySelectorAll<HTMLElement>("[data-panel]");

    const revealAll = () =>
      panels.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px 100px 0px" }
    );

    panels.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(revealAll, 700);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="proc-heading"
      style={{
        background:
          "linear-gradient(180deg, #071a0e 0%, #0a2416 40%, #071a0e 100%)",
        padding: "clamp(5rem,9vw,9rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient background mesh ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse at 10% 20%, rgba(232,150,15,.07) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(13,59,36,.40) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(232,150,15,.03) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Section header ── */}
      <div
        style={{
          textAlign: "center",
          padding: "0 clamp(1.25rem,4vw,3rem)",
          marginBottom: "clamp(4rem,7vw,7rem)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".75rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "var(--amber)",
              opacity: 0.6,
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: ".65rem",
              fontWeight: 800,
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: "var(--amber)",
            }}
          >
            Metodología Científica
          </span>
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "var(--amber)",
              opacity: 0.6,
            }}
            aria-hidden="true"
          />
        </div>

        <h2
          id="proc-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem,6vw,5.5rem)",
            color: "#fff",
            letterSpacing: ".01em",
            lineHeight: 0.9,
            marginBottom: "1.25rem",
          }}
        >
          PROCESO DE
          <br />
          <span style={{ color: "var(--amber)" }}>INVESTIGACIÓN</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-lg)",
            color: "rgba(255,255,255,.6)",
            maxWidth: "55ch",
            lineHeight: 1.75,
            margin: "0 auto",
          }}
        >
          Del territorio al conocimiento — nuestro flujo de trabajo científico
        </p>
      </div>

      {/* ── Steps list ── */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem,4vw,3rem)",
          position: "relative",
        }}
      >
        {/* Vertical amber thread — always at true 50% of container */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(232,150,15,.3) 8%, rgba(232,150,15,.3) 92%, transparent 100%)",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />

        {pasos.map((paso, i) => {
          const isEven = i % 2 === 0;
          const delay = `${i * 120}ms`;

          return (
            <div
              key={paso.num}
              data-panel
              data-odd={!isEven ? "true" : undefined}
              style={{
                display: "grid",
                /*
                 * Columns are ALWAYS 1 = left, 2 = center-node, 3 = right.
                 * Content is swapped, not columns — that's the fix.
                 */
                gridTemplateColumns: "1fr 80px 1fr",
                alignItems: "center",
                marginBottom:
                  i < pasos.length - 1 ? "clamp(2.5rem,4vw,4rem)" : 0,
                opacity: 0,
                transform: "translateY(40px)",
                transition: `opacity .7s ease ${delay}, transform .7s cubic-bezier(.25,1,.5,1) ${delay}`,
              }}
            >
              {/* ── Col 1: photo on even, text on odd ── */}
              <div>
                {isEven ? (
                  <PanelPhoto paso={paso} />
                ) : (
                  <PanelText paso={paso} align="right" />
                )}
              </div>

              {/* ── Col 2: step node (always center) ── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--amber) 0%, var(--amber-d) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 0 0 6px rgba(232,150,15,.12), 0 0 24px rgba(232,150,15,.25)",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: ".7rem",
                      fontWeight: 700,
                      color: "var(--forest-d)",
                      letterSpacing: "1px",
                    }}
                  >
                    {paso.num}
                  </span>
                </div>
              </div>

              {/* ── Col 3: text on even, photo on odd ── */}
              <div>
                {isEven ? (
                  <PanelText paso={paso} align="left" />
                ) : (
                  <PanelPhoto paso={paso} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 720px) {
          [data-panel] {
            grid-template-columns: 1fr !important;
          }
          [data-panel] > div {
            grid-column: 1 !important;
          }
          /* Hide center node on mobile */
          [data-panel] > div:nth-child(2) {
            display: none !important;
          }
          /*
           * Odd panels: DOM order is [text][node][photo]
           * but we want photo first on mobile, so reorder.
           */
          [data-panel][data-odd="true"] > div:nth-child(1) { order: 2; }
          [data-panel][data-odd="true"] > div:nth-child(3) { order: 1; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Photo panel
───────────────────────────────────────────────────────── */
function PanelPhoto({ paso }: { paso: (typeof pasos)[0] }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        height: "clamp(280px, 32vw, 420px)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,.55), 0 8px 24px rgba(0,0,0,.35)",
        border: "1px solid rgba(232,150,15,.15)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={paso.img}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(7,26,14,.55) 0%, rgba(7,26,14,.20) 60%, transparent 100%)",
        }}
      />

      {/* Ghost step number — bottom-right, clipped at container edge */}
      <p
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-.25rem",
          right: ".75rem",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem,12vw,11rem)",
          lineHeight: 1,
          letterSpacing: "-4px",
          color: "rgba(232,150,15,.10)",
          pointerEvents: "none",
          userSelect: "none",
          margin: 0,
        }}
      >
        {paso.num}
      </p>

      {/* Tag chip */}
      <span
        style={{
          position: "absolute",
          top: "1.25rem",
          left: "1.25rem",
          background: "rgba(232,150,15,.18)",
          border: "1px solid rgba(232,150,15,.40)",
          borderRadius: "999px",
          fontFamily: "var(--font-ui)",
          fontSize: ".60rem",
          fontWeight: 800,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--amber)",
          padding: ".3rem 1rem",
          backdropFilter: "blur(8px)",
        }}
      >
        {paso.tag}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Text panel
   align="left"  → text on right side, reads left-to-right
   align="right" → text on left side, reads toward center
───────────────────────────────────────────────────────── */
function PanelText({
  paso,
  align,
}: {
  paso: (typeof pasos)[0];
  align: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <div
      style={{
        padding: "clamp(1.5rem,3vw,2.5rem) clamp(1.5rem,4vw,3rem)",
        textAlign: align,
      }}
    >
      {/* Step badge */}
      <span
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: ".60rem",
          fontWeight: 800,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--amber)",
          display: "block",
          marginBottom: ".75rem",
        }}
      >
        PASO {paso.num}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem,3vw,2.8rem)",
          color: "#fff",
          letterSpacing: ".03em",
          lineHeight: 0.92,
          marginBottom: "1.1rem",
        }}
      >
        {paso.titulo}
      </h3>

      {/* Amber accent divider — solid end faces the center node */}
      <div
        aria-hidden="true"
        style={{
          width: "40px",
          height: "2px",
          background: isRight
            ? "linear-gradient(to left, var(--amber), transparent)"
            : "linear-gradient(to right, var(--amber), transparent)",
          marginBottom: "1.25rem",
          marginLeft: isRight ? "auto" : undefined,
        }}
      />

      {/* Short description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-base)",
          color: "rgba(255,255,255,.65)",
          lineHeight: 1.75,
          marginBottom: "1rem",
          maxWidth: "42ch",
          marginLeft: isRight ? "auto" : undefined,
        }}
      >
        {paso.desc}
      </p>

      {/* Detail — accent border on center-facing edge */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: ".9rem",
          color: "rgba(255,255,255,.42)",
          lineHeight: 1.8,
          maxWidth: "44ch",
          borderLeft: !isRight
            ? "2px solid rgba(232,150,15,.25)"
            : undefined,
          borderRight: isRight
            ? "2px solid rgba(232,150,15,.25)"
            : undefined,
          paddingLeft: !isRight ? "1rem" : undefined,
          paddingRight: isRight ? "1rem" : undefined,
          marginLeft: isRight ? "auto" : undefined,
        }}
      >
        {paso.detalle}
      </p>
    </div>
  );
}
