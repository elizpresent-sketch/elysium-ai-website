# ELIZIUM AI Website — Handover
_Last updated: 2026-05-24 — Signal v2 config + Live Emotional Data fallback architecture_

---

## 1. Project

**Name:** ELIZIUM AI
**Local folder:** `/Users/elizavetazhuravleva/Desktop/elysium-ai-website`
**Branch:** `platform-company-restructure`

### Hard Constraints — Never Override
- Branch `platform-company-restructure` has been pushed and is deployed to Vercel preview. Do NOT merge to `main` without an explicit decision from the user.
- Do NOT redesign the homepage — it is visually final.
- Do NOT change navbar, footer, or any page layout unless the task explicitly requires it.
- Personal portfolio at `/Users/elizavetazhuravleva/Downloads/UNI/MP/ELIZAVETA_WEBSITE/04_final_site` — completely separate project, do not touch.
- All copy/written text — must remain word-for-word.
- All routes/hrefs — must remain unchanged.
- Read all target files before editing. Smallest possible changes only.

---

## Signal Reaction System — MVP Confirmed on Vercel Preview

Date confirmed: 23 May 2026

Status: LOCKED / WORKING

The Signal Reaction System has now been confirmed in both local development and Vercel Preview.

Confirmed flow:
- User clicks a Signal of the Day reaction button on the deployed Vercel Preview.
- Frontend visually registers the selected reaction.
- API route `/api/signal-reaction` receives the reaction payload.
- Server adds timestamp and user_agent.
- API route forwards payload to Make webhook via `MAKE_SIGNAL_REACTION_WEBHOOK_URL`.
- Make scenario receives the webhook.
- Google Sheets receives a new row in `ELIZIUM Signal Reactions`.

Confirmed Google Sheet columns:
- reaction
- signal_id
- source_page
- timestamp
- user_agent

Important note:
The UI status may move from “Recording…” to “Response Registered” very quickly because the backend response is fast. This is not a bug. A small intentional delay can be added later for cinematic pacing, but should not be changed during the current lock-in unless specifically requested.

Confirmed deployment context:
- Branch: `platform-company-restructure`
- Vercel environment: Preview
- Signal reaction integration included after commit `97d0ac3 Add Signal reaction webhook integration`
- A later empty commit was used only to trigger Vercel Preview deployment.

Do not change:
- `src/app/api/signal-reaction/route.ts`
- Signal reaction payload structure
- Make webhook connection
- Google Sheets column structure
unless a new scoped task is explicitly opened.


## ══════════════════════════════════════════════
## SIGNAL V2 CONFIG + LIVE EMOTIONAL DATA — 2026-05-24
## ══════════════════════════════════════════════

### 1. Pass Status

Signal v2 architecture introduced. TypeScript: 0 errors. Build: ✓.

---

### 2. New File

**`src/lib/signals.ts`** — single source of truth for the active Signal of the Day and live emotional data fallback.

Exports:
- `Reaction` — union type: `"anxiety" | "interest" | "trust" | "discomfort" | "emptiness"`
- `REACTION_LABELS` — map of lowercase reaction → display label (e.g. `anxiety → "Anxiety"`)
- `Signal` — interface for a full signal config object
- `ACTIVE_SIGNAL` — the current active signal (update here when rotating signals)
- `EmotionalMetric` — interface for a live data metric tile
- `LIVE_EMOTIONAL_FALLBACK` — static fallback array for §06 Live Emotional Data tiles

---

### 3. Homepage Changes (page.tsx)

Six hardcoded values replaced with config references. **Visual output is identical.**

| Was | Now |
|-----|-----|
| `"signal-2026-05-23"` in handler | `ACTIVE_SIGNAL.signal_id` |
| `"homepage_signal_of_the_day"` in handler | `ACTIVE_SIGNAL.source_page` |
| `"67%"` in §02 display | `ACTIVE_SIGNAL.statistic` |
| `"experienced anxiety..."` in §02 display | `ACTIVE_SIGNAL.statement` |
| `["Anxiety", "Interest", ...]` array in §02 | `ACTIVE_SIGNAL.reactions` + `REACTION_LABELS` |
| 4 hardcoded `<DataTile>` in §06 | `LIVE_EMOTIONAL_FALLBACK.map(...)` |

---

### 4. Make / Google Sheets — No Change Required

The signal-reaction API route is **not touched**. Payload sent to Make is identical:
`{ reaction, signal_id, source_page, timestamp, user_agent }`

Google Sheets column mapping (A–E) remains exactly as before. No Make scenario change needed.

---

### 5. How to Rotate to a New Signal

Edit only `src/lib/signals.ts` — update `ACTIVE_SIGNAL`:
- `signal_id` — new unique ID (e.g. `"signal-2026-06-01"`)
- `date`, `theme`, `statistic`, `statement`
- `reactions` array if the set changes (also update `ALLOWED_REACTIONS` in `src/app/api/signal-reaction/route.ts` if adding new values)

No other file needs to change.

---

### 6. Future Aggregation — Google Sheets Summary Sheet (not yet built)

When real reaction counts are available, create a **new summary sheet** with these columns:

```
signal_id | total_responses
| anxiety_count  | interest_count  | trust_count  | discomfort_count  | emptiness_count
| anxiety_percent| interest_percent| trust_percent| discomfort_percent| emptiness_percent
| last_updated
```

Then replace `LIVE_EMOTIONAL_FALLBACK` with a fetch from this summary sheet (via a new `/api/signal-summary` route or a revalidated server component). Do not implement until explicitly instructed.

---

## ══════════════════════════════════════════════
## HOMEPAGE VISUAL MVP LOCK — 2026-05-23
## ══════════════════════════════════════════════

### 1. HOMEPAGE LOCK STATUS

**The homepage visual MVP is locked on branch `platform-company-restructure`.**

- Future homepage changes should be tiny only: image swaps, text tweaks, spacing refinements.
- Do not restart homepage redesign unless explicitly instructed.
- Next major work should move to secondary pages and/or Signal Reaction System MVP.

---

### 2. FINAL HOMEPAGE STRUCTURE

Locked homepage flow (do not reorder):

```
§01 Hero
§02 Signal of the Day
§03 Emotional Choice
§04 Emotional Spaces
§05 ELIZIUM Method
§06 Live Emotional Data
§07 Featured Experience
§08 Partner Access / For Brands
§08b Hidden Access stripe
§09 Private Access / inquiry form
Footer
```

---

### 3. HERO FINAL STATE

- Hero is now **question-led**, not the old left-aligned poster layout.
- **Desktop asset:** `generated/elizium-hero-question-wide-warm.webp`
- **Mobile asset:** `generated/elizium-hero-question-mobile-warm-4x5.webp`
- Hero question is live HTML text, not baked into the image:
  > "What remains of the human when the system learns to understand them better than they understand themselves?"
