# Documentation CRUD Utilisateur (User)

## 1. Structure des tables et relations

### Table `user`

```sql
CREATE TABLE `user`
(
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    firstname       VARCHAR(255),
    lastname        VARCHAR(255),
    profile_picture VARCHAR(255),
    email           VARCHAR(255) UNIQUE,
    password        VARCHAR(255),
    created_at      DATETIME NOT NULL,
    updated_at      DATETIME NOT NULL
);

CREATE TABLE user_roles
(
    user_id BIGINT NOT NULL,
    roles   VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES `user` (id)
);
```

### Table `wallet` (relation 1-1 avec user)

```sql
CREATE TABLE wallet
(
    id       BIGINT PRIMARY KEY AUTO_INCREMENT,
    balance  DECIMAL(19, 2) NOT NULL,
    currency VARCHAR(10)    NOT NULL,
    user_id  BIGINT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES `user` (id)
);
```

> Remarque : La clé étrangère user_id est dans la table wallet, pas dans la table user.

## 2. Endpoints CRUD

### a. Créer un utilisateur (Inscription)

- **POST** `/auth/register`
- **Body (JSON)** :

```json
{
  "firstname": "Jean",
  "lastname": "Dupont",
  "email": "jean.dupont@email.com",
  "password": "MotDePasseSecurise123!",
  "confirmPassword": "MotDePasseSecurise123!"
}
```

- **Réponse (201)** :

```json
{
  "id": 1,
  "firstname": "Jean",
  "lastname": "Dupont",
  "profilePicture": null,
  "email": "jean.dupont@email.com"
}
```

### b. Authentifier un utilisateur (Login)

- **POST** `/auth/login`
- **Body (JSON)** :

```json
{
  "email": "jean.dupont@email.com",
  "password": "MotDePasseSecurise123!"
}
```

- **Réponse (200)** :

```json
"<JWT_TOKEN>"
```

### c. Lire tous les utilisateurs

- **GET** `/users` (ADMIN)
- **Réponse (200)** :

```json
[
  {
    "id": 1,
    "firstname": "Jean",
    "lastname": "Dupont",
    "profilePicture": null,
    "email": "jean.dupont@email.com"
  },
  ...
]
```

### d. Lire un utilisateur par ID

- **GET** `/users/{id}` (ADMIN ou propriétaire)
- **Réponse (200)** :

```json
{
  "id": 1,
  "firstname": "Jean",
  "lastname": "Dupont",
  "profilePicture": null,
  "email": "jean.dupont@email.com"
}
```

### e. Rechercher par prénom/nom

- **GET** `/users/search-firstname?searchTerms=Jean` (ADMIN)
- **GET** `/users/search-lastname?searchTerms=Dupont` (ADMIN)

### f. Mettre à jour un utilisateur

- **PUT** `/users/{id}` (ADMIN ou propriétaire)
- **Body (JSON)** :

```json
{
  "firstname": "Jean",
  "lastname": "Dupont",
  "profilePicture": "https://url/image.jpg",
  "email": "jean.dupont@email.com"
}
```

- **Réponse (200)** :

```json
{
  "id": 1,
  "firstname": "Jean",
  "lastname": "Dupont",
  "profilePicture": "https://url/image.jpg",
  "email": "jean.dupont@email.com"
}
```

### g. Supprimer un utilisateur

- **DELETE** `/users/{id}` (ADMIN ou propriétaire)
- **Réponse (204)** :
  Aucun contenu

## 3. Exemples de requêtes Postman

### Créer un utilisateur

- **POST** `/auth/register`
- Body : (raw, JSON)

```json
{
  "firstname": "Alice",
  "lastname": "Martin",
  "email": "alice.martin@email.com",
  "password": "MotDePasseSecurise123!",
  "confirmPassword": "MotDePasseSecurise123!"
}
```

### Authentification

- **POST** `/auth/login`
- Body : (raw, JSON)

```json
{
  "email": "alice.martin@email.com",
  "password": "MotDePasseSecurise123!"
}
```

### Récupérer tous les utilisateurs

- **GET** `/users`
- Header : Authorization: Bearer <JWT_TOKEN>

### Mettre à jour un utilisateur

- **PUT** `/users/1`
- Header : Authorization: Bearer <JWT_TOKEN>
- Body : (raw, JSON)

```json
{
  "firstname": "Alice",
  "lastname": "Martin",
  "profilePicture": "https://url/image.jpg",
  "email": "alice.martin@email.com"
}
```

### Supprimer un utilisateur

- **DELETE** `/users/1`
- Header : Authorization: Bearer <JWT_TOKEN>

## 4. Requêtes SQL CRUD

### a. Créer un utilisateur

```sql
INSERT INTO `user` (firstname, lastname, profile_picture, email, password, created_at, updated_at)
VALUES ('Jean', 'Dupont', NULL, 'jean.dupont@email.com', '<mot_de_passe_hashé>', NOW(), NOW());

INSERT INTO user_roles (user_id, roles)
VALUES (LAST_INSERT_ID(), 'ROLE_USER');
```

### b. Lire tous les utilisateurs

```sql
SELECT *
FROM `user`;
```

### c. Lire un utilisateur par ID

```sql
SELECT *
FROM `user`
WHERE id = 1;
```

### d. Mettre à jour un utilisateur

```sql
UPDATE `user`
SET firstname       = 'Jean',
    lastname        = 'Dupont',
    profile_picture = 'https://url/image.jpg',
    email           = 'jean.dupont@email.com',
    updated_at      = NOW()
WHERE id = 1;
```

### e. Supprimer un utilisateur

```sql
DELETE
FROM user_roles
WHERE user_id = 1;
DELETE
FROM `user`
WHERE id = 1;
```

## 5. Rôle de chaque couche de l’API pour User

- **Controller** : Gère les requêtes HTTP liées aux utilisateurs, valide les entrées, appelle le service approprié et
  retourne la réponse (ex : UserController.java, AuthController.java).
- **Service** : Contient la logique métier pour les utilisateurs, orchestre les opérations complexes, gère les règles
  métier et les transactions (ex : UserService.java).
- **Repository** : Accès aux données, interface avec la base via JPA/Hibernate, effectue les requêtes CRUD (ex :
  UserRepository.java).
- **Mapper** : Convertit les entités User en DTO et inversement, pour séparer la couche de persistance de la couche
  API (ex : UserMapper.java).
- **DTO (Data Transfer Object)** : Objets utilisés pour transporter les données entre les couches, adaptés à l’API (ex :
  UserDto, UserCreateDto, UserUpdateDto, AuthRequestDto, AuthResponseDto).
- **Model/Entity** : Représente la structure de la table user en base de données, avec les annotations JPA (ex :
  User.java).
- **UserDetailsService** : Permet à Spring Security de charger un utilisateur par son email pour l’authentification (
  ex : CustomUserDetailsService.java). N’influe pas sur le CRUD, mais sur la sécurité/authentification.

---

> Généré automatiquement à partir du code source Java Spring Boot du projet Pecunia.
