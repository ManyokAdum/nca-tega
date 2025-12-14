## Branding System

- Primary: `#171042` (deep indigo, default brand tone).
- Secondary: `#00b2ec` (aqua accent).
- Feminine micro-accent: soft pink scale (`brand.feminine`, default at 400) used sparingly for micro-interactions and callouts.

### Tokens (source of truth)
- CSS variables: `src/styles/branding.css` (`--brand-primary-50..900`, `--brand-secondary-50..900`, `--brand-feminine-100..700`, surfaces, gradients, shadows).
- Tailwind aliases: `tailwind.config.ts` mirrors every token (`brand.primary.50`, `primary.50`, etc.) so utilities map 1:1.
- Figma export: `design/figma-tokens.json` (matches the CSS values; import with the Figma Tokens plugin).
- Storybook theme + globals: `.storybook/theme.ts` + `src/index.css` use the same vars; `Branding/Showcase` story demonstrates correct usage.

### Palette (tokens + hex)
**Primary (`brand.primary`)**
| Token | Hex | HSL |
| --- | --- | --- |
| 50 | #F5F4FB | hsl(248 44% 97%) |
| 100 | #EBE9F6 | hsl(248 44% 94%) |
| 200 | #D7D3EE | hsl(248 44% 88%) |
| 300 | #ADA6DE | hsl(248 46% 76%) |
| 400 | #796CD0 | hsl(248 52% 62%) |
| 500 | #4733CC | hsl(248 60% 50%) |
| 600 | #35259D | hsl(248 62% 38%) |
| 700 | #261A74 | hsl(248 63% 28%) |
| 800 | #171042 | hsl(248 61% 16%) |
| 900 | #100B32 | hsl(248 63% 12%) |

**Secondary / Accent (`brand.secondary` / `accent`)**
| Token | Hex | HSL |
| --- | --- | --- |
| 50 | #F0FCFF | hsl(193 100% 97%) |
| 100 | #D7F6FE | hsl(193 96% 92%) |
| 200 | #AFECFD | hsl(193 95% 84%) |
| 300 | #74DEFB | hsl(193 95% 72%) |
| 400 | #41D3FB | hsl(193 96% 62%) |
| 500 | #0ACAFF | hsl(193 100% 52%) |
| 600 | #00B8EB | hsl(193 100% 46%) |
| 700 | #0496BE | hsl(193 96% 38%) |
| 800 | #087491 | hsl(193 90% 30%) |
| 900 | #075469 | hsl(193 88% 22%) |

**Feminine micro-accent (`brand.feminine`)**
| Token | Hex | HSL |
| --- | --- | --- |
| 100 | #FCEDF5 | hsl(330 72% 96%) |
| 200 | #F9DCEB | hsl(330 70% 92%) |
| 300 | #F4C3DB | hsl(330 68% 86%) |
| 400 | #EDABCC | hsl(330 64% 80%) |
| 500 | #E28DB8 | hsl(330 60% 72%) |
| 600 | #D770A3 | hsl(330 56% 64%) |
| 700 | #C74D8A | hsl(330 52% 54%) |

### When to use
- Primary (nav/footer/brand surfaces, headers, primary CTAs): use `bg-brand-primary-700..900` for strong actions; `50–200` for soft fills; gradients via `bg-gradient-hero`.
- Secondary / accent (CTAs, links, highlights, chips): use `brand-secondary-400..700` for actions, `50–200` for subtle backgrounds; gradients via `bg-gradient-secondary`.
- Feminine accent: decorative micro-interactions only (badges, pills, focus glints) with `brand-feminine-300/400`; avoid large surfaces.

### Accessibility (quick pairings, AA-focused)
| Surface | Recommended text | Notes |
| --- | --- | --- |
| brand-primary-400..900 | text-primary-foreground | AA for body on 500+; use for CTAs. |
| brand-primary-50..200 | text-brand-primary-800 | Use for light indigo washes. |
| brand-secondary-400..900 | text-secondary-foreground | AA for body on 500+; CTA + links. |
| brand-secondary-50..200 | text-brand-primary-800 | Soft accent backgrounds. |
| brand-feminine-300..600 | text-brand-feminine-foreground | Micro accents only. |
| background/card | text-foreground | Muted copy → text-muted-foreground. |
| Focus states | ring-ring or .focus-outline | Maintain 2px outline. |

### Examples & FAQs
- Need a new color? Add it only in `src/styles/branding.css`, mirror it in `tailwind.config.ts`, update `design/figma-tokens.json`, and document it here. Raw hex in components is blocked by lint/CI.
- CTAs: `bg-primary` / `bg-brand-primary-800` + `text-primary-foreground`; secondary CTAs use `bg-secondary` (`brand-secondary-600`).
- Links: `text-brand-secondary-600` with hover to `brand-secondary-500`.
- Gradients: `bg-gradient-hero` (primary → secondary), `bg-gradient-secondary` for banners, `bg-gradient-feminine` for tiny callouts.

### Enforcement
- Stylelint plugin `nyan/no-raw-colors` blocks hex anywhere except `src/styles/branding.css`.
- Regex gates: `scripts/check-hex.js` + `scripts/check-branding.sh` fail on raw hex outside the token file.
- Pre-commit: `.husky/pre-commit` runs `npm run lint:branding` (stylelint + hex scans).
- CI: `.github/workflows/branding.yml` runs the same guard on push/PR.

### Visual rules (sleek, modern, soft)
- Corners: 8px default (cards), 12px large panels (`rounded-lg/xl`).
- Shadows: elevated surfaces `0 6px 18px rgba(23,16,66,0.08)` → use `shadow-card` / `shadow-elevated`.
- Buttons: subtle gradient `linear-gradient(180deg, var(--brand-primary-600), var(--brand-primary-700))` with 1px border `var(--border)`.
- Spacing: 4px base grid; scales: 4, 8, 16, 24, 32, 48.
- Typography: sans-serif (`Plus Jakarta Sans`), comfortable leading (1.4 body).

### Figma tokens
- Import `design/figma-tokens.json` via Figma Tokens plugin → Import as JSON → map to global tokens.
- Create Color Styles named exactly: `brand/primary/50..900`, `brand/secondary/50..900`, `accent/50..900`, `brand/feminine/100..700`.
- Token mapping: `brand.primary.800` → `--brand-primary-800` → `bg-brand-primary-800`.

### Storybook quickstart
- `npm run storybook` → open `Branding/Showcase` to see tokenized buttons, links, headers, cards, gradients, and text pairings.
- Docs theme is bound to CSS vars; changing `branding.css` updates Storybook automatically.
