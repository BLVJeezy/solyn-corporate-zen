

## Probleem

De `<section>` wrapper heeft `overflow-hidden` (regel 60). CSS `position: sticky` werkt **niet** binnen een container met `overflow: hidden`. Daarom scrollen de kaarten gewoon onder elkaar in plaats van te stapelen.

## Oplossing

Twee wijzigingen in `src/components/home/HomeProcess.tsx`:

1. **Verwijder `overflow-hidden`** van de parent `<section>` (regel 60). Verplaats het naar alleen de elementen die het echt nodig hebben (de top/bottom fades en de infinite scroll container hebben het al via hun eigen overflow classes).

2. **Clip de gradient visueel** door `overflow-x: clip` te gebruiken in plaats van `overflow-hidden`. Dit voorkomt horizontale scrollbar door de gradient maar breekt sticky niet:

```tsx
// Regel 60: was overflow-hidden, wordt overflow-x-clip
<section className="relative overflow-x-clip">
```

Dit is de enige wijziging. De `z-index` en `sticky` logica zijn al correct — ze worden alleen geblokkeerd door de overflow-hidden.

