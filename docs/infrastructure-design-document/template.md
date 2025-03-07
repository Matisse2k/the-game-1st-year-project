---
title: Template
---

# Infrastructure design document

## Inleiding


Lucastars is een game-ontwikkelstudio die zich richt op innovatieve en interactieve game-ervaringen. De organisatie bestaat uit verschillende stakeholders, waaronder de Product Owner (P.O.), de Chief Technology Officer (CTO), en het ontwikkelteam. Deze stakeholders spelen een cruciale rol bij het definiëren van de functionele en technische vereisten van de game. Daarnaast zijn docenten en begeleiders betrokken bij het proces om de kwaliteit van het eindproduct te bewaken en studenten te ondersteunen in hun ontwikkeling.

Het doel van dit verslag is om de technische netwerkeisen voor de game te bepalen. Dit is onderzocht door bestaande technische productdocumentatie, documentatie van Express.js en gesprekken met de Product Owner te analyseren. De hoofdvraag die hierbij centraal staat, luidt: "Wat zijn de technische netwerkeisen die nodig zijn om de game optimaal te laten functioneren?"

Om deze hoofdvraag te beantwoorden, worden verschillende onderwerpen behandeld, zoals de benodigde serverarchitectuur, netwerkbeveiliging, dataverwerking en opslag, en interacties tussen gebruikers en de infrastructuur. Hierdoor ontstaat een helder beeld van de vereisten voor de IT-infrastructuur van de game.

# Context en Vereisten

## Organisatorische Context

**Opdracht en Opdrachtgever**

De game wordt ontwikkeld als een Proof of Concept voor Game Studio Lucastars. Het project wordt begeleid door de Product Owner en de CTO, die gezamenlijk de technische en inhoudelijke eisen formuleren. Het ontwikkelteam is verantwoordelijk voor de implementatie en het onderhoud van de game.

**Gebruikers en hun Rollen**

**Spelers:** Interacteren met de game, slaan voortgang op en hervatten het spel.

**Ontwikkelteam:** Werkt aan de ontwikkeling van de gamefunctionaliteit, de backend en de database.

**Docenten & Begeleiders:** Begeleiden het ontwikkelproces en beoordelen de kwaliteit van het eindproduct.

# Contextbeschrijving

**Wie zijn de gebruikers van de infrastructuur? :**

Spelers, ontwikkelaars, en docenten.

**Welke acties voeren zij uit? Hoe vaak? :**

Spelers spelen de game dagelijks en slaan voortgang op.

Ontwikkelaars updaten en onderhouden de infrastructuur wekelijks.

Docenten beoordelen de game per iteratie.

**Welke bedrijfsdoelen ondersteunt de infrastructuur? :**

Het leveren van een stabiele en veilige spelervaring.

Het faciliteren van efficiënte ontwikkeling en onderhoud.

**Welke interacties vinden plaats tussen gebruikers en de infrastructuur? :**

Spelers communiceren met de backend voor data-opslag en game-logica.

Ontwikkelaars werken aan en testen de infrastructuur.

**Hoe worden gegevens verwerkt, opgeslagen en beveiligd binnen de infrastructuur? :**

Data wordt opgeslagen in een centrale database en beveiligd via encryptie en toegangsbeheer.

**Welke eisen of verwachtingen stellen stakeholders aan de infrastructuur? :**

Hoge beschikbaarheid, lage latentie, en sterke beveiligingsmaatregelen.

## Technische Context

**Stap 2: Beschrijf de belangrijkste infrastructuur-concepten**

Gebruik de HBO-ICT Knowledgebase om de infrastructuur-concepten beter te begrijpen en concreet te maken. Hier zijn enkele voorbeelden:

-   Centrale data-opslag: Een database waarin voortgang, keuzes en spelgegevens worden opgeslagen, zoals MySQL.

-   API's voor communicatie: Back-end endpoints gebouwd met Express om frontend en database te verbinden.

-   Authenticatie en beveiliging: Mechanismen zoals inloggen, HTTPS, en encryptie om gegevens veilig te houden.

-   Frontend-componenten: Herbruikbare en modulaire elementen met Web Components om de gebruikersinterface te ondersteunen.

-   Data-uitwisseling: Gebruik van de Fetch API voor real-time communicatie tussen de frontend en backend.

