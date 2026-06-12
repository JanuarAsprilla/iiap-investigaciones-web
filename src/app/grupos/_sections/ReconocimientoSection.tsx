/* Reconocimiento Oficial
   Cinta 3D infinita — segmentos semánticos, pin que llena la altura */
"use client";
import { useId } from "react";

/* Segmentos que scrollean. sub → descriptor debajo del título. */
const SEGMENTS: { heading: string; sub?: string }[] = [
  { heading: "Centro de Investigación Certificado", sub: "Acto administrativo vigente"               },
  { heading: "Resolución N.° 1598",                 sub: "30 de agosto del 2021"                    },
  { heading: "Reconocimiento Oficial",              sub: "República de Colombia"                    },
  { heading: "Ministerio de Ciencia",               sub: "Tecnología e Innovación"                  },
  { heading: "John Von Neumann",                    sub: "Chocó Biogeográfico"                       },
  { heading: "Inst. de Investigaciones Ambientales del Pacífico",
                                                    sub: "Acto Administrativo Vigente"              },
];

/* ─── Geometría global ───────────────────────────────────────────────────── */
const RIBBON_H         = 96;   /* altura de la cinta en px                   */
const PIN_SIZE         = 108;  /* roseta: outerR × 2 ≈ 96px = llena RIBBON_H */
const PIN_OVERHANG_TOP = 6;    /* px que el disco sobresale por arriba        */

/* ─── Roseta / Pin ───────────────────────────────────────────────────────── */
const SEG_COUNT = 16;

function RosetaPin() {
  const id     = useId().replace(/:/g, "");
  const s      = PIN_SIZE;
  const cx     = s / 2;
  const cy     = s / 2;
  const outerR = s * 0.445;
  const innerR = s * 0.260;
  const tailW  = s * 0.148;
  const tailH  = s * 0.52;
  const gap    = s * 0.036;
  const notch  = s * 0.11;
  const tailY  = cy + s * 0.195;

  return (
    <svg
      width={s}
      height={s + tailH}
      viewBox={`0 0 ${s} ${s + tailH}`}
      aria-hidden="true"
      style={{
        display: "block",
        filter: "drop-shadow(0 6px 22px rgba(0,0,0,.60)) drop-shadow(0 2px 6px rgba(0,0,0,.35))",
      }}
    >
      <defs>
        <radialGradient id={`${id}-s`} cx="40%" cy="26%" r="70%">
          <stop offset="0%"   stopColor="#FDE97A" />
          <stop offset="42%"  stopColor="#E8960F" />
          <stop offset="100%" stopColor="#9A5208" />
        </radialGradient>
        <radialGradient id={`${id}-ring`} cx="36%" cy="28%" r="66%">
          <stop offset="0%"   stopColor="#F2C843" />
          <stop offset="55%"  stopColor="#C07A0C" />
          <stop offset="100%" stopColor="#744808" />
        </radialGradient>
        <linearGradient id={`${id}-t`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#8A5006" />
          <stop offset="50%"  stopColor="#E8960F" />
          <stop offset="100%" stopColor="#8A5006" />
        </linearGradient>
        {/* Brillo extra sobre los segmentos */}
        <radialGradient id={`${id}-shine`} cx="38%" cy="24%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,255,255,.30)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"   />
        </radialGradient>
      </defs>

      {/* Colas */}
      {[
        { lx: cx - gap / 2 - tailW, shine: cx - gap / 2 - tailW * 0.65 },
        { lx: cx + gap / 2,         shine: cx + gap / 2 + tailW * 0.65 },
      ].map(({ lx, shine }, i) => (
        <g key={i}>
          <polygon
            points={`${lx},${tailY} ${lx+tailW},${tailY} ${lx+tailW},${tailY+tailH} ${lx+tailW/2},${tailY+tailH-notch} ${lx},${tailY+tailH}`}
            fill={`url(#${id}-t)`}
          />
          {/* Brillo de la cola */}
          <line x1={shine} y1={tailY+5} x2={shine} y2={tailY+tailH*.80}
            stroke="rgba(255,255,255,.26)" strokeWidth="1.4" />
        </g>
      ))}

      {/* Segmentos de la roseta */}
      {Array.from({ length: SEG_COUNT }).map((_, i) => {
        const a0 = ((i * 360) / SEG_COUNT - 90) * (Math.PI / 180);
        const a1 = (((i+1) * 360) / SEG_COUNT - 90) * (Math.PI / 180);
        const am = (a0 + a1) / 2;
        const fR = innerR + (outerR - innerR) * 0.34;
        const pts = [
          `${cx+innerR*Math.cos(a0)},${cy+innerR*Math.sin(a0)}`,
          `${cx+outerR*Math.cos(a0)},${cy+outerR*Math.sin(a0)}`,
          `${cx+outerR*Math.cos(a1)},${cy+outerR*Math.sin(a1)}`,
          `${cx+innerR*Math.cos(a1)},${cy+innerR*Math.sin(a1)}`,
        ].join(" ");
        return (
          <g key={i}>
            <polygon points={pts} fill={`url(#${id}-s)`} />
            {/* Costura entre segmentos */}
            <line
              x1={cx+fR*Math.cos(am)} y1={cy+fR*Math.sin(am)}
              x2={cx+outerR*Math.cos(am)} y2={cy+outerR*Math.sin(am)}
              stroke="rgba(0,0,0,.18)" strokeWidth="1"
            />
          </g>
        );
      })}

      {/* Capa de brillo sobre la roseta */}
      <circle cx={cx} cy={cy} r={outerR} fill={`url(#${id}-shine)`} />

      {/* Anillo dorado */}
      <circle cx={cx} cy={cy} r={innerR + 3}   fill={`url(#${id}-ring)`} />
      <circle cx={cx} cy={cy} r={innerR + 3}   fill="none"
        stroke="rgba(60,30,0,.45)" strokeWidth="1.2" />

      {/* Disco blanco central */}
      <circle cx={cx} cy={cy} r={innerR}       fill="white" />
      <circle cx={cx} cy={cy} r={innerR}       fill="none"
        stroke="rgba(220,140,10,.60)" strokeWidth="1.4" />

      {/* Brillo del disco */}
      <ellipse cx={cx - s*.07} cy={cy - s*.19}
        rx={s*.18} ry={s*.07}
        fill="rgba(255,255,255,.22)" />

      {/* Año */}
      <text
        x={cx} y={cy}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-display)"
        fontSize={s * 0.19}
        fontWeight="800"
        fill="#0D3B24"
        letterSpacing="1"
      >2021</text>
    </svg>
  );
}

