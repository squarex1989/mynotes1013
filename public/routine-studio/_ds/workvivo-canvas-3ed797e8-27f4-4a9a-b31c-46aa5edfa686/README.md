# Workvivo Design System

A high-fidelity design reference for **Workvivo by Zoom** — the employee experience platform now part of the Zoom family. This system covers the **Web** product (Inter, 1440 layouts, side-nav + content area) and the **Mobile** product (SF Pro, iOS-first, bottom-nav + feed-style screens), plus the multi-tenant theming layer that lets each customer instance (Nike, Walmart, Virgin, CVS, Zoom, Ryanair, McDonald's, Memorial Health, Ralph Lauren, Woodies…) rebrand the primary colour while keeping component shapes identical.

## What is Workvivo?

Workvivo is an **internal communications / employee experience platform** — think company intranet meets social feed meets newsletter meets event hub, branded for each customer. Employees use it for activity feeds, shoutouts and kudos, news, podcasts, video, surveys, events, spaces (groups), org charts, and AI-powered "For You" content. Workvivo was acquired by Zoom in 2023; the design system retains the "Workvivo Canvas" name internally and adds a Zoom-blue accent in the lockup ("workvivo · by zoom").

The product is **white-label**: the same component library renders in dozens of customer brands. The design system's primary colour, navbar colour, and (sometimes) secondary colour are all swapped per tenant via CSS `[data-mode]`. The default mode is `workvivo` — a deep purple `#6103ED`.

## Sources used to build this system

| Source | Notes |
|---|---|
| `_fig/WV-Zoom-DS-Foundations/` | Figma file: colours, spacing, shadows, icons (~250 icons), logos, illustrations, avatars |
| `_fig/WV-Zoom-DS-Components/` | Figma file: ~500 components — buttons, badges, banners, nav, modals, tables, tabs, form inputs, etc. Includes 105k-node design canvas across 35+ pages |
| `_fig/.../tokens.css` | Extracted variable system — 11 customer themes + dark mode + semantic roles |

> **No codebase was attached.** All component recreations in `ui_kits/` are reverse-engineered from the extracted Figma component JSX (which preserves styles + structure but stubs icons/external instances). If you have the Workvivo monorepo, attach it and we can rebuild the UI kits at higher fidelity.

---

## Index — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← skill manifest (works with Agent Skills + Claude Code)
colors_and_type.css        ← all design tokens (colors, type, spacing, radii, shadows)

assets/                    ← logos, icons (Lucide CDN substitution), illustrations
  workvivo-logo-mark.svg
  workvivo-logo-mark-purple.svg
  workvivo-wordmark.svg
  illustration-*.svg       ← brand illustrations (placeholder + curated)

preview/                   ← Design-System tab cards
  type-*.html              ← typography specimens
  color-*.html             ← colour palettes & semantic mapping
  spacing-*.html           ← spacing/radius/shadow tokens
  component-*.html         ← buttons, badges, inputs, etc.
  brand-*.html             ← logo, theming demo

ui_kits/
  web/                     ← desktop product — 1440px-wide screens
    README.md
    index.html             ← clickable prototype: home feed → space → post
    components.jsx         ← shared building blocks (Button, Badge, Card, Avatar…)
    nav.jsx                ← TopNav + SideNav
    feed.jsx               ← Feed item, composer, reactions
    widgets.jsx            ← Birthdays, events, kudos widgets

  mobile/                  ← iOS product — 390×844 screens
    README.md
    index.html             ← clickable prototype: tab bar → feed → post detail
    components.jsx         ← mobile building blocks
    screens.jsx            ← Home, Activity, Spaces, Chat, Profile

_fig/                      ← original Figma extraction (do not edit)
```

---

## CONTENT FUNDAMENTALS

How Workvivo writes copy.

### Voice & tone
- **Warm, human, employee-first.** Workvivo is built around the idea that internal comms should feel like a social platform, not a memo. Copy is conversational, never corporate.
- **Second person ("you", "your")** for the reader. Talk *to* the employee, not about them. Example button labels: *"Share with your team"*, *"See what's new"*.
- **Plain, short sentences.** Verb-first where possible. Avoid jargon. "Post an update" beats "Publish a communication".
- **Optimistic, low-friction.** Empty states encourage rather than scold: *"Nothing here yet — be the first to share something."* Errors are gentle: *"We couldn't send that. Mind trying again?"*

### Casing & grammar
- **Sentence case everywhere** for UI labels, buttons, menus, page titles. Not Title Case. ("Manage notifications" — not "Manage Notifications".)
- Headings can use **Title Case** sparingly for marketing-style heroes (e.g. customer summit decks), but the product proper is sentence case.
- Use the **Oxford comma** for clarity in lists.
- Date format: long ("23 May 2026") in feeds, short ("23 May") in cards/widgets. Avoid US-only formats (m/d/y) — Workvivo is global.

### Specific patterns
- "Spaces" = groups/communities. "Posts" = feed entries. "Shoutouts" / "Kudos" = peer recognition. "Activity feed" = the home stream.
- Notifications use natural-language phrasing: *"Aoife liked your post"*, not *"Post.like.success"*.
- AI features are introduced gently with the **"AI sparkle" icon** (a small sparkle) — never the word "ChatGPT", "GPT", or "LLM". Workvivo's AI features are called **"AI Assistant"** or labelled by their action ("Summarise", "Translate", "Suggest").
- Avoid emoji in *system* copy (button labels, errors, empty states). Emoji is **encouraged in user-generated content** — feeds, shoutouts, kudos messages. The platform itself stays restrained.

### Examples (from the design system)
- Page title: *"Activity feed"* — never *"News Feed"* or *"Home Stream"*.
- Empty state: *"You're all caught up. ✨"* (sparkle is acceptable on positive empty states only)
- CTA: *"Share an update"* (composer), *"Send kudos"*, *"Recognise a colleague"*.
- Error toast: *"Something went wrong. We've logged it — please try again."*
- Confirm dialog: *"Delete this post? Your team won't see it any more."*

---

## VISUAL FOUNDATIONS

How the brand looks and behaves. *Answer-all-the-questions edition.*

### Colour
- **Default Workvivo brand = deep purple** (`#6103ED`, primary-500). Reads as confident, modern, social — distinct from enterprise-blue competitors.
- **Navbar is a different colour from primary** — a dark indigo `#21054A` (navbar-500). This is intentional: nav chrome is dark and grounded; primary is reserved for action and accent.
- **Customer modes override primary + navbar.** Every customer instance gets a 50→900 ramp generated from their brand colour. The component library never hardcodes hex; everything routes through `var(--wv-primary-…)`.
- **Greys are Tailwind's** (`#F3F4F6` through `#111827`). Reuse them; don't invent a new neutral.
- **Badges have a fixed 9-colour set** (blue, emerald, indigo, green, yellow, orange, red, pink, customer-purple) — used for content type pills, status tags, and category chips. Always 50-tint background + 700/800 foreground.
- **Imagery is warm and human.** Customer instances pull in their own brand photography — no stock illustrations of robots or generic gradient blobs. Photo treatments are clean, not grainy. Brand illustrations (the `Illustrations.jsx` set) are flat, slightly geometric, single-accent-colour line drawings.

### Type
- **Web = Inter.** 14/16/18 body, 20/24/30/36 headings, 48+ for hero/marketing. Sentence case, `letter-spacing: -0.02em` on h1/h2.
- **Mobile = SF Pro.** Native iOS metrics. Status bar always 14px bold.
- **No serifs in product.** Marketing decks may pair Inter with a single accent display weight; no Fraunces, no Playfair.
- **Code/mono not used in user-facing surfaces** — only in admin/dev contexts.

### Spacing
- **4-px grid.** Every spacing token is a multiple of 4 (with `2px` and `6px` as fine-grain exceptions for tight pill/badge interiors).
- Cards have **16-px internal padding**, **24-px between cards** on wide screens.
- Page gutters: 24px on mobile, 32-40px on web.

### Corners & shape
- **Buttons are pill-shaped** (`border-radius: 24px` / `--radius-3xl`). This is signature Workvivo — the rounded button is everywhere.
- **Cards** use `--radius-xl` (12px) — softer than typical SaaS (8px) but not as round as buttons.
- **Mobile header has a `30px` top-corner radius** on the gradient nav (`borderRadius: "30px 30px 0px 0px"`) — a unique brand cue.
- **Avatars are circular.** Always. No squircles.
- **Modals**: `--radius-xl` (12px), centred, with a 50% black scrim.

### Shadows
- **Subtle, single-layer.** `0 1px 2px rgba(0,0,0,0.05)` on buttons + secondary buttons. `0 4px 6px -1px / 0 2px 4px -2px` on dropdowns. Modal shadow is heavier.
- **No coloured glow shadows.** No big neon drop-shadows. No long, dark dramatic shadows. The system is restrained.
- **Insets used sparingly** for pressed-state on toggles.

### Backgrounds
- **Page background = light grey** (`--wv-grey-100`, `#F3F4F6`) on web, with cards floating on top in white.
- **Mobile page background = off-white** (`#F7F7F7`).
- **Navbar background = solid dark indigo** (`--wv-navbar-500`). No transparency on desktop top-nav; mobile bottom-nav uses `rgba(247,247,247,0.75)` with backdrop-blur.
- **Hero banners on home use a gradient** of primary-400 → primary-600 at 85% opacity, with imagery underneath. Otherwise gradients are **avoided** — flat fills dominate.
- **No repeating patterns or textures** in product UI. Illustration-only.

### Borders
- **`1px` solid greys** for inputs/cards (`--wv-grey-200` light, `--wv-grey-300` default).
- **Focus state**: `1px solid var(--wv-primary-500)`. No external outline ring — the border itself changes colour and a `box-shadow: 0 0 0 3px primary-100` ring is added on form inputs.
- **Dividers** are `1px solid --wv-grey-200`, with `24px` vertical padding around them.

### Animation
- **Quiet by default.** Buttons fade ~150ms ease-out on hover (`transition: background-color 150ms ease`). No bounces, no spring physics in chrome.
- **Page transitions = none** on desktop. Mobile uses iOS native push transitions.
- **Modals fade + scale-up** (`opacity 0 → 1, scale 0.96 → 1` over ~180ms).
- **Toasts slide in from bottom-right** (web) / top (mobile), `200ms ease-out`, auto-dismiss at 4s.
- **Loading**: a custom dot-pulse and circle-spinner (`DotPulse.jsx`, `CircleSpinner.jsx`).

### Interaction states
- **Hover**: primary buttons darken to primary-700 (`#3B028F`). Secondary buttons get a `#F9FAFB` fill. Tertiary buttons just darken text.
- **Pressed**: same colour, no scale transform on web. On mobile, a subtle `scale(0.97)` is acceptable on cards.
- **Disabled**: primary buttons drop to primary-200 (`#C09BF8`) with white text. Secondary buttons get a `#F9FAFB` fill + `#F3F4F6` border + grey text.
- **Focus visible**: 1-px ring matching `--border-focus`; 3-px outer ring on form inputs.

### Transparency & blur
- **Used sparingly.** Mobile bottom-nav: `rgba(247,247,247,0.75)` + `backdrop-blur(20px)`. Mobile side-drawer: `rgba(243,244,246,0.85)` + blur. Header navbar gradient: `0.85` opacity layered over imagery.
- **No glassmorphism in product chrome on desktop.** Cards are solid white.

### Iconography summary (see `assets/ICONOGRAPHY.md` below for the full doc)
- ~250 custom icons in the Figma library, in matched **Outline** and **Solid** sets, 24×24 frame.
- Stroke style: ~1.5–1.7px, rounded ends, geometric.
- **Substituted with Lucide React from CDN** in the UI kits because the Figma extraction drops the SVG paths — see ICONOGRAPHY notes below.

### Layout rules
- **Web product = 1440px design width** with a fixed left side-nav (collapsed 56px / expanded 240px) and a top-nav 56-px tall.
- Content area max-width ~1184px, centred, with **3-column widget layout** on home (`main feed 720px + right rail 320px + gutter`).
- **Mobile product = 390×844** (iPhone 14/15 Pro). Bottom tab bar 83px (49 + 34 home indicator). Top nav has the signature 30-px rounded gradient header.

### Customer-specific quirks
- The Workvivo "by Zoom" lockup pairs the navy Workvivo mark with a small "**by zoom**" in Zoom-blue (`#0B5CFF`).
- Memorial Health and Aramco use **dark slate navbars**; Virgin uses red; Walmart uses Walmart blue. Each tenant's primary/navbar are independent.

---

## Iconography (short version — full in `assets/ICONOGRAPHY.md`)

- **Custom icon set** in the Figma file (250+ icons across Outline / Solid / Mobile). Stroke-based, 24×24 frame, ~1.6px stroke, rounded line-caps.
- **In code, the UI kits substitute Lucide (CDN: `https://unpkg.com/lucide@latest`)** because the extraction process produced abstract `<div>`-based representations rather than usable SVG paths. Lucide's geometric outline style matches Workvivo's icons closely; flag the substitution to engineering before shipping.
- **Emoji**: never used in system UI. **Encouraged** in user-generated content (posts, shoutouts, comments) where it adds personality.
- **AI features**: marked with a small **sparkle** icon — Workvivo's `AISparklesSolidIcon` / `AIIcon`. Lucide equivalent: `sparkles`.
- **Brand mark**: 3 slanted white strokes on a dark navy rounded square — represents three people side-by-side ("we work, vivo"). See `assets/workvivo-logo-mark.svg`.

---

## Customer-summit "Workvivo Canvas"

The Figma file's full name is "Workvivo Canvas" — this is the internal name for the v2/redesigned design system, used at the Customer Summit 25. Look in the tokens for `[data-mode="customer-summit-25"]` — it adds a brighter accent purple (`#8F45FF`) on top of the standard system. Treat this as a "special event" overlay, not the canonical brand.

---

## Tweaks & extensions

When designing for a specific customer, set `data-mode="<customer>"` on the root element to swap the primary palette. Supported modes (see `colors_and_type.css`): `workvivo` (default), `zoom`, `nike`, `walmart`, `virgin`, `cvs`, `mcdonalds`, `ryanair`. Add more by extending the `:root[data-mode="x"]` blocks.

---

## Workvivo AI

The AI guidelines (May 2026) govern every AI surface in the product.

### Naming
- **Always call it "Workvivo AI"** — never "AI Companion", never bare "AI".
- **Never use the word "thinking"** for the loading/processing state. Use **"Generating…"** or **"Analysing…"** instead.

### Which icon, when
- **Solid purple sparkle** (`ai-sparkles` / `sparkles-solid`, colour `--wvai-purple`) — use when the AI affordance is **inline or embedded inside a component within a feature**: Pages, Journeys, Chat composer, etc.
- **White sparkle on the gradient-circle outline** — use on **larger summary pieces**: Seer summary, "Catch me up", and similar standalone AI blocks. The ring uses `--wvai-gradient` (`#8B5CF6 → #6103ED → #C026D3`).

### Gradient backgrounds (the "north star" — chat)
- When the user **first triggers** the inline WVAI icon, the opening window has a **solid white background**.
- Once they're **interacting** — i.e. waiting on a response, and the response itself — the background becomes the **WVAI gradient** (`--wvai-gradient`). Chat is the reference implementation of this pattern.

### Tokens (`colors_and_type.css`)
- `--wvai-gradient` — the full purple→magenta gradient (ring, response background)
- `--wvai-gradient-soft` — tints for subtle AI surfaces
- `--wvai-purple` — solid inline icon colour
- `--wvai-ring-from / -via / -to` — gradient stops for building rings

See the **AI** group in the Design System tab for the icon-usage card, gradient-background states, and Workvivo AI components.

## ⚠️ Known caveats & substitutions

1. **Logos are reconstructed**, not extracted from Figma. The "iw" mark on navy rounded-square is drawn fresh from visual reference. **Please drop in the real Workvivo SVG logo when you have it** — overwrite `assets/workvivo-logo-mark.svg`.
2. **Icons are Lucide CDN substitutes** for the custom Workvivo icon set. Engineering should swap to the real Workvivo icon library before shipping.
3. **SF Pro fallback**: Apple licenses SF Pro for Apple platforms only. The UI kits use `local("SF Pro Text"), local("SF Pro Display")` and fall back to system-ui on non-Apple OS. If a Windows/Linux preview matters, swap to Inter mobile-wide. **Inter is now wired locally** via variable-font files in `fonts/`.
4. **No codebase**: components in `ui_kits/` are cosmetic recreations. Real interactivity, accessibility primitives, and edge-case states are not modelled.
5. **Illustrations**: the Figma `Illustrations` page exists but its individual artworks weren't extracted as SVG — only as component shells. The system uses placeholder illustration boxes; replace with real PNGs/SVGs when available.
