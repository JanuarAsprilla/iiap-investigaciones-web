"use client";

/**
 * InstitutionalHeader — Clon fiel del header de https://iiap.org.co/.
 *
 * Reproduce la barra gov.co, la barra principal (logo + buscador + idioma)
 * y el menú institucional del sitio real, para que el portal se sienta
 * dentro del sitio oficial (Opción B: portal autónomo con chrome propio).
 * Convive con SiteNav (navegación de módulos del portal).
 *
 * Enlaces institucionales (transparencia, noticias, PQRSD, contacto,
 * buscador, idioma) son absolutos a iiap.org.co: este Next.js app no tiene
 * esas rutas ni motor de búsqueda propio.
 */

import { useEffect, useRef, useState } from "react";

const REAL_SITE = "https://iiap.org.co";
const SIGN_URL = `${REAL_SITE}/sign`;
const ZOOM_MIN = 1.0;
const ZOOM_MAX = 1.6;
const ZOOM_STEP = 0.1;

const MENU_ITEMS = [
  { href: `${REAL_SITE}/paginas/transparencia-y-acceso-a-la-informacion-publica`, label: "Transparencia y Acceso a la Información Pública" },
  { href: `${REAL_SITE}/paginas/atencion-y-servicio-a-la-ciudadania`, label: "Atención y Servicio a la Ciudadanía" },
  { href: `${REAL_SITE}/paginas/participa`, label: "Participa" },
  { href: `${REAL_SITE}/noticias`, label: "Noticias" },
  { href: `${REAL_SITE}/solicitudes`, label: "PQRSD" },
  { href: `${REAL_SITE}/contacto`, label: "Contacto" },
];

const SCROLL_COMPACT_THRESHOLD = 80;

