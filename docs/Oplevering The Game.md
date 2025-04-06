# Oplevering - The Game

> TODO Studenten: Vul de namen van teamleden in, vervang de URLs, vul de naam van de hoofdbranch in, hernoem elk hoofdstuk naar de naam van de betreffende student. Vul vervolgens de gevraagde informatie per student in. Controleer elkaar. Verwijder deze tekst.

**Teamleden**:
- Dominik Krystul
- Shivanio Cooman
- Samale Fahiyeh
- Matisse
- Naam 5

**URLs**:
- [Issue Board (Plan > Issue boards)](#)
- [Repository (Code > Repository)](#)
- [Contributor analytics (Analyze > Contributor Analytics)](#)

**Naam hoofdbranch**: Naam

## Dominik Krystul
### Commit geschiedenis
|Commit username|
|-|
|Dominik|
|Dominik Krystul|

|Naam branch|Aantal commits|
|-|-|
|Main|58|

Ik heb voornamelijk gewerkt in de volgende branches: `feature/Path_to_the_castle`, `feature/Basement` en `feature/inventory-webcomponent`. Deze branches waren specifiek bedoeld voor mijn bijdragen aan het project. 

- **`feature/Path_to_the_castle`**: In deze branch heb ik gewerkt aan de implementatie van de Path to the Castle-room, inclusief de bijbehorende interacties en puzzels.
- **`feature/Basement`**: Deze branch bevatte mijn werk aan de Basement-room, waar ik verantwoordelijk was voor de logica en de interacties binnen deze ruimte.
- **`feature/inventory-webcomponent`**: In deze branch heb ik een webcomponent ontwikkeld voor het inventory-systeem, inclusief de communicatie met de backend via een API.

De branches `feature/Path_to_the_castle` en `feature/Basement` zijn verwijderd nadat de features volledig waren afgerond en succesvol waren gemerged in de hoofdbranch. Tijdens de merge requests heb ik ervoor gekozen om de source branches te verwijderen, omdat het werk in deze branches volledig was afgerond en niet langer nodig was. 

Voor de commits hebben we gebruikgemaakt van de **commit squash**-functie tijdens het mergen. Dit zorgde ervoor dat de commitgeschiedenis overzichtelijk bleef en dat alle wijzigingen uit een branch werden samengevoegd tot één enkele commit in de hoofdbranch.

### Aan welke onderdelen heb je het meest aandeel gehad?
*Denk aan Game Objects, Web Components, Game Design Document, enzovoorts. Beschrijf per onderdeel kort (!) en hoogover wat je ongeveer hebt bijgedragen.*

|Naam|Beschrijving|
|-|-|
|**Game Design Document**|We hebben het Game Design Document gezamenlijk ingevuld. Alle onderdelen zijn samen besproken en daarna verwerkt in het document.|
|**IDD (Infrastructuur)**|Ik heb gewerkt aan stap 4 tot en met 6 van het Infrastructure design document.|
|**Webcomponent**|Ik heb het inventory-webcomponent ontwikkeld, inclusief de communicatie met de backend via een API.|
|**Rooms**|Ik heb de volgende rooms gemaakt: `Path to the Castle`, `Castle Door Entrance`, `Basement`, `Guard Quiz Room` en `Game Over Room`.|
|**Items**|Ik heb de volgende items gemaakt: `Lower Right Stone (Stone 1)`, `Upper Right Stone (Stone 2)`, `Lower Left Stone (Stone 3)`, `Upper Left Stone (Stone 4)`, `Key Item`, `Castle Entrance Door Item`, `Knife Item (geplaatst in de Basement Room)`, `Bookshelf Item (alleen examine-functionaliteit)`, `Couch Item`, `Cabinet Item` en `Table Item`.|
|**Characters**|Ik heb de `Ghost Character` en de `Guard Character` volledig gemaakt .|
|**User Acceptance Tests**|Ik heb 2 uitgebreide User Acceptance Tests opgesteld en uitgevoerd om te controleren of de game voldeed aan de gebruikersverwachtingen.|

### Relevante code, commits en andere deliverables
*Geef URLs op met een korte (!) beschrijving waarom dit relevant is. URLs mogen naar stukken code, commits en/of andere deliverables gaan.*

|URL|Beschrijving|
|-|-|
|[Code: Implementatie van Path to the Castle Room](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2024-2025/out-d-gd-se/blok-3/qaaquubaavii72/-/blob/main/src/api/src/game-implementation/rooms/PathToTheCastleRoom.ts)|Hier heb ik de Path to the Castle Room geïmplementeerd, inclusief interacties en puzzels.|
|[Documentatie van het inventory-webcomponent](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2024-2025/out-d-gd-se/daaceewiizuu56/-/blob/main/Interne-documentatie/Semester%202/softwareExpertReview.md?ref_type=heads)|In deze markdown staan stukjes code snippets van hoe de Inventory webcomponent in elkaar zit.|
|[Code: Toevoeging van Ghost Character en Guard Character](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2024-2025/out-d-gd-se/blok-3/qaaquubaavii72/-/tree/main/src/api/src/game-implementation/characters?ref_type=heads)|Hier kunt u de characters code inzien. Het bevat de implementatie van de Ghost Character en Guard Character, inclusief hun interacties.|
|[Code: Implementatie van Search Action](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2024-2025/out-d-gd-se/blok-3/qaaquubaavii72/-/blob/main/src/api/src/game-implementation/actions/SearchAction.ts?ref_type=heads)|Hier heb ik de Search Action toegevoegd, die gebruikt kan worden in meerdere rooms.|
|[Code: Basement Room met interacties](https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2024-2025/out-d-gd-se/blok-3/qaaquubaavii72/-/blob/main/src/api/src/game-implementation/rooms/BasementRoom.ts?ref_type=heads)|Hier kunt u de Basement Room code zien, inclusief de interacties met items zoals de Knife en Stones.|

### Checklist minimale eisen
*Vul onderstaande lijst **eerlijk** in.*

- [x] Minimaal 2 *Rooms* met ondersteuning voor minimaal *Actions*
- [x] Minimaal 2 *Items* met een interactie anders dan *Examine*
  - [x] Minimaal 1 *Item* **moet** ook buiten jouw eigen Rooms gebruikt worden
- [x] Minimaal 1 *Character* met een *Talk* interactie
  - [x] De interactie **moet** uit met meerdere keuzes bestaan
  - [x] Minimaal 1 keuze **moet** leiden tot een nieuwe set keuzes
- [x] Minimaal 1 nieuwe *Action* die **niet** standaard in de game engine zit en ook buiten jouw *Rooms* gebruikt **kan** worden.
- [x] Alle Rooms, Items en Characters moeten nuttig bijdragen aan het spel en verbonden zijn met elkaar middels een puzzelelement.
- [x] Minimaal 1 Web Component ter ondersteuning van het spel
  - [x] Waarbij ook gecommuniceerd wordt met een eigen API Endpoint in de backend applicatie.

### Reflectie
Ik ben tevreden over mijn bijdrage aan het project en mijn commitgeschiedenis. Ik heb consistent gewerkt aan mijn taken en ervoor gezorgd dat mijn werk goed geïntegreerd werd in het project. Door gebruik te maken van de **commit squash**-functie tijdens het mergen, bleef de commitgeschiedenis overzichtelijk en professioneel.

Wat betreft de minimale eisen ben ik blij dat ik alle vereisten heb gehaald. Ik heb meerdere rooms, items, characters en acties toegevoegd die nuttig bijdragen aan het spel. Daarnaast heb ik een webcomponent ontwikkeld dat communiceert met de backend, wat een waardevolle toevoeging was aan de gebruikerservaring.

Wat beter kon:
- **Documentatie**: Ik had meer tijd kunnen besteden aan het documenteren van mijn werk, zodat het voor anderen (en mezelf) makkelijker zou zijn om mijn code te begrijpen en aan te passen.
- **Feedback vragen**: Ik had vaker feedback kunnen vragen tijdens het ontwikkelproces om mijn werk nog verder te verbeteren.

Over het algemeen kijk ik met trots terug op mijn bijdrage aan dit project. Ik heb veel geleerd over samenwerking en het ontwikkelen van webcomponents met de daarbij behorende back end communicatie. Deze ervaring neem ik mee naar toekomstige projecten, waar ik mijn vaardigheden verder wil verbeteren en mijn werkproces nog efficiënter wil maken.


## shivanio cooman cooman
### Commit geschiedenis
|Commit username|
|-|
|shivanio cooman |
|shivanio coomanb cooman |
|Naam 3|

|Naam branch|Aantal commits|
|-|-|
|main| 5
|Feature/achievementComponent| 39
|Feature/guest-room-attic| 29

**Ik heb elke dag gecomited maar  bij merge request is het gesquashed**

### Aan welke onderdelen heb je het meest aandeel gehad?
*Denk aan Game Objects, Web Components, Game Design Document, enzovoorts. Beschrijf per onderdeel kort (!) en hoogover wat je ongeveer hebt bijgedragen.*

|Naam|Beschrijving|
|-|-|
|Servveerplaat item| item in de attic guest room|
|AtticAccessItem|Item in de attic guest room om naar de attic te gaan|
|MysteriousStickItem |item in de attic guest room|

### Relevante code, commits en andere deliverables
*Geef URLs op met een korte (!) beschrijving waarom dit relevant is. URLs mogen naar stukken code, commits en/of andere deliverables gaan.*

|URL|Beschrijving|
|-|-|
|https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2024-2025/out-d-gd-se/blok-3/qaaquubaavii72/-/commit/132f451ccf027d4033d1fe12a5a0505a92d07595 | webcomponent implementeren in de rooms|
|https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2024-2025/out-d-gd-se/blok-3/qaaquubaavii72/-/commit/e8f195b233b1fad39b5380989515ca5fc414a1b8|aanmaken webcomponent|
|URL 3|Beschrijving URL 3|

### Checklist minimale eisen
*Vul onderstaande lijst **eerlijk** in.*

- [X] Minimaal 2 *Rooms* met ondersteuning voor minimaal *Actions*
- [X] Minimaal 2 *Items* met een interactie anders dan *Examine*
  - [X] Minimaal 1 *Item* **moet** ook buiten jouw eigen Rooms gebruikt worden
- [X] Minimaal 1 *Character* met een *Talk* interactie
  - [X] De interactie **moet** uit met meerdere keuzes bestaan
  - [X] Minimaal 1 keuze **moet** leiden tot een nieuwe set keuzes
- [X] Minimaal 1 nieuwe *Action* die **niet** standaard in de game engine zit en ook buiten jouw *Rooms* gebruikt **kan** worden.
- [X] Alle Rooms, Items en Characters moeten nuttig bijdragen aan het spel en verbonden zijn met elkaar middels een puzzelelement.
- [X] Minimaal 1 Web Component ter ondersteuning van het spel
  - [X] Waarbij ook gecommuniceerd wordt met een eigen API Endpoint in de backend applicatie.

### Reflectie
*Ik ben tevreden met mijn werk en commits, miscchien wel wat kleinere commits, en mijn toeving tot het team vond ik ook prima*

## Naam 3
### Commit geschiedenis
|Commit username|
|-|
|Naam 1|
|Naam 2|
|Naam 3|

|Naam branch|Aantal commits|
|-|-|
|Hoofdbranch|0|
|Branch 1|0|
|Branch 2|0|

### Aan welke onderdelen heb je het meest aandeel gehad?
*Denk aan Game Objects, Web Components, Game Design Document, enzovoorts. Beschrijf per onderdeel kort (!) en hoogover wat je ongeveer hebt bijgedragen.*

|Naam|Beschrijving|
|-|-|
|Onderdeel 1|Beschrijving onderdeel 1|
|Onderdeel 2|Beschrijving onderdeel 2|
|Onderdeel 3|Beschrijving onderdeel 3|

### Relevante code, commits en andere deliverables
*Geef URLs op met een korte (!) beschrijving waarom dit relevant is. URLs mogen naar stukken code, commits en/of andere deliverables gaan.*

|URL|Beschrijving|
|-|-|
|URL 1|Beschrijving URL 1|
|URL 2|Beschrijving URL 2|
|URL 3|Beschrijving URL 3|

### Checklist minimale eisen
*Vul onderstaande lijst **eerlijk** in.*

- [ ] Minimaal 2 *Rooms* met ondersteuning voor minimaal *Actions*
- [ ] Minimaal 2 *Items* met een interactie anders dan *Examine*
  - [ ] Minimaal 1 *Item* **moet** ook buiten jouw eigen Rooms gebruikt worden
- [ ] Minimaal 1 *Character* met een *Talk* interactie
  - [ ] De interactie **moet** uit met meerdere keuzes bestaan
  - [ ] Minimaal 1 keuze **moet** leiden tot een nieuwe set keuzes
- [ ] Minimaal 1 nieuwe *Action* die **niet** standaard in de game engine zit en ook buiten jouw *Rooms* gebruikt **kan** worden.
- [ ] Alle Rooms, Items en Characters moeten nuttig bijdragen aan het spel en verbonden zijn met elkaar middels een puzzelelement.
- [ ] Minimaal 1 Web Component ter ondersteuning van het spel
  - [ ] Waarbij ook gecommuniceerd wordt met een eigen API Endpoint in de backend applicatie.

### Reflectie
*Ben je tevreden over je commit geschiedenis en je aandeel in het project? Wat is wel gelukt van de minimale eisen, wat niet? Waarom niet? Enzovoorts.*
 
## Matisse
### Commit geschiedenis
|Matisse Ben Addi|
|-|
|Naam 1|
|Naam 2|
|Naam 3|

|Naam branch|Aantal commits|
|-|-|
|Hoofdbranch|6|
|Branch Wakker-worden-scene|12|
|Branch Kitchen-Room | 8 |

### Aan welke onderdelen heb je het meest aandeel gehad?
*Denk aan Game Objects, Web Components, Game Design Document, enzovoorts. Beschrijf per onderdeel kort (!) en hoogover wat je ongeveer hebt bijgedragen.*

|Naam|Beschrijving|
|-|-|
|Onderdeel 1 Game Objects | Ik heb de HookItem (deze kan buiten mijn kamer gebruikt worden voor het easteregg item), het Mes, de chef, de raven in de forrestroom. ik heb de forrest room, wakeuproom, kitchenroom gemaakt. je kan met de chef en de raven praten.   |
|Onderdeel 2 Game Design Document| Ik heb qua GDD de characters gedesigned |
|Onderdeel 3 WebComponent| ik heb als web component de volume bediening gemaakt, ik heb onderzoek gedaan en tutorials gekeken en op basis hier van de geluidscomponent gemaakt |

### Relevante code, commits en andere deliverables
*Geef URLs op met een korte (!) beschrijving waarom dit relevant is. URLs mogen naar stukken code, commits en/of andere deliverables gaan.*

|URL|Beschrijving|
|-|-|
|URL 1|Beschrijving URL 1|
|URL 2|Beschrijving URL 2|
|URL 3|Beschrijving URL 3|

### Checklist minimale eisen
*Vul onderstaande lijst **eerlijk** in.*

- [ ] Minimaal 2 *Rooms* met ondersteuning voor minimaal *Actions*
- [ ] Minimaal 2 *Items* met een interactie anders dan *Examine*
  - [ ] Minimaal 1 *Item* **moet** ook buiten jouw eigen Rooms gebruikt worden
- [ ] Minimaal 1 *Character* met een *Talk* interactie
  - [ ] De interactie **moet** uit met meerdere keuzes bestaan
  - [ ] Minimaal 1 keuze **moet** leiden tot een nieuwe set keuzes
- [ ] Minimaal 1 nieuwe *Action* die **niet** standaard in de game engine zit en ook buiten jouw *Rooms* gebruikt **kan** worden.
- [ ] Alle Rooms, Items en Characters moeten nuttig bijdragen aan het spel en verbonden zijn met elkaar middels een puzzelelement.
- [ ] Minimaal 1 Web Component ter ondersteuning van het spel
  - [ ] Waarbij ook gecommuniceerd wordt met een eigen API Endpoint in de backend applicatie.

### Reflectie
ja ik ben tevreden want ik heb alle minimale eisen gehaald, ik had wel nogsteeds graag eerder willen beginnen zodat ik mijn code nog meer kon verbeteren aan het einde!

## Naam 5
### Commit geschiedenis
|Commit username|
|-|
|Naam 1|
|Naam 2|
|Naam 3|

|Naam branch|Aantal commits|
|-|-|
|Hoofdbranch|0|
|Branch 1|0|
|Branch 2|0|

### Aan welke onderdelen heb je het meest aandeel gehad?
*Denk aan Game Objects, Web Components, Game Design Document, enzovoorts. Beschrijf per onderdeel kort (!) en hoogover wat je ongeveer hebt bijgedragen.*

|Naam|Beschrijving|
|-|-|
|Onderdeel 1|Beschrijving onderdeel 1|
|Onderdeel 2|Beschrijving onderdeel 2|
|Onderdeel 3|Beschrijving onderdeel 3|

### Relevante code, commits en andere deliverables
*Geef URLs op met een korte (!) beschrijving waarom dit relevant is. URLs mogen naar stukken code, commits en/of andere deliverables gaan.*

|URL|Beschrijving|
|-|-|
|URL 1|Beschrijving URL 1|
|URL 2|Beschrijving URL 2|
|URL 3|Beschrijving URL 3|

### Checklist minimale eisen
*Vul onderstaande lijst **eerlijk** in.*

- [ ] Minimaal 2 *Rooms* met ondersteuning voor minimaal *Actions*
- [ ] Minimaal 2 *Items* met een interactie anders dan *Examine*
  - [ ] Minimaal 1 *Item* **moet** ook buiten jouw eigen Rooms gebruikt worden
- [ ] Minimaal 1 *Character* met een *Talk* interactie
  - [ ] De interactie **moet** uit met meerdere keuzes bestaan
  - [ ] Minimaal 1 keuze **moet** leiden tot een nieuwe set keuzes
- [ ] Minimaal 1 nieuwe *Action* die **niet** standaard in de game engine zit en ook buiten jouw *Rooms* gebruikt **kan** worden.
- [ ] Alle Rooms, Items en Characters moeten nuttig bijdragen aan het spel en verbonden zijn met elkaar middels een puzzelelement.
- [ ] Minimaal 1 Web Component ter ondersteuning van het spel
  - [ ] Waarbij ook gecommuniceerd wordt met een eigen API Endpoint in de backend applicatie.

### Reflectie
*Ben je tevreden over je commit geschiedenis en je aandeel in het project? Wat is wel gelukt van de minimale eisen, wat niet? Waarom niet? Enzovoorts.*
