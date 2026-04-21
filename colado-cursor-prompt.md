# CURSOR PROMPT — Colado.in Landing Page

Copy everything below (between the two `===` lines) into Cursor. Paste it in a new Next.js project or replace your current landing page. Instructions for you (the human) are at the very bottom — not inside the prompt.

===

# Build: Colado.in — AI Personal Assistant Landing Page

## Context

You are rebuilding `colado.in`, the marketing landing page for **Colado** — an AI personal assistant for **founders and students**. The core product is a mobile app. This is the landing page.

**Product promise:** Users dump tasks in natural language → Colado prioritizes them and tells them the single next action to take. No more juggling lists.

**Primary goal of this page:** get visitors to (1) *feel* what Colado does by trying an interactive demo on the page itself, and (2) request early access.

**Tone:** Professional. Calm. Confident. Founder/student serious, not "productivity bro." Think Linear × Arc Browser × Things 3. Swiss-precise, but with warmth.

---

## Stack & setup

- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS + CSS variables for theme tokens
- **Animation:** Framer Motion (primary), GSAP ScrollTrigger only if needed
- **3D:** `@react-three/fiber` + `@react-three/drei` + `three`
- **Icons:** `lucide-react`
- **Fonts:** `Instrument Serif` (display, via `next/font/google`) + `Geist` (body, via `next/font/google`) + `JJannon` fallback mono for small details. Instrument Serif is the signature — use it for all large headlines.
- **Deployment target:** Vercel

Install:
```bash
npm i framer-motion three @react-three/fiber @react-three/drei lucide-react
```

---

## Design system (lock this down first)

Create `app/globals.css` with these tokens. **Do not deviate.**

```css
:root {
  /* Surfaces */
  --bg: #F7F5F0;          /* warm off-white, not pure white — this is the signature */
  --bg-elevated: #FFFFFF;
  --ink: #0E0F0C;         /* near-black with olive undertone */
  --ink-soft: #2A2B27;
  --muted: #6B6C66;
  --hairline: #E5E1D6;    /* warm divider */

  /* Accent — one color, used sparingly */
  --accent: #2D5F3F;       /* deep forest green — trust, focus, founder-serious */
  --accent-soft: #E8F0EA;

  /* Signal colors (use only for demo states) */
  --signal-priority: #C9502E;  /* terracotta for "do this now" */
  --signal-done: #6B8E5A;      /* sage for completed */

  /* Type scale */
  --display: 'Instrument Serif', serif;
  --body: 'Geist', ui-sans-serif, system-ui;
  --mono: ui-monospace, 'SF Mono', Menlo, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0E0F0C;
    --bg-elevated: #16170F;
    --ink: #F7F5F0;
    --ink-soft: #D8D6CE;
    --muted: #8A8B84;
    --hairline: #2A2B24;
    --accent: #7FB88F;
    --accent-soft: #1E2A21;
  }
}

html { background: var(--bg); color: var(--ink); }
body { font-family: var(--body); font-feature-settings: "ss01", "cv11"; }
.display { font-family: var(--display); letter-spacing: -0.02em; line-height: 0.95; }
```

**Rules:**
- Off-white background (`#F7F5F0`), never pure white. This is the #1 reason it won't look like an AI-generated site.
- Italic `Instrument Serif` for emphasis words inside headlines (e.g., *"one thing"* in italics).
- Max one accent color on screen at a time. No gradients except the hero's subtle radial fog.
- All dividers are 1px `var(--hairline)`. No shadows except on the demo card.

---

## Page structure (in order)

1. **Nav** — sticky, blurred, minimal
2. **Hero** — headline + live interactive demo (the hero IS the demo, side-by-side)
3. **"Try it" expanded demo** — full-width, scroll-locked section where the demo comes to life
4. **3D scene** — a quiet ambient moment with a 3D object
5. **Three pillars** — Capture → Prioritize → Act (with scroll-driven transitions)
6. **For founders / For students** — tab switcher with different use cases
7. **Social proof** — quotes from beta users (text-only, editorial style)
8. **Early access form**
9. **Footer**

---

