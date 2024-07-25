# VERSION NIVEAU HARD

# Sujet CTF - "La Quête du Stagiaire"

## Contexte

Vous êtes chargé de résoudre un défi de Capture The Flag (CTF) sur un site web vulnérable. Le ctf a été conçu avec plusieurs failles de sécurité que vous devrez exploiter pour trouver des flags et obtenir des informations sensibles. Votre mission implique des compétences en reconnaissance, analyse de réseau, et exploitation des failles de sécurité.

Le site web contient des informations critiques éparpillées et nécessite l'utilisation d'outils et techniques spécifiques pour découvrir des flags et obtenir des informations sensibles. Suite a cette récolte d'information, vous devrez interagir avec le serveur via SSH, exploiter des failles de configuration, et analyser les requêtes réseau pour réussir.


*Dézippez le fichier et exécutez le script compilé inclus dans l'archive pour le flag 3*




# VERSION NIVEAU MOYEN

# Sujet CTF - "La Quête du Stagiaire"

## Contexte

Vous êtes chargé de résoudre un défi de Capture The Flag (CTF) sur un site web vulnérable. Le ctf a été conçu avec plusieurs failles de sécurité que vous devrez exploiter pour trouver des flags et obtenir des informations sensibles. Votre mission implique des compétences en reconnaissance, analyse de réseau, et exploitation des failles de sécurité.

### Étape 1 : Exploration et Accès

1. **Scan des sous-répertoires**  
   Utilisez un outil de reconnaissance pour scanner les sous-répertoires accessibles sur le site web hébergé à `http://localhost`. Recherchez des répertoires cachés ou intéressants qui pourraient contenir des indices.

2. **Access**  
   Utilisez un outil de scan de ports pour identifier les ports ouverts sur le serveur.
   Connectez-vous via SSH avec les identifiants trouvés.

### Étape 2 : Escalade de Privilèges

