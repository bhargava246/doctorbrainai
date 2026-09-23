# ESIC Health Bridge — Complete Build Specification

Status: describes the site **as currently implemented** (supersedes the original pre-redesign brief). Written so the entire site — markup, styling, copy, and behavior — can be rebuilt from this document alone, without access to the live repo.

Stack constraint (non-negotiable, carried through the whole rebuild): **vanilla HTML/CSS/JS, zero runtime dependencies.** No framework, no CSS/JS library, no build step required to run it — `index.html` + `css/styles.css` + `js/script.js`, opened directly or served statically. The only external resource is a Google Fonts stylesheet link.

---

## 1. Product context (why it's built this way)

**What it is:** ESIC Health Bridge is a B2B2C healthcare-navigation layer on top of India's ESIC (Employees' State Insurance Corporation) scheme — a government health-insurance system for ~180M+ Indian employees earning below a wage threshold. The product does not replace ESIC; it's a guidance/translation layer: facility finder, department guidance, eligibility/scheme explainers, appointment assistance, and an AI assistant. Sold to **employers** (B2B SaaS), used by their **employees** (B2C, often factory/warehouse workers, lower digital literacy, regional-language-first, budget Android phones, unreliable 3G).

**Two audiences, one brand:** the current build is the **marketing/lead-gen site** (this document's scope) targeting HR/CHRO buyers and investors. It also visually demonstrates (via mockups, not a real app) what the employee-facing product would feel like. An actual employee-facing PWA and an HR admin console are **not built** — see §11 Out of scope.

**Positioning:** competing insurtech (Plum, Loop Health, Pazcare, Nova Benefits) skews urban/white-collar/English-first. This product explicitly serves the ESIC-eligible blue-collar segment they ignore — see the Positioning section copy in §5.4. Tone: trustworthy but not clinical, plain language, must never visually imply official ESIC affiliation (legal disclaimer is a designed, visible element, not footer fine print).

**Operating company / contact:**
- Product/brand name shown on the site: **ESIC Health Bridge**
- Operating company: **DoctorBrainAI.com** ("AI Powered Bridge Between ESIC Hospital, Doctors & Employers")
- Contact email: `chetan@doctorbrainai.com`
- Phone: `+91 81122 31341`
- Location: Jaipur, Rajasthan, India
- Footer copyright line: `© 2024 ESIC Health Bridge. All rights reserved. A DoctorBrainAI.com company, Jaipur, Rajasthan, India.`

---

## 2. File structure

```
esic-health-bridge/
├── index.html          # entire page — single document, no routing
├── css/
│   └── styles.css      # all styling, all breakpoints, all animations
├── js/
│   └── script.js       # all interactivity — no modules, plain script tag
├── README.md
└── (deployment configs: netlify.toml, Dockerfile, nginx.conf, etc. — not design-relevant)
```

`index.html` loads Google Fonts via `<link>`, then `css/styles.css`, and `js/script.js` at the end of `<body>`. No bundler, no `<script type="module">`, no package installs required to run — open the file or `python -m http.server`.

---

## 3. Design tokens

All colors are CSS custom properties on `:root`, overridden inside `@media (prefers-color-scheme: dark)`. **Brand direction: navy + teal**, sourced from the operating company's real visiting card (deep navy panels, bright teal accent, no orange/generic-SaaS palette). Dark mode is not a generic near-black inversion — it deliberately leans into the brand's own deep-navy surface (matching the card's back panel), so dark mode reads as the "native" brand theme.

### 3.1 Color tokens — light mode (`:root` default)

| Token | Value | Usage |
|---|---|---|
| `--white` | `#FFFFFF` | page/card background |
| `--bg-subtle` | `#F5F9FA` | alternating section background, muted card fills |
| `--text-primary` | `#0B1B2B` | headings, body text |
| `--text-secondary` | `#4C5D6B` | subtext, captions, labels |
| `--blue-primary` | `#0E3D68` | **primary interactive color** — buttons, nav, links, focus rings, logo |
| `--blue-primary-hover` | `#0A2E4F` | primary button hover |
| `--blue-light` | `#E6F4F3` | large background washes (hero visual, employee visual, phone-mock screens) — note: this is a pale **teal-tinted** mint, not literally pale blue |
| `--orange-accent` | `#14B8A6` | **bright teal accent** — button/badge/chip *fills* only (needs `--on-accent` text on top, see below) |
| `--teal-text` | `#0E7A6D` | deeper teal for **text/border** use on light backgrounds (the bright accent fails contrast as text — see §3.3) |
| `--green-success` | `#1E8E5A` | large icon glyphs only (≥18px bold; small text uses `--success-text`) |
| `--green-success-light` | `#E7F5EE` | success/trust icon badge backgrounds |
| `--success-text` | `#146B45` | small success text/badges (pp-badge, entitlement checklist) |
| `--border-light` | `#E1E8EC` | all hairline borders/dividers |
| `--on-accent` | `#07332E` *(fixed, both themes)* | text/icons sitting on the teal accent fill |
| `--on-dark` | `#FFFFFF` *(fixed, both themes)* | text on the three permanently-dark brand panels (CTA section, positioning section, footer) |
| `--on-dark-secondary` | `rgba(255,255,255,0.72)` *(fixed, both themes)* | secondary text on those same dark panels |

### 3.2 Color tokens — dark mode override

```css
@media (prefers-color-scheme: dark) {
  :root {
    --white: #0F2C4E;
    --bg-subtle: #081B33;
    --text-primary: #F2F6F8;
    --text-secondary: #9FB2C2;
    --blue-primary: #3DDCC9;       /* primary flips to a bright teal-cyan, not a lighter navy */
    --blue-primary-hover: #5EE6D5;
    --blue-light: #123B52;
    --green-success: #34C77E;
    --green-success-light: #123726;
    --success-text: #55E0A0;
    --teal-text: #14B8A6;          /* = the fixed accent value; already passes contrast on dark navy */
    --border-light: #24405C;
    /* --orange-accent, --on-accent, --on-dark, --on-dark-secondary: NOT overridden —
       they're intentionally fixed across both themes. */
  }
}
```

`--white` and `--bg-subtle` become two navy tones (not near-black) — every card/surface in dark mode is a navy panel. `--blue-primary` becomes a bright teal-cyan rather than a lighter blue, because in dark mode the surfaces are already dark/navy and need a genuinely light, high-contrast color to read as "primary."

### 3.3 A contrast rule that matters — don't violate it when extending this

The bright accent (`--orange-accent`, `#14B8A6`) measures only **2.49:1** as text/border color against white — it **fails WCAG AA** (needs 4.5:1 for text, 3:1 for large text/UI boundaries). It only works as a **fill** with `--on-accent` (dark ink, `#07332E`) as the text color on top of it. For any new element that wants "teal as text or a border," use `--teal-text` (`#0E7A6D` light / `#14B8A6` dark), not `--orange-accent` directly. This was a real bug caught and fixed during development — don't reintroduce it.

**Brand-color balance rule:** navy (`--blue-primary`/`-hover`/`-light`) and teal (`--orange-accent`/`--teal-text`/`--on-accent`) should stay roughly balanced in usage count across the stylesheet (~1:1, not one dominating) — this was deliberately rebalanced from an initial ~5:1 navy-heavy pass, using dianapps.com's ~1:1 blue/orange split as the reference point. **Navy stays reserved for primary interactive affordances only** (buttons, nav links, focus rings, form focus) so "navy = click here" remains a consistent, learnable signal; **teal carries decorative/informational elements** (section eyebrows, the six-step journey module, stat numbers, service-card numbers, language chip, feature-check icons).

### 3.4 Typography

```css
--font-display: 'Plus Jakarta Sans', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, sans-serif;
```

Google Fonts import (in `<head>`):
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap">
```

`Noto Sans Devanagari` is included as a fallback even though current copy is English-only — it's there so future Hindi/regional-language content doesn't silently fall back to a mismatched system font. Display font = headings/numbers/labels (Plus Jakarta Sans, weight 700-800 mostly). Body font = paragraphs/UI text (Inter, 400-600).

Scale in use: H1 `56px`/800 (desktop) → `36px` (mobile ≤768px, `46px` at ≤1024px tablet tier); H2 `42px`/800 → `28px` mobile / `34px` tablet; body `14-18px`; eyebrow labels `12px`/700/uppercase/`0.5px` letter-spacing.

### 3.5 Spacing scale

```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 40px;
--spacing-xl: 64px;
--spacing-2xl: 120px;
```
Used for all padding/gap/margin — no hardcoded spacing values outside this scale except a few 4-12px micro-adjustments inside small mock components (product-preview, phone-frame).

### 3.6 Border radius / shadow conventions
- Cards/panels: `8-12px` radius. Pills/chips/badges: `999px` (full pill). Phone-mock frame: `20px`.
- Shadows use the brand navy tinted, not neutral black: e.g. `box-shadow: 0 20px 50px rgba(14, 61, 104, 0.12)` on the hero product-preview card.

---

## 4. Brand mark

Logo is an **inline SVG**, not an image file or icon font — a simple bridge glyph (two pillars + an arch, deliberately not a medical cross or heartbeat-pulse, which every competitor uses):

```html
<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 17 L3 10 Q3 7 6 7 L18 7 Q21 7 21 10 L21 17" />
  <line x1="3" y1="20" x2="3" y2="17"/>
  <line x1="21" y1="20" x2="21" y2="17"/>
  <line x1="7" y1="14" x2="7" y2="17"/>
  <line x1="12" y1="12" x2="12" y2="17"/>
  <line x1="17" y1="14" x2="17" y2="17"/>
</svg>
```
Rendered at 16px inside a 28×28px navy rounded-square badge (`.nav-brand-icon`) in the nav, and at 12px inside a 20×20px badge (`.pp-brand-icon`) inside the hero mockup's mini nav bar. `stroke="currentColor"` so it inherits the badge's text color (`--white`) — same SVG, no separate asset needed anywhere it's reused.

Page `<title>`: `ESIC Health Bridge`. Nav wordmark text: `ESIC Health Bridge`, 18px/700, `--font-display`.

---

## 5. Page structure — full spec, section by section

Single page, `<body>` → skip link → `<nav>` (fixed) → `<main id="main">` containing 10 `<section>` elements in document order → `<footer>` → demo request `<div class="modal">`. `section:nth-child(even)` gets `--bg-subtle` background automatically (alternating rhythm) — this is why section *order* matters for the visual rhythm, not just content flow.

### 5.0 Accessibility scaffold (applies globally)
- `<a class="skip-link" href="#main">Skip to content</a>` — first element in `<body>`, visually hidden until `:focus` (`top: -48px` → `top: var(--spacing-md)`).
- `<main id="main">` wraps all content sections (not nav/footer) so the skip link has a real target.
- All decorative emoji/icons carry `aria-hidden="true"`.
- Demo modal form errors use `aria-live="polite"` regions (`#phoneError`, `#formError`).
- Global `a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid var(--blue-primary); outline-offset: 2px; }` — one consistent focus-ring color sitewide, never varies by theme section.
- All primary tap targets (`.btn`, form inputs) have `min-height: 44px` (iOS HIG minimum).

### 5.1 Navigation (`<nav>`, fixed position, not a `<section>`)

Fixed to viewport top, `backdrop-filter: blur(12px)`, semi-transparent white (light) / navy (dark) background, bottom border, `z-index: 1000`.

Contents, left to right: brand mark + wordmark → (mobile only, right-aligned) hamburger toggle button → nav-links group.

Nav links (anchor to section IDs): `Services` `#services` · `How It Works` `#how-it-works` · `For Employees` `#for-employees` · `Trust` `#trust` · `Partner` `#partner` — followed by a `Request Demo` primary button (`.btn.btn-primary.nav-cta`, opens modal).

**Mobile nav (≤860px breakpoint):** hamburger button (`.nav-toggle`, 3 animated bars → X on open) toggles `.nav-links.open` — becomes a fixed full-width dropdown panel below the nav bar (`top: 72px`), slides/fades in. Closing triggers: click a nav link, click outside, `Escape` key. JS (`js/script.js`): `toggleNav()`/`closeNav()`, `aria-expanded` kept in sync on the toggle button, `aria-controls="navLinks"`.

### 5.2 Hero (`<section class="hero">`, first section, not alternating-bg — always white)

Two-column grid (`1fr 1fr`, collapses to single column ≤768px), `margin-top: 80px` to clear the fixed nav.

**Left column** (`.hero-content`):
- Eyebrow: `For HR & Compliance Teams`
- H1: `Navigating ESIC Healthcare Shouldn't Be This Hard`
- Subtitle: `Your employees spend hours searching for the right ESIC facility, department, and information. We connect them directly to the care they need.`
- CTA group: `See How It Works` (secondary button, scrolls to `#how-it-works`) + `Request Demo` (primary button, opens modal)
- Trust strip (`.trust-strip`, three small pill chips, `.trust-chip`): `Independent navigation layer` · `Your data stays private` · `Not affiliated with ESIC`

**Right column** (`.hero-visual` → `.product-preview`): a phone/card-framed mock of the (not-yet-built) employee Facility Finder screen — this is intentionally a *concrete UI mockup*, not an abstract stat-dashboard graphic, so the marketing claim has something real to point at. Structure:
- Top bar: brand mark (mini icon + "Health Bridge") + language toggle chip `.pp-lang-chip` showing "EN" / "हिं" (see §6.4 — this crossfades on an interval via JS)
- Search bar mock: `Where do you need to go?` (static text, not a real input)
- Two facility cards (`.pp-card`), each: title (`ESIC Dispensary, Sector 12` / `ESIC Model Hospital, Okhla`), distance + badge (`1.2 km · ✓ Recognised` / `3.6 km · ✓ Recognised`), and a decorative "Directions" pill button (`.pp-card-action`, `tabindex="-1"`, non-functional — it's a mockup, not a real control)

**Entrance animation:** on page load (not scroll-triggered — it's above the fold), the five children of `.hero-content` fade/slide up in sequence 80ms apart (eyebrow → H1 → subtitle → CTA group → trust strip). See §6.1.

### 5.3 Problem Statement (`section#problem`)
Eyebrow `The Challenge`. H2 `What's Stopping Employees from Getting Care?`. Desc: `Your employees are eligible for quality ESIC healthcare, but the path to access is broken.`

4-card grid (`.problem-grid`, `auto-fit minmax(260px,1fr)`), each `.problem-item` = icon badge (`.problem-icon`, 44px rounded square, `--blue-light` bg) + heading + paragraph:
1. ⏰ **Lost Time** — Employees waste hours searching for the right facility and department information.
2. ❓ **Unclear Process** — Complex bureaucracy leaves employees confused about eligibility and required documents.
3. 🏥 **Wrong Facility** — Without guidance, employees often visit the wrong hospital or department.
4. 📞 **Repetitive Support** — HR teams spend valuable time answering the same ESIC navigation questions daily.

### 5.4 Services (`section#services`)
Eyebrow `Platform Features`. H2 `Everything Your Employees Need to Access ESIC Care`. Desc: `One unified platform that solves the entire healthcare navigation journey.`

6-card grid (`.services-grid`, `auto-fit minmax(300px,1fr)`), each `.service-card` = large numeral (`.service-number`, "01"–"06", teal) + heading + paragraph, hover = teal border + lift:
1. **ESIC Healthcare Navigation** — Intelligent guidance that helps employees identify the appropriate ESIC facility based on their needs.
2. **Hospital & Facility Finder** — Easy-to-use interface to search relevant ESIC hospitals, dispensaries, and healthcare facilities nearby.
3. **Department Guidance** — Clear information about hospital departments and which service is relevant for employee needs.
4. **Appointment Assistance** — Navigate appointment processes and service requests when functionality is officially available.
5. **ESIC Scheme Information** — Easy-to-understand explanations of ESIC benefits, coverage, and available government schemes.
6. **AI Healthcare Assistant** — 24/7 AI-powered guidance to answer questions and direct employees to official healthcare channels.

### 5.5 Positioning (`section#positioning.positioning-section`)
The investor/differentiation moment — a **fixed dark navy panel regardless of site theme** (`background: linear-gradient(135deg, #12406E 0%, #081B33 100%)`, hardcoded, not `var(--blue-primary)`, precisely because that variable flips lighter in dark mode and would break this panel's contrast — see §9 for why this matters).

Eyebrow (inverse variant, `.section-eyebrow--inverse`, `rgba(255,255,255,0.75)`): `Why We're Different`. H2 (`.positioning-headline`, `--on-dark` white): `Built for the workforce insurtech ignores.` Desc: `Most corporate health-benefits platforms are designed for urban, English-first, white-collar teams. That leaves out most of India's ESIC-eligible workforce.`

Two stat blocks (`.positioning-stats`, side by side):
1. `20%` — *of the workforce — above the ESIC wage threshold — is who typical insurtech platforms serve.*
2. `180M+` (accent-highlighted card, `.positioning-stat--accent`, teal-tinted overlay) — *ESIC-eligible employees is who ESIC Health Bridge is built to serve instead.*

Both stat values carry `data-count`/`data-suffix` attributes (`data-count="20" data-suffix="%"`, `data-count="180" data-suffix="M+"`) and count up from 0 on scroll-into-view — see §6.2.

### 5.6 How It Works / Six-Step Journey (`section#how-it-works`)
Eyebrow `Implementation`. H2 `A Simple Six-Step Journey`. Desc: `From onboarding to successful healthcare access. Select a step to see what happens.`

This is **the flagship "show don't tell" component** — deserves the most interaction-design investment of anything on the page (it demonstrates the actual product mechanism, not just marketing chrome). Six `<button class="flow-step" data-step="1"…6">` elements in a grid, each: large numeral (`.step-number`, teal), heading, one-line description, and a **click-to-reveal detail line** (`.step-detail`, hidden by default, animates open via CSS `grid-template-rows: 0fr → 1fr`, not `display:none` toggling — see §6.3):

1. **Organisation Onboards** — Your company partners with us and provisions employee access. *(detail: "HR shares no personal health data — only who's eligible for access.")*
2. **Employee Registers** — Employees securely verify their relevant details on the platform. *(detail: "Registration takes under two minutes, in the employee's own language.")*
3. **Request Assistance** — Employee selects the healthcare service or facility they need. *(detail: "One tap from the home screen — no forms, no jargon.")*
4. **Platform Guides** — Intelligent system identifies appropriate facility and service pathway. *(detail: "Every recommendation shows a plain-language reason it was chosen.")*
5. **Employee Accesses Care** — Clear guidance, directions, and next steps provided directly. *(detail: "Works offline — directions and documents stay cached on-device.")*
6. **Follow-Up & Support** — Reminders and tracking for continued healthcare access support. *(detail: "HR sees aggregate outcomes — never an individual's medical details.")*

A thin connecting line runs behind the cards (`.flow-container::before` = full-width gray track, `::after` = teal fill sized by a `--flow-progress` CSS custom property, `0` → `1`). Clicking or scrolling a step into view advances the fill **cumulatively** (never resets to a lower step) — see §6.3 for the exact JS logic.

### 5.7 Benefits (`section#benefits`)
Eyebrow `Why Choose Us`. H2 `Real Benefits for Your Organisation`. Desc: `Give your employees better healthcare access while reducing HR workload.`

6-item two-column icon list (`.benefits-list`, single column ≤768px), each `.benefit-item` = 48px icon badge (`--blue-light` bg) + heading + paragraph:
1. 😊 **Better Employee Experience** — Simpler navigation leads to faster access to the ESIC care they're entitled to.
2. 🧠 **Reduced Confusion** — Clear guidance eliminates the guesswork about facilities and departments.
3. ♿ **Improved Accessibility** — Multilingual support and simple design serve employees at all literacy levels.
4. ⚡ **HR Efficiency** — Reduce repetitive ESIC questions, freeing HR to focus on people and culture.
5. 💼 **Modern Digital Support** — A 21st-century platform for healthcare navigation in your organisation.
6. 💪 **Workforce Wellbeing** — Help employees make better use of healthcare benefits available to them.

### 5.8 For Employees (`section#for-employees`)
No eyebrow/H2 header pattern here — direct two-column layout (`.employees-grid`, single column ≤768px).

**Left:** H3 `Designed for Your Employees`, paragraph `Every employee—from factory floor to office—gets simple access to the information they need to navigate ESIC healthcare.`, then a 5-item checklist (`.employee-features`, each a teal check-circle + text):
- Find nearby ESIC facilities instantly
- Understand what documents to bring
- Get guidance in your preferred language
- Access 24/7 AI healthcare assistant
- Track appointments and follow-ups

**Right (`.employee-visual`):** a phone-framed mock of **"My Entitlement Card"** — a concrete, ownable product idea (not generic gray placeholder bars): a white card inside the phone frame showing "My ESIC Coverage" header, three checked entitlement rows (OPD consultations / Inpatient care / Dependents covered, green checkmarks via `--success-text`), a decorative QR-code pattern (pure CSS gradient, no image), and a "Show at reception" label. Two soft radial-gradient blobs decorate the background (`.employee-visual::before` teal, `::after` navy — deliberately two-tone, not uniform).

### 5.9 Trust & Compliance (`section#trust.trust-section`)
Eyebrow `Trust & Compliance`. H2 `Clear About What We Are — and What We're Not`. Desc: `Healthcare and government bureaucracy are both anxiety-inducing. We keep this plain.`

Three-card grid (`.trust-grid`), each `.trust-card` = icon badge (green-tinted) + heading + paragraph:
1. 🔗 **Independent navigation layer** — We guide employees through the ESIC system — we don't replace it, and we're not officially affiliated with it.
2. 🔒 **Your data stays yours** — Employee health information is never sold, and HR only ever sees aggregate, anonymised usage — never individual case detail.
3. 📋 **Government scheme, private-sector clarity** — Entitlements and processes are explained in plain language, cross-checked against official ESIC rules.

Below the grid, a bordered callout box (`.trust-disclaimer`, navy left-border accent, NOT buried in footer fine print): *"We are a technology and healthcare-navigation service provider. We do not replace ESIC, ESIC hospitals, doctors, or authorised healthcare providers."* — this exact sentence is repeated verbatim in the footer too (legal requirement: must be visible, not just present once).

### 5.10 Stats (`section#stats`)
Eyebrow `Growing Impact`. H2 `Trusted by Leading Organisations`.

4-item stat row (`.stats-container`), each `.stat-item` = large number (teal, count-up animated where numeric) + label:
- `50K+` (`data-count="50" data-suffix="K+"`) — Employees Served
- `100+` (`data-count="100" data-suffix="+"`) — ESIC Facilities Connected
- `2` (`data-count="2" data-suffix=""`) — Languages Supported
- `24/7` (**no** `data-count` — not a meaningful quantity to animate, just fades in like the others) — AI Support Available

Below the grid, a small honest caption (`.stats-caption`): *"Figures from active pilot programs with partner organisations."* — deliberately hedges placeholder-looking numbers rather than presenting them as verified at-scale metrics.

### 5.11 CTA / Partner (`section#partner`)
Contains `.cta-section` — a **fixed dark navy panel** (same hardcoded gradient treatment as §5.5, same reasoning), with a very slow ambient background-gradient drift animation (18s cycle, see §6.5).

H2: `Ready to Transform Employee Healthcare Access?` Paragraph: `Give your workforce the ESIC healthcare navigation tools they deserve. Let's talk about how ESIC Health Bridge can reduce HR burden while improving employee wellbeing.` Two buttons: `Request a Demo` (teal fill, opens modal) and `Talk to Our Team` (translucent white outline, triggers `contactTeam()` → `mailto:chetan@doctorbrainai.com`).

### 5.12 Footer
Also a **fixed dark navy panel** (`background: linear-gradient(135deg, #0A2A4D 0%, #050F1E 100%)`, hardcoded — same pattern again).

4-column link grid (`.footer-content`, `auto-fit minmax(200px,1fr)`, collapses to 2 columns ≤768px):
- **For Organisations:** Dashboard `#services` · Employee Onboarding `#how-it-works` · Analytics `#benefits` · Support `#partner`
- **For Employees:** Healthcare Navigation `#for-employees` · Facility Finder `#services` · Scheme Information `#services` · AI Assistant `#services`
- **Company:** Contact Us (`mailto:chetan@doctorbrainai.com`) · `+91 81122 31341` (`tel:` link) · About Us `#about` · Careers `#careers` · Blog `#blog`
- **Legal:** Privacy Policy `#privacy` · Terms of Service `#terms` · Security `#security` · Compliance `#compliance`

(`#about`, `#careers`, `#blog`, `#privacy`, `#terms`, `#security`, `#compliance` are placeholder anchors — no corresponding sections exist yet; these are stubs for future pages, not broken links to fix.)

Footer bottom bar: `© 2024 ESIC Health Bridge. All rights reserved. A DoctorBrainAI.com company, Jaipur, Rajasthan, India.` (left) + the same compliance disclaimer sentence from §5.9 (right, `.footer-disclaimer`).

### 5.13 Demo Request Modal (`#demoModal`, not a section — overlay, hidden by default)
Triggered by any `Request Demo`/`Request a Demo` button (`openDemo()`). Standard centered modal, `rgba(0,0,0,0.5)` backdrop, closes via × button, `Escape` key, or backdrop click.

Form fields: Company Name (text, required), Email Address (email, required), Phone Number (tel, required, `inputmode="numeric"`, placeholder "10-digit mobile number", validated on blur against `/^[6-9]\d{9}$/` with an inline error message), Number of Employees (text, optional, placeholder "e.g., 500-1000"). Submit button: `Send Demo Request`.

**Four real states, not just a happy path** (see §6.6 for exact behavior): idle → validation error (inline, field-level) → loading (button text → "Sending…", disabled) → success (form swaps for a success panel with a hand-drawn SVG checkmark and the message *"An ESIC Health Bridge specialist will call within 1 business day."*). No backend exists yet — submission is a simulated 900ms delay (`setTimeout`), form data is `console.log`ged only.

---

## 6. Interaction & animation spec

**Governing principle:** every animation must be *purposeful* (communicates state or hierarchy), never decorative-for-its-own-sake, and **every single one** — CSS keyframe or JS-driven — must degrade gracefully under `prefers-reduced-motion: reduce`. CSS animations live inside one `@media (prefers-reduced-motion: no-preference)` block (don't fragment this into multiple blocks). JS-driven animations check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` once at load and branch to an instant final-state fallback.

### 6.1 Hero entrance stagger
`.hero-content`'s five direct children fade+slide-up (`fadeInUp` keyframe: `opacity 0→1`, `translateY(20px)→0`) on page load, 80ms apart via `animation-delay` (0.05s, 0.13s, 0.21s, 0.29s, 0.37s). Load-triggered, not scroll-triggered (it's above the fold).

### 6.2 Stat count-up
Elements with `data-count`/`data-suffix` attributes (positioning stats + 3 of the 4 stat-grid numbers) count from 0 to target via `requestAnimationFrame` over 1200ms, triggered once by a dedicated `IntersectionObserver` (`countObserver` in `js/script.js`), then `unobserve`d. **Don't write a string parser** for the mixed suffix formats ("K+", "%", "M+") — the data attributes carry the numeric target and suffix separately, text content is the pre-JS fallback. Under reduced motion, skip the rAF loop entirely and set final text directly.

### 6.3 Six-step journey: detail reveal + connecting line
Clicking a `.flow-step` toggles its `.active` class. `.step-detail` uses `display: grid; grid-template-rows: 0fr` (collapsed) → `.active .step-detail { grid-template-rows: 1fr }` (expanded), transitioning `grid-template-rows`, `opacity`, `margin-top`, `padding-top`, `border-top-width` together — this is the modern CSS way to animate height without a fixed max-height magic number. Only one step is active at a time (opening a new one closes the previous).

The connecting line fill (`.flow-container::after`, width driven by `--flow-progress` custom property) advances **cumulatively**: `updateFlowProgress(stepNum)` in JS only updates the property if `stepNum > flowProgress` (never regresses), and is called both from the click handler and from the existing scroll `IntersectionObserver` (reused, not a second observer) whenever a `.flow-step` scrolls into view — so scrolling down the page fills the line even without clicking.

### 6.4 Language chip micro-swap
`.pp-lang-chip` (in the hero mockup) cycles between "EN" and "हिं" every 2.5s via `setInterval`: adds `.pp-lang-fade` (opacity → 0, 300ms), swaps `textContent` at the fade's midpoint, removes the class to fade back in. Purpose: *demonstrate* the multilingual claim in the mockup rather than just stating it in copy. Entirely skipped (interval never started) under reduced motion — chip stays on its static initial text.

### 6.5 Ambient CTA gradient drift
`.cta-section` background is oversized (`background-size: 200% 200%`) and its `background-position` animates `0% 50% → 100% 50% → 0% 50%` over an 18s `ease-in-out infinite` loop — slow and low-amplitude enough to read as ambient, not attention-grabbing. Lives inside the same reduced-motion-gated block as everything else.

### 6.6 Demo form states
- **Idle:** empty form, submit enabled.
- **Field validation:** phone number validated on `blur` (not just on submit) against `/^[6-9]\d{9}$/` — inline error text appears under the field immediately, red border, so a typo is caught before the round-trip. Submit also re-validates and blocks with a general form-level error banner if invalid.
- **Loading:** submit button text → `Sending…`, `disabled`, no layout shift.
- **Success:** after a simulated 900ms delay, the form is hidden (`hidden` attribute) and a success panel (`#demoSuccess`) is shown in its place — heading `Request received`, message `An ESIC Health Bridge specialist will call within 1 business day.` (a specific promise, not a generic "Thanks!"), and a Close button. The SVG checkmark inside it draws in via `stroke-dasharray`/`stroke-dashoffset` transition (`25 → 0`), triggered by adding a `.checkmark-draw` class at the same moment the panel is shown — instant (no stroke animation) under reduced motion via its own dedicated media query.
- **Reset:** closing/reopening the modal (`resetDemo()`) clears all of the above back to idle, including removing `.checkmark-draw` so reopening replays the draw-in.

### 6.7 Micro-interactions (baseline polish)
- `.nav-links a::after` — a 2px underline scales in from `scaleX(0)` to `scaleX(1)` on hover (not just a color change).
- `.btn:active { transform: scale(0.97); }` — tactile press feedback on every button.
- `.product-preview` / `.phone-frame` — subtle 3D hover tilt (`perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px)` + deepened shadow), gated behind `@media (hover: hover)` so touch devices don't get a stuck hover state, and its own nested reduced-motion override.
- Existing card fade-ins (`.service-card`, `.flow-step`, `.benefit-item`, `.trust-card`, `.stat-item`, `.positioning-stat`) via one shared `IntersectionObserver`, staggered by `nth-child` delay within each group.

---

## 7. JavaScript — function inventory (`js/script.js`, no modules, plain `<script>`)

| Function / block | Responsibility |
|---|---|
| `scrollToSection(id)` | smooth-scrolls to a section by ID (used by the hero's "See How It Works") |
| `toggleNav()` / `closeNav()` | mobile hamburger menu open/close, syncs `aria-expanded` |
| flow-step click listener + `updateFlowProgress(stepNum)` | six-step active-state toggle + cumulative progress-line fill |
| `openDemo()` / `closeDemo()` / `resetDemo()` | modal lifecycle; `resetDemo()` is called on every open so it always starts clean |
| `contactTeam()` | `mailto:` handoff for "Talk to Our Team" |
| phone `blur` listener | inline field validation |
| `handleSubmit(event)` | form submit: validate → loading state → simulated delay → success state |
| window `click` listener on `#demoModal` | closes modal on backdrop click |
| document `keydown` listener (×2: nav, modal) | `Escape` closes whichever is open |
| shared `observer` (`IntersectionObserver`) | scroll-reveal for card grids; also drives flow-progress on scroll |
| `animateCountUp(el)` + `countObserver` | stat count-up, separate observer because it needs a rAF loop, not just a class toggle |
| language-chip `setInterval` block | EN/हिं crossfade cycle |

No global state beyond `flowProgress` (module-level `let`, tracks the furthest six-step reached) and `prefersReducedMotion` (computed once via `matchMedia`).

---

## 8. Responsive breakpoints

| Breakpoint | Behavior |
|---|---|
| **Desktop (default, >1024px)** | full two-column grids, H1 56px, H2 42px |
| **Tablet (≤1024px)** | H1→46px, H2→34px, positioning headline→30px, tighter grid gaps — a dedicated tier so tablet widths don't inherit awkward desktop spacing |
| **Nav breakpoint (≤860px)** | hamburger menu replaces inline nav links (see §5.1) — this is a distinct breakpoint from the general mobile tier below because the nav needs to collapse before the rest of the layout does |
| **Mobile (≤768px)** | hero/employees-grid/benefits-list collapse to single column, H1→36px, H2→28px, buttons go full-width and stack, footer grid→2 columns, section padding tightens |

Design rule carried through: **44×44px minimum tap targets** on all buttons/inputs (`min-height: 44px` on `.btn` and form inputs) regardless of breakpoint.

---

## 9. Why three sections are "always dark," even in light mode

`.positioning-section`, `.cta-section`, and `footer` all use **hardcoded gradient hex values** (`#12406E→#081B33`, `#12406E→#081B33`, `#0A2A4D→#050F1E` respectively) instead of `var(--blue-primary)`, and their text uses the **fixed** `--on-dark`/`--on-dark-secondary` tokens instead of `var(--white)`/`var(--text-secondary)`.

This is deliberate, not an oversight: these three are meant to always read as a bold, dark brand panel — matching the operating company's visiting card, whose back panel is a fixed navy surface regardless of anything else. If they used the theme-flipping tokens instead, dark-mode users would see a broken result: `--blue-primary` flips to a *light* teal in dark mode, `--white` flips to *near-navy* text — combined, headings would render as dark text over a gradient that's light at one end and dark at the other, failing contrast badly over the dark half (this was a real, measured bug — 1.53:1 contrast — caught and fixed during development). **If you add a fourth "always dark" panel, follow this exact pattern**: hardcoded gradient stops + `--on-dark`/`--on-dark-secondary` text, never the theme-flipping primary tokens.

---

## 10. Accessibility checklist (implemented, verify on any change)

- WCAG AA contrast (4.5:1 text / 3:1 large-text-and-UI) — every token pairing in this document has been numerically verified with the standard relative-luminance formula, not eyeballed. Re-verify any new color pairing the same way before shipping it.
- `prefers-reduced-motion: reduce` — every animation (CSS and JS) has a defined instant/static fallback (§6).
- `prefers-color-scheme: dark` — full dark-mode token set, not just an afterthought invert.
- Keyboard: skip link, visible focus rings (one consistent color sitewide), modal and mobile-nav both close on `Escape`, six-step cards are real `<button>` elements (not `<div onclick>`), all interactive mockup elements that aren't real controls carry `tabindex="-1"`.
- Semantic structure: `<nav>`, `<main>`, `<footer>`, heading hierarchy (H1 once in hero, H2 per section, H3 within cards).
- Form: labels tied to inputs via `for`/`id`, live-region error messaging (`aria-live="polite"`).

---

## 11. Explicitly out of scope (do not assume these exist)

- **No real employee-facing app/PWA exists.** The hero "product preview" and the "My Entitlement Card" phone mock are illustrative UI mockups built in HTML/CSS to make the marketing claims concrete — not screens of a working product. If a real employee app gets built later, `.product-preview` and `.entitlement-card` are reasonable visual starting points, not something to just wire up as-is.
- **No HR admin console exists.** Referenced only conceptually (this doc's original design-direction predecessor, `DESIGN.md`, argues for building at least one representative screen for fundraising completeness — not yet done).
- **No backend.** The demo form's "success" state is simulated client-side; no CRM/email service is wired up. Wiring one up should preserve the exact state machine in §6.6 (idle/validating/loading/success/error), not simplify it back to an `alert()`.
- **No real usage statistics.** The `50K+` / `100+` / `98%`-style figures are placeholders, deliberately captioned "Figures from active pilot programs" rather than presented as verified at-scale numbers. Replace with real numbers the moment they exist; don't remove the honesty caption until they do.
- **Only English content currently.** The Devanagari font fallback and the "EN/हिं" language-chip mockup are groundwork for future Hindi/regional-language support, not evidence that translation exists yet.

---

*This document reflects the implementation as built. For the original strategic/competitive-landscape brief and the forward-looking design rationale (brand identity reasoning, employee-app screen recommendations, HR admin console argument), see `DESIGN.md` in this repo.*
