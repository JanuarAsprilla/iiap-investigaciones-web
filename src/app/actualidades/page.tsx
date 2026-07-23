import type { Metadata } from "next";
import { Suspense } from "react";
import ActualidadesApp from "./ActualidadesApp";

export const metadata: Metadata = {
  title: "Actualidades — IIAP Investigaciones",
  description: "Avances, resultados y noticias de los componentes de investigación del Instituto de Investigaciones Ambientales del Pacífico.",
  openGraph: {
    title: "Actualidades — IIAP",
    description: "Ciencia ambiental del Chocó Biogeográfico: avances y resultados de nuestros equipos de investigación.",
    type: "website",
  },
};

/**
 * Página de Actualidades: shell estático.
 *
 * El contenido (listado y detalle) se carga EN EL NAVEGADOR desde Sanity, para
 * que las novedades aparezcan en vivo sin recompilar el sitio. El detalle de
 * cada artículo se resuelve por el parámetro `?slug=` sobre esta misma ruta,
 * de modo que un solo archivo estático sirve cualquier artículo (presente o
 * futuro). `useSearchParams` exige un límite de Suspense.
 */
export default function ActualizacionesPage() {
  return (
    <Suspense fallback={null}>
      <ActualidadesApp />
    </Suspense>
  );
}
