import { defineConfig } from "eslint/config";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import tseslint from "typescript-eslint";

import nodeConfig from "./node.js";

/**
 * Svelte + SvelteKit (TypeScript-first) flat config, layered on the shared node
 * base (typescript-eslint + import sort + unused-imports + prettier).
 *
 * Unlike `./node` and `./react` (plain arrays), this is a factory: the SvelteKit
 * `svelte.config.js` must be threaded into the parser so kit-aware rules
 * (e.g. svelte/no-navigation-without-resolve) and alias resolution work. Usage:
 *
 *   // eslint.config.js
 *   import svelte from "@anarkisti/eslint-config/svelte";
 *   import svelteConfig from "./svelte.config.js";
 *   export default svelte(svelteConfig);
 *
 * Pass the imported svelte.config.js as the only argument. Formatting is left to
 * prettier (+ prettier-plugin-svelte); the trailing svelte prettier config turns
 * off the stylistic rules that would conflict.
 */
export default function svelteConfig(kitConfig) {
  return defineConfig([
    ...nodeConfig,
    ...svelte.configs.recommended,
    {
      languageOptions: {
        globals: { ...globals.browser },
      },
    },
    {
      // Parse <script lang="ts"> with the typescript-eslint parser inside the
      // svelte parser. No `projectService` — the node base uses the
      // non-type-checked ruleset, so this stays fast and tsconfig-free.
      files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
      languageOptions: {
        parserOptions: {
          parser: tseslint.parser,
          extraFileExtensions: [".svelte"],
          svelteConfig: kitConfig,
        },
      },
    },
    ...svelte.configs.prettier,
  ]);
}
