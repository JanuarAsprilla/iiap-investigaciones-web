-- =============================================================================
-- IIAP INVESTIGACIONES — ESQUEMA SQL DE PLANIFICACIÓN
-- Instituto de Investigaciones Ambientales del Pacífico
-- Subdirección de Investigaciones
-- =============================================================================
-- Propósito  : Definir el modelo de datos que gobierna la plataforma web.
--              Este esquema sirve como contrato entre el backend, el CMS
--              futuro y el frontend Next.js.
-- Motor      : PostgreSQL 16+
-- Creado por : JanuarAsprilla — 2026-05-20
-- =============================================================================

-- -----------------------------------------------------------------------------
-- EXTENSIONES
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- búsqueda de texto

-- =============================================================================
-- MÓDULO 1 ─ PLANIFICACIÓN
-- Gestiona los documentos institucionales (POA, PICIA, PISIA, etc.)
-- =============================================================================

CREATE TYPE document_type AS ENUM (
  'POA',       -- Plan Operativo Anual
  'PICIA',     -- Plan Institucional Cuatrienal de Investigación Ambiental
  'PISIA',     -- Plan Indicativo del Sistema de Investigaciones Ambientales
  'INFORME',
  'RESOLUCIÓN',
  'OTRO'
);

CREATE TABLE planning_documents (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           VARCHAR(500)    NOT NULL,
  type            document_type   NOT NULL,
  year            SMALLINT        NOT NULL,
  period_start    DATE,
  period_end      DATE,
  description     TEXT,
  file_url        VARCHAR(1000)   NOT NULL,   -- URL del archivo en almacenamiento
  thumbnail_url   VARCHAR(1000),
  published_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active       BOOLEAN         DEFAULT TRUE,
  sort_order      SMALLINT        DEFAULT 0,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Datos iniciales de planificación
INSERT INTO planning_documents (title, type, year, period_start, period_end, file_url, published_at) VALUES
(
  'Plan Institucional Cuatrienal de Investigación Ambiental 2023-2026',
  'PICIA', 2023,
  '2023-01-01', '2026-12-31',
  'https://iiap.org.co/files/9d7802655d4a0d39dbf70ce51af27673',
  '2025-08-20'
),
(
  'Plan Operativo Anual 2025',
  'POA', 2025,
  '2025-01-01', '2025-12-31',
  'https://iiap.org.co/files/9146c816aee24b8b0ac670f147aeff46',
  '2025-08-20'
);

-- =============================================================================
-- MÓDULO 2 ─ CENTROS DE INVESTIGACIÓN
-- Infraestructura física, bioespacios y equipamiento
-- =============================================================================

CREATE TABLE research_centers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            VARCHAR(500)    NOT NULL,
  slug            VARCHAR(200)    UNIQUE NOT NULL,
  description     TEXT,
  short_bio       VARCHAR(300),              -- Para cards y previews
  location_lat    DECIMAL(10, 7),
  location_lng    DECIMAL(10, 7),
  address         TEXT,
  contact_hours   VARCHAR(255),
  hero_image_url  VARCHAR(1000),
  hero_video_url  VARCHAR(1000),
  is_active       BOOLEAN         DEFAULT TRUE,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO research_centers (
  name, slug, description, short_bio,
  location_lat, location_lng, address, contact_hours,
  hero_image_url, hero_video_url
) VALUES (
  'Centro Experimental de Investigaciones Ambientales del Pacífico',
  'centro-experimental',
  'Sede técnica del IIAP ubicada a 18 km al sur de Quibdó, en el ingreso a la comunidad Doña Josefa (Atrato). Concentra los laboratorios, bioespacios y espacios colaborativos del instituto.',
  'Sede técnica con 18km de naturaleza al sur de Quibdó',
  5.5717000, -76.6269000,
  '18 km al sur de Quibdó — ingreso comunidad Doña Josefa, Atrato, Chocó',
  'Lunes a Viernes: 9:00 AM – 3:00 PM (jornada continua)',
  '/assets/centros/YDRAY-IMG_1099.jpeg',
  '/assets/centros/202512051539.mp4'
);

-- Tipologías de espacio físico
CREATE TYPE facility_type AS ENUM (
  'OFICINA',
  'SALA_COLABORATIVA',
  'CENTRO_DOCUMENTACION',
  'LABORATORIO_DATOS',
  'AUDITORIO',
  'SALA_AUDIOVISUAL',
  'OTRO'
);

CREATE TABLE facilities (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id       UUID            REFERENCES research_centers(id) ON DELETE CASCADE,
  name            VARCHAR(500)    NOT NULL,
  type            facility_type   NOT NULL,
  capacity        SMALLINT,
  description     TEXT,
  features        TEXT[],                    -- Ej. ['WiFi de alta velocidad', 'Pizarras interactivas']
  image_url       VARCHAR(1000),
  sort_order      SMALLINT        DEFAULT 0,
  is_active       BOOLEAN         DEFAULT TRUE
);

-- Bioespacios (exterior / natural)
CREATE TYPE bioespace_type AS ENUM (
  'SENDERO',
  'VIVERO',
  'VIVERO_ESPECIALIZADO',
  'PISCITANQUE',
  'BOSQUE_LABORATORIO',
  'OTRO'
);

CREATE TABLE bioespaces (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id       UUID            REFERENCES research_centers(id) ON DELETE CASCADE,
  name            VARCHAR(500)    NOT NULL,
  slug            VARCHAR(200)    UNIQUE NOT NULL,
  type            bioespace_type  NOT NULL,
  description     TEXT,
  short_bio       VARCHAR(300),
  area_m2         DECIMAL(10, 2),
  image_url       VARCHAR(1000),
  extra_data      JSONB,                     -- datos específicos (ej. {longitud_m: 260, especies: [...]})
  sort_order      SMALLINT        DEFAULT 0,
  is_active       BOOLEAN         DEFAULT TRUE
);

-- Datos iniciales de bioespacios
INSERT INTO bioespaces (center_id, name, slug, type, description, short_bio, image_url, sort_order, extra_data)
SELECT
  rc.id,
  b.name, b.slug, b.type::bioespace_type, b.description, b.short_bio, b.image_url, b.sort_order, b.extra_data::JSONB
FROM research_centers rc
CROSS JOIN (VALUES
  ('Sendero Ecológico Madre Agua',        'sendero-madre-agua',       'SENDERO',
   'Sendero de 260 metros que integra investigación en selva lluviosa con el conocimiento comunitario. Punto de conexión entre ciencia y territorio.',
   'Selva lluviosa, 260 m de saberes vivos', '/assets/centros/SENDERO.jpeg', 1,
   '{"longitud_m": 260, "tipo": "interpretativo"}'
  ),
  ('Vivero Experimental',                 'vivero-experimental',      'VIVERO',
   'Sistema de propagación de especies nativas del Chocó Biogeográfico, incluyendo choibá y milpesos para restauración forestal.',
   'Propagación de especies nativas del Chocó', '/assets/centros/VIVERO.jpeg', 2,
   '{"especies_clave": ["choibá", "milpesos"]}'
  ),
  ('Vivero Vainilla',                     'vivero-vainilla',          'VIVERO_ESPECIALIZADO',
   'Cultivo especializado de orquídea Vanilla planifolia con sistemas de control de humedad y temperatura. Investigación de bioeconomía regional.',
   'Orquídea vainilla con control climático', '/assets/centros/vainilla.jpeg', 3,
   '{"especie": "Vanilla planifolia", "control_humedad": true}'
  ),
  ('Piscitanques Nativos',                'piscitanques',             'PISCITANQUE',
   'Sistema de acuicultura de peces nativos del Chocó mediante tanques de geomembrana. Investigación para seguridad alimentaria comunitaria.',
   'Acuicultura nativa para seguridad alimentaria', '/assets/centros/PISCITANQUES.jpeg', 4,
   '{"tecnologia": "geomembrana", "especies_nativas": true}'
  )
) AS b(name, slug, type, description, short_bio, image_url, sort_order, extra_data);

-- =============================================================================
-- MÓDULO 3 ─ GRUPOS DE INVESTIGACIÓN
-- =============================================================================

CREATE TABLE research_groups (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            VARCHAR(20)     UNIQUE NOT NULL,  -- GI-01, GI-02, GAMA, etc.
  name            VARCHAR(500)    NOT NULL,
  slug            VARCHAR(200)    UNIQUE NOT NULL,
  description     TEXT,
  short_bio       VARCHAR(300),
  focus_area      VARCHAR(255),
  image_url       VARCHAR(1000),
  classification  VARCHAR(100),                     -- Minciencias: A, A+, B, C
  registration_id VARCHAR(100),                     -- ID en GrupLAC
  is_active       BOOLEAN         DEFAULT TRUE,
  sort_order      SMALLINT        DEFAULT 0,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO research_groups (code, name, slug, short_bio, sort_order) VALUES
('GI-01', 'Investigación Participativa con Comunidades Locales', 'investigacion-participativa',
 'Saberes comunitarios y gobernanza territorial', 1),
('GI-02', 'Restauración y Manejo de Hábitats',                  'restauracion-habitats',
 'Restauración ecológica del Chocó Biogeográfico', 2),
('GAMA',  'Geoinformática Aplicada al Medio Ambiente',           'gama',
 'SIG, teledetección y análisis espacial ambiental', 3),
('GI-04', 'Comunidades Étnicas y Saberes del Chocó Biogeográfico', 'comunidades-etnicas',
 'Etnobiología y conocimiento tradicional', 4);

-- Componentes / Programas temáticos
CREATE TYPE component_type AS ENUM (
  'SOCIOCULTURAL',
  'AMBIENTAL',
  'PRODUCTIVO',
  'ECOSISTEMICO',
  'LABORATORIO_DATOS'
);

CREATE TABLE programs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            VARCHAR(255)    NOT NULL,
  slug            VARCHAR(100)    UNIQUE NOT NULL,
  type            component_type  NOT NULL,
  description     TEXT,
  objectives      TEXT[],
  image_url       VARCHAR(1000),
  sort_order      SMALLINT        DEFAULT 0
);

INSERT INTO programs (name, slug, type, description, sort_order) VALUES
('Componente Sociocultural',      'sociocultural',    'SOCIOCULTURAL',
 'Investigación con comunidades, saberes tradicionales y gobernanza territorial', 1),
('Componente Ambiental',          'ambiental',        'AMBIENTAL',
 'Monitoreo de calidad ambiental, cambio climático y gestión de riesgos', 2),
('Componente Productivo',         'productivo',       'PRODUCTIVO',
 'Sistemas productivos sostenibles, bioeconomía y desarrollo rural alternativo', 3),
('Componente Ecosistémico',       'ecosistemico',     'ECOSISTEMICO',
 'Biodiversidad, restauración ecológica y conservación', 4),
('Laboratorio de Datos',          'laboratorio-datos','LABORATORIO_DATOS',
 'SIG, geoinformática y análisis espacial para toma de decisiones', 5);

-- =============================================================================
-- MÓDULO 4 ─ INVESTIGADORES
-- =============================================================================

CREATE TYPE researcher_role AS ENUM (
  'DIRECTOR_GENERAL',
  'SUBDIRECTOR_INVESTIGACION',
  'COORDINADOR_COMPONENTE',
  'INVESTIGADOR',
  'INVESTIGADOR_JUNIOR',
  'ASISTENTE'
);

CREATE TABLE researchers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name       VARCHAR(255)    NOT NULL,
  role            researcher_role NOT NULL,
  component       component_type,
  email           VARCHAR(255),
  bio             TEXT,
  image_url       VARCHAR(500),
  orcid           VARCHAR(50),
  cvlac_url       VARCHAR(500),
  is_active       BOOLEAN         DEFAULT TRUE,
  sort_order      SMALLINT        DEFAULT 0,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Directivos y coordinadores (datos reales de los repos)
INSERT INTO researchers (full_name, role, image_url, sort_order) VALUES
('William Klinger Brahan',        'DIRECTOR_GENERAL',          '/assets/grupos/DIRECTOR.jpeg',     1),
('Giovanny Ramirez',              'SUBDIRECTOR_INVESTIGACION', '/assets/grupos/SUBDIRECTOR.jpeg',  2),
('Carlos Ariel Rentería Jiménez', 'COORDINADOR_COMPONENTE',   '/assets/grupos/CARLOS_ARIEL.jpeg', 3),
('Lady Yulenis Vargas Porras',    'COORDINADOR_COMPONENTE',   '/assets/grupos/LADY_VARGAS.png',   4),
('Moisés Mosquera Blandón',       'COORDINADOR_COMPONENTE',   '/assets/grupos/MOISES.jpeg',       5),
('Zulmary Valoyez Cardozo',       'COORDINADOR_COMPONENTE',   '/assets/grupos/ZULMARY.jpeg',      6),
('Edsson Nagle Ramírez',          'COORDINADOR_COMPONENTE',   '/assets/grupos/EDSSON_NAGLE.jpeg', 7);

-- Asociación investigador ↔ programa
CREATE TABLE researcher_programs (
  researcher_id   UUID            REFERENCES researchers(id)  ON DELETE CASCADE,
  program_id      UUID            REFERENCES programs(id)     ON DELETE CASCADE,
  role_in_program VARCHAR(255),
  is_coordinator  BOOLEAN         DEFAULT FALSE,
  PRIMARY KEY (researcher_id, program_id)
);

-- Asociación investigador ↔ grupo
CREATE TABLE researcher_groups (
  researcher_id   UUID            REFERENCES researchers(id)       ON DELETE CASCADE,
  group_id        UUID            REFERENCES research_groups(id)   ON DELETE CASCADE,
  role_in_group   VARCHAR(255),
  PRIMARY KEY (researcher_id, group_id)
);

-- =============================================================================
-- MÓDULO 5 ─ SEGURIDAD Y AUDITORÍA
-- =============================================================================

CREATE TABLE audit_log (
  id              BIGSERIAL       PRIMARY KEY,
  table_name      VARCHAR(100)    NOT NULL,
  record_id       UUID            NOT NULL,
  action          VARCHAR(20)     NOT NULL CHECK (action IN ('INSERT','UPDATE','DELETE')),
  changed_by      VARCHAR(255),
  changed_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  old_data        JSONB,
  new_data        JSONB
);

CREATE TABLE rate_limit_events (
  id              BIGSERIAL       PRIMARY KEY,
  ip_address      INET            NOT NULL,
  endpoint        VARCHAR(500)    NOT NULL,
  requests_count  SMALLINT        NOT NULL,
  window_start    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked         BOOLEAN         DEFAULT FALSE
);

-- =============================================================================
-- ÍNDICES DE RENDIMIENTO
-- =============================================================================

CREATE INDEX idx_docs_type_year       ON planning_documents  (type, year DESC);
CREATE INDEX idx_docs_active          ON planning_documents  (is_active) WHERE is_active = TRUE;
CREATE INDEX idx_facilities_center    ON facilities          (center_id, type);
CREATE INDEX idx_bioespaces_center    ON bioespaces          (center_id, sort_order);
CREATE INDEX idx_groups_active        ON research_groups     (is_active, sort_order);
CREATE INDEX idx_researchers_role     ON researchers         (role, is_active);
CREATE INDEX idx_audit_table_record   ON audit_log           (table_name, record_id, changed_at DESC);
CREATE INDEX idx_rate_limit_ip        ON rate_limit_events   (ip_address, window_start DESC);

-- Búsqueda full-text (trigramas)
CREATE INDEX idx_groups_name_trgm     ON research_groups     USING gin (name gin_trgm_ops);
CREATE INDEX idx_researchers_name_trgm ON researchers         USING gin (full_name gin_trgm_ops);
CREATE INDEX idx_docs_title_trgm      ON planning_documents  USING gin (title gin_trgm_ops);

-- =============================================================================
-- TRIGGER — updated_at automático
-- =============================================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_docs_updated
  BEFORE UPDATE ON planning_documents
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- VISTAS ÚTILES PARA EL FRONTEND
-- =============================================================================

-- Vista: documentos activos ordenados para la sección Planificación
CREATE VIEW v_active_documents AS
SELECT
  id, title, type, year, period_start, period_end,
  description, file_url, thumbnail_url, published_at
FROM planning_documents
WHERE is_active = TRUE
ORDER BY year DESC, sort_order;

-- Vista: grupos con conteo de investigadores
CREATE VIEW v_groups_summary AS
SELECT
  g.id, g.code, g.name, g.slug, g.short_bio, g.image_url,
  COUNT(rg.researcher_id) AS member_count
FROM research_groups g
LEFT JOIN researcher_groups rg ON rg.group_id = g.id
WHERE g.is_active = TRUE
GROUP BY g.id
ORDER BY g.sort_order;

-- Vista: estructura jerárquica del equipo
CREATE VIEW v_team_hierarchy AS
SELECT
  r.id, r.full_name, r.role, r.component,
  r.image_url, r.email,
  p.name AS program_name
FROM researchers r
LEFT JOIN researcher_programs rp ON rp.researcher_id = r.id AND rp.is_coordinator = TRUE
LEFT JOIN programs p ON p.id = rp.program_id
WHERE r.is_active = TRUE
ORDER BY
  CASE r.role
    WHEN 'DIRECTOR_GENERAL'         THEN 1
    WHEN 'SUBDIRECTOR_INVESTIGACION' THEN 2
    WHEN 'COORDINADOR_COMPONENTE'   THEN 3
    WHEN 'INVESTIGADOR'             THEN 4
    WHEN 'INVESTIGADOR_JUNIOR'      THEN 5
    ELSE 6
  END, r.sort_order;

-- =============================================================================
-- RESUMEN DEL MODELO
-- =============================================================================
--
--  planning_documents          → POA / PICIA / PISIA y futuros docs
--  research_centers            → Sede Técnica (y futuros centros)
--    └── facilities            → Oficinas, labs, auditorios
--    └── bioespaces            → Sendero, viveros, piscitanques
--  research_groups             → GI-01, GI-02, GAMA, GI-04
--  programs                    → 5 componentes temáticos
--  researchers                 → Equipo humano con roles
--    └── researcher_programs   → investigador ↔ componente
--    └── researcher_groups     → investigador ↔ grupo
--  audit_log                   → Trazabilidad de cambios (seguridad)
--  rate_limit_events           → Control de abuso de API (seguridad)
--
-- =============================================================================
