
# Swagger UI 

## Permet de voir tous les endpoints disponibles, de les tester directement depuis le navigateur, et de voir les réponses des requêtes.

## Endpoints de l'API

Voici quelques-uns des endpoints disponibles dans notre API :

- **GET /users** : Obtenir une liste d'utilsateurs.
- **POST /auth/register** : Créer un nouvel utilisateur.
- **PUT /users/{id}** : Mettre à jour un uitilisateur existant.
- **DELETE /users/{id}** : Supprimer un utilisateur.

## Mise en place de l'environement

- Variables dans votre **.env** :

```php
#spring doc
DOC_PATH=/pecunia-docs
SORT=method
```

- Lancer le serveur local.
- Allez sur [l'interface graphique](http://localhost:8080/swagger-ui.html).

## Exemples d'Utilisation

Voici quelques exemples d'utilisation de notre API avec Swagger UI :

1. **Créer un nouvel utilisateur** :
    - Trouvez l'endpoint `POST /auth/register`.
    - Cliquez sur le bouton "Try it out".
    - Entrez les données nécessaires dans le corps de la requête :
    ```json
    {
        "firstname": "John",
        "lastname": "Doe",
        "email": "johndoe@gmail.com",
        "password": "ValidPassword123@?!",
        "confirmPassword": "ValidPassword123@?!"
    }   
    ```
    - Cliquez sur le bouton "Execute" pour envoyer la requête.
    - Vous devriez voir la réponse avec les données créées.
    - Vous pouvez voir l'utilisateur dans la response body.

    2. **Authentifiez-vous** :
    - Trouvez l'endpoint `POST /auth/login`.
    - Cliquez sur le bouton "Try it out".
    - Entrez les données nécessaires dans le corps de la requête :
    ```json
    {
        "email": "johndoe@gmail.com",
        "password": "ValidPassword123@?!"
    }
    ```
    - Cliquez sur le bouton "Execute" pour envoyer la requête.
    - Vous pouvezvoir le token d'authentification dans la response body.


---

**Swagger est un outil puissant pour documenter et tester les APIs. En utilisant Swagger UI, vous pouvez facilement explorer et interagir avec les endpoints de notre API.**