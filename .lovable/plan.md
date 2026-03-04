

## Secret Admin Access

A hidden entry point to `/admin` from the homepage. Common patterns:

1. **Logo Easter Egg** — Triple-click (or 5x rapid click) on the Solyn logo in the footer navigates to `/admin`. No visual indicator whatsoever.
2. **Konami-style shortcut** — A keyboard sequence (e.g. pressing `admin` keys in order) triggers navigation.
3. **Hidden tap zone** — An invisible clickable area in the footer copyright text.

**Recommended approach: Combine #1 + #2**

- In `HomeFooter.tsx`, add a click counter on the logo/copyright. After 5 rapid clicks (within 2 seconds), navigate to `/admin`.
- In `Index.tsx` (or a global hook), listen for the keyboard sequence `a-d-m-i-n` typed in order → navigate to `/admin`.
- Zero visual indication. No hover effects, no cursor changes.

**Implementation:**
- `src/components/home/HomeFooter.tsx` — Add a `useRef` counter + timeout on the footer logo. After 5 clicks within 2s, call `navigate("/admin")`.
- `src/pages/Index.tsx` — Add a `useEffect` with a `keydown` listener tracking the sequence `['a','d','m','i','n']`. On completion, navigate to `/admin`.

Both methods are completely invisible to regular users.

