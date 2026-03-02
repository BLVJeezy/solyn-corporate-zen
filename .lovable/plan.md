

## Plan: Scroll-to-top bij navigatie + animaties voor navbar en content

### Wat wordt er gedaan

1. **Scroll-to-top component** — Een `ScrollToTop` component die bij elke route-wijziging `window.scrollTo(0, 0)` aanroept, zodat elke pagina van bovenaf opent.

2. **Navbar slide-down animatie** — De navbar krijgt een framer-motion animatie die bij mount van boven naar beneden inschuift (translateY van -100% naar 0).

3. **Content slide-up animatie** — De page content op elke pagina krijgt een fade-in + slide-up animatie (translateY van 20px naar 0 met opacity).

### Technische details

- **`src/components/ScrollToTop.tsx`** (nieuw): Gebruikt `useLocation` van react-router-dom om bij pathname-wijziging `window.scrollTo(0, 0)` aan te roepen.
- **`src/App.tsx`**: `<ScrollToTop />` toevoegen binnen `<BrowserRouter>`.
- **`src/components/Navbar.tsx`**: De `<nav>` wrappen in een `motion.nav` met `initial={{ y: -80 }}` en `animate={{ y: 0 }}` transitie.
- **Pagina's** (Index, Portfolio, Pricing, BookCall, Login, etc.): De content-wrapper wrappen in `motion.div` met fade-in + slide-up animatie, of een gedeelde `PageTransition` wrapper component maken.

