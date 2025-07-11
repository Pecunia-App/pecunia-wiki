# Exemple: Un Bouton

exemple dans le bouton switch du theme avec  les mixins theme, layout, typo et shadows

***Pensez bien aux imports***

```scss
@use  '../../../styles/themes/tokens'  as  theme;
@use  '../../../styles/abstracts/typography'  as  typo;
@use  '../../../styles/abstracts/layout'  as  layout;
@use  '../../../styles/abstracts/shadows'  as  shadows;

.btn-switch {

// Utilisation des variables de thème

  @include layout.flex($dir: row, $align: center, $justify: space-between, $gap : layout.$space-8);
  @include layout.padding(layout.$space-8, layout.$space-12);
  @include layout.margin(layout.$space-8, layout.$space-12);
  @include layout.radius(md);
  @include shadows.shadow(lg, dark);
  border: none;
  cursor: pointer;
  font-family: 'open-sans', sans-serif;

  @include typo.text-style(text-md, regular);

  //style identique pour les deux thèmes
  @include theme.themed-block(
    (
      background-color: 'background-primary-default',
      color: 'text-neutral-default-inverse',
    )
  );

  // hover séparé
  &:hover {
    @include theme.themed-block(
      (
        background-color: 'background-primary-hover',
      )
    );
  }
}

// 🎯 Exception uniquement pour le light
:host-context([data-theme='light']) .btn-switch {
  @include shadows.shadow(lg, light);
  &:hover {
    color: #{theme.themed('text-neutral-default', 'light')};
  }
}
```
