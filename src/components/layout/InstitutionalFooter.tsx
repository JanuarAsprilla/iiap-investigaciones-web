"use client";

/**
 * InstitutionalFooter — Clon fiel del footer de https://iiap.org.co/.
 *
 * Reproduce el bloque de contacto/enlaces/suscripción, la franja gov.co
 * (Colombia.co + GOV.CO, distinta de la del header) y el panel legal.
 * Enlaces institucionales sin ruta local (mapa del sitio, términos,
 * protección de datos, suscripción) son absolutos a iiap.org.co.
 *
 * Se omite el crédito "Powered by Bontris" del sitio real: es el CMS
 * propietario del sitio original, no aplica a este stack Next.js.
 */

const REAL_SITE = "https://iiap.org.co";

const ENLACES = [
  { href: "http://humboldt.org.co", label: "Instituto Humboldt" },
  { href: "http://sinchi.org.co", label: "Instituto Sinchi" },
  { href: "http://invemar.org.co", label: "Instituto Invemar" },
  { href: "http://sibcolombia.net", label: "SIB Colombia" },
];

const REDES = [
  {
    className: "facebook", href: "https://facebook.com/IIAPCO", label: "Facebook",
    viewBox: "0 0 32 32",
    path: "M31.997 15.999c0-8.836-7.163-15.999-15.999-15.999s-15.999 7.163-15.999 15.999c0 7.985 5.851 14.604 13.499 15.804v-11.18h-4.062v-4.625h4.062v-3.525c0-4.010 2.389-6.225 6.043-6.225 1.75 0 3.581 0.313 3.581 0.313v3.937h-2.017c-1.987 0-2.607 1.233-2.607 2.498v3.001h4.437l-0.709 4.625h-3.728v11.18c7.649-1.2 13.499-7.819 13.499-15.804z",
  },
  {
    className: "instagram", href: "https://www.instagram.com/iiap_col?igsh=NHc5MmxoNWwwb2lq", label: "Instagram",
    viewBox: "0 0 32 32",
    path: "M16 0c-4.347 0-4.889 0.020-6.596 0.096-1.704 0.080-2.864 0.348-3.884 0.744-1.052 0.408-1.945 0.956-2.835 1.845s-1.439 1.781-1.845 2.835c-0.396 1.020-0.665 2.18-0.744 3.884-0.080 1.707-0.096 2.249-0.096 6.596s0.020 4.889 0.096 6.596c0.080 1.703 0.348 2.864 0.744 3.884 0.408 1.051 0.956 1.945 1.845 2.835 0.889 0.888 1.781 1.439 2.835 1.845 1.021 0.395 2.181 0.665 3.884 0.744 1.707 0.080 2.249 0.096 6.596 0.096s4.889-0.020 6.596-0.096c1.703-0.080 2.864-0.349 3.884-0.744 1.051-0.408 1.945-0.957 2.835-1.845 0.888-0.889 1.439-1.78 1.845-2.835 0.395-1.020 0.665-2.181 0.744-3.884 0.080-1.707 0.096-2.249 0.096-6.596s-0.020-4.889-0.096-6.596c-0.080-1.703-0.349-2.865-0.744-3.884-0.408-1.052-0.957-1.945-1.845-2.835-0.889-0.889-1.78-1.439-2.835-1.845-1.020-0.396-2.181-0.665-3.884-0.744-1.707-0.080-2.249-0.096-6.596-0.096zM16 2.88c4.271 0 4.78 0.021 6.467 0.095 1.56 0.073 2.407 0.332 2.969 0.553 0.749 0.289 1.28 0.636 1.843 1.195 0.559 0.56 0.905 1.092 1.195 1.841 0.219 0.563 0.48 1.409 0.551 2.969 0.076 1.688 0.093 2.195 0.093 6.467s-0.020 4.78-0.099 6.467c-0.081 1.56-0.341 2.407-0.561 2.969-0.299 0.749-0.639 1.28-1.199 1.843-0.559 0.559-1.099 0.905-1.84 1.195-0.56 0.219-1.42 0.48-2.98 0.551-1.699 0.076-2.199 0.093-6.479 0.093-4.281 0-4.781-0.020-6.479-0.099-1.561-0.081-2.421-0.341-2.981-0.561-0.759-0.299-1.28-0.639-1.839-1.199-0.561-0.559-0.92-1.099-1.2-1.84-0.22-0.56-0.479-1.42-0.56-2.98-0.060-1.68-0.081-2.199-0.081-6.459 0-4.261 0.021-4.781 0.081-6.481 0.081-1.56 0.34-2.419 0.56-2.979 0.28-0.76 0.639-1.28 1.2-1.841 0.559-0.559 1.080-0.919 1.839-1.197 0.56-0.221 1.401-0.481 2.961-0.561 1.7-0.060 2.2-0.080 6.479-0.080zM16 7.784c-4.54 0-8.216 3.68-8.216 8.216 0 4.54 3.68 8.216 8.216 8.216 4.54 0 8.216-3.68 8.216-8.216 0-4.54-3.68-8.216-8.216-8.216zM16 21.333c-2.947 0-5.333-2.387-5.333-5.333s2.387-5.333 5.333-5.333 5.333 2.387 5.333 5.333-2.387 5.333-5.333 5.333zM26.461 7.46c0 1.060-0.861 1.92-1.92 1.92-1.060 0-1.92-0.861-1.92-1.92s0.861-1.919 1.92-1.919c1.057-0.001 1.92 0.86 1.92 1.919z",
  },
  {
    className: "tiktok", href: "https://www.tiktok.com/@iiapcolombia?_t=ZS-8vMfeQBmRLV&_r=1", label: "TikTok",
    viewBox: "0 0 32 32",
    path: "M16.707 0.027c1.747-0.027 3.48-0.013 5.213-0.027 0.107 2.040 0.84 4.12 2.333 5.56 1.493 1.48 3.6 2.16 5.653 2.387v5.373c-1.92-0.067-3.853-0.467-5.6-1.293-0.76-0.347-1.467-0.787-2.16-1.24-0.013 3.893 0.013 7.787-0.027 11.667-0.107 1.867-0.72 3.72-1.8 5.253-1.747 2.56-4.773 4.227-7.88 4.28-1.907 0.107-3.813-0.413-5.44-1.373-2.693-1.587-4.587-4.493-4.867-7.613-0.027-0.667-0.040-1.333-0.013-1.987 0.24-2.533 1.493-4.96 3.44-6.613 2.213-1.92 5.307-2.84 8.2-2.293 0.027 1.973-0.053 3.947-0.053 5.92-1.32-0.427-2.867-0.307-4.027 0.493-0.84 0.547-1.48 1.387-1.813 2.333-0.28 0.68-0.2 1.427-0.187 2.147 0.32 2.187 2.427 4.027 4.667 3.827 1.493-0.013 2.92-0.88 3.693-2.147 0.253-0.44 0.533-0.893 0.547-1.413 0.133-2.387 0.080-4.76 0.093-7.147 0.013-5.373-0.013-10.733 0.027-16.093z",
  },
  {
    className: "spotify", href: "https://open.spotify.com/user/31plbjolzlfec7pjx6qcqejxwsua?si=bzm2GXamQ4acEI8R3_vYNg", label: "Spotify",
    viewBox: "0 0 27 32",
    path: "M20.125 21.607c0-0.5-0.196-0.696-0.536-0.911-2.304-1.375-4.982-2.054-7.982-2.054-1.75 0-3.429 0.232-5.125 0.607-0.411 0.089-0.75 0.357-0.75 0.929 0 0.446 0.339 0.875 0.875 0.875 0.161 0 0.446-0.089 0.661-0.143 1.393-0.286 2.857-0.482 4.339-0.482 2.625 0 5.107 0.643 7.089 1.839 0.214 0.125 0.357 0.196 0.589 0.196 0.446 0 0.839-0.357 0.839-0.857zM21.839 17.768c0-0.482-0.179-0.821-0.625-1.089-2.732-1.625-6.196-2.518-9.786-2.518-2.304 0-3.875 0.321-5.411 0.75-0.571 0.161-0.857 0.554-0.857 1.143s0.482 1.071 1.071 1.071c0.25 0 0.393-0.071 0.661-0.143 1.25-0.339 2.75-0.589 4.482-0.589 3.393 0 6.482 0.893 8.714 2.214 0.196 0.107 0.393 0.232 0.679 0.232 0.607 0 1.071-0.482 1.071-1.071zM23.768 13.339c0-0.661-0.286-1-0.714-1.25-3.089-1.804-7.321-2.643-11.357-2.643-2.375 0-4.554 0.268-6.5 0.839-0.5 0.143-0.964 0.571-0.964 1.321 0 0.732 0.554 1.304 1.286 1.304 0.268 0 0.518-0.089 0.714-0.143 1.732-0.482 3.607-0.661 5.482-0.661 3.714 0 7.571 0.821 10.054 2.304 0.25 0.143 0.429 0.214 0.714 0.214 0.679 0 1.286-0.536 1.286-1.286zM27.429 16c0 7.571-6.143 13.714-13.714 13.714s-13.714-6.143-13.714-13.714 6.143-13.714 13.714-13.714 13.714 6.143 13.714 13.714z",
  },
  {
    className: "twitter", href: "https://twitter.com/iiap_co", label: "X",
    viewBox: "0 0 32 32",
    path: "M24.325 3h4.411l-9.636 11.013 11.336 14.987h-8.876l-6.952-9.089-7.955 9.089h-4.413l10.307-11.78-10.875-14.22h9.101l6.284 8.308zM22.777 26.36h2.444l-15.776-20.859h-2.623z",
  },
  {
    className: "youtube", href: "https://youtube.com/channel/UCuxOL0BAHcc_AqXHTH4Vaiw", label: "Youtube",
    viewBox: "0 0 32 32",
    path: "M31.327 8.273c-0.386-1.353-1.431-2.398-2.756-2.777l-0.028-0.007c-2.493-0.668-12.528-0.668-12.528-0.668s-10.009-0.013-12.528 0.668c-1.353 0.386-2.398 1.431-2.777 2.756l-0.007 0.028c-0.443 2.281-0.696 4.903-0.696 7.585 0 0.054 0 0.109 0 0.163l-0-0.008c-0 0.037-0 0.082-0 0.126 0 2.682 0.253 5.304 0.737 7.845l-0.041-0.26c0.386 1.353 1.431 2.398 2.756 2.777l0.028 0.007c2.491 0.669 12.528 0.669 12.528 0.669s10.008 0 12.528-0.669c1.353-0.386 2.398-1.431 2.777-2.756l0.007-0.028c0.425-2.233 0.668-4.803 0.668-7.429 0-0.099-0-0.198-0.001-0.297l0 0.015c0.001-0.092 0.001-0.201 0.001-0.31 0-2.626-0.243-5.196-0.708-7.687l0.040 0.258zM12.812 20.801v-9.591l8.352 4.803z",
  },
  {
    className: "feed", href: `${REAL_SITE}/feed`, label: "Feeds",
    viewBox: "0 0 32 32",
    path: "M25.599 32c0-14.044-11.555-25.6-25.599-25.6v-6.4c17.553 0 32 14.447 32 32zM4.388 23.22c2.419 0 4.391 1.972 4.391 4.393 0 2.417-1.98 4.387-4.401 4.387-2.417 0-4.377-1.965-4.377-4.387s1.967-4.392 4.388-4.393zM21.212 32h-6.22c0-8.225-6.767-14.993-14.992-14.993v-6.22c11.636 0 21.212 9.579 21.212 21.213z",
  },
];

