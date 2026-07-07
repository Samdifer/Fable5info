# fable5.info — Design Spec

**Date:** 2026-07-07 · **Status:** Approved by Sam

## Purpose

Public website version of the Fable5Countdown macOS sticky-note app. Counts down to the
moment Claude Fable 5 stops being included in paid Claude subscription plans, shows the
exact cutoff in the visitor's local timezone, and explains what's happening with sources.
Hosted on Vercel at fable5.info (GitHub: Samdifer/Fable5info).

## The deadline (single source of truth)

Anthropic extended the cutoff from July 7 to **July 12, 2026** (reported by The New Stack,
Jul 7 2026). No official cutoff *hour* is published. Per Sam's decision the site anchors to:

- **July 12, 2026 11:59:59 PM Pacific Time (America/Los_Angeles, PDT)** — San Francisco,
  Anthropic's home timezone (amended by Sam on 2026-07-07; originally Mountain Time)
- Canonical constant: `DEADLINE = new Date('2026-07-13T06:59:59Z')`

All countdown and timezone-calculator output derives from this one UTC instant. The hero
also shows total hours remaining ("= 131.4 hours left to use it"), added in the same
amendment.

## Stack

- Vite + React 18 + TypeScript (SPA, no server)
- Plain CSS with custom properties for theming; no UI libraries
- Vitest for unit tests of time math
- Deployed on Vercel (auto-detected Vite build), domain fable5.info via Vercel DNS

Rationale: static single-page site; Next.js SSR would invite hydration mismatches for
client-time-dependent rendering and adds no value here.

## Visual design

Claude Code aesthetic ported from the Swift app:

| Token | Dark (default) | Light |
|---|---|---|
| bg | #262523 | #FAF9F5 |
| fg | #FAF9F5 | #3D3D3A |
| dim | #A39D96 | #7A7771 |
| accent | #D97757 | #D97757 |
| border | rgba(255,255,255,.14) | rgba(0,0,0,.18) |

Monospace type throughout. Theme toggle (◐) persisted to `localStorage`, dark by default.

## Components

- **App** — theme state, layout, footer.
- **Countdown** — ticks every 1s; renders `Xd HH:MM:SS`; clamps at zero. Expired state:
  countdown shows `0d 00:00:00` in accent color, subtitle flips to "Fable 5 has left your
  Claude plan", quote locks to the expired quote.
- **QuoteRotator** — the 16 demotivational quotes from the Swift app, rotating every 10s
  with a fade transition. Shows only the expired quote after the deadline.
- **TimezoneCalculator** — auto-detects visitor zone via
  `Intl.DateTimeFormat().resolvedOptions().timeZone`; renders the deadline formatted in
  that zone ("For you, Fable 5 stops being included at Sunday, July 12 at 10:59 PM PDT").
  A `<select>` populated from `Intl.supportedValuesOf('timeZone')` lets the visitor check
  any zone; falls back to a curated ~25-zone list when unsupported. Formatting via
  `Intl.DateTimeFormat` with `timeZone` + `timeZoneName: 'short'` — no tz database shipped.
- **InfoSection** — 3–4 sentence explainer (extended from Jul 7 → Jul 12; included up to
  50% of weekly usage limits; then usage credits at $10/$50 per M input/output tokens)
  with linked sources: Anthropic "Redeploying Fable 5" post, The New Stack extension
  article, Anthropic support article on usage credits.

## Testing

Vitest unit tests for pure time math: remaining-time breakdown (days/h/m/s), zero clamp,
and deadline formatting in a few fixed zones (America/Denver, UTC, Asia/Tokyo).

## Deployment pipeline

local repo → push to https://github.com/Samdifer/Fable5info.git (main) → Vercel project →
add fable5.info → Sam points Squarespace nameservers at Vercel (ns1/ns2.vercel-dns.com).
