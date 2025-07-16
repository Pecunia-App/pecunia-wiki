# Mise en place sur le serveur - CD

Une fois la [CI](../pipeline_ci/README.md) passée, les modifications de code sont ajoutés au dépôt.
On veut donc récupérer ce code automatiquement sur notre serveur et re-déployer notre application.

Pour cela, on va utiliser un nouveau **workflow** qui sera chargé de pousser nos images Docker avec les modifications de code à jour sur DockerHub.

Avec un "container registry" comme DockerHub, on signalera l'arrivé de nouveau code au serveur sur lequel est déployé notre application pour le [récupérer](./config_server/workflow_mep.md).
