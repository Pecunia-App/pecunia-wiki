# Example avec le Frontend

C'est la même chose côté backend, les explications vont pour les deux repos.

```yaml
name: CD - Deploy Backend

on:
  workflow_run:
    workflows: ["CI - Build and Test"]
    types:
      - completed

jobs:
  deploy:
    if: |
      github.event.workflow_run.conclusion == 'success' &&
      github.event.workflow_run.head_branch == 'main'

    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Log in Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
      - name: Build and Push Docker Image
        run: |
          docker build -t txrigxn/pecunia-api:latest . || exit 1
          docker push txrigxn/pecunia-api:latest
      - name: Deploy to Server
        env:
          SSHKEY: ${{ secrets.SSHKEY }}
          VPS_USER: ${{ secrets.VPS_USER }}
          VPS_HOST: ${{ secrets.VPS_HOST }}
          SSH_KNOWN_HOSTS: ${{ secrets.SSH_KNOWN_HOSTS }}
        run: |
          # SSH KEY CONFIG
          mkdir -p ~/.ssh
          echo "$SSHKEY" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
          ssh -i ~/.ssh/id_ed25519 ${VPS_USER}@${VPS_HOST} "/home/pecunia/pecunia/deploy.sh"
      - name: cleanup
        run: rm -rf ~/.ssh

```
On va décortiquer ce workflow

```yaml
on:
  workflow_run:
    workflows: ["CI - Build and Test"]
    types:
      - completed

jobs:
  deploy:
    if: |
      github.event.workflow_run.conclusion == 'success' &&
      github.event.workflow_run.head_branch == 'main'
```

Pour que ce workflow fonctionne il devra respecter 3 conditions :

- Le workflow "CI - Build and Test" doit être terminé
- Ce dernier doit être réussi
- Ce dernier doit se passer sur la branch "main"

```yaml
      - name: Log in Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
      - name: Build and Push Docker Image
        run: |
          docker build -t txrigxn/pecunia-api:latest . || exit 1
          docker push txrigxn/pecunia-api:latest
```

On va se connecter au registry de container (ca peut etre Github, Docker ou un self-hosted.)

Puis, on va construire un nouveau container mis à jour avec les modifications de codes venant des features des developpeur.euses.

Ensuite, on pousse sur le registry.

```yaml
      - name: Deploy to Server
        env:
          SSHKEY: ${{ secrets.SSHKEY }}
          VPS_USER: ${{ secrets.VPS_USER }}
          VPS_HOST: ${{ secrets.VPS_HOST }}
          SSH_KNOWN_HOSTS: ${{ secrets.SSH_KNOWN_HOSTS }}
        run: |
          # SSH KEY CONFIG
          mkdir -p ~/.ssh
          echo "$SSHKEY" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          echo "$SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
          ssh -i ~/.ssh/id_ed25519 ${VPS_USER}@${VPS_HOST} "/home/pecunia/pecunia/deploy.sh"
```

Le script bash est situé directemet sur le vps et se décompose ainsi :

```bash
#!/bin/bash

set -e

echo "→ Pulling latest Docker image..."
docker pull txrigxn/pecunia-front:latest
docker pull txrigxn/pecunia-api:latest

echo "→ Changing to project directory..."
cd /home/pecunia/pecunia

echo "→ Stopping running containers..."
docker compose down

echo "→ Starting new containers..."
docker compose up -d

echo "✅ Deployment completed."
```

La variable d'environnement `SSHKEY` a été générer sur le serveur dédié et mis en secrets sur l'organisation de Pecunia, afin de l'utiliser sur les deux repositories.

Après s'être connecter en ssh sur le serveur, on va chercher les containers mis à jour.

Un peu de downtime le temps de d'éteindre les services dans l'orchestrateur de containeurs (=docker compose).

Ensuite, avec la commande `docker compose up -d`, on relance nos applications en arrière plan (c'est ce que veut dire le flag -d, --detach) de notre vps.

On finit par supprimer le dossier .ssh pour plus de sécurité.
