import { groq } from "next-sanity";

const autorFields = groq`
  nombre,
  cargo,
  "foto": foto.asset->url,
`;

const cardFields = groq`
  _id,
  titulo,
  "slug": slug.current,
  resumen,
  componente,
  "imagenPrincipal": imagenPrincipal.asset->url,
  fechaPublicacion,
  etiquetas,
  autores[]->{ ${autorFields} }
`;

export const actualizacionesQuery = groq`
  *[_type == "actualizacion" && publicado == true] | order(fechaPublicacion desc) {
    ${cardFields}
  }
`;

export const actualizacionesPorComponenteQuery = groq`
  *[_type == "actualizacion" && publicado == true && componente == $componente]
  | order(fechaPublicacion desc) {
    ${cardFields}
  }
`;

export const actualizacionBySlugQuery = groq`
  *[_type == "actualizacion" && slug.current == $slug][0] {
    _id,
    titulo,
    "slug": slug.current,
    resumen,
    componente,
    cuerpo,
    "imagenPrincipal": imagenPrincipal.asset->url,
    "galeria": galeria[].asset->url,
    documentos[] {
      nombre,
      "url": archivo.asset->url,
    },
    fechaPublicacion,
    etiquetas,
    autores[]->{ ${autorFields} bio }
  }
`;

export const slugsQuery = groq`
  *[_type == "actualizacion" && publicado == true && defined(slug.current)]{
    "slug": slug.current
  }
`;
