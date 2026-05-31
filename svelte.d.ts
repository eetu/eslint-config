import type { Linter } from "eslint";

/**
 * Svelte + SvelteKit flat config factory. Pass your imported
 * `svelte.config.js` so the parser and kit-aware rules resolve correctly.
 */
declare function svelteConfig(kitConfig?: unknown): Linter.Config[];
export default svelteConfig;
