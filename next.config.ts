import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix workspace root detection when home dir has a package-lock.json
  outputFileTracingRoot: path.join(__dirname),

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // NOTE: Content-Security-Policy is intentionally NOT set here.
          // It is injected per-request by src/middleware.ts with a unique
          // nonce, which is required for Next.js App Router hydration scripts.
          // Setting it here would create duplicate CSP headers in production.
          { key: "X-Frame-Options",       value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
