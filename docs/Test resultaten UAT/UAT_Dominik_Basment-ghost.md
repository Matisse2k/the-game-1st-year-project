# UAT Testresultaten: Basement Room & Ghost Character

## 1. Taakgegevens
- **Geteste taken:** Implementatie van de BasementRoom en GhostCharacter
- **Test uitgevoerd door:** Chiel Kramer
- **Datum test:** 25 maart 2025
- **1e Branch getest:** feature/basementRoom
- **2e Branch getest:** feature/GhostCharacter

## 2. Checklist en Resultaten

### 2.1 GhostCharacter Implementatie
| Taak | Status | Bewijsmateriaal |
|------|--------|-----------------|
| Implementeren van de GhostCharacter klasse | ✅ GESLAAGD | GhostCharacter.ts is volledig geïmplementeerd met alle benodigde functionaliteit |
| Toevoegen van Talk interactie met dialoogopties | ✅ GESLAAGD | talk() methode implementeert verschillende dialoogopties via TalkChoice objecten |
| Voorwaarde voor hulp bij speelgoed geven | ✅ GESLAAGD | PlayerSession.TeddyBearFound conditie controleert of speler teddy bear heeft |
| Ontgrendelen van trap na ontvangen teddy bear | ✅ GESLAAGD | PlayerSession.GhostQuestCompleted wordt ingesteld na ontvangst teddy bear |

### 2.2 BasementRoom Implementatie
| Taak | Status | Bewijsmateriaal |
|------|--------|-----------------|
| Implementeren van de BasementRoom klasse | ✅ GESLAAGD | BasementRoom.ts is volledig geïmplementeerd met alle benodigde functionaliteit |
| Toevoegen van beschrijving bij binnenkomst | ✅ GESLAAGD | examine() methode toont beschrijvende tekst met sfeervolle details |
| Toevoegen van verbindingen met Lobby | ✅ GESLAAGD | walk() methode en LobbyRoom in objects() implementeren connectie |
| Plaatsen van items in de kelder | ✅ GESLAAGD | KnifeItem en BookshelfItem zijn geïmplementeerd in de objects() methode |
| Verwerken van de geest als NPC | ✅ GESLAAGD | GhostCharacter wordt correct toegevoegd aan objects() |

## 3. Controle Acceptatiecriteria

### 3.1 GhostCharacter Acceptatiecriteria
| Acceptatiecriterium | Status | Bewijsmateriaal |
|---------------------|--------|-----------------|
| Praten met geest en dialoogopties krijgen | ✅ GESLAAGD | talk() methode retourneert TalkActionResult met verschillende gespreksopties |
| Hint over de puzzel van de Chef | ✅ GESLAAGD | Geïmplementeerd via choiceId 6 voor "Ask for help with chef's quest" optie |
| Accepteren van speelgoed en ontgrendelen trap | ✅ GESLAAGD | choiceId 5 controleert TeddyBearFound en zet GhostQuestCompleted op true |
| Bericht bij oplossen puzzel | ✅ GESLAAGD | Geest bedankt speler en geeft expliciet toestemming voor bovenetage |

### 3.2 BasementRoom Acceptatiecriteria
| Acceptatiecriterium | Status | Bewijsmateriaal |
|---------------------|--------|-----------------|
| Kelder alleen bereikbaar via lobby | ✅ GESLAAGD | Enige verbinding is met LobbyRoom in objects() |
| Beschrijving bij binnenkomst | ✅ GESLAAGD | examine() toont uitgebreide beschrijving van de kelder |
| Vinden en oppakken van items | ✅ GESLAAGD | Mes wordt conditoneel toegevoegd o.b.v. knifeGiven, BookshelfItem aanwezig |
| Geblokkeerde trap tot puzzel opgelost | ✅ GESLAAGD | Toegang tot volgende verdieping wordt vrijgegeven via GhostQuestCompleted |

## 4. Game Test
Tijdens het testen van de functionaliteit in het spel heb ik het volgende geobserveerd:

1. De BasementRoom wordt correct weergegeven met een passende beschrijving
2. De geest is zichtbaar en interactief in de kelder
3. Dialoogopties met de geest werken zoals verwacht
4. De dialoogopties veranderen op basis van de voortgang in het spel
5. Het mes verschijnt alleen als de specifieke voorwaarde wordt vervuld
6. De quest met de teddy bear werkt correct - na het geven krijg je toestemming voor de bovenverdieping
7. De hint over de chef's puzzel wordt correct getoond wanneer de relevante quest is gestart

## 5. Conclusie
Op basis van de uitgevoerde tests concludeer ik dat beide taken met succes zijn voltooid. Alle taken en acceptatiecriteria zijn volledig geïmplementeerd en functioneren zoals verwacht. De code is van goede kwaliteit, met duidelijke structuur en commentaar.

De interactie tussen de BasementRoom en de GhostCharacter is soepel geïmplementeerd, met conditionals die de spelvoortgang correct bijhouden. De puzzel met de teddy bear en de voorwaardelijke toegang tot de bovenverdieping werken zoals bedoeld.

**Eindoordeel:** GESLAAGD ✅

De taken kunnen worden afgesloten. De implementatie voldoet volledig aan de gestelde eisen en integreert goed met de rest van het spel.
