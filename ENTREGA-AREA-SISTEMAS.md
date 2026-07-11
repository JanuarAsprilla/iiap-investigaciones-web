# Entrega técnica al Área de Sistemas — Portal Subdirección de Investigaciones (IIAP)

> **Documento maestro de entrega y despliegue.**
> Destinatario: Área de Sistemas del IIAP, responsable de integrar este portal
> en el sitio oficial bajo **`https://iiap.org.co/investigacion`**.
> Objetivo: que la integración en el servidor se realice con éxito, sin
> sorpresas y respetando el navbar y el footer institucionales.

Documentos complementarios incluidos en el repositorio:
- **`INTEGRACION.md`** — guía de integración (detalle de la subruta y decisiones).
- **`.env.example`** — plantilla de variables de entorno (sin secretos).
- **`README.md`**, **`DESIGN.md`**, **`PRODUCT.md`**, **`GUIA-IMAGENES.md`** — contexto de producto y diseño.

---

## 1. Resumen ejecutivo

Portal web informativo de la **Subdirección de Investigaciones del IIAP**
(Instituto de Investigaciones Ambientales del Pacífico), centrado en el Chocó
Biogeográfico. Presenta los ejes estratégicos, el Centro de Investigación
(instalaciones, bioespacios con fotos y videos, biodiversidad), los componentes
y grupos de investigación, la planeación institucional (POA, PICIA, PENIA, Plan
Estratégico) y una sección de actualidades gestionada por CMS.

- **Aplicación:** Next.js 15 (App Router) con React 19, mayormente **estática (SSG)**.
- **Estado:** Desarrollo terminado y funcional. Desplegado en **Render** como
  *preview/staging* (no indexable). Pendiente: integración en el dominio oficial.
- **Punto crítico de integración:** servir la app bajo la subruta `/investigacion`
  respetando el chrome institucional (ver **§8**). Hay decisiones de arquitectura
  que conviene cerrar antes del despliegue.

---

## 2. Qué se entrega (contenido del paquete)

| Elemento | Descripción |
|----------|-------------|
| Código fuente | Repositorio Git completo (Next.js + Sanity), 193 archivos versionados |
| Assets estáticos | `public/assets/` — **≈192 MB** (imágenes WebP + 12 videos MP4) |
| Configuración | `next.config.ts`, `render.yaml`, `.nvmrc`, `.npmrc`, `tsconfig.json` |
| Seguridad | Headers y CSP centralizados en `src/middleware.ts` |
| CMS | Configuración de Sanity Studio (`sanity.config.ts`) servido en `/studio` |
| Documentación | Este documento + `INTEGRACION.md` + `.env.example` + README/DESIGN/PRODUCT |
| Plantilla de entorno | `.env.example` (variables documentadas, **sin valores reales**) |

> El repositorio **no contiene secretos**: los tokens se inyectan por variables
> de entorno en el servidor. Ver **§6**.

---

## 3. Stack técnico y requisitos del servidor

| Componente | Detalle |
|------------|---------|
| Framework | **Next.js 15.3** (App Router) + **React 19** |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 + CSS propio |
| CMS | **Sanity** v5 (contenido de *Actualidades*), Studio embebido en `/studio` |
| Render de páginas | **SSG** (HTML pre-generado en build) + SSG dinámico para el detalle de actualidades |
| Runtime | **Node.js ≥ 20** (recomendado **Node 22**, fijado en `.nvmrc` / `.node-version`) |
| Gestor de paquetes | npm (con `legacy-peer-deps=true`, ver `.npmrc`) |

**Requisitos mínimos de la máquina/servidor:**

- **Node.js 20 o superior** (probado en 22). Se necesita para el *build* y para
  el proceso en ejecución (`next start`).
- **RAM:** ≥ 1 GB para el build (Next compila con Webpack/SWC). En ejecución el
  proceso Node consume poco (~150–300 MB).
- **Disco:** ~**700 MB–1 GB** (≈192 MB de assets + `node_modules` ~400 MB +
  salida de build `.next/`). Los assets son el grueso: son imágenes reales y
  videos de campo del Centro.
