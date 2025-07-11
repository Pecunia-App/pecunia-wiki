# Composant `<app-ui-link>`

## Description

Le composant `<app-ui-link>` centralise tous les usages de liens internes du Design System :  
- Lien de navigation SPA avec Angular `[routerLink]`
- Variantes visuelles : couleur
- Accessibilité, focus, désactivation

---

## Propriétés (props)

| Prop        | Type                                 | Valeurs possibles                                       | Default      | Description                                         |
|-------------|--------------------------------------|---------------------------------------------------------|--------------|-----------------------------------------------------|
| `routerLink`| `string \| string[] \| null`         | ex : `'/register'`, `['/register']`                     | – (requis)   | Chemin de navigation SPA interne                    |
| `variant`   | `string` (`LinkVariant`)             | `primary`, `secondary`, `alert`, `neutral`     | `primary`    | Style visuel du lien (couleur DS)                   |
| `width`     | `string` (`LinkWidth`)               | `auto`, `full`                                          | `auto`       | Largeur auto ou 100% parent                         |
| `minWidth`  | `number \| string \| null`           | ex : `160`, `'10rem'`, `'60%'`, `null`                  | `null`       | Largeur minimale du lien (en px ou unité CSS)       |
| `maxWidth`  | `number \| string \| null`           | ex : `320`, `'20rem'`, `'100%'`, `null`                 | `null`       | Largeur maximale du lien (en px ou unité CSS)       |
| `disabled`  | `boolean`                            | `true`, `false`                                         | `false`      | Désactive la navigation et l’accessibilité          |
| `ariaLabel` | `string \| null`                     | –                                                       | `null`       | Label accessibilité alternatif (si pas de texte)    |
| `tabIndex`  | `number`                             | `0`, `-1`                                               | `0`          | Ordre focus clavier (désactivé : `-1`)              |

---

### Détail des types :

#### `variant`
- `primary` : Lien principal (couleur DS)
- `secondary` : Lien secondaire (gris/neutre)
- `alert` : Lien “alerte” (rouge/orange)
- `neutral` : Couleur texte neutre

#### `width`
- `auto` : Largeur adaptée au contenu
- `full` : Largeur 100% du parent (block, centré)

#### `minWidth` / `maxWidth`
- Valeur numérique (px), string avec unité (`'10rem'`, `'100%'`), ou `null` (pas de contrainte)

---

## Exemples d’utilisation

### Lien principal vers une page de création de compte

```html
<app-ui-link [routerLink]="['/register']" variant="primary">
  Créer un compte
</app-ui-link>
```
### Lien secondaire “mot de passe oublié”, avec accessibilité

```html
<app-ui-link
  [routerLink]="['/forgot-password']"
  variant="secondary"
  ariaLabel="Réinitialiser le mot de passe"
>
  Mot de passe oublié ?
</app-ui-link>
```

