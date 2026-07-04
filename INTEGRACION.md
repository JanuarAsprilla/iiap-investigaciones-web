# Guía de integración — Portal Subdirección de Investigaciones IIAP

Documento para el **área de sistemas** encargada de integrar este sitio en el
espacio institucional definitivo. Resume requisitos, variables y pasos de
puesta en producción para que la integración salga sin sorpresas.

---

## 1. Stack y requisitos

| Componente | Detalle |
|------------|---------|
| Framework  | Next.js 15 (App Router, React 19) |
| Runtime    | Node.js **≥ 20** |
| CMS        | Sanity (contenido de *Actualidades*) |
| Estilos    | Tailwind CSS 4 + CSS propio |
| Render     | Sitio mayormente **estático (SSG)** + middleware de headers |

## 2. Comandos

```bash
npm install        # instalar dependencias
npm run build      # build de producción (genera .next/)
npm run start      # servir en producción (usa $PORT, por defecto 3000)
npm run dev        # desarrollo local
npm run lint       # linter
```

El servidor arranca en el puerto indicado por la variable `PORT`
(`next start -p ${PORT:-3000}`), compatible con Render y la mayoría de PaaS.

## 3. Variables de entorno

Ver `.env.example` para la lista completa con descripciones. Resumen:

| Variable | Ámbito | Obligatoria | Descripción |
|----------|--------|-------------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | público | sí | ID del proyecto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | público | sí | Dataset (normalmente `production`) |
| `SANITY_API_READ_TOKEN` | **secreto (servidor)** | sí | Token de solo lectura. **No** exponer en el cliente |
| `NEXT_PUBLIC_SITE_URL` | público | recomendada | URL canónica (sitemap, canonical, Open Graph) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | público | recomendada | `true` solo en la producción real; ver §4 |

> **Importante:** todo lo que empieza con `NEXT_PUBLIC_` se incrusta en el
> bundle del cliente y es visible públicamente. Los secretos (como
> `SANITY_API_READ_TOKEN`) **no** deben llevar ese prefijo.

## 4. Control de indexación en buscadores (clave para el go-live)

El sitio está protegido para **no** ser indexado por defecto, de modo que el
preview de Render no aparezca en Google antes de tiempo.

- Sin `NEXT_PUBLIC_ALLOW_INDEXING` o con `false`:
  - `robots.txt` → `Disallow: /` (bloquea todo)
  - `<meta robots>` → `noindex, nofollow`
- **En el dominio definitivo**, y solo entonces, definir:
  ```
  NEXT_PUBLIC_ALLOW_INDEXING=true
  ```
  Con esto se habilita el `robots.txt` normal, el `sitemap.xml` y los metadatos
  `index, follow`.

Recordar además definir `NEXT_PUBLIC_SITE_URL` con el dominio final para que el
sitemap y las URLs canónicas sean correctas.

## 5. Ubicación final: `iiap.org.co/investigacion` (subruta)

El portal se integrará en **`https://iiap.org.co/investigacion`**, respetando el
**navbar y el footer institucionales** del sitio principal. Hay **dos decisiones
de arquitectura** que conviene cerrar en la reunión con sistemas.

### 5.1. Cómo se sirve la subruta `/investigacion`

El código ya trae un interruptor por variable de entorno. Para montar en la
subruta, definir en producción:

```
NEXT_PUBLIC_BASE_PATH=/investigacion
```

Esto activa `basePath` + `assetPrefix` en `next.config.ts` y hace que
`CANONICAL_BASE` (sitemap, canonical, OG) incluya la subruta. Sin esta variable
(preview de Render), el sitio se sirve en la raíz — sin romper nada.

