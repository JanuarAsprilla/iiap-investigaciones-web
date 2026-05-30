"use client";
import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function ModalGallery({ images, alt }: Props) {
  const [idx, setIdx] = useState(0);
  const count = images.length;

  const prev = () => setIdx((i) => (i - 1 + count) % count);
  const next = () => setIdx((i) => (i + 1) % count);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={idx}
        src={images[idx]}
        alt={`${alt} — foto ${idx + 1} de ${count}`}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          objectPosition: "center",
          animation: "galFadeIn .28s ease-out both",
          display: "block",
        }}
      />

      {count > 1 && (
        <>
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Foto anterior"
            style={{
              position: "absolute", top: "50%", left: ".6rem",
              transform: "translateY(-50%)",
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(13,59,36,.72)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.2)", color: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .2s",
              zIndex: 10,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 2 4 7 9 12" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Foto siguiente"
            style={{
              position: "absolute", top: "50%", right: ".6rem",
              transform: "translateY(-50%)",
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(13,59,36,.72)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.2)", color: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .2s",
              zIndex: 10,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 2 10 7 5 12" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div style={{
            position: "absolute", bottom: ".65rem", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "5px", zIndex: 10,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`Foto ${i + 1}`}
                style={{
                  width: i === idx ? "18px" : "6px", height: "6px",
                  borderRadius: "999px", border: "none", cursor: "pointer", padding: 0,
                  background: i === idx ? "var(--amber)" : "rgba(255,255,255,.45)",
                  transition: "width .3s ease, background .3s ease",
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <span style={{
            position: "absolute", top: ".65rem", right: ".75rem",
            fontFamily: "var(--font-ui)", fontSize: ".58rem", fontWeight: 700,
            color: "#fff", background: "rgba(13,59,36,.62)", backdropFilter: "blur(6px)",
            padding: ".2rem .6rem", borderRadius: "var(--r-pill)", zIndex: 10,
          }}>
            {idx + 1}/{count}
          </span>
        </>
      )}

      <style>{`
        @keyframes galFadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
