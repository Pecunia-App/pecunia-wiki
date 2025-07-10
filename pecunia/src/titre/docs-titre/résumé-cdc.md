# Résumé Cahier des Charges
[Daniel Cahier des charges projet](https://docs.google.com/document/d/1zdfWNbLOVNDkv9PzjExoF7eMryWRRTJz6Q-ARtnvIxs/edit?tab=t.0)

[Thomas Cahier des Charges](https://docs.google.com/document/d/1fY8sZrght56zbOffhCjEz12v1ABr2uYiNSZNQd-5EH4/edit?tab=t.0)

## Objectif du projet

L'objectif principal du projet est de développer une application dédiée à la gestion de budget, axée sur les concepts de simplicité et de contrôle financier.

La vision du projet vise à créer un outil pour les utilisateurs souhaitant mieux gérer leurs finances personnelles ou familiales.

L'application doit se distinguer par sa facilité d'utilisation, offrant une expérience fluide aussi bien lors de la planification budgétaire que lors du suivi des dépenses quotidiennes.

L'application permettra à un utilisateur connecté de gérer un portefeuille et les transactions associées.

Une attention particulière est portée à l'intuitivité de l'application, garantissant une saisie aisée des transactions et des catégories budgétaires par les utilisateurs.

Les choix de couleurs s'aligneront sur une charte graphique propre à l'univers de la finance, tout en étant pensés pour être accessibles aux personnes daltoniennes. De même, les polices d'écriture seront choisies pour leur simplicité et leur accessibilité aux personnes atteintes de dyslexie.

L'approche méthodologique adoptée est celle de l'organisation SCRUM, avec des sprints hebdomadaires intégrant le principe d'intégration continue. Cette méthodologie agile permet une gestion efficace du développement, favorisant la flexibilité et la collaboration au sein de l'équipe de travail.

## Fonctionnalités clés

La fonctionnalité centrale du projet, le Minimum Viable Product (MVP), consiste en la mise en œuvre du CRUD (Create, Read, Update, Delete) pour les transactions.

L'accès à ces fonctionnalités sera restreint aux utilisateurs connectés et inclura les actions suivantes :

- Création d'une transaction  
- Consultation d'une transaction  
- Modification d'une transaction  
- Suppression d'une transaction

De plus, l'application inclura les fonctionnalités suivantes :

- CRUD des catégories avec gestion des icônes  
- CRUD sur les fournisseurs  
- Modification du profil utilisateur

L'utilisation de l'application en tant qu'utilisateur connecté nécessitera les actions supplémentaires suivantes :

- Formulaire d'inscription  
- Formulaire de connexion


## Technologies et architecture

Développement de l’application avec le langage de programmation Java via le framework Spring, ce qui induit une architecture Modèle Vue Contrôleur.

Développement Backend :

* Langage de Programmation : Java  
* Framework : Spring (Modèle Vue Contrôleur)  
* Système de Gestion de Base de Données : MySQL  
* ORM : Hibernate (Gestion de la base de données avec Spring)  
* Correcteur de code : Checkstyle

Développement Frontend :

* Framework : Angular  
* Bibliothèque CSS : Bootstrap  
* Préprocesseur CSS : SASS (pour la cohérence avec la maquette visuelle)  
* Langage de Template : HTML5, CSS3

## Sécurité

La sécurité est une priorité dans le développement de cette application de gestion de budget.

Nous utilisons des DTO (Data Transfer Objects) pour sécuriser les échanges de données entre les couches de l'application.

Les communications entre le client et le serveur sont protégées par des protocoles de chiffrement, et les informations sensibles sont stockées de manière sécurisée dans la base de données.

Des pratiques de développement sécurisé, telles que la validation des entrées utilisateur et la prévention des injections SQL, sont rigoureusement appliquées.

L'authentification des utilisateurs est renforcée par l'utilisation de JWT (JSON Web Tokens) pour les sessions utilisateur, assurant ainsi une gestion sécurisée des accès.

