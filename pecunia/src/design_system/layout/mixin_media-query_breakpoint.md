# Mixin, Media Query et Breakpoint

### `abstracts/_breakpoints.scss`

mq = media query

**Explication**

Le mixin `mq` sert à écrire facilement des media-queries (pour adapter le style selon la taille d'écran).  
Au lieu de répéter les tailles partout, on utilise des noms comme `mobile`, `tablet`, `desktop`.  
Si on veut changer une taille, il suffit de modifier la map en haut du fichier.

Cela évite de recopier les mêmes valeurs partout (DRY) et chaque fichier a un rôle précis (S de SOLID).

```scss
@use 'sass:map';

$breakpoints: (
  mobile: 390px,
  tablet: 768px,
  desktop: 1024px,
);

@mixin mq($breakpoint) {
  $value: map.get($breakpoints, $breakpoint);
  @if $value {
    @media screen and (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Breakpoint #{$breakpoint} non défini.";
  }
}
```

### 🔄 Exemple d’utilisation du mixin

```scss
h1 {
  font-size: 18px;

  @include mq(tablet) {
    font-size: 24px;
  }

  @include mq(desktop) {
    font-size: 32px;
  }
}
```

---
