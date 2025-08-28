# Documentation CRUD Wallet

## 1. Structure des tables et relations

### Table `wallet`

```sql
CREATE TABLE wallet
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    name           VARCHAR(255)   NOT NULL,
    amount_balance DECIMAL(19, 2) NOT NULL,
    user_id        BIGINT UNIQUE  NOT NULL,
    created_at     DATETIME       NOT NULL,
    updated_at     DATETIME       NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `user` (id)
);
```

> Remarque : Chaque wallet est lié à un utilisateur unique (relation 1-1 via user_id).

## 2. Endpoints CRUD Wallet

### a. Créer un wallet

- **POST** `/wallets`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>`

> Note : Un token JWT valide est requis dans l’en-tête Authorization pour accéder à cet endpoint, que ce soit en tant
> qu’utilisateur concerné ou administrateur.

- **Body (JSON)** :

```json
{
  "name": "MonPortefeuille",
  "amount": {
    "amount": 100.00,
    "currency": "EUR"
  },
  "userId": 1
}
```

- **Réponse (201)** :

```json
{
  "name": "MonPortefeuille",
  "amount": {
    "amount": 100.00,
    "currency": "EUR"
  },
  "userId": 1
}
```

### b. Lire tous les wallets

- **GET** `/wallets` (ADMIN)
- **Réponse (200)** :

```json
[
  {
    "id": 1,
    "name": "MonPortefeuille",
    "amount": {
      "amount": 100.00,
      "currency": "EUR"
    }
  },
  ...
]
```

### c. Lire un wallet par ID

- **GET** `/wallets/{id}` (ADMIN ou propriétaire)
- **Réponse (200)** :

```json
{
  "id": 1,
  "name": "MonPortefeuille",
  "amount": {
    "amount": 100.00,
    "currency": "EUR"
  }
}
```

### d. Mettre à jour un wallet

- **PUT** `/wallets/{id}` (ADMIN ou propriétaire)
- **Body (JSON)** :

```json
{
  "name": "MonPortefeuilleModifié",
  "amount": {
    "amount": 150.00,
    "currency": "EUR"
  }
}
```

- **Réponse (200)** :

```json
{
  "name": "MonPortefeuilleModifié",
  "amount": {
    "amount": 150.00,
    "currency": "EUR"
  }
}
```

### e. Supprimer un wallet

- **DELETE** `/wallets/{id}` (ADMIN ou propriétaire)
- **Réponse (204)** : Aucun contenu

### f. Transactions d’un wallet

- **GET** `/wallets/{id}/transactions` (ADMIN ou propriétaire)
- **Réponse (200)** :

```json
[
  {
    "id": 1,
    "type": "CREDIT",
    "amount": {
      "amount": 50.00,
      "currency": "EUR"
    },
    ...
  },
  ...
]
```

## 3. Exemples de requêtes Postman

### Créer un wallet

- **POST** `/wallets`
- Body : (raw, JSON)

```json
{
  "name": "PortefeuilleTest",
  "amount": {
    "amount": 200.00,
    "currency": "EUR"
  },
  "userId": 2
}
```

### Lire tous les wallets

- **GET** `/wallets`
- Header : Authorization: Bearer <JWT_TOKEN>

### Lire un wallet par ID

- **GET** `/wallets/1`
- Header : Authorization: Bearer <JWT_TOKEN>

### Mettre à jour un wallet

- **PUT** `/wallets/1`
- Header : Authorization: Bearer <JWT_TOKEN>
- Body : (raw, JSON)

```json
{
  "name": "PortefeuilleModif",
  "amount": {
    "amount": 300.00,
    "currency": "EUR"
  }
}
```

### Supprimer un wallet

- **DELETE** `/wallets/1`
- Header : Authorization: Bearer <JWT_TOKEN>

## 4. Requêtes SQL CRUD Wallet

### a. Créer un wallet

```sql
INSERT INTO wallet (name, amount_balance, user_id, created_at, updated_at)
VALUES ('MonPortefeuille', 100.00, 1, NOW(), NOW());
```

### b. Lire tous les wallets

```sql
SELECT *
FROM wallet;
```

### c. Lire un wallet par ID

```sql
SELECT *
FROM wallet
WHERE id = 1;
```

### d. Mettre à jour un wallet

```sql
UPDATE wallet
SET name           = 'MonPortefeuilleModifié',
    amount_balance = 150.00,
    updated_at     = NOW()
WHERE id = 1;
```

### e. Supprimer un wallet

```sql
DELETE
FROM wallet
WHERE id = 1;
```

## 5. Rôle de chaque couche de l’API

- **Controller** : Gère les requêtes HTTP, valide les entrées, appelle le service approprié et retourne la réponse (ex :
  WalletController.java).
- **Service** : Contient la logique métier, orchestre les opérations complexes, gère les transactions et les règles
  métier (ex : WalletService.java).
- **Repository** : Accès aux données, interface avec la base via JPA/Hibernate, effectue les requêtes CRUD (ex :
  WalletRepository.java).
- **Mapper** : Convertit les entités en DTO et inversement, pour séparer la couche de persistance de la couche API (ex :
  WalletMapper.java).
- **DTO (Data Transfer Object)** : Objets utilisés pour transporter les données entre les couches, adaptés à l’API (ex :
  WalletDto, WalletCreateDto, WalletUpdateDto).
- **Model/Entity** : Représente la structure des tables en base de données, avec les annotations JPA (ex : Wallet.java).

---

> Généré automatiquement à partir du code source Java Spring Boot du projet Pecunia.
