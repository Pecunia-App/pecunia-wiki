# Mixin

```scss
@mixin text-style($size-key, $weight-key: regular, $mode: desktop) {
  $sizes: if($mode == desktop, $sizes-desktop, $sizes-mobile);

  font-family: $font-family-base;
  font-size: map.get($sizes, $size-key);
  line-height: map.get($sizes, $size-key);
  font-weight: map.get($font-weights, $weight-key);
}
```

Cette mixin permet d’appliquer une règle typographique complète (police, taille, interligne, poids) à partir de clés logiques comme `heading-h2`, `text-sm`, etc.

Le paramètre `$mode` permet de basculer dynamiquement entre mobile et desktop.  


les clés sont dans `typography.scss`


### ✅ Exemple d'utilisation d'une font
```scss

@use '../../../styles/abstracts/typography' as typo;

h2 {
  @include typo.text-style(heading-h2, extrabold, mobile);
}

``` 
Cet exemple applique :

- la police "Open Sans"
- une taille adaptée à un titre de niveau 2
- un poids fort (extrabold)
- un interligne cohérent avec la maquette``

# Documentation des paramètres typographiques

## Paramètres

| Paramètre      | Type    | Valeurs possibles                                      | Défaut   | Description                                   |
|:-------------- |:------- |:----------------------------------------------------- |:-------- |:--------------------------------------------- |
| `$size-key`    | string  | Voir tableaux ci-dessous                              | —        | Clé de taille (définit font-size & line-height) |
| `$weight-key`  | string  | `regular`, `semibold`, `bold`, `extrabold`            | regular  | Poids de police                              |
| `$mode`        | string  | `desktop`, `mobile`                                   | desktop  | Mode d’affichage (pour responsive)            |

---

## Tailles disponibles (en px)

### Desktop

| Clé          | font-size / line-height |
|:------------ |:-----------------------|
| display-h1   | 80px                   |
| display-h2   | 60px                   |
| display-h3   | 48px                   |
| display-h4   | 36px                   |
| display-h5   | 24px                   |
| display-h6   | 20px                   |
| heading-h1   | 30px                   |
| heading-h2   | 24px                   |
| heading-h3   | 20px                   |
| heading-h4   | 18px                   |
| heading-h5   | 16px                   |
| heading-h6   | 14px                   |
| text-lg      | 18px                   |
| text-md      | 16px                   |
| text-sm      | 14px                   |
| text-xs      | 12px                   |
| text-xxs     | 10px                   |

### Mobile

| Clé          | font-size / line-height |
|:------------ |:-----------------------|
| display-h1   | 48px                   |
| display-h2   | 36px                   |
| display-h3   | 28px                   |
| display-h4   | 24px                   |
| display-h5   | 18px                   |
| display-h6   | 16px                   |
| heading-h1   | 24px                   |
| heading-h2   | 20px                   |
| heading-h3   | 18px                   |
| heading-h4   | 16px                   |
| heading-h5   | 14px                   |
| heading-h6   | 12px                   |
| text-lg      | 16px                   |
| text-md      | 14px                   |
| text-sm      | 12px                   |
| text-xs      | 10px                   |
| text-xxs     | 9px                    |

---

## Poids disponibles

| Clé        | Valeur CSS |
|:---------- |:---------- |
| regular    | 400        |
| semibold   | 600        |
| bold       | 700        |
| extrabold  | 800        |

---