- **Salida a Internet** hacia `*.api.sanity.io` y `cdn.sanity.io` (para el
  contenido de actualidades y sus imágenes). El resto de imágenes/videos son
  locales (servidos por la propia app desde `public/`).
- **HTTPS obligatorio** en el dominio final (hay HSTS con `preload` activo, §6).

---

## 4. Estructura de rutas del portal

| Ruta | Tipo | Contenido |
|------|------|-----------|
| `/` | Estática | Home: hero + "Cuatro ejes estratégicos" (tarjetas 3D) |
| `/planeacion` | Estática | Documentos institucionales (POA/PICIA/PENIA/Plan Estratégico) con descarga de PDF |
| `/centros` | Estática | Centro de Investigación: instalaciones, bioespacios (galería foto+video), biodiversidad |
| `/componentes` | Estática | Componentes de investigación (Ambiental, Productivo, Ecosistémico) |
| `/grupos` | Estática | Grupos de investigación |
| `/actualidades` | Estática | Listado de noticias (desde Sanity) |
| `/actualidades/[slug]` | SSG | Detalle de cada noticia (generado por `generateStaticParams`) |
| `/studio` | Aplicación | Sanity Studio (gestión de contenido, CSP propia) |
| `/robots.txt` | Generada | Robots dinámico según el guard de indexación (§7) |
| `/sitemap.xml` | Generada | Sitemap con las rutas indexables |

Las rutas se sirven **con o sin** el prefijo `/investigacion` según la variable
`NEXT_PUBLIC_BASE_PATH` (§8).

---

## 5. Instalación y build (paso a paso)

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO> iiap-investigaciones-web
cd iiap-investigaciones-web

# 2. Usar Node 20+ (recomendado 22). Con nvm:
nvm install    # lee .nvmrc (Node 22)
nvm use

# 3. Instalar dependencias (respeta .npmrc → legacy-peer-deps)
npm install    # o `npm ci` para un build reproducible en CI/servidor

# 4. Configurar variables de entorno (ver §6)
cp .env.example .env.local     # y editar con los valores reales
#   (en un servidor/PaaS, definirlas en el panel de entorno en lugar de .env.local)

# 5. Compilar para producción
npm run build                  # genera la carpeta .next/

# 6. Arrancar en producción
npm run start                  # escucha en $PORT (por defecto 3000)
```

**Scripts disponibles** (`package.json`):

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo (hot reload) |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build (`next start -p ${PORT:-3000}`) |
| `npm run lint` | Linter (ESLint) |

> El proceso escucha el puerto de la variable `PORT` (compatible con Render y la
> mayoría de PaaS). Si no se define, usa el **3000**.

---

## 6. Variables de entorno

Definirlas en el panel del hosting o en el gestor de entorno del servidor
(**no** commitear valores reales). Lista completa y comentada en `.env.example`.

| Variable | Ámbito | ¿Obligatoria? | Descripción |
|----------|--------|:---:|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Público | Sí | ID del proyecto Sanity (por defecto `2kodfh48`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Público | Sí | Dataset de Sanity (normalmente `production`) |
| `SANITY_API_READ_TOKEN` | **Secreto (servidor)** | Sí | Token de **solo lectura** de Sanity. **No** exponer al cliente |
| `NEXT_PUBLIC_SITE_URL` | Público | Recomendada | Origen/dominio canónico. Afecta `sitemap.xml`, `robots.txt`, canonical, Open Graph. Ej.: `https://iiap.org.co` |
| `NEXT_PUBLIC_BASE_PATH` | Público | Según §8 | Subruta de montaje. En producción: `/investigacion`. Debe coincidir con `basePath` en `next.config.ts` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Público | Recomendada | `true` **solo** en el dominio real para permitir indexación. Ver §7 |
| `NODE_ENV` | Sistema | Automática | `production` en despliegue (ya fijada en `render.yaml`) |

