# Linting

Avec Checkstyle, nous vérifions d'abord avec la commande `mvn checkstyle:check` si il y a des violations de notre convention de code, qui suit celle mis en place par Google.

Ensuite, nous créons un reporting via `mvn checkstyle:checkstyle`.

```yaml
name: CI - Lint with Checkstyle

on:
  pull_request:
    branches: [dev, main]
  push:
    branches: [dev, main]
jobs:
  checkstyle:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: "21"
          distribution: "temurin"
          cache: maven
      - name: Run Checkstyle
        run: mvn checkstyle:check
      - name: Generate report
        run: mvn checkstyle:checkstyle
      - name: Upload Checkstyle report
        uses: actions/upload-artifact@v4
        with:
          name: checkstyle-report
          path: target/checkstyle/*
          retention-days: 15
```
