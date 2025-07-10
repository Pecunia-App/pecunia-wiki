# Espacements, margin, padding et radius

## `abstracts/_Layout.scss`

le fichier [`layout.scss`](https://github.com/Pecunia-App/pecunia-front/blob/dev/src/styles/abstracts/_layout.scss) contient les variables pour les espacement et les radius utilisables directement dans le scss

```scss
$space-2: px-to-rem(2); // 2px
$space-4: px-to-rem(4); // 4px
$space-6: px-to-rem(6); // 6px
$space-8: px-to-rem(8); // 8px
$space-10: px-to-rem(10); // 10px
$space-12: px-to-rem(12); // 12px
$space-14: px-to-rem(14); // 14px
$space-16: px-to-rem(16); // 16px
$space-24: px-to-rem(24); // 24px
$space-32: px-to-rem(32); // 32px
$space-48: px-to-rem(48); // 48px
$space-64: px-to-rem(64); // 64px
$space-80: px-to-rem(80); // 80px
$space-96: px-to-rem(96); // 96px
$space-128: px-to-rem(128); // 128px

  
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 16px;
$radius-xl: 24px;
$radius-pill: 9999px;
```

la fonction `px-to-rem` permet de convertir une valeur numérique en unité `rem`

Plusieurs mixins utilitaires sont aussi présentes dans `layout` pour gérer les `margin, padding, radius et les flexbox`

## padding et margin

```scss
@mixin margin($top, $right: null, $bottom: null, $left: null) {
  margin-top: size($top);
  margin-right: if($right != null, size($right), size($top));
  margin-bottom: if($bottom != null, size($bottom), size($top));
  margin-left: if($left != null, size($left), if($right != null, size($right), size($top)));
}
@mixin padding($top, $right: null, $bottom: null, $left: null) {
  padding-top: size($top);
  padding-right: if($right != null, size($right), size($top));
  padding-bottom: if($bottom != null, size($bottom), size($top));
  padding-left: if($left != null, size($left), if($right != null, size($right), size($top)));
}
```
Ces deux mixins simplifient l'écriture des marges et des padding dans l'application. Elles fonctionnent exactement comme les propriétés CSS  `margin`  et  `padding`, mais avec plus de flexibilité.

Les mixins acceptent de 1 à 4 paramètres, tout comme en CSS standard :

```scss
@include  margin($top, $right, $bottom, $left);
@include  padding($top, $right, $bottom, $left);
```
On peut passer e 1 à 4 valeur et les mixins s'adaptent de la façon suivante: 

1) **Un seul paramètre** (`$top`) : Appliqué aux quatre côtés

```scss
margin-top: $top;
margin-right: $top;     // Même valeur que top
margin-bottom: $top;    // Même valeur que top
margin-left: $top;      // Même valeur que top
```

2) **Deux paramètres** (`$top`, `$right`) : Vertical et horizontal

```scss
margin-top: $top;
margin-right: $right;
margin-bottom: $top;     // Même valeur que top
margin-left: $right;     // Même valeur que right
```

3) **Trois paramètres** (`$top`, `$right`, `$bottom`) : Comme CSS standard

```scss
margin-top: $top;
margin-right: $right;
margin-bottom: $bottom;
margin-left: $right;     // Même valeur que right
```

4) **Quatre paramètres** (`$top`, `$right`, `$bottom`, `$left`) : Contrôle complet

```scss
margin-top: $top;
margin-right: $right;
margin-bottom: $bottom;
margin-left: $left;
```

###  Exemples concrets

Exemple 1 : Une valeur (même espacement partout)

```scss
.card {
  @include padding(space-8);
}

// Généré en CSS :
.card {
  padding-top: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
}
```

Exemple 2 : Deux valeurs (vertical/horizontal)
```scss
.button {
  @include padding(space-4, space-8);
}

// Généré en CSS :
.button {
  padding-top: 0.25rem;     // $space-4
  padding-right: 0.5rem;    // $space-8
  padding-bottom: 0.25rem;  // $space-4
  padding-left: 0.5rem;     // $space-8
}
```

Exemple 3 : Valeurs spécifiques pour chaque côté
```scss
.header {
  @include margin(space-16, space-8, space-4, space-8);
}

// Généré en CSS :
.header {
  margin-top: 1rem;       // $space-16
  margin-right: 0.5rem;   // $space-8
  margin-bottom: 0.25rem; // $space-4
  margin-left: 0.5rem;    // $space-8
}
```

Exemple 4 : Valeurs nulles pour omettre certains côtés
```scss
.section {
  @include padding(space-8, null, space-16);
}

// Généré en CSS :
.section {
  padding-top: 0.5rem;     // $space-8
  padding-right: 0.5rem;   // $space-8 (valeur par défaut = $top)
  padding-bottom: 1rem;    // $space-16
  padding-left: 0.5rem;    // $space-8 (valeur par défaut = $right = $top)
}
```

---
## Mixin `radius` – Guide d’utilisation

Ce mixin permet d’appliquer rapidement un `border-radius` cohérent avec le design system Pecunia, en choisissant une valeur prédéfinie.

---

### Définition SCSS

```scss
$radii: (
  sm: 4px,
  md: 8px,
  lg: 16px,
  xl: 24px,
  pill: 9999px,
);

@mixin radius($key: md) {
  $radius: map.get($radii, $key);
  @if $radius {
    border-radius: $radius;
  } @else {
    @warn "Radius `#{$key}` non trouvé dans la map $radii.";
  }
}
```

---

### Paramètres

| Paramètre | Type   | Valeurs possibles      | Défaut | Description                  |
|-----------|--------|-----------------------|--------|------------------------------|
| `$key`    | string | sm, md, lg, xl, pill  | md     | Clé du rayon à appliquer     |

---

### Valeurs disponibles

| Clé   | Valeur px | Utilisation recommandée               |
|-------|-----------|---------------------------------------|
| sm    | 4px       | Petits éléments, badges               |
| md    | 8px       | Boutons, inputs, cartes               |
| lg    | 16px      | Cartes, modales, sections             |
| xl    | 24px      | Grands conteneurs, illustrations      |
| pill  | 9999px    | Effet "pilule" (boutons ronds)        |

---

### Exemples d’utilisation

```scss
// Bord arrondi moyen (par défaut)
.card {
  @include radius();
}

// Bord arrondi large
.modal {
  @include radius(lg);
}

// Effet pilule (pour un bouton rond)
.button-pill {
  @include radius(pill);
}
```
---
