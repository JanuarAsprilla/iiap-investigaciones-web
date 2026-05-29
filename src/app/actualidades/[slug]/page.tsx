import { client } from "@/sanity/client";
import { actualizacionBySlugQuery, slugsQuery } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import SiteNav from "@/components/layout/SiteNav";
import Link from "next/link";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await client.fetch(actualizacionBySlugQuery, { slug });
  if (!item) return { title: "Actualización — IIAP" };
  return {
    title: `${item.titulo} — IIAP Investigaciones`,
    description: item.resumen,
    openGraph: {
      title: item.titulo,
      description: item.resumen,
      type: "article",
      images: item.imagenPrincipal ? [{ url: item.imagenPrincipal }] : [],
    },
  };
}

const COMPONENTE_META: Record<string, { label: string; color: string; bg: string }> = {
  ecosistemico:        { label: "Ecosistémico",      color: "var(--forest)",        bg: "var(--forest-lt)"       },
  sociocultural:       { label: "Sociocultural",      color: "var(--amber)",         bg: "var(--gold-dim)"        },
  ambiental:           { label: "Ambiental",          color: "var(--comp-ambiental)",bg: "var(--comp-ambiental-bg)"},
  "laboratorio-datos": { label: "Laboratorio Datos",  color: "var(--comp-lab)",      bg: "var(--comp-lab-bg)"     },
};

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await client.fetch(slugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function ActualizacionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await client.fetch(actualizacionBySlugQuery, { slug });

  if (!item) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>Actualización no encontrada.</p>
      </div>
    );
  }

  const meta  = COMPONENTE_META[item.componente] ?? { label: item.componente, color: "var(--forest)", bg: "rgba(26,92,58,.1)" };
  const fecha = new Date(item.fechaPublicacion).toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <SiteNav />
      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── Hero con imagen ── */}
        <section style={{
          position: "relative", overflow: "hidden",
          minHeight: item.imagenPrincipal ? "55vh" : "auto",
          padding: "clamp(7rem,12vh,10rem) clamp(1.25rem,4vw,3rem) clamp(3rem,5vh,5rem)",
          background: item.imagenPrincipal
            ? "transparent"
            : "linear-gradient(150deg, var(--forest-d) 0%, var(--forest) 100%)",
        }}>
          {item.imagenPrincipal && (
            <>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${item.imagenPrincipal})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(150deg, rgba(9,40,25,.88) 0%, rgba(13,59,36,.80) 100%)",
              }} />
            </>
          )}

          <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto" }}>
            {/* Back link */}
            <Link href="/actualidades" style={{
              display: "inline-flex", alignItems: "center", gap: ".4rem",
              fontFamily: "var(--font-ui)", fontSize: ".72rem", fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase",
              color: "rgba(255,255,255,.6)", textDecoration: "none",
              marginBottom: "1.5rem",
              transition: "color .18s",
            }}>
              ← Actualidades
            </Link>

            {/* Badge */}
            <div style={{ marginBottom: "1rem" }}>
              <span style={{
                display: "inline-block",
                fontFamily: "var(--font-ui)", fontSize: ".68rem", fontWeight: 800,
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: meta.color, background: meta.bg,
                padding: ".25rem .75rem", borderRadius: "var(--r-pill)",
              }}>
                {meta.label}
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem,4vw,3.25rem)",
              lineHeight: 1.05, color: "#fff",
              marginBottom: "1.5rem",
            }}>
              {item.titulo}
            </h1>

            {/* Meta row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
              <time style={{ fontFamily: "var(--font-ui)", fontSize: ".8rem", color: "rgba(255,255,255,.65)", textTransform: "capitalize" }}>
                {fecha}
              </time>
              {item.autores && item.autores.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem" }}>
                  {item.autores.map((a: any, i: number) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      {a.foto && (
                        <img src={a.foto} alt={a.nombre} style={{
                          width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover",
                          border: "2px solid rgba(255,255,255,.3)",
                        }} />
                      )}
                      <div>
                        <p style={{ fontFamily: "var(--font-ui)", fontSize: ".8rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                          {a.nombre}
                        </p>
                        {a.cargo && (
                          <p style={{ fontFamily: "var(--font-ui)", fontSize: ".68rem", color: "rgba(255,255,255,.55)", margin: 0 }}>
                            {a.cargo}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Cuerpo ── */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "clamp(2.5rem,4vw,4rem) clamp(1.25rem,4vw,3rem)" }}>

          {/* Resumen destacado */}
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.05rem,1.5vw,1.2rem)",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            borderLeft: `3px solid ${meta.color}`,
            paddingLeft: "1.25rem",
            marginBottom: "2.5rem",
          }}>
            {item.resumen}
          </p>

          {/* Portable text body */}
          {item.cuerpo && (
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-base)",
              lineHeight: 1.8,
              color: "var(--text-primary)",
            }}>
              <PortableText
                value={item.cuerpo}
                components={{
                  block: {
                    normal: ({ children }: any) => <p style={{ marginBottom: "1.25rem" }}>{children}</p>,
                    h2:     ({ children }: any) => <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", marginBottom: ".75rem", marginTop: "2.5rem", color: "var(--forest)" }}>{children}</h2>,
                    h3:     ({ children }: any) => <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem,2vw,1.4rem)", marginBottom: ".5rem", marginTop: "2rem", color: "var(--forest)" }}>{children}</h3>,
                    blockquote: ({ children }: any) => (
                      <blockquote style={{ borderLeft: `3px solid ${meta.color}`, paddingLeft: "1.25rem", margin: "2rem 0", color: "var(--text-secondary)", fontStyle: "italic" }}>
                        {children}
                      </blockquote>
                    ),
                  },
                  list: {
                    bullet:  ({ children }: any) => <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>{children}</ul>,
                    number:  ({ children }: any) => <ol style={{ paddingLeft: "1.5rem", marginBottom: "1.25rem" }}>{children}</ol>,
                  },
                  listItem: {
                    bullet:  ({ children }: any) => <li style={{ marginBottom: ".4rem" }}>{children}</li>,
                    number:  ({ children }: any) => <li style={{ marginBottom: ".4rem" }}>{children}</li>,
                  },
                  types: {
                    image: ({ value }: any) => (
                      <figure style={{ margin: "2rem 0" }}>
                        <img src={value.asset?.url} alt={value.alt ?? ""} style={{ width: "100%", borderRadius: "var(--r-lg)", objectFit: "cover" }} />
                        {value.alt && <figcaption style={{ fontFamily: "var(--font-ui)", fontSize: ".75rem", color: "var(--text-muted)", marginTop: ".5rem", textAlign: "center" }}>{value.alt}</figcaption>}
                      </figure>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* Galería */}
          {item.galeria && item.galeria.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2vw,1.6rem)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                Galería
              </h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,220px),1fr))",
                gap: ".75rem",
              }}>
                {item.galeria.map((url: string, i: number) => (
                  <img key={i} src={url} alt={`Imagen ${i + 1}`} style={{
                    width: "100%", aspectRatio: "4/3",
                    objectFit: "cover", borderRadius: "var(--r-md)",
                  }} />
                ))}
              </div>
            </section>
          )}

          {/* Documentos adjuntos */}
          {item.documentos && item.documentos.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2vw,1.6rem)", color: "var(--forest)", marginBottom: "1.25rem" }}>
                Documentos
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {item.documentos.map((doc: any, i: number) => (
                  <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", gap: ".75rem",
                    padding: ".875rem 1.25rem",
                    background: "var(--surface)", border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--r-md)", textDecoration: "none",
                    fontFamily: "var(--font-ui)", fontSize: ".85rem", color: "var(--text-primary)",
                    transition: "border-color .18s, background .18s",
                  }}>
                    <span style={{ fontSize: "1.1rem" }}>📄</span>
                    {doc.nombre}
                    <span style={{ marginLeft: "auto", fontSize: ".72rem", color: "var(--text-muted)" }}>PDF ↗</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Etiquetas */}
          {item.etiquetas && item.etiquetas.length > 0 && (
            <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
              {item.etiquetas.map((tag: string) => (
                <span key={tag} style={{
                  fontFamily: "var(--font-ui)", fontSize: ".68rem", fontWeight: 600,
                  letterSpacing: "1px", textTransform: "uppercase",
                  padding: ".25rem .75rem", borderRadius: "var(--r-pill)",
                  background: "var(--surface)", border: "1px solid var(--border-subtle)",
                  color: "var(--text-muted)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border-subtle)" }}>
            <Link href="/actualidades" style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              fontFamily: "var(--font-ui)", fontSize: ".8rem", fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase",
              color: "var(--forest)", textDecoration: "none",
            }}>
              ← Ver todas las actualidades
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} IIAP — Actualidades
            </p>
            <a href="/" style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)", textDecoration: "none" }}>
              ← Portal IIAP
            </a>
          </div>
        </footer>

      </main>
    </>
  );
}
