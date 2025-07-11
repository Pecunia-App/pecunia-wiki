# Flexbox

Les  mixins `flex` et `flex-center` sont là pour simplifier ton code tout en gardant toute la puissance de flexbox.

La mixin `flex-center`est un raccourci pour un élément horizontalement et verticalement. C'est l'une des opérations les plus courantes en CSS. 

```scss
@mixin  flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: $space-16;
}
```
### Exemple d'utilisation

```scss
.content {
@include  flex-center;
height: 100vh; // Hauteur de l'écran complet
}
```

La mixin `flex`

C'est un mixin flexible qui permet de configurer n'importe quelle propriété flexbox. On peut spécifier une seule ou toutes les propriétés.

```scss
@mixin flex($dir: null, $wrap: null, $justify: null, $align: null, $gap: null) {
  display: flex;

  @if $dir != null {
    flex-direction: $dir;
  }
  @if $wrap != null {
    flex-wrap: $wrap;
  }
  @if $justify != null {
    justify-content: $justify;
  }
  @if $align != null {
    align-items: $align;
  }
  @if $gap != null {
    gap: size($gap);
  }
}

```
 Les paramètres en détail

- **$dir** : Direction des éléments
  - `row` (défaut) : éléments alignés horizontalement
  - `column` : éléments alignés verticalement
  - `row-reverse`, `column-reverse` : ordre inversé

- **$wrap** : Comment les éléments se comportent quand il n'y a plus de place
  - `nowrap` (défaut) : reste sur une seule ligne, peut déborder
  - `wrap` : passe à la ligne suivante si besoin
  - `wrap-reverse` : passe à la ligne du bas vers le haut

- **$justify** : Alignement horizontal (sur l'axe principal)
  - `flex-start` (défaut) : éléments au début
  - `center` : éléments au centre
  - `flex-end` : éléments à la fin
  - `space-between` : espacés avec les extrémités collées aux bords
  - `space-around` : espacés avec espace autour de chaque élément
  - `space-evenly` : espacés uniformément

- **$align** : Alignement vertical (sur l'axe secondaire)
  - `stretch` (défaut) : étirés pour occuper tout l'espace
  - `center` : centrés
  - `flex-start` : en haut/au début
  - `flex-end` : en bas/à la fin
  - `baseline` : alignés sur la ligne de base du texte

- **$gap** :  Espace entre les éléments (utilise une clé du map spacing comme 'space-8', ou une valeur CSS)
  - Exemple: `space-8` pour 8px d'espacement

```scss
@include flex($gap: 'space-8');    // 8px (en rem)
@include flex($gap: 1.25rem);  
```

1. Une barre de navigation horizontale avec espace entre les éléments

```scss
.navbar {
  @include flex($justify: space-between, $align: center);
  padding: space-4 space-8;
}
```

2. Une liste verticale d'éléments espacés

```scss
.menu-items {
  @include flex($dir: column, $gap: space-8);
}
```

3. Une grille d'images qui se réorganise automatiquement

```scss
.image-gallery {
  @include flex($wrap: wrap, $gap: space-16, $justify: center);
}
```

4. Un formulaire avec labels et champs alignés

```scss
.form-group {
  @include flex($dir: column, $gap: space-4);
  
  @include mq(tablet) {
    // Change en horizontal sur tablette et +
    @include flex($dir: row, $align: center, $gap: space-8);
  }
}
```

L'avantage du  `null`

En utilisant  `null`  comme valeur par défaut, on peut spécifier  **uniquement les propriétés dont on a besoin**. Les propriétés non spécifiées n'apparaîtront pas dans le CSS final, ce qui donne un code plus léger.

```scss
// Seulement direction et gap
.sidebar {
  @include flex($dir: column, $gap: space-16);
}

// Génère seulement :
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```
---
