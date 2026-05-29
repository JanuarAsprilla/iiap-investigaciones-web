import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: security headers only.
 *
 * ⚠️ WHY NO NONCE HERE:
 * This app uses static generation (○ SSG). The HTML is pre-built at build time
 * and served as static files. A per-request nonce injected here would never
 * match the script tags in the pre-built HTML — the browser would block them,
 * preventing React hydration and all client-side interactivity.
 *
 * CSP is configured in next.config.ts where it can be applied consistently
 * to the pre-built content. The 'unsafe-inline' allowance is required because
 * Next.js App Router injects inline scripts for RSC payload and hydration
 * bootstrapping that cannot be hashed at build time.
 *
 * If this app ever migrates to full SSR (force-dynamic), re-introduce nonces.
 */
export function middleware(request: NextRequest) {
  // Sanity Studio manages its own CSP — skip our headers there
  if (request.nextUrl.pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    // 'unsafe-inline' required for Next.js App Router SSG:
    //   __NEXT_DATA__, RSC bootstrap, and hydration scripts are inline.
    // 'unsafe-eval' only in dev (webpack source maps).
    isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: https://cdn.sanity.io",
    "font-src 'self'",
    "frame-src https://www.youtube.com",
    isDev
      ? "connect-src 'self' ws: wss: https://*.api.sanity.io https://cdn.sanity.io"
      : "connect-src 'self' https://*.api.sanity.io https://cdn.sanity.io",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
