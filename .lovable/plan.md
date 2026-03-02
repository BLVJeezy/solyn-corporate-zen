

## Problem

The navbar right-side elements (language switcher NL/FR/EN, theme toggle, user icon) use hardcoded `text-white` colors which are invisible on the light theme background. The centered pill nav works fine because it has a dark background, but the elements outside the pill blend into the light page background.

## Fix

Update `src/components/Navbar.tsx` to use theme-aware colors for elements outside the dark pill:

1. **Language switcher buttons**: Change from `text-white/50` / `bg-white/10 text-white` to `text-foreground/50` / `bg-foreground/10 text-foreground`
2. **User login button**: Change from `text-white/50 hover:text-white hover:bg-white/10` to `text-foreground/50 hover:text-foreground hover:bg-foreground/10`
3. **Mobile hamburger**: Change from `text-white` to `text-foreground`

The pill nav items inside the dark container keep their `text-white` styling since they sit on a dark background.

