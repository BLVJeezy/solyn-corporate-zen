

## Probleem

De carousel in `MobileViewSection.tsx` bevat zowel mobiele als desktop afbeeldingen die om de beurt worden getoond, maar in de browser zijn alleen de desktop (laptop) screenshots zichtbaar. De mobiele mockups zijn waarschijnlijk niet zichtbaar omdat:

1. De desktop afbeeldingen zijn veel breder (tot 620px) en hoger dan de mobiele mockups
2. De mobiele afbeeldingen hebben een `scale-[1.08]` transform die ze vergroot maar ze blijven veel kleiner in hoogte dan de laptop screenshots
3. De items worden niet verticaal gecentreerd (geen `items-center` op de flex container), waardoor de kleinere mobiele mockups bovenaan plakken en mogelijk achter de desktop afbeeldingen verdwijnen

## Plan

### Wijzigingen in `src/components/MobileViewSection.tsx`:

1. **Voeg `items-center` toe aan de carousel flex container** zodat mobiele en desktop afbeeldingen verticaal gecentreerd worden
2. **Geef de mobiele items een vaste hoogte** die vergelijkbaar is met de desktop items, zodat ze duidelijk zichtbaar zijn naast elkaar
3. **Verwijder de `scale-[1.08]` transform** van mobiele items die de weergave kan verstoren, of pas de container aan zodat de schaling correct werkt
4. **Optioneel: pas de breedtes aan** zodat de verhouding tussen mobiel en desktop items beter is (mobiele items iets breder maken zodat ze niet verdwijnen)

### Technische details

De `inline-flex` container op regel 52 krijgt `items-center` toegevoegd. De mobiele item containers krijgen een betere hoogte-verhouding. De `scale` transform op de img wordt verwijderd of vervangen door een betere crop-methode met `object-cover` en een vaste hoogte.

