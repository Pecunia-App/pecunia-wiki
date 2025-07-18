# Configuration du serveur

Il y a plusieurs configurations à faire sur le serveur.

## UFW
On commencer par installer `ufw` qui est un firewall qui permet d'autoriser ou de bloquer certains ports et protocoles.

Ici, on va vouloir autoriser les ports concernant : 
- 22/tcp Ipv4 et Ipv6, utiliser pour la connection en **SSH**
- 443 Ipv4 et Ipv6, utiliser pour la connection **https**

source: [How to config ufw](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu) 

## Fail2ban

Fail2ban est service qui permet de bloquer les multiples connexions parasites.
Typiquement, un nombre élevé et répété de tentatives infructueuses de connexion provenant d'une même machine.

Lorsqu'une correspondance à un filtre est détecté, l'adresse IP sera banni."

source : [How to config fail2ban](https://www.hostinger.com/tutorials/fail2ban-configuration) 