> ### ⚠️ Regla de seguridad sobre `NEXT_PUBLIC_`
> Toda variable con prefijo **`NEXT_PUBLIC_`** se incrusta en el bundle del
> cliente y es **visible públicamente**. Los secretos (p. ej.
> `SANITY_API_READ_TOKEN`) **nunca** deben llevar ese prefijo. El ID de proyecto
> y el dataset de Sanity **no son secretos** (son identificadores públicos).

---

## 7. Control de indexación en buscadores (clave para el go-live)

El sitio está protegido para **NO** ser indexado por defecto — así el preview de
Render (o cualquier entorno que no sea la producción real) no aparece en Google
antes de tiempo.

- **Sin** `NEXT_PUBLIC_ALLOW_INDEXING` (o en `false`):
  - `robots.txt` → `Disallow: /` (bloquea todo)
  - Metadatos → `noindex, nofollow`
- **En el dominio definitivo, y solo ahí**, definir:
  ```
  NEXT_PUBLIC_ALLOW_INDEXING=true
  NEXT_PUBLIC_SITE_URL=https://iiap.org.co
  ```
  Esto habilita el `robots.txt` normal, el `sitemap.xml` y los metadatos
  `index, follow` con las URLs canónicas correctas.

> **Ojo con el `robots.txt` de la raíz.** Bajo la subruta `/investigacion`, los
> buscadores leen el `robots.txt` de la **raíz** de `iiap.org.co`. Verificar que
> ese archivo raíz **no** bloquee `/investigacion`.

---

## 8. Integración bajo `iiap.org.co/investigacion` (el punto central)

La app, por defecto, se sirve en la **raíz** (`/`). Para montarla bajo la
subruta institucional hay un interruptor por variable de entorno:

```
NEXT_PUBLIC_BASE_PATH=/investigacion
```

Esto activa `basePath` + `assetPrefix` en `next.config.ts` y hace que las URLs
canónicas (sitemap, canonical, Open Graph) incluyan la subruta. Next prefija
**automáticamente** `<Link>`, `next/image` y los recursos de `/_next`.

### ⚠️ 8.1. Caveat crítico: los assets crudos NO se auto-prefijan

El portal referencia **187 imágenes/videos** con rutas **absolutas desde la raíz**
(`/assets/...`) en el código y el CSS. Con `basePath` activo, Next **no** reescribe
esas rutas crudas, por lo que el navegador las pediría a `iiap.org.co/assets/...`
(raíz) en lugar de `iiap.org.co/investigacion/assets/...` → **404 en ~187 imágenes**.

Por eso la **forma de servir la subruta** determina si hay o no refactor. Tres
opciones (elegir una con el equipo; recomendadas en este orden):

#### Opción A — Subdominio propio *(recomendada, cero refactor)*

Servir el portal en **`investigacion.iiap.org.co`**. La app corre en la **raíz**
(sin `basePath`), por lo que **todas** las rutas `/assets/...` funcionan tal cual.
El navbar institucional simplemente enlaza a ese subdominio.

- `NEXT_PUBLIC_BASE_PATH` → **no definir**
- Cero cambios de código, mínimo riesgo.

#### Opción B — Reverse proxy conservando el prefijo `/investigacion`

Un proxy (Nginx/Apache) mapea `iiap.org.co/investigacion/*` → app, **con**
`NEXT_PUBLIC_BASE_PATH=/investigacion`. Como `basePath` monta también la carpeta
`public/` bajo la subruta, los assets quedan en `/investigacion/assets/...`.
Para que las rutas **crudas** `/assets/...` (raíz) no den 404, el proxy debe
además **redirigir/reescribir** `iiap.org.co/assets/*` hacia la app.

- Requiere que la raíz `/assets` **no colisione** con assets del sitio
  institucional. Si el sitio principal ya usa `/assets`, preferir la Opción A o C.

#### Opción C — `basePath` + refactor de rutas de assets

Introducir un helper `asset()` que anteponga la subruta a las 187 referencias.
Correcto y limpio, pero implica cambios de código y **QA visual**. **El equipo de
desarrollo puede ejecutarlo como tarea dedicada** una vez confirmada esta ruta.

