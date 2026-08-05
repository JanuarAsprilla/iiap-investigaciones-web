# Header y footer institucionales (clon fiel de iiap.org.co)

Status: approved (verbal design approval received 2026-08-05; awaiting written-spec review)

## Contexto y objetivo

El portal `iiap-investigaciones-web` (Next.js 15 / React 19) hoy no tiene ningún
header/footer de sitio: `src/app/layout.tsx` solo renderiza un skip-link y
`{children}`; cada página monta `<SiteNav />` (rail de módulos, ver
`src/components/layout/SiteNav.tsx`) de forma manual.

El objetivo es que al entrar al portal la experiencia se sienta como estar
dentro de `https://iiap.org.co/`: mismo header (barra gov.co + logo IIAP +
buscador + menú institucional) y mismo footer (contacto, enlaces, suscripción,
redes, franja gov.co, panel legal) que el sitio real, con la fidelidad visual
más alta posible (colores, tipografía, spacing, comportamiento) sin depender
de JS del sitio real ni replicar su backend (CMS "Bontris").

Esto formaliza la migración de este portal de **Opción A** (embebido dentro
de un layout institucional externo, sin chrome propio) a **Opción B**
(portal autónomo con su propio chrome institucional), confirmada
explícitamente por el usuario en este flujo de brainstorming — revirtiendo la
justificación original de `SiteNav` ("no competir con un navbar institucional
esperado del sitio padre").

## Decisiones confirmadas (brainstorming)

1. **Opción B**: el portal pasa a ser autónomo; trae su propio header/footer
   institucional en vez de asumir que un sitio padre los provee.
2. **Coexistencia**: el header/footer institucional convive con el
   `SiteNav` existente (rail de módulos). Son navegaciones de propósito
   distinto — una es sitewide/institucional, la otra es portal-interna.
3. **Enlaces institucionales absolutos**: todo enlace que no exista como
   ruta real de este Next.js app (transparencia, noticias, PQRSD, contacto,
   nosotros, buscar, mapa del sitio, términos, protección de datos, /es,
   /en, /subscribe, /home, /feed, redes sociales) apunta con URL absoluta a
   `https://iiap.org.co/...`. No se crean páginas stub locales.
4. **Clon fiel del CSS/asset real**: se replican los valores exactos
   (colores, tamaños, tipografía Lato) extraídos de `site.css`/`main.css`
   del sitio real, y se auto-alojan los 6 assets reales necesarios en vez de
   usar placeholders o reinterpretar con los tokens de diseño propios del
   portal (`--forest`, `--amber`, etc. en `globals.css`). Los tokens propios
   del portal NO se tocan ni se mezclan con este chrome.
5. **Fuera de alcance**: el sistema de notificaciones `.alert` / `.snack` /
   `.toast` del sitio real. En el HTML capturado son un `<script
   type="text/html">` (plantilla inerte, nunca renderizada) atado a un
   framework reactivo propio del CMS (bindings `bind:class`, `hook:click`)
   que este proyecto no tiene. No hay JS ni estado que los dispare. Se
   excluye por YAGNI — no es necesario para el objetivo de "sentirse en el
   sitio oficial" (branding/navegación), y añadirlo requeriría inventar un
   sistema de estado global sin necesidad real.
6. **Montaje único**: los componentes se montan una sola vez en
   `src/app/layout.tsx` (no por página, a diferencia de `SiteNav`).
7. **Sin CSS Modules ni archivos `.css` nuevos**: siguiendo el patrón ya
   usado en `SiteNav.tsx`, el estilo va en un bloque `<style>{...}</style>`
   inline dentro de cada componente, con selectores de clase propios
   (namespaced) para no chocar con `globals.css`.

## Arquitectura

Dos componentes cliente nuevos en `src/components/layout/`:

- `InstitutionalHeader.tsx`
- `InstitutionalFooter.tsx`

Montados una sola vez en `src/app/layout.tsx`, envolviendo `{children}`:

```tsx
<body className="min-h-screen antialiased">
  <a href="#main-content" className="skip-link">Saltar al contenido</a>
  <InstitutionalHeader />
  {children}
  <InstitutionalFooter />
</body>
```

`SiteNav` no cambia de implementación. Su rail fijo (`left:14px`, ancho
120px reservado vía `#main-content { padding-left: 120px }` en desktop) sigue
igual; el header institucional es `position: fixed; top:0` y no se solapa
horizontalmente con el rail (rail está anclado a la izquierda a media
altura, header ocupa el ancho completo arriba). El header reserva su propio
alto de página empujando el contenido hacia abajo (ver "Reserva de espacio").

### `InstitutionalHeader.tsx`

**Estructura** (clon del `#head` real):

```
<header id="inst-head" className={scrolled ? "scrolled" : ""}>
  <div className="mark">          ← franja gov.co azul (#36C)
    <a href="https://www.minambiente.gov.co">img life.png</a>
    <a href="https://www.gov.co">img mark.svg</a>
  </div>
  <div className="main">          ← barra oscura #2E2E2E, 44px
    <div className="logo">        ← bloque verde #1B8438 con logo.png + texto
      <a href="/">IIAP shield + "Instituto..." + "John Von Neumann"</a>
    </div>
    <div className="side">
      <form className="find">…buscador (submit → https://iiap.org.co/buscar)</form>
      <label>selector idioma (checkbox+label, sin JS)
        <div className="list"><a href="https://iiap.org.co/es">Español</a>…</div>
      </label>
    </div>
  </div>
  <nav className="menu">          ← barra #3E3E3E, 60px
    <input type="checkbox" id="head-menu-toggle" />  ← hamburguesa CSS-only
    <div className="knobs">
      home icon → "/"
      label[for=head-menu-toggle] → ícono hamburguesa (solo mobile)
    </div>
    <div className="items">
      6 links absolutos a iiap.org.co (transparencia, atención ciudadanía,
      participa, noticias, PQRSD, contacto)
    </div>
  </nav>
</header>
```

**Comportamiento de scroll (compactación)**: en el CSS real, `.show` es el
estado COMPACTO activado al hacer scroll (oculta `.mark` y `.main`, deja solo
`.menu` con `logo` reducido a 60px de alto, `menu` con fondo blanco). Por
defecto (sin `.show`) el header está completo. Se replica con:

```tsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 80);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

Umbral 80px (razonable, el sitio real no expone el valor exacto en CSS —
está en `view.js`, fuera de alcance replicar su JS). Clase `scrolled` en vez
de `show` para no chocar semánticamente con el CSS de terceros si algún día
se audita.

**Selector de idioma y menú hamburguesa**: puramente CSS (`:hover` en
`label` para idioma, `<input type="checkbox">` + selector `~`/`+` para el
menú mobile), sin JS — igual que el sitio real. Consistente con el patrón
`useState` ya usado para el drawer mobile de `SiteNav`, pero aquí no hace
falta port a React state porque el CSS-only funciona igual y es más simple
(YAGNI).

**Buscador**: `<form method="GET" action="https://iiap.org.co/buscar">` —
absoluto, apunta al buscador real (este portal no tiene motor de búsqueda
propio).

**Reserva de espacio**: el sitio real usa `body:before { height: 100px }`
(gov bar + main bar) para no tapar el contenido bajo el header `fixed`. Se
replica como `padding-top` en un wrapper o `margin-top` en `#main-content`
existente — **104px** en desktop (36+44+... según medidas reales: mark
~36px + main 44px + menu 60px cuando expandido no está fijo, así que el
valor exacto a reservar es la altura de `.mark`+`.main` = ~80px, el `.menu`
de 60px se sigue mostrando siempre). Se ajusta con Playwright durante
implementación para evitar solape real, no solo copiar el número del sitio
original (que puede diferir por fuentes/renderizado).

**Colores/medidas clave** (de `head.css`, 668 líneas ya extraídas):
- Gov bar: `background:#36C`, padding `8px 0`
- Main bar: `background:#2E2E2E`, `height:44px`
- Logo block: `background:#1B8438`, `width:290px; height:104px`
- Menu bar: `background:#3E3E3E`, `height:60px`
- Acento verde: `#62BB62` (borde buscador, hover), `#1B8438` (barra
  inferior 3px del header, dropdown menú)
- Texto menú: `#B3B3B3` → hover `#FFFFFF`
- Buscador input: `background:#3F4348; color:#E3E3E3`, focus
  `background:#EFEBE8; color:#232323`
- Compactado (`.scrolled`): `.menu` pasa a `background:#FFFFFF`, logo baja a
  `height:60px`

**Mobile (`max-width:768px`)**, de `head-mobile.css` (39 reglas):
logo centrado sobre fondo `#3E3E3E` en vez de verde, menú colapsa a
`display:none` controlado por el checkbox, items pasan a bloque completo con
fondo `#434343`.

### `InstitutionalFooter.tsx`

**Estructura** (clon del `#foot` real, 3 secciones):

```
<footer id="inst-foot">
  <div className="main">          ← fondo #2B2B2B, borde superior 2px #62BB62
    <div className="item about">  ← "Acerca de IIAP" + descripción + contacto
      <ul>
        <li className="phone">   tel: +57 (4) 670 9126, +57 312 288 8110
        <li className="mail">    iiap@iiap.org.co
        <li className="mail">    notificacionesjudiciales@iiap.org.co
        <li className="address"> Cra 7 No 29-57 B/César Conto, Quibdó-Chocó
    </div>
    <div className="item links"> ← "Enlaces" (checkbox+label mobile-collapsible)
        Instituto Humboldt / Sinchi / Invemar / SIB Colombia (externos)
    </div>
    <div className="item touch"> ← "Suscríbete" (form) + "Síguenos" (redes)
        form action=".../subscribe"
        Facebook / Instagram / TikTok / Spotify (SVGs inline, colores hover
        por red: #1877F2, #E4405F, #FE2C55, #4CB564)
    </div>
  </div>
  <div className="mark">          ← franja azul #36C (mismo estilo que header,
                                     PERO logos distintos: colombia.co, no Minambiente)
    <a href="https://www.colombia.co"><img pais.svg main></a>
    <a href="https://www.gov.co"><img mark.svg last></a>
  </div>
  <div className="panel">         ← fondo #232323
    <div className="menu">        ← enlaces legales: mapa del sitio, términos,
                                     protección de datos (absolutos)
    <div className="side">        ← "Powered by Bontris" + botón scroll-top
  </div>
</footer>
```

**Nota sobre "Powered by Bontris"**: se omite. Es crédito del CMS
propietario del sitio real (Bontris S.A.S.), no aplica a este stack
Next.js/Vercel. Se reemplaza esa posición del panel legal únicamente con los
3 links legales absolutos + botón "volver arriba", sin atribución falsa.

**Formulario de suscripción**: sin backend propio de newsletter en este
portal. `action="https://iiap.org.co/subscribe"` con `method="POST"` —
absoluto, delega al sitio real (igual tratamiento que el buscador del
header).

**Colores/medidas clave** (de `foot.css`, 600 líneas ya extraídas):
- Fondo principal: `#2B2B2B`; borde superior `2px solid #62BB62`
- Fondo panel legal: `#232323`
- Texto secundario: `#B2B2B2` → hover `#FFFFFF`
- Texto panel: `#727272` → hover `#62BB62`
- Iconos contacto: sprite `contact.png` (phone/mail/address, 24×24 cada
  uno, offset vertical -24px por variante)
- Botón scroll-top: `background:#62BB62` → hover `#3BB549`
- Redes sociales: círculo `38×38`, `background:#333333`, SVG blanco, hover
  con color de marca de cada red

**Mobile (`max-width:768px`)**, de `foot-mobile.css` (18 reglas): columnas
del `.main` pasan a `width:100%` apiladas, panel legal cambia a layout de
bloque.

## Assets

6 assets reales del sitio, ya descargados/verificados en el scratch del job
(`/Users/januar/.claude/jobs/f3119beb/tmp/gov-assets/`) — se copian a un
folder **nuevo** `public/assets/gov/` (deliberadamente separado de
`public/assets/logo-iiap.png`, que es el logo propio del portal, distinto de
este `logo.png` institucional blanco/transparente pensado para fondo verde
oscuro):

| Archivo | Origen real | Uso | Tamaño |
|---|---|---|---|
| `logo.png` | `/assets/images/logo.png` | Header, bloque `.logo` | 88×94 |
| `life.png` | `/assets/images/life.png` | Header, franja `.mark` (Minambiente) | 320×132 |
| `mark.svg` | `/assets/images/mark.svg` | Header y footer, franja `.mark` (gov.co, ambas franjas) | — |
| `pais.svg` | `/assets/images/pais.svg` | Footer, franja `.mark` (Colombia.co) — confirmado presente en el HTML real del footer, junto a `mark.svg`; distinto del par usado en el header (`life.png`+`mark.svg`) | — |
| `contact.png` | `/assets/images/contact.png` | Footer, sprite iconos contacto | 24×96 |
| `send.svg` | `/assets/images/send.svg` | Footer, icono botón suscribir | — |

Nota de implementación: el ícono de envío del form de suscripción en el CSS
real es un `background-image` en `form:after`, no un `<img>`; se replica
igual (pseudo-elemento), no como elemento de fondo separado.

Rutas servidas desde `/assets/gov/...` (Next.js les aplica el
`basePath`/`assetPrefix` automáticamente solo si se usan como
`next/image`/`<Link>`; si van como `<img src="/assets/gov/...">` planas,
mismo comportamiento pre-existente que el resto del proyecto — no se
"arregla" este comportamiento como parte de esta tarea, es consistente con
cómo ya se sirven los demás assets en `public/assets/`).

## Tipografía

El sitio real usa `Lato` (Google Font) para todo `#head`/`#foot`. El portal
ya carga `Bebas_Neue`/`Crimson_Text`/`Inter` vía `next/font/google` en
`layout.tsx`. Se añade `Lato` (pesos 400/700, `display:swap`) como una
cuarta fuente vía `next/font/google`, aplicada **solo** dentro de
`#inst-head`/`#inst-foot` mediante una variable CSS propia
(`--font-lato`) en el `<style>` inline de cada componente — no se cambia la
tipografía global del portal ni se toca `globals.css`.

## Manejo de errores / bordes

- Si `window` no está disponible (SSR): el `useEffect` de scroll no corre en
  servidor; estado inicial `scrolled=false` es seguro (SSR renderiza header
  completo, hidrata igual en cliente hasta el primer scroll).
- Ambos componentes son "tontos": no hacen fetch, no dependen de props, no
  tienen estado de error que manejar — son navegación/branding estático.
- Links externos (`target="_blank"` donde el sitio real lo usa — banners
  gov.co, redes sociales, instituciones hermanas) llevan
  `rel="noopener noreferrer"` (el HTML pegado por el usuario no lo incluye,
  pero es una corrección de seguridad básica sin cambiar comportamiento
  visible — mitiga tabnabbing).

## Testing

Siguiendo `~/.claude/rules/web/testing.md`:

1. **Visual regression** (prioridad 1): capturas Playwright de header y
   footer en 320/768/1024/1440px, con y sin scroll (estado compacto),
   comparando contra capturas del sitio real ya guardadas en
   `/Users/januar/.claude/jobs/f3119beb/tmp/` como referencia manual (no
   pixel-diff automatizado, es un clon manual — no hay snapshot baseline
   previo en este repo).
2. **Accesibilidad**: nav landmarks (`<header>`, `<footer>`, `<nav
   aria-label="Menú institucional">`), contraste de texto sobre fondos
   oscuros (ya verificado en el CSS real, que cumple AA en su mayoría),
   navegación por teclado del checkbox-menú (label enfocable, checkbox
   accesible vía `Tab`+`Space`), `alt` en todas las imágenes de marca.
3. **No unit tests**: son componentes de presentación pura sin lógica de
   negocio más allá del listener de scroll (trivial, no amerita test
   dedicado — YAGNI, coherente con que `SiteNav` tampoco tiene tests
   unitarios en este repo).
4. Verificación manual en navegador (dev server) del layout completo en
   una página real (`/`) confirmando que `SiteNav` y el header institucional
   no se solapan, y que `#main-content` no queda tapado por el header fijo.

## Alcance explícitamente excluido

- Sistema `.alert`/`.snack`/`.toast` (ver decisión 5).
- "Powered by Bontris" (crédito de CMS ajeno).
- Cualquier ruta institucional nueva dentro de este Next.js app (todo
  enlace no-portal es absoluto al sitio real).
- Cambios a `SiteNav.tsx`, `globals.css`, o los design tokens propios del
  portal.
- Reproducir el JS del sitio real (`view.js`) más allá del listener de
  scroll ya descrito — el menú/idioma quedan CSS-only como en el original.