- **Hero buttons:**
  - `ENTER PLATFORM` → `/platform`
  - `SIGNAL` → scrolls to Signal of the Day section (`#signal-of-the-day`)
- Platform status strip removed from hero — it was not part of the reference flow.
- Hero eyebrow label ("System Signal — 01") removed — it was unnecessary.

---

### 4. SIGNAL OF THE DAY FINAL STATE

- Signal of the Day is visually aligned to the reference block.
- **Background image:** `generated/elizium-signal-eye-data-optimised.webp`
- **Scroll target:** `id="signal-of-the-day"` with `scrollMarginTop: "80px"` (clears fixed nav on SIGNAL click)
- **Section padding:** `py-12 lg:py-24` — taller than other sections to read as a standalone cinematic panel
- **Content:**
  - `67%` — large display figure (font-display)
  - `"experienced anxiety when AI began to speak too humanly."`
  - Signal State / Active pulsing indicator
  - Five reaction buttons: **ANXIETY / INTEREST / TRUST / DISCOMFORT / EMPTINESS**
- **Reaction buttons:** frontend-only. `selectedReaction` state in React. No API, no Make, no Sheets, no analytics.
- **Reaction button column:** constrained to `max-w-[340px] ml-auto` on desktop so eye/pupil image remains visible. Full-width on mobile.
- **Full Signal Reaction System MVP** (save reactions to backend) must be built as a **separate explicit pass** — do not add now.

---

### 5. EMOTIONAL CHOICE FINAL STATE

- Visually accepted and locked.
- Paragraph text capped at `lg:max-w-[280px]` and line-breaks cleanly after the first sentence on desktop (`<br className="hidden lg:block" />`).
- Do not redesign this section unless explicitly instructed.

---

### 6. HIDDEN ACCESS FINAL STATE

- Visually approved and locked.
- **Image:** `generated/elizium-hidden-access-eye-strip.webp`
- Desktop button placement approved: button is left of the eye, not over the pupil.
- Mobile Hidden Access is acceptable (eye is subtle — intentional).
- Do not restructure this section.

---

### 7. INTEGRATION STATUS (unchanged — live)

Inquiry integration remains live and untouched:

```
homepage/contact forms → POST /api/inquiry → Make webhook → Google Sheets
```

**Do not touch any of these:**
- `src/app/api/inquiry/route.ts`
- `src/components/ui/ContactForm.tsx`
- `.env.local`
- Vercel env vars (`MAKE_WEBHOOK_URL`)
- Make scenario "Integration Webhooks"
- Google Sheets "ELIZIUM Inquiry Log"

Signal reaction buttons are **separate** from inquiry integration and are **not connected yet**.

---

### 8. LOCAL GIT STATE / IGNORE LIST

- `.claude/launch.json` may appear as modified locally — do not commit unless explicitly needed.
- `public/images/elysium-ai/dark/generated/elizium-hero-question-mobile.webp` may appear untracked and unused — do not commit unless code references it.
- Main used assets are the warm hero images and hidden-access eye strip, already committed.

---

### 9. NEXT RECOMMENDED WORK

**Do not start these now — recorded here for planning only.**

**Phase A — Secondary pages MVP: ✓ COMPLETE (2026-05-23)**
- `/platform` — Signal Output section added, Robotics image fixed ✓
- `/method` — image strip + Platform Output section added ✓
- `/future-human` — §04 emotional journey language + §06 storm banner CTA ✓
- `/for-brands` — hero image column + Partnership Formats section ✓
- `/contact` — Private Inquiry headline + scroll-to-form button ✓
- Footer — audited, adequate as-is (social links + Terms pending when accounts exist)

**Phase B — Signal Reaction System MVP (after secondary pages):**
- Frontend reaction → POST to new `/api/reaction` route → storage via Make/Sheets or Airtable
- Simple emotional pattern display (aggregate reactions, no personal data stored client-side)

---

### 10. HARD CONSTRAINTS FOR ALL FUTURE CHATS

- Do not merge `platform-company-restructure` to `main` without explicit instruction.
- Do not git push unless explicitly asked.
- Do not touch API / integration / env vars unless the task is specifically about integration.
- Do not expose `/vision` or `/private-access` in navigation.
- Do not redesign the homepage from scratch.
- Do not add Signal reaction backend until the Signal Reaction System MVP pass is explicitly started.
- Always read HANDOVER.md in full before editing any file.

---

### Opening Prompt for Next Claude Code Chat (Current — Homepage Locked)

Paste this verbatim:

---

> You are continuing work on the ELIZIUM AI website.
>
> Branch: `platform-company-restructure` (pushed, deployed to Vercel preview — do NOT merge to `main` without explicit instruction).
> Dev server: `http://localhost:3000`
> Do not git push unless explicitly asked.
>
> Read HANDOVER.md in the project root first and follow it exactly. Before editing any file, read it first.
>
> CONTEXT:
> The homepage visual MVP is **locked** as of 2026-05-23. Do NOT redesign it. Do NOT change spacing, images, typography, layout, animation, navbar, footer, or any page design unless the task explicitly requires a small targeted fix.
>
> Integration is fully live:
> - `/api/inquiry` validates payloads and POSTs to `MAKE_WEBHOOK_URL` (server-side only).
> - Make scenario "Integration Webhooks": Webhooks → Google Sheets "ELIZIUM Inquiry Log" Add a Row.
> - Both `homepage_private_access` and `contact_page` confirmed in Sheets, locally and on live Vercel preview.
> - `MAKE_WEBHOOK_URL` is set in Vercel for Production and Preview.
> - TypeScript: 0 errors. Build: ✓.
>
> Signal reaction buttons are frontend-only — not connected to backend yet. Do not add backend for reactions unless explicitly asked.
>
> Before starting any task, state clearly what you are going to do and which files you will touch. Read all target files before editing. Smallest possible changes only.
>
> Hard constraints:
> - Do not redesign homepage or any page.
> - Do not change navbar/footer.
> - Do not expose `/private-access` or `/vision`.
> - Do not add `NEXT_PUBLIC_` env vars.
> - Do not commit `.env.local`.
> - Do not merge `platform-company-restructure` to `main` without explicit instruction.
> - Do not git push unless explicitly asked.
> - Do not add Signal reaction backend until explicitly instructed.
> - Read all target files before editing.

---

## ══════════════════════════════════════════════
## SECONDARY PAGES UPGRADE — 2026-05-23
## ══════════════════════════════════════════════

### 1. Pass Status

All five secondary pages upgraded to match locked homepage style and ELIZIUM platform narrative.
TypeScript: 0 errors. `npm run build`: ✓ Compiled successfully, 14 static pages.