const LEGALES = [
  { href: "/", label: "Inicio" },
  { href: `${REAL_SITE}/mapa`, label: "Mapa del sitio" },
  { href: `${REAL_SITE}/terminos`, label: "Terminos" },
  { href: `${REAL_SITE}/proteccion`, label: "Protección de datos personales" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function InstitutionalFooter() {
  return (
    <>
      <style>{`
        #inst-foot {
          font-family: var(--font-lato), Lato, arial, sans-serif;
          position: relative; display: block; width: 100%;
          background: #2B2B2B;
        }
        #inst-foot:before {
          content: ""; position: absolute; top: 0; left: 0;
          width: 100%; height: 2px; background: #62BB62;
        }
        #inst-foot .if-wrap {
          overflow: hidden; display: block; margin: 0 auto;
          padding: 40px 10px 30px; min-width: 300px; max-width: 1600px; width: 90%;
        }
        #inst-foot .if-grid { display: flex; flex-wrap: wrap; margin: 0 -10px; }
        #inst-foot .if-item { padding: 0 10px; width: 40%; box-sizing: border-box; }
        #inst-foot .if-item + .if-item { width: 30%; }

        #inst-foot .if-label {
          position: relative; display: block; margin: 0; padding: 10px 0 30px;
          text-transform: uppercase; font-weight: bold; font-size: 14px; color: #F2F2F2;
        }
        #inst-foot .if-label:before {
          content: ""; position: absolute; bottom: 15px; left: 0; width: 40px; height: 2px; background: #62BB62;
        }
        #inst-foot .if-label:after {
          content: ""; position: absolute; bottom: 15px; left: 45px; width: 25px; height: 2px; background: #B2B2B2;
        }

        #inst-foot .if-about-name { display: block; margin: 0; font-weight: bold; font-style: italic; font-size: 26px; color: #62BB62; text-decoration: none; }
        #inst-foot .if-about-name b { color: #FFFFFF; }
        #inst-foot .if-about-sub { display: block; margin: 0; line-height: 22px; font-weight: 500; font-style: italic; font-size: 16px; color: #FFFFFF; }
        #inst-foot .if-about-desc { display: block; margin: 0; padding: 5px 0 20px; line-height: 20px; font-size: 14px; color: #B2B2B2; }

        #inst-foot .if-contact-list { position: relative; display: block; margin: -5px 0; padding: 0; list-style: none; }
        #inst-foot .if-contact-list li {
          position: relative; overflow: hidden; display: block; margin: 0;
          padding: 0 0 5px 44px; min-height: 34px; font-size: 14px; color: #B2B2B2;
        }
        #inst-foot .if-contact-list li:before {
          content: ""; position: absolute; top: 0; left: 0; width: 34px; height: 34px; background: #333333;
        }
        #inst-foot .if-contact-list li:after {
          content: ""; position: absolute; top: 5px; left: 5px; width: 24px; height: 24px;
          background: url(/assets/gov/contact.png) no-repeat;
        }
        #inst-foot .if-contact-list li.address:after { background-position: 0 0; }
        #inst-foot .if-contact-list li.phone:after { background-position: 0 -24px; }
        #inst-foot .if-contact-list li.mail:after { background-position: 0 -48px; }
        #inst-foot .if-contact-list b { overflow: hidden; display: block; color: #FFFFFF; text-transform: uppercase; line-height: 14px; font-size: 10px; }
        #inst-foot .if-contact-list p { overflow: hidden; display: block; margin: 0; padding: 7px 0; }
        #inst-foot .if-contact-list a { line-height: 22px; color: inherit; text-decoration: none; }
        #inst-foot .if-contact-list a:hover { color: #FFFFFF; }

        #inst-foot .if-links-list { margin: 0; padding: 0; list-style: none; }
        #inst-foot .if-links-list li { position: relative; padding: 5px 0; }
        #inst-foot .if-links-list a {
          position: relative; display: block; padding: 0 0 0 20px; font-size: 14px; color: #B2B2B2; text-decoration: none;
        }
        #inst-foot .if-links-list a:before {
          content: ""; position: absolute; top: 0; left: 0; bottom: 0; width: 10px; height: 10px; margin: auto 0; background: #929292;
        }
        #inst-foot .if-links-list a:hover { color: #FFFFFF; }
        #inst-foot .if-links-list a:hover:before { background: #FFFFFF; }

        #inst-foot .if-touch-desc { display: block; margin: 0; padding: 5px 0; line-height: 20px; font-size: 14px; color: #B2B2B2; }
        #inst-foot .if-touch-form { position: relative; overflow: hidden; display: block; margin: 0; }
        #inst-foot .if-touch-form:after {
          content: ""; position: absolute; top: 16px; right: 10px; width: 24px; height: 24px;
          background: url(/assets/gov/send.svg);
        }
        #inst-foot .if-touch-form input {
          transition: all .25s ease; position: relative; display: block; outline: none;
          margin: 10px 0; padding: 8px 39px 8px 10px; width: 100%; height: 36px; box-sizing: border-box;
          font-size: 14px; color: #FFFFFF; background: none; border: 2px solid #444546;
        }
        #inst-foot .if-touch-form input:focus { border-color: #62BB62; }
        #inst-foot .if-touch-form button {
          transition: all .25s ease; display: block; outline: none;
          margin: 10px 0; padding: 8px 10px; width: 100%;
          text-transform: uppercase; font-weight: 600; font-size: 14px;
          border: 2px solid #62BB62; background: #62BB62; color: #FFFFFF; cursor: pointer;
        }
        #inst-foot .if-touch-form button:hover { background: transparent; color: #62BB62; }

        #inst-foot .if-touch-h3 { display: block; margin: 0; padding: 10px 0; text-transform: uppercase; font-weight: 500; font-size: 14px; color: #B2B2B2; }
        #inst-foot .if-social { overflow: hidden; display: flex; gap: 10px; list-style: none; margin: 0; padding: 0; }
        #inst-foot .if-social a {
          transition: all .25s ease; position: relative; display: block;
          width: 38px; height: 38px; background: #333333; border-radius: 2px;
        }
        #inst-foot .if-social svg { position: absolute; inset: 0; margin: auto; width: 20px; height: 20px; fill: #FFFFFF; }
        #inst-foot .if-social a.facebook:hover { background: #1877F2; }
        #inst-foot .if-social a.instagram:hover { background: #E4405F; }
        #inst-foot .if-social a.tiktok:hover { background: #FE2C55; }
        #inst-foot .if-social a.spotify:hover { background: #4CB564; }
        #inst-foot .if-social a.twitter:hover { background: #1D9BF0; }
        #inst-foot .if-social a.youtube:hover { background: #CC181E; }
        #inst-foot .if-social a.feed:hover { background: #FD9F13; }

        #inst-foot .if-mark { display: block; padding: 8px 0; width: 100%; background: #36C; }
        #inst-foot .if-mark .if-wrap { padding: 0 10px; overflow: hidden; }
        #inst-foot .if-mark a { position: relative; display: block; float: left; margin: 0 16px 0 0; }
        #inst-foot .if-mark img { display: block; border: none; width: auto; height: 36px; }

        #inst-foot .if-panel { position: relative; overflow: hidden; display: block; background: #232323; }
        #inst-foot .if-panel .if-wrap {
          overflow: hidden; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
          margin: 0 auto; padding: 0 10px;
        }
        #inst-foot .if-legal { display: flex; flex-wrap: wrap; gap: 0 16px; padding: 20px 0; margin: 0; }
        #inst-foot .if-legal a { text-transform: uppercase; text-decoration: none; font-size: 14px; color: #727272; }
        #inst-foot .if-legal a:hover { color: #62BB62; }

        #inst-foot .if-side { display: flex; align-items: center; gap: 12px; padding: 10px 50px 10px 0; }
        #inst-foot .if-copyright { display: block; font-size: 12px; line-height: 20px; color: #727272; }
        #inst-foot .if-powered { display: block; font-weight: bold; font-size: 11px; line-height: 15px; color: #727272; }
        #inst-foot .if-powered a { color: inherit; text-decoration: none; }
        #inst-foot .if-powered a:hover { color: #62BB62; }
        #inst-foot .if-top-btn {
          transition: all .25s ease; position: relative; display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; background: #62BB62; border: none; cursor: pointer; border-radius: 2px;
        }
        #inst-foot .if-top-btn:hover { background: #3BB549; }
        #inst-foot .if-top-btn svg { width: 20px; height: 20px; fill: #FFFFFF; }

        @media (max-width: 768px) {
          #inst-foot .if-wrap { padding: 20px 10px; width: 100%; }
          #inst-foot .if-item, #inst-foot .if-item + .if-item { width: 100%; }
          #inst-foot .if-grid { display: block; }
          #inst-foot .if-panel .if-wrap { display: block; padding: 10px 0; }
          #inst-foot .if-legal { padding: 5px 0; }
          #inst-foot .if-side { padding: 5px 0; }
        }
      `}</style>

      <footer id="inst-foot">
        <div className="if-main">
          <div className="if-wrap">
            <div className="if-grid">
              <div className="if-item">
                <div className="if-about">
                  <a href="/nosotros" className="if-about-name">Acerca de <b>IIAP</b></a>
                  <p className="if-about-sub">John Von Neumann</p>
                  <p className="if-about-desc">
                    El Instituto de Investigaciones Ambientales del Pacífico brinda apoyo
                    científico, tecnológico y de conocimiento a las comunidades asentadas
                    en el Chocó Biogeográfico, al SINA y MADS.
                  </p>
                  <ul className="if-contact-list">
                    <li className="phone" title="Teléfono">
                      <p>
                        <a href="tel:+5746709126">+57 (4) 670 9126</a>, <a href="tel:+573122888110">+57 312 288 8110</a>
                      </p>
                    </li>
                    <li className="mail" title="Correo">
                      <b>Contáctenos</b>
                      <a href="mailto:iiap@iiap.org.co">iiap@iiap.org.co</a>
                    </li>
                    <li className="mail" title="Correo">
                      <b>Notificaciones Judiciales</b>
                      <a href="mailto:notificacionesjudiciales@iiap.org.co">notificacionesjudiciales@iiap.org.co</a>
                    </li>
                    <li className="address" title="Dirección">
                      <p>Cra 7 No 29 - 57 B/César Conto, Quibdó - Chocó</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="if-item">
                <span className="if-label">Enlaces</span>
                <ul className="if-links-list">
                  {ENLACES.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="if-item">
                <span className="if-label">Suscríbete</span>
                <p className="if-touch-desc">
                  Suscríbite y recibirás información actualizada de todas nuestras actividades.
                </p>
                <form className="if-touch-form" method="POST" action={`${REAL_SITE}/subscribe`} autoComplete="off">
                  <input type="email" name="mail" placeholder="Tu correo electrónico" aria-label="Correo electrónico" />
                  <button type="submit">Suscribir</button>
                </form>
                <span className="if-touch-h3">Síguenos</span>
                <ul className="if-social">
                  {REDES.map(({ className, href, label, viewBox, path }) => (
                    <li key={className}>
                      <a className={className} href={href} title={label} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <svg viewBox={viewBox}><path d={path} /></svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="if-panel">
          <div className="if-wrap">
            <nav className="if-legal" aria-label="Enlaces legales">
              {LEGALES.map(({ href, label }) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </nav>
            <div className="if-side">
              <div>
                <strong className="if-copyright">Copyright © 2018 IIAP</strong>
                <small className="if-powered">
                  Powered by <a href="https://bontris.com" target="_blank" rel="noopener noreferrer">Bontris</a>
                </small>
              </div>
              <button className="if-top-btn" onClick={scrollToTop} aria-label="Volver arriba">
                <svg viewBox="0 0 24 24"><path d="M12 4l8 8-1.41 1.41L13 7.83V20h-2V7.83l-5.59 5.58L4 12z" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="if-mark">
          <div className="if-wrap">
            <a href="https://www.colombia.co" target="_blank" rel="noopener noreferrer">
              <img src="/assets/gov/pais.svg" alt="Colombia.co" width={110} height={36} />
            </a>
            <a href="https://www.gov.co" target="_blank" rel="noopener noreferrer">
              <img src="/assets/gov/mark.svg" alt="GOV.CO" width={110} height={36} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
