import { defineField, defineType } from "sanity";

export const autorSchema = defineType({
  name: "autor",
  title: "Autor",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre completo",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cargo",
      title: "Cargo / Rol",
      type: "string",
    }),
    defineField({
      name: "componente",
      title: "Componente",
      type: "string",
      options: {
        list: [
          { title: "Componente Ecosistémico",  value: "ecosistemico" },
          { title: "Componente Sociocultural", value: "sociocultural" },
          { title: "Componente Ambiental",     value: "ambiental" },
          { title: "Laboratorio de Datos",     value: "laboratorio-datos" },
          { title: "Administración",           value: "administracion" },
        ],
      },
    }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biografía breve",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "cargo", media: "foto" },
  },
});
