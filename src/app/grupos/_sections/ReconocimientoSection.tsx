/* Reconocimiento Oficial — cinta estática tipo diploma, columnas de info */
"use client";
import { useId } from "react";

/* ─── Roseta / Pin ───────────────────────────────────────────────────────── */
const SEG = 16;

function RosetaPin({ size = 92 }: { size?: number }) {
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

      <circle cx={cx} cy={cy} r={innerR+2.5} fill={`url(#${id}-ring)`} />
      <circle cx={cx} cy={cy} r={innerR+2.5} fill="none"
        stroke="rgba(80,40,0,.40)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={innerR} fill="white" />
      <circle cx={cx} cy={cy} r={innerR} fill="none"
        stroke="rgba(232,150,15,.55)" strokeWidth="1.2" />
      <ellipse cx={cx-size*.08} cy={cy-size*.20}
        rx={size*.20} ry={size*.08}
        fill="rgba(255,255,255,.18)" />
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

/* ─── Separador vertical ─────────────────────────────────────────────────── */
function Divider() {
  return (
    <div aria-hidden="true" className="rnk-div" style={{
      width:      "1px",
      alignSelf:  "stretch",
      background: "rgba(255,255,255,.28)",
      flexShrink: 0,
      margin:     "6px 0",
    }} />
  );
}

/* ─── Sección ────────────────────────────────────────────────────────────── */
export default function ReconocimientoSection() {
  const PIN_SIZE         = 92;
  const PIN_OVERHANG_TOP = 14;

  /* Estilos tipográficos compartidos */
  const T: Record<string, React.CSSProperties> = {
    heading: {
      fontFamily:    "var(--font-ui), system-ui, sans-serif",
      fontSize:      "clamp(.78rem,.96vw,.92rem)",
      fontWeight:    800,
      letterSpacing: "clamp(1.2px,.18vw,1.8px)",
      textTransform: "uppercase",
      color:         "#FFFFFF",
      textShadow:    "0 1px 4px rgba(0,0,0,.35)",
      lineHeight:    1.1,
      margin:        0,
    },
    sub: {
      fontFamily:    "var(--font-ui), system-ui, sans-serif",
      fontSize:      "clamp(.62rem,.74vw,.70rem)",
      fontWeight:    500,
      letterSpacing: "clamp(.6px,.10vw,1px)",
      textTransform: "uppercase",
      color:         "rgba(255,255,255,.82)",
      textShadow:    "0 1px 3px rgba(0,0,0,.28)",
      lineHeight:    1.2,
      margin:        "3px 0 0",
    },
    headingLg: {
      fontFamily:    "var(--font-ui), system-ui, sans-serif",
      fontSize:      "clamp(.88rem,1.08vw,1.04rem)",
      fontWeight:    800,
      letterSpacing: "clamp(1.4px,.20vw,2px)",
      textTransform: "uppercase",
      color:         "#FFFFFF",
      textShadow:    "0 1px 5px rgba(0,0,0,.38)",
      lineHeight:    1.1,
      margin:        0,
    },
    body: {
      fontFamily:    "var(--font-ui), system-ui, sans-serif",
      fontSize:      "clamp(.72rem,.88vw,.84rem)",
      fontWeight:    600,
      letterSpacing: "clamp(.5px,.08vw,.8px)",
      color:         "rgba(255,255,255,.90)",
      textShadow:    "0 1px 3px rgba(0,0,0,.28)",
      lineHeight:    1.3,
      margin:        "5px 0 0",
    },
  };

  return (
    <section
      aria-label="Reconocimiento Oficial — Resolución N.° 1598, Minciencias 2021"
      style={{ position: "relative", paddingTop: `${PIN_OVERHANG_TOP}px`, overflow: "visible" }}
    >
      {/* ── Cinta 3D estática ── */}
      <div className="rnk-body" style={{
        position:     "relative",
        background:   "linear-gradient(to bottom, #FEF5B0 0%, #F7C535 5%, #E8960F 18%, #D4820A 46%, #C07008 66%, #9A5405 83%, #7A3E03 100%)",
        borderTop:    "2px solid rgba(255,255,255,.55)",
        borderBottom: "2px solid rgba(0,0,0,.35)",
        boxShadow:    "inset 0 1px 0 rgba(255,255,255,.30), inset 0 -1px 0 rgba(0,0,0,.22), 0 4px 20px rgba(0,0,0,.32), 0 8px 36px rgba(0,0,0,.18)",
        display:      "flex",
        alignItems:   "center",
        gap:          "clamp(16px,2.6vw,40px)",
        padding:      "clamp(12px,1.6vw,18px) clamp(80px,8vw,120px) clamp(12px,1.6vw,18px) clamp(16px,2.8vw,40px)",
        overflow:     "hidden",
      }}>

        {/* Sheen superior */}
        <div aria-hidden="true" style={{
          position:      "absolute",
          inset:         "0 0 auto 0",
          height:        "34%",
          background:    "linear-gradient(to bottom, rgba(255,255,255,.22) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        {/* Destello diagonal */}
        <div aria-hidden="true" style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(108deg, transparent 36%, rgba(255,255,255,.09) 46%, rgba(255,255,255,.04) 54%, transparent 64%)",
          pointerEvents: "none",
        }} />

        {/* ── Bloque izquierdo: dos pares apilados ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1.1vw,13px)", flexShrink: 0, zIndex: 1 }}>
          <div>
            <p style={T.heading}>Centro de Investigación Certificado</p>
            <p style={T.sub}>Acto administrativo vigente</p>
          </div>
          <div>
            <p style={T.heading}>Resolución N.°&nbsp;1598</p>
            <p style={T.sub}>30 de agosto del 2021</p>
          </div>
        </div>

        <Divider />

        {/* ── Bloque central ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1, zIndex: 1 }}>
          <div>
            <p style={T.headingLg}>Reconocimiento Oficial</p>
            <p style={T.sub}>República de Colombia</p>
          </div>
          <p style={T.body}>Ministerio de Ciencia, Tecnología e Innovación</p>
        </div>

      </div>

      {/* ── Roseta/pin ── */}
      <div style={{
        position: "absolute",
        right:    "clamp(16px,3.2%,52px)",
        top:      `-${PIN_OVERHANG_TOP}px`,
        zIndex:   10,
      }}>
        <RosetaPin size={PIN_SIZE} />
      </div>

      {/* Responsive: en mobile apilar bloques */}
      <style>{`
        @media (max-width: 600px) {
          .rnk-body {
            flex-direction: column !important;
            gap: 10px !important;
            padding-right: clamp(16px,5vw,28px) !important;
          }
          .rnk-div { display: none !important; }
        }
      `}</style>
    </section>
  );
}
