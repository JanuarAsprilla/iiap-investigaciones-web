import type { Bioespacio, InstalacionCentro } from "@/lib/types";

export const infoCentro = {
  nombre: "Centro Experimental IIAP",
  ubicacion: "18 km al sur de Quibdó, comunidad Doña Josefa (Atrato)",
  coordenadas: { lat: 5.5717, lng: -76.6269 },
  horario: "Lunes a viernes, 9:00 AM – 3:00 PM",
  descripcion:
    "Centro de investigación y experimentación en biodiversidad del Chocó Biogeográfico. Punto estratégico para el estudio de ecosistemas húmedos tropicales, con infraestructura científica de alto nivel y espacios colaborativos para la comunidad investigadora.",
};

export const instalaciones: InstalacionCentro[] = [
  {
    id: "oficinas",
    nombre: "Oficinas Individuales",
    descripcion: "Espacios privados de trabajo equipados para investigadores residentes y visitantes.",
    detalle:
      "Cada oficina individual está diseñada para el trabajo científico de alta concentración. Cuentan con escritorio amplio, estantería modular, conexión de red de alta velocidad y condiciones de climatización estable para el manejo de equipos de cómputo y muestras biológicas.",
    imagen: "/assets/centros/ESPACIOS_CENTRO.jpeg",
    galeria: [
      "/assets/centros/ESPACIOS_CENTRO.jpeg",
      "/assets/centros/ESPACIOS_AUDIOVISUALES.jpeg",
      "/assets/centros/LABORATORIO.jpeg",
    ],
    cantidad: "24",
    unidad: "Oficinas disponibles",
    caracteristicas: [
      "Acceso a red LAN y WiFi institucional",
      "Climatización controlada",
      "Almacenamiento seguro para muestras",
      "Disponibles para investigadores visitantes",
    ],
  },
  {
    id: "salas",
    nombre: "Salas Colaborativas",
    descripcion: "Espacios de trabajo en equipo con capacidad para 10 personas cada una.",
    detalle:
      "Las salas colaborativas están concebidas para el trabajo interdisciplinario y la co-creación científica. Equipadas con pantallas interactivas, pizarras de vidrio y mobiliario flexible que se adapta a reuniones de trabajo, talleres participativos y sesiones de diseño de proyectos.",
    imagen: "/assets/centros/ESPACIOS_AUDIOVISUALES.jpeg",
    galeria: [
      "/assets/centros/ESPACIOS_AUDIOVISUALES.jpeg",
      "/assets/centros/ESPACIOS_CENTRO.jpeg",
      "/assets/comunes/YDRAY-IMG_1099.jpeg",
    ],
    cantidad: "4",
    unidad: "Salas disponibles",
    caracteristicas: [
      "Pantallas interactivas 65\"",
      "Videoconferencia integrada",
      "Capacidad de 10 personas c/u",
      "Mobiliario modular reconfigurable",
    ],
  },
  {
    id: "documentacion",
    nombre: "Centro de Documentación",
    descripcion: "Repositorio físico y digital de investigaciones, publicaciones científicas y material de referencia.",
    detalle:
      "El Centro de Documentación custodia el patrimonio intelectual del IIAP: más de 3.000 publicaciones físicas, acceso a bases de datos científicas indexadas (Scopus, Web of Science), repositorio digital institucional y sala de consulta para investigadores y estudiantes.",
    imagen: "/assets/centros/CENTRO_DOCUMENTACION.png",
    galeria: [
      "/assets/centros/CENTRO_DOCUMENTACION.png",
      "/assets/centros/ESPACIOS_CENTRO.jpeg",
      "/assets/centros/ESPACIOS_AUDIOVISUALES.jpeg",
    ],
    caracteristicas: [
      "+3.000 publicaciones físicas",
      "Acceso a Scopus y Web of Science",
      "Repositorio digital institucional",
      "Sala de consulta silenciosa",
    ],
  },
  {
    id: "laboratorio",
    nombre: "Laboratorio de Datos HPC",
    descripcion: "Infraestructura de cómputo de alta performance para análisis geoespacial, modelado ambiental y procesamiento de datos científicos.",
    detalle:
      "El Laboratorio HPC (High Performance Computing) del IIAP es la columna vertebral del análisis de datos científicos del Pacífico colombiano. Procesa grandes volúmenes de información satelital, datos de biodiversidad y modelos climáticos para apoyar la toma de decisiones ambientales.",
    imagen: "/assets/centros/LABORATORIO.jpeg",
    galeria: [
      "/assets/centros/LABORATORIO.jpeg",
      "/assets/grupos/LABORATORIO_DATOS.jpeg",
      "/assets/centros/ESPACIOS_CENTRO.jpeg",
    ],
    caracteristicas: [
      "Procesamiento geoespacial con QGIS y ArcGIS",
      "Modelado ambiental y climático",
      "Análisis estadístico de biodiversidad",
      "Almacenamiento de datos de campo en la nube",
    ],
  },
  {
    id: "auditorios",
    nombre: "Auditorios",
    descripcion: "Dos auditorios con capacidad para 60 y 120 personas, equipados para videoconferencias y eventos académicos.",
    detalle:
      "Los auditorios del Centro Experimental son el escenario de los principales eventos científicos del IIAP: congresos de biodiversidad, talleres con comunidades, presentación de resultados de investigación y formación de jóvenes investigadores del Chocó Biogeográfico.",
    imagen: "/assets/comunes/YDRAY-IMG_1099.jpeg",
    galeria: [
      "/assets/comunes/YDRAY-IMG_1099.jpeg",
      "/assets/centros/ESPACIOS_AUDIOVISUALES.jpeg",
      "/assets/centros/ESPACIOS_CENTRO.jpeg",
    ],
    cantidad: "2",
    unidad: "Auditorios",
    caracteristicas: [
      "Auditorio principal — 120 personas",
      "Auditorio secundario — 60 personas",
      "Sistema de videoconferencia HD",
      "Cabina de traducción simultánea",
    ],
  },
];

