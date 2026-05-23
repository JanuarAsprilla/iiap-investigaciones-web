# IIAP Investigaciones — Portal Web

Portal web institucional de la **Subdirección de Investigaciones** del [Instituto de Investigaciones Ambientales del Pacífico (IIAP)](https://www.iiap.org.co). Comunica los tres ejes estratégicos de investigación a investigadores, aliados institucionales y comunidades del Chocó Biogeográfico.

---

## Vista general

| Sección | Ruta | Descripción |
|---------|------|-------------|
| Inicio | `/` | Portal editorial con los tres ejes de investigación |
| Planeación | `/planeacion` | PICIA 2023-2026 y objetivos estratégicos |
| Centros | `/centros` | Instalaciones y bioespacios de investigación |
| Grupos | `/grupos` | Grupos de investigación, componentes y proceso científico |

## Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router, React 19)
- **Estilos**: Tailwind CSS v4 + CSS Custom Properties
- **Tipografía**: Bebas Neue (display), Crimson Text (cuerpo), Inter (UI)
- **Lenguaje**: TypeScript 5
- **Deploy**: [Vercel](https://vercel.com)

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

```bash
# Verificar tipos
npx tsc --noEmit

# Lint
npm run lint

# Build de producción
npm run build
```

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              # Inicio / Home
│   ├── layout.tsx            # Root layout + fuentes
│   ├── globals.css           # Design tokens y estilos globales
│   ├── planeacion/
│   │   └── page.tsx          # Sección Planeación
│   ├── centros/
│   │   └── page.tsx          # Sección Centros
│   └── grupos/
│       ├── page.tsx          # Sección Grupos
│       └── _sections/        # Componentes de sección
├── components/
│   ├── layout/SiteNav.tsx    # Navegación fija con efecto frosted glass
│   └── ui/PortalCard3D.tsx   # Tarjeta con hover 3D
├── data/                     # Datos estáticos (TypeScript)
│   ├── centros.ts
│   ├── grupos.ts
│   ├── planificacion.ts
│   └── equipo.ts
├── hooks/                    # Custom hooks
│   ├── useLightTheme.ts
│   └── useScrollReveal.ts
└── lib/
    └── types.ts              # Tipos compartidos
```

## Sistema de diseño

**Paleta — Warm Light / Editorial Science**

| Token | Valor | Uso |
|-------|-------|-----|
| `--forest` | `#1A5C3A` | Verde bosque — primario |
| `--amber` | `#E8960F` | Ámbar — acento |
| `--bg` | `#F4F1EB` | Fondo crema cálido |
| `--surface` | `#FFFFFF` | Tarjetas y superficies |

**Tipografía**
- **Bebas Neue** → Títulos display y sección
- **Crimson Text** → Párrafos y descripciones largas
- **Inter** → UI, labels, navegación

## Despliegue en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJanuarAsprilla%2Fiiap-investigaciones-web)

El proyecto está listo para despliegue zero-config en Vercel. Basta con importar el repositorio y hacer clic en **Deploy**.

## Licencia

Proyecto institucional — Instituto de Investigaciones Ambientales del Pacífico (IIAP) © 2024
