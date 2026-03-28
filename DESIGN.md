# Design System Strategy: The Focused Curator

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Focused Curator**. Unlike standard productivity tools that clutter the interface with boxes and borders, this system treats digital space like a high-end editorial gallery. It is designed to recede, allowing the user’s content to become the focal point.

We break the "template" look by rejecting rigid grids in favor of **Intentional Asymmetry**. By utilizing generous whitespace (Scale 12–20) and varying the density of information, we create a rhythm that feels human and sophisticated. Hierarchy is not forced through bold lines; it is suggested through tonal shifts and exquisite typography.

---

## 2. Color Theory: Tonal Depth
This system moves away from flat "app" aesthetics toward a layered, atmospheric experience.

### The Palette
*   **Surface Foundation:** `surface` (#f8f9fa) and `surface_container_lowest` (#ffffff) provide the paper-like base.
*   **The Accent (Primary):** `primary` (#575d76) is a sophisticated muted indigo. Use it sparingly for intent-driven actions.
*   **Neutral Tones:** `secondary` (#55616a) and `on_surface_variant` (#586064) manage secondary information without competing for attention.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined solely through background color shifts. 
*   *Example:* A sidebar should be `surface_container_low` (#f1f4f6) sitting flush against a `surface` (#f8f9fa) main canvas.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface_container` tiers to create "nested" depth:
1.  **Level 0 (Base):** `surface`
2.  **Level 1 (Sections):** `surface_container_low`
3.  **Level 2 (Cards/Active Elements):** `surface_container_lowest` (Pure White)

### The "Glass & Gradient" Rule
To elevate the "out-of-the-box" feel, use **Glassmorphism** for floating elements (menus, tooltips). Combine `surface_container_lowest` at 80% opacity with a `backdrop-blur` of 20px. 
**Signature Texture:** Use a subtle linear gradient from `primary` (#575d76) to `primary_dim` (#4b516a) on main CTAs to add a "metallic" silkiness.

---

## 3. Typography: Editorial Authority
We utilize a dual-font strategy to balance character with utility.

*   **Display & Headlines (Manrope):** Chosen for its geometric modernism. Use `display-lg` and `headline-md` with `on_surface` (#2b3437) to create authoritative, quiet anchors for the page.
*   **Body & Labels (Inter):** The workhorse. Inter’s high x-height ensures legibility in dense productivity contexts. Use `body-md` for standard text and `label-sm` for metadata.
*   **Hierarchy Note:** Use wide letter-spacing (0.05em) for `label-md` in all-caps to denote category headers—this mimics high-end architectural signage.

---

## 4. Elevation & Depth: Atmospheric Layering

### The Layering Principle
Achieve depth by "stacking" tones. 
*   **The Desktop Pattern:** Place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#eaeff1) background. The 2-step jump in value creates a natural lift that feels lighter than a shadow.

### Ambient Shadows
Shadows must be felt, not seen.
*   **Token:** Use a 40px blur with a 4% opacity, using `on_surface` as the tint.
*   **Rule:** Only apply shadows to elements that physically "float" over others (Modals, Popovers).

### The "Ghost Border" Fallback
If high-contrast accessibility is required, use a "Ghost Border": `outline_variant` (#abb3b7) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components: Minimalist Primitives

### Buttons
*   **Primary:** Gradient of `primary` to `primary_dim`, white text (`on_primary`), `xl` (0.75rem) corner radius.
*   **Secondary:** `surface_container_high` (#e2e9ec) background with `on_surface` text. No border.
*   **Tertiary:** Ghost style. No background/border. Use `primary` text weight 600.

### Input Fields
*   **Style:** `surface_container_low` background, no border. On focus, transition background to `surface_container_lowest` with a 1px "Ghost Border" of `primary`.
*   **Corners:** `md` (0.375rem).

### Cards & Lists
*   **Prohibition:** Forbid the use of divider lines. 
*   **Separation:** Use `spacing-6` (2rem) of vertical white space or a subtle shift from `surface` to `surface_container_low` to indicate a new list item.

### Productivity Specific: "The Focus Bar"
A floating command bar (Glassmorphism) using `surface_container_lowest` at 85% opacity, `full` (9999px) radius, and an `ambient shadow`. This serves as the primary navigation/search hub.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use `spacing-16` or `spacing-20` for page margins to create a "Gallery" feel.
*   **Do** use `primary_container` (#dce1ff) for subtle highlights in calendars or schedulers.
*   **Do** ensure all icons are 2px stroke weight to match the "Inter" font weight.

### Don't
*   **Don't** use pure black (#000000). Use `on_surface` (#2b3437) for all text to maintain a soft, professional contrast.
*   **Don't** use standard "drop shadows" on cards. Rely on tonal shifts between surfaces.
*   **Don't** crowd the interface. If a screen feels "busy," increase the `spacing` tokens rather than adding borders.