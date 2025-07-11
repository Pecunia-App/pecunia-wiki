# Frontend

C'est un simple fichier qui réunit toutes les étapes :


```yaml
name: CI - Lint // Format // Test

on:
  pull_request:
    branches: [dev, main]
  push:
    branches: [dev, main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/Checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: latest

      - name: Install dependencies
        run: npm ci

      - name: Run unit test
        run: npm run test:ci

      - name: Format with prettier
        run: npm run format

      - name: Lint with eslint
        run: npm run lint

      - name: Build application
        run: npm run build
```

Cela verifie bien que notre application respecte :

- les conventions de code
- les tests automatisées passent au vert
- la compilation est ok
