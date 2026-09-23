# ESIC Health Bridge — Design Direction
*Prepared by: UI/UX Director. Audience: founders, design team, investors reviewing product craft.*

---

## 0. The one-sentence thesis

**We are not designing a landing page. We are designing the front door to a country's largest underserved healthcare population — and the boardroom deck that convinces a CHRO to open that door.**

Every decision below is filtered through one question: *does this make a blue-collar worker feel safe and an HR director feel confident, at the same time, from the same brand?* That tension — dignity for one audience, credibility for the other — is the actual design problem. It's also the moat. Any insurtech studio can ship a clean SaaS site. Almost none of them know how to design for a factory-floor worker on a ₹6,000 Android phone. We do both, and we let both audiences see that we do both. That's the pitch, visually.

---

## 1. Two products, one nervous system

Stop thinking of this as "a website." It's three surfaces sharing one design language:

| Surface | Audience | Feeling to produce | Design register |
|---|---|---|---|
| **Marketing site** | HR/CHRO buyer, investors | "This is a real, fundable, enterprise-grade company" | Confident SaaS — Plum/Linear/Stripe tier |
| **Employee app (PWA)** | Factory/warehouse worker | "Someone finally made this simple for me" | Calm, iconographic, almost app-store-for-government-services |
| **HR admin console** *(new — see §6)* | The buyer, post-sale | "I can see the ROI I was sold" | Data-dense but restrained, dashboard-grade |

The brief names the first two. The third doesn't exist yet in the current build, but it's the thing that actually closes enterprise deals and gives investors a expansion story (seat-based SaaS pricing, not just a lead-gen page). I'm scoping it in below because a funding conversation without a "what does the paid product look like after signature" screen is an incomplete pitch.

One token system, one type system, one icon set, one motion language underneath all three — divergent density, shared DNA. A CHRO who logs into the admin console after seeing the marketing site should feel zero brand whiplash. An employee who opens the app after their HR rep shows them the sales deck should feel *reassured*, not confused by a totally different visual world.

---

## 2. Brand identity — the actual creative decisions

### 2.1 Kill the ⚡ emoji
An emoji as a logo placeholder is fine for a repo bootstrap, fatal for a funding deck. Design implication, not a literal logo file: the mark should visually resolve as **a bridge, not a cross, not a shield, not a pulse-line.** Every competitor in health-tech reaches for the medical-cross or heartbeat-pulse cliché. "Bridge" is in the product name for a reason — lean into it. A simple two-pillar/single-span glyph (think: the negative space between two rounded rectangles forming an arch) reads as *connection between two systems*, works at 16px favicon size, and doesn't borrow visual authority from medicine or government (which the disclaimer legally requires us not to imply anyway). This becomes a quiet but real trust signal: we look like infrastructure, not like a knockoff of the thing we're not.

### 2.2 Color — evolve, don't replace
The existing tokens (`--blue-primary: #0066B3`, `--orange-accent: #FF6B35`) are good instincts — trustworthy blue, human warmth accent — but they're generic insurtech blue. Refine, don't reinvent:

- **Bridge Blue `#0057A3`** — deepen slightly from the current #0066B3. It reads less "generic fintech," more "considered." Reserve full-saturation blue for the marketing site's primary actions and data.
- **Warm Coral `#FF6B4A`** — nudge the orange 15° warmer. This is the *employee-app* accent — used for anything actionable ("Find my facility," "Start here"). Warm accents test better for approachability with lower-literacy, anxious users than cool blue-on-blue; save pure blue authority for the enterprise surface.
- **Earned-trust green `#1E8E5A`** — new addition, not in current tokens. Used exclusively for confirmation states (eligibility confirmed, appointment secured, document verified). Government portals under-use affirmative color, which is part of why they feel cold. A single, disciplined "you're good" green is one of the cheapest trust upgrades available.
- **Neutral scale stays close to current** (`#111111` / `#626262` / `#FAFAFA`) — don't mess with what's already legible.
- **Dark mode stays**, but treat it as an enterprise/marketing-site feature primarily. Don't assume employees on older Android devices have dark mode wired correctly system-wide — test both, but design light-first for the employee surface since that's the one where miscalibrated contrast actually costs someone a hospital visit.

