# Formatting

On utilise ici un formatter en adéquation avec la convention de Google avec 'google-java-format'.

```yaml
name: CI - Format with Google Java Format

on:
  pull_request:
    branches: [dev, main]
  push:
    branches: [dev, main]

jobs:
  formatting:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: axel-op/googlejavaformat-action@v4
        with:
          args: "--skip-sorting-imports --replace"
```
