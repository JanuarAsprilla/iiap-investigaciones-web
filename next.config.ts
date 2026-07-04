import type { NextConfig } from "next";
import path from "path";

// Subruta donde se integra el portal dentro del sitio institucional.
// Producción real: NEXT_PUBLIC_BASE_PATH="/investigacion".
// Preview de Render / desarrollo: sin definir → se sirve en la raíz.
// Debe coincidir con BASE_PATH en src/lib/site.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  // Fix workspace root detection when home dir has a package-lock.json
  outputFileTracingRoot: path.join(__dirname),
  // Monta la app bajo la subruta cuando se define (p. ej. /investigacion).
  // Next prefija automáticamente <Link>, next/image y los assets de /_next.
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Security headers and CSP are handled centrally in src/middleware.ts
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
