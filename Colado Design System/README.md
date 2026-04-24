# Colado Design System

> *Quiet instruments for people who make things.*

Colado is an AI personal assistant for **founders and students** — a virtual PA that captures tasks in natural language, decides what matters right now, and surfaces one clear next move. The core product is a mobile app; this design system supports its marketing surface (**colado.in**), in-app chrome, and anything else that needs to speak in the Colado voice.

---

## Sources

This design system was distilled from:

- **Codebase** — [`nipulsh/colado-landing-page`](https://github.com/nipulsh/colado-landing-page) (Next.js 14 + TypeScript + Tailwind v4 + Framer Motion + react-three-fiber). The source of truth for tokens, components, and copy.
  - `app/globals.css` — tokens (mirrored here in `colors_and_type.css`).
  - `components/*` — Hero, LiveDemo, Nav, Audiences, EarlyAccess, Footer, Pillars.
  - `lib/brand.ts` — canonical tone lines.
  - `colado-cursor-prompt.md` — the original brief; locks the palette.
  - `colado-design-philosophy.md` — "Quiet Instruments" philosophy note.
  - `DESIGN.md` — a second, alternate "Focused Curator" spec (**not** the active system; noted for reference — the locked palette is paper/ink/forest/terracotta, not indigo).
- **Assets** — `/public/favicon.svg`, `/public/screen.png` (the Colado wordmark specimen). Imported into `assets/`.

The reader is not assumed to have access to any of the above. Everything needed to design with Colado lives in this repo.

---

## The product

A mobile-first AI assistant. Users dump everything on their mind in natural language; Colado reads the context (deadlines, energy, consequences), ranks, and tells them the single next move. It also replies on their behalf, takes follow-ups, hands tasks off with the founder's instructions, and manages the schedule. The promise is a **calm operator** — not another cluttered list.

**Audiences:** founders (at early-stage startups) and students (IIT, BITS, Ashoka).
**Primary marketing goal:** request early access, after letting visitors *feel* the product through a live demo on the page.

---

## Index

| File / folder | What it is |
|---|---|
| `README.md` | This file. |
| `colors_and_type.css` | All CSS variables (color + type + spacing + motion) and semantic helper classes. |
| `SKILL.md` | Agent-Skills-compatible entry point. |
| `assets/` | Logo, wordmark, favicon. Background/brand imagery. |
| `preview/` | Small self-contained HTML cards for the Design System tab. |
| `ui_kits/landing/` | React/JSX recreation of the colado.in landing surface (hero, demo card, audience grid, early-access form, footer). |

---

## CONTENT FUNDAMENTALS

> *Tone: professional, calm, confident. Founder/student serious, not "productivity bro." Linear × Arc Browser × Things 3. Swiss-precise, with warmth.*

### Voice

Colado speaks like **a senior operator who has seen the chaos and stopped performing**. Sentences are short. Full stops are encouraged. The voice is *you-addressed* ("**You** stay smooth", "**you** trust the answer") — never the royal "we" talking down. When Colado speaks about itself, it's "Colado" or "we", never "the app" or "our AI".

It's the voice of a quiet craftsman. Not clever. Not chipper. Not salesy.

### Concrete rules

- **Never say**: "AI-powered", "revolutionary", "10x", "supercharge", "unleash", "boost", "effortless", "seamless", "game-changer", "hustle".
- **Use at least once in any long piece**: the word **"quiet"** and the word **"calm"**.
- **Buttons are verbs**: `Get the app`, `Request access`, `Try it`, `Start`, `Prioritize`, `Rewrite`, `Reset`. Never `Click here`, `Learn more`, `Submit`.
- **Full stops**, not trailing commas. "Stop planning. Start doing."
- **Italic <em> inside display headlines** is the signature move. It carries the gesture: *"Stop planning. **Start doing.**"*
- **No emoji in UI copy.** Emoji are allowed inside user-generated task examples, because that's the user — not Colado — speaking.
- **Casing**: headlines are Sentence case. Instrument caps (the small mono labels) are ALL CAPS with `letter-spacing: 0.22em`. Button labels are Sentence case. Never Title Case.
- **Arrow glyphs**: `→` after primary CTAs (`Request access →`), `↓` after scroll-down nudges (`try it below ↓`).
- **Copy length**: hero subhead ≤ 22 words. Feature paragraph ≤ 40 words. Footnote ≤ 12 words.

### Vocabulary (the Colado lexicon)

Words that appear and reappear — these are the brand's tonal anchors.

- *quiet · calm · composed · smooth · honest · instrument · specimen · movement · coordinate · gesture · ship · move · next · now*

### Signature phrases (copy specimens, from `lib/brand.ts`)

- Masthead sub: *"Smooth composure · one next move"*
- Tagline: *"Smooth composure. One next move."*
- Site title: *"Colado — Composed. One next move."*
- Site description: *"The quiet AI for founders and students. When the week goes loud, Colado stays smooth — one clear, prioritized next move. Private beta."*
- Hero headline: *"Stop planning. **Start doing.**"*
- Hero subline: *"When the list shouts, you stay smooth — one move at a time."*
- Hero eyebrow: *"Fig. I — An intelligent assistant for founders & students"*
- Audience headline: *"For people **who make things.**"*
- Method headline: *"Three movements, **one quiet instrument.**"*
- Closing: *"Get the **app.**"* with subtext *"Private beta — we bring people on weekly, in order, with no performance."*

### Editorial structure

Sections are **specimens**, not pages. They carry:
- A **section mark** at the top: `§ 02 — Method` or just `Audience`, in `inst` caps.
- A **display headline**, with italicised closing phrase.
- A **folio coordinate** somewhere near the bottom or corner: `Fig. I.a`, `01 / 06`, `MMXXVI`.
- Inline **instrument caps** annotations that describe the specimen ("Input accepts natural language.", "Deep focus · 90 min · high impact").

---

## VISUAL FOUNDATIONS

> The north star: **a specimen drawer**. Labeled, indexed, measured — softened by the grain of cream paper that has sat on a desk for a decade. Instruments, not applications.

### Paper & ink

- **Background**: `#F7F5F0` — warm bone-white, never pure white. This is the single most recognisable brand decision. The *absence* of `#FFFFFF` as a page field is why Colado doesn't look like an AI-generated site.
- **Elevated surfaces** (demo card, modals only): `#FFFFFF`. Used sparingly, as a quiet "step up" from paper.
- **Ink**: `#0E0F0C` — near-black with an olive undertone. Never pure `#000`. It reads warmer, like fountain-pen residue.
- **Hairlines**: `#E5E1D6` — warm, not neutral gray. All 1px dividers use this color.

### Accent — *colour is earned*

Only **one** accent appears on screen at a time.

- **Forest green** `#2D5F3F` — trust, focus, "do it". Appears on the primary `Prioritize` CTA inside the demo, the accent-soft tint for done-states, the focus ring on form fields.
- **Terracotta** `#C9502E` — the ONE thing that must be done now. Used on the `NOW` pill in the priority list, on the tiny dot in the demo masthead, on error states.
- Never a gradient except the hero's subtle radial fog (accent @ 8% top-right, terracotta @ 6% bottom-left, both fading to transparent).

### Typography

A **three-font strategy** carrying three voices:

1. **Instrument Serif** (display) — a romantic humanist serif, used for headlines, pull quotes, Roman numerals (I · II · III), and the signature italic emphasis `<em>` inside display copy. Letter-spacing `-0.018em`, line-height `0.98`. Weight 400; italic comes from the typeface's optical italic.
2. **Geist** (body) — a modern grotesque, the workhorse for paragraphs, buttons, form inputs. Font-feature-settings `"ss01", "cv11"` on by default.
3. **JetBrains Mono** (annotator) — the laboratory voice. Only ever small, in all-caps with wide letter-spacing (`0.18–0.26em`). Used for folio coordinates (`Fig. I.a`, `01 / 06`), instrument captions, `NOW` pill, section marks (`§ 02`).

The **tension between Instrument Serif's warmth and JetBrains Mono's precision** is the entire emotional engine. The serif is the love letter; the mono is the field manual. They sit together without conflict.

### Space

Space is the **loudest element**. Vast margins, generous gutters, breathing room between every line.

- Page side padding: `24–48px` on mobile, `32–96px` on desktop.
- Section vertical padding: `64–128px`. Long-scroll sections approaching `160px`.
- Content max-width: **1280px** — never wider. Text max-width for paragraphs: `460–520px`.
- The grid is **visible but not enforced** — hairlines divide zones; they do not imprison content. Asymmetry is intentional.

### Borders

- Every visible divider is `1px solid var(--hairline)`. No 2px, no dashed, no double.
- Cards are `1px solid var(--hairline)` on `var(--bg-elevated)`. No card shadows — except the demo card.
- On focus, inputs shift to a single ink-soft hairline; a 2px forest-green `focus-visible` ring wraps buttons.

### Shadows

**One shadow** on the entire site: the demo card.
```
0 1px 1px color-mix(in srgb, var(--ink) 4%, transparent),
0 22px 60px -24px color-mix(in srgb, var(--ink) 18%, transparent);
```
Everywhere else, depth is suggested through tonal shifts between paper and elevated white, not shadows. Keep it this way.

### Corner radii

- Cards: `14px`.
- Inputs: unrounded (borders only on the bottom edge, a signature underline-field style).
- Pills & buttons: `9999px` (fully round).
- Small inline chips / priority pills: `9999px`.
- **Never** `4px` square corners; **never** `24px+` "floaty" radii.

### Imagery

- The site is largely **typographic**. When imagery appears it is either:
  - A **diagram-like screenshot** of the product's specimen card.
  - A **rotating procedural sculpture** (`<ThreeScene />`) — matte icosahedron, clearcoat `0.1`, roughness `0.7`, color `#D8D6CE`, warm key light `#FFE8C7`, cool fill `#B8D4E0`. Ambient, never interactive.
- No product screenshots in stock-y framed MacBook mockups. No photographic portraits. No illustrated avatars.
- If imagery is introduced, it tends toward **warm, paper-toned, grainy** — never cool or high-saturation. Think archival film, not Instagram.

### Motion

One easing curve, one vocabulary.

- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` — the Colado "out-expo" curve. Every transition uses it.
- **Durations**: `220ms` fast (hover), `360ms` medium (card reveal), `700ms` slow (display heading reveal), `900ms` scene (full-bleed transitions).
- **Entry**: fade-up `y: 18 → 0, opacity: 0 → 1`, staggered by `0.06–0.08s` per child.
- **Layout changes**: Framer Motion `layout` with spring `{ stiffness: 300, damping: 30 }` — the priority re-sort is the signature motion. It must be buttery.
- **Reduced motion is respected.** All animations collapse to the final state when `prefers-reduced-motion: reduce`.
- **No bounces. No scales-on-load. No parallax.** Composure under load.

### Hover & press states

- Links: underline grows in from the left on hover (`background-size: 0% 1px` → `100% 1px`, animated).
- Ink CTAs: `opacity: 1 → 0.9` on hover, `0 → -1px` translate on press. No colour shift.
- Hairline chips/pills: border shifts from `var(--hairline)` to `var(--ink-soft)` on hover.
- Display `<em>` on hover: letter-spacing tightens by `0.01em`, underline grows from left. Subtle, deliberate.

### Transparency & blur

- The sticky nav uses `backdrop-filter: saturate(170%) blur(14px)` with `bg: color-mix(bg 78%, transparent)`. Glassmorphism appears only here and in floating menus — never on hero cards.

### Layout rules

- **Fixed elements**: only the nav (14px top hairline, ~56–76px tall). No sticky CTAs, no cookie banners dressed as buttons.
- A thin 2px forest-green **scroll-progress bar** sits under the nav.
- Sections can go full-bleed for scene transitions (the intro 3D stage), then *settle* into a 1280px-max frame for subsequent content.

### Cards

Cards are **specimens**. They have:
- 14px radius
- 1px hairline border
- White elevated background
- A **masthead row** (small dot + `inst-sm` label + folio coordinate on the right)
- A body
- A **footer** (inst-sm timestamp + 1–2 ghost pill buttons)
- No inner dividers stronger than `var(--hairline-soft)`

### Do / Don't

- ✅ Warm off-white field; one accent; italic display `<em>`; mono instrument caps; folio coordinates.
- ❌ Pure white pages. Pure black text. Gradient CTAs. Card shadows. Emoji in UI copy. Drop caps. Skeuomorphism. Dark mode (the spec is light-only).

---

## ICONOGRAPHY

> **System:** [`lucide-react`](https://lucide.dev) — 2px stroke, round caps & joins, 16–18px default. Imported directly in the codebase.

The 2px stroke is locked to match the weight of Geist body text, so icons sit on a line without out-shouting the words beside them. **Do not mix** icon sets; do not introduce filled-variant icons or outlined icons from other libraries.

### Usage in the codebase

- `ArrowRight` — after primary CTAs (`Request access →`, `Prioritize →`)
- `Pencil` — the `Rewrite` ghost button in the demo footer
- `RotateCcw` — the `Reset` ghost button
- `Check` — the success-state tick in the early-access form
- `Menu` / `X` — mobile nav toggle
- The Twitter/X and LinkedIn icons in the footer are **custom SVGs** (not lucide), because lucide's brand icons were removed upstream.

**Sizing convention**: 11–13px inside small ghost chips, 14–16px in form states, 18px in nav, 20–24px only in illustrative moments (there are almost none).

**Colour**: icons inherit `currentColor` — so they take the text colour of their container. Never use coloured icons except:
- The ✓ check inside `.bg-accent-soft` containers (renders in forest green)
- The terracotta priority dot (rendered as a `span`, not an icon)

### Unicode & glyphs

A few **Unicode glyphs** are used as typographic marks rather than icons — these are part of the editorial voice, not iconography:

- `·` (middle dot, U+00B7) — separator in mastheads (`Smooth composure · one next move`)
- `—` (em dash) — used in folio coordinates (`Fig. I — An intelligent…`)
- `§` (section sign) — before section numbers (`§ 02 — Method`)
- `→` `↓` — arrow glyphs on CTAs and scroll nudges
- `“ ”` (curly quotes) — always, never straight quotes.

### Emoji

**Not used in UI copy.** Allowed only inside user-generated task text examples (because that's the user speaking, not Colado). The brand voice itself never emoji.

### Logos & marks

Stored in `assets/`:

- `favicon.svg` — 64×64 rounded-rect ink tile with a lowercase italic Instrument Serif *c* in paper-white. This is the compact app mark.
- `screen.png` — a specimen rendering of the full `COLADO` wordmark. Imported from the codebase's `/public/screen.png` for reference.

If a new logo variant is needed, keep the ink tile + Instrument Serif italic lowercase *c* composition. The wordmark uses uppercase Geist (700) in `#0E0F0C`.

### Missing icon substitutions

If a needed glyph is not in lucide-react, fall back to **another lucide icon with the same stroke weight** rather than mixing libraries. Flag the substitution in code comments.

---

## Caveats & substitutions

- **Instrument Serif** and **Geist** are both served from Google Fonts — `colors_and_type.css` `@import`s them. JetBrains Mono likewise. No local `.ttf` files are shipped; the upstream project uses `next/font/google`. If you need self-hosted fonts, download the same families from Google Fonts and drop them into `fonts/`.
- The codebase references a 3D `sculpture.glb` that is **not in the repo** — the live site falls back to a procedural icosahedron. This design system does not ship the `.glb` either; treat the 3D scene as an optional accent.
- The `DESIGN.md` file in the source repo describes an *alternate* "Focused Curator" system (indigo primary, different surface tiers). That file is **not** the active system — the working system is the paper/ink/forest/terracotta "Quiet Instruments" palette locked in `colado-cursor-prompt.md` and `app/globals.css`. Ignore the indigo palette.
