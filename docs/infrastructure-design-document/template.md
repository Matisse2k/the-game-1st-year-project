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

De infrastructuur voor dit project wordt volledig gehost op de HBO-ICT.Cloud, bestaande uit meerdere componenten die naadloos samenwerken om een complete game-ervaring te leveren.

### Infrastructuur componenten

#### 1. Frontend
- **Technologie**: Een statisch gehoste webapplicatie gebouwd met HTML, CSS en TypeScript.
- **Implementatie**: Maakt gebruik van Web Components voor een onderhoudbare codebase.
- **Gebruikersinteractie**: Biedt een intuïtieve spelinterface die spelers in staat stelt om met de gamewereld te interageren.
- **Rendering**: Verwerkt visuele elementen en animaties voor een meeslepende spelervaring.
- **State Management**: Houdt de huidige spelstatus bij en synchroniseert deze met de backend.

#### 2. Backend
- **Framework**: Een API-server gebouwd met Express.js, draaiend in een Node.js omgeving.
- **Architectuur**: RESTful API met duidelijk gedefinieerde endpoints voor verschillende spelacties.
- **Verantwoordelijkheden**:
  - Verwerken van spelacties
  - Bijhouden van spelerssessies en -voortgang
  - Uitvoeren van game-logica en regels
  - Beheren van de inventaris van de speler

#### 3. CI/CD-pipeline
- **Automatisering**: Geautomatiseerde processen voor het bouwen, testen en deployen van de applicatie.
- **Tooling**: Maakt gebruik van GitLab CI/CD voor continue integratie en implementatie.
- **Workflow**:
  - Code wordt gecommit naar de repository
  - Automatische tests worden uitgevoerd
  - Bij succesvolle tests wordt de applicatie automatisch gedeployed naar de HBO-ICT.Cloud

### Netwerkarchitectuur

De communicatie tussen de componenten verloopt via een gestandaardiseerd protocol:

- **Client-server communicatie**: HTTP/HTTPS requests tussen frontend en backend
- **API Gateway**: Centraal punt voor alle API-requests, zorgt voor routing naar de juiste endpoints
- **Sessiemanagement**: Implementeert sessie-tracking voor gebruikersauthenticatie en spelvoortgang

### Toegangspunten

Onze game is toegankelijk via de volgende URLs:

- **Frontend URL**: [https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud](https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud)
- **Backend URL**: [https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud/api/](https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud/api/)

### Netwerkconfiguratie

- **Poorten**: De frontend draait lokaal op poort 3000 tijdens ontwikkeling, terwijl de backend API gebruikmaakt van poort 3001 voor communicatie. In de productieomgeving worden standaard HTTP/HTTPS poorten gebruikt.
- **Protocollen**: Alle communicatie verloopt via beveiligde HTTPS-verbindingen in de productieomgeving.

### Responsiveness

De infrastructuur is ontworpen met responsiveness in gedachten:

- **Adaptieve interface**: De frontend past zich aan verschillende schermgroottes en apparaten aan
- **Efficiënte verwerking**: Asynchrone communicatie zorgt voor een soepele gebruikerservaring
- **Caching-strategieën**: Geïmplementeerd voor veelgebruikte resources om de reactietijd te verbeteren

Deze focus op responsiveness zorgt voor een vloeiende en interactieve spelervaring, ongeacht het apparaat of de netwerksnelheid van de gebruiker.

## Communicatie en sequence diagram

**Stap 5: Beschrijf de communicatie tussen de systemen**

Hieronder staat ons sequence diagram. Dit diagram illustreert een fetch-verzoek van de frontend naar de backend en terug.


```mermaid
sequenceDiagram
    participant Gebruiker
    participant Frontend
    participant Backend
    participant GameController
    participant GameService

    Gebruiker->>Frontend: Voer "Pick Up" actie uit
    Frontend->>Backend: HTTP POST /game/action
    Backend->>GameController: handleActionRequest(req, res)
    GameController->>GameController: executeAction(actionAlias, gameObjectAliases)
    GameController->>GameService: executeAction(actionAlias, gameObjects)
    GameService-->>GameController: ActionResult
    GameController->>GameController: convertActionResultToGameState(actionResult)
    GameController-->>Backend: GameState
    Backend-->>Frontend: HTTP Response 200 OK
    Frontend->>Backend: HTTP GET /game/inventory
    Backend->>GameController: handleInventoryRequest(req, res)
    GameController->>GameService: getPlayerSession()
    GameService-->>GameController: PlayerSession
    GameController-->>Backend: Inventory
    Backend-->>Frontend: HTTP Response 200 OK
    Frontend-->>Gebruiker: Toon inventaris [{item1}, {item2}, ...]

    Gebruiker->>Frontend: Klik op een item
    Frontend->>Backend: HTTP GET /game/item/{alias}/description
    Backend->>GameController: handleItemDescriptionRequest(req, res)
    GameController-->>Backend: Item Description
    Backend-->>Frontend: HTTP Response 200 OK
    Frontend-->>Gebruiker: Toon item beschrijving {description}
```
### Uitleg van de communicatiestromen

