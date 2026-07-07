import type { Bioespacio, InstalacionCentro } from "@/lib/types";

export const infoCentro = {
  nombre: "Centro Experimental IIAP",
  ubicacion: "18 km al sur de Quibdó, comunidad Doña Josefa (Atrato)",
  coordenadas: { lat: 5.5717, lng: -76.6269 },
  horario: "Lunes a viernes, 9:00 AM – 3:00 PM",
  descripcion:
    "El Centro de investigación del Chocó Biogeográfico. Es un espacio estratégico para el estudio de diversas líneas, como productivas, ambientales o ecosistémicas, cuenta con infraestructura científica certificada, bioespacios de investigación y espacios colaborativos para la comunidad investigadora.",
};

export const instalaciones: InstalacionCentro[] = [
  {
    id: "documentacion",
    nombre: "Centro de Documentación",
    descripcion: "Repositorio físico y digital de investigaciones, publicaciones científicas y material de referencia.",
    detalle:
      "El Centro de Documentación custodia el patrimonio intelectual del IIAP: más de 3.000 publicaciones físicas, acceso a bases de datos científicas indexadas (Scopus, Web of Science), repositorio digital institucional y sala de consulta para investigadores y estudiantes.",
    imagen: "/assets/instalaciones/documentacion/documentacion-1.webp",
    galeria: [
      "/assets/instalaciones/documentacion/documentacion-1.webp",
      "/assets/instalaciones/documentacion/documentacion-2.webp",
      "/assets/instalaciones/documentacion/documentacion-4.webp",
      "/assets/instalaciones/documentacion/documentacion-3.webp",
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
    nombre: "Laboratorio de Datos",
    descripcion: "Infraestructura de cómputo de alta performance para análisis geoespacial, modelado ambiental y procesamiento de datos científicos.",
    detalle:
      "El Laboratorio de Datos del IIAP es la columna vertebral del análisis de datos científicos del Pacífico colombiano. Procesa grandes volúmenes de información satelital, datos de biodiversidad y modelos climáticos para apoyar la toma de decisiones ambientales.",
    imagen: "/assets/instalaciones/laboratorio-datos/laboratorio-datos-1.webp",
    galeria: [
      "/assets/instalaciones/laboratorio-datos/laboratorio-datos-1.webp",
      "/assets/instalaciones/laboratorio-datos/laboratorio-datos-2.webp",
      "/assets/instalaciones/laboratorio-datos/laboratorio-datos-3.webp",
    ],
    caracteristicas: [
      "Procesamiento geoespacial con QGIS y ArcGIS",
      "Modelado ambiental y climático",
      "Análisis estadístico de biodiversidad",
      "Almacenamiento de datos de campo en la nube",
    ],
  },
  {
    id: "lab-robinson",
    nombre: "Laboratorio de Robinsón",
    descripcion:
      "Laboratorio especializado del Centro de Investigación del Chocó Biogeográfico. Descripción oficial en actualización.",
    imagen: "/assets/instalaciones/lab-robinson/lab-robinson-3.webp",
    galeria: [
      "/assets/instalaciones/lab-robinson/lab-robinson-3.webp",
      "/assets/instalaciones/lab-robinson/lab-robinson-11.webp",
      "/assets/instalaciones/lab-robinson/lab-robinson-8.webp",
      "/assets/instalaciones/lab-robinson/lab-robinson-5.webp",
      "/assets/instalaciones/lab-robinson/lab-robinson-7.webp",
      "/assets/instalaciones/lab-robinson/lab-robinson-4.webp",
    ],
  },
  {
    id: "lab-erick",
    nombre: "Laboratorio de Erick",
    descripcion:
      "Laboratorio especializado del Centro de Investigación del Chocó Biogeográfico. Descripción oficial en actualización.",
    imagen: "/assets/grupos/laboratorio-datos.webp",
    galeria: [
      "/assets/grupos/laboratorio-datos.webp",
      "/assets/centros/laboratorio.webp",
      "/assets/centros/espacios-centro.webp",
    ],
  },
  {
    id: "lab-mirla",
    nombre: "Laboratorio Mirla",
    descripcion:
      "Laboratorio especializado del Centro de Investigación del Chocó Biogeográfico. Descripción oficial en actualización.",
    imagen: "/assets/centros/espacios-centro.webp",
    galeria: [
      "/assets/centros/espacios-centro.webp",
      "/assets/centros/laboratorio.webp",
      "/assets/grupos/laboratorio-datos.webp",
    ],
  },
  {
    id: "lab-luisjavier",
    nombre: "Laboratorio Luis Javier",
    descripcion:
      "Laboratorio especializado del Centro de Investigación del Chocó Biogeográfico. Descripción oficial en actualización.",
    imagen: "/assets/centros/laboratorio.webp",
    galeria: [
      "/assets/centros/laboratorio.webp",
      "/assets/centros/espacios-centro.webp",
      "/assets/grupos/laboratorio-datos.webp",
    ],
  },
  {
    id: "auditorios",
    nombre: "Auditorios",
    descripcion: "Dos auditorios con capacidad para 60 y 120 personas, equipados para videoconferencias y eventos académicos.",
    detalle:
      "Los auditorios del Centro Experimental son el escenario de los principales eventos científicos del IIAP: congresos de biodiversidad, talleres con comunidades, presentación de resultados de investigación y formación de jóvenes investigadores del Chocó Biogeográfico.",
    imagen: "/assets/instalaciones/auditorios/auditorios-1.webp",
    galeria: [
      "/assets/instalaciones/auditorios/auditorios-1.webp",
      "/assets/instalaciones/auditorios/auditorios-2.webp",
      "/assets/instalaciones/auditorios/auditorios-3.webp",
      "/assets/instalaciones/auditorios/auditorios-4.webp",
      "/assets/instalaciones/auditorios/auditorios-5.webp",
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
  {
    id: "salas",
    nombre: "Salas Colaborativas",
    descripcion: "Espacios de trabajo en equipo con capacidad para 10 personas cada una.",
    detalle:
      "Las salas colaborativas están concebidas para el trabajo interdisciplinario y la co-creación científica. Equipadas con pantallas interactivas, pizarras de vidrio y mobiliario flexible que se adapta a reuniones de trabajo, talleres participativos y sesiones de diseño de proyectos.",
    imagen: "/assets/instalaciones/salas/salas-2.webp",
    galeria: [
      "/assets/instalaciones/salas/salas-2.webp",
      "/assets/instalaciones/salas/salas-3.webp",
      "/assets/instalaciones/salas/salas-4.webp",
      "/assets/instalaciones/salas/salas-5.webp",
      "/assets/instalaciones/salas/salas-6.webp",
      "/assets/instalaciones/salas/salas-1.webp",
      "/assets/instalaciones/salas/salas-7.webp",
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
    id: "oficinas",
    nombre: "Oficinas Individuales",
    descripcion: "Espacios privados de trabajo equipados para investigadores residentes y visitantes.",
    detalle:
      "Cada oficina individual está diseñada para el trabajo científico de alta concentración. Cuentan con escritorio amplio, estantería modular, conexión de red de alta velocidad y condiciones de climatización estable para el manejo de equipos de cómputo y muestras biológicas.",
    imagen: "/assets/centros/espacios-centro.webp",
    galeria: [
      "/assets/centros/espacios-centro.webp",
      "/assets/centros/espacios-audiovisuales.webp",
      "/assets/centros/laboratorio.webp",
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
];

export const bioespacios: Bioespacio[] = [
  {
    id: "sendero",
    nombre: "Sendero Ecológico",
    descripcion: "Madre Agua",
    detalle:
      "Recorrido interpretativo de 260 metros a través de ecosistemas de bosque húmedo tropical. Estación de monitoreo de fauna y flora con puntos de observación científica y educativa.",
    imagen: "/assets/bioespacios/sendero/sendero-1.webp",
    galeria: [
      "/assets/bioespacios/sendero/sendero-1.webp",
      "/assets/videos/sendero-1.mp4",
      "/assets/videos/sendero-2.mp4",
      "/assets/videos/sendero-3.mp4",
      "/assets/bioespacios/sendero/sendero-2.webp",
      "/assets/bioespacios/sendero/sendero-3.webp",
      "/assets/bioespacios/sendero/sendero-4.webp",
      "/assets/bioespacios/sendero/sendero-5.webp",
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
    imagen: "/assets/bioespacios/vivero-experimental/vivero-experimental-1.webp",
    galeria: [
      "/assets/bioespacios/vivero-experimental/vivero-experimental-1.webp",
      "/assets/videos/vivero-experimental-1.mp4",
      "/assets/videos/vivero-experimental-2.mp4",
      "/assets/videos/vivero-experimental-3.mp4",
      "/assets/bioespacios/vivero-experimental/vivero-experimental-2.webp",
      "/assets/bioespacios/vivero-experimental/vivero-experimental-3.webp",
      "/assets/bioespacios/vivero-experimental/vivero-experimental-4.webp",
      "/assets/bioespacios/vivero-experimental/vivero-experimental-5.webp",
    ],
    especies: "Choibá, Milpesos",
  },
  {
    id: "vivero-vainilla",
    nombre: "Vivero Vainilla",
    descripcion: "Cultivo experimental",
    detalle:
      "Espacio de investigación aplicada sobre el cultivo de vainilla (Vanilla planifolia) como alternativa productiva sostenible para comunidades del Chocó Biogeográfico.",
    imagen: "/assets/bioespacios/vivero-vainilla/vivero-vainilla-1.webp",
    galeria: [
      "/assets/bioespacios/vivero-vainilla/vivero-vainilla-1.webp",
      "/assets/videos/vivero-vainilla-1.mp4",
      "/assets/videos/vivero-vainilla-2.mp4",
      "/assets/videos/vivero-vainilla-3.mp4",
      "/assets/videos/vivero-vainilla-4.mp4",
      "/assets/videos/vivero-vainilla-5.mp4",
      "/assets/bioespacios/vivero-vainilla/vivero-vainilla-2.webp",
      "/assets/bioespacios/vivero-vainilla/vivero-vainilla-3.webp",
    ],
    especies: "Vanilla planifolia",
  },
  {
    id: "piscitanques",
    nombre: "Piscitanques",
    descripcion: "Acuicultura experimental",
    detalle:
      "Sistema de estanques con geomembranas para investigación en acuicultura de especies nativas. Evalúa alternativas productivas acuícolas adaptadas a las condiciones del Pacífico colombiano.",
    imagen: "/assets/bioespacios/piscitanques/piscitanques-1.webp",
    galeria: [
      "/assets/bioespacios/piscitanques/piscitanques-1.webp",
      "/assets/videos/piscitanques-1.mp4",
      "/assets/bioespacios/piscitanques/piscitanques-2.webp",
      "/assets/bioespacios/piscitanques/piscitanques-3.webp",
      "/assets/bioespacios/piscitanques/piscitanques-4.webp",
    ],
  },
  {
    id: "bosque",
    nombre: "Laboratorio Natural de Bosque",
    descripcion: "Ecosistema vivo",
    detalle:
      "Extensión de bosque húmedo tropical que sirve como laboratorio a cielo abierto. Parcelas permanentes de monitoreo de carbono, biodiversidad y dinámica de comunidades vegetales.",
    imagen: "/assets/bioespacios/laboratorio-bosque/laboratorio-bosque-1.webp",
    galeria: [
      "/assets/bioespacios/laboratorio-bosque/laboratorio-bosque-1.webp",
      "/assets/bioespacios/laboratorio-bosque/laboratorio-bosque-2.webp",
      "/assets/bioespacios/laboratorio-bosque/laboratorio-bosque-3.webp",
    ],
  },
];
