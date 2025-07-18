
# Sring 

## Présentation.
Spring est un framework open source pour Java, largement utilisé dans le développement d'applications d'entreprise. Il fournit une infrastructure robuste, modulaire et extensible, permettant de concevoir des applications maintenables, testables et évolutives.


## Avantages

### Popularité et maturité du framework
Spring est l’un des frameworks les plus utilisés dans le monde Java. Il est largement documenté, activement maintenu et bénéficie d’une grande communauté. Cela permet un accès rapide aux bonnes pratiques, à des solutions éprouvées et à des bibliothèques fiables.


### 🧱 Architecture

L’application suit une architecture en couches, respectant les bonnes pratiques de séparation des responsabilités et de maintenabilité. Chaque couche a un rôle précis dans le fonctionnement global de l’application.

---

#### 📂 controller

Contient les **contrôleurs REST** qui exposent les endpoints de l'API.  
Ils reçoivent les requêtes HTTP, délèguent le traitement à la couche service, et renvoient les réponses HTTP.

**Exemples de classes :**
- `UserController`
- `AuthController`

**Responsabilités :**
- Mapper les routes HTTP (`@GetMapping`, `@PostMapping`, etc.)
- Valider les entrées utilisateur
- Gérer les codes de réponse (`200 OK`, `404 Not Found`, etc.)

---

#### 📂 dto (Data Transfer Object)

Contient les objets utilisés pour **transporter les données entre les couches**, notamment entre la couche `controller` et la couche `service`.

**Exemples de classes :**
- `UserDTO`
- `UserRegistrationDTO`

**Responsabilités :**
- Encapsuler les données entrantes (POST, PUT)
- Contrôler les champs exposés en sortie (GET)
- Éviter l'exposition directe des entités (`model`)

---

#### 📂 exception

Contient la gestion centralisée des erreurs.

**Exemples de classes :**
- `ResourceNotFoundException`
- `GlobalExceptionHandler` (`@ControllerAdvice`)

**Responsabilités :**
- Définir les exceptions personnalisées
- Gérer les erreurs globalement (retourner un message d’erreur clair avec le bon code HTTP)
- Éviter les erreurs techniques exposées aux utilisateurs

---

#### 📂 mapper

Contient les classes responsables de la **conversion entre les entités (`model`) et les DTOs (`dto`)**.

**Exemples de classes :**
- `UserMapper`

**Responsabilités :**
- Convertir un `User` (entité) en `UserResponseDTO`
- Convertir un `UserDTO` en `User` pour l’enregistrement
- Séparer la logique de transformation de données

---

#### 📂 model

Contient les **entités JPA** représentant les tables de la base de données.

**Exemples de classes :**
- `User`
- `Transaction`

**Responsabilités :**
- Définir la structure des objets persistés
- Spécifier les relations (OneToMany, ManyToOne, etc.)
- Définir les contraintes de validation (via `@NotNull`, etc.)

---

#### 📂 repository

Contient les interfaces qui permettent l’accès aux données via **Spring Data JPA**.

**Exemples de classes :**
- `UserRepository extends JpaRepository<User, Long>`

**Responsabilités :**
- Accès à la base de données
- Requêtes CRUD standard ou personnalisées (`findByEmail`, etc.)
- Séparation des opérations d’accès aux données de la logique métier

---

#### 📂 security

Contient la configuration de **la sécurité de l’application** (authentification, autorisation, etc.).

**Exemples de classes :**
- `SecurityConfig`
- `JwtAuthenticationFilter`
- `UserDetailsServiceImpl`

**Responsabilités :**
- Définir les règles d’accès (routes protégées)
- Gérer les filtres de sécurité (JWT, session, etc.)
- Configurer les utilisateurs, rôles et droits

---

#### 📂 service

Contient la **logique métier** de l’application.

**Exemples de classes :**
- `UserService`
- `TransactionService`

**Responsabilités :**
- Implémenter les règles métiers
- Orchestrer les appels vers les repositories, mappers et autres services
- Fournir une API métier aux contrôleurs

Cela facilite la lisibilité du code, la réutilisabilité des composants et la testabilité de chaque couche.

---

### Injection de dépendances (IoC)
Spring repose sur le principe de l'inversion de contrôle (IoC) et l’injection de dépendances, ce qui permet de réduire les couplages entre les composants. Cela améliore la flexibilité du code et facilite les tests unitaires.

#### 🎯 Avantages de l'injection de dépendances

- **Réduction du couplage** entre les classes : chaque composant dépend d’abstractions plutôt que de classes concrètes.
- **Code plus modulaire et testable** : nous pouvons facilement simuler (mock) des composants pour tester isolément la logique métier.
- **Centralisation de la configuration** : le cycle de vie des objets est géré automatiquement par Spring.

#### 🛠️ Utilisation dans notre projet avec Maven

Nous utilisons **Maven** pour la gestion de notre projet, ce qui nous permet de :

- **Déclarer les dépendances Spring** dans le fichier `pom.xml` :

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

### Orientation RESTful
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


### Facilité de tests
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
    │           │   └── TockenBlackList.java
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
