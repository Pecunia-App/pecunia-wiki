# Formatting

On utilise ici un formatter en adéquation avec la convention de Google avec 'google-java-format'.

```yaml
name: CI - Format with Google Java Format
permissions:
  contents: write

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
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          # Pour les push events, utiliser la branche actuelle
          ref: ${{ github.event_name == 'push' && github.ref || github.head_ref }}
      - uses: axel-op/googlejavaformat-action@v4
        with:
          args: "--replace"
          commit-message: "style(ci): format"
          github-token: ${{ secrets.GITHUB_TOKEN }}```
