# Lumo Design System & Aesthetics (Stitch Integration)

> **Context:** The UI/UX of Lumo is based on a magical, whimsical design system generated via Google Stitch. When creating or modifying components and pages, you MUST adhere to the following design aesthetics and tokens.

## Core Philosophy
- **Whimsical & Magical**: The design must feel like a safe, magical adventure for children.
- **Premium & Modern**: Avoid generic layouts. Use rich typography, glassmorphism, depth (3D buttons), and soft shadows.
- **Dynamic**: Implement micro-animations (pulsing, floating, twinkling) to make the UI feel alive.

## Theme & Tokens

### Typography
- **Primary Font**: `Quicksand` (must be imported and used for all text).
- **Classes**:
  - `font-headline-xl text-headline-xl` (48px, bold, tight spacing)
  - `font-headline-lg text-headline-lg` (32px, bold)
  - `font-body-lg text-body-lg` (24px, medium)
  - `font-body-md text-body-md` (20px, medium)
  - `font-label-caps text-label-caps` (16px, bold, uppercase tracking)
  - `font-interactive-text text-interactive-text` (22px, bold)

### Colors (Tailwind Classes)
The `tailwind.config.js` is already configured with these Stitch tokens:
- **Backgrounds**: `bg-surface`, `bg-surface-container`, `bg-surface-container-high`
- **Text**: `text-on-surface`, `text-on-surface-variant`, `text-primary`, `text-on-primary`
- **Accents**: 
  - Primary (`#825500`, amber/gold tones)
  - Secondary (`#6b3dca`, purple tones)
  - Tertiary (`#006c49`, green tones)

## UI Components & Patterns

### 3D Buttons
All primary interactive buttons must have a 3D tactile feel using the custom CSS classes:
- **Primary**: `btn-3d bg-primary text-on-primary font-interactive-text text-interactive-text rounded-xl`
- **Secondary**: `btn-secondary-3d bg-secondary text-on-secondary font-interactive-text text-interactive-text rounded-xl`

### Glassmorphism Cards (Glass Cards)
For displaying content like rewards, items, or activities, use the glass card aesthetic:
- **Classes**: `glass-card rounded-lg shadow-lg border-b-4 group cursor-pointer hover:shadow-2xl transition-all`
- Note: `.glass-card` uses `backdrop-filter: blur(12px)` and a translucent white background (defined in `globals.css`).

### Animations & Dynamics
Global animations are defined in `globals.css` and should be applied to decorative elements:
- `.cloud`: Floating cloud animation (linear translation).
- `.star`: Twinkling star animation (opacity and scale pulse).
- `.lumi-container`: Gentle floating effect for character avatars.
- `.star-pulse`: Subtle pulsing effect for important metrics (like star balance).

## Implementation Rules
1. **Never use generic colors**: Do not use `bg-red-500` or `text-blue-600`. ALWAYS use the semantic Stitch tokens (e.g., `bg-primary-container`, `text-on-surface-variant`).
2. **Icons**: Use Google Material Symbols (`material-symbols-outlined`). Always wrap them with `<span className="material-symbols-outlined">icon_name</span>`.
3. **No Placeholders**: When adding characters or decorative imagery, use proper semantic elements or Lumo-specific image assets, never placeholder gray boxes.
4. **Spacing & Borders**: Use the custom spacing tokens (`gap-md`, `p-lg`, `rounded-full`, `rounded-xl`) to maintain the soft, child-friendly appearance (sharp edges should be avoided).
