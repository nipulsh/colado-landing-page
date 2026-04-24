# Colado Landing — UI Kit

A pixel-level recreation of the colado.in landing surface. Components are small, mainly cosmetic JSX with fake interactions. Visual fidelity is the priority.

## Files

- `index.html` — assembles everything into a scrollable landing page specimen.
- `Nav.jsx` — sticky blurred paper-field nav.
- `Hero.jsx` — eyebrow, display headline with italic em, CTAs, used-by row.
- `LiveDemo.jsx` — the interactive demo card (specimen-style).
- `Audiences.jsx` — two-column "For founders / For students" specimen.
- `EarlyAccess.jsx` — underline-field form with radio pills and submit.
- `Footer.jsx` — three-column masthead footer with folio bar.

## Conventions

- All tokens come from `../../colors_and_type.css`. No new colors invented.
- Layout width is fixed at 1280px for the card preview; the real site is responsive.
- Framer Motion animations collapsed to simple CSS — the goal is visual fidelity, not runtime motion.
