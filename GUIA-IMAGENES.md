# Guía para cambiar las imágenes del sitio

Esta guía te dice **dónde está cada foto** del sitio y **qué archivo abrir** para cambiarla tú mismo.

---

## 1. Reglas básicas (aplican a TODO el sitio)

1. **Las fotos viven en la carpeta `public/assets/`**, organizadas por tema:

   | Carpeta | Qué contiene |
   |---|---|
   | `public/assets/centros/` | Fotos del Centro Experimental (sede, sendero, vivero, laboratorio…) |
   | `public/assets/instalaciones/` | Fotos reales de instalaciones, por espacio (`documentacion/`, `laboratorio-datos/`, `lab-robinson/`, `auditorios/`, `salas/`) |
   | `public/assets/grupos/` | Fotos de componentes y grupos de investigación |
   | `public/assets/investigadores/` | Retratos del equipo |
   | `public/assets/comunes/` | Imágenes compartidas (sede aérea, diagramas, portadas) |
   | `public/assets/documentos/` | PDFs (PICIA, PENIA, PEDI…) |

2. **En el código la ruta se escribe SIN `public`.**
   Un archivo en `public/assets/centros/sede.webp` se referencia como:
   ```
   /assets/centros/sede.webp
   ```

3. **Para poner una foto nueva:**
   - Copia tu foto dentro de la carpeta que corresponda.
   - Nómbrala en minúsculas, con guiones, sin acentos ni espacios. Ej: `sala-reuniones-1.webp`.
   - Ideal en formato **`.webp`** (más liviano). Si tu foto es `.jpg`/`.png`/`.HEIC`, conviértela antes en https://squoosh.app (arrastra la foto → “WebP” → descarga). *(O me pasas las fotos y las convierto yo en lote, como hicimos antes.)*
   - Abre el archivo indicado abajo y reemplaza la ruta vieja por la tuya.
   - Guarda. Con `npm run dev` corriendo, el cambio se ve al instante.

4. **Proporción (aspect ratio):** casi todas las fotos se recortan automáticamente para llenar el espacio (`object-fit: cover`), así que cualquier proporción sirve.
   - Retratos del equipo → se ven mejor **verticales**.
   - Fotos de lugares (hero, tarjetas) → se ven mejor **horizontales/apaisadas**.

> ⚠️ **No renombres `public/assets/logo-iiap.png`**: lo usan el ícono de la app y las vistas previas al compartir.

> 💡 Los números de línea son **aproximados** (pueden moverse un poco). Búscate la ruta `/assets/...` dentro del archivo indicado.

---

## 2. Página por página

### 🏠 Inicio (`/`) → archivo `src/app/page.tsx`

- **Foto grande del encabezado (derecha):** busca `className="hero-frame-img"` (aprox. línea 77) y cambia su `src`.
- **Las 4 tarjetas “Cuatro ejes estratégicos”:** arriba del archivo, lista `portalSections` (aprox. líneas 4–33). Cada tarjeta tiene un campo `imageSrc`:
  - `Planeación` → `imageSrc` (línea ~10)
  - `Centros de Investigación` → `imageSrc` (línea ~17)
  - `Componentes` → `imageSrc` (línea ~24)
  - `Grupos de Investigación` → `imageSrc` (línea ~31)

---

### 🏢 Centros (`/centros`)

**Encabezado (carrusel de fondo):** archivo `src/app/centros/page.tsx`, lista `heroBgs` (aprox. líneas 161–166).

**“Instalaciones del Centro” y “Bioespacios”:** archivo de datos **`src/data/centros.ts`**.
- Lista `instalaciones`: cada espacio tiene
  - `imagen:` → la foto que se ve en la **tarjeta**.
  - `galeria:` → lista de fotos que se ven en el **modal** al hacer clic (el carrusel).
  - Espacios disponibles (`id`): `documentacion`, `laboratorio` (Laboratorio de Datos), `lab-robinson`, `lab-erick`, `lab-mirla`, `lab-luisjavier`, `auditorios`, `salas`, `oficinas`.
- Lista `bioespacios` (igual estructura, `imagen` + `galeria`): `sendero`, `vivero-maderable`, `vivero-vainilla`, `piscitanques`, `bosque`.