---

### 2. Files Changed

| File | Changes |
|------|---------|
| `src/app/platform/page.tsx` | Robotics section: replaced `creatingworlds.webp` → `06-creative-production-stage.webp`, `objectFit` `contain` → `cover`. Added Signal Output 3-card section between System Design and Robotics. |
| `src/app/method/page.tsx` | Added `FadeImage` component + Image import. Added method image strip (`elizium-method-symbols-set-clean-optimised.webp`) between hero and Five Stages. Added Platform Output 3-card section with Future Human reference. |
| `src/app/future-human/page.tsx` | §04 Audience Interaction: replaced QR/logistics copy with emotional journey language (Before/During/After grid). §06 CTA: added cinematic `featured-experience-future-human-storm-banner.webp` background (absolute, left 40% on desktop, gradient overlay). |
| `src/app/for-brands/page.tsx` | Added `FadeImage` component + Image import. Hero restructured to 12-col grid: existing content in `lg:col-span-7`, new `partner-platform-wave-room.webp` in `lg:col-span-5`. Added Partnership Formats row section (3 rows) before CTA. |
| `src/app/contact/page.tsx` | Headline changed to "Private / Inquiry". Context paragraph updated to brands/venues/investors audience. `<a href="mailto:...">Send Message</a>` → `<button>` scroll-to-form. `id="inquiry-form"` added to form section. |

---

### 3. New Section Inventory

**`/platform` — Signal Output** (between System Design and Robotics):
- 3-card grid: Emotional Archives / Collective Response Patterns / Partner Insight Reports

**`/method` — Method Image Strip** (between hero and Five Stages):
- Full-width `aspect-[21/7]` image: `elizium-method-symbols-set-clean-optimised.webp`

**`/method` — Platform Output** (between Five Stages and CTA):
- Intro text + Future Human deployment reference
- 3-card grid: Emotional Archives / Partner Signal Reports / Collective Pattern Data

**`/future-human` — §04 Audience Interaction** (replaced):
- Before: "Selected access — private invitation only"
- During: "Live emotional signal — recorded in real time"
- After: "Personal signal record — ongoing ELIZIUM world access"

**`/future-human` — §06 CTA** (background added):
- `featured-experience-future-human-storm-banner.webp` absolute behind content
- Gradient: `linear-gradient(to right, #050505 0%, #050505 20%, rgba 42%, transparent 100%)`

**`/for-brands` — Partnership Formats** (before CTA):
- 3 rows: Sponsorship / Cultural Partnership / Co-Commissioned Experience / Emotional Insight Access

---

### 4. Asset Keys (all confirmed present and loaded)

| Asset | Used in |
|-------|---------|
| `generated/elizium-method-symbols-set-clean-optimised.webp` | /method image strip |
| `generated/partner-platform-wave-room.webp` | /for-brands hero right column |
| `generated/featured-experience-future-human-storm-banner.webp` | /future-human §06 CTA background |
| `06-creative-production-stage.webp` | /platform Robotics section (replaces creatingworlds.webp) |

---

### 5. Hard Constraints (carry forward)

- Do NOT touch `src/app/api/inquiry/route.ts`, `src/components/ui/ContactForm.tsx`, `.env.local`, Vercel env vars, Make/Sheets integration.
- Do NOT connect Signal reactions to backend yet.
- Do NOT merge `platform-company-restructure` to `main` without explicit instruction.
- Do NOT git push unless explicitly asked.

---

### 6. Opening Prompt for Next Claude Code Chat

Paste this verbatim:

---

> You are continuing work on the ELIZIUM AI website.
>
> Branch: `platform-company-restructure` (pushed, deployed to Vercel preview — do NOT merge to `main` without explicit instruction).
> Dev server: `http://localhost:3000`
> Do not git push unless explicitly asked.
>
> Read HANDOVER.md in the project root first and follow it exactly. Before editing any file, read it first.
>
> CONTEXT:
> The homepage visual MVP is **locked** as of 2026-05-23. Do NOT redesign it.
>
> All secondary pages have been upgraded as of 2026-05-23:
> - `/platform`: Signal Output 3-card section added; Robotics image fixed.
> - `/method`: Method image strip added; Platform Output 3-card section added; Future Human deployment reference added.
> - `/future-human`: §04 Audience Interaction rewritten with emotional journey language (Before/During/After); §06 CTA has cinematic storm banner background.
> - `/for-brands`: Hero restructured with wave room image right column; Partnership Formats row section added.
> - `/contact`: "Private Inquiry" headline; scroll-to-form button; `id="inquiry-form"` on form section.
>
> Integration is fully live:
> - `/api/inquiry` validates payloads and POSTs to `MAKE_WEBHOOK_URL` (server-side only).
> - Make scenario "Integration Webhooks": Webhooks → Google Sheets "ELIZIUM Inquiry Log" Add a Row.
> - Both source_page values confirmed in Sheets, locally and on live Vercel preview.
> - `MAKE_WEBHOOK_URL` is set in Vercel for Production and Preview.
> - TypeScript: 0 errors. Build: ✓.
>
> Signal reaction buttons are frontend-only — not connected to backend yet.
>
> Before starting any task, state clearly what you are going to do and which files you will touch. Read all target files before editing. Smallest possible changes only.
>
> Hard constraints:
> - Do not redesign homepage or any page.
> - Do not change navbar/footer.
> - Do not expose `/private-access` or `/vision`.
> - Do not add `NEXT_PUBLIC_` env vars.
> - Do not commit `.env.local`.
> - Do not merge `platform-company-restructure` to `main` without explicit instruction.
> - Do not git push unless explicitly asked.
> - Do not add Signal reaction backend until explicitly instructed.
> - Read all target files before editing.

---

## ══════════════════════════════════════════════
## API FOUNDATION PASS — 2026-05-22
## ══════════════════════════════════════════════

### 1a. Dev Server

```
npm run dev       →  http://localhost:3000
npm run build     →  production build (use locally)
npx tsc --noEmit  →  TypeScript check — currently 0 errors
```

### 1b. Current Routes & Build Status

```
Route                   Type      Notes
────────────────────────────────────────────────────────────────
/                       Static    Homepage — DO NOT REDESIGN
/platform               Static
/method                 Static
/future-human           Static
/for-brands             Static
/company                Static
/contact                Static    Uses ContactForm component
/privacy                Static
/private-access         Static    HIDDEN — no inbound links
/vision                 Static    HIDDEN — no inbound links
/api/inquiry            Dynamic   NEW — POST handler, no external calls yet
```

Build result: `npm run build` → ✓ Compiled successfully, types clean.

