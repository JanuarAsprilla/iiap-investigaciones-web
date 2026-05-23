import { defineConfig, globalIgnores } from "eslint/config";

// eslint-config-next exports a flat config array
const eslintConfig = defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
