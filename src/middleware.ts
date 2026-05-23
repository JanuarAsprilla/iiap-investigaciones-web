import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Generates a per-request nonce and sets the Content-Security-Policy header.
 *
 * Why middleware instead of next.config.ts headers:
 *   Next.js App Router injects inline <script> tags for hydration and RSC payloads.
 *   These cannot be hashed (they change per request) so we need a per-request nonce.
 *   Next.js reads the `x-nonce` request header set here and adds `nonce="…"` to its
 *   own generated scripts automatically, so no layout changes are required.
 *
 * Dev vs Prod:
 *   - Dev:  'unsafe-eval' is kept for webpack source-map eval(); nonce still required.
 *   - Prod: 'strict-dynamic' propagates trust from nonced scripts to dynamically
 *           loaded children, removing the need to enumerate every CDN entry point.
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  const cspHeader = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "frame-src https://www.youtube.com",
    isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; ");

  // Forward nonce to Server Components via request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Apply CSP to the actual HTTP response
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    {
      // Apply to all routes except static assets that don't need CSP
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
