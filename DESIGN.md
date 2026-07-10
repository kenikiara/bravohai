# DESIGN.md

Light theme only. Ken Designers language: royal blue carries identity, orange works, neutrals are blue-tinted. No pure `#fff`/`#000` anywhere.

## Tokens (Tailwind 4 `@theme`, OKLCH)

| Token | Value | Use |
|---|---|---|
| `bg` | `oklch(0.977 0.005 262)` | page background (blue-tinted off-white) |
| `surface` | `oklch(0.993 0.002 262)` | cards, panels |
| `well` | `oklch(0.955 0.008 262)` | inset areas, sidebar, table headers |
| `edge` | `oklch(0.90 0.012 262)` | borders |
| `ink` | `oklch(0.28 0.02 262)` | primary text |
| `muted` | `oklch(0.50 0.022 262)` | secondary text |
| `faint` | `oklch(0.62 0.02 262)` | tertiary/labels |
| `royal` | `oklch(0.43 0.128 265)` | brand primary (#2b4a9b) |
| `royal-deep` | `oklch(0.36 0.11 265)` | hover/pressed, hero bg (#22397a) |
| `royal-tint` | `oklch(0.945 0.02 265)` | selected/soft-blue fills (#eef2fb) |
| `flame` | `oklch(0.745 0.15 65)` | accent (#ef9a1e) — actions ≤10% of any surface |
| `flame-tint` | `oklch(0.97 0.03 80)` | warm fills (#fff8ec) |
| `bull` | `oklch(0.60 0.125 155)` | positive (#1f9d57) |
| `bear` | `oklch(0.55 0.17 28)` | negative |

## Typography

- Display (landing headings): **Bricolage Grotesque** — confident, characterful grotesque.
- UI/body everywhere: **Hanken Grotesk** — one family carries the product register.
- Landing scale is fluid (`clamp`), ratio ≥1.25. Dashboard scale fixed rem, ratio ~1.2.

## Color strategy

- Landing: **Committed** — the hero and final CTA are drenched royal blue with warm-white type; orange only on the primary CTA and small marks.
- Dashboard: **Restrained** — light neutrals, royal for primary actions/selection, bull/bear strictly semantic, orange rare (XAUUSD star, adaptation meter).

## Rules

- Buttons: royal solid (primary), surface+edge (secondary), flame solid only for the single hero CTA per page.
- Focus: 2px royal ring, `focus-visible` only.
- Motion: 150–250ms ease-out on product; landing may stagger hero reveal. Respect `prefers-reduced-motion` (marquee pauses, pulses stop).
- Banned here as everywhere: side-stripe borders, gradient text, glassmorphism, identical icon-card grids, repeated uppercase kickers on every section, em dashes in copy.
- Charts/sparklines: bull/bear for signed data, royal for neutral.
