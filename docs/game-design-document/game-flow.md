---
title: Game flow
---
# Game flow
  

## **Legenda**

🔹 = Actie van de speler

🔸 = Beslissing / Keuze

🟢 = Voortgang

🔴 = Einde

```mermaid

graph TD

A1(🔹 Start in het Bos) -->|Vogel geeft hint| A2[🔹 Zoek de sleutel]

A2 -->|Sleutel gevonden| A3[🔹 Ga naar het kasteel]

A3 -->|Betreed het kasteel| B1[🔹 Ontmoet de butler]

B1 -->|Krijgt eerste plattegrond| B2[🔹 Ga naar de keuken]

B2 -->|Praat met chef| B3{🔸 Heb je het mes?}

B3 -->|Nee| C1[🔹 Ga naar de kelder]

B3 -->|Ja| B4[🔹 Geef mes aan chef]

B4 -->|ontvangt briefje| B5[🔹 Staat info op over EasterEgg einde]

C1 -->|Praat met de geest| C2{🔸 Heb je speelgoed?}

C2 -->|Nee| C3[🔹 Zoek het speelgoed]

C2 -->|Ja| C4[🔹 Geef speelgoed aan geest]

C4 -->|Toegang tot trap| D1[🔹 Ga naar eerste verdieping]

D1 -->|Krijgt nieuwe plattegrond| D2[🔹 Ga naar werkkamer]

D2 -->|Zoek de deurklink| D3{🔸 Welke kamer open je?}

D3 -->|Gastenkamer zonder zolder| E1[🔹 Vogel geeft hints over de guard]

D3 -->|Gastenkamer met zolder| E2[🔹 Vogel geeft hints over de guard en verteld dat er gekke geluiden zijn te horen.]


E2 -->|Kijk naar het luik| F1{🔸 Heb je de 3 mysterie-items verzamelt?}

F1 -->|Ja| F2(🔹 Betreed de zolder)

F1 -->|Nee| F3{🔸 Zoek mysterie-items}

F2 -->|Praat met de geest| F4[🔴 Activeerd geest einde]

E1 -->|Bereid je voor op ondervraging| G1[🔹 Ga naar de guard]

F3 -->|Negeer het luik | G1

F3 -->|Maak mysterie-item| F1

G1 -->|Guard stelt vragen| G2{🔸 Correct antwoord?}

G2 -->|Ja| G3(🟢 Escape Ending)

G2 -->|Nee| G4(🔴 Voor altijd vast in het kasteel)
