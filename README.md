# eslint-config

Unified ESLint configuration for Node and React TypeScript projects.

## Features

- **Node configuration**: Base TypeScript ESLint setup with import sorting and unused imports detection
- **React configuration**: Extends Node config with React, React Hooks, and React Refresh support
- Modern ESLint flat config format
- Prettier integration included

## Install

```bash
yarn add -D eslint-config@github:eetu/eslint-config eslint typescript typescript-eslint
```

## Usage

### For Node projects

Create `eslint.config.js`:

```javascript
import config from "eslint-config";
// or
import config from "eslint-config/node";

export default config;
```

### For React projects

Create `eslint.config.js`:

```javascript
import reactConfig from "eslint-config/react";

export default reactConfig;
```

### Custom configuration

You can extend the configs with your own rules:

```javascript
import nodeConfig from "eslint-config/node";

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
