import { defineConfig } from "eslint/config";
import globals from "globals";

import nodeConfig from "./node.js";

// Plain browser projects (vanilla JS/TS, canvas, no framework): the node base
// (recommended + import-sort + unused-imports + prettier) plus browser globals
// so window/document/requestAnimationFrame/etc. don't trip no-undef.
export default defineConfig([
  ...nodeConfig,
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
