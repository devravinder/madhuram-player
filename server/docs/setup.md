# Setup

## Node-ts (Express) Setup

1. Install dependencies

  ```bash
     tsc --init
     pnpm init
     pnpm  add -D tsx typescript @types/node @types/express
     pnpm add express cors
  ```

1. update package.json

   ```js
    "main": "dist/server.js",
    "type": "module",
    "scripts": {
    "build": "tsc -p tsconfig.json",
    "dev": "tsx --no-warnings --env-file=.env --watch src/server.ts",
    "start": "node --no-warnings --env-file=.env dist/server.js"
           },

   ```