### 1c. Homepage Section Order (do not reorder)
```
§01 Hero
§02 Signal of the Day
§03 Emotional Choice
§04 Emotional Spaces
§05 ELIZIUM Method
§06 Live Emotional Data
§07 Featured Experience
§08 Partner Access
§09 Private Access  ← contains the inquiry form
```

---

### 2. Files Changed in the Last Pass (API Foundation)

| File | Change |
|------|--------|
| `src/app/api/inquiry/route.ts` | **Created.** POST handler for all inquiry submissions. |
| `src/app/page.tsx` | `handleInquirySubmit` made `async`; `source_page` changed to `"homepage_private_access"`; `console.log` replaced with `fetch("/api/inquiry")`; `submitError` state added. |
| `src/components/ui/ContactForm.tsx` | Fake `setTimeout` replaced with real `fetch("/api/inquiry")`; `source_page: "contact_page"` added; `error` state added. |

No other files were touched. Navbar, footer, layout, and all other pages are unchanged.

---

### 3. Exact Current Form Behaviour

#### Homepage §09 — Private Access (`src/app/page.tsx`)

Fields: Full Name (`pa-name`), Company (`pa-company`), Email (`pa-email`), Inquiry Type chips (optional), Message (`pa-message`).

On submit → `POST /api/inquiry`:
```json
{
  "full_name": "...",
  "company": "...",
  "email": "...",
  "inquiry_type": "Partnership" | null,
  "message": "...",
  "source_page": "homepage_private_access"
}
```
- **Success** (`ok: true`): form hides, shows "Your inquiry has been received." + "Submit another inquiry" reset button.
- **Failure** (network error or non-2xx): small inline message above the submit button — "Something went wrong. Please try again." Form stays visible.

#### `/contact` — ContactForm (`src/components/ui/ContactForm.tsx`)

Fields: Name (`name`, required), Email (`email`, required), Organisation (`organisation`, optional), Interest dropdown (`interest`, required), Message (`message`, required).

On submit → `POST /api/inquiry`:
```json
{
  "name": "...",
  "email": "...",
  "organisation": "...",
  "interest": "Investor",
  "message": "...",
  "source_page": "contact_page"
}
```
- **Success**: component replaces with "RECEIVED — Thank you. Your inquiry has been received for review."
- **Failure**: red-tinted error line above submit button. Button re-enables.

---

### 4. API Route — `/api/inquiry`

**File:** `src/app/api/inquiry/route.ts`  
**Method:** POST only.

**Validation flow:**
1. Parse JSON → `400 { ok: false, error: "Invalid JSON" }` if not valid JSON.
2. Check `email` — must be string containing `@` → `400 { error: "Valid email required" }`.
3. Check `name` OR `full_name` — must be non-empty string → `400 { error: "Name required" }`. (Accepts either key to support both forms.)
4. Check `source_page` — must be exactly `"homepage_private_access"` or `"contact_page"` → `400 { error: "Invalid source" }`.
5. Pass: `console.log("[inquiry]", JSON.stringify(payload, null, 2))` server-side → `200 { ok: true }`.
6. Unexpected throw → `500 { ok: false, error: "Internal server error" }`.

**No external services called. No env vars read.**

---

### 5. Validation Rules & Current Limitations

**Validated:** email contains `@`, name/full_name non-empty, source_page is known value.

**Not validated (intentional for now):** email format beyond `@`, name length, message presence, company/organisation, inquiry type, duplicates, rate limiting.

**Known gap:** homepage form inputs (`pa-name`, `pa-email`) are missing the `required` HTML attribute — browser-level validation does not block empty submits on that form. The API server-side validation still catches empties.

---

### 6. Terminal Test Evidence

```bash
# VALID — homepage
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","company":"ACME","email":"test@example.com","inquiry_type":"Partnership","message":"Test","source_page":"homepage_private_access"}'
# → {"ok":true}

# VALID — contact page
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","organisation":"ACME","interest":"Investor","message":"Hello","source_page":"contact_page"}'
# → {"ok":true}

# 400 — missing email
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","source_page":"homepage_private_access"}'
# → {"ok":false,"error":"Valid email required"}

# 400 — missing name
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source_page":"contact_page"}'
# → {"ok":false,"error":"Name required"}

# 400 — invalid source_page
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test","email":"test@example.com","source_page":"unknown"}'
# → {"ok":false,"error":"Invalid source"}

# 400 — malformed JSON
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d 'not-json'
# → {"ok":false,"error":"Invalid JSON"}
```

---

### 7. What Is NOT Connected

| Service | Status |
|---------|--------|
| Make (Integromat) webhook | Not connected |
| Airtable | Not connected |
| Tally | Not connected |
| GA4 / Google Analytics | Not connected |
| Microsoft Clarity | Not connected |
| Email sending (Resend, SendGrid, etc.) | Not connected |
| OpenAI API | Not connected |
| Environment variables | None — no `.env.local` file exists |
| Any external HTTP call from the API | None |

---

### 8. Integration Complete

_All integration work is confirmed live. See LIVE INTEGRATION CONFIRMED section for final state and next-chat prompt._

---

### 9. Opening Prompt for Next Claude Code Chat

_See the LIVE INTEGRATION CONFIRMED section below — §4 contains the current verbatim opening prompt._

---

## ══════════════════════════════════════════════
## MAKE WEBHOOK SUPPORT PASS — 2026-05-22
## ══════════════════════════════════════════════

### 1. File Changed

| File | Change |
|------|--------|
| `src/app/api/inquiry/route.ts` | Optional `MAKE_WEBHOOK_URL` env var support added. All other files unchanged. |

No UI files, no page files, no navbar, no footer, no `.env.local`, no `.env.example` were touched in this pass.

---

### 2. How the API Now Behaves

#### Local mode — `MAKE_WEBHOOK_URL` not set (current state)

1. Parse + validate payload (email, name/full_name, source_page) — unchanged.
2. `console.log("[inquiry]", ...)` — unchanged.
3. Return `200 { ok: true, mode: "local" }`.

Both the homepage §09 form and the `/contact` form were confirmed working in local mode:
- Terminal showed `POST /api/inquiry 200` and printed the full inquiry payload.
- Success states display correctly in browser.

#### Webhook mode — `MAKE_WEBHOOK_URL` is set

1. Parse + validate payload — same.
2. `console.log("[inquiry]", ...)` — same.
3. `POST` validated payload JSON to `MAKE_WEBHOOK_URL`.
4. If Make returns non-2xx: log server-side → return `502 { ok: false, error: "Upstream error" }` → client shows "Something went wrong."
5. If Make fetch throws (network/DNS): log server-side → same 502.
6. If Make succeeds: return `200 { ok: true, mode: "webhook" }`.

The webhook URL is server-side only. It is never sent to the client or exposed in any response field.

