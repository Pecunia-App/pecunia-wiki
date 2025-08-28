# Documentation CRUD Tag

## 1. Structure des tables et relations

### Table `tag`

```sql
CREATE TABLE tag
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    tag_name   VARCHAR(20) NOT NULL,
    created_at DATETIME    NOT NULL,
    updated_at DATETIME    NOT NULL
);
```

### Table de jointure `transaction_tag`

```sql
CREATE TABLE transaction_tag
(
    transaction_id BIGINT NOT NULL,
    tag_id         BIGINT NOT NULL,
    PRIMARY KEY (transaction_id, tag_id),
    FOREIGN KEY (transaction_id) REFERENCES transaction (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);
```

> Remarque : Un tag peut être associé à plusieurs transactions (relation ManyToMany).

## 2. Endpoints CRUD Tag

### a. Lire tous les tags (admin)

- **GET** `/tags`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin)
- **Réponse (200, paginé)** :

```json
{
  "content": [
    {
      "id": 1,
      "tagName": "Salaire",
      "createdAt": "2025-08-28T10:00:00",
      "updatedAt": "2025-08-28T10:00:00"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  ...
}
```

### b. Lire tous les tags d’un utilisateur (admin)

- **GET** `/tags/users/{userId}`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin)
- **Réponse (200, paginé)** :

```json
{
  "content": [
    {
      "id": 2,
      "tagName": "Courses",
      "createdAt": "2025-08-28T10:00:00",
      "updatedAt": "2025-08-28T10:00:00"
    }
  ],
  ...
}
```

### c. Lire un tag par ID

- **GET** `/tags/{id}`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin ou propriétaire)
- **Réponse (200)** :

```json
{
  "id": 1,
  "tagName": "Salaire",
  "createdAt": "2025-08-28T10:00:00",
  "updatedAt": "2025-08-28T10:00:00"
}
```

### d. Créer un tag

- **POST** `/tags`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin ou propriétaire)
- **Body (JSON)** :

```json
{
  "tagName": "Vacances"
}
```

- **Réponse (201)** :

```json
{
  "tagName": "Vacances"
}
```

### e. Mettre à jour un tag

- **PUT** `/tags/{id}`
- **Headers** :
    - `Authorization: Bearer <JWT_TOKEN>` (admin ou propriétaire)
- **Body (JSON)** :

```json
{
  "tagName": "Vacances modifié"
}
```

- **Réponse (200)** :

```json
{
  "tagName": "Vacances modifié"
}
```

## 3. Exemples de requêtes Postman

### Créer un tag

- **POST** `/tags`
- Headers : Authorization: Bearer <JWT_TOKEN>
- Body : (raw, JSON)

```json
{
  "tagName": "Santé"
}
```

### Lire tous les tags

- **GET** `/tags`
- Headers : Authorization: Bearer <JWT_TOKEN>

### Lire tous les tags d’un utilisateur

- **GET** `/tags/users/1`
- Headers : Authorization: Bearer <JWT_TOKEN>

### Lire un tag par ID

- **GET** `/tags/1`
- Headers : Authorization: Bearer <JWT_TOKEN>

### Mettre à jour un tag

- **PUT** `/tags/1`
- Headers : Authorization: Bearer <JWT_TOKEN>
- Body : (raw, JSON)

```json
{
  "tagName": "Santé modifié"
}
```

## 4. Requêtes SQL CRUD Tag

### a. Créer un tag

```sql
INSERT INTO tag (tag_name, created_at, updated_at)
VALUES ('Vacances', NOW(), NOW());
```

### b. Lire tous les tags

```sql
SELECT *
FROM tag;
```

### c. Lire un tag par ID

```sql
SELECT *
FROM tag
WHERE id = 1;
```

### d. Mettre à jour un tag

```sql
UPDATE tag
SET tag_name   = 'Vacances modifié',
    updated_at = NOW()
WHERE id = 1;
```

### e. Supprimer un tag

```sql
DELETE
FROM transaction_tag
WHERE tag_id = 1;
DELETE
FROM tag
WHERE id = 1;
```

## 5. Rôle de chaque fichier

- **TagController.java** : Gère les endpoints HTTP pour les tags (CRUD), applique la sécurité (admin ou propriétaire),
  valide les entrées, retourne les réponses.
- **TagService.java** : Logique métier: création, mise à jour, recherche, pagination, validation.
- **TagRepository.java** : Accès aux données, requêtes JPA pour Tag (findByTagName, findByTransactionsWalletUserId,
  etc.).
- **TagMapper.java** : Conversion entre entités Tag et DTOs (TagDto, TagRequestDto).
- **TagDto.java, TagRequestDto.java** : Objets de transfert de données pour la lecture, la création et la mise à jour
  des tags.
- **Tag.java** : Entité JPA représentant la table tag, relation ManyToMany avec Transaction, héritage de BaseEntity.

---

> Généré automatiquement à partir du code source Java Spring Boot du projet Pecunia.