## Section-by-section build

### 1. Nav (`components/Nav.tsx`)

- Sticky top, `backdrop-blur(12px)`, `bg-[var(--bg)]/70`, 1px bottom hairline
- Left: Colado wordmark in `Instrument Serif`, 22px
- Center: Features · How it works · For founders · For students (14px, `var(--muted)`, hover → `var(--ink)`)
- Right: "Get the app" pill button — `bg-[var(--ink)] text-[var(--bg)]`, 40px tall, rounded-full, 16px horizontal padding
- Mobile: hamburger → full-screen overlay with same links, staggered fade-in

### 2. Hero (`components/Hero.tsx`)

Two-column layout on desktop (60/40 split), stacked on mobile.

**Left column:**
- Small eyebrow: `AI assistant · for founders & students` — 13px, uppercase, letter-spacing 0.12em, `var(--muted)`
- Headline (display font, 84px desktop / 48px mobile):
  > Stop planning. **<em>Start doing.</em>**

  The italic part is real `<em>` with `font-style: italic`.
- Subhead (22px, `var(--muted)`, max-width 520px):
  > Dump everything on your mind. Colado decides what matters right now — so you finish instead of re-sort.
- Two CTAs inline:
  - Primary: `Get the app →` (solid ink button)
  - Secondary: `Try it below` (text link, underlined on hover, scrolls to demo)
- Trust row below, 14px, `var(--muted)`: `Built for founders shipping fast · Used by students at IIT, BITS, Ashoka`

