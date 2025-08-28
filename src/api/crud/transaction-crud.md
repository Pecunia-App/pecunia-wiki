# Documentation CRUD Transaction

## 1. Structure des tables et relations

### Table `transaction`

```sql
CREATE TABLE transaction
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    amount     VARCHAR(255) NOT NULL, -- format "123.45|EUR"
    type       VARCHAR(10)  NOT NULL, -- 'CREDIT' ou 'DEBIT'
    note       VARCHAR(20),
    wallet_id  BIGINT       NOT NULL,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    FOREIGN KEY (wallet_id) REFERENCES wallet (id)
);

CREATE TABLE transaction_tag
(
    transaction_id BIGINT NOT NULL,
    tag_id         BIGINT NOT NULL,
    PRIMARY KEY (transaction_id, tag_id),
    FOREIGN KEY (transaction_id) REFERENCES transaction (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);
```

> Remarque : Le montant est stocké sous forme de chaîne (MoneyConverter), la devise est incluse (ex : "100.00|EUR").

### Enum `TransactionType`

- CREDIT
- DEBIT

## 2. Endpoints CRUD Transaction

### a. Lire toutes les transactions (admin)

- **GET** `/transactions`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin)
- **Réponse (200, paginé)** :

```json
{
  "content": [
    {
      "id": 1,
      "type": "CREDIT",
      "note": "Salaire",
      "amount": {
        "amount": 2000.00,
        "currency": "EUR"
      },
      "tags": [
        {
          "id": 1,
          "name": "Salaire"
        }
      ],
      "createdAt": "2025-08-28T10:00:00",
      "updatedAt": "2025-08-28T10:00:00"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  ...
}
```

### b. Lire une transaction par ID

- **GET** `/transactions/{id}`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin ou propriétaire)
- **Réponse (200)** :

```json
{
  "id": 1,
  "type": "CREDIT",
  "note": "Salaire",
  "amount": {
    "amount": 2000.00,
    "currency": "EUR"
  },
  "tags": [
    {
      "id": 1,
      "name": "Salaire"
    }
  ],
  "createdAt": "2025-08-28T10:00:00",
  "updatedAt": "2025-08-28T10:00:00"
}
```

### c. Créer une transaction

- **POST** `/transactions`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin ou propriétaire du wallet)
- **Body (JSON)** :

```json
{
  "amount": {
    "amount": 100.00,
    "currency": "EUR"
  },
  "type": "DEBIT",
  "note": "Courses",
  "walletId": 1,
  "tagsIds": [
    2,
    3
  ]
}
```

- **Réponse (201)** :

```json
{
  "amount": {
    "amount": 100.00,
    "currency": "EUR"
  },
  "type": "DEBIT",
  "note": "Courses",
  "walletId": 1,
  "tagsIds": [
    2,
    3
  ]
}
```

### d. Mettre à jour une transaction

- **PUT** `/transactions/{id}`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin ou propriétaire)
- **Body (JSON)** :

```json
{
  "amount": {
    "amount": 120.00,
    "currency": "EUR"
  },
  "type": "DEBIT",
  "note": "Courses modifiées",
  "tagsIds": [
    2
  ]
}
```

- **Réponse (200)** :

```json
{
  "amount": {
    "amount": 120.00,
    "currency": "EUR"
  },
  "type": "DEBIT",
  "note": "Courses modifiées",
  "createdAt": "2025-08-28T10:00:00",
  "tagsIds": [
    2
  ]
}
```

### e. Supprimer une transaction

- **DELETE** `/transactions/{id}`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin ou propriétaire)
- **Réponse (204)** : Aucun contenu

## 3. Exemples de requêtes Postman

### Créer une transaction

- **POST** `/transactions`
- Headers : Authorization: Bearer <JWT_TOKEN>
- Body : (raw, JSON)

```json
{
  "amount": {
    "amount": 50.00,
    "currency": "EUR"
  },
  "type": "CREDIT",
  "note": "Remboursement",
  "walletId": 1,
  "tagsIds": [
    1
  ]
}
```

### Lire toutes les transactions (admin)

- **GET** `/transactions`
- Headers : Authorization: Bearer <JWT_TOKEN>

### Lire une transaction par ID

- **GET** `/transactions/1`
- Headers : Authorization: Bearer <JWT_TOKEN>

### Mettre à jour une transaction

- **PUT** `/transactions/1`
- Headers : Authorization: Bearer <JWT_TOKEN>
- Body : (raw, JSON)

```json
{
  "amount": {
    "amount": 60.00,
    "currency": "EUR"
  },
  "type": "CREDIT",
  "note": "Remboursement modifié",
  "tagsIds": [
    1
  ]
}
```

### Supprimer une transaction

- **DELETE** `/transactions/1`
- Headers : Authorization: Bearer <JWT_TOKEN>

## 4. Requêtes SQL CRUD Transaction

### a. Créer une transaction

```sql
INSERT INTO transaction (amount, type, note, wallet_id, created_at, updated_at)
VALUES ('100.00|EUR', 'DEBIT', 'Courses', 1, NOW(), NOW());

INSERT INTO transaction_tag (transaction_id, tag_id)
VALUES (LAST_INSERT_ID(), 2),
       (LAST_INSERT_ID(), 3);
```

### b. Lire toutes les transactions

```sql
SELECT *
FROM transaction;
```

### c. Lire une transaction par ID

```sql
SELECT *
FROM transaction
WHERE id = 1;
```

### d. Mettre à jour une transaction

```sql
UPDATE transaction
SET amount     = '120.00|EUR',
    type       = 'DEBIT',
    note       = 'Courses modifiées',
    updated_at = NOW()
WHERE id = 1;
DELETE
FROM transaction_tag
WHERE transaction_id = 1;
INSERT INTO transaction_tag (transaction_id, tag_id)
VALUES (1, 2);
```

### e. Supprimer une transaction

```sql
DELETE
FROM transaction_tag
WHERE transaction_id = 1;
DELETE
FROM transaction
WHERE id = 1;
```

## 5. Rôle de chaque fichier

- **TransactionController.java** : Gère les endpoints HTTP pour les transactions (CRUD), applique la sécurité (admin ou
  propriétaire), valide les entrées, retourne les réponses.
- **TransactionService.java** : Logique métier: création, mise à jour, suppression, gestion du solde du wallet,
  validation, sécurité métier.
- **TransactionRepository.java** : Accès aux données, requêtes JPA pour Transaction (findByWalletId,
  existsByIdAndWalletUserId, etc.).
- **TransactionMapper.java** : Conversion entre entités Transaction et DTOs (TransactionDto, TransactionCreateDto,
  TransactionUpdateDto).
- **TransactionCreateDto.java, TransactionDto.java, TransactionUpdateDto.java** : Objets de transfert de données pour la
  création, la lecture et la mise à jour des transactions.
- **Transaction.java** : Entité JPA représentant la table transaction, relations avec Wallet et Tag, héritage de
  BaseEntity.
- **Money.java, MoneyConverter.java** : Value Object pour le montant (Money), conversion JPA (stockage en base sous
  forme de chaîne).
- **TransactionType.java** : Enumération du type de transaction (CREDIT, DEBIT).
- **CanAccessTransaction.java, HasRole.java** : Annotations de sécurité personnalisées pour contrôler l’accès aux
  endpoints selon le rôle ou la propriété.
- **PositiveMoney.java, MoneyPositiveOrZeroValidator.java** : Validation personnalisée pour garantir que le montant est
  positif ou nul lors de la création.

---

> Généré automatiquement à partir du code source Java Spring Boot du projet Pecunia.

