import type { DocumentoPlanificacion } from "@/lib/types";

export const documentosPlanificacion: DocumentoPlanificacion[] = [
  {
    id: "picia-2023-2026",
    titulo: "PICIA 2023–2026",
    subtitulo: "Plan Institucional Cuatrienal de Investigación Ambiental",
    anio: "2023–2026",
    descripcion:
      "Marco estratégico cuatrienal que orienta la investigación ambiental del IIAP hacia la democratización del conocimiento y la gobernanza del Chocó Biogeográfico. Define prioridades, metas y lineamientos para generar herramientas basadas en evidencia para políticas públicas sectoriales y nacionales.",
    url: "https://iiap.org.co/files/9d7802655d4a0d39dbf70ce51af27673",
    fechaPublicacion: "2025-08-20",
    tipo: "PICIA",
    icono: "📋",
  },
  {
    id: "poa-2025",
    titulo: "POA 2025",
    subtitulo: "Plan Operativo Anual",
    anio: "2025",
    descripcion:
      "Planificación operativa anual que articula la estructura organizacional, juntas de gobernanza, equipos de investigación y alianzas con comunidades étnicas del Pacífico colombiano. Instrumento de gestión que operacionaliza los objetivos del PICIA para el año vigente.",
    url: "https://iiap.org.co/files/9146c816aee24b8b0ac670f147aeff46",
    fechaPublicacion: "2025-08-20",
    tipo: "POA",
    icono: "📅",
  },
  {
    id: "penia-2021-2030",
    titulo: "PENIA 2021–2030",
    subtitulo: "Plan Estratégico Nacional de Investigación Ambiental",
    anio: "2021–2030",
    descripcion:
      "Marco nacional que orienta la investigación ambiental en Colombia para la próxima década. Define prioridades temáticas, territorios estratégicos y lineamientos de política que el IIAP incorpora en su agenda científica para el Pacífico colombiano.",
    url: "/assets/documentos/PENIA-2021-2030.pdf",
    fechaPublicacion: "2021-01-01",
    tipo: "PENIA",
    icono: "🌿",
  },
  {
    id: "pedi-2016-2026",
    titulo: "PEDI 2016–2026",
    subtitulo: "Plan Estratégico de Desarrollo Institucional",
    anio: "2016–2026",
    descripcion:
      "Plan decenal que establece la visión, misión y objetivos estratégicos del IIAP a largo plazo. Articula el fortalecimiento institucional, la gestión del conocimiento y el relacionamiento con comunidades y entidades del orden nacional e internacional.",
    url: "/assets/documentos/PEDI-2016-2026.pdf",
    fechaPublicacion: "2016-01-01",
    tipo: "PEDI",
    icono: "🏛️",
  },
];

export const estadisticasIIAP = [
  { valor: "65+", label: "Proyectos Activos", descripcion: "En ejecución 2024-2025" },
  { valor: "18+", label: "Investigadores", descripcion: "Planta profesional" },
  { valor: "5", label: "Grupos de Investigación", descripcion: "Reconocidos internamente" },
  { valor: "5", label: "Componentes Programáticos", descripcion: "Líneas estratégicas" },
];