Ejemplo (cambiar la foto principal y la galería de las Salas):
```ts
imagen: "/assets/instalaciones/salas/salas-2.webp",
galeria: [
  "/assets/instalaciones/salas/salas-2.webp",
  "/assets/instalaciones/salas/salas-3.webp",
],
```

---

### 🧩 Componentes (`/componentes`)

- **Encabezado (carrusel):** `src/app/componentes/page.tsx`, lista `heroBgs` (aprox. líneas 12–17).
- **Tarjetas de los 4 componentes:** datos en **`src/data/grupos.ts`**, lista `componentesInvestigacion`. Cambia el campo `imagen:` de cada uno (`sociocultural`, `ambiental`, `productivo`, `ecosistemico`, `laboratorio-datos`).
- **Fotos del Equipo de Investigación (retratos):** datos en **`src/data/equipo.ts`**, lista `equipo`. Cada persona tiene `imagen: "/assets/investigadores/<nombre>.webp"`.
  - Para **cambiar** un retrato: reemplaza esa ruta.
  - Para **agregar** una persona: copia un bloque `{ ... }` completo, pega debajo y ajusta `id`, `nombre`, `imagen`, etc.

---

### 👥 Grupos (`/grupos`)

- **Encabezado (carrusel):** `src/app/grupos/page.tsx`, lista `heroBgs` (aprox. líneas 9–14).
- **Tarjetas de grupos (grid):** archivo `src/app/grupos/_sections/GruposSection.tsx`, mapa `grupoImages` (aprox. líneas 8–14). Cada grupo se identifica por su `id` (`gi-01`, `gi-02`, `gama`, `gi-04`, `gi-05`).
- **“Proceso de Investigación” (línea de tiempo):** archivo `src/app/grupos/_sections/TimelineSection.tsx`, lista `pasos`. Cada paso tiene un campo `img:` (5 pasos, aprox. líneas 27, 36, 45, 54, 63).

---

### 📋 Planeación (`/planeacion`) → archivo `src/app/planeacion/page.tsx`

- **Encabezado (carrusel):** lista `heroBgs` (aprox. líneas 8–11).
- **Diagrama “Estructura Programática”:** busca `diagrama-picia.webp` (aparece 2 veces, líneas ~56 y ~481).
- **Portada del PICIA:** busca `picia-2023-2026.webp` (línea ~248).
- **Documentos PDF (PICIA/POA/PENIA/PEDI):** datos en **`src/data/planificacion.ts`**, campo `url:` de cada uno → `/assets/documentos/*.pdf`.

---

### 📰 Actualidades (`/actualidades`)

- **Encabezado (carrusel):** archivo `src/app/actualidades/ActualizacionesClient.tsx`, lista `heroBgs` (aprox. líneas 7–12).
- **Las noticias NO se editan aquí.** Se administran desde el **gestor de contenidos (Sanity)**: allí subes el título, texto e **imagen de cada noticia**. No van en `public/assets/`.

---

## 3. Resumen ultra-rápido

| Quiero cambiar… | Abro este archivo |
|---|---|
| Foto grande del inicio + 4 tarjetas | `src/app/page.tsx` |
| Instalaciones y bioespacios del Centro | `src/data/centros.ts` |
| Fondo del encabezado de Centros | `src/app/centros/page.tsx` |
| Los 4 componentes | `src/data/grupos.ts` |
| Retratos del equipo | `src/data/equipo.ts` |
| Tarjetas de grupos | `src/app/grupos/_sections/GruposSection.tsx` |
| Línea de tiempo del proceso | `src/app/grupos/_sections/TimelineSection.tsx` |
| Diagrama y portada de Planeación | `src/app/planeacion/page.tsx` |
| PDFs de planificación | `src/data/planificacion.ts` |
| Fondos de encabezados (carruseles) | `heroBgs` dentro de cada `page.tsx` |
| Imágenes de noticias | Gestor Sanity (no en el código) |

---

## 4. Consejo de rendimiento

Mantén cada imagen **≤ 1920 px de ancho** y en `.webp`. Evita fotos de varios MB: el sitio se entrega al IIAP y debe cargar rápido. Cuando tengas un lote nuevo de fotos, puedo convertirlas y ubicarlas por ti como hicimos con las instalaciones.
