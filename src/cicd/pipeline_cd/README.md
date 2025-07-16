# La pipeline CD

Pour savoir comment a été gérer le serveur dédié (vps ou serveur maison) pour ce projet, vous pouvez aller sur cette [page](./deploy.md).

Pour le projet, nous utilisons la containerisation avec Docker et afin d'orchestrer nos containeurs, nous utilisons docker compose.

**Pourquoi containeriser nos applications ?**

- Environnement isolé et consistant
- Déploiement d'application rapide (bien avec le workflow CI/CD)
- Flexible et Scalable
- La transférabilité d'un serveur à un autre
- Cost Effective
- Permet de rollback facilement avec le Version Control System (VCS) interne des containers
