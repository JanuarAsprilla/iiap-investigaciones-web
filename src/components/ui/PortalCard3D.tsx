"use client";

import Link from "next/link";

interface PortalCardProps {
  label: string;
  description: string;
  href: string;
  imageSrc: string;
}

export default function PortalCard3D({
  label,
  description,
  href,
  imageSrc,
}: PortalCardProps) {
  return (
    <Link
      href={href}
      aria-label={`Ir a ${label}`}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        textDecoration: "none",
        position: "relative",
      }}
    >
      <div
        className="portal-card-wrap"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "inherit",
          boxShadow:
            "0 12px 50px rgba(0,0,0,.55), 0 2px 10px rgba(0,0,0,.35)",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
        }}
      >
        {/* ── Imagen de fondo ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "20px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className="portal-card-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* ── Gradiente base ── */}
        <div
          className="grad-up"
          style={{ position: "absolute", inset: 0, borderRadius: "20px" }}
        />

        {/* ── Acento ámbar inferior radial ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(212,146,13,0.18) 0%, transparent 70%)",
          }}
        />

        {/* ── Shimmer lateral — aparece en hover via parent ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 12,
          }}
        />

        {/* ── Contenido ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "var(--t-xs)",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#E8960F",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "18px",
                height: "1.5px",
                background: "#E8960F",
                flexShrink: 0,
              }}
            />
            IIAP Investigaciones
          </p>

          {/* Título */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              lineHeight: 0.95,
              color: "#F4F1EB",
              letterSpacing: "0.03em",
              marginBottom: "1rem",
            }}
          >
            {label}
          </h2>

          {/* Descripción */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-base)",
              lineHeight: 1.65,
              color: "rgba(244,241,235,0.72)",
              marginBottom: "1.75rem",
              maxWidth: "28ch",
            }}
          >
            {description}
          </p>

          {/* CTA — hover handled by .portal-cta-btn + parent .portal-card-wrap:hover */}
          <div className="portal-cta-btn">
            Explorar
            <svg
              width="11" height="11" viewBox="0 0 12 12" fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2v6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Marco exterior ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.06)",
            pointerEvents: "none",
            zIndex: 15,
          }}
        />
      </div>
    </Link>
  );
}