/* ─── Sección ────────────────────────────────────────────────────────────── */
export default function ReconocimientoSection() {
  const track = [...SEGMENTS, ...SEGMENTS]; /* duplicar para loop seamless */

  return (
    <section
      aria-label="Reconocimiento Oficial — Resolución N.° 1598, Minciencias 2021"
      style={{
        position:      "relative",
        paddingTop:    `${PIN_OVERHANG_TOP}px`,
        paddingBottom: 0,
        overflow:      "visible",
      }}
    >
      {/* ══ CINTA 3D ══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position:     "relative",
          height:       `${RIBBON_H}px`,

          /* Gradiente metálico 3D de 8 paradas */
          background: [
            "linear-gradient(to bottom,",
            "  #FFF4A8 0%,",     /* borde superior: casi blanco */
            "  #F9D535 4%,",     /* highlight brillante          */
            "  #EFA012 16%,",    /* cara superior                */
            "  #E08C0D 32%,",    /* cuerpo principal             */
            "  #D07C08 52%,",    /* centro                       */
            "  #B86806 70%,",    /* cara inferior                */
            "  #8C4B04 86%,",    /* sombra                       */
            "  #6C3602 100%",    /* borde inferior: muy oscuro   */
            ")",
          ].join(""),

          /* Biseles y sombras profundas */
          borderTop:    "3px solid rgba(255,255,255,.62)",
          borderBottom: "3px solid rgba(0,0,0,.40)",
          boxShadow: [
            "inset 0  2px 0 rgba(255,255,255,.36),",
            "inset 0 -2px 0 rgba(0,0,0,.28),",
            "0 5px 24px rgba(0,0,0,.38),",
            "0 12px 48px rgba(0,0,0,.22),",
            "0 2px  8px rgba(0,0,0,.28)",
          ].join(""),

          overflow:        "hidden",
          /* Fade lateral: deja zona derecha sólida para el pin */
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 85%, transparent 92%)",
          maskImage:       "linear-gradient(to right, transparent 0%, black 5%, black 85%, transparent 92%)",
        }}
      >
        {/* Sheen superior — simula la cara iluminada */}
        <div style={{
          position:      "absolute",
          inset:         "0 0 auto 0",
          height:        "36%",
          background:    "linear-gradient(to bottom, rgba(255,255,255,.26) 0%, rgba(255,255,255,.06) 60%, transparent 100%)",
          pointerEvents: "none",
          zIndex:        2,
        }} />

        {/* Destello diagonal — luz rasante sobre la superficie */}
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(112deg, transparent 30%, rgba(255,255,255,.12) 44%, rgba(255,255,255,.06) 54%, transparent 68%)",
          pointerEvents: "none",
          zIndex:        2,
        }} />

        {/* Línea de sombra inferior interna */}
        <div style={{
          position:      "absolute",
          inset:         "auto 0 4px 0",
          height:        "1px",
          background:    "rgba(0,0,0,.14)",
          pointerEvents: "none",
          zIndex:        2,
        }} />

        {/* ── TRACK INFINITO ── */}
        <div
          style={{
            display:     "flex",
            alignItems:  "center",
            height:      "100%",
            width:       "max-content",
            animation:   "iiap-ticker 52s linear infinite",
            cursor:      "default",
            zIndex:      1,
            position:    "relative",
          }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {track.map((seg, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", height: "100%" }}>

              {/* Bloque semántico: título + descriptor */}
              <span style={{
                display:        "inline-flex",
                flexDirection:  "column",
                justifyContent: "center",
                gap:            "5px",
                padding:        "0 clamp(24px, 3.2vw, 48px)",
              }}>
                {/* Título principal */}
                <span style={{
                  fontFamily:    "var(--font-ui), system-ui, sans-serif",
                  fontSize:      "clamp(1.0rem, 1.18vw, 1.12rem)",
                  fontWeight:    800,
                  letterSpacing: "clamp(1.2px, .18vw, 2px)",
                  textTransform: "uppercase",
                  color:         "#FFFFFF",
                  textShadow:    "0 0 18px rgba(255,220,80,.50), 0 1px 6px rgba(0,0,0,.48)",
                  whiteSpace:    "nowrap",
                  lineHeight:    1,
                }}>
                  {seg.heading}
                </span>

                {/* Descriptor / subtítulo */}
                {seg.sub && (
                  <span style={{
                    fontFamily:    "var(--font-ui), system-ui, sans-serif",
                    fontSize:      "clamp(.72rem, .86vw, .82rem)",
                    fontWeight:    500,
                    letterSpacing: "clamp(.6px, .10vw, 1.1px)",
                    textTransform: "uppercase",
                    color:         "rgba(255,248,210,.84)",
                    textShadow:    "0 1px 4px rgba(0,0,0,.40)",
                    whiteSpace:    "nowrap",
                    lineHeight:    1,
                  }}>
                    {seg.sub}
                  </span>
                )}
              </span>

              {/* Separador decorativo doble ◆ */}
              <span style={{
                display:        "inline-flex",
                flexDirection:  "column",
                alignItems:     "center",
                gap:            "4px",
                flexShrink:     0,
                paddingRight:   "2px",
                opacity:        .60,
              }}>
                <span style={{ fontSize: ".52rem", color: "#FEFBEA", lineHeight: 1 }}>◆</span>
                <span style={{ fontSize: ".34rem", color: "rgba(255,230,140,.70)", lineHeight: 1 }}>◆</span>
              </span>

            </span>
          ))}
        </div>
      </div>

      {/* ══ ROSETA — llena exactamente la altura de la cinta ══════════════ */}
      <div style={{
        position:   "absolute",
        right:      "clamp(12px, 2.8%, 48px)",
        top:        `-${PIN_OVERHANG_TOP}px`,
        zIndex:     10,
        lineHeight: 0,
      }}>
        <RosetaPin />
      </div>

      <style>{`
        @keyframes iiap-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes iiap-ticker { from, to { transform: translateX(0); } }
        }
      `}</style>
    </section>
  );
}
