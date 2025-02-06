---
title: Gameplay
---
# Gameplay


## **1. Algemeen Overzicht**
"Shadows of the Forgotten Castle" is een **text-based adventure game** met elementen van **point-and-click gameplay**. Spelers moeten het mysterieuze kasteel verkennen, puzzels oplossen en de juiste keuzes maken om te ontsnappen. De game wordt ontwikkeld in de **LucaStars Game Engine™**, met aanpassingen om extra interacties en gameplay-mechanieken mogelijk te maken.

---

## **2. Gameplay Structuur**
### **2.1. Navigatie & Interactie**
De speler kan navigeren tussen **verschillende kamers** door middel van tekstcommando’s en keuzes. De standaardacties in de engine (**Examine** en **Talk**) worden uitgebreid met **nieuwe interacties**, zoals:
- **Pick up** – Speler kan objecten oprapen en in zijn inventaris plaatsen.
- **Use** – Speler kan objecten gebruiken op andere objecten, NPC’s of locaties.
- **Give** – Speler kan items aan NPC’s geven om progressie te maken.
- **Unlock** – Speler kan gesloten deuren openen met de juiste items.

> **Voorbeeld:**
> - **Speler**: *Use sleutel on deur*  
> - **Game**: *Je opent de deur naar de lobby.*  

### **2.2. Puzzelstructuur**
De game bevat verschillende **logische puzzels**, waarbij spelers objecten moeten combineren, NPC’s moeten helpen of informatie correct moeten interpreteren.  
- **Voorbeeldpuzzel**:  
  - De **chef** wil een **mes**.  
  - De **speler** vindt het mes in de **kelder**.  
  - Nadat het mes is overhandigd, krijgt de speler een **hint over speelgoed** (nodig om verder te komen).  

---

## **3. Nieuwe Game Mechanieken**
Naast de standaard LucaStars-functies wordt de game uitgebreid met:

### **3.1. Nieuwe Actie: Combine**
- De speler kan **items combineren** om nieuwe objecten te maken.
- **Gebruik**: Nodig voor het **easter egg einde**, waarbij drie mysterieuze items gecombineerd worden.  
- **Voorbeeld**:  
  - **Houten stok** + **Metalen haak** + **Lijmpotje** = **Geheim Item**  

### **3.2. Web Component: Dialogen & Hints**
- Een **custom Web Component** wordt ontwikkeld om **dialogen dynamisch** te tonen.
- Dit component kan:
  - Tekst en keuzes tonen (voor multiple-choice gesprekken met NPC’s).
  - Hints weergeven op basis van voortgang.
  - Eventueel een timer tonen voor beslissingen (voor spanning).  

### **3.3. Einde-Systeem**
De game bevat **meerdere eindes**:
- **Escape Ending**: Speler beantwoordt de guard correct en ontsnapt.
- **Voor altijd vast Ending**: Speler faalt bij de guard en blijft opgesloten.
- **Ghost Ending**: Speler blijft te lang op de zolder en verandert in een geest.

---

## **4. Web Component & API**
**Web Component Functionaliteit:**
- **Interactie** met NPC’s door **multiple-choice dialogen**.
- **Dynamische hints** op basis van de voortgang.
- **API Endpoint** waarmee het spel voortgang kan opslaan en ophalen.

**API Endpoint Voorbeeld:**
- **`/api/progress`** – Opslaan/ophale van game-progress.
- **`/api/hints`** – Ophalen van hints gebaseerd op de spelerstatus.

---

## **5. Samenvatting**
- **Hybride text-based & point-and-click mechanics**.
- **Uitbreiding van standaard acties** met *Pick up, Use, Give, Unlock, Combine*.
- **Puzzel-gebaseerde progressie** met hints van NPC’s.
- **Nieuwe actie: Combine**, nodig voor het easter egg einde.
- **Web Component voor dialogen & hints**.
- **Meerdere eindes**, afhankelijk van de keuzes van de speler.
