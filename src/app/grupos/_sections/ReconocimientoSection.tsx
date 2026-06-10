/* Reconocimiento Oficial — cinta marquee infinita con roseta/pin lateral */
"use client";
import { useId } from "react";

/* Hechos clave que scrollean en la cinta */
const ITEMS = [
  "Reconocimiento Oficial",
  "Resolución N.° 1598",
  "30 de agosto de 2021",
  "Ministerio de Ciencia, Tecnología e Innovación",
  "Centro de Investigación Certificado",
  "Instituto de Investigaciones Ambientales del Pacífico",
  "John Von Neumann",
  "República de Colombia",
  "Chocó Biogeográfico",
  "Acto Administrativo Vigente",
];

/* ─── Roseta / Pin ───────────────────────────────────────────────────────── */
const SEG = 16;

function RosetaPin({ size = 96 }: { size?: number }) {
  const id     = useId().replace(/:/g, "");
  const cx     = size / 2;
  const cy     = size / 2;
  const outerR = size * 0.445;
  const innerR = size * 0.260;
  const tailW  = size * 0.148;
  const tailH  = size * 0.50;
  const gap    = size * 0.036;
  const notch  = size * 0.11;
  const tailY  = cy + size * 0.195;

  return (
    <svg
      width={size}
      height={size + tailH}
      viewBox={`0 0 ${size} ${size + tailH}`}
      aria-hidden="true"
      style={{ display: "block", filter: "drop-shadow(0 4px 14px rgba(0,0,0,.50))" }}
    >
      <defs>
        <radialGradient id={`${id}-s`} cx="42%" cy="28%" r="68%">
          <stop offset="0%"   stopColor="#F9DC6A" />
          <stop offset="48%"  stopColor="#E8960F" />
          <stop offset="100%" stopColor="#A05C08" />
        </radialGradient>
        <radialGradient id={`${id}-ring`} cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#F0C040" />
          <stop offset="60%"  stopColor="#C07A0C" />
          <stop offset="100%" stopColor="#7A4A05" />
        </radialGradient>
        <linearGradient id={`${id}-t`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#9A5E06" />
          <stop offset="50%"  stopColor="#E8960F" />
          <stop offset="100%" stopColor="#9A5E06" />
        </linearGradient>
      </defs>

      {/* Colas */}
      {[
        { lx: cx - gap / 2 - tailW, shine: cx - gap / 2 - tailW * 0.68 },
        { lx: cx + gap / 2,         shine: cx + gap / 2 + tailW * 0.68 },
      ].map(({ lx, shine }, i) => (
        <g key={i}>
          <polygon
            points={`${lx},${tailY} ${lx+tailW},${tailY} ${lx+tailW},${tailY+tailH} ${lx+tailW/2},${tailY+tailH-notch} ${lx},${tailY+tailH}`}
            fill={`url(#${id}-t)`}
          />
          <line x1={shine} y1={tailY+4} x2={shine} y2={tailY+tailH*.82}
            stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
        </g>
      ))}

      {/* Segmentos plegados */}
      {Array.from({ length: SEG }).map((_, i) => {
        const a0 = ((i * 360) / SEG - 90) * (Math.PI / 180);
        const a1 = (((i+1) * 360) / SEG - 90) * (Math.PI / 180);
        const am = (a0 + a1) / 2;
        const fR = innerR + (outerR - innerR) * 0.36;
        const pts = [
          `${cx+innerR*Math.cos(a0)},${cy+innerR*Math.sin(a0)}`,
          `${cx+outerR*Math.cos(a0)},${cy+outerR*Math.sin(a0)}`,
          `${cx+outerR*Math.cos(a1)},${cy+outerR*Math.sin(a1)}`,
          `${cx+innerR*Math.cos(a1)},${cy+innerR*Math.sin(a1)}`,
        ].join(" ");
        return (
          <g key={i}>
            <polygon points={pts} fill={`url(#${id}-s)`} />
            <line
              x1={cx+fR*Math.cos(am)} y1={cy+fR*Math.sin(am)}
              x2={cx+outerR*Math.cos(am)} y2={cy+outerR*Math.sin(am)}
              stroke="rgba(0,0,0,.16)" strokeWidth=".9"
            />
          </g>
        );
      })}

      {/* Anillo y círculo interior */}
      <circle cx={cx} cy={cy} r={innerR+2.5} fill={`url(#${id}-ring)`} />
      <circle cx={cx} cy={cy} r={innerR+2.5} fill="none"
        stroke="rgba(80,40,0,.40)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={innerR} fill="white" />
      <circle cx={cx} cy={cy} r={innerR} fill="none"
        stroke="rgba(232,150,15,.55)" strokeWidth="1.2" />

      {/* Brillo */}
      <ellipse cx={cx-size*.08} cy={cy-size*.20}
        rx={size*.20} ry={size*.08}
        fill="rgba(255,255,255,.18)" />

      {/* Año */}
      <text x={cx} y={cy}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-display)"
        fontSize={size * 0.17}
        fill="#0D3B24"
        letterSpacing="1"
      >2021</text>
    </svg>
  );
}