---

### 3. TypeScript & Build

- `npx tsc --noEmit` → **0 errors**
- `npm run build` → **✓ Compiled successfully**, 14 static pages, `/api/inquiry` Dynamic

---

### 4. What Is NOT Connected

| Service | Status |
|---------|--------|
| Make (Integromat) webhook | **URL not yet added** — code is ready, env var is not set |
| Airtable | Not connected |
| Tally | Not connected |
| GA4 / Google Analytics | Not connected |
| Microsoft Clarity | Not connected |
| Email sending | Not connected |
| OpenAI API | Not connected |
| Environment variables | `.env.local` does not exist yet |

---

### 5. Exact Test Payloads (curl)

Run these once `MAKE_WEBHOOK_URL` is in `.env.local` and `npm run dev` has been restarted:

```bash
# Homepage §09 — should return { ok: true, mode: "webhook" }
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","company":"ACME","email":"test@example.com","inquiry_type":"Partnership","message":"Test message","source_page":"homepage_private_access"}'

# /contact form — should return { ok: true, mode: "webhook" }
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","organisation":"ACME","interest":"Investor","message":"Hello from contact","source_page":"contact_page"}'

# Without MAKE_WEBHOOK_URL set — returns { ok: true, mode: "local" }
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Local Test","email":"local@example.com","source_page":"homepage_private_access","message":"Local only"}'
```

---

### 6. Next Recommended Task — Add Make URL & Test

Steps for next session:

1. In Make.com, create a new scenario with a Webhook trigger module. Copy the webhook URL.
2. Create `.env.local` in the project root (never commit this file):
   ```
   MAKE_WEBHOOK_URL=https://hook.eu2.make.com/YOUR_SCENARIO_ID_HERE
   ```
3. Restart `npm run dev` so Next.js picks up the new env var.
4. Run the curl commands from §5 above and verify Make receives the payload.
5. In Make, add downstream modules: Airtable row creation, email notification, or both.

---

### 7. Opening Prompt for Next Claude Code Chat (Make Webhook Testing)

Paste this verbatim:

---

> You are continuing work on the ELIZIUM AI website.
>
> Branch: `platform-company-restructure`
> Dev server: `http://localhost:3000`
> Do not git push.
>
> Read HANDOVER.md in the project root first and follow it exactly. Before editing any file, read it first.
>
> CONTEXT:
> The homepage is visually final. Do NOT redesign it. Do NOT change spacing, images, typography, layout, animation, navbar, footer, or any page design unless explicitly required.
>
> The previous pass added optional Make webhook support to the API:
> - `src/app/api/inquiry/route.ts` — reads `process.env.MAKE_WEBHOOK_URL`; if set, POSTs the validated payload to Make; if not set, logs locally and returns `{ ok: true, mode: "local" }`.
> - No UI changes. No `.env.local` exists yet.
> - TypeScript: 0 errors. Build: ✓.
>
> TASK — Connect the real Make webhook and confirm it works end-to-end.
>
> Do NOT change any form UI, page design, navbar, or footer.
> Do NOT expose the webhook URL in client-side code or any NEXT_PUBLIC_ var.
>
> Please do exactly this:
>
> 1. Read:
>    - `src/app/api/inquiry/route.ts`
>    - `.env.local` (may not exist yet — expected)
>    - `.gitignore`
>
> 2. Confirm `.env.local` is gitignored (line `.env*.local` should already be present — do not duplicate it).
>
> 3. Create `.env.local` with the Make webhook URL I will provide:
>    ```
>    MAKE_WEBHOOK_URL=PASTE_URL_HERE
>    ```
>
> 4. Optionally create `.env.example` (safe to commit) with an empty placeholder:
>    ```
>    # Make webhook — paste your scenario webhook URL here
>    MAKE_WEBHOOK_URL=
>    ```
>
> 5. Restart the dev server (`npm run dev`) — necessary for Next.js to pick up the new env var.
>
> 6. Run the following curl commands and confirm `{ ok: true, mode: "webhook" }`:
>    ```bash
>    # Homepage §09
>    curl -s -X POST http://localhost:3000/api/inquiry \
>      -H "Content-Type: application/json" \
>      -d '{"full_name":"Test User","company":"ACME","email":"test@example.com","inquiry_type":"Partnership","message":"Test message","source_page":"homepage_private_access"}'
>
>    # /contact form
>    curl -s -X POST http://localhost:3000/api/inquiry \
>      -H "Content-Type: application/json" \
>      -d '{"name":"Test User","email":"test@example.com","organisation":"ACME","interest":"Investor","message":"Hello from contact","source_page":"contact_page"}'
>    ```
>
> 7. Report:
>    - Whether Make received the payloads (check Make scenario execution history)
>    - Terminal output from the dev server
>    - curl response bodies
>    - Any errors
>
> Hard constraints:
> - Do not redesign homepage or any page.
> - Do not change navbar/footer.
> - Do not expose `/private-access` or `/vision`.
> - Do not add NEXT_PUBLIC_ env vars.
> - Do not commit `.env.local`.
> - Do not git push.
> - Read all target files before editing.
> - Only touch `.env.local`, `.env.example` (optional), and no other files unless a bug is found.

---

## ══════════════════════════════════════════════
## GOOGLE SHEETS INTEGRATION PASS — 2026-05-23
## ══════════════════════════════════════════════

### 1. Integration Status

| Component | Status |
|-----------|--------|
| Make scenario "Integration Webhooks" | **Active** — set to "Immediately as data arrives" |
| Make: Webhooks → Google Sheets Add a Row | **Active** — 2 operations per submission |
| Google Sheets "ELIZIUM Inquiry Log" | **Receiving rows** — confirmed |
| `.env.local` with `MAKE_WEBHOOK_URL` | **Present** locally (never committed) |
| Homepage §09 Private Access form | **Confirmed end-to-end** — local and live Vercel |
| `/contact` ContactForm | **Confirmed end-to-end** — both source_page values seen in Sheets |
| Vercel environment variable | **Set** — Production and Preview |

**Setup issue resolved:** Make had unsaved recovered changes after a prior session. The Google Sheets module was inactive until the recovered changes were explicitly recovered and saved in the Make editor. After saving, the scenario ran correctly. If Make stops writing to Sheets in future, check for unsaved/recovered changes in the scenario editor before debugging code.

---

### 2. Integration Architecture

```
Browser form submit
  → POST /api/inquiry  (Next.js server-side route)
      validates payload
      console.log server-side
      POST to MAKE_WEBHOOK_URL  (server-side only — never exposed to client)
        → Make "Integration Webhooks" scenario
            → Google Sheets "ELIZIUM Inquiry Log" — Add a Row
  → { ok: true, mode: "webhook" } returned to browser
  → Form shows success state
```

