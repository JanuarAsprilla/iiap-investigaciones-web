import type { ComponenteInvestigacion, GrupoInvestigacion } from "@/lib/types";

export const componentesInvestigacion: ComponenteInvestigacion[] = [
  {
    id: "sociocultural",
    nombre: "Componente Sociocultural",
    tipo: "SOCIOCULTURAL",
    descripcion:
      "Investiga las dinámicas culturales, sociales y territoriales de las comunidades étnicas del Chocó Biogeográfico, integrando saberes locales con metodologías científicas.",
    lineas: [
      "Etnobotánica y conocimiento tradicional",
      "Gobernanza territorial comunitaria",
      "Sistemas de producción tradicional",
      "Derechos bioculturales",
    ],
    imagen: "/assets/grupos/COMPONENTE_SOCIOCULTURAL.jpeg",
    color: "#1B5E3B",
  },
  {
    id: "ambiental",
    nombre: "Componente Ambiental",
    tipo: "AMBIENTAL",
    descripcion:
      "Monitoreo y análisis de la calidad ambiental del Pacífico colombiano: agua, suelo, aire y biodiversidad. Genera alertas tempranas y datos para política ambiental.",
    lineas: [
      "Calidad del agua en cuencas hidrográficas",
      "Monitoreo de contaminación por minería",
      "Evaluación de impactos ambientales",
      "Indicadores de salud ecosistémica",
    ],
    imagen: "/assets/grupos/COMPONENTE_AMBIENTAL.jpeg",
    color: "#26A65B",
  },
  {
    id: "productivo",
    nombre: "Componente Productivo",
    tipo: "PRODUCTIVO",
    descripcion:
      "Desarrolla y evalúa alternativas productivas sostenibles para comunidades rurales e indígenas, articulando investigación científica con aplicación comunitaria.",
    lineas: [
      "Sistemas agroforestales tropicales",
      "Acuicultura de especies nativas",
      "Biotecnología aplicada",
      "Cadenas de valor sostenibles",
    ],
    imagen: "/assets/centros/vainilla.jpeg",
    color: "#E07B2A",
  },
  {
    id: "ecosistemico",
    nombre: "Componente Ecosistémico",
    tipo: "ECOSISTEMICO",
    descripcion:
      "Estudio integral de los ecosistemas del Chocó Biogeográfico: estructura, función y servicios ecosistémicos. Referente nacional en biodiversidad húmedo tropical.",
    lineas: [
      "Inventarios de biodiversidad",
      "Restauración ecológica",
      "Servicios ecosistémicos y carbono",
      "Conectividad biológica",
    ],
    imagen: "/assets/grupos/COMPONENTE_ECOSISTEMICO.jpeg",
    color: "#0B3D2C",
  },
  {
    id: "laboratorio",
    nombre: "Laboratorio de Datos",
    tipo: "LABORATORIO",
    descripcion:
      "Plataforma de geoinformática y análisis espacial para la toma de decisiones ambientales. Integra teledetección, SIG y modelos predictivos con datos del IIAP.",
    lineas: [
      "Geoinformática y teledetección",
      "Sistemas de Información Geográfica (SIG)",
      "Modelado ambiental predictivo",
      "Plataformas de datos abiertos",
    ],
    imagen: "/assets/grupos/LABORATORIO_DATOS.jpeg",
    color: "#1A3A5C",
  },
];

export const gruposInvestigacion: GrupoInvestigacion[] = [
  {
    id: "gi-01",
    codigo: "GI-01",
    nombre: "Investigación Participativa con Comunidades Locales",
    descripcion:
      "Investiga de forma colaborativa con comunidades afrodescendientes e indígenas del Chocó, co-produciendo conocimiento que respeta los saberes tradicionales y fortalece la gobernanza local.",
    lineasTematicas: [
      "Co-producción de conocimiento con comunidades",
      "Etnobotánica aplicada",
      "Sistemas de producción traditional",
      "Mapeo participativo",
    ],
    coordinador: "Carlos Ariel Rentería Jiménez",
  },
  {
    id: "gi-02",
    codigo: "GI-02",
    nombre: "Restauración y Manejo de Hábitats",
    descripcion:
      "Desarrolla metodologías de restauración ecológica adaptadas a los ecosistemas húmedos tropicales del Pacífico, con énfasis en especies nativas y conectividad de paisajes.",
    lineasTematicas: [
      "Restauración de bosques húmedos",
      "Reforestación con especies nativas",
      "Monitoreo de recuperación ecosistémica",
      "Manejo de cuencas hidrográficas",
    ],
    coordinador: "Zulmary Valoyez Cardozo",
  },
  {
    id: "gama",
    codigo: "GAMA",
    nombre: "Geoinformática Aplicada al Medio Ambiente",
    descripcion:
      "Aplica tecnologías de información geográfica, teledetección y análisis espacial para la gestión ambiental y toma de decisiones en el Chocó Biogeográfico.",
    lineasTematicas: [
      "Teledetección y sensores remotos",
      "Análisis espacial y SIG",
      "Modelado de cambio de uso del suelo",
      "Plataformas de datos geoespaciales",
    ],
    coordinador: "Edsson Nagle Ramírez",
  },
  {
    id: "gi-04",
    codigo: "GI-04",
    nombre: "Comunidades Étnicas y Saberes del Chocó Biogeográfico",
    descripcion:
      "Documenta, valoriza y protege el conocimiento ancestral de comunidades negras e indígenas del Chocó, articulando cultura, territorio y biodiversidad.",
    lineasTematicas: [
      "Conocimiento ecológico tradicional",
      "Derecho propio y autonomía territorial",
      "Biocultural diversity",
      "Salvaguarda de saberes ancestrales",
    ],
    coordinador: "Lady Yulenis Vargas Porras",
  },
];
