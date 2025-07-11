# Pre-commit // Commitizen

Ce sont deux outils permettant pour l'un de créer des git hooks que ce soit au moment du push ou au moment d'écrire un message de commit.

Pour l'instant, nous avons fait le choix d'utiliser qu'un git hook pour les messages de commit.

### Installation: Pre-Commit

Etant donné que c'est un package Python, je conseille de passer par l'outil [pipx](https://pipx.pypa.io/stable/), qui fonctionne comme les outils de versionning pour Node (volta, nvs, etc), ca facilitera les installations pour la suite.

1. **pipx install pre-commit**  dans un terminal.
2. **pre-commit install** dans le dossier de votre projet (ici on se positionne dans `pecunia-api/` afin que cela installe les git hooks correspondants étant donné que nous ne commitions pas le dossier `.git`

C'est tout pour Pre-Commit, le fichier de configuration `.pre-commit-config.yaml` est normalement déjà présent.

### Installation: Commitizen

Normalement vous avez `pipx` sur votre poste de travail.

1.`pipx ensurepath`

2\. `pipx install commitizen`

3\. `pipx upgrade commitizen`

Si vous avez un retour en faisant `cz -h` c'est que vous avez bien installé Commitizen. Bravo !

### Comment combiner les deux ?

Quand vous effectué un changement dans les fichers et que vous voulez commit votre travail :

Vous n'avez qu'à ajouter comme d'habitude

`git add .` ou `git add <des fichiers>`

puis afin de respecter la nomenclature vous faites

`cz` : cela va vous ouvrir une boite de dialogue dans votre terminal, vous avez juste à choisir ce que vous voulez faire comme dans cette petite vidéo:

![Using commitizen cli](https://commitizen-tools.github.io/commitizen/images/demo.gif)

et si vous voulez tout de meme passer par un git commit classique. Il faudra respecter la nomenclature parfaitement sinon...

![](https://media-protected.taiga.io/attachments/c/1/e/6/14d8dd4810e46a09e53870bc24677cdd523b9c8108da584c51103b99668f/2025-05-13-145008_hyprshot.png?token=aG-T2w%3AG3Q_ZX043XmK2tLSGnIZPKIe3hyosk9LnFTC3v6m974Xp2BFZEsqkDuO9X1Sz7mQFzFhc0rsmgpHd7hvnQI8Pw#_taiga-refresh=wikipage:3994447)

### Conclusion

Avec ses deux outils, le project sera cohérent au niveau de ses commits et de ses attentions derrière.

De plus Commitizen permet de gérer la version de nos applications avec `cz bump` en utilisant semantic versionning et permettant aussi de créer des changelogs

source: [https://pre-commit.com/#install](https://pre-commit.com/#install)

source: [https://commitizen-tools.github.io/commitizen/](https://commitizen-tools.github.io/commitizen/)

source: [https://semver.org/](https://semver.org/)