> ⚠️ **Caveat de assets con `basePath`.** Next prefija automáticamente
> `<Link>`, `next/image` y los recursos de `/_next`, **pero NO** los
> `<img src="/assets/...">` crudos ni los `url(/assets/...)` en línea. El portal
> referencia ~150 imágenes con rutas absolutas desde la raíz, así que bajo
> `basePath` esas imágenes darían 404. Opciones (elegir una en la reunión):
>
> 1. **Subdominio propio** — ej. `investigacion.iiap.org.co` con reescritura
>    interna a `/investigacion`. Es la opción **más simple y sin refactor**:
>    no requiere `basePath` y todas las rutas absolutas funcionan tal cual.
> 2. **Reverse proxy** que mapee `iiap.org.co/investigacion/*` → app,
>    **preservando** el prefijo `/investigacion` (incluye `/assets` y `/_next`),
>    con `basePath` activo.
> 3. **`basePath` + refactor de rutas de assets** — introducir un helper
>    `asset()` que anteponga la subruta a las ~150 referencias. Es la opción con
>    más cambios y requiere QA visual. *(Se puede hacer como tarea dedicada una
>    vez confirmada esta ruta — avisar al equipo de desarrollo.)*
>
> **Recomendación:** opción 1 o 2 (cero refactor, menor riesgo).

### 5.2. Navbar y footer institucionales

El portal actualmente incluye su **propio** navbar (`SiteNav`) y footer. Como se
debe **respetar el navbar/footer institucionales**, hay que decidir el modelo:

- **A) El sitio institucional envuelve el contenido** (el portal se muestra
  dentro del layout institucional, o vía iframe/embed): conviene **ocultar** el
  navbar y footer propios del portal para no duplicar el chrome. *Se puede
  añadir un modo "embebido" por variable de entorno
  (p. ej. `NEXT_PUBLIC_EMBEDDED=true`) que oculte `SiteNav` y el footer —
  pendiente de confirmar e implementar por el equipo de desarrollo.*
- **B) El portal es autónomo bajo `/investigacion`** con su propio chrome, y el
  navbar institucional simplemente enlaza a esa subruta: no requiere cambios;
  solo alinear estilos y un enlace de regreso al sitio principal.

> Traer a la reunión: ¿el portal vive **dentro** del layout institucional
> (opción A) o es una sección **autónoma** enlazada desde el navbar (opción B)?
> La respuesta define si se implementa el modo embebido.

## 6. Seguridad — headers y CSP

Los encabezados de seguridad se aplican centralizadamente en
`src/middleware.ts` (CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`).

- Si se agregan **servicios externos** (analytics, mapas, fuentes, iframes,
  APIs), hay que añadir sus orígenes a la CSP correspondiente
  (`script-src`, `connect-src`, `frame-src`, etc.) en ese archivo.
- Orígenes ya permitidos: Sanity (`*.api.sanity.io`, `cdn.sanity.io`) y
  YouTube en `frame-src`.
- `HSTS` con `preload` está activo: asegúrense de servir **siempre por HTTPS**
  en el dominio final antes de enviar a la lista de preload.
- Si se coloca un **proxy/reverse proxy o CDN** delante, verificar que no
  duplique ni elimine estos headers.

## 7. Sanity Studio

El panel de administración de contenido se sirve en la ruta **`/studio`** y
gestiona su propia CSP (el middleware la excluye). Confirmar acceso y
credenciales de Sanity con el equipo de contenido.

## 8. Checklist de puesta en producción real

- [ ] Node ≥ 20 en el entorno de despliegue
- [ ] Variables de Sanity configuradas (`PROJECT_ID`, `DATASET`, `READ_TOKEN`)
- [ ] `NEXT_PUBLIC_SITE_URL=https://iiap.org.co` (origen, sin barra final)
- [ ] **Decisión §5.1** tomada (subdominio / proxy / basePath) y, si aplica,
      `NEXT_PUBLIC_BASE_PATH=/investigacion` definido
- [ ] **Decisión §5.2** tomada (portal embebido vs. autónomo)
- [ ] Imágenes `/assets/...` cargan correctamente en la subruta `/investigacion`
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` **solo** en producción real
- [ ] Que el `robots.txt` de la **raíz** de `iiap.org.co` no bloquee
      `/investigacion` (bajo subruta, ese robots raíz es el que leen los buscadores)
- [ ] HTTPS forzado en el dominio final
- [ ] CSP ampliada si se integran servicios externos (§6)
- [ ] `npm run build` sin errores
- [ ] Verificar `/investigacion/sitemap.xml` y metadatos en el dominio final
- [ ] Verificar que `/studio` carga y autentica correctamente
