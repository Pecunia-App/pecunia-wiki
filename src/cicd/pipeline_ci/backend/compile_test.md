# Compile and Test

On va voir si l'application compile et en même temps maven nous permet de lancer nos tests automatisées.

Si de ces deux outils est rouge, ca ne passe pas. La compilation doit passer ET les tests doit passer au vert.

```yaml
permissions:
  contents: read

name: CI - Build and Test
on:
  pull_request:
    branches: [dev, main]
  push:
    branches: [dev, main]

jobs:
  build-and-test:
    name: Build and Test Application
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set Up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: "21"
          distribution: "temurin"
          cache: maven
      - name: Build and Run Tests
        env:
          SPRING_PROFILES_ACTIVE: test
        run: ./mvnw clean test --batch-mode --no-transfer-progress
```
