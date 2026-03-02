

## Situatie

De code bevat al alle "Manager Upgrade" wijzigingen:
- **MobileLeadCard** component (card stack layout)
- **MobileLeadDrawer** component (bottom drawer met quick actions)
- **Sticky search & filter bar**
- **Conditionele rendering**: mobiel → cards, desktop → tabel

Het probleem is dat de `leads`-tabel momenteel **leeg** is (API retourneert `[]`), waardoor je alleen "Geen leads gevonden" ziet — ongeacht mobiel of desktop.

## Oplossingen

1. **Test met data**: Voeg een lead toe via de "Lead toevoegen" knop in het admin dashboard. Dan worden de mobiele cards en drawer zichtbaar.

2. **Optioneel**: Ik kan een lege-staat verbeteren met een duidelijkere call-to-action i.p.v. alleen "Geen leads gevonden".

Er zijn geen code-wijzigingen nodig — de functionaliteit is al gebouwd en werkt zodra er leads in de database staan.

