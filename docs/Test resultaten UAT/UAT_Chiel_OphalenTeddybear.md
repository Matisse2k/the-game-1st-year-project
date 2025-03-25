# UAT Testresultaten: Ophalen Teddybear

## Taakgegevens
- **Geteste taak:** Als speler wil ik een teddy bear (item) in de lobby kunnen vinden en oppakken.
- **Uitgevoerd door:** Dominik Krystul
- **Datum:** 11 maart 2025
- **Branch:** feature/teddybear-item

## Checklist Definition of Done
| Criterium | Voldaan | Opmerking |
|-----------|---------|-----------|
| Alle acceptatiecriteria zijn afgevinkt | ⚠️ | Zie opmerkingen bij acceptatiecriteria |
| Het werk is (technisch) gedocumenteerd | ✅ | |
| Het werk is geschreven in Standaardnederlands | ✅ | |
| Het werk staat in de GitLab repository | ✅ | |
| Het werk is gereviewd door een peer | ✅ | Via deze UAT |
| Het werk voldoet aan het Think-Make-Check (TMC) principe | ✅ | |
| De code is opgesteld volgens de HBO-ICT coding conventions | ✅ | |
| De code is handmatig functioneel getest op fouten | ✅ | |
| De code werkt zonder fouten bij normaal gebruik | ✅ | |
| Behoeftes van de gebruiker zijn terug te zien in de applicatie | ✅ | |
| Gebruikerservaring is aangepast en verbeterd | ⚠️ | Kan duidelijker zijn welk object doorzocht moet worden |
| Er is visuele feedback bij gebruikersacties | ✅ | Search en Pick Up acties geven duidelijke feedback |

## Controle Acceptatiecriteria
### Functionaliteit: Teddybear vinden en oppakken in de lobby

| Acceptatiecriterium | Voldaan | Opmerking |
|---------------------|---------|-----------|
| De teddybear moet vindbaar zijn in de lobby | ✅ | De teddybear is vindbaar door de Search-actie te gebruiken op het juiste game-object |
| De speler kan de teddybear oppakken | ✅ | Na het vinden kan de speler de Pick Up-actie gebruiken |
| De teddybear wordt toegevoegd aan de inventaris van de speler | ✅ | Na oppakken verschijnt het item correct in de inventory |
| Het moet duidelijk zijn waar de speler moet zoeken | ⚠️ | Het is niet volledig duidelijk op welke van de drie objecten gezocht moet worden |

## Feedback en Bevindingen
### Positieve punten
- Het mechanisme van zoeken en oppakken werkt goed
- De teddybear wordt correct in de inventory geplaatst
- Het zoeken en oppakken van items verloopt intuïtief

### Verbeterpunten
1. **User story formulering**:
   - De titel van de user story is niet volledig: "Als speler wil ik een teddy bear (item) in de lobby." Het ontbreekt aan een werkwoord—moet de speler de teddy vinden, oppakken of iets anders?
   - Het vermengen van sprint 1 en 2 in de user story is verwarrend. Een user story zou moeten worden bijgewerkt wanneer nieuwe informatie beschikbaar komt.

2. **Acceptatiecriteria**:
   - De acceptatiecriteria bevatten vage termen zoals "makkelijk" en "duidelijk". 
   - Betere formuleringen zouden zijn:
     * "De speler kan de teddybeer vinden binnen 30 seconden zoeken"
     * "De objecten waar gezocht kan worden zijn visueel onderscheidend"

3. **Gebruikerservaring**:
   - Het is niet meteen duidelijk op welk van de drie objecten de speler moet zoeken om de teddybeer te vinden
   - Een kleine visuele hint of subtiele aanwijzing zou de gebruikerservaring kunnen verbeteren

## Conclusie
De implementatie van de teddybear functionaliteit is grotendeels succesvol. De basisfunctionaliteit werkt zoals bedoeld: de speler kan zoeken, de teddybear vinden, oppakken en aan de inventory toevoegen. Er zijn echter wel enkele verbeterpunten in de user story beschrijving en acceptatiecriteria.

**Aanbeveling:** De taak kan worden afgerond worden, maar ik adviseer om:
1. De user story duidelijker te formuleren
2. De acceptatiecriteria specifieker te maken
3. Te overwegen een duidelijke visuele hint toe te voegen om te verduidelijken waar de speler moet zoeken

Ondanks deze verbeterpunten functioneert de feature naar behoren en kan deze worden opgenomen in de game.