Het bovenstaande sequence diagram toont drie belangrijke communicatiestromen in onze game-applicatie:

#### 1. "Pick Up" actie uitvoeren
Wanneer de gebruiker een item wil oppakken, wordt de volgende communicatiestroom geïnitieerd:

- **Frontend naar Backend**: De frontend verstuurt een HTTP POST request naar het `/game/action` endpoint, met daarin de actie "pick up" en de alias van het op te pakken object.
- **Backend verwerking**: De `GameController` verwerkt dit request via de `handleActionRequest` methode en voert de actie uit met behulp van de `GameService`.
- **Response**: Het resultaat wordt omgezet naar een `GameState` en teruggestuurd naar de frontend, waardoor de spelstatus wordt bijgewerkt.

#### 2. Inventaris ophalen
Na het oppakken van een item wordt de inventaris automatisch bijgewerkt:

- **Frontend naar Backend**: De frontend stuurt een HTTP GET request naar het `/game/inventory` endpoint om de bijgewerkte inventaris op te halen.
- **Backend verwerking**: De `GameController` haalt via de `handleInventoryRequest` methode de speler-sessie op en extraheert de inventarisgegevens.
- **Response**: De backend stuurt een lijst van items terug naar de frontend, die deze vervolgens weergeeft aan de gebruiker.

#### 3. Item beschrijving bekijken
Wanneer de gebruiker op een item in de inventaris klikt:

- **Frontend naar Backend**: De frontend stuurt een HTTP GET request naar het `/game/item/{alias}/description` endpoint met de alias van het geselecteerde item.
- **Backend verwerking**: De `GameController` verwerkt dit via de `handleItemDescriptionRequest` methode.
- **Response**: De beschrijving van het item wordt teruggestuurd en aan de gebruiker getoond.

### Technische implementatie

De communicatie tussen de frontend en backend maakt gebruik van de volgende componenten:

1. **Frontend services**:
   - `InventoryService` voor het ophalen van de inventaris en itembeschrijvingen
   - `GameRouteService` voor het uitvoeren van game-acties zoals "pick up"

2. **Backend controllers en routes**:
   - Route `/game/action` voor het uitvoeren van spelacties
   - Route `/game/inventory` voor het ophalen van de inventaris
   - Route `/game/item/{alias}/description` voor het ophalen van itembeschrijvingen

3. **Communicatieprotocol**:
   - Alle communicatie verloopt via HTTP GET en POST requests
   - Data wordt uitgewisseld in JSON-formaat
   - Elke request bevat een header met de speler-sessie ID voor authenticatie

Deze architectuur zorgt voor een duidelijke scheiding van verantwoordelijkheden en maakt een efficiënte communicatie tussen frontend en backend mogelijk, wat essentieel is voor een responsieve en interactieve spelervaring.

## Beveiliging van de infrastructuur

**Stap 6: Omschrijf hoe de systemen veilig ingericht kunnen worden**

### Waarom beveiliging essentieel is
Online applicaties, maar zelfs echte apps, zijn voortdurend blootgesteld aan verschillende soorten bedreigingen. Zonder adequate beveiliging kunnen kwaadwillende personen toegang krijgen tot gegevens en uiteindelijk de functionaliteit van de applicatie manipuleren, of zelfs de hele infrastructuur verstoren. Dit kan leiden tot een slechte gebruikerservaring en in ernstige gevallen zelfs juridische gevolgen.

### Beveiligingsmaatregelen
De Express.js-server biedt verschillende mogelijkheden om de infrastructuur veiliger te maken. Sommige maatregelen beperken misbruik, terwijl andere bepaalde aanvallen volledig kunnen voorkomen:

- **HTTPS**: Je hoeft HTTPS niet zelf te configureren, omdat dit al standaard is geregeld binnen de HBO-ICT.Cloud. Alle communicatie via de cloudomgeving verloopt automatisch versleuteld. HTTPS voorkomt het onderscheppen van gegevens tussen client en server (man-in-the-middle aanvallen).