The webhook URL lives in `.env.local` only. Not in source code, not in any committed file, not in any `NEXT_PUBLIC_` variable.

---

### 3. What Is Connected vs Not

| Service | Status |
|---------|--------|
| Make webhook | **Connected** — local and Vercel |
| Google Sheets "ELIZIUM Inquiry Log" | **Receiving data** — local and live confirmed |
| Vercel env var `MAKE_WEBHOOK_URL` | **Set** — Production + Preview |
| Airtable | Not connected |
| GA4 / Google Analytics | Not connected |
| Microsoft Clarity | Not connected |
| Email sending | Not connected |
| OpenAI API | Not connected |

---

### 4. All Tests Confirmed

_All tests completed as of 2026-05-23. See LIVE INTEGRATION CONFIRMED section below for final state._

---

### 6. Exact Test Payloads (curl — local, with MAKE_WEBHOOK_URL set)

```bash
# /contact form — not yet end-to-end tested, should return { ok: true, mode: "webhook" }
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Contact Test","email":"contact@example.com","organisation":"Test Org","interest":"Investor","message":"Contact form end-to-end test","source_page":"contact_page"}'

# Homepage §09 — already confirmed, for regression testing
curl -s -X POST http://localhost:3000/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Homepage Test","company":"ACME","email":"home@example.com","inquiry_type":"Partnership","message":"Homepage end-to-end test","source_page":"homepage_private_access"}'
```

---

### 7. Opening Prompt for Next Claude Code Chat

_See the LIVE INTEGRATION CONFIRMED section below — §4 contains the current verbatim opening prompt._

_Historical prompt (Contact Form Test + Vercel Deploy) — superseded:_

---

> You are continuing work on the ELIZIUM AI website.
>
> Branch: `platform-company-restructure`
> Dev server: `http://localhost:3000`
> Do not git push.
>
> Read HANDOVER.md in the project root first and follow it exactly. Before editing any file, read it first.
>
> CONTEXT:
> The homepage is visually final. Do NOT redesign it. Do NOT change spacing, images, typography, layout, animation, navbar, footer, or any page design unless explicitly required.
>
> Integration status as of 2026-05-23:
> - `src/app/api/inquiry/route.ts` — reads `MAKE_WEBHOOK_URL`; if set, POSTs validated payload to Make; returns `{ ok: true, mode: "webhook" }`.
> - Make scenario "Integration Webhooks" is live: Webhooks → Google Sheets "ELIZIUM Inquiry Log" Add a Row.
> - Homepage §09 form confirmed end-to-end locally — rows writing to Sheets.
> - `/contact` form: end-to-end test still pending.
> - `MAKE_WEBHOOK_URL` is in `.env.local` locally but NOT yet in Vercel.
> - TypeScript: 0 errors. Build: ✓.
>
> TASK — Two things, in order:
>
> 1. Confirm `/contact` form works end-to-end locally.
> 2. Guide the Vercel environment variable setup and production test.
>
> Do NOT change any form UI, page design, navbar, footer, or API code unless a bug is found.
> Do NOT expose the webhook URL in client-side code or any `NEXT_PUBLIC_` var.
> Do NOT git push.
>
> Please do exactly this:
>
> 1. Run this curl command and confirm `{ ok: true, mode: "webhook" }`:
>    ```bash
>    curl -s -X POST http://localhost:3000/api/inquiry \
>      -H "Content-Type: application/json" \
>      -d '{"name":"Contact Test","email":"contact@example.com","organisation":"Test Org","interest":"Investor","message":"Contact form end-to-end test","source_page":"contact_page"}'
>    ```
>
> 2. Report whether Make shows a successful execution and whether a row appeared in Google Sheets.
>
> 3. If the curl test passed, provide step-by-step Vercel instructions (do not execute them — the user will do this manually):
>    - Vercel → Project → Settings → Environment Variables
>    - Add `MAKE_WEBHOOK_URL` = (value from `.env.local`) — Production only, no `NEXT_PUBLIC_` prefix
>    - Trigger a redeploy from the Vercel dashboard (no code change needed)
>    - After redeploy: submit the live homepage §09 form, confirm a row appears in Google Sheets
>
> 4. Update HANDOVER.md with confirmed results after each test passes.
>
> Hard constraints:
> - Do not redesign homepage or any page.
> - Do not change navbar/footer.
> - Do not expose `/private-access` or `/vision`.
> - Do not add `NEXT_PUBLIC_` env vars.
> - Do not commit `.env.local`.
> - Do not git push.
> - Read all target files before editing.
> - Only make code changes if a bug is found during testing.

---

## ══════════════════════════════════════════════
## LIVE INTEGRATION CONFIRMED — 2026-05-23
## ══════════════════════════════════════════════

### 1. Final Integration Status

| Component | Status |
|-----------|--------|
| Make scenario "Integration Webhooks" | **Active** — "Immediately as data arrives", 2 operations |
| Make: Webhooks → Google Sheets Add a Row | **Active** — confirmed working |
| Google Sheets "ELIZIUM Inquiry Log" | **Receiving rows** — local and live confirmed |
| `MAKE_WEBHOOK_URL` locally | **Present** in `.env.local` (never committed) |
| `MAKE_WEBHOOK_URL` on Vercel | **Set** — Production and Preview |
| Deployment | **Live** — deployed from `platform-company-restructure` |
| Homepage §09 (`homepage_private_access`) | **Confirmed end-to-end** — local and live Vercel preview |
| `/contact` (`contact_page`) | **Confirmed end-to-end** — both source_page values seen in Sheets |

---

### 2. What Is Connected vs Not

| Service | Status |
|---------|--------|
| Make webhook | **Connected** — local and Vercel |
| Google Sheets "ELIZIUM Inquiry Log" | **Receiving data** — local and live |
| Vercel env var `MAKE_WEBHOOK_URL` | **Set** — Production + Preview |
| Airtable | Not connected |
| GA4 / Google Analytics | Not connected |
| Microsoft Clarity | Not connected |
| Email sending | Not connected |
| OpenAI API | Not connected |
| Spam protection / rate limiting | Not implemented |
| Client-side form validation (homepage) | Incomplete — `pa-name` and `pa-email` missing `required` attribute |

---

### 3. Pending Decisions & Optional Future Work

**Decision required:**
- Merge `platform-company-restructure` into `main` to point the production domain at this version. No code change needed — this is a Git/Vercel decision only. Do not merge without explicit instruction.

**Optional future enhancements (no priority order):**
- GA4 / Google Analytics
- Microsoft Clarity
- Email notification on new inquiry (Resend or SendGrid, via Make or direct)
- Spam protection / rate limiting on `/api/inquiry`
- Add `required` attributes to homepage §09 form inputs (`pa-name`, `pa-email`) for browser-level validation
- Tally or Airtable as alternative/additional data store

