import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { actualizacionesQuery } from "@/sanity/lib/queries";
import ActualizacionesClient from "./ActualizacionesClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Actualidades — IIAP Investigaciones",
  description: "Avances, resultados y noticias de los componentes de investigación del Instituto de Investigaciones Ambientales del Pacífico.",
  openGraph: {
    title: "Actualidades — IIAP",
    description: "Ciencia ambiental del Chocó Biogeográfico: avances y resultados de nuestros equipos de investigación.",
    type: "website",
  },
};

export default async function ActualizacionesPage() {
  const items = await client.fetch(actualizacionesQuery);
  return <ActualizacionesClient items={items} />;
}