> **Recomendación:** **Opción A** (subdominio) por simplicidad y menor riesgo. Si
> la URL debe ser literalmente `iiap.org.co/investigacion`, **Opción B** con la
> regla de assets, o solicitar al equipo de desarrollo la **Opción C**.

### 8.2. Navbar y footer institucionales

El portal incluye actualmente su **propio** navbar (`SiteNav`) y footer. Como se
debe respetar el chrome institucional, decidir el modelo:

- **A) El sitio institucional envuelve el portal** (layout institucional o
  iframe/embed): conviene **ocultar** el navbar/footer propios para no duplicar.
  Se puede añadir un **modo embebido** por variable de entorno (p. ej.
  `NEXT_PUBLIC_EMBEDDED=true`) que oculte `SiteNav` y el footer. *Pendiente de
  confirmar e implementar por el equipo de desarrollo si se elige esta vía.*
- **B) El portal es autónomo** bajo `/investigacion` (o el subdominio) con su
  propio chrome, y el navbar institucional enlaza a él: no requiere cambios;
  solo alinear estilos y añadir un enlace de regreso al sitio principal.

> **Decisión para la reunión:** ¿el portal vive **dentro** del layout
> institucional (A) o es una sección **autónoma** enlazada (B)? Define si se
> implementa el modo embebido.

---

## 9. Opciones de despliegue en servidor

La app es un servidor Node estándar (`next start`). Ejemplos de puesta en marcha:

### 9.1. Proceso persistente con **PM2** (servidor propio)

```bash
npm ci && npm run build
PORT=3000 pm2 start "npm run start" --name iiap-investigaciones
pm2 save && pm2 startup    # arranque automático al reiniciar el servidor
```

### 9.2. Servicio **systemd** (alternativa a PM2)

```ini
# /etc/systemd/system/iiap-investigaciones.service
[Unit]
Description=Portal Investigaciones IIAP (Next.js)
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/iiap-investigaciones-web
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/etc/iiap-investigaciones/env   # variables de §6
ExecStart=/usr/bin/npm run start
Restart=on-failure
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now iiap-investigaciones
```

### 9.3. **Nginx** como reverse proxy + TLS

**Opción A (subdominio):**