---

### 4. Opening Prompt for Next Claude Code Chat

Paste this verbatim:

---

> You are continuing work on the ELIZIUM AI website.
>
> Branch: `platform-company-restructure` (pushed, deployed to Vercel preview — do NOT merge to `main` without explicit instruction).
> Dev server: `http://localhost:3000`
> Do not git push unless explicitly asked.
>
> Read HANDOVER.md in the project root first and follow it exactly. Before editing any file, read it first.
>
> CONTEXT:
> The homepage is visually final. Do NOT redesign it. Do NOT change spacing, images, typography, layout, animation, navbar, footer, or any page design unless explicitly required.
>
> Integration is fully live as of 2026-05-23:
> - `/api/inquiry` validates payloads and POSTs to `MAKE_WEBHOOK_URL` (server-side only).
> - Make scenario "Integration Webhooks": Webhooks → Google Sheets "ELIZIUM Inquiry Log" Add a Row.
> - Both `homepage_private_access` and `contact_page` source_page values confirmed in Sheets, locally and on live Vercel preview.
> - `MAKE_WEBHOOK_URL` is set in Vercel for Production and Preview.
> - TypeScript: 0 errors. Build: ✓.
>
> Before starting any task, state clearly what you are going to do and which files you will touch. Read all target files before editing. Smallest possible changes only.
>
> Hard constraints:
> - Do not redesign homepage or any page.
> - Do not change navbar/footer.
> - Do not expose `/private-access` or `/vision`.
> - Do not add `NEXT_PUBLIC_` env vars.
> - Do not commit `.env.local`.
> - Do not merge `platform-company-restructure` to `main` without explicit instruction.
> - Read all target files before editing.

---

## ══════════════════════════════════════════════
## ORIGINAL HANDOVER (earlier sessions)
## ══════════════════════════════════════════════

## 2. Tech Stack & Commands

- **Next.js 14.2**, App Router, TypeScript, Tailwind CSS v3, Framer Motion
- `npm run dev` — dev server
- `npm run build` — production build (takes >45s, run locally not in sandbox)
- `npx tsc --noEmit` — TypeScript check (currently passes: 0 errors)

### Key System Constants (every page file)
```ts
const W   = "max-w-[1440px] mx-auto px-6 lg:px-12"  // shared container
const BG  = "#050505"                                  // shared background
```

### Font
Cinzel via `--font-display` CSS variable, Tailwind class `font-display`.
Always used as: `font-display font-normal uppercase tracking-[0.11em] leading-[0.97]`

### Palette (tailwind.config.ts)
```
porcelain:      #050505   primary background
pearl:          #080808   alternate background
graphite:       #E2E8EE   primary text (near-white)
graphite-mid:   #C8CDD2   secondary headings
graphite-light: #8E949A   body text (muted)
silver-light:   #1C2530   borders / dividers
silver-mid:     #707880   secondary labels
silver-dark:    #6B7278   captions
violet.soft:    #8B9CF4
violet.muted:   #6B7DE8
letterSpacing.superwide:  0.25em
letterSpacing.ultrawide:  0.35em
```

### Heading Scale (always clamp() inline style, never Tailwind responsive classes)
```
Hero h1:           clamp(3.25rem, 6vw, 5.75rem)
Section h2 (main): clamp(2.4rem, 4vw, 4rem)
Section h2 (sub):  clamp(2.25rem, 3.6vw, 3.6rem)
```

### Section Padding Rhythm
`py-14 lg:py-20` on every section.

---

## 3. Routes & Pages

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/platform` | `src/app/platform/page.tsx` |
| `/future-human` | `src/app/future-human/page.tsx` |
| `/vision` | `src/app/vision/page.tsx` |
| `/private-access` | `src/app/private-access/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |

### Shared Components
```
src/components/ui/CTASection.tsx     — bottom CTA block (left-aligned — fixed this session)
src/components/ui/PlatformCard.tsx   — used on /platform
src/components/ui/FeatureGrid.tsx    — used on /platform
src/components/ui/SectionLabel.tsx   — small label tag
src/components/ui/ContactForm.tsx    — used on /contact
src/components/layout/Navbar.tsx
src/components/layout/Footer.tsx
```

### Navbar Links (do not change hrefs)
```
Platform      → /platform
Experience    → /future-human
Partnerships  → /private-access
Media         → /vision
Contact       → /contact
```

### Private Access Gate
`/private-access` — access code: `"ELIZIUM2026"` — do not change.

---

## 4. FadeImage Component

Defined inline in each page file — NOT a shared component. Changing props requires editing each page file separately.

```tsx
interface FadeImageProps {
  src: string; alt: string; className?: string; position?: string;
  fadeLeft?: number; fadeRight?: number; fadeTop?: number; fadeBottom?: number;
  sizes?: string; priority?: boolean; objectFit?: "cover" | "contain";
}
// objectFit="contain" → only for diagram/infographic images (e.g. 12-technology-layer-system.png)
// objectFit="cover"   → all photography (default)
```

---

## 5. Last Session: Files Changed

1. `src/components/ui/CTASection.tsx`
2. `src/app/page.tsx`
3. `src/app/vision/page.tsx`
4. `src/app/platform/page.tsx`
5. `src/app/future-human/page.tsx`

---

## 6. Last Session: Exact Changes Made

### CTASection.tsx
- `flex flex-col items-center text-center` → `flex flex-col items-start text-left`
- Removed the right-side decorative span from the label (was symmetrical rule, now left-only)
- Effect: all inner pages using CTASection are now left-aligned

### page.tsx (homepage)
- §02 s1.png image: removed `lg:max-w-[480px]` cage; fadeLeft 38→12; fadeTop/Bottom 14→12; aspect [4/5]→[3/4]
- §10 Media/Gallery: reverted from 2-col heading+thumbnail-grid to heading-above + full-width grid10.png at aspect-[16/9]
- §11 globe image: fadeLeft 22→10; fadeTop/Bottom 12→10; fadeRight 8→6

### vision/page.tsx
- Hero blockquote: removed `lg:text-7xl` — capped at md:text-6xl
- Market context image: removed `lg:max-w-[520px] lg:ml-auto`; fades reduced to 10/10/10/6
- All h2s: text-3xl md:text-4xl → clamp(2.25rem, 3.6vw, 3.6rem) inline style

### platform/page.tsx
- H1: text-4xl sm:text-5xl md:text-6xl → clamp(2.4rem, 4vw, 4rem)
- All h2s (3 occurrences): text-3xl md:text-4xl → clamp(2.25rem, 3.6vw, 3.6rem)
- System Design image: removed `lg:max-w-[520px] lg:ml-auto`
- Robotics image: removed `lg:max-w-[520px]` (kept order-1 lg:order-2)

