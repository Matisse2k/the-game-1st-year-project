# UAT Testresultaten: Map Webcomponent

## Taakgegevens
- **Geteste taak:** Implementatie van de kaart webcomponent met verdieping-specifieke weergave
- **Uitgevoerd door:** Dominik Krystul
- **Datum:** 25 maart 2025
- **Branch:** feature/plattegrond-webcomponent

## Checklist Definition of Done
| Criterium | Voldaan | Opmerking |
|-----------|---------|-----------|
| Alle acceptatiecriteria zijn afgevinkt | ⚠️ | Meeste acceptatiecriteria zijn voldaan, enkele aandachtspunten hieronder |
| Het werk is (technisch) gedocumenteerd | ✅ | Code is voorzien van commentaar en duidelijke functienamen |
| Het werk is geschreven in Standaardnederlands | ✅ | |
| Het werk staat in de GitLab repository | ✅ | |
| Het werk is gereviewd door een peer | ✅ | Via deze UAT |
| Het werk voldoet aan het Think-Make-Check (TMC) principe | ✅ | |
| De code is opgesteld volgens de HBO-ICT coding conventions | ✅ | |
| De code is handmatig functioneel getest op fouten | ✅ | |
| De code werkt zonder fouten bij normaal gebruik | ✅ | |
| Behoeftes van de gebruiker zijn terug te zien in de applicatie | ✅ | |
| Gebruikerservaring is aangepast en verbeterd | ❌ | Gebruikerstests zijn niet uitgevoerd volgens user story |
| Er is visuele feedback bij gebruikersacties | ✅ | De kaart wordt getoond/verborgen bij gebruikersacties |

## Controle Acceptatiecriteria
### Functionaliteit: Map Webcomponent

| Acceptatiecriterium | Voldaan | Opmerking |
|---------------------|---------|-----------|
| De kaart moet duidelijk leesbaar zijn met goed herkenbare locaties en ruimtes | ✅ | De kaartafbeeldingen zijn helder en goed te lezen |
| De huidige locatie van de speler moet duidelijk zichtbaar zijn op de kaart | ⚠️ | De spelerlocatie wordt niet expliciet getoond op de kaart |
| De kaart toont automatisch de plattegrond van de verdieping waar de speler zich bevindt | ✅ | Via de PlattegrondService wordt de juiste verdieping getoond |
| Bij het verplaatsen tussen verdiepingen wordt de kaart correct bijgewerkt | ✅ | Werkt via de `fetchPlaatje()` functionaliteit |
| Verschillende verdiepingen moeten visueel onderscheidend zijn | ✅ | De afbeeldingen voor boven- en benedenverdieping zijn duidelijk verschillend |
| De kaart moet eenvoudig te openen en te sluiten zijn via een intuïtieve knop/actie | ✅ | De X-knop om te sluiten is duidelijk zichtbaar |
| De kaart mag niet te veel schermruimte innemen of het spel belemmeren | ✅ | De kaart heeft een goede grootte met responsive design |
| De kaart verschijnt direct wanneer de speler deze oproept | ✅ | De kaart wordt onmiddellijk getoond |
| De kaart moet correct reageren op veranderingen in de spelwereld | ✅ | De kaart update correct tussen verdiepingen |
| De kaart mag geen bugs of glitches vertonen bij herhaald gebruik | ✅ | Geen bugs geconstateerd tijdens testen |

## Feedback en Bevindingen
### Positieve punten
- De kaartcomponent laadt snel en werkt responsief
- De visuele stijl past goed bij de rest van het spel
- De schakeling tussen boven- en benedenverdieping werkt correct
- De code is netjes gestructureerd en goed gedocumenteerd

### Verbeterpunten
1. **Gebruikerstests ontbreken:**
   - In de user story stond dat er gebruikerstests uitgevoerd zouden worden, maar deze zijn niet gedocumenteerd
   - Het is belangrijk om te valideren of eindgebruikers de kaart intuïtief kunnen gebruiken

2. **Ontbrekende functionaliteit:**
   - Er is geen legende of uitleg bij de kaart, wat volgens de acceptatiecriteria wel vereist was
   - De huidige locatie van de speler wordt niet duidelijk gemarkeerd op de kaart

3. **Naamgeving in code:**
   - De variabele `BovenOfBeneden` heeft een hoofdletter waar dit niet nodig is volgens conventies
   - De methode `renderBenenden` bevat een typefout (moet "renderBeneden" zijn)

4. **Implementatie volgens feedback:**
   - Volgens de user story zou feedback verzameld worden en geïmplementeerd, maar dit is niet terug te zien in de code of documentatie

## Conclusie
De Map Webcomponent is grotendeels succesvol geïmplementeerd. De component toont correct verschillende plattegronden afhankelijk van de verdieping waar de speler zich bevindt, en is visueel passend bij de rest van het spel.

Er zijn echter enkele belangrijke aspecten uit de user story en acceptatiecriteria die niet zijn geïmplementeerd, namelijk de gebruikerstests, het implementeren van verbeteringen op basis van feedback en een markering van de spelerlocatie.

**Aanbeveling:** De taak kan nog niet worden afgerond en moet eerst worden aangevuld met:
1. Het uitvoeren en documenteren van gebruikerstests
2. Het markeren van de spelerlocatie op de kaart
3. Het verwerken en implementeren van feedback uit de gebruikerstests

Wanneer deze aspecten zijn aangepakt, kan de component als volledig worden beschouwd en voldoen aan alle gestelde eisen.