```nginx
server {
    listen 443 ssl http2;
    server_name investigacion.iiap.org.co;

    # ssl_certificate / ssl_certificate_key ...

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Opción B (subruta `/investigacion`, con `NEXT_PUBLIC_BASE_PATH=/investigacion`):**

```nginx
# Dentro del server { } de iiap.org.co
location /investigacion/ {
    proxy_pass http://127.0.0.1:3000;   # NO quitar el prefijo /investigacion
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
# Reescritura para las rutas de assets crudas (/assets → app bajo la subruta)
location /assets/ {
    proxy_pass http://127.0.0.1:3000/investigacion/assets/;
}
```
> La regla `/assets/` solo aplica si esa ruta **no** colisiona con el sitio
> principal. Si colisiona, usar Opción A o C (§8.1).

### 9.4. **Docker** (opcional)

El repositorio **no** incluye Dockerfile. Si se desea contenerizar, basta una
imagen `node:22-slim` que ejecute `npm ci → npm run build → npm run start`
exponiendo `PORT`. El equipo de desarrollo puede aportar el Dockerfile si se
requiere.

### 9.5. Render (estado actual — referencia)

`render.yaml` ya define el servicio actual de *staging*:
`buildCommand: npm ci && npm run build`, `startCommand: npm start`,
`healthCheckPath: /`, `autoDeploy: true`, `NODE_ENV=production`.
Sirve como referencia de los comandos de build/arranque.

---

## 10. Seguridad — headers y CSP

Los encabezados de seguridad se aplican **centralizadamente** en
`src/middleware.ts`. Ya activos:

| Header | Valor |
|--------|-------|
| `Content-Security-Policy` | `default-src 'self'`; scripts/estilos self (+`unsafe-inline`, requerido por la hidratación SSG de Next); `img-src` self+data+https+`cdn.sanity.io`; `frame-src https://www.youtube.com`; `connect-src` self+`*.api.sanity.io`+`cdn.sanity.io`; `object-src 'none'`; `base-uri 'self'` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

**Notas para el despliegue:**

- **Al integrar servicios externos** (analytics, mapas, fuentes externas,
  iframes, APIs nuevas) hay que **añadir sus orígenes** a la CSP en
  `src/middleware.ts` (`script-src`, `connect-src`, `frame-src`, etc.), o de lo
  contrario el navegador los bloqueará.
- **`X-Frame-Options: DENY`** impide embeber el portal en un `<iframe>`. Si la
  integración institucional (§8.2, opción A) requiere iframe, hay que **ajustar**
  este header y `frame-ancestors` en la CSP para permitir el dominio del IIAP.
  Coordinarlo con el equipo de desarrollo.
- **HSTS con `preload`** exige servir **siempre por HTTPS** en el dominio final.
- Si se coloca un **proxy/CDN** delante, verificar que **no duplique ni elimine**
  estos headers.
- El middleware **excluye `/studio`** (Sanity gestiona su propia CSP).

---

## 11. CMS — Sanity Studio

- Panel de administración de contenido servido en **`/studio`** (o
  `/investigacion/studio` bajo subruta).
- Gestiona la sección de **Actualidades** (y autores/equipo).
- Requiere las variables de Sanity (§6) y un **token de solo lectura** para que
  el sitio consuma el contenido publicado.
- Confirmar con el **equipo de contenido** el acceso al proyecto Sanity
  (`projectId` actual: `2kodfh48`, dataset `production`) y las credenciales de
  edición.

---

## 12. Checklist de puesta en producción real

- [ ] Node **≥ 20** (recomendado 22) disponible en el servidor
- [ ] `npm ci && npm run build` finaliza **sin errores**
- [ ] Variables de Sanity configuradas (`PROJECT_ID`, `DATASET`, `READ_TOKEN`)
- [ ] `NEXT_PUBLIC_SITE_URL=https://iiap.org.co` (origen, sin barra final)
- [ ] **Decisión §8.1 tomada** (subdominio / proxy / basePath+refactor) y, si
      aplica, `NEXT_PUBLIC_BASE_PATH=/investigacion` definido
- [ ] **Decisión §8.2 tomada** (portal embebido vs. autónomo)
- [ ] Las imágenes/videos `/assets/...` cargan bien en la ubicación final
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` **solo** en producción real
- [ ] El `robots.txt` de la **raíz** de `iiap.org.co` no bloquea `/investigacion`
- [ ] **HTTPS forzado** en el dominio final (por HSTS)
- [ ] CSP ampliada si se integran servicios externos (§10)
- [ ] `X-Frame-Options`/`frame-ancestors` ajustados si se usa iframe (§10)
- [ ] Proceso gestionado (PM2/systemd) con **reinicio automático**
- [ ] Verificar `sitemap.xml`, `robots.txt` y metadatos en el dominio final
- [ ] Verificar que `/studio` carga y autentica correctamente

---

## 13. Pendientes (dependientes de decisiones/terceros)

1. **Decisiones §8.1 y §8.2** — a cerrar en la reunión con Sistemas. Definen si
   el equipo de desarrollo debe implementar el **modo embebido** y/o el
   **refactor de assets** (Opción C).
2. **Contenido oficial de 4 laboratorios nuevos** (descripciones y fotos) — lo
   aportará el área de investigación; se integrará cuando esté disponible.

---

## 14. Contacto y soporte

- **Desarrollo:** JanuarAsprilla (repositorio y ajustes de código).
- Ante dudas de integración (subruta, assets, CSP/iframe, modo embebido), el
  equipo de desarrollo puede implementar los ajustes necesarios una vez tomadas
  las decisiones de **§8**.

> **Nota final:** el repositorio está limpio y auditado (sin secretos, sin
> archivos internos de herramientas, sin fuentes de video crudas ni *boilerplate*).
> Todo lo necesario para desplegar está en el código y en este documento.
