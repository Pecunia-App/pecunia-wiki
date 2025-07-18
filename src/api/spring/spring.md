# 🌱 Spring

## Présentation
**Spring** est un framework Java open source, largement utilisé pour développer des applications d’entreprise.  
Il fournit une infrastructure **robuste**, **modulaire** et **extensible**, qui permet de créer des applications **maintenables**, **testables** et **scalables**.

---

## ✅ Avantages

### 📈 Popularité et maturité du framework
Spring est l’un des frameworks Java les plus répandus. Il est :

- Massivement documenté  
- Activement maintenu  
- Soutenu par une large communauté

👉 Cela facilite l’adoption de bonnes pratiques, l’intégration de bibliothèques fiables et la résolution rapide des problèmes.

---

## 🧱 Architecture en couches

L’application suit une architecture en couches, favorisant la **séparation des responsabilités** et la **maintenabilité**.  
Chaque couche a un rôle spécifique :

---

### 📂 controller

Gère les **requêtes HTTP** (REST) et renvoie les réponses appropriées.  
Utilise les annotations comme `@RestController`, `@GetMapping`, `@PostMapping`, etc.

**Exemples** : `UserController`, `AuthController`

**Responsabilités** :

- Déléguer la logique métier aux services  
- Valider les entrées utilisateur  
- Retourner les statuts HTTP adaptés (`200`, `404`, etc.)

---

### 📂 dto (Data Transfer Object)

Permet de **transporter les données** entre les couches sans exposer les entités.

**Exemples** : `UserDTO`, `UserRegistrationDTO`

**Responsabilités** :

- Structurer les données entrantes/sortantes  
- Contrôler ce qui est exposé à l’API  
- Sécuriser et simplifier les échanges

---

### 📂 exception

Centralise la **gestion des erreurs**.

**Exemples** : `ResourceNotFoundException`, `GlobalExceptionHandler`

**Responsabilités** :

- Définir des exceptions personnalisées  
- Gérer globalement les erreurs (`@ControllerAdvice`)  
- Fournir des réponses claires aux utilisateurs

---

### 📂 mapper

Convertit les données entre les entités (`model`) et les DTOs (`dto`).

**Exemple** : `UserMapper`

**Responsabilités** :

- Séparer la logique de transformation  
- Faciliter les conversions bidirectionnelles

---

### 📂 model

Contient les **entités JPA** qui représentent les tables de la base de données.

**Exemples** : `User`, `Transaction`

**Responsabilités** :

- Définir les champs persistés  
- Spécifier les relations JPA  
- Ajouter les contraintes de validation

---

### 📂 repository

Gère l’accès aux données avec **Spring Data JPA**.

**Exemple** : `UserRepository extends JpaRepository<User, Long>`

**Responsabilités** :

- Fournir les opérations CRUD  
- Définir des requêtes personnalisées (`findByEmail`, etc.)

---

### 📂 security

Configure la **sécurité de l’application** : authentification, autorisation, filtres.

**Exemples** : `SecurityConfig`, `JwtAuthenticationFilter`, `CustomUserDetailsService`

**Responsabilités** :

- Définir les règles d’accès  
- Gérer le token JWT  
- Sécuriser les endpoints

---

### 📂 service

Contient la **logique métier**.

**Exemples** : `UserService`, `TransactionService`

**Responsabilités** :

- Orchestrer les appels aux repositories  
- Implémenter les règles métier  
- Fournir une API métier aux `controller`

---

## ♻️ Injection de dépendances (IoC)

Spring utilise **l’inversion de contrôle (IoC)** et l’**injection de dépendances**, ce qui permet :

- 🔁 De **réduire le couplage** entre les composants  
- 🧪 De **faciliter les tests unitaires**  
- 🧠 De **centraliser la configuration des beans**

### Exemple de dépendances Maven :

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### 🌐 Orientation RESTful
Spring facilite le développement d’API REST, devenues essentielles dans les architectures modernes, notamment les applications web SPA (Single Page Application) ou mobiles. L'utilisation des annotations comme @RestController, @GetMapping, @PostMapping, etc., rend le développement rapide et clair.

### 🗄️ Gestion simplifiée de la base de données

Nous utilisons **Hibernate** comme implémentation de la spécification **JPA (Java Persistence API)**, couplé à **Spring Data JPA**. Cette combinaison nous permet de simplifier considérablement l'accès aux données et la gestion des entités.

Grâce à **Spring Data JPA**, nous pouvons :

- Définir des **interfaces `Repository`** qui permettent d’effectuer des opérations CRUD (Create, Read, Update, Delete) sans avoir à écrire de requêtes SQL ou HQL manuellement.
- Créer des **requêtes personnalisées** simplement en nommant les méthodes de façon explicite, par exemple :  
  ```java
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByFirstname(String firstname);

    List<User> findByLastname(String lastname);
  ```


### 🧪 Facilité de tests
Spring propose de nombreux outils et annotations pour les tests unitaires et tests d’intégration (@SpringBootTest, @MockBean, etc.), ce qui garantit la qualité logicielle du projet.

---

### 🗂️ Arborescence du projet Spring Boot
```
src
└── main
    ├── java
    │   └── com
    │       └── pecunia
    │           ├── controller
    │           │   └── UserController.java
    │           │
    │           ├── dto
    │           │   ├── UserDTO.java
    │           │   └── UserLoginDTO.java
    │           │   └── UserRegistrationDTO.java
    │           │   └── UserUpdateDTO.jav
    │           │
    │           ├── exception
    │           │   └── GlobalExceptionHandler.java
    │           │   └──ResourceNotFoundException.java
    │           │
    │           ├── mapper
    │           │   └── UserMapper.java
    │           │
    │           ├── model
    │           │   └── User.java
    │           │
    │           ├── repository
    │           │   └── UserRepository.java
    │           │
    │           ├── security
    │           │   ├── AuthenticationService.java
    │           │   ├── JwtAuthenticationFilter.java
    │           │   ├── JwtService.java
    │           │   ├── PasswordMatchersValidator.java
    │           │   ├── PasswordMatches.java
    │           │   ├── SecurityConfig.java
    │           │   └── TokenBlackList.java
    │           │
    │           ├── service
    │           │   ├── CustomUserDetailsService.java
    │           │   └── UserService.java
    │           │
    │           └── MonProjetApplication.java
    │
    └── resources
        ├── staapplication.propertiesc/
        └── application-dev.properties
```

### 🔄 Résumé du flux de données

```text
[Client HTTP]
     ↓
[Controller] → [DTO] → [Service] → [Mapper] → [Model] → [Repository] → [Database]
                                       ↑
                                    [Exception]
                                       ↓
                                [Security Layer]
```
