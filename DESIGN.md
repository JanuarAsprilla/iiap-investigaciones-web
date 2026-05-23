# IIAP Investigaciones — Design System

## Color Palette (Warm Light)

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#F4F1EB` | Fondo base crema cálido |
| `--surface` | `#FFFFFF` | Tarjetas y superficies |
| `--forest` | `#1A5C3A` | Verde bosque — primario |
| `--forest-m` | `#2D7A52` | Verde medio — hover states |
| `--forest-d` | `#0D3B24` | Verde oscuro — profundidad |
| `--amber` | `#E8960F` | Ámbar — acento |
| `--text` | `#1A1A1A` | Negro casi puro |
| `--text-muted` | `#5C6B7A` | Gris azulado |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Bebas Neue | H1, section titles, big numbers |
| Body | Crimson Text | Párrafos, descripciones largas |
| UI | Inter | Labels, botones, nav, metadata |

## Type Scale (fluid)
- `--t-xs`: clamp(0.7rem, 0.65rem + 0.2vw, 0.8rem)
- `--t-hero`: clamp(2.8rem, 1.5rem + 4vw, 5.5rem)
- `--t-4xl`: clamp(3.5rem, 2.5rem + 4vw, 6.5rem)

## Elevation / Shadows
- `--sh-sm`: `0 2px 12px rgba(26,92,58,.06)`
- `--sh`: `0 8px 32px rgba(26,92,58,.10)`
- `--sh-lg`: `0 24px 80px rgba(26,92,58,.16)`
- `--sh-amb`: `0 8px 32px rgba(232,150,15,.22)` — ámbar glow

## Motion
- `--ease`: `cubic-bezier(0.16, 1, 0.3, 1)` — expo out
- `--ease-back`: `cubic-bezier(0.34, 1.56, 0.64, 1)` — spring (modal entrances)
- `--dur-fast`: 120ms | `--dur-med`: 280ms | `--dur-slow`: 520ms

## Key Components

### PortalCard3D
Image-based dark card with amber CTA. Hover: translateY(-8px) + brightness increase + amber left stripe.

### Flip Card (ComponentesSection)
5 equal grid. Front: foto + nombre. Back: descripción + líneas temáticas. perspective: 1000px, rotateY(180deg).

### GC Card
Image overlay card. Hover: scale(1.06) + amber top stripe scaleX(1) + CTA reveal.

### Modal (cm-overlay/cm-box)
Grid 2-col (imagen | texto). Animation: cmIn scale(.93)+translateY(16px)→normal with ease-back.

### SiteNav
Fixed. transparent→frosted glass (rgba(244,241,235,0.94) + blur(16px)) on scroll >48px. Breadcrumb shows current section.