### 2.3 Typography — solve the Devanagari gap now, not later
This is the single most consequential technical-design decision in the brief and it's currently unsolved. Plus Jakarta Sans / Inter have no Devanagari glyphs — if Hindi ships with a silent system-font fallback, kerning and x-height mismatch will make the app look broken exactly where trust matters most.

- **Pair `Inter`/`Plus Jakarta Sans` (Latin) with `Noto Sans Devanagari` (Hindi/regional scripts)**, matched at equivalent optical weight and x-height, not just font-family stacked and hoped for. Noto Sans is the pragmatic, boring, correct choice — free, broad script coverage (covers future regional-language expansion — Marathi, Gujarati, Bengali all sit on Noto Sans variants), renders reliably on low-end Android.
- **Treat every text container as script-agnostic from day one**: no fixed-height buttons or single-line-truncated labels sized for English word-length. Devanagari and other Indic scripts run 20-30% longer for equivalent meaning. Build the type scale and spacing tokens around a "longest expected string" test, not the English string.
- **Type scale simplification for the employee app**: 4 sizes, not 8. Marketing site can carry a full editorial scale (display/h1-h4/body/caption); the employee app should feel almost like reading a well-designed transit sign — Title, Body, Label, that's close to it.

---

## 3. The marketing site — investor-grade, not just "nice landing page"

The current structure (brief §4) is sound information architecture — keep the skeleton, upgrade the execution and add what's missing for a fundraising context.

### 3.1 What to keep as-is (don't rebuild what works)
Nav → Hero → Problem → Services → How It Works → Benefits → For Employees → Stats → CTA → Footer is a correct SaaS narrative arc. Resist the urge to reinvent the sitemap; the craft gap is in execution depth, not structure.

