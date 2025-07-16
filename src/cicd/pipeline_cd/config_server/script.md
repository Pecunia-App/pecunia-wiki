# Script de déploiement

Ce script est déclencher par le GithubAction de [déploiement](./workflow_mep.md).
Voici le script en question, qui est chargé de d'éteindre les containers du projet, de récupérer les images à jour qui vient d'arriver sur DockerHub, et de redéployer le projet avec cette nouvelle image:

```bash
#!/bin/bash

set -e

echo "→ Changing to project directory..."
cd /home/pecunia/pecunia

echo "→ Pulling latest Docker image..."
docker compose pull backend frontend

echo "→ Stopping running containers..."
docker compose down

echo "→ Starting new containers..."
docker compose up -d

echo "✅ Deployment completed."
```


