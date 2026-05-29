import { client } from "@/sanity/client";
import { actualizacionesQuery } from "@/sanity/lib/queries";
import ActualizacionesClient from "./ActualizacionesClient";

export const revalidate = 60;

export default async function ActualizacionesPage() {
  const items = await client.fetch(actualizacionesQuery);
  return <ActualizacionesClient items={items} />;
}