> De volgende Deployment Diagram geeft inzicht in de verschillende onderdelen van "The Game":

![Deployment diagram the game](./assets/deployment.png)

Deze concepten ondersteunen functionele vereisten zoals het opslaan van voortgang, veilige communicatie, en ondersteuning voor meerdere gebruikers. Raadpleeg de HBO-ICT Knowledgebase voor uitgebreide uitleg en praktische voorbeelden.

## Vereisten, standaarden, en richtlijnen

**Stap 3: Beschrijf vereisten, standaarden, en richtlijnen**

Bij het ontwerpen van de infrastructuur moet je de vereisten, standaarden, en richtlijnen van de opdrachtgever helder beschrijven. Je moet ze niet alleen noemen, maar ook uitleggen wat hier voor nodig is. Overleg met de product owner over wat hij hier van jullie verwacht. Hier zijn enkele voorbeelden:

### Functionele vereisten

-   Minstens 100 gelijktijdige spelers kunnen de game spelen.

-   Gebruikers kunnen als de P.O. dit wil voortgang opslaan en hervatten op verschillende apparaten.

-   De game is toegankelijk via een webbrowser met een centrale database, of wellicht ook via een app.

### Technische vereisten

-   De API ondersteunt veilige communicatie via HTTPS.

-   Data wordt centraal opgeslagen in een database.

-   Er is een schaalbare infrastructuur om groeiende spelersaantallen aan te kunnen.

### Standaarden en richtlijnen

-   Volg industriepraktijken zoals OWASP-beveiligingsrichtlijnen voor veilige API's.

-   Gebruik coding standards voor TypeScript en Node.js, zoals de ESLint-configuratie in de HBO-ICT Knowledgebase.

### Wetten en regelgeving

-   Voldoe aan privacywetten zoals de AVG (GDPR) bij het opslaan van gebruikersdata.

Tip: Controleer of alle vereisten testbaar zijn. Testbaarheid helpt je later in het project om succes te meten en eventuele aanpassingen te maken. Raadpleeg de HBO-ICT Knowledgebase voor meer details over standaarden en richtlijnen.

# Infrastructuur

Dit hoofdstuk richt zich op het beschrijven van de infrastructuur zoals deze draait op de HBO-ICT.Cloud. Tijdens de ontwikkeling werkt het team lokaal (op je eigen pc) aan de game, maar voor testen en productie wordt gebruikgemaakt van een ontwikkel- en liveomgeving op de HBO-ICT.Cloud. Aangezien de infrastructuur vooraf is vastgelegd, ligt de nadruk op het documenteren van bestaande configuraties, het verduidelijken van de communicatie tussen onderdelen en het onderzoeken van verbeterpunten.

## Inrichting van de infrastructuur

**Stap 4: Beschrijf de inrichting van de infrastructuur**

De infrastructuur voor dit project wordt volledig gehost op de HBO-ICT.Cloud, bestaande uit:

1. **Frontend:**
   - Een statisch gehoste webapplicatie.
   - Gebouwd met moderne webtechnologieën zoals HTML, CSS, en TypeScript.
   - De frontend communiceert met de backend via API-aanroepen.

2. **Backend:**
   - Een API-server, draaiend op Express.js.
   - Verantwoordelijk voor het verwerken van verzoeken van de frontend.

3. **CI/CD-pipeline:**
   - Geautomatiseerde processen voor het bouwen, testen en deployen van de applicatie.
   - Zorgt voor een consistente en betrouwbare uitrol van nieuwe versies naar de HBO-ICT.Cloud.
   - Maakt gebruik van tools zoals GitLab CI/CD.


Hier onder ziet u de links van de front en de backend van onze game.

- Frontend URL: [https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud](https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud)
- Backend URL: [https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud/api/](https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud/api/)

<!-- TODO: ask Lennard about the ports. Do they mean port 3001 for the api? -->
-   Poorten: De frontend gebruikt poort 3000 en de backend API gebruikt poort 3001 voor communicatie.

## Communicatie en sequence diagram

**Stap 5: Beschrijf de communicatie tussen de systemen**

Hieronder staat ons sequence diagram. Dit diagram illustreert een fetch-verzoek van de frontend naar de backend en terug.


