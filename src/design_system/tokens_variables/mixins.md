# Mixins : gérer les couleurs des themes

Le thème actif est appliqué via l’attribut `data-theme` sur la balise `<html>` :

```html
<html data-theme="light">
  ou
  <html data-theme="dark"></html>
</html>
```

Un système centralisé permet de faire correspondre un token logique à la bonne valeur du thème :

```scss
// styles/themes/tokens.scss
@use 'sass:map';
@use 'tokens.map' as tokens-map;

@function themed($key, $theme-name) {
  $entry: map.get(tokens-map.$tokens, $key);
  @if $entry == null {
    @return null;
  }
  $value: map.get($entry, $theme-name);
  @if $value == null {
    @return null;
  }
  @return $value;
}

@mixin themed-block($props-map) {
  @each $theme-name in $theme-names {
    :host-context([data-theme='#{$theme-name}']) & {
      @each $prop, $token in $props-map {
        #{$prop}: themed($token, $theme-name);
      }
    }
  }
}
```

**Explication simplifiée**

- `themed($key, $theme-name)` :  
  Cette fonction va chercher la bonne valeur d'une variable (token) selon le thème (clair ou sombre).  
  Exemple : si tu demandes la couleur de fond pour le thème "dark", elle te donne la bonne couleur.

- `themed-block($props-map)` :  
  Ce mixin applique plusieurs propriétés CSS selon le thème actif.  
 Il les applique automatiquement pour chaque thème ***une liste de propriété simple*** qu'on lui donne

- On utilise `:host-context([data-theme='#{$theme-name}'])` pour que le style change tout seul quand le thème change, sans toucher au code du composant.

- Ça évite de recopier la logique de thème partout (DRY) et chaque fonction/mixin a un but précis (S de SOLID).

---

### ✅ Exemple avec un bouton

```scss
@use '../../../styles/themes/tokens' as theme;
@use '../../../styles/tokens/variables-mobile' as *;

.btn-switch {
  //style classique
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  // application des variables issues des tokens sur les 2 thèmes
  // mixin themed-block à utiliser
  @include theme.themed-block(
    (
      background-color: 'background-primary-default',
      color: 'text-neutral-default-inverse',
    )
  );

  &:hover {
    @include theme.themed-block(
      (
        background-color: 'background-primary-hover',
      )
    );

    // 🎯 Application uniquement pour le light
    // utiliser fonction themed avec :host-context([data-theme='light'])
    :host-context([data-theme='light']) & {
      color: theme.themed('text-neutral-default', 'light');
    }
  }
}
```

---

## 🎯 Pourquoi cette organisation ?

- **Chaque fichier ou fonction a un rôle précis** (S de SOLID)
- **Tout est centralisé** : on ne répète pas les valeurs (DRY)
- **Facile à faire évoluer** : ajouter un thème ou changer une couleur est simple
- **Lisible** : tout le monde comprend où et comment utiliser les outils du design system


## ⚠️ Limite connue : propriétés CSS complexes (ex : linear-gradient)


la mixin `themed-block` remplace chaque propriété CSS du map par la valeur du token pour chaque thème.

Mais elle ne sait pas parser une fonction CSS complexe (ex: linear-gradient(...)) : elle attend un token simple.

Si tu fais ça :

 ```scss

@include theme.themed-block((
  background: linear-gradient(
    117deg,
    'background-neutral-primary' 50.11%,
    'common-neutral-low' 100%
  )
));
```

→ $token = toute la string linear-gradient(...)
→ La fonction themed() ne sait pas quoi faire de cette string qui mélange tokens et CSS.

Sass ne peut pas analyser et “remplacer” chaque nom de token à l’intérieur d’une string complexe.

Il faudrait parser la string, reconnaître les tokens, et appeler themed() sur chaque.

Il faut donc le faire à la main, c’est la limite naturelle du SCSS “classique”

→ Soit on passe par une mixin/fonction custom encore plus complexe (peu utile ici),
→ Soit on écrit le gradient manuellement pour chaque thème, comme tu as fait :

```scss
.main-wrapper {
  background: linear-gradient(
    117deg,
    #{themed('background-neutral-primary', 'light')} 50.11%,
    #{themed('common-neutral-low', 'light')} 100%
  );
}

:host-context([data-theme='dark']) .main-wrapper {
  background: linear-gradient(
    117deg,
    #{themed('background-neutral-primary', 'dark')} 50.11%,
    #{themed('common-neutral-low', 'dark')} 100%
  );
}
```

La mixin themed-block fonctionne parfaitement pour remplacer des propriétés simples (color, background-color, border-color, etc.), mais par conception, elle ne peut pas parser ni remplacer automatiquement chaque nom de token à l’intérieur d’une fonction CSS complexe comme un linear-gradient.

Dans ces cas, on utilise directement la fonction themed dans la string de gradient, pour garantir la cohérence DS, tout en restant explicite.
