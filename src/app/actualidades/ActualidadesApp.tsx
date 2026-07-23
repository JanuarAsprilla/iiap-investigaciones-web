"use client";

import { useSearchParams } from "next/navigation";
import ActualizacionesClient from "./ActualizacionesClient";
import ArticuloDetalle from "./ArticuloDetalle";

/**
 * Enrutador de cliente para Actualidades.
 * - Sin `?slug`  → listado de novedades.
 * - Con `?slug`  → detalle del artículo (cualquier slug, presente o futuro).
 */
export default function ActualidadesApp() {
  const slug = useSearchParams().get("slug");
  return slug ? <ArticuloDetalle slug={slug} /> : <ActualizacionesClient />;
}
