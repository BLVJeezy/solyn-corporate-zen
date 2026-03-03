

## Probleem

De kaarten zijn `sticky` met een oplopende `top` waarde, maar ze hebben geen oplopende `z-index`. Hierdoor schuift kaart 2 niet **voor** kaart 1 — ze verdwijnen er achter. In de referentievideo komt elke volgende kaart juist **bovenop** de vorige.

## Oplossing

Eén simpele fix: voeg een oplopende `z-index` toe aan elke sticky card wrapper zodat elke volgende kaart een hogere z-index heeft en dus vóór de vorige kaart verschijnt.

### Wijziging in `src/components/home/HomeProcess.tsx`

**Regel 87** — voeg `zIndex` toe aan de inline style:

```tsx
style={{ top: `${60 + i * 24}px`, zIndex: i + 1 }}
```

Dit zorgt ervoor dat kaart 1 z-index 1 heeft, kaart 2 z-index 2, etc. — elke volgende kaart schuift dus visueel vóór de vorige tijdens het scrollen.

