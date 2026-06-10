/* Reconocimiento Oficial — cinta condecorativa 3D de doble fila */
"use client";
import { useId } from "react";

/* Fila superior — datos clave. key=true → texto más grande y dorado brillante */
const ROW_A: { text: string; key?: boolean }[] = [
  { text: "Reconocimiento Oficial",               key: true  },
  { text: "Resolución N.° 1598",                  key: true  },
  { text: "30 de agosto de 2021"                             },
  { text: "Centro de Investigación Certificado",  key: true  },
  { text: "Acto Administrativo Vigente"                      },
];

/* Fila inferior — contexto institucional */
const ROW_B: { text: string; key?: boolean }[] = [
  { text: "Ministerio de Ciencia, Tecnología e Innovación",  key: true  },
  { text: "Instituto de Investigaciones Ambientales del Pacífico"        },
  { text: "John Von Neumann",                                key: true  },
  { text: "República de Colombia"                                        },
  { text: "Chocó Biogeográfico",                             key: true  },
];

/* ─── Roseta / Pin ───────────────────────────────────────────────────────── */
const SEG = 16;

function RosetaPin({ size = 108 }: { size?: number }) {
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
      style={{ display: "block", filter: "drop-shadow(0 5px 18px rgba(0,0,0,.55))" }}
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

/* ─── Track scrolling ────────────────────────────────────────────────────── */
function Track({
  items,
  animClass,
  separator,
}: {
  items: { text: string; key?: boolean }[];
  animClass: string;
  separator: string;
}) {
  const track = [...items, ...items];
  return (
    <div
      style={{ display: "flex", alignItems: "center", width: "max-content", height: "100%" }}
      className={animClass}
      onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
      onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
    >
      {track.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", height: "100%" }}>
          <span style={{
            fontFamily:    "var(--font-ui), system-ui, sans-serif",
            fontSize:      item.key ? "clamp(.67rem,.82vw,.80rem)" : "clamp(.57rem,.68vw,.66rem)",
            fontWeight:    item.key ? 800 : 600,
            letterSpacing: item.key ? "clamp(1.5px,.22vw,2.2px)" : "clamp(1px,.16vw,1.6px)",
            textTransform: "uppercase",
            color:         item.key ? "#FEFBEA" : "rgba(255,255,255,.76)",
            textShadow:    item.key
              ? "0 0 14px rgba(255,225,100,.65), 0 1px 5px rgba(0,0,0,.40)"
              : "0 1px 3px rgba(0,0,0,.28)",
            whiteSpace:    "nowrap",
            padding:       "0 clamp(18px,2.4vw,32px)",
            display:       "inline-block",
          }}>
            {item.text}
          </span>
          <span style={{
            fontSize:   item.key ? ".58rem" : ".46rem",
            color:      item.key ? "rgba(255,230,100,.70)" : "rgba(255,255,255,.40)",
            flexShrink: 0,
            lineHeight: 1,
          }}>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ─── Sección: cinta 3D condecorativa ───────────────────────────────────── */
export default function ReconocimientoSection() {
  const RIBBON_H         = 108;
  const ROW_H            = RIBBON_H / 2;
  const PIN_SIZE         = 108;
  const PIN_OVERHANG_TOP = 18;

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
      {/* ── Cinta 3D ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "relative",
          height:     `${RIBBON_H}px`,
          background: "linear-gradient(to bottom, #FEF5B0 0%, #F7C535 5%, #E8960F 20%, #D4820A 48%, #C07008 68%, #9A5405 84%, #7A3E03 100%)",
          borderTop:    "2px solid rgba(255,255,255,.55)",
          borderBottom: "2px solid rgba(0,0,0,.35)",
          boxShadow:    "inset 0 1px 0 rgba(255,255,255,.30), inset 0 -1px 0 rgba(0,0,0,.22), 0 4px 20px rgba(0,0,0,.32), 0 8px 36px rgba(0,0,0,.18)",
          overflow:        "hidden",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 88%, transparent 100%)",
          maskImage:       "linear-gradient(to right, transparent 0%, black 4%, black 88%, transparent 100%)",
        }}
      >
        {/* Sheen superior */}
        <div style={{
          position:      "absolute",
          inset:         "0 0 auto 0",
          height:        "32%",
          background:    "linear-gradient(to bottom, rgba(255,255,255,.22) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex:        2,
        }} />

        {/* Destello diagonal */}
        <div style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(108deg, transparent 38%, rgba(255,255,255,.10) 48%, rgba(255,255,255,.05) 56%, transparent 66%)",
          pointerEvents: "none",
          zIndex:        2,
        }} />

        {/* Línea divisoria entre filas */}
        <div style={{
          position:   "absolute",
          inset:      `${ROW_H - 1}px 0 auto 0`,
          height:     "1px",
          background: "rgba(0,0,0,.18)",
          boxShadow:  "0 1px 0 rgba(255,255,255,.10)",
          zIndex:     3,
        }} />

        {/* Fila A — scrollea hacia la izquierda */}
        <div style={{ height: `${ROW_H}px`, display: "flex", alignItems: "center", overflow: "hidden" }}>
          <Track items={ROW_A} animClass="iiap-track-a" separator="✦" />
        </div>

        {/* Fila B — scrollea hacia la derecha */}
        <div style={{ height: `${ROW_H}px`, display: "flex", alignItems: "center", overflow: "hidden" }}>
          <Track items={ROW_B} animClass="iiap-track-b" separator="◆" />
        </div>
      </div>

      {/* ── Roseta/pin ── */}
      <div style={{
        position: "absolute",
        right:    "clamp(20px,4%,64px)",
        top:      `-${PIN_OVERHANG_TOP}px`,
        zIndex:   10,
      }}>
        <RosetaPin size={PIN_SIZE} />
      </div>

      <style>{`
        .iiap-track-a {
          animation: iiap-left 58s linear infinite;
        }
        .iiap-track-b {
          animation: iiap-right 70s linear infinite;
        }
        @keyframes iiap-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes iiap-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .iiap-track-a, .iiap-track-b { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
