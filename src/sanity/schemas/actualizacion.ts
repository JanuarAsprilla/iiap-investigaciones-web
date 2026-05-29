import { defineField, defineType } from "sanity";

const COMPONENTES = [
  { title: "Componente Ecosistémico",  value: "ecosistemico" },
  { title: "Componente Sociocultural", value: "sociocultural" },
  { title: "Componente Ambiental",     value: "ambiental" },
  { title: "Laboratorio de Datos",     value: "laboratorio-datos" },
];

export const actualizacionSchema = defineType({
  name: "actualizacion",
  title: "Actualización",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (r) => r.required().min(5).max(200),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: { source: "titulo", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "componente",
      title: "Componente",
      type: "string",
      options: { list: COMPONENTES, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "resumen",
      title: "Resumen",
      description: "Texto corto que aparece en la tarjeta del feed (máx. 300 caracteres)",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "imagenPrincipal",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cuerpo",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Descripción de imagen", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "galeria",
      title: "Galería de imágenes",
      type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [{ name: "alt", title: "Descripción", type: "string" }],
      }],
    }),
    defineField({
      name: "documentos",
      title: "Documentos adjuntos",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "nombre", title: "Nombre del documento", type: "string", validation: (r: any) => r.required() },
          { name: "archivo", title: "Archivo (PDF)", type: "file", options: { accept: ".pdf" } },
        ],
        preview: { select: { title: "nombre" } },
      }],
    }),
    defineField({
      name: "autores",
      title: "Autores / Equipo",
      description: "Personas que realizaron este trabajo",
      type: "array",
      of: [{ type: "reference", to: [{ type: "autor" }] }],
    }),
    defineField({
      name: "etiquetas",
      title: "Etiquetas",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "fechaPublicacion",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publicado",
      title: "Publicado",
      description: "Solo las actualizaciones publicadas aparecen en el sitio",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "componente",
      media: "imagenPrincipal",
      publicado: "publicado",
    },
    prepare({ title, subtitle, media, publicado }: any) {
      const labels: Record<string, string> = {
        ecosistemico: "Ecosistémico",
        sociocultural: "Sociocultural",
        ambiental: "Ambiental",
        "laboratorio-datos": "Laboratorio de Datos",
      };
      return {
        title,
        subtitle: `${labels[subtitle] ?? subtitle} ${publicado ? "✓" : "◦ Borrador"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Fecha (más reciente)",
      name: "fechaDesc",
      by: [{ field: "fechaPublicacion", direction: "desc" }],
    },
  ],
});
