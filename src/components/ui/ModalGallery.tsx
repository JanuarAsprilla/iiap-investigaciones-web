"use client";
import { useState, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  alt: string;
}

const SLIDE_MS = 5000;

function isVideo(src: string) {
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(src);
}

export default function ModalGallery({ images, alt }: Props) {
  const [idx,      setIdx]      = useState(0);
  const [paused,   setPaused]   = useState(false);
  const count = images.length;
  const current = images[idx];
  const currentIsVideo = isVideo(current);

  const go = useCallback((dir: number) => {
    setIdx((i) => (i + dir + count) % count);
  }, [count]);

  /* Auto-advance — pauses on hover and on video slides */
  useEffect(() => {
    if (count <= 1 || paused || currentIsVideo) return;
    const id = setInterval(() => go(1), SLIDE_MS);
    return () => clearInterval(id);
  }, [idx, count, paused, currentIsVideo, go]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Media ── */}
      {currentIsVideo ? (
        <video
          key={current}
          src={current}
          autoPlay muted playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={idx}
          src={current}
          alt={`${alt} — ${idx + 1} de ${count}`}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            display: "block",
            animation: "galFade .32s ease-out both",
          }}
        />
      )}

      {count > 1 && (
        <>
          {/* ── Progress bar (pauses on hover / video) ── */}
          {!currentIsVideo && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "3px", background: "rgba(255,255,255,.14)", zIndex: 12,
              pointerEvents: "none",
            }}>
              <div
                key={`pb-${idx}-${paused}`}
                style={{
                  height: "100%", background: "var(--amber)",
                  borderRadius: "0 2px 2px 0",
                  animation: paused ? "none" : `galProgress ${SLIDE_MS}ms linear forwards`,
                  width: paused ? "0" : undefined,
                }}
              />
            </div>
          )}

          {/* ── Prev button ── */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Anterior"
            className="gal-btn gal-btn-prev"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="10 3 5 8 10 13" />
            </svg>
          </button>

          {/* ── Next button ── */}
          <button
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Siguiente"
            className="gal-btn gal-btn-next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 3 11 8 6 13" />
            </svg>
          </button>

          {/* ── Dot strip ── */}
          <div style={{
            position: "absolute", bottom: "1rem", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: "5px", zIndex: 12,
          }}>
            {images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`${isVideo(src) ? "Video" : "Foto"} ${i + 1}`}
                style={{
                  width: i === idx ? "20px" : "6px",
                  height: "6px", borderRadius: "999px",
                  border: "none", cursor: "pointer", padding: 0,
                  background: i === idx ? "var(--amber)" : "rgba(255,255,255,.5)",
                  transition: "width .28s var(--ease), background .2s",
                }}
              />
            ))}
          </div>

          {/* ── Counter badge ── */}
          <span style={{
            position: "absolute", top: ".7rem", right: ".8rem",
            fontFamily: "var(--font-ui)", fontSize: ".56rem", fontWeight: 700,
            letterSpacing: ".06em", color: "rgba(255,255,255,.9)",
            background: "rgba(9,40,25,.58)",
            backdropFilter: "blur(10px)",
            padding: ".22rem .65rem", borderRadius: "var(--r-pill)",
            zIndex: 12, pointerEvents: "none",
          }}>
            {idx + 1}&thinsp;/&thinsp;{count}
          </span>
        </>
      )}

      <style>{`
        @keyframes galFade {
          from { opacity: 0; transform: scale(1.025); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes galProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Glass nav buttons */
        .gal-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(9,40,25,.58);
          backdrop-filter: blur(12px) saturate(1.3);
          /* taste-skill liquid glass: inner highlight simulates edge refraction */
          border: 1.5px solid rgba(255,255,255,.18);
          box-shadow: 0 4px 16px rgba(0,0,0,.28),
                      inset 0 1px 0 rgba(255,255,255,.12);
          color: rgba(255,255,255,.9);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background .18s, scale .14s var(--ease), border-color .18s;
          z-index: 12;
        }
        .gal-btn:hover {
          background: rgba(13,59,36,.82);
          border-color: rgba(232,150,15,.5);
          scale: 1.1;
        }
        .gal-btn:active { scale: 0.93; }
        .gal-btn-prev { left: .75rem; }
        .gal-btn-next { right: .75rem; }
        .gal-btn svg { pointer-events: none; }
      `}</style>
    </div>
  );
}