export const bioespacios: Bioespacio[] = [
  {
    id: "sendero",
    nombre: "Sendero Ecológico",
    descripcion: "Madre Agua",
    detalle:
      "Recorrido interpretativo de 260 metros a través de ecosistemas de bosque húmedo tropical. Estación de monitoreo de fauna y flora con puntos de observación científica y educativa.",
    imagen: "/assets/centros/SENDERO.jpeg",
    galeria: [
      "/assets/centros/SENDERO.jpeg",
      "/assets/centros/VIVERO.jpeg",
      "/assets/centros/ESPACIOS_CENTRO.jpeg",
    ],
    extension: "260 metros",
    especies: "Flora y fauna nativa del Chocó",
  },
  {
    id: "vivero-maderable",
    nombre: "Vivero Experimental",
    descripcion: "Especies maderables nativas",
    detalle:
      "Producción y experimentación con especies forestales emblemáticas del Pacífico: choibá (Dipteryx oleifera) y milpesos (Oenocarpus bataua). Centro de propagación para restauración ecológica.",
    imagen: "/assets/centros/VIVERO.jpeg",
    galeria: [
      "/assets/centros/VIVERO.jpeg",
      "/assets/centros/SENDERO.jpeg",
      "/assets/centros/vainilla.jpeg",
    ],
    especies: "Choibá, Milpesos",
  },
  {
    id: "vivero-vainilla",
    nombre: "Vivero Vainilla",
    descripcion: "Cultivo experimental",
    detalle:
      "Espacio de investigación aplicada sobre el cultivo de vainilla (Vanilla planifolia) como alternativa productiva sostenible para comunidades del Chocó Biogeográfico.",
    imagen: "/assets/centros/vainilla.jpeg",
    galeria: [
      "/assets/centros/vainilla.jpeg",
      "/assets/centros/VIVERO.jpeg",
      "/assets/centros/SENDERO.jpeg",
    ],
    especies: "Vanilla planifolia",
  },
  {
    id: "piscitanques",
    nombre: "Piscitanques",
    descripcion: "Acuicultura experimental",
    detalle:
      "Sistema de estanques con geomembranas para investigación en acuicultura de especies nativas. Evalúa alternativas productivas acuícolas adaptadas a las condiciones del Pacífico colombiano.",
    imagen: "/assets/centros/PISCITANQUES.jpeg",
    galeria: [
      "/assets/centros/PISCITANQUES.jpeg",
      "/assets/centros/VIVERO.jpeg",
      "/assets/centros/SENDERO.jpeg",
    ],
  },
  {
    id: "bosque",
    nombre: "Laboratorio Natural de Bosque",
    descripcion: "Ecosistema vivo",
    detalle:
      "Extensión de bosque húmedo tropical que sirve como laboratorio a cielo abierto. Parcelas permanentes de monitoreo de carbono, biodiversidad y dinámica de comunidades vegetales.",
    imagen: "/assets/centros/ESPACIOS_CENTRO.jpeg",
    galeria: [
      "/assets/centros/ESPACIOS_CENTRO.jpeg",
      "/assets/centros/SENDERO.jpeg",
      "/assets/centros/VIVERO.jpeg",
    ],
  },
];
