# @anarkisti/eslint-config

Unified ESLint configuration for Node, React, Svelte and plain web projects.

## Features

- **Node configuration**: Base TypeScript ESLint setup with import sorting and unused imports detection
- **React configuration**: Extends Node config with React, React Hooks, and React Refresh support
- **Svelte configuration**: Extends Node config with Svelte + SvelteKit support (TypeScript-first)
- **Web configuration**: Extends Node config with browser globals — for plain vanilla JS/TS (canvas, no framework)
- Modern ESLint flat config format
- Prettier integration included

## Install

```bash
yarn add -D @anarkisti/eslint-config eslint typescript typescript-eslint
```

## Usage

### For Node projects

Create `eslint.config.js`:

```javascript
import config from "@anarkisti/eslint-config";
// or
import config from "@anarkisti/eslint-config/node";

export default config;
```

### For React projects

Create `eslint.config.js`:

```javascript
import reactConfig from "@anarkisti/eslint-config/react";

export default reactConfig;
```

### For Svelte / SvelteKit projects

Unlike `node`/`react` (plain arrays), the Svelte config is a **factory** — pass
your imported `svelte.config.js` so the parser and SvelteKit-aware rules
(e.g. `svelte/no-navigation-without-resolve`) resolve correctly. Create
`eslint.config.js`:

```javascript
import svelte from "@anarkisti/eslint-config/svelte";

import svelteConfig from "./svelte.config.js";

export default svelte(svelteConfig);
```

Requires `svelte` (always present in a SvelteKit app) and, for formatting,
`prettier` + `prettier-plugin-svelte`. `typecheck` uses `svelte-check`, not
`tsc`.

### For plain web projects

Vanilla browser JS/TS with no framework (e.g. a `<canvas>` app). Same as `node`
plus browser globals, so `window`/`document`/`requestAnimationFrame` don't trip
`no-undef`. Create `eslint.config.js`:

```javascript
import webConfig from "@anarkisti/eslint-config/web";

export default webConfig;
```

### Custom configuration

You can extend the configs with your own rules:

```javascript
import nodeConfig from "@anarkisti/eslint-config/node";

export default [
  ...nodeConfig,
  {
    rules: {
      // Your custom rules
    },
  },
];
```

## Included plugins

### Node configuration
- `@eslint/js` - ESLint recommended rules
- `typescript-eslint` - TypeScript support
- `eslint-plugin-simple-import-sort` - Auto-sort imports
- `eslint-plugin-unused-imports` - Remove unused imports
- `eslint-config-prettier` - Prettier compatibility

### React configuration (includes all Node plugins plus)
- `eslint-plugin-react` - React specific rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-react-refresh` - React Refresh rules

### Svelte configuration (includes all Node plugins plus)
- `eslint-plugin-svelte` - Svelte + SvelteKit rules (recommended + prettier)
- `typescript-eslint` parser wired into `.svelte` `<script lang="ts">`

### Web configuration (includes all Node plugins plus)
- `globals` - browser globals (`window`, `document`, etc.) wired into `languageOptions`
