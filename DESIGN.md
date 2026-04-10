# Design Brief — Yusuf Power

## Direction

Nigerian Premium Fintech — modern, trustworthy electricity vending platform rooted in local identity. Clean white surfaces with authentic Nigerian green signaling energy, prosperity, and national confidence.

## Tone

Direct, confident fintech clarity. Nigerian green conveys trust and energy; white ensures minimal distraction. Professional without bureaucratic coldness; warmth through success accents.

## Differentiation

20-digit vending token as hero moment — monospace typography in centered card with subtle background. Copy-to-clipboard + WhatsApp sharing transforms transaction confirmation into delight.

## Color Palette

| Token      | OKLCH          | Role                                           |
| ---------- | -------------- | ---------------------------------------------- |
| background | 0.99 0.002 0   | Pure white base — clarity, minimal distraction |
| foreground | 0.18 0.01 210  | Dark charcoal — high contrast text             |
| card       | 1.0 0 0        | Pure white surfaces for content cards          |
| primary    | 0.48 0.12 170  | Nigerian green — energy, trust, prosperity    |
| accent     | 0.68 0.18 55   | Warm gold — success states, highlights         |
| destructive| 0.55 0.22 25   | Soft red — errors, cancellations               |
| muted      | 0.94 0.008 0   | Subtle grey — disabled states, alt sections    |
| border     | 0.92 0.005 0   | Light grey — form inputs, separators           |

## Typography

- Display: General Sans — geometric, modern tech for headers, meters, CTAs
- Body: DM Sans — clean legibility for forms, transaction details, body copy
- Mono: Geist Mono — vending token display, transaction codes

## Elevation & Depth

Minimal shadows: `shadow-sm` for inputs/popovers, `shadow-md` for card lift on hover, `shadow-lg` for modals. Flat buttons (no shadow) for modern fintech directness.

## Structural Zones

| Zone     | Background   | Border   | Notes                                        |
| -------- | ------------ | -------- | -------------------------------------------- |
| Header   | bg-primary   | —        | Yusuf Power logo, green bar, white text      |
| Content  | bg-background| —        | Spacious single-column mobile, 375–430px max |
| Sections | bg-card      | border-b | Meter input, amount, confirmation as cards   |
| Token    | bg-muted/30  | border   | Hero moment — centered monospace token       |
| Footer   | bg-muted/30  | border-t | Links, copyright, minimal spacing            |

## Spacing & Rhythm

Sections: 24px (md) vertical gap; card padding: 20px; form fields: 12px; inputs/labels: 8px. Dense rhythm for mobile viewport (375–430px) while maintaining breathing room.

## Component Patterns

- Buttons: Primary (bg-primary, 4px radius) for meter validation, payment; Secondary (bg-secondary) for cancel; Accent (bg-accent, 4px) for success confirmation
- Cards: 8px border-radius, bg-card with 1px border-border
- Badges: 6px radius, semantic colors (success=primary, error=destructive, info=muted)
- Forms: Inputs 8px radius, light border-input, foreground-muted labels
- Token Display: Monospace 20-digit token, bg-muted/30, 8px radius, copy + share buttons

## Motion

- Entrance: Fade-up over 0.4s for sections
- Success: Scale pulse 0.92→1.0 on token display over 0.5s cubic-bezier
- Hover: Buttons darken 0.05 L shift, 0.25s smooth transition
- Sheet: Slide-down for modals, payment confirmation

## Constraints

- Max 3 colors active at once (primary green, accent gold, destructive red)
- All backgrounds OKLCH tokens; no raw hex
- Mobile-first responsive 375–430px primary viewport
- No decorative gradients; animations enhance clarity only
- Dark mode uses adjusted L/C with same hue coherence

## Signature Detail

Vending token displayed large in monospace font, isolated in subtle card background with prominent copy + WhatsApp share buttons — the reward moment that builds trust and enables instant sharing.

