# Continuous Integration

L'**intégration Continu** (CI) correspond à la mise en place de tests automatiques avant de pouvoir intégrer de nouvels modifications au code source en ligne.

Ce processus d'automatisation permet de détecter rapidement les problèmes d'intégrations et les régressions.

Les Github Actions permettent une **homogénéité** de notre codebase.

Que ce soit en front ou dans le back, nous utilisons des workflows afin de :

- Lancer nos tests automatisés (Unitaires > Intégrations > End-to-End)
- De respecter les conventions de qualité de code à l'aide des linters (Eslint pour Angular - Checkstyle pour Spring) 
- De pouvoir vérifier si le projet compile correctement

Cela permet de garantir la fiabilité des modifications du code fusionné tout le long de la vide d'un projet.

Moins de bugs et des corrections plus rapides en production.