```sequence
sequenceDiagram
    participant Gebruiker
    participant Frontend
    participant Backend

    Gebruiker->>Frontend: Voer "Pick Up" actie uit
    Frontend->>Backend: HTTP POST /game/action
    note right of Frontend: 
        Methode: POST
        Headers: 
            - Content-Type: application/json
            - X-PlayerSessionId: {sessionId}
        Adres: /game/action
        Body: { action: "pick up", objects: [{itemAlias}] }
    Backend->>GameController: handleActionRequest(req, res)
    GameController->>GameController: executeAction(actionAlias, gameObjectAliases)
    GameController->>GameService: executeAction(actionAlias, gameObjects)
    GameService-->>GameController: ActionResult
    GameController->>GameController: convertActionResultToGameState(actionResult)
    GameController-->>Backend: GameState
    Backend-->>Frontend: HTTP Response 200 OK
    note right of Backend: 
        Headers: 
            - Content-Type: application/json
        Body: { gameState }
    Frontend->>Backend: HTTP GET /game/inventory
    note right of Frontend: 
        Methode: GET
        Headers: 
            - Content-Type: application/json
            - X-PlayerSessionId: {sessionId}
        Adres: /game/inventory
    Backend->>GameController: handleInventoryRequest(req, res)
    GameController->>GameService: getPlayerSession()
    GameService-->>GameController: PlayerSession
    GameController-->>Backend: Inventory
    Backend-->>Frontend: HTTP Response 200 OK
    note right of Backend: 
        Headers: 
            - Content-Type: application/json
        Body: [{item1}, {item2}, ...]
    Frontend-->>Gebruiker: Toon inventaris [{item1}, {item2}, ...]

    Gebruiker->>Frontend: Klik op een item
    Frontend->>Backend: HTTP GET /game/item/{alias}/description
    note right of Frontend: 
        Methode: GET
        Headers: 
            - Content-Type: application/json
            - X-PlayerSessionId: {sessionId}
        Adres: /game/item/{alias}/description
    Backend->>GameController: handleItemDescriptionRequest(req, res)
    GameController-->>Backend: Item Description
    Backend-->>Frontend: HTTP Response 200 OK
    note right of Backend: 
        Headers: 
            - Content-Type: application/json
        Body: {description}
    Frontend-->>Gebruiker: Toon item beschrijving {description}

## Beveiliging van de infrastructuur

**Stap 6: Omschrijf hoe de systemen veilig ingericht kunnen worden**

De Express.js-server biedt mogelijkheden om de infrastructuur veiliger te maken. Onderzoek en beschrijf welke beveiligingen je kunt implementeren, zoals:

-   HTTPS: Je hoeft HTTPS niet zelf te configureren, omdat dit al standaard is geregeld binnen de HBO-ICT.Cloud. Alle communicatie via de cloudomgeving verloopt automatisch versleuteld.Inputvalidatie: Bescherm tegen injectie-aanvallen door gebruikersinput te valideren.

-   Rate limiting: Beperk het aantal requests per gebruiker om misbruik te voorkomen.

-   CORS: Stel specifieke regels in voor welke domeinen toegang hebben tot de API.

-   Environment variables: Gebruik .env-bestanden om gevoelige gegevens zoals wachtwoorden en API-keys veilig te beheren.

# Realiseren

In dit hoofdstuk beschrijf je hoe het project live wordt gezet op de HBO-ICT.Cloud, welke beveiligingsmaatregelen je implementeert, en hoe je omgaat met de inrichting van de database.

## Deployen op de HBO-ICT.Cloud

**Stap 7: Omschrijf hoe je het project uitrolt op de HBO-ICT.Cloud en welke methode je gebruikt:**

In het begin hebben wij het eerst handmatig uitgerold naar de cloud via Filezilla. Na een paar weken zijn we overgegaan op het automatisch uitrollen. Hieronder laten wij zien hoe wij dit op beide manieren hebben gedaan.

1.  CI/CD-pipeline\
    Als je een CI/CD-pipeline gebruikt (automatisch):

    -   Hieronder zie je de stappen die we hebben gevolgd:

        - Op de [Knowledgebase](https://knowledgebase.hbo-ict-hva.nl/3_onderwijs/se/opdracht3/2_project/hboictcloud/#automatisch-uitrollen-naar-de-hbo-ictcloud) staat een gedetailleerd document dat uitlegt hoe het werkt. Volg dit document stap voor stap.

        - Je moet één variabele aanmaken met de naam: DEPLOY_HIC met de waarde "true" om het proces voor het uitrollen naar de HIC in te schakelen.

        ![HICVariable](./assets/Hboictcloudvariable.png)

        - Maak vijf variabelen aan met gegevens van de HBO ICT CLOUD. Door deze waarden toe te voegen, geef je toegang tot je deploy locatie (HBO ICT CLOUD).

        ![HICVariable](./assets/Variable.png)

        - Deployen naar de HBO-ICT.Cloud:
        - Nadat je alle gegevens hebt toegevoegd, moet je in het bestand .gitlab-ci.yml bovenaan de DEPLOY_HIC op true zetten.

        ![HICVariable](./assets/Gitlabfile.png)

        - Alles wat je dan op de Main zet, wordt vanaf dat punt automatisch uitgerold naar de cloud.

2.  Handmatige deployment (FTP)\
    Als je handmatig deployt:

    -   Frontend: Bouw de frontend (met npm run build) en upload de bestanden naar de cloud. Dat deden wij via het programma FileZilla.

        Eerst bouwde wij de game met de NPM run build en dat moetst dan met de API en de WEB.

        ![HICVariable](./assets/Buildstart.png)

        ![HICVariable](./assets/Builddone.png)

    -   Nadat de build klaar was hebben we FileZilla geopent en eerst conectie met de cloud gelegt. Dat moest met je SFTP host en daaronder je gebruikers naam met het wachtwoord

        ![HICVariable](./assets/FileZillaConnect.png)

    - Toen we er in kwamen zagen we 2 files app en wwwroot. in de app moet alles van de api en in wwwroot moest alles wat van de web kwam.

        ![HICVariable](./assets/FileZillaAPP.png)
        ![HICVariable](./assets/FileZillaWEB.png)

    -   Wij gebruiken dit project geen Database dus de connectie hoefte niet.
    -   Nadat alle files goed waren over gezet ging ik naar de HIC toe om te testen op de live of het werkte
        
        ![HICVariable](./assets/HboIctCloud.png)

    -   Als je deze link klikt kom je bij het project op de live server: [Live server](https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud)


## Beveiligingsmaatregelen

**Stap 8: Omschrijf welke maatregelen je implementeert**

Hoewel HTTPS standaard is geactiveerd op de HBO-ICT.Cloud, zijn aanvullende beveiligingen nodig voor de backend en database, zoals:

-   CORS: Beperk toegang tot de API vanuit specifieke domeinen om ongeautoriseerde toegang te voorkomen.

-   Rate limiting: Voeg beperkingen toe aan het aantal verzoeken per tijdseenheid om misbruik te voorkomen.

-   Environment variables: Gebruik een .env-bestand om gevoelige gegevens zoals databasewachtwoorden en API-sleutels te beheren.

## Database-inrichting

**Stap 9: Omschrijf welke gegevens je opslaat in de database en waarom, met aandacht voor "privacy by design":**

-   Data per tabel:

    -   Gegevens: Welke gegevens sla je op? Voeg een ERD toe.

    -   Waarom: Waarom heb je deze gegevens nodig?

-   Privacy by design:

    -   Minimaliseer opgeslagen data: sla alleen op wat nodig is voor de functionaliteit.

    -   Gebruik versleuteling (bijv. hashing voor wachtwoorden).

    -   Zorg dat gevoelige gegevens niet toegankelijk zijn zonder authenticatie.

## Implementatieplan

**Stap 10: Stel een implementatieplan op met duidelijke stappen**

1.  Backend configureren

2.  Frontend uploaden

3.  Database-inrichting

4.  Beveiliging implementeren

5.  Controle en afronding

Dit hoofdstuk richt zich op een efficiënte en veilige uitrol van de applicatie. Door de stappen systematisch te volgen, zorg je voor een goed functionerende infrastructuur. **Tip:** Raadpleeg de HBO-ICT Knowledgebase voor voorbeelden van configuratie en deployment-methoden.
