"use client";

import { useEffect, useState, type ReactNode } from "react";

interface ModuleHeroProps {
  headingId: string;
  eyebrow: string;
  heading: ReactNode;
  description: ReactNode;
  backgrounds: string[];
  gradient?: string;
  radialGradient?: string;
  extra?: ReactNode;
}

const SECTION_PADDING = "clamp(7rem,12vh,10rem) clamp(1.25rem,4vw,3rem) clamp(4rem,7vh,6rem)";
const BG_INTERVAL_MS = 4000;

export default function ModuleHero({
  headingId,
  eyebrow,
  heading,
  description,
  backgrounds,
  gradient = "linear-gradient(150deg, rgba(13,59,36,.85) 0%, rgba(9,40,25,.90) 100%)",
  radialGradient = "radial-gradient(ellipse at 50% 50%, rgba(232,150,15,.12) 0%, transparent 55%)",
  extra,
}: ModuleHeroProps) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, BG_INTERVAL_MS);
    return () => clearInterval(id);
  }, [backgrounds.length]);

  return (
    <section
      aria-labelledby={headingId}
      style={{ position: "relative", overflow: "hidden", padding: SECTION_PADDING }}
    >
      {backgrounds.map((src, i) => (
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

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: gradient }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: radialGradient, pointerEvents: "none" }} />

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
          {eyebrow}
        </span>

        <h1
          id={headingId}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--t-4xl)",
            lineHeight: .9,
            color: "#fff",
            letterSpacing: ".01em",
            marginBottom: "1.25rem",
          }}
        >
          {heading}
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
          {description}
        </p>

        {extra}

        <div style={{ display: "flex", gap: "8px" }} aria-hidden="true">
          {backgrounds.map((_, i) => (
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
  );
}