- **Rate limiting**: Beperkt het aantal requests per gebruiker om misbruik te voorkomen. Dit kan worden geïmplementeerd met middleware zoals `express-rate-limit`. Rate limiting beperkt brute force aanvallen en DoS-pogingen, maar voorkomt ze niet volledig als aanvallers over meerdere IP-adressen beschikken.

``` TS
const rateLimit = require('express-rate-limit');

// Create a rate limiter to limit requests to a specific route
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window: 15 minutes
  max: 100, // Maximum 100 requests per window per IP
  standardHeaders: true, // Include rate limit info in response headers
  message: 'Too many requests, please try again later' // Message sent when limit is exceeded
});

app.use('/game/action', limiter); // Apply on specific routes
```

- **CORS**: Stel specifieke regels in voor welke domeinen toegang hebben tot de API. Dit kan worden ingesteld met de `cors` middleware in Express.js. Correcte CORS-configuratie voorkomt ongeautoriseerde cross-domain requests.
``` TS
const cors = require('cors'); // Import the CORS middleware

// Configure CORS to allow requests only from our specific frontend
const corsOptions = {
  origin: 'https://qaaquubaavii72-pb3sed2425.hbo-ict.cloud', // Allow requests only from this domain
  optionsSuccessStatus: 200 // Ensure successful responses for legacy browsers
};

// Apply the CORS middleware with the defined options
app.use(cors(corsOptions));
```
- **Content Security Policy (CSP):** Deze header voorkomt XSS-aanvallen door te specificeren welke bronnen van content mogen worden uitgevoerd in de browser. Met de juiste configuratie kunnen kwaadaardige scripts worden geblokkeerd voordat ze worden uitgevoerd.
  

- **Environment variables**: Het gebruik van `.env`-bestanden voor gevoelige gegevens voorkomt het lekken van wachtwoorden en API-keys via versiebeheersystemen. Dit is cruciaal voor de bescherming van toegangsgegevens.


- **Security Headers**: Voeg beveiligingsheaders toe aan HTTP-responses om aanvallen zoals XSS en clickjacking te voorkomen. Dit kan worden gedaan met de `helmet` middleware. Deze Express middleware voorkomt verschillende soorten aanvallen door beveiligingsheaders in te stellen:
``` TS
const helmet = require('helmet'); // Import the Helmet middleware

// Use Helmet to enhance security by setting various HTTP headers
app.use(helmet());
```

- **Database Security**: Zorg ervoor dat de database alleen toegankelijk is voor geautoriseerde applicaties en gebruikers. Gebruik sterke wachtwoorden en versleuteling voor gevoelige gegevens.

### Balans tussen beveiliging en gebruiksvriendelijkheid
Het is belangrijk om te beseffen dat sommige beveiligingsmaatregelen de gebruikservaring kunnen beïnvloeden. Te strikte rate limiting kan legitieme gebruikers blokkeren, en te strikte CSP-regels kunnen functionaliteiten van de website beperken. Daarom moet je een balans vinden die de gebruiksvriendelijkheid niet in gevaar brengt.

### Gelaagde beveiliging
Geen enkele beveiligingsmaatregel is perfect, daarom implementeren we een gelaagde benadering. Als één beveileing methode faalt, kunnen andere lagen nog steeds bescherming bieden. Deze "defense in depth"-strategie is de meest effectieve aanpak voor het beveiligen van complexe systemen.

## Realiseren

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

1. **Backend configureren**
    - Zorg ervoor dat alle benodigde dependencies zijn geïnstalleerd.
    - Configureer de .env-bestanden met de juiste environment variables.
    - Test de backend lokaal om te controleren of alles correct werkt.

2. **Frontend uploaden**
    - Bouw de frontend met `npm run build`.
    - Upload de gebuildde bestanden naar de cloud via FileZilla of gitlab configuratie.
    - Controleer of de frontend correct communiceert met de backend.

3. **Beveiliging implementeren**
    - Zorg ervoor dat alle gevoelige gegevens worden beheerd met environment variables binnen in de gitlab.

4. **Controle en afronding**
    - Voer een volledige end-to-end test uit om te controleren of alle onderdelen correct samenwerken.
    - Controleer de beveiligingsmaatregelen om ervoor te zorgen dat de applicatie veilig is.
    - Zet de applicatie live en monitor de prestaties en beveiliging.