**Right column — THE INTERACTIVE DEMO (this is the hero's heart):**

Build `<LiveDemo />` — this is the most important component on the page.

**Behavior:**
- A card styled like a real app screen, 420px wide, soft shadow, `bg-[var(--bg-elevated)]`, rounded-2xl, 1px border `var(--hairline)`
- Top of card: an input field with placeholder `"What's on your mind?"`
- User types tasks separated by commas OR pressing Enter. Examples pre-filled as ghost suggestions:
  - `"Finish pitch deck, reply to investor, buy groceries, book flight to Bangalore, call mom"`
- A "Prioritize" button (accent green) — when clicked:
  1. Tasks animate from input into a list with staggered entry (Framer Motion `stagger(0.08)`)
  2. After 600ms, tasks re-sort themselves with a smooth FLIP animation (use Framer Motion `layout` prop)
  3. The top task gets a terracotta dot (`var(--signal-priority)`) and a label `DO THIS NOW`
  4. Each task shows an AI-generated reason in small text under it (hardcode realistic reasons for the example set — e.g., "Investor reply is time-sensitive; 2 min task blocking bigger flow")
- A "Try your own" button resets the demo

**Heuristic for the fake prioritization** (since this is a landing page mock, hardcode rules):
- Anything with "investor", "pitch", "deadline", "reply" → top priority
- Anything with "call mom", "reply to friend" → mid (relationship, non-urgent)
- Anything with "groceries", "book flight", "buy" → bottom (admin)
- When tasks don't match any rule, randomize but keep stable

Implementation note: use Framer Motion's `<Reorder.Group>` or manual `layout` + sorted state. The *re-sort* motion is the magic — make sure it's buttery (spring, stiffness 300, damping 30).

### 3. Scroll-locked demo section (`components/ScrollDemo.tsx`)

Full viewport height. Pins for 2x viewport scroll duration (use Framer Motion's `useScroll` + `useTransform`).

**Narrative:** as user scrolls, the same demo card grows from its hero size to centered and larger (scale 1 → 1.3), and the text beside it cycles through three states:

1. **0-33% scroll:** "Watch how it works." — demo shows 5 tasks being typed (auto-typewriter effect)
2. **33-66%:** "Colado reads the context." — tasks animate into priority order, reasons fade in
3. **66-100%:** "You get one next move." — all tasks fade to 30% opacity except the #1, which scales slightly and pulses

No scroll-jacking — use `sticky` positioning, not `overflow: hidden` on body.

### 4. 3D ambient scene (`components/ThreeScene.tsx`)

Between scroll demo and pillars. Full-width, 520px tall section with dark-ish background (`--bg-elevated` inverted, or a warm charcoal `#1A1B15`).

**The 3D object:** A slowly rotating, matte-finish **abstract geometric sculpture** — I suggest a `TorusKnotGeometry` with custom shader or a distorted `IcosahedronGeometry` with `MeshPhysicalMaterial` (matte, clearcoat 0.1, roughness 0.7, color `#D8D6CE`). Orbits gently on its Y-axis. No user interaction needed — it's ambient.

**Lighting:** One warm key light (top-right, color `#FFE8C7`), one cool fill light (bottom-left, color `#B8D4E0`), subtle ambient `#2A2B25`.

**Overlay text** (absolute, centered over the canvas):
> A calmer way to decide.
>
> *Colado is the quiet second brain for people building things that matter.*

Use `<Canvas>` from `@react-three/fiber`. Wrap in `<Suspense>` with a skeleton fallback so it doesn't block LCP.

**IMPORTANT — leave a slot for a custom 3D model:** Create the component so it accepts an optional `modelUrl` prop. If `modelUrl` is provided, load it via `useGLTF` from drei. If not, fall back to the procedural geometry. This way the user can drop in their own `.glb` file later.

```tsx
// components/ThreeScene.tsx — sketch
import { useGLTF } from '@react-three/drei';

function Sculpture({ modelUrl }: { modelUrl?: string }) {
  if (modelUrl) {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} />;
  }
  return (
    <mesh rotation={[0.3, 0, 0]}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshPhysicalMaterial color="#D8D6CE" roughness={0.7} clearcoat={0.1} />
    </mesh>
  );
}
```

**Placeholder asset path:** `/public/models/sculpture.glb` — if the file doesn't exist, component falls back gracefully.

### 5. Three pillars (`components/Pillars.tsx`)

Three full-width rows, each 80vh tall. As user scrolls into each row:
- Large number on the left (`01`, `02`, `03`) in display font, 180px, `var(--hairline)` color (very subtle)
- Word on top in small caps: `CAPTURE`, `PRIORITIZE`, `ACT`
- Headline (display, 56px):
  - Capture: *"Say it like you'd say it to a friend."*
  - Prioritize: *"We read the context. You trust the answer."*
  - Act: *"One clear move. Then the next one."*
- Body paragraph, 18px, `var(--muted)`, max 480px
- Right side: a small animated illustration (SVG) that loops — I suggest:
  - Capture: handwriting animation of "Ship the deck, reply to Alex..." drawing itself
  - Prioritize: task dots rearranging themselves
  - Act: a single task card pulsing with "START" button

Use Framer Motion `whileInView` with `viewport={{ once: true, margin: "-20%" }}` for scroll-triggered reveals.

### 6. Audience switcher (`components/Audiences.tsx`)

Centered section, max-width 1100px.

Heading: *"Built for people who make things."* (display, 56px)

Tab switcher (two tabs, pill style, centered below heading): `For founders` | `For students`

**For founders panel:**
- Grid of 4 use cases as cards:
  - Fundraising week: "Investor emails, deck revisions, customer calls — Colado keeps the deal warm."
  - Hiring: "Candidate replies, scheduling, reference checks — never dropped."
  - Launch day: "The 40-item checklist, ranked by what breaks if you skip it."
  - Deep work: "Knows when to leave you alone."

**For students panel:**
- Same grid, different content:
  - Exam season: "Syllabi, mocks, revision — ranked by impact on your grade."
  - Internship hunt: "Applications, follow-ups, deadlines — in order of return."
  - Side project: "Build momentum between classes without losing the thread."
  - Life admin: "Room rent, fees, forms — handled before they're emergencies."

Tab switch uses Framer Motion `AnimatePresence` with a 200ms crossfade.

### 7. Social proof (`components/Proof.tsx`)

Editorial pull-quote layout. NO cards, NO avatars. Three large quotes, separated by hairlines.

```
"Finally, one thing to focus on."
— Priya, final-year student, BITS Pilani

"I stopped opening five apps to figure out what's next."
— Arjun, design lead at [stealth]

"The opposite of another cluttered task list."
— Riya, founder of [stealth YC-backed]
```

Quotes in 32px `Instrument Serif` italic. Attribution in 14px mono, muted.

### 8. Early access form (`components/EarlyAccess.tsx`)

Minimal. Single column, max 480px.

Heading: *"Get the app."* (display, 72px)
Sub: "Colado is in private beta. We're adding founders and students every week."

Form (stacked):
- Name (required)
- Email (required)
- One of: "I'm a founder" / "I'm a student" / "Other" (radio, inline)
- Optional: "What are you trying to get done?" (textarea, 3 rows)
- Button: `Request access →`

Success state: form collapses into a single line that says *"You're in. We'll be in touch."* with a subtle check mark.

Wire the form to a Next.js API route `app/api/early-access/route.ts` that logs to console for now (leave a `// TODO: connect to database/email` comment).

### 9. Footer (`components/Footer.tsx`)

Three columns + bottom strip.
- Left: Colado wordmark + one-liner "AI assistant for founders & students."
- Middle: Product links
- Right: Company links + social icons (Twitter/X, LinkedIn — use lucide-react icons)
- Bottom strip: © 2026 Colado · Privacy · Terms · hello@colado.in

---

## Global polish requirements

1. **Page-load orchestration:** Hero fades and translates up in a 600ms staggered sequence (eyebrow → headline → subhead → CTAs → demo card). Use Framer Motion's `staggerChildren: 0.08`.
2. **Cursor:** On interactive elements, swap to a custom cursor — a small 8px dot that scales to 28px with `mix-blend-mode: difference` on hover. Only on desktop (`pointer: fine`). Gracefully degrade on touch.
3. **Scroll indicator:** Thin 2px progress bar at top of viewport (below nav) that fills as user scrolls. `var(--accent)` color.
4. **Respect reduced motion:** All Framer Motion components check `useReducedMotion()` and skip to final state if true.
5. **Dark mode:** Must work. Test both themes before shipping.
6. **Performance:** Lazy-load the 3D scene (`dynamic(() => import(...), { ssr: false })`). Use `next/image` for everything. Target LCP < 2.0s.

---

## Placeholder assets — where to leave space

Create these paths with empty/placeholder files. Add a comment in the code at each usage telling the human what to drop in:

| Path | Purpose | Specs | Comment in code |
|---|---|---|---|
| `/public/models/sculpture.glb` | 3D hero object | Low-poly, under 500KB, matte material | `// Drop your .glb file here. Falls back to procedural geometry.` |
| `/public/og-image.png` | Social share | 1200x630 | `// Replace with final OG image.` |
| `/public/favicon.svg` | Favicon | Square SVG | `// Replace with Colado mark.` |
| `/public/app-screenshot-1.png` | Actual app shot for demo fallback | 1170x2532 | `// Optional — shown if JS demo fails.` |
| `/public/app-mockup-device.png` | iPhone mockup for audience section | Transparent PNG | `// Optional device frame for app preview.` |

In `components/ThreeScene.tsx`, do this:
```tsx
{/* 
  ASSET SLOT: Place your 3D model at /public/models/sculpture.glb
  If not present, this will render a procedural icosahedron as fallback.
  Recommended: abstract organic shape, matte finish, under 500KB, decimated.
  Export from Blender with Draco compression.
*/}
```

In `components/Hero.tsx`, near the demo:
```tsx
{/* 
  ASSET SLOT: If you want a real app screenshot instead of the interactive demo,
  drop it at /public/app-screenshot-1.png and swap <LiveDemo /> for <Image />.
  But we recommend keeping the interactive demo — it converts better.
*/}
```

---

## What to name files

```
app/
  layout.tsx
  page.tsx
  globals.css
  api/early-access/route.ts
components/
  Nav.tsx
  Hero.tsx
  LiveDemo.tsx         ← the interactive demo
  ScrollDemo.tsx
  ThreeScene.tsx
  Pillars.tsx
  Audiences.tsx
  Proof.tsx
  EarlyAccess.tsx
  Footer.tsx
  Cursor.tsx           ← custom cursor
  ScrollProgress.tsx
lib/
  prioritize.ts        ← the fake prioritization logic for LiveDemo
public/
  models/
    .gitkeep
  og-image.png
```

---

## Tone & copy rules

- Never say "AI-powered" or "Revolutionary" or "10x productivity"
- No emoji in UI text (emoji in user-generated task examples is fine)
- Short sentences. Full stops are encouraged.
- Use the word "quiet" at least once. Use "calm" at least once. Avoid "boost", "supercharge", "unleash".
- When writing button labels, prefer verbs: "Get the app", "Request access", "Try it", "Start"

---

## Ship checklist before you consider this done

- [ ] Loads in under 2s on a throttled 4G connection
- [ ] Works on iPhone SE (smallest modern viewport, 375px)
- [ ] Works on 4K monitor (no max-width blowouts)
- [ ] Dark mode tested
- [ ] All interactive elements have focus rings (2px `var(--accent)`)
- [ ] `prefers-reduced-motion` respected
- [ ] Demo re-sort animation is smooth (no jank)
- [ ] 3D scene lazy-loads and doesn't block paint
- [ ] No console errors
- [ ] Form submits to API route without errors
- [ ] Lighthouse scores: Perf 90+, A11y 100, Best Practices 100, SEO 100

===

---

## What YOU need to do after Cursor finishes

Everything below is for you, Pratham — not for Cursor. Don't paste this part into Cursor.

**1. Drop in the 3D model (optional but recommended)**
- Go to [Sketchfab](https://sketchfab.com) or [Poly Pizza](https://poly.pizza) and find a free abstract sculpture/crystal/organic shape you like
- Or commission one from a 3D artist on Fiverr (~$30-80) — brief: "abstract matte sculpture, like a smooth river stone crossed with a crystal, low poly, under 500KB as .glb"
- Export as `.glb` with Draco compression (Blender → File → Export → glTF 2.0 → check "Draco mesh compression")
- Save it to `public/models/sculpture.glb`
- If you skip this step, the site falls back to a procedural icosahedron automatically — still looks good

**2. Write the real beta-tester quotes**
- The three quotes in the Proof section are placeholders with generic Indian names
- Replace with real quotes from your actual beta users (ask them for permission)
- Keep the format: one-line quote, then `— Name, role, org`

**3. Add real screenshots for OG image**
- Design a 1200×630 PNG at `/public/og-image.png` showing the app with a headline
- Use Figma — template: dark background, Instrument Serif headline, small Colado mark

**4. Connect the early-access form to something real**
- Right now the form POSTs to `/api/early-access` which just console.logs
- Options: (a) wire to Supabase/Firebase, (b) use a service like Tally or Formspree, (c) send to your email via Resend (~free tier fine)
- The TODO comment in the API route flags this

**5. Replace the placeholder user proof names**
- Search the codebase for `Priya, final-year student, BITS Pilani` etc. — these are fake. Replace before launch.

**6. Swap the hero illustration (optional)**
- If you want a real app screenshot instead of the interactive demo, drop a PNG at `/public/app-screenshot-1.png` and swap the component per the comment in `Hero.tsx`
- I strongly recommend keeping the interactive demo — it's the site's best conversion tool

**7. Domain + deploy**
- Push to GitHub, connect to Vercel, point `colado.in` at it
- Vercel handles SSL automatically

**8. Test on real devices**
- Your phone, your laptop, one more person's phone
- Especially check: does the LiveDemo feel magical on the first try? If it doesn't, tell Cursor to slow the re-sort animation to 700ms spring and add a tiny haptic-like pulse on the #1 task

**9. Analytics**
- Add Plausible or Vercel Analytics (free tier) — just enough to know if the demo is being used
- Track: demo button clicks, form submits

**10. Mobile app deep link**
- The "Get the app" buttons don't link anywhere yet — point them at your App Store / Play Store listings when they're live, or to a mailto for now

---

That's it. This prompt will give you a landing page that looks nothing like generic AI-generated sites and actually shows founders and students what Colado does instead of just telling them.
