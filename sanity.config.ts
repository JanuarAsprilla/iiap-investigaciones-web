import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "iiap-studio",
  title: "IIAP — Actualidades",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("IIAP Contenido")
          .items([
            S.listItem()
              .title("Actualidades")
              .icon(() => "📢")
              .child(
                S.list()
                  .title("Actualidades por componente")
                  .items([
                    S.listItem()
                      .title("Todas")
                      .child(
                        S.documentList()
                          .title("Todas las actualizaciones")
                          .filter('_type == "actualizacion"')
                          .defaultOrdering([{ field: "fechaPublicacion", direction: "desc" }])
                      ),
                    S.divider(),
                    ...[
                      { title: "Ecosistémico",      value: "ecosistemico" },
                      { title: "Sociocultural",      value: "sociocultural" },
                      { title: "Ambiental",          value: "ambiental" },
                      { title: "Laboratorio Datos",  value: "laboratorio-datos" },
                    ].map(({ title, value }) =>
                      S.listItem()
                        .title(title)
                        .child(
                          S.documentList()
                            .title(title)
                            .filter('_type == "actualizacion" && componente == $componente')
                            .params({ componente: value })
                            .defaultOrdering([{ field: "fechaPublicacion", direction: "desc" }])
                        )
                    ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Autores / Equipo")
              .icon(() => "👤")
              .child(
                S.documentList()
                  .title("Autores")
                  .filter('_type == "autor"')
              ),
          ]),
    }),
    visionTool(),
  ],
});
