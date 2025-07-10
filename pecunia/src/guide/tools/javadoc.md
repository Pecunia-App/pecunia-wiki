# Javadoc

Comme en Javascript avec la JSDoc, il extiste en Java, le Javadoc qui permet de documenter notre codebase et générer une page HTML avec toutes nos classes et méthodes.

En lien avec le checkstyle de Google, on devra document nos méthodes et classes afin de rendre claire notre code et qu'il puisse être compréhensible par d'autres développeur.euses.

### Installation

Un plugin est disponible avec maven : 

```xml
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-javadoc-plugin</artifactId>
<version>3.6.2</version>
<configuration>
<source>1.8</source>
<target>1.8</target>
</configuration>
</plugin>
```

Avec ce plugin on a notre disposition 16 commandes mais on va en utliser que quelques une normalement.

* `mvn javadoc:javadoc` va générer la documentation dans le dossier target/site encore
* `mvn javadoc:fix`  va formatter correctement les commentaires javadoc de notre projet (Attention ca affecte l'ENSEMBLE du projet)

A modifier dans le futur afin de lancer pendant la CI et éviter des duplications d'éxécution pour la phase de `generate-ressources`

source : [https://maven.apache.org/plugins/maven-javadoc-plugin/](https://maven.apache.org/plugins/maven-javadoc-plugin/)
