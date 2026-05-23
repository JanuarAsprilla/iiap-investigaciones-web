import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix workspace root detection when home dir has a package-lock.json
  outputFileTracingRoot: path.join(__dirname),
  // Security headers and CSP are handled centrally in src/middleware.ts
};

export default nextConfig;