1. **Indice**  
   Vous trouvez un fichier nommé `flag2_hint` qui est verrouillé. Ce fichier peut être lu en utilisant `sudoedit`.
   Rendez-vous sur [Exploit-DB](https://www.exploit-db.com/) pour rechercher des exploits relatifs à ce que vous avez trouvée. Identifiez l'exploit qui peut être utilisé pour obtenir des privilèges élevés sur ce système.

### Étape 3 : Capture du Flag Final

1. **Téléchargement et Dézippage**  
   Téléchargez le fichier `flag3.zip`. Ce fichier est protégé par un mot de passe, peut-être que le flag précédent vous permettra de l'ouvrir...
   Dézippez le fichier et exécutez le script compilé inclus dans l'archive.

2. **Interception du Flag**  
   Utilisez `Wireshark` pour capturer les requêtes POST envoyées par le script. 






# VERSION NIVEAU EASY

# Sujet CTF - "La Quête du Stagiaire"

## Contexte

Vous êtes chargé de résoudre un défi de Capture The Flag (CTF) sur un site web vulnérable. Le ctf a été conçu avec plusieurs failles de sécurité que vous devrez exploiter pour trouver des flags et obtenir des informations sensibles. Votre mission implique des compétences en reconnaissance, analyse de réseau, et exploitation des failles de sécurité.

Le site web contient des informations critiques éparpillées et nécessite l'utilisation d'outils et techniques spécifiques pour découvrir des flags et obtenir des informations sensibles. Suite a cette récolte d'information, vous devrez interagir avec le serveur via SSH, exploiter des failles de configuration, et analyser les requêtes réseau pour réussir.

## Objectifs

### Étape 1 : Exploration et Accès

1. **Scan des sous-répertoires**  
   Utilisez un outil de reconnaissance pour découvrir les sous-répertoires accessibles sur le site web hébergé à `http://localhost`.

2. **Découverte d'un accès SSH**  
   L'URL `http://localhost/intern` révèle des informations sur un accès SSH récemment créé pour le stagiaire, avec les identifiants éparpillés sur la page. Trouvez les informations de connexion nécessaires pour accéder au serveur SSH.

3. **Scan des ports**  
   Utilisez un outil de scan de ports pour identifier le port SSH ouvert sur le serveur. Notez que le port SSH peut être étiqueté comme inconnu.

4. **Localisation du flag**  
   Connectez-vous via SSH avec les identifiants trouvés et localisez le flag dans le répertoire home de l'utilisateur.

### Étape 2 : Escalade de Privilèges

1. **Indice pour sudo**  
   Vous trouvez un fichier nommé `flag2_hint` qui est verrouillé en écriture. Ce fichier peut être modifié à l'aide de `sudoedit`. Vérifiez la version de `sudo` installée sur le système pour déterminer les possibles exploits.

2. **Recherche d'un exploit**  
   Rendez-vous sur [Exploit-DB](https://www.exploit-db.com/) pour rechercher des exploits relatifs à la version de `sudo` trouvée. Trouvez l'exploit correspondant à la version de `sudo` présente sur le système.

3. **Exécution de l'exploit**  
   Exécutez l'exploit pour éditer le fichier sudoers et ajouter une ligne permettant l'élévation de privilèges pour votre session.

### Étape 3 : Capture du Flag Final

1. **Téléchargement et Dézippage**  
   Téléchargez le fichier `flag3.zip`. Ce fichier est protégé par un mot de passe, peut-être que le flag précédent vous permettra de l'ouvrir...
   Dézippez le fichier et exécutez le script compilé inclus dans l'archive.

2. **Interception du Flag**  
   Utilisez `Wireshark` pour capturer les requêtes POST envoyées par le script. Configurez Wireshark pour écouter sur l'interface `lo` (loopback) et utilisez un filtre pour capturer les requêtes POST. Recherchez le flag dans les octets des requêtes POST interceptées.


# Capture The Flag - Solution

## Étape 1

1. **Scan des sous-répertoires**  

    Utiliser `dirb` pour scanner les sous-répertoires :  

    ```bash
    dirb http://localhost
    ```

2. **Découverte d'un accès SSH**

    L'URL http://localhost/intern révèle qu'un accès SSH a été créé pour le stagiaire, avec les identifiants éparpillés sur la page.  
    Les informations de connexion sont :
    - Login : zeph 
    - Mot de passe : 1995-06-15 

3. **Scan des ports**

    Trouver le port SSH en utilisant nmap :

    ```bash
    nmap -p- localhost
    ```
    Le port SSH est 64242 (étiqueté comme inconnu).

4. **Localisation du flag**

    Le flag est situé dans le répertoire home de l'utilisateur.

    Flag : FLAG{Pas_mal_pour_un_stagiaire_...}

## Étape 2

1. **Indice**

    L'indice est avec le flag1, "flag2_hint" qui est uniquement éditable avec `sudoedit`.  
    Vérifiez la version de sudo :

    ```bash
    sudo --version
    ```

2. **Recherche d'un exploit**

    Rendez-vous sur [Exploit-DB](https://www.exploit-db.com/) pour vérifier les exploits disponibles pour `sudo`.  
    La version de `sudo` correspond à un exploit disponible : [Exploit-DB 51217](https://www.exploit-db.com/exploits/51217).

3. **Exécution de l'exploit**

    - Exécutez l'exploit pour éditer le fichier sudoers :  
    Ajoutez la ligne suivante dans le fichier sudoers pour permettre l'élévation de privilège :


      ```text
      le_nom_de_la_session ALL=(ALL:ALL) ALL
      ```
    - Le flag est situé à la racine du système (utilisez `cd` pour y accéder).

    Flag : FLAG{Pas_mal_finalement_les_updates...!?}

## Étape 3

1. **Téléchargement et dézippage**

    - Téléchargez le fichier `flag3.zip`.  
    - Pour dézipper le fichier, vous aurez besoin du flag2. Après avoir dézippé le fichier, exécutez le script compilé.

2. **Interception du flag**

    - Ouvrez `Wireshark`.
    - Sélectionnez l'interface `lo` (loopback).
    - Utilisez le filtre suivant pour trouver les requêtes POST :

    ```plaintext
    http.request.method == "POST"
    ```

    - Le flag se trouve dans les octets des requêtes POST interceptées.

    Flag : FLAG{Mais_oui_c'est_clair!}
