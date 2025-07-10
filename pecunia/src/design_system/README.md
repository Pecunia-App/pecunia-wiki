# Introduction

Ce wiki centralise toutes les conventions, tokens, outils SCSS ainsi que les composants UI de l'application

Ici, on peut trouver: 

- Toutes les couleurs, espacements et typos officielles (code + exemples) 
- Les mixins et outils SCSS réutilisables
- la documentation des composants UI ainsi que leurs propriétés et les bonnes pratiques d'accessibilité

## Objectif

Mettre en place une base SCSS pour avoir des styles cohérents et faciles à maintenir dans Angular 19. On utilise des "Design Tokens" (variables globales) pour que tout soit centralisé.

---

## 📁 Arborescence SCSS

```
src/
└── styles/
    ├── styles.scss                # Entrée globale Angular
    ├── abstracts/
    │   └── _breakpoints.scss       # Mixin mq()
    │   └── _layout.scss       # Mixin padding, margin, radius, flexbox
    │   └── _shadows.scss       # Mixin sur les box-shadows
    │   └── _typography.scss       # Mixin pour appliquer les fonts

    ├── base/
    │   └── _reset.scss             # Reset CSS de base
    ├── fonts/
    │   └── _font-face.scss             # déclaration des fonts
    ├── tokens/
    │   ├── _variables-light.scss   # Thème clair
    │   ├── _variables-dark.scss    # Thème sombre
    │   ├── _variables-desktop.scss # Tailles desktop
    │   └── _variables-mobile.scss  # Tailles mobile
    └── themes/
        ├── _tokens.scss            # Fonctions `themed()` / `themed-block()`
        └── _tokens.map.scss        # Généré automatiquement (voir doc design-tokens)
```

---
