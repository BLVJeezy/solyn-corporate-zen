

## Plan: Verwijder de lijn onder de navbar op de portfolio pagina

De lijn wordt veroorzaakt door de globale CSS-regel `* { @apply border-border }` (in `index.css`, regel 90) die een border-kleur instelt op alle elementen. Op de homepage valt dit niet op door de donkere achtergrond, maar op de portfolio pagina (lichte achtergrond) wordt de border zichtbaar als een dunne lijn onder de navbar.

### Wijziging

**`src/components/Navbar.tsx`** (regel 72): Voeg `border-none` toe aan de `motion.nav` className:

```
"fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent border-none"
```

Dit forceert de border naar nul en voorkomt dat de globale `border-border` regel een zichtbare lijn creëert.

