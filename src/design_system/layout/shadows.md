# Shadows

### `abstracts/_shadows.scss`

le fichier gère le système des ombres

***Il reprend les éléments du DS sous figma***

![image](https://github.com/user-attachments/assets/ac1b1b5c-4683-4996-b36f-33f396ea8614)

```scss
@use 'sass:map';

$shadows: (
  light: (
    xs: (0px 1px 2px rgba(9, 9, 11, 0.05)),
    sm: (0px 1px 3px rgba(9, 9, 11, 0.10), 0px 1px 2px rgba(9, 9, 11, 0.10)),
    md: (0px 4px 6px rgba(9, 9, 11, 0.10), 0px 0px 4px rgba(9, 9, 11, 0.10)),
    lg: (0px 4px 6px rgba(9, 9, 11, 0.10), 0px 4px 4px rgba(9, 9, 11, 0.20)),
    xl: (0px 20px 25px rgba(9, 9, 11, 0.10), 0px 8px 10px rgba(9, 9, 11, 0.10)),
    2xl: (0px 25px 50px rgba(9, 9, 11, 0.20)),
    inner: (inset 0px 2px 4px 0px rgba(9, 9, 11, 0.05))
  ),
  dark: (
    xs: (0px 1px 2px rgba(255, 255, 255, 0.05)),
    sm: (0px 1px 3px rgba(255, 255, 255, 0.10), 0px 1px 2px rgba(255, 255, 255, 0.10)),
    md: (0px 4px 6px rgba(255, 255, 255, 0.10), 0px 0px 4px rgba(255, 255, 255, 0.10)),
    lg: (0px 4px 6px rgba(255, 255, 255, 0.10), 0px 4px 4px rgba(255, 255, 255, 0.20)),
    xl: (0px 20px 25px rgba(255, 255, 255, 0.10), 0px 8px 10px rgba(255, 255, 255, 0.10)),
    2xl: (0px 25px 50px rgba(255, 255, 255, 0.20)),
    inner: (inset 0px 2px 4px 0px rgba(255, 255, 255, 0.05))
  )
);

@mixin shadow($key, $theme: light) {
  $theme-map: map.get($shadows, $theme);
  $shadow: map.get($theme-map, $key);

  @if $shadow {
    box-shadow: $shadow;
  } @else {
    @warn "Shadow `#{$key}` not found for theme `#{$theme}`.";
  }
}
```
#### La map `$shadows`

C'est une structure de données organisée en trois niveaux:
1. **Premier niveau**: Les thèmes (`light` et `dark`)
2. **Deuxième niveau**: Les tailles d'ombre (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`)
3. **Troisième niveau**: Les valeurs d'ombres CSS (entre parenthèses)



#### Le mixin `shadow`

C'est une fonction réutilisable qui:
1. Prend deux paramètres: 
   - `$key`: La taille de l'ombre (`xs`, `sm`, `md`, etc.)
   - `$theme`: Le thème à utiliser (`light` ou `dark`, avec `light` par défaut)
2. Récupère la bonne valeur d'ombre depuis la structure imbriquée
3. L'applique comme `box-shadow` si elle existe
4. Affiche un avertissement si l'ombre demandée n'existe pas

#### Exemple de base

```scss
.card {
  // Ombre légère (sm) en thème clair (par défaut)
  @include shadow(sm);
}
```

#### Exemple avec thème spécifique

```scss
.card-dark {
  // Ombre moyenne (md) en thème sombre
  @include shadow(md, dark);
}
```

#### Exemple avec adaptation au thème actif

```scss
// Pour un élément qui s'adapte au thème de l'application
.adaptive-card {
  // Style de base
  background-color: white;
  
  // En thème clair
  :host-context([data-theme='light']) & {
    @include shadow(md, light);
  }
  
  // En thème sombre
  :host-context([data-theme='dark']) & {
    background-color: #333;
    @include shadow(md, dark);
  }
}
```

---