### 3.2 What to upgrade
- **Hero:** replace the abstract "stat-dashboard visual mockup" with something that *shows the product*, not implies it — a real (or high-fidelity simulated) screen of the facility-finder or the step-journey tracker, device-framed. Investors and HR buyers both discount hero sections that are decorative rather than evidentiary. If the actual app UI doesn't exist yet, this is reason #1 to prioritize building the employee-app screens in parallel with the marketing polish — the marketing site's credibility literally depends on the product being real enough to screenshot.
- **Stats section:** the brief flags "50K+", "98%" as placeholder claims (open question #4). Design the component so it *degrades gracefully to honesty* — e.g., "Piloting with X employees across Y facilities" framing for pre-scale reality, with the component built to swap to hard numbers post-traction without a redesign. An investor spots inflated placeholder stats instantly; a design system that visibly supports "growing-company-numbers" today and "at-scale numbers" tomorrow reads as more credible, not less.
- **"Six-Step Journey" flow:** this is the single best "show don't tell" asset on the whole site (per brief §6) — invest real design hours here. Treat it as a live, interactive stepper (hover/tap reveals what happens at each stage, what the employee sees, what the HR admin sees) rather than a static graphic. This one component, done exceptionally, does more fundraising work than the rest of the page combined — it's the "here's exactly how the product works" moment every investor deck needs and most fail to visualize.
- **New section — "Built for the workforce insurtech ignores"**: a direct, confident positioning block contrasting ESIC Health Bridge against the Plum/Loop Health tier (white-collar, English-first) explicitly. Naming the gap you fill is a stronger investor signal than implying it. One comparison strip: *"They serve the 20% earning above ₹21,000/month. We serve the ~180M+ who don't."* This single sentence is your total-addressable-market slide, in copy form, on the homepage.
- **New section — "Trust & Compliance" (promoted, not buried):** per brief §5/§6, the "we are not ESIC" disclaimer currently lives only in the footer. Give it a real designed moment — a dedicated trust strip with three plain-language pillars (Independent navigation layer / Your data stays yours / Government scheme, private-sector clarity), each with the legal disclaimer text as supporting copy, not warning-label copy. This reads as *maturity* to investors (you've clearly thought about the legal/regulatory surface) and as *safety* to HR buyers who need this for their own compliance sign-off.
- **Founders/traction section (new, for the funding context specifically):** if this site will be shown to investors, it needs *a* version of a story slide — team credibility, pilot traction, roadmap milestone — even minimal. A pure product-marketing page with zero "why now / why us" signal reads as unfinished in a fundraising context. This doesn't need to be public-permanent; it can be a `/investors` route gated or simply positioned lower on the page.
- **Demo modal → real states:** per brief §6/§7, currently alert()-only. Design (not just build) the four states — idle, loading/submitting, success (with a specific next-step promise: "an ESIC Health Bridge specialist will call within 1 business day," not a generic "thanks"), and error/retry. This is small, cheap, and exactly the kind of unfinished detail that makes a technical investor or diligence-minded buyer distrust the rest of the product.

---

## 4. The employee app — this is the actual product, design it like one

The brief correctly flags this as the harder, more important problem (§2.2, §7 open question #1). My recommendation: **scope the redesign to include real, designed employee-app screens, not just the marketing implication of one.** A funding narrative built on a phone mockup of a product that doesn't exist is fragile the moment a term sheet reaches product diligence.

### Core screens to design (in priority order):

**1. Entry / trust moment (first 10 seconds)**
No login wall as the first screen. Open directly on: *"Where do you need help today?"* with 3-4 large icon tiles (Find a facility / What am I entitled to / Book help / Talk to assistant). Literacy-forgiving design means the first screen asks a question, not a form.

**2. Facility Finder — the flagship screen**
Map-first, but **list-first as the default for low-bandwidth reality** — don't force a heavy map tile load on 3G as the default state; offer "Show map" as a progressive enhancement, list-with-distance as the reliable baseline. Each facility card: name, distance, a single trust badge ("ESIC-recognised" styled as an outlined chip, never a seal/emblem — legal guardrail from §2.3 of the brief), and one clear action ("Get directions"). This is the single highest-value screen in the product — it deserves the most design iteration of anything in this document.

**3. The Step-Journey Tracker (employee-app version)**
Same visual metaphor as the marketing site's six-step flow, but personalized and stateful: *"You are here"* — a vertical tracker (not horizontal, on mobile) showing Onboarded → Registered → Request Sent → Guided → In Care → Follow-up, with the employee's *actual* current step highlighted. This turns an abstract marketing diagram into a genuinely useful in-product status indicator — one component, two jobs, reused across both surfaces. That reuse is good design economics and a nice "look how coherent this system is" detail for a technical investor reviewing the codebase.

**4. "My Entitlement Card" — new idea, not in the brief**
A single-screen, always-accessible digital card summarizing: what the employee is covered for, in plain language, with a QR code that a facility reception desk can scan (or the employee can show) to pull up their case context instantly. This solves a real, named pain point from the brief ("don't know what they're entitled to," "repetitive support burden on HR") with almost no backend complexity — it's a formatted summary view, not a new subsystem — and it's the kind of concrete, ownable feature that makes an investor conversation ("what's your product moat") land on *something*, rather than "we have an AI assistant" (which every competitor also claims).

**5. AI Assistant — design it as WhatsApp, not as a chatbot widget**
The brief lists a 24/7 AI assistant as an existing feature. Critical design decision: **do not build a generic bottom-corner chat-bubble widget** — that pattern reads as "customer support afterthought" and is exactly the genre-cliché the brief warns against copying from premium fintech (§5). Instead, mirror WhatsApp's interaction model almost exactly — full-screen chat, large tap targets, voice-message input as a first-class option (not an accessibility afterthought), because WhatsApp is the one interface pattern this entire user base already has fluent muscle memory for, regardless of literacy level. Borrowing a familiar mental model instead of teaching a new one is the single biggest "why this design works for this audience" decision in the whole product.

**6. Language switcher — a persistent, physical control, not a settings-menu item**
Given the multilingual-first requirement (§6), don't bury language selection three taps deep. A visible, top-level language toggle (flag-free, since flags misrepresent Indian linguistic geography — use script samples instead, e.g. "English / हिंदी / मराठी" shown in their own scripts as the picker itself) should be reachable from every screen in one tap. Language is not a settings preference here, it's closer to an accessibility primitive.

### Interaction principles for this surface specifically
- **No screen should require reading more than ~15 words to act correctly.** Icon + 2-4 word label over paragraph copy, everywhere.
- **Every destructive or costly action gets a confirmation with a human consequence stated plainly** ("This will cancel your appointment request") — not a generic "Are you sure?"
- **Skeleton loading states everywhere, no spinners.** On 3G, a skeleton that shows the shape of what's coming reduces perceived wait and abandonment far more than a generic spinner (brief §6 already flags this — treat it as non-negotiable, not aspirational).
- **Offline isn't an edge case, it's a starting assumption.** Facility info and the entitlement card should be cached and viewable with zero connectivity, with a small, calm "Last updated X" timestamp rather than a hard error state when offline.

---

## 5. Motion & sound of the brand

Minimal, purposeful, never decorative — this is consistent with the existing "zero dependencies" discipline (README) and should stay that way through the redesign, not get abandoned for a funding-polish pass.

- Marketing site: motion communicates *hierarchy* (scroll-triggered reveals on the step-journey and services grid) — tasteful, Apple-keynote-adjacent restraint, not scroll-jacking or parallax spectacle.
- Employee app: motion communicates *state change only* — a step completing, a card loading in. No motion that exists purely for delight here; delight for this audience is speed and clarity, not animation. `prefers-reduced-motion` respected everywhere (already claimed in brief §6 — verify it, don't just claim it).

---

## 6. The HR Admin Console — the missing piece for a fundraising story

Not in the current brief's scope, and I'm flagging it explicitly as a recommendation rather than assuming it: **a funding narrative for a B2B2C product is incomplete without showing what the "B" gets after they sign.** Right now the product story ends at "Request Demo." An investor's next question is always "then what — what does the paying customer actually use?"

Minimal viable design scope (not full build — just enough to make the pitch complete):
- A dashboard showing aggregate, anonymized employee usage (adoption %, facilities most used, average time-to-resolution) — this is literally the ROI proof the brief says HR buyers care about most (§2.1), turned into a product surface instead of a sales claim.
- This closes the loop visually: Marketing site sells the promise → Employee app delivers it → Admin console proves it happened. That three-act structure, shown as three linked screens in a pitch deck, is a materially stronger fundraising artifact than a single landing page.

If scope/timeline genuinely can't include this now, at minimum design *one* representative admin-console screen as a deck asset — it costs a day, and it answers the investor's next question before they ask it.

---

## 6b. UI/UX architecture — information design, not just brand

Everything above is positioning and visual language. This section is the actual UX layer: how information is structured, how screens are laid out, what states exist, and how a person moves through the system. This is where "looks like Apple" has to become "works like Apple" — the craft is in the states nobody screenshots for a pitch deck.

### 6b.1 Information architecture

**Marketing site — flat, not deep.** Every current section (brief §4) sits at depth 1, reachable by anchor scroll. Keep it flat; a fundraising/sales site with a mega-nav or multi-level dropdown signals a company that hasn't decided what it's selling yet. The only new depth-2 routes worth adding: `/investors` (traction, team, roadmap — kept out of primary nav, linked from footer + shared directly) and a lightweight `/trust` page the promoted trust strip (§3.2) can deep-link to for the reader who wants the full disclaimer, not just the summary line.

**Employee app — hub-and-spoke, not tab-bar-of-everything.** Resist the instinct to cram Facility Finder / Entitlement Card / AI Assistant / Journey Tracker into a 4-5 icon bottom tab bar as co-equals — that's a white-collar-app pattern that assumes the user already knows what each icon means. Instead: **one home screen that IS the navigation** (the "Where do you need help today?" tile grid from §4, screen 1), with a persistent but secondary bottom bar carrying only Home / My Status / Help (3 items, not 5). Depth stays at 2 everywhere: Home → [Facility Finder | Entitlement Card | Journey | Assistant] → done. No screen should require a "back, back, back" chain to reach Home; every sub-screen gets a direct Home affordance, not just a back arrow — anxious users abandon a flow faster than confident ones, and a visible way out reduces that abandonment.

**Admin console — sidebar, standard SaaS IA.** This audience (HR/CHRO) already knows this pattern from every other B2B tool they use (brief §3.4 references Darwinbox/Keka/Zoho People) — don't innovate on navigation here, spend the design budget on the data instead.

### 6b.2 Wireframe-level layout: the three screens that matter most

**Hero (marketing site) — the fix is compositional, not decorative.**
```
┌─────────────────────────────────────────────┐
│ nav: logo          Services  How  Employees  │
├───────────────────────┬───────────────────────┤
│ eyebrow: "For HR & Compliance Teams"          │
│ H1 (max 8 words, 2 lines)                     │
│ subhead (1 sentence, concrete)   │  [REAL      │
│                                    │  facility-  │
│ [See How It Works] [Request Demo] │  finder     │
│                                    │  screenshot,│
│ trust strip: 3 inline chips       │  device-    │
│ (Independent layer / Data privacy │  framed]    │
│ / Not affiliated with ESIC)       │             │
└───────────────────────┴───────────────────────┘
```
The current build (`hero-visual` in `css/styles.css:187-289`) renders an abstract stat dashboard nobody in the product actually sees. Two layout changes, not a rebuild: (1) swap that panel for a real device-framed product screenshot once the employee-app screens exist (§4 dependency, already flagged in §3.2 — repeating here because it's an IA/layout decision, not just an asset swap); (2) pull the trust-disclaimer chips out of the footer and into the hero as a third, small row under the CTAs — three inline pill components, ~12px text, non-clickable is fine at this position, it's a glance-trust signal, not a nav item.

**Facility Finder (employee app) — list-first, single-column, thumb-reachable.**
```
┌───────────────────────────┐
│ ← Home      [Hi/EN toggle]│
│ 🔍 "Where do you need     │
│     to go?"               │
├───────────────────────────┤
│ [Show map ›] (collapsed,   │
│  progressive enhancement)  │
├───────────────────────────┤
│ ┌─────────────────────┐   │
│ │ ESIC Dispensary,     │   │
│ │ Sector 12            │   │
│ │ 1.2 km · ✓ Recognised│   │
│ │        [Directions →]│   │
│ └─────────────────────┘   │
│ ┌─────────────────────┐   │
│ │ ...next card...      │   │
│ └─────────────────────┘   │
└───────────────────────────┘
```
Single column, no side-by-side cards on mobile even at tablet width — side-by-side forces a horizontal eye path that lower-literacy users scan less reliably than a strict top-to-bottom list. The map is one tap away, never the default render, per the low-bandwidth requirement (brief §2.2/§6). The "Directions" button is the only button per card — one clear action, not a card full of icon buttons the user has to interpret.

**Six-Step Journey (shared component, two contexts).** On the marketing site it's horizontal (desktop) collapsing to vertical (mobile) — matches the existing `.flow-container` grid behavior in `css/styles.css:405-411`, just needs the interactive hover/tap states layered on (§3.2). In the employee app it's vertical-only, always, with one state addition the marketing version doesn't need: a filled/active/upcoming visual state per step (done = green check per the new `--green-success` token, current = filled blue dot with a subtle pulse, upcoming = outlined grey). This is the single component in the whole system that most needs a real state machine, not just a static graphic — spend the interaction-design budget here over any other component.

### 6b.3 States — the part a pitch deck never shows and diligence always checks

Every data-driven surface needs five states designed, not just the happy path. Current build has exactly one (`css/styles.css` modal is display:none/block only — no loading, no error). Minimum state set per component:

| State | Facility Finder | Demo Form | Journey Tracker |
|---|---|---|---|
| **Empty** | "No ESIC facilities found within 5km — try expanding your search" + expand-radius action, never a dead end | — | Pre-onboarding: greyed tracker, "Your journey starts once your employer confirms access" |
| **Loading** | Skeleton cards (3, matching real card height) — no spinner, per §4 | Button label → "Sending…", disabled, no layout shift | N/A (server-driven on load, skeleton once) |
| **Success** | Cards populate in place, no full-page transition | Green confirmation panel replacing the form in-place: "A specialist will call within 1 business day" — specific promise, not "Thanks!" | Step animates to filled state |
| **Error** | "Couldn't load facilities — check your connection" + Retry button, cached last-known list still shown below if available (offline-first per §4) | Inline field-level errors (red, below the specific input, not a top-of-form banner that disconnects error from cause) + one general error if submission itself fails | "Couldn't sync your latest status — showing what we last saved" + timestamp |
| **Offline** | Cached facility list with "Last updated 2 hours ago" label — not an error state, a calm fact | Save as draft locally, submit on reconnect | Same cached-with-timestamp pattern |

This table is the actual deliverable of a UX pass — a visual designer can reskin colors from a Figma file, but nobody catches a missing error state until it ships broken. Design these five states for every future component as a standing rule, not just for these three.

### 6b.4 Interaction & usability heuristics applied

Run every new screen against these before calling it done — this is Nielsen's heuristics, filtered for this specific audience rather than applied generically:

- **Visibility of system status:** always true, no silent waits (states table above).
- **Match between system and real world:** "Get directions," not "Navigate to endpoint"; "You are here" tracker language, not "Status: In Progress." Plain language isn't a copy nicety, it's a heuristic requirement for a low-literacy audience.
- **User control & escape hatches:** every sub-screen has a Home affordance (§6b.1); the demo modal closes on outside-click, Escape, and an explicit ×  — already correctly implemented in `js/script.js:46-59`, keep this discipline as new modals/sheets get added.
- **Error prevention over error messages:** e.g., phone-number field in the demo form should format-validate on blur, not just on submit — catching a typo before the round-trip is worth more than a well-worded error after.
- **Recognition over recall:** the language switcher showing scripts in their own script (§4) rather than ISO codes ("en"/"hi") is this heuristic applied directly.
- **Flexibility for expert vs. novice:** HR admin console (§6) can afford filters, exports, bulk actions — the employee app should never grow these; resist any future request to "add a settings/advanced view" to the employee surface. That instinct is where consumer apps drift away from the audience they were built for.

### 6b.5 Responsive & input model

- Marketing site: standard 3-tier breakpoint (mobile / tablet / desktop) — current CSS already does this reasonably at 768px (`css/styles.css:884`); add a tablet-specific tier (~1024px) since the current build jumps straight from desktop grid to mobile-stack, leaving tablet widths (common on shared factory-floor/HR-office devices) inheriting awkward desktop spacing.
- Employee app: **design mobile-only, first.** Don't build a responsive employee-app layout that "also works" on desktop — this audience is phone-native; a desktop-adapted version, if ever needed, is a different design pass, not a breakpoint away.
- Tap targets: 44×44px minimum everywhere on the employee surface (iOS HIG baseline) — larger than the marketing site needs, because tap-accuracy correlates with device quality and this audience skews toward older, smaller, cheaper screens.

---

## 7. Design system deltas (concrete tokens to update)

```
--blue-primary:   #0066B3 → #0057A3   (deepen)
--orange-accent:  #FF6B35 → #FF6B4A   (warm shift, employee-surface only)
--green-success:  (new)   #1E8E5A    (confirmation states, use sparingly)
--font-indic:      (new)   'Noto Sans Devanagari', matched-weight pairing with existing --font-body
```

Spacing/radius/shadow tokens from the current build are sound Apple-adjacent choices — keep them. The gap was never the numbers, it was script coverage and color specificity for two different audiences. Fix those two things and the existing system scales.

---

## 8. Sequencing recommendation

If resourcing forces a choice, in priority order:
1. **Facility Finder + Step-Journey Tracker** (employee app) — the actual value prop, and the marketing site's hero asset depends on this existing to screenshot honestly.
2. **Marketing site trust/positioning upgrades** (§3.2) — cheapest, highest fundraising leverage, mostly copy + component polish on an already-sound structure.
3. **Devanagari type pairing rollout** — unblocks every future employee-facing screen from day one; retrofitting later is expensive and visually obvious when done wrong.
4. **Demo form real states** — small, but a diligence-visible unfinished edge.
5. **HR Admin Console** (one representative screen minimum) — completes the fundraising narrative.

This order optimizes for the fastest path to *a coherent, honest, fundable story* — not the fastest path to a prettier homepage. That's the actual brief, even where it isn't stated outright: make this fundable, and make it real enough that the funding survives contact with a product demo.
