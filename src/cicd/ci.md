# Continuous Integration

CI est l'acronyme pour "Continuous Integration" ou **l'intégration continu** en francais.

Ce processus d'automatisation facilite le merge fréquent des modifications de code vers la branche principales (dev ou main, à voir selon les worklows git des équipes).

Les Github Actions permettent une **homogénéité** de notre codebase.

Que ce soit en front ou dans le back, nous utilisons des workflows afin de :

- Lancer nos tests automatisés (Unitaires > Intégrations > End-to-End)
- De respecter les conventions de qualité de code à l'aide des linters (Eslint pour Angular - Checkstyle pour Spring) 
- De pouvoir vérifier si le projet compile correctement

Cela permet de garantir la fiabilité des modifications du code fusionné tout le long de la vide d'un projet.

Moins de bugs et des corrections plus rapides en production.