export default function InstitutionalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const zoomRef = useRef(ZOOM_MIN);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_COMPACT_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyZoom = (delta: number) => {
    const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomRef.current + delta));
    zoomRef.current = next;
    document.body.style.setProperty("zoom", String(next));
  };

  return (
    <>
      <style>{`
        #inst-head {
          font-family: var(--font-lato), Lato, arial, sans-serif;
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 200;
          box-shadow: 0 2px 4px rgba(0,0,0,.2);
        }
        #inst-head:after {
          content: "";
          position: absolute; left: 0; bottom: 0;
          width: 100%; height: 3px;
          background: #1B8438;
        }
        #inst-head .ih-wrap {
          position: relative; display: block;
          margin: 0 auto; padding: 0 10px;
          min-width: 300px; max-width: 1600px; width: 90%;
        }

        /* ── Franja gov.co ── */
        #inst-head .ih-mark {
          overflow: hidden; display: block;
          padding: 8px 0; width: 100%;
          background: #36C;
        }
        #inst-head .ih-mark .ih-wrap { padding: 0; overflow: hidden; }
        #inst-head .ih-mark a {
          position: relative; display: block; float: left;
          margin: 0 16px 0 0;
        }
        #inst-head .ih-mark img { display: block; border: none; width: auto; height: 36px; }

        /* ── Barra principal ──
              display:none no se puede animar, así que la contracción usa
              max-height + opacity (mismo efecto visual que el "drop" del
              sitio real, pero con una transición suave en vez de un salto). */
        #inst-head .ih-main {
          overflow: visible; width: 100%;
          max-height: 44px; opacity: 1;
          background: #2E2E2E;
          transition: max-height .45s cubic-bezier(0.4, 0, 0.2, 1), opacity .3s ease;
        }
        #inst-head.scrolled .ih-main { max-height: 0; opacity: 0; overflow: hidden; }

        #inst-head .ih-logo {
          position: absolute; z-index: 1;
          top: 0; left: 0;
          width: 290px; height: 104px;
          background: #1B8438;
          transition: height .45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        #inst-head.scrolled .ih-logo { height: 60px; }
        #inst-head .ih-logo a {
          display: block; padding: 10px 10px 10px 100px;
          width: 100%; height: 100%;
        }
        #inst-head .ih-logo img {
          position: absolute; top: 8px; left: 6px;
          width: 88px; height: 88px; border: none;
          transition: width .45s cubic-bezier(0.4, 0, 0.2, 1), height .45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        #inst-head.scrolled .ih-logo img { width: 44px; height: 44px; top: 8px; }
        #inst-head .ih-logo sup {
          display: block; overflow: hidden; line-height: 22px; max-height: 44px; opacity: 1;
          font-weight: bold; font-style: normal; font-size: 14px; color: #fff;
          transition: max-height .35s ease, opacity .25s ease;
        }
        #inst-head .ih-logo sub {
          display: block; overflow: hidden; line-height: 18px; max-height: 18px; opacity: 1;
          font-weight: 500; font-size: 12px; font-style: italic; color: #F8F8F8;
          transition: max-height .35s ease, opacity .25s ease;
        }
        #inst-head.scrolled .ih-logo sup,
        #inst-head.scrolled .ih-logo sub { max-height: 0; opacity: 0; }

        #inst-head .ih-side {
          display: flex; align-items: center; gap: 4px;
          float: right; height: 100%;
        }
        #inst-head .ih-find { position: relative; padding: 6px 10px 0; }
        #inst-head .ih-find form {
          position: relative; overflow: hidden; display: block;
          border: 2px solid #62BB62;
        }
        #inst-head .ih-find input {
          display: block; outline: none; border: none;
          padding: 4px 38px 4px 5px; width: 240px; height: 28px;
          line-height: 20px; font-size: 14px;
          color: #E3E3E3; background: #3F4348;
          transition: all .25s ease;
        }
        #inst-head .ih-find input:focus { background: #EFEBE8; color: #232323; }
        #inst-head .ih-find button {
          position: absolute; display: block; outline: none; border: none;
          margin: auto 0; padding: 0 4px; top: 0; right: 0; bottom: 0;
          width: 32px; height: 100%; cursor: pointer; background: #62BB62;
        }
        #inst-head .ih-find svg { display: block; width: 24px; height: 24px; }
        #inst-head .ih-find path { fill: #fff; }

        #inst-head .ih-icon-btn {
          position: relative; display: block; height: 100%;
          padding: 10px 10px; cursor: pointer; outline: none; border: none;
          background: transparent; text-decoration: none;
        }
        #inst-head .ih-icon-btn svg { display: block; width: 24px; height: 24px; }
        #inst-head .ih-icon-btn path { fill: #B3B3B3; transition: fill .3s ease; }
        #inst-head .ih-icon-btn:hover path { fill: #FFFFFF; }
        #inst-head.scrolled .ih-icon-btn path { fill: #798089; }
        #inst-head.scrolled .ih-icon-btn:hover path { fill: #62BB62; }

        #inst-head .ih-lang { position: relative; padding: 10px; cursor: pointer; }
        #inst-head .ih-lang:hover { background: #F2F2F2; }
        #inst-head .ih-lang:hover svg path { fill: #475366; }
        #inst-head .ih-lang:hover .ih-lang-list { display: block; }
        #inst-head .ih-lang svg { display: block; width: 24px; height: 24px; fill: #B3B3B3; }
        #inst-head .ih-lang-list {
          position: absolute; display: none; z-index: 1;
          top: 100%; right: -2px; min-width: 160px;
          border: 0 solid #2E2E2E; border-width: 0 2px 2px;
          background: #F2F2F2; box-shadow: 0 2px 4px rgba(0,0,0,.2);
        }
        #inst-head .ih-lang-list a {
          display: block; padding: 10px 15px;
          font-size: 14px; color: #475366; text-decoration: none;
        }
        #inst-head .ih-lang-list a:hover { background: #FEFEFE; }

        /* ── Menú institucional ── */
        #inst-head .ih-menu {
          position: relative; display: block;
          width: 100%; height: 60px; background: #3E3E3E;
          transition: background .4s ease;
        }
        #inst-head.scrolled .ih-menu { background: #FFFFFF; }
        #inst-head .ih-menu .ih-wrap { display: flex; align-items: center; justify-content: flex-end; height: 100%; }
        #inst-head .ih-menu-toggle { display: none; }

        #inst-head .ih-knobs { display: flex; align-items: center; }
        #inst-head .ih-home a { display: block; padding: 12px 10px; }
        #inst-head .ih-home svg { display: block; width: 24px; height: 24px; }
        #inst-head .ih-home path { transition: all .3s ease; fill: #B3B3B3; }
        #inst-head .ih-home a:hover path { fill: #FFFFFF; }
        #inst-head.scrolled .ih-home path { fill: #798089; }
        #inst-head.scrolled .ih-home a:hover path { fill: #62BB62; }

        #inst-head .ih-hamburger { display: none; padding: 12px 10px; cursor: pointer; }
        #inst-head .ih-hamburger svg { display: block; width: 24px; height: 24px; fill: #B3B3B3; }

        #inst-head .ih-items { display: flex; }
        #inst-head .ih-items a {
          display: block; padding: 12px 10px;
          text-transform: uppercase; text-decoration: none;
          line-height: 36px; font-weight: 400; font-size: 14px;
          color: #B3B3B3; transition: all .3s ease; white-space: nowrap;
        }
        #inst-head .ih-items a:hover { color: #FFFFFF; }
        #inst-head.scrolled .ih-items a { color: #798089; }
        #inst-head.scrolled .ih-items a:hover { color: #62BB62; }

        @media (max-width: 768px) {
          #inst-head .ih-mark img { height: 28px; }
          #inst-head .ih-logo {
            top: 45px; left: 0; right: 0;
            width: 240px; height: 55px; margin: 0 auto;
            background: #3E3E3E;
          }
          #inst-head .ih-logo a { padding: 5px 10px 0 60px; }
          #inst-head .ih-logo img { top: 4px; width: 48px; height: 48px; }
          #inst-head .ih-logo sup, #inst-head .ih-logo sub { font-size: 10px !important; line-height: 14px; }
          #inst-head .ih-main { height: 100px; position: relative; }
          #inst-head .ih-side { float: none; justify-content: center; padding-top: 4px; }
          #inst-head .ih-icon-btn.ih-hide-mobile { display: none; }
          #inst-head .ih-menu { height: auto; }
          #inst-head .ih-menu .ih-wrap { display: block; padding: 0; width: 100%; }
          #inst-head .ih-knobs { justify-content: space-between; padding: 6px 10px; }
          #inst-head .ih-hamburger { display: block; }
          #inst-head .ih-items {
            display: none; flex-direction: column; width: 100%;
          }
          #inst-head .ih-menu-toggle:checked ~ .ih-items { display: flex; }
          #inst-head .ih-items a {
            padding: 14px 20px; color: #B3B3B3; background: #434343;
            border-top: 1px solid #535353;
          }
        }
      `}</style>

      <header id="inst-head" className={scrolled ? "scrolled" : ""}>
        <div className="ih-mark">
          <div className="ih-wrap">
            <a href="https://www.minambiente.gov.co" target="_blank" rel="noopener noreferrer">
              <img src="/assets/gov/life.png" alt="Ministerio de Ambiente y Desarrollo Sostenible" width={110} height={36} />
            </a>
            <a href="https://www.gov.co" target="_blank" rel="noopener noreferrer">
              <img src="/assets/gov/mark.svg" alt="GOV.CO" width={110} height={36} />
            </a>
          </div>
        </div>

        <div className="ih-main">
          <div className="ih-wrap">
            <div className="ih-logo">
              <a href="/">
                <img src="/assets/gov/logo.png" alt="IIAP" width={88} height={88} />
                <sup>Instituto de Investigaciones Ambientales del Pacífico</sup>
                <sub>John Von Neumann</sub>
              </a>
            </div>
            <div className="ih-side">
              <div className="ih-find">
                <form method="post" action={`${REAL_SITE}/buscar`} autoComplete="off">
                  <input type="text" name="text" placeholder="Buscar..." aria-label="Buscar en iiap.org.co" />
                  <button type="submit" aria-label="Buscar">
                    <svg viewBox="0 0 24 24"><path d="M9.516 14.016c2.484 0 4.5-2.016 4.5-4.5s-2.016-4.5-4.5-4.5-4.5 2.016-4.5 4.5 2.016 4.5 4.5 4.5zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281c-1.125 0.984-2.625 1.547-4.219 1.547-3.609 0-6.516-2.859-6.516-6.469s2.906-6.516 6.516-6.516 6.469 2.906 6.469 6.516c0 1.594-0.563 3.094-1.547 4.219l0.281 0.281h0.797z" /></svg>
                  </button>
                </form>
              </div>
              <button
                type="button"
                className="ih-icon-btn ih-hide-mobile"
                aria-label="Disminuir tamaño de texto"
                onClick={() => applyZoom(-ZOOM_STEP)}
              >
                <svg viewBox="0 0 24 24"><path d="M5.12,14L7.5,7.67L9.87,14M6.5,5L1,19H3.25L4.37,16H10.62L11.75,19H14L8.5,5H6.5M18,17L23,11.93L21.59,10.5L19,13.1V7H17V13.1L14.41,10.5L13,11.93L18,17Z" /></svg>
              </button>
              <button
                type="button"
                className="ih-icon-btn ih-hide-mobile"
                aria-label="Aumentar tamaño de texto"
                onClick={() => applyZoom(ZOOM_STEP)}
              >
                <svg viewBox="0 0 24 24"><path d="M5.12,14L7.5,7.67L9.87,14M6.5,5L1,19H3.25L4.37,16H10.62L11.75,19H14L8.5,5H6.5M18,7L13,12.07L14.41,13.5L17,10.9V17H19V10.9L21.59,13.5L23,12.07L18,7Z" /></svg>
              </button>
              <a href={SIGN_URL} className="ih-icon-btn" aria-label="Iniciar sesión">
                <svg viewBox="0 0 24 24"><path d="M12 14.016c2.672 0 8.016 1.313 8.016 3.984v2.016h-16.031v-2.016c0-2.672 5.344-3.984 8.016-3.984zM12 12c-2.203 0-3.984-1.781-3.984-3.984s1.781-4.031 3.984-4.031 3.984 1.828 3.984 4.031-1.781 3.984-3.984 3.984z" /></svg>
              </a>
              <label className="ih-lang">
                <svg viewBox="0 0 24 24"><path d="M16.359 14.016h3.375c0.141-0.656 0.281-1.313 0.281-2.016s-0.141-1.359-0.281-2.016h-3.375c0.094 0.656 0.141 1.313 0.141 2.016s-0.047 1.359-0.141 2.016zM14.578 19.547c1.828-0.609 3.422-1.922 4.359-3.563h-2.953c-0.328 1.266-0.797 2.438-1.406 3.563zM14.344 14.016c0.094-0.656 0.141-1.313 0.141-2.016s-0.047-1.359-0.141-2.016h-4.688c-0.094 0.656-0.141 1.313-0.141 2.016s0.047 1.359 0.141 2.016h4.688zM12 19.969c0.844-1.219 1.5-2.531 1.922-3.984h-3.844c0.422 1.453 1.078 2.766 1.922 3.984zM8.016 8.016c0.328-1.266 0.797-2.438 1.406-3.563-1.828 0.609-3.422 1.922-4.359 3.563h2.953zM5.063 15.984c0.938 1.641 2.531 2.953 4.359 3.563-0.609-1.125-1.078-2.297-1.406-3.563h-2.953zM4.266 14.016h3.375c-0.094-0.656-0.141-1.313-0.141-2.016s0.047-1.359 0.141-2.016h-3.375c-0.141 0.656-0.281 1.313-0.281 2.016s0.141 1.359 0.281 2.016zM12 4.031c-0.844 1.219-1.5 2.531-1.922 3.984h3.844c-0.422-1.453-1.078-2.766-1.922-3.984zM18.938 8.016c-0.938-1.641-2.531-2.953-4.359-3.563 0.609 1.125 1.078 2.297 1.406 3.563h2.953zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984z" /></svg>
                <div className="ih-lang-list">
                  <a href={`${REAL_SITE}/es`}>Español</a>
                  <a href={`${REAL_SITE}/en`}>English</a>
                </div>
              </label>
            </div>
          </div>
        </div>

        <nav className="ih-menu" aria-label="Menú institucional">
          <div className="ih-wrap">
            <input type="checkbox" id="ih-menu-toggle" className="ih-menu-toggle" />
            <div className="ih-knobs">
              <div className="ih-home">
                <a href="/" aria-label="Inicio del portal">
                  <svg viewBox="0 0 24 24"><path d="M22.347 13.585l-10.347-8.031-10.347 8.031v-3.274l10.347-8.031 10.347 8.031zM19.76 13.293v7.76h-5.173v-5.173h-5.173v5.173h-5.173v-7.76l7.76-5.82z" /></svg>
                </a>
              </div>
              <label htmlFor="ih-menu-toggle" className="ih-hamburger" aria-label="Abrir menú">
                <svg viewBox="0 0 24 24"><path d="M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z" /></svg>
              </label>
            </div>
            <div className="ih-items">
              {MENU_ITEMS.map(({ href, label }) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
