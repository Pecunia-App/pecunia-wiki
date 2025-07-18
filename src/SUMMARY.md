# Summary

[Introduction](./README.md)

# Dev Guide

- [Installation](guide/tools/README.md)
    - [Pre-commit // Commitizen](guide/tools/precommit_commitizen.md)
    - [Google Java Format](guide/tools/google-java-format.md)
    - [Checkstyle](guide/tools/checkstyle.md)
    - [Javadoc](guide/tools/javadoc.md)
- [Workflow Git](guide/workflow_git.md)
- [Branching Strategy](guide/branching_strategy.md)

# Ressources pour le Titre
- [Informations et Aides](titre/README.md)
  - [Documents obligatoires](titre/docs-titre/README.MD)
      - [Résumé Cahier des Charges](titre/docs-titre/résumé-cdc.md)
      - [Sitemap](titre/docs-titre/sitemap.md)
      - [Product Backlog](titre/docs-titre/product_backlog.md)

# Conception

- [Conception BDD](conception/conception_bdd.md)

# Design System

- [Introduction](design_system/README.md)
- [Gestion des Etats avec Angular](design_system/gestion_etats_angular/README.md)
  - [Les Signals](design_system/gestion_etats_angular/signals.md)
  - [Paradigme de Gestion: Signals vs Classes](design_system/gestion_etats_angular/signals_vs_classes.md)
  - [Composants UI: pattern signal, input, computed](design_system/gestion_etats_angular/composants_ui.md)
- [Tokens et Variables](design_system/tokens_variables/README.md)
  - [Intégrations des tokens Figma](design_system/tokens_variables/integration_tokens_figma.md)
  - [Table de correspondance des couleurs](design_system/tokens_variables/table_correspondance_couleurs.md)
  - [Mixins : gérer les couleurs des themes](design_system/tokens_variables/mixins.md)
- [Typographies](design_system/typographies/README.MD) 
  - [Gestions des Polices](design_system/typographies/gestion_polices.md)
  - [Mixin](design_system/typographies/mixin.md)
- [Layout](design_system/layout/README.md)
    - [Mixin, Media Query et Breakpoint](design_system/layout/mixin_media-query_breakpoint.md)
    - [Espacements, margin, padding et radius](design_system/layout/espacements_margin_padding_radius.md)
    - [Flexbox](design_system/layout/flexbox.md)
    - [Shadows](design_system/layout/shadows.md)
    - [Exemple: Un Bouton](design_system/layout/exemple.md)
- [Composants UI](design_system/composants_ui/README.md)
  - [Icons](design_system/composants_ui/icons.md)
    - [Liste des Icons](design_system/composants_ui/listes_icons.md)
    - [Accessibilité](design_system/composants_ui/accessibilité.md)
  - [Boutons](design_system/composants_ui/boutons.md)
  - [Inputs](design_system/composants_ui/inputs.md)
  - [link](design_system/composants_ui/link.md)

# La CI/CD

- [Introduction](cicd/README.md)
  - [Definition](cicd/definition.md)
  - [Continuous Integration](cicd/ci.md)
  - [Continuous Delivery](cicd/cd.md)
- [La pipeline CI](cicd/pipeline_ci/README.md)
  - [Frontend](cicd/pipeline_ci/frontend.md)
  - [Backend](cicd/pipeline_ci/backend/backend.md)
    - [Linting](cicd/pipeline_ci/backend/linting.md)
    - [Formatting](cicd/pipeline_ci/backend/formatting.md)
    - [Compile and Test](cicd/pipeline_ci/backend/compile_test.md)
- [La pipeline CD](cicd/pipeline_cd/README.md)
  - [Deploiement](cicd/pipeline_cd/deploy.md)
    - [Configuration Serveur](cicd/pipeline_cd/config_server/README.md)
    - [Workflow de mise en ligne](cicd/pipeline_cd/config_server/workflow_mep.md)
    - [Le docker compose](cicd/pipeline_cd/config_server/deploy-compose.md)
    - [Script de deploiement](cicd/pipeline_cd/config_server/script.md)
  - [Récapitulatif](cicd/recap_cicd.md)

# L'API

- [Introduction](api/README.md)
  - [Spring](api/spring/spring.md)
  - [Swagger](api/swagger/swagger.md)
