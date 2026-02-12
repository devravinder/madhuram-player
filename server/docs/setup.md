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

## Firebase Setup

1. Install Firebase Tools

    ```bash
     pnpm add -g firebase-tools

    ```

2. Create Firebase Project
   - [Firebase](https://console.firebase.google.com/u/1/project/_/overview?purchaseBillingPlan=no-cost)

3. Authenticate (if needed)
  
   ```bash
     firebase login
    ```

4. Init Firebase Functions

   ```bash
      firebase init functions
   ```

   - Choose
      - ts functions
      - npm No ( as we are using pnpm )
      - eslint No

5. Refer the generated functions folder & do the changes in the project
   - see: pacakge.json scripts, packages, main, files & engines
   - src/index.ts
   - tsconfig.json
   - refer [Docs](https://firebase.google.com/docs/hosting/frameworks/express)
   - update package.json

     ```json
       "engines": {
            "node": "24"
         },
     ```

6. update the config
   - in firebase.json update sourece & pre-deploy scripts

   ```json
      "predeploy": ["npm run prestart:firebase:functions"],
      "source": "firebase-src"
   ```

7. add firebase-credentials.json file in the project root folder
    - to get this file visit, project overview > settings > service accounts > generate key

8. Deploy

    ```bash
    pnpm run deploy:functions
    ```
