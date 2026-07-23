import type { NextConfig } from "next";
import path from "path";

// Subruta donde se integra el portal dentro del sitio institucional.
// Producción real: NEXT_PUBLIC_BASE_PATH="/investigacion".
// Preview de Render / desarrollo: sin definir → se sirve en la raíz.
// Debe coincidir con BASE_PATH en src/lib/site.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

// Bundle 100% estático (carpeta `out/`) para entregar al área de sistemas.
// Se activa SOLO con NEXT_STATIC_EXPORT=true; el build normal (Node/Render)
// permanece intacto. En estático las imágenes van sin optimizar (no hay
// servidor de imágenes) y los headers de seguridad se aplican en el hosting.
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Fix workspace root detection when home dir has a package-lock.json
  outputFileTracingRoot: path.join(__dirname),
  // Monta la app bajo la subruta cuando se define (p. ej. /investigacion).
  // Next prefija automáticamente <Link>, next/image y los assets de /_next.
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // `trailingSlash` genera carpetas con index.html (p. ej. /centros/index.html),
  // que resuelven en cualquier servidor estático sin reglas de reescritura.
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  // Security headers and CSP are handled centrally in src/middleware.ts
  images: {
    // En export estático no hay optimizador de imágenes en tiempo de ejecución.
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
