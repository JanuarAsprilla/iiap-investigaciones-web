// ─────────────────────────────────────────────
//  IIAP Investigaciones — Tipos globales
// ─────────────────────────────────────────────

export interface DocumentoPlanificacion {
  id: string;
  titulo: string;
  subtitulo: string;
  anio: string;
  descripcion: string;
  url: string;
  fechaPublicacion: string;
  tipo: "PICIA" | "POA" | "PENIA" | "PEDI" | "INFORME" | "RESOLUCIÓN";
  icono: string;
}

export interface Bioespacio {
  id: string;
  nombre: string;
  descripcion: string;
  detalle: string;
  imagen: string;
  galeria?: string[];
  extension?: string;
  especies?: string;
}

export interface InstalacionCentro {
  id: string;
  nombre: string;
  descripcion: string;
  detalle?: string;
  imagen: string;
  galeria?: string[];
  cantidad?: string;
  unidad?: string;
  caracteristicas?: string[];
}

export type ComponenteType =
  | "SOCIOCULTURAL"
  | "AMBIENTAL"
  | "PRODUCTIVO"
  | "ECOSISTEMICO"
  | "LABORATORIO"
  | "INSTITUCIONAL"
  | "TALENTO HUMANO"
  | "AUDIOVISUAL"
  | "INVESTIGACIÓN"
  | "RECONOCIMIENTO"
  | "COMUNIDAD DIGITAL";

export interface ComponenteInvestigacion {
  id: string;
  nombre: string;
  tipo: ComponenteType;
  descripcion: string;
  lineas: string[];
  imagen: string;
  color: string;
}

export interface GrupoInvestigacion {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  lineasTematicas: string[];
  coordinador: string;
  imagen?: string;
  galeria?: string[];
}

export type RolInvestigador =
  | "director"
  | "subdirector"
  | "coordinador"
  | "gestor"
  | "investigador"
  | "auxiliar";

export interface Investigador {
  id: string;
  nombre: string;
  apellido: string;
  rol: RolInvestigador;
  cargo: string;
  componente?: ComponenteType;
  grupo?: string;
  imagen?: string;
  orcid?: string;
  cvlac?: string;
  especialidad?: string;
  bio?: string;
  areas?: string[];
  logros?: string[];
}

export interface EstadisticaIIAP {
  valor: string;
  label: string;
  descripcion?: string;
}
