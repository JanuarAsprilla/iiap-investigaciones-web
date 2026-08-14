import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// No nonce: the app is statically generated, so script tags are baked into
// the pre-built HTML at build time and a per-request nonce would never match
// them. 'unsafe-inline' is required because Next.js injects inline RSC/
// hydration scripts that can't be hashed at build time.
export function middleware(request: NextRequest) {
  // Sanity Studio manages its own CSP
  if (request.nextUrl.pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    // 'unsafe-eval' only in dev, for webpack source maps
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