/* ─── Sección: cinta marquee ─────────────────────────────────────────────── */
export default function ReconocimientoSection() {
  /* Duplicamos los items para que el loop sea seamless */
  const track = [...ITEMS, ...ITEMS];
  const RIBBON_H = 46; /* px — altura de la cinta */
  const PIN_SIZE  = 96;
  const PIN_OVERHANG_TOP = 14; /* cuántos px sobresale el pin por arriba */

  return (
    <section
      aria-label="Reconocimiento Oficial — Resolución N.° 1598, Minciencias 2021"
      style={{
        position: "relative",
        /* Espacio para el pin que sobresale arriba y las colas abajo */
        paddingTop:    `${PIN_OVERHANG_TOP}px`,
        paddingBottom: 0,
        overflow: "visible",
      }}
    >
      {/* ── Cinta amber ── */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          height: `${RIBBON_H}px`,
          background: "linear-gradient(to bottom, #FBE070 0%, #E8960F 22%, #C47A0C 68%, #8A5205 100%)",
          borderTop:    "1px solid rgba(255,255,255,.28)",
          borderBottom: "1px solid rgba(0,0,0,.18)",
          boxShadow: "0 2px 10px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.20)",
          overflow: "hidden",
          /* Fade en los bordes laterales */
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 88%, transparent 100%)",
        }}
      >
        {/* Brillo satinado */}
        <div style={{
          position: "absolute", inset: "0 0 auto 0",
          height: "40%",
          background: "linear-gradient(to bottom, rgba(255,255,255,.18) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Track infinito — se pausa con hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "max-content",
            animation: "iiap-ticker 62s linear infinite",
            cursor: "default",
          }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
        >
          {track.map((text, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-ui), system-ui, sans-serif",
                fontSize: "clamp(.55rem,.7vw,.68rem)",
                fontWeight: 700,
                letterSpacing: "clamp(1.5px,.25vw,2.5px)",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.96)",
                textShadow: "0 1px 3px rgba(0,0,0,.25)",
                whiteSpace: "nowrap",
                padding: "0 clamp(18px,2.5vw,32px)",
              }}>
                {text}
              </span>
              {/* Separador diamante */}
              <span style={{
                fontSize: "clamp(.45rem,.55vw,.52rem)",
                color: "rgba(255,255,255,.60)",
                flexShrink: 0,
              }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Roseta/pin — anclada en el extremo derecho ── */}
      <div style={{
        position: "absolute",
        right: "clamp(20px,4%,64px)",
        top:   `-${PIN_OVERHANG_TOP}px`,
        zIndex: 10,
      }}>
        <RosetaPin size={PIN_SIZE} />
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
