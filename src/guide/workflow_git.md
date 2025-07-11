# 🔄 Workflow

## 1. Main Branch

- `main: Code de production`
- `dev: Branche d'intégration pour les nouvelles features`

## 2. Feature workflow

- Créez une branche : `git checkout -b feat/your-feature` depuis la branche `main`
- Poussez votre travail et ouvrez une pull request pour la branche `dev`
- Merge Rebase, si vous pouvez, après que 2 personnes ait validé votre travail

## Branching strategy schema

![Branching Strategy](images/schema_branching_strategy.png) 

### Commit Messages Conventions

#### Pourquoi utiliser une format de commit structuré ?

Un format de commit clair et cohérent améliorer la lisibilité, le suivi de l'historique et l'automatisation (par exemple, les changelogs, les notes de version, etc)

#### Conventionnal commit format

`<type>(<scope>): <message>`

##### 🔷 Type de commits 

| Type | Usages |
| :------: | :-----:|
| **feat** | Une nouvelle fonctionnalité. Corrélation avec MINOR dans SemVer |
| **fix** | Correction d'un bug. Corrélation avec PATCH dans SemVer |
| **docs** | Changements dans la documentation uniquement |
| **test** | Ajouter des tests manquants ou corriger des tests existants |
| **build** | Changements qui affectent le système de construction ou les dépendances externes (exemple : pip, docker, npm) |
| **refactor** | Une modification du code qui ne corrige pas un bogue et n'ajoute pas de fonctionnalité. |
| **style** | Changements qui n'affectent pas la signification du code (espaces blancs, formatage, points-virgules manquants, etc.) |
| **perf** | Une modification du code qui améliore les performances |
| **ci** | Modifications relatifs à la CI/CD|

#### 📌 Exemples

```git
feat(auth): add JWT authentication middlewares
fix(ui): resolve navbar rendering issue
build(angular): update angular17 to angular19
docs(readme): update installation guide