### future-human/page.tsx
- §02 Human Emotion image: removed `lg:max-w-[340px] lg:ml-auto`; fades reduced to 12/12/12/8
- §03 AI Presence image: removed `lg:max-w-[380px]`; fades adjusted to 8/10/10/12

---

## 7. Image Files → Section/Page Assignment

All images: `public/images/elysium-ai/dark/`

### In use

| Filename | Used in | Section / context |
|---|---|---|
| `hero-current-expanded.png` | page.tsx | §01 Hero — full-bleed BG |
| `s1.png` | page.tsx | §02 Platform Overview — right col aspect-[3/4] |
| `s2.png` | page.tsx, /vision | §03 First Flagship right col; /vision hero aspect-[21/9] |
| `12-technology-layer-system.png` | page.tsx, /platform | §04 + §12 Technology — objectFit="contain" |
| `05-audience-system-network.png` | page.tsx, /future-human | §05 Audience lg:col-span-7 aspect-[16/9]; FH §04 |
| `s5.png` | page.tsx, /platform, /future-human | §06 Creative Production; Platform Robotics; FH §03 placeholder |
| `s6.png` | page.tsx | §07 Partnerships — aspect-[16/9] top of right col |
| `09.png` | page.tsx, /contact | §09 Private Inquiry aspect-[4/3]; /contact header aspect-[21/7] |
| `grid10.png` | page.tsx, /platform | §10 Gallery full-width aspect-[16/9]; /platform hero aspect-[21/9] |
| `11about.png` | page.tsx, /vision | §11 About globe aspect-[4/5]; /vision Market Context aspect-[4/3] |
| `13ge.png` | page.tsx, /future-human | §13 Global Expansion lg:col-span-8 aspect-[16/9]; FH §05 London |
| `11-team-visionaries.webp` | page.tsx, /future-human | §14 Team lg:col-span-7 aspect-[16/9]; FH §02 placeholder |
| `future-human-hero-portal.png` | /future-human | Hero full-bleed BG, objectPosition: "68% center" |

### Unused / available for reassignment
```
01-hero-ai-human-portrait.png/webp
02-platform-overview-stage.png/webp
03-first-experience-portal-card.png/webp
03-first-experience-portal-wide.png/webp
04-technology-layer-interface.png/webp
05-audience-system-silhouette.png/webp
06-creative-production-stage.png/webp
07-partnerships-private-room.png/webp
08-company-infrastructure.png/webp
09-private-inquiry-access.png/webp
10-visual-gallery-worlds.png/webp
11-team-visionaries.png
12-media-behind-scenes.png/webp
13-global-journey-map.png/webp
s3.png  s4.png
```

---

## 8. Critical Visual Rules

1. **Never cage images in `lg:max-w-[Xpx]`** inside a FadeImage wrapper when the image needs to fill its grid column. This is the single most common cause of tiny/invisible images.

2. **No heavy gradient fades.** fadeLeft/fadeRight above 14-15% on a dark image = image disappears. Keep all fades at 8-14% max.

3. **16:9 landscape images use `aspect-[16/9]` + object-cover.** Never use portrait aspects for landscape images.

4. **Diagram/infographic images use `objectFit="contain"`.** Only for 12-technology-layer-system.png and similar. All photography = cover.

5. **Bottom CTA sections must be left-aligned.** CTASection.tsx is globally fixed. Do not add items-center or text-center back.

6. **Headings use `clamp()` via inline style prop.** Never use responsive Tailwind classes for headings.

7. **FadeImage is inline per page.** Not shared. Prop changes must be made in each page file independently.

8. **Section padding:** `py-14 lg:py-20` on every section.

9. **Match the reference board.** Cinematic, dark, minimal fades, images that breathe. Cramped or invisible = overconstrained container or fades too heavy.

---

## 9. Known Remaining Issues (Inspect These First)

| Issue | Location | Detail |
|---|---|---|
| s5.png still caged | page.tsx §06 Creative Production | `lg:max-w-[320px] lg:ml-auto` still on wrapper |
| s2.png narrow column | page.tsx §03 First Flagship | `lg:max-w-[260px] lg:ml-auto` — intentional or too small? |
| Placeholder: Human Emotion | /future-human §02 | 11-team-visionaries.webp used as emotion portrait stand-in |
| Placeholder: AI Presence | /future-human §03 | s5.png used as robotic AI stage stand-in |
| Build not verified | all pages | npm run build exceeds sandbox timeout; TypeScript passes 0 errors; run locally |

---

## 10. Fix Priority for Next Session

1. Visual review in dev (npm run dev) — check §02, §06, §03 on homepage and all inner page CTAs
2. §06 s5.png — if caged, remove `lg:max-w-[320px] lg:ml-auto`
3. §03 s2.png — if too narrow, remove `lg:max-w-[260px] lg:ml-auto`
4. objectPosition tuning — adjust on any image where subject is cropped or drifted
5. Replace placeholders on /future-human §02 and §03 with better images from unused list
6. Run `npm run build` locally to confirm production build completes

---

## Quick-Start Prompt for Next Chat

We are working on the ELIZIUM AI website at `/Users/elizavetazhuravleva/Desktop/elysium-ai-website`. Read `HANDOVER.md` in the project root first — it has all context. Do not deploy. Do not touch the personal portfolio at `/Users/elizavetazhuravleva/Downloads/UNI/MP/ELIZAVETA_WEBSITE/04_final_site`. After any edit run `npx tsc --noEmit` and confirm 0 errors.



## Make / Google Sheets Mapping — Confirmed Fixed

Date confirmed: 24 May 2026

Status: LOCKED / WORKING

The Google Sheets mapping issue has been fixed.

Previous issue:
- Google Sheets was receiving plain field names as row values:
  reaction | signal_id | source_page | timestamp | user_agent

Cause:
- The Google Sheets Add a Row module in Make had plain typed text in columns A–E instead of dynamic webhook variable chips.

Fix:
- Webhook data structure was re-determined by sending a fresh Signal reaction sample from the Vercel Preview.
- Google Sheets module was remapped using webhook variables:
  - A: 1. reaction
  - B: 1. signal_id
  - C: 1. source_page
  - D: 1. timestamp
  - E: 1. user_agent

Confirmed result:
- New Google Sheet rows now show real values such as selected reaction, active signal_id, source_page, timestamp, and browser user_agent.

Important:
- Do not type field names manually into Make Google Sheets columns.
- Use dynamic webhook variable chips from module 1 only.
- Old bad rows in Google Sheets are test junk and should be deleted, keeping row 1 as headers.
