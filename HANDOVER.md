# ELIZIUM AI Website — Handover
_Last updated: 2026-05-27 — Full signal queue 2026-05-27 → 2026-06-02 added to SIGNAL_ARCHIVE; signal-calendar API exposes upcoming_signals_full; archive integrity check covers all 7 scheduled signals; dual-source architecture documented in Operating Manual §5; date resolver exact-match confirmed; ELIZIUM Operating Manual added; §00 System Status; Signal Calendar + Inquiry Pipeline visibility; both Make automations live; Vercel confirmed_

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

## ══════════════════════════════════════════════
## ELIZIUM OPERATING MANUAL — MVP SYSTEM
## ══════════════════════════════════════════════

This section is the practical day-to-day operating reference for the ELIZIUM MVP system. Read this before touching anything.

---

### 1. Correct Project Locations

| Item | Value |
|---|---|
| **GitHub repo** | `elysium-ai-website` |
| **Local folder** | `/Users/elizavetazhuravleva/Desktop/elysium-ai-website` |
| **Active branch** | `platform-company-restructure` |
| **Correct Vercel project** | `elysium-ai-website` |
| **Duplicate — do not use** | `elysium-ai-website-e837` — ignore entirely |

Always deploy from `elysium-ai-website` on branch `platform-company-restructure`. Never use the `e837` duplicate — it is a stale fork and will not reflect the correct codebase.

---

### 2. Live Make Scenarios

Both scenarios must remain **ON** at all times. They trigger automatically as data arrives — do not put them in "Run once" or "Use existing data" mode.

| Scenario | Status | What it does |
|---|---|---|
| **ELIZIUM Signal Reactions** | ✅ LIVE | Receives signal reaction payloads from `/api/signal-reaction` via webhook. Writes one row to `Sheet1` in Google Sheets for every reaction submitted on the homepage. |
| **ELIZIUM Inquiry CRM** | ✅ LIVE | Receives normalised inquiry payloads from `/api/inquiry` via webhook. Writes one row to `Inquiry Log` in Google Sheets for every contact/private inquiry form submission. |

If either scenario is OFF, data silently stops flowing. Check Make first if reactions or inquiries stop appearing in Google Sheets.

---

### 3. Google Sheets Tabs

All tabs live in a single Google Sheets workbook. Do not rename tabs — API routes and Make modules depend on the exact names.

| Tab | Purpose | Written by | Read by |
|---|---|---|---|
| **Sheet1** | Raw signal reaction log — one row per reaction click | Make — ELIZIUM Signal Reactions | Nothing (internal audit only) |
| **Signal Summary** | Aggregated emotional response counts and percentages per signal | Google Sheets formulas on Sheet1 | `/api/signal-summary` → homepage Live Emotional Data + `/system-preview §02` |
| **Insight Reports** | Manually authored or AI-assisted strategic interpretation of signal data | Operator (manual) | `/api/insight-report` → `/system-preview §06` |
| **Signal Calendar** | Planned signal queue — dates, themes, content, status, report status | Operator (manual) | `/api/signal-calendar` → `/system-preview §08` |
| **Inquiry Log** | CRM for all contact and private-access inquiry submissions | Make — ELIZIUM Inquiry CRM | `/api/inquiry-summary` → `/system-preview §07` |

---

### 4. Environment Variables

These variables must be set in both `.env.local` (local dev) and Vercel (Preview + Production). Do not commit `.env.local`. Do not add `NEXT_PUBLIC_` prefixes to any of them — all are server-side only.

| Variable | Used by | Notes |
|---|---|---|
| `MAKE_WEBHOOK_URL` | `/api/inquiry` | Inquiry CRM webhook. Do not regenerate unless broken. |
| `MAKE_SIGNAL_REACTION_WEBHOOK_URL` | `/api/signal-reaction` | Signal Reactions webhook. Do not regenerate unless broken. |
| `SIGNAL_SUMMARY_CSV_URL` | `/api/signal-summary` | Google Sheets → Signal Summary tab → publish as CSV → copy URL. |
| `INSIGHT_REPORTS_CSV_URL` | `/api/insight-report` | Google Sheets → Insight Reports tab → publish as CSV → copy URL. |
| `INQUIRY_LOG_CSV_URL` | `/api/inquiry-summary` | Google Sheets → Inquiry Log tab → publish as CSV → copy URL. |
| `SIGNAL_CALENDAR_CSV_URL` | `/api/signal-calendar` | Google Sheets → Signal Calendar tab → publish as CSV → copy URL. |

To get a CSV URL: open the Google Sheet → File → Share → Publish to web → select the specific tab → CSV format → Publish → copy URL.

---

### 5. How to Add a New Signal of the Day

#### Architecture — dual source (MVP phase)

During the MVP phase the website has **two parallel sources** for signal data:

| Source | Role | Written by |
|---|---|---|
| **Signal Calendar** (Google Sheets) | Planning and control layer — dates, themes, content, status, report status. Single editor-facing source of truth. | Operator (manual) |
| **`SIGNAL_ARCHIVE`** (`src/lib/signals.ts`) | Website runtime source — what actually renders on the homepage and powers the date resolver. | Code deployment |

**Both must be kept in sync.** `ACTIVE_SIGNAL_MODE = "date"` resolves today's signal from `SIGNAL_ARCHIVE` by matching the current London date. If a signal date is not in `SIGNAL_ARCHIVE`, the resolver falls back to `ACTIVE_SIGNAL_ID` — it does NOT read from Signal Calendar at runtime.

This dual-source model is intentional for the MVP (keeps the website independent of Google Sheets availability). A future migration can switch the active signal source fully to a private Sheets/API layer — that is a scoped task to be opened separately and should not be done ad-hoc.

#### Steps to add a new signal

1. Add a new row to the **Signal Calendar** tab with `signal_id`, `date`, `theme`, `statistic`, `statement`, `prompt`, `reactions`. Set `status` to `draft`, `report_status` to `report_pending`.
2. Add the same signal as a new entry in `SIGNAL_ARCHIVE` in `src/lib/signals.ts` — copy the exact `statistic`, `statement`, `prompt` from Signal Calendar. Use `/api/signal-calendar` (`upcoming_signals_full` field) to retrieve the content if Signal Calendar is already filled.
3. Add a corresponding row to the **Signal Summary** tab (same `signal_id`) so `/api/signal-summary` returns live data once the signal is active.
4. Update `ACTIVE_SIGNAL_ID` in `src/lib/signals.ts` to this signal's `signal_id`. This becomes the resolver's fallback for any day without a matching archive entry.
5. Add the new date + signal_id pair to the `_scheduledSignals` integrity check array at the bottom of `signals.ts`.
6. Deploy. The date resolver auto-activates on the signal's date in London time. No further code change needed until the next new signal.
7. After the signal has run, set its Signal Calendar `status` to `archived` and `report_status` to `report_pending` (or `report_created` once the insight report is published).

---

### 6. How to Review Inquiries

1. New submissions arrive in the **Inquiry Log** tab automatically via Make. Each row starts with `status` blank (treated as `new` by the system).
2. Open the Inquiry Log tab. Review each new row.
3. Update the `status` column using one of the standard values:
   - `new` — not yet reviewed
   - `reviewed` — read but no response yet
   - `replied` — response sent
   - `converted` — became a partner, client, or confirmed attendee
   - `rejected` — not a fit
4. Update `priority` as appropriate: `high` / `medium` / `low`.
5. Update `follow_up_owner` with your name or initials if someone is responsible for following up.
6. Add free-text `notes` as needed.
7. `/api/inquiry-summary` and `/system-preview §07` automatically reflect status counts on next load — no action needed in code.

Privacy rule: `email`, `message`, `notes`, and `follow_up_owner` are never included in any API response. Only operational metadata is returned.

---

### 7. How to Publish an Insight Report

1. In the **Insight Reports** tab, create a new row with a unique `report_id` (e.g. `insight-2026-05-25-week-02`), `date_created`, the matching `signal_id`, and all content fields.
2. Set `status` to `draft` when writing. Set to `approved` when the report is confirmed as official ELIZIUM METHOD language.
3. `/api/insight-report` automatically returns the latest `draft` or `approved` row — no code change needed.
4. In the **Signal Calendar** tab, update `report_status` for the matching signal to `report_created` once the report is published.
5. Reports should be manually reviewed and approved before being treated as official ELIZIUM METHOD language. Do not auto-publish without operator sign-off.

---

### 8. /system-preview Usage

`/system-preview` is the internal operator command centre. It is not linked from any public page. Access it directly at `/system-preview`.

It shows, in order:

| § | Section | What it shows |
|---|---|---|
| 00 | System Status / Next Actions | API connection health (Live/Fallback), active signal identity, computed priority action list |
| 01 | Active Signal | Full identity card for the current active signal from `signals.ts` |
| 02 | Live Summary | Real-time reaction distribution from `/api/signal-summary` |
| 03 | Signal Archive | All signals in `SIGNAL_ARCHIVE` with status labels |
| 04 | System Status | Individual subsystem health rows |
| 05 | Next Operational Steps | Hardcoded operator checklist |
| 06 | Latest Insight Report | Full report content from `/api/insight-report` |
| 07 | Inquiry Pipeline | CRM summary from `/api/inquiry-summary` — counts, source, request types, latest 3 inquiries |
| 08 | Scheduled Signals | Signal Calendar breakdown from `/api/signal-calendar` |

All data is fetched client-side in parallel on page load. No auth — hidden by virtue of being unlinked.

---

### 9. MVP Testing Checklist

Run this checklist after any deployment or env var change to confirm the full system is working end-to-end.

- [ ] Submit one Signal reaction on the homepage — confirm `Sheet1` in Google Sheets receives a new row
- [ ] Confirm `Sheet1` data flows to `Signal Summary` tab (formulas auto-update — may take a moment)
- [ ] Submit one inquiry form (homepage §09 or `/contact`) — confirm `Inquiry Log` receives a new row
- [ ] Open `/api/signal-summary` — confirm `"mode": "live"` and correct `signal_id`
- [ ] Open `/api/insight-report` — confirm `"mode": "live"` and correct `report_id`
- [ ] Open `/api/inquiry-summary` — confirm `"mode": "live"` and correct `total_inquiries`
- [ ] Open `/api/signal-calendar` — confirm `"mode": "live"` and correct signal count
- [ ] Open `/system-preview` — confirm §00 shows all four APIs as "Live" and Next Actions are correct
- [ ] Confirm both Make scenarios are ON (not paused, not in Run Once mode)

---

### 10. Do Not Change / Avoid

- Do not touch `MAKE_WEBHOOK_URL` or `MAKE_SIGNAL_REACTION_WEBHOOK_URL` unless intentionally rotating a broken webhook — both are confirmed working.
- Do not use the duplicate Vercel project `elysium-ai-website-e837` for any deployment.
- Do not expose `email`, `message`, `notes`, or `follow_up_owner` in any public API response — privacy rule is hard.
- Do not migrate to Airtable, Webflow, Supabase, or any other data layer until the MVP workflow is locked and a scoped migration task is opened.
- Do not revert `ACTIVE_SIGNAL_MODE` back to `"manual"` unless a specific emergency override is needed — date mode is now the confirmed default.
- Do not merge `platform-company-restructure` to `main` without explicit instruction.
- Do not commit `.env.local`.
- Do not git push unless explicitly asked.

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
## DATE-BASED SIGNAL ACTIVATION — 2026-05-27
## ══════════════════════════════════════════════

### 1. Pass Status

**Pass 1 (date mode enabled):** `ACTIVE_SIGNAL_MODE` switched from `"manual"` to `"date"`. `ACTIVE_SIGNAL_ID` fallback updated to `"signal-2026-05-26"`. London-time date resolver added. `/system-preview` §01 and §04 updated to expose resolved vs. fallback IDs. TypeScript: 0 errors. Build: ✓. Files changed: `src/lib/signals.ts`, `src/app/system-preview/page.tsx`.

**Pass 2 (archive sync — bug fix):** `signal-2026-05-27` (Machine Intimacy, 61%) added to `SIGNAL_ARCHIVE`. `ACTIVE_SIGNAL_ID` fallback updated to `"signal-2026-05-27"`. Archive integrity check added to `signals.ts` (throws at build time if the entry is removed). `/api/signal-calendar` extended with `today_signal` field (full content for today's London date). `/system-preview` §01 now shows Expected ID + Date Match Found. TypeScript: 0 errors. Build: ✓.

**Pass 3 (full queue pre-load):** Signals `2026-05-28` through `2026-06-02` added to `SIGNAL_ARCHIVE` with exact content from Signal Calendar. `/api/signal-calendar` extended with `upcoming_signals_full` (full statistic/statement/prompt for all draft signals). Integrity check updated to a loop covering all 7 scheduled signals. Dual-source architecture documented in Operating Manual §5. TypeScript: 0 errors. Build: ✓. Files changed: `src/lib/signals.ts`, `src/app/api/signal-calendar/route.ts`, `HANDOVER.md`.

---

### 2. What Changed

| Item | Before | After |
|---|---|---|
| `ACTIVE_SIGNAL_MODE` | `"manual"` | `"date"` |
| `ACTIVE_SIGNAL_ID` (fallback) | `"signal-2026-05-25"` | `"signal-2026-05-27"` |
| Date resolver | UTC (`toISOString().slice(0,10)`) | Europe/London (`toLocaleDateString("en-CA", { timeZone: "Europe/London" })`) |
| `getLondonDateString()` | Did not exist | Exported from `signals.ts` |

---

### 3. Resolution Logic (as of 2026-05-27)

```
Today (London) = "2026-05-27"
SIGNAL_ARCHIVE lookup for "2026-05-27" → signal-2026-05-27 (Machine Intimacy, 61%) ✓
→ Exact date match found — ACTIVE_SIGNAL resolves to signal-2026-05-27
```

All reaction submissions from the homepage now correctly record `signal_id: "signal-2026-05-27"` (Machine Intimacy). The previous fallback (`signal-2026-05-26`) is no longer used unless no date match exists.

When a new signal entry is added to `SIGNAL_ARCHIVE` with `date: "2026-05-28"` (or any future date), it will automatically become active on that date in London time — no deployment needed as long as the code is already deployed with that entry. Use `/api/signal-calendar?today_signal` to verify full content before adding to `SIGNAL_ARCHIVE`.

---

### 4. How to Add a New Date-Based Signal

1. Add a new entry to `SIGNAL_ARCHIVE` in `src/lib/signals.ts` with `date: "YYYY-MM-DD"`.
2. Ensure a matching row exists in the Google Sheets **Signal Summary** tab for that `signal_id` before the date arrives.
3. Ensure a matching row exists in the **Signal Calendar** tab with `status: "draft"` until ready, then `"active"`.
4. Deploy. On the matching London date, `getResolvedActiveSignal()` will return the new signal automatically.
5. Update `ACTIVE_SIGNAL_ID` (fallback) to point to the new signal once it's confirmed stable.

---

### 5. Architecture Note — Static Build + Client Date Resolution

`ACTIVE_SIGNAL` is a module-level constant: `getResolvedActiveSignal()` is called once at import time.

- **Client (browser)**: the module loads fresh for each user session — `getLondonDateString()` evaluates to today's date. The `signal_id` sent to `/api/signal-reaction` is always correct for the current day.
- **Server (API routes with `force-dynamic`)**: module is cached per server process. `ACTIVE_SIGNAL` may reflect the date the server process started. For `/api/signal-summary`, this means the correct signal row is found as long as the server was started on the same day. For MVP this is acceptable.
- **Implication**: the homepage HTML is pre-rendered at build time (static). If the build was done on a different day, the HTML may show the previous signal's content. The client JS re-hydrates with the correct date. This does not affect the `signal_id` recorded in Google Sheets (client-driven).
- **Future improvement**: move `getResolvedActiveSignal()` into a per-request server call rather than module scope to eliminate the static staleness issue. Do not implement until explicitly instructed.

---

### 6. Do Not Change

- `ACTIVE_SIGNAL_MODE` — now `"date"`. Do not revert to `"manual"` unless an emergency override is needed.
- `getLondonDateString()` — must remain `Europe/London` timezone.
- `ACTIVE_SIGNAL_ID` — keep pointing to the most recently confirmed safe signal. Update when a new signal is confirmed.
- `/api/signal-reaction` — trusts client-provided `signal_id`. No change needed.

---

## ══════════════════════════════════════════════
## SYSTEM STATUS / NEXT ACTIONS — 2026-05-27
## ══════════════════════════════════════════════

### 1. Pass Status

`/system-preview` §00 System Status / Next Actions section added. TypeScript: 0 errors. Build: ✓. Only `src/app/system-preview/page.tsx` changed. No new API routes, no new env vars, no new packages.

---

### 2. What It Is

A new operator-facing overview panel inserted at the **top** of `/system-preview` (§00), before the detailed sections (§01–§08). It aggregates state already fetched by the page — no additional API calls or data sources.

Purpose: an operator landing on `/system-preview` sees the system health and priority actions immediately, without scrolling through the detailed sections.

---

### 3. Section Layout

**API Connections (left column):**

| Row | Source | Live condition |
|---|---|---|
| Signal Reactions | `/api/signal-summary` | `summary?.mode === "live"` |
| Signal Calendar | `/api/signal-calendar` | `calendarData?.mode === "live"` |
| Inquiry CRM | `/api/inquiry-summary` | `inquirySummary?.mode === "live"` |
| Insight Reports | `/api/insight-report` | `insight?.mode === "live"` |

Each row shows: `StatusDot` + label + `"Connecting…"` / `"Live"` / `"Fallback"`.

**Active Signal (right column):**
- Signal ID: from `ACTIVE_SIGNAL_ID` (code constant — always available)
- Theme: from `ACTIVE_SIGNAL.theme` (code constant — always available)
- Report Status: from `calendarData?.latest_active_signal?.report_status` (live from Signal Calendar CSV)

**Next Actions (full-width below):**

Computed once all four fetches complete (`allLoaded`). Shows `"Analyzing…"` while loading. Prioritised list built from these conditions:

| Condition | Action shown |
|---|---|
| `calendarData?.report_pending > 0` | Review pending insight report |
| `inquirySummary?.new_inquiries > 0` | Review new inquiries |
| `calendarData?.upcoming_signals.length > 0` | Prepare next signal |
| Any API in fallback mode | Check CSV env / published sheet connection |
| None of the above | System stable — continue monitoring |

Multiple conditions can be true simultaneously — all matching actions are shown as a numbered list.

---

### 4. Implementation

**New derived values added to `SystemPreview` component:**
```ts
const signalSummaryConnected = summary?.mode === "live";
const insightConnected       = insight?.mode === "live";
const allLoaded              = !summaryLoading && !insightLoading && !inquirySummaryLoading && !calendarLoading;
// nextActions: string[] — computed from allLoaded guard + above conditions
```

**No new state, no new fetches, no new API routes, no new env vars.**

---

### 5. Do Not Change

- No API routes touched — all unchanged.
- No homepage changes.
- No Make/webhook changes.
- Do not change the section logic or action conditions without a scoped task.

---

## ══════════════════════════════════════════════
## SIGNAL CALENDAR VISIBILITY LAYER — 2026-05-27
## ══════════════════════════════════════════════

### 1. Pass Status

`/api/signal-calendar` route created. `/system-preview` §08 Scheduled Signals section added. TypeScript: 0 errors. Build: ✓. Only `src/app/api/signal-calendar/route.ts` (new) and `src/app/system-preview/page.tsx` changed.

---

### 2. New File — `src/app/api/signal-calendar/route.ts`

GET handler. `export const dynamic = "force-dynamic"`. Server-side only.

**Env var required:** `SIGNAL_CALENDAR_CSV_URL`
- How to get: Google Sheets → Signal Calendar tab → File → Share → Publish to web → CSV → copy URL.
- Locally: add to `.env.local` (do not commit).
- Vercel: Settings → Environment Variables → `SIGNAL_CALENDAR_CSV_URL` → Preview (and Production when ready).

**Privacy rule (hard):** `reactions`, `image_asset`, `mobile_image_asset`, and `notes` are NEVER included in the response. Only operational metadata is returned.

**CSV columns expected:** `signal_id, date, theme, statistic, statement, prompt, reactions, status, image_asset, mobile_image_asset, report_status, notes`

**Status values counted:** `active`, `draft`, `archived`, `skipped`

**Report status values counted:** `report_pending`, `report_created`

**Response shape:**
```json
{
  "ok": true,
  "mode": "live" | "fallback",
  "total_signals": 4,
  "active_signals": 1,
  "draft_signals": 1,
  "archived_signals": 1,
  "skipped_signals": 1,
  "report_pending": 1,
  "report_created": 2,
  "latest_active_signal": {
    "signal_id": "signal-2026-05-25",
    "date": "2026-05-25",
    "theme": "Human Control",
    "statistic": "58%...",
    "statement": "...",
    "prompt": "...",
    "status": "active",
    "report_status": "report_created"
  },
  "upcoming_signals": [
    { "signal_id": "signal-2026-05-26", "date": "2026-05-26", "theme": "Emotional Memory", "status": "draft", "report_status": "report_pending" }
  ],
  "all_signals": [
    { "signal_id": "...", "date": "...", "theme": "...", "status": "...", "report_status": "..." }
  ]
}
```

**Selection logic:**
- `latest_active_signal` = first row with `status === "active"` (full operational fields, no privacy fields)
- `upcoming_signals` = all rows with `status === "draft"`, sorted by date ascending (compact shape)
- `all_signals` = all rows in compact shape (no statistic, statement, prompt, reactions, image_asset, mobile_image_asset, notes)

**Failure paths:** Any error returns `mode:"fallback"` with zero counts, `null` active signal, and empty arrays. Never returns non-2xx.

---

### 3. Updated File — `src/app/system-preview/page.tsx`

Added §08 Scheduled Signals section. Changes:
- Three new TypeScript interfaces added: `CalendarSignal`, `CalendarActiveSignal`, `SignalCalendarData`
- Two new state variables: `calendarData`, `calendarLoading`
- One new parallel fetch in `useEffect`: `/api/signal-calendar`
- One new derived value: `calendarIsLive`
- §08 Scheduled Signals section: status/report-status breakdown grid, latest active signal identity card, upcoming signals list, all-signals compact table, fallback notice

---

### 4. Long-term Migration Note

The Signal Calendar tab is currently the planning layer only — it is not yet connected to live site routing. When date-based activation is enabled (`ACTIVE_SIGNAL_MODE = "date"`), the Signal Calendar will be the source of truth for which signal is live. Until then, `ACTIVE_SIGNAL_ID` in `src/lib/signals.ts` controls the active signal manually. Do not change this without a scoped task.

---

Do not change `src/app/api/signal-calendar/route.ts` or the §08 section structure unless a new scoped task is explicitly opened.


## ══════════════════════════════════════════════
## INQUIRY PIPELINE VISIBILITY LAYER — 2026-05-26
## ══════════════════════════════════════════════

### 1. Pass Status

`/api/inquiry-summary` route created. `/system-preview` §07 Inquiry Pipeline section added. TypeScript: 0 errors. Build: ✓ 16 pages, 5 Dynamic routes (was 4). Only `src/app/api/inquiry-summary/route.ts` (new) and `src/app/system-preview/page.tsx` changed.

---

### 2. New File — `src/app/api/inquiry-summary/route.ts`

GET handler. `export const dynamic = "force-dynamic"`. Server-side only.

**Env var required:** `INQUIRY_LOG_CSV_URL`
- How to get: Google Sheets → Inquiry Log tab → File → Share → Publish to web → CSV → copy URL.
- Locally: add to `.env.local` (do not commit).
- Vercel: Settings → Environment Variables → `INQUIRY_LOG_CSV_URL` → Preview (and Production when ready).

**Privacy rule (hard):** `email`, `message`, `notes`, and `follow_up_owner` are NEVER included in the response. Only operational metadata is returned.

**Response shape:**
```json
{
  "ok": true,
  "mode": "live" | "fallback",
  "total_inquiries": 4,
  "new_inquiries": 2,
  "reviewed_inquiries": 1,
  "replied_inquiries": 1,
  "converted_inquiries": 0,
  "latest_inquiry_timestamp": "2026-05-26T14:30:22.123Z",
  "source_breakdown": {
    "contact_page": 2,
    "homepage_private_access": 2,
    "other": 0
  },
  "request_type_breakdown": [
    { "request_type": "Partnership", "count": 2 },
    { "request_type": "Investor", "count": 1 }
  ],
  "latest_inquiries": [
    {
      "inquiry_id": "inq-20260526-143022-a7f3",
      "timestamp": "2026-05-26T14:30:22.123Z",
      "source_page": "homepage_private_access",
      "name": "Name",
      "company": "Company",
      "request_type": "Partnership",
      "status": "new"
    }
  ]
}
```

**Status counting rule:** blank `status` field is counted as `new` (inquiries not yet reviewed by operator).

**All failure paths** (env var missing, fetch error, parse error, no rows) return `mode: "fallback"`, zero counts, empty arrays. Never returns non-2xx.

**CSV parser:** RFC 4180-safe quoted-field handling — identical to `/api/insight-report`. Correctly handles commas inside quoted fields (e.g. message text, names with commas).

---

### 3. /system-preview §07 — Inquiry Pipeline

New section added to `src/app/system-preview/page.tsx`:
- Fetches `/api/inquiry-summary` client-side in `useEffect` (parallel to existing fetches).
- Status bar: `Connecting…` / `Live Data` (green dot) / `Fallback Mode` (dim dot) + total count + last timestamp.
- **Stat tiles (5-column):** Total / New / Reviewed / Replied / Converted.
- **Source breakdown:** Contact Page vs Homepage PA vs Other.
- **Request type breakdown:** all types sorted by count descending.
- **Latest 3 inquiries:** inquiry_id, name, company, source, request_type, status — no email/message/notes.
- **Fallback notice:** "Set INQUIRY_LOG_CSV_URL to enable live Inquiry Pipeline data." — shown only when no live data.

---

### 4. Long-Term Migration Note

The MVP reads the Inquiry Log as a **publicly published CSV** (same pattern as Signal Summary and Insight Reports). This is adequate for internal operator use.

For production: migrate to **private Google Sheets API** with a service account, so the Inquiry Log does not need to be published. This prevents any accidental exposure of the tab URL. The route interface is the same — only the fetch mechanism changes.

Do not implement private Sheets API access until explicitly instructed.

---

### 5. Do Not Change

- `/api/inquiry/route.ts` — untouched. Inquiry submission pipeline unchanged.
- Signal APIs — untouched.
- Homepage — untouched.
- Make / Google Sheets — no change required.

---

## ══════════════════════════════════════════════
## AUTOMATION STATE CONFIRMED — 2026-05-26
## ══════════════════════════════════════════════

### 1. Vercel Project

| Item | Value |
|---|---|
| **Correct project** | `elysium-ai-website` |
| **Wrong project — do not use** | `elysium-ai-website-e837` — duplicate, ignore |

Always deploy from the `elysium-ai-website` Vercel project on branch `platform-company-restructure`.

---

### 2. Active Make Scenarios

Both scenarios are **LIVE** — set to trigger automatically without "Run once" or "Use existing data".

| Scenario | Status | Trigger | Destination |
|---|---|---|---|
| **ELIZIUM Signal Reactions** | ✅ LIVE | Immediately as data arrives | `Sheet1` in Google Sheets |
| **ELIZIUM Inquiry CRM** | ✅ LIVE | Immediately as data arrives | `Inquiry Log` tab in Google Sheets |

**Deleted legacy scenario:** `OLD — Website Inquiry Legacy — DO NOT USE` — removed. Do not recreate.

---

### 3. Environment Variables — Confirmed

| Env var | Status | Used by | Notes |
|---|---|---|---|
| `MAKE_WEBHOOK_URL` | ✅ Set — Vercel Preview + Production | `/api/inquiry` | Confirmed working — last 8 chars: `dhdpyr43` (host: `hook.eu1.make.com`) |
| `MAKE_SIGNAL_REACTION_WEBHOOK_URL` | ✅ Set — Vercel Preview + Production | `/api/signal-reaction` | Signal Reactions scenario — unchanged |
| `SIGNAL_SUMMARY_CSV_URL` | ✅ Set | `/api/signal-summary` | Signal Summary tab published CSV |
| `INSIGHT_REPORTS_CSV_URL` | ✅ Set | `/api/insight-report` | Insight Reports tab published CSV |

Do NOT commit `.env.local`. Do NOT add `NEXT_PUBLIC_` prefixes to any of these.

---

### 4. Inquiry CRM — Confirmed Payload Shape

`/api/inquiry` normalises all submissions before forwarding to Make. Make always receives:

```json
{
  "inquiry_id":   "inq-20260526-143022-a7f3",
  "timestamp":    "2026-05-26T14:30:22.123Z",
  "source_page":  "homepage_private_access",
  "name":         "Full Name",
  "email":        "email@example.com",
  "company":      "Company Name",
  "request_type": "Partnership",
  "message":      "Message text",
  "raw_source":   "homepage_private_access",
  "status":       ""
}
```

`status` is blank on arrival — operators fill it manually in the Inquiry Log sheet (`new` → `reviewed` → `replied` → `rejected` → `converted`).

---

### 5. Google Sheets — Full Tab Inventory

| Tab | Purpose | Written by | Read by |
|---|---|---|---|
| `Sheet1` | Raw signal reactions log | Make — ELIZIUM Signal Reactions scenario | Nothing (internal only) |
| `Signal Summary` | Aggregate counts + percentages per signal | Google Sheets formulas on Sheet1 | `/api/signal-summary` → homepage Live Emotional Data + /system-preview §02 |
| `Insight Reports` | Manual/AI written strategic interpretation | Operator (manually authored) | `/api/insight-report` → /system-preview §06 |
| `Signal Calendar` | Future signal planning and scheduling | Operator (manually managed) | Not connected — planning layer only |
| `Inquiry Log` | Partner / contact CRM | Make — ELIZIUM Inquiry CRM scenario | Not yet connected to website |

---

### 6. Do Not Change

- Make scenario names — do not rename.
- `MAKE_WEBHOOK_URL` — confirmed working; do not regenerate unless broken.
- `MAKE_SIGNAL_REACTION_WEBHOOK_URL` — confirmed working; do not touch.
- Google Sheets tab names — API routes and Make modules depend on exact tab names.
- `/api/debug-inquiry-env` route — temporary diagnostic; leave in place until explicitly removed.

---

## ══════════════════════════════════════════════
## INQUIRY API NORMALISATION — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

`src/app/api/inquiry/route.ts` updated. Validation logic unchanged. Normalized payload now forwarded to Make instead of raw payload. TypeScript: 0 errors. Build: ✓ 16 pages, 4 Dynamic routes. Only `src/app/api/inquiry/route.ts` changed.

---

### 2. Problem Solved

Two forms sent inconsistent field shapes to Make:

| Field concept | Homepage (`homepage_private_access`) | ContactForm (`contact_page`) |
|---|---|---|
| Name | `full_name` | `name` |
| Company | `company` | `organisation` |
| Request type | `inquiry_type` | `interest` |
| ID | none | none |
| Timestamp | none | none |

Make received different field names depending on which form submitted — messy for a CRM column mapping.

---

### 3. Normalised Payload Shape

Make now always receives this exact 9-field structure, regardless of source:

```json
{
  "inquiry_id":   "inq-20260525-143022-a7f3",
  "timestamp":    "2026-05-25T14:30:22.123Z",
  "source_page":  "homepage_private_access",
  "name":         "Full Name",
  "email":        "email@example.com",
  "company":      "Company Name",
  "request_type": "Partnership",
  "message":      "Message text",
  "raw_source":   "homepage_private_access"
}
```

**Mapping logic (server-side, in route.ts):**

| Normalised field | Homepage source | ContactForm source |
|---|---|---|
| `name` | `full_name` | `name` |
| `company` | `company` | `organisation` |
| `request_type` | `inquiry_type` | `interest` |
| `inquiry_id` | Generated: `inq-YYYYMMDD-HHMMSS-xxxx` | Same |
| `timestamp` | `new Date().toISOString()` | Same |
| `source_page` | `"homepage_private_access"` | `"contact_page"` |
| `raw_source` | Same as `source_page` | Same as `source_page` |
| `email` | `email` | `email` |
| `message` | `message` | `message` |

`inquiry_id` format: `inq-` + `YYYYMMDD` + `-` + `HHMMSS` + `-` + 4-char base-36 random suffix (UTC).

---

### 4. Validation — Unchanged

All validation logic is identical to the previous version and still runs on the raw payload before normalisation. No validation rules were added or removed.

| Check | Rule |
|---|---|
| JSON parse | `400 "Invalid JSON"` if not valid JSON |
| Email | Must contain `@` — else `400 "Valid email required"` |
| Name | `payload.name` or `payload.full_name` must be non-empty — else `400 "Name required"` |
| Source | Must be exactly `"homepage_private_access"` or `"contact_page"` — else `400 "Invalid source"` |

---

### 5. Public API Response — Unchanged

The response shape returned to the browser is identical to before:

```json
{ "ok": true, "mode": "local" }    // when MAKE_WEBHOOK_URL is not set
{ "ok": true, "mode": "webhook" }  // when Make webhook succeeds
{ "ok": false, "error": "..." }    // on validation failure or upstream error
```

No internal fields (inquiry_id, normalised data) are returned to the client.

---

### 6. Required Manual Make / Google Sheets Update

The Make "Integration Webhooks" scenario → Google Sheets "Add a Row" module **must be remapped** to the new field names. Until this is done, Make may write to wrong columns or fail silently.

**Required Make column mapping update (you do this manually in Make):**

| Google Sheets column | Map from webhook | Notes |
|---|---|---|
| `inquiry_id` | `1. inquiry_id` | Now server-generated — use directly |
| `timestamp` | `1. timestamp` | Now server-generated ISO UTC — use directly |
| `source_page` | `1. source_page` | Same as before |
| `name` | `1. name` | Replaces `1. full_name` / `1. name` ambiguity |
| `email` | `1. email` | Same as before |
| `company` | `1. company` | Replaces `1. company` / `1. organisation` ambiguity |
| `request_type` | `1. request_type` | Replaces `1. inquiry_type` / `1. interest` ambiguity |
| `message` | `1. message` | Same as before |
| `raw_source` | `1. raw_source` | Optional — same value as `source_page` for now |
| `status` | Leave blank | Operator fills manually |
| `priority` | Leave blank | Operator fills manually |
| `follow_up_owner` | Leave blank | Operator fills manually |
| `notes` | Leave blank | Operator fills manually |

**Google Sheets column headers to set (if creating a new/updated tab):**
```
inquiry_id | timestamp | source_page | name | email | company | request_type | message | raw_source | status | priority | follow_up_owner | notes
```

---

### 7. Do Not Change

- `src/components/ui/ContactForm.tsx` — untouched. Form fields unchanged.
- `src/app/page.tsx` — untouched. Homepage form fields unchanged.
- `MAKE_WEBHOOK_URL` env var — same env var, same location.
- All Signal APIs — untouched.
- All other routes — untouched.

---

## ══════════════════════════════════════════════
## SIGNAL CALENDAR — GOOGLE SHEETS PLANNING LAYER — 2026-05-25
## ══════════════════════════════════════════════

### 1. Overview

A new tab called `Signal Calendar` has been created in the ELIZIUM Google Sheets workbook. It is the external planning and scheduling layer for future daily/rotating signals. It is **not connected to the website** — the website continues to use the code-based `SIGNAL_ARCHIVE` and `ACTIVE_SIGNAL_MODE = "manual"` in `src/lib/signals.ts`.

Signal Calendar is the intended migration target when the team is ready to move signal scheduling out of code and into a managed external source.

---

### 2. Signal Calendar Columns

| Column | Description |
|---|---|
| `signal_id` | Matches `signal_id` in `SIGNAL_ARCHIVE` |
| `date` | Scheduled activation date (YYYY-MM-DD) |
| `theme` | Display theme label |
| `statistic` | Large display figure (e.g. `58%`) |
| `statement` | Sentence following the statistic |
| `prompt` | Reaction prompt shown to audience |
| `reactions` | Comma-separated allowed reactions |
| `status` | Planning status — see §3 below |
| `image_asset` | Optional image asset reference (intentionally empty until approved) |
| `mobile_image_asset` | Optional mobile image asset reference (intentionally empty until approved) |
| `report_status` | Insight Report status for this signal — see §3 below |
| `notes` | Free-text operator notes |

---

### 3. Current Rows

| signal_id | date | theme | status | report_status |
|---|---|---|---|---|
| `signal-2026-05-23` | 2026-05-23 | AI Anxiety | `archived` | `report_created` |
| `signal-2026-05-24` | 2026-05-24 | System Trust | `skipped` | `not_required` |
| `signal-2026-05-25` | 2026-05-25 | Human Control | `active` | `report_created` |
| `signal-2026-05-26` | 2026-05-26 | Emotional Memory | `draft` | `report_pending` |

---

### 4. Connection Status

Signal Calendar is **read by no code path** at this time. It is a planning document only.

The website pipeline is unchanged:
```
SIGNAL_ARCHIVE (signals.ts) → ACTIVE_SIGNAL_MODE: manual → ACTIVE_SIGNAL_ID → active signal
Signal reactions → /api/signal-reaction → Make → Sheet1
Signal Summary tab → /api/signal-summary → homepage + /system-preview
Insight Reports tab → /api/insight-report → /system-preview §06
```

Signal Calendar is **not** part of this pipeline yet.

---

### 5. Pre-Migration Requirements

Before any signal can be loaded from Signal Calendar (instead of `SIGNAL_ARCHIVE`), each scheduled signal row must satisfy all of the following:

1. A `Signal Calendar` row exists with confirmed content (statistic, statement, prompt, theme, reactions).
2. A `Signal Summary` tab row exists for the `signal_id` (required for `/api/signal-summary` to return live aggregate data).
3. Visual assets reviewed: `image_asset` and `mobile_image_asset` either confirmed empty (no images used) or approved asset references present.
4. A decision on report workflow: manual draft vs AI-generated draft — affects whether `report_status` reaches `report_created` before or after activation.

Additionally, `ACTIVE_SIGNAL_MODE` must be switched to `"date"` in `src/lib/signals.ts` and the full pre-flight checklist in the "ACTIVE SIGNAL MODE" section above must be satisfied.

---

### 6. Do Not Change (this pass)

- No code files were changed in this pass.
- `src/lib/signals.ts` — signal rotation remains manual, `ACTIVE_SIGNAL_ID = "signal-2026-05-25"`.
- Signal Calendar is a Google Sheets planning document only.

---

## ══════════════════════════════════════════════
## ACTIVE SIGNAL MODE + DATE ACTIVATION PREP — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

`src/lib/signals.ts` refactored to support both manual and date-based activation. `src/app/system-preview/page.tsx` updated to display activation mode. TypeScript: 0 errors. Build: pass. Homepage output unchanged. Active signal remains `signal-2026-05-25`.

---

### 2. New Exports — `src/lib/signals.ts`

| Export | Type | Description |
|---|---|---|
| `ActiveSignalMode` | `type` | `"manual" \| "date"` |
| `ACTIVE_SIGNAL_MODE` | `const` | Current mode — `"manual"` |
| `getSignalForDate(dateString)` | `function` | Returns signal matching YYYY-MM-DD, or null |
| `getResolvedActiveSignal()` | `function` | Returns active signal per current mode |
| `ACTIVE_SIGNAL` | `const` | Unchanged type/consumers — now resolved via `getResolvedActiveSignal()` |
| `getActiveSignal()` | `function` | Unchanged |

All existing consumers (`src/app/page.tsx`, `/api/signal-summary/route.ts`) import `ACTIVE_SIGNAL: Signal` — no changes required.

---

### 3. Mode Behaviour

**`ACTIVE_SIGNAL_MODE = "manual"` (current)**
- Always uses `ACTIVE_SIGNAL_ID` to select the active signal.
- Rotation is explicit: change `ACTIVE_SIGNAL_ID` in `signals.ts` and deploy.
- No automatic switching. Fully deterministic.

**`ACTIVE_SIGNAL_MODE = "date"` (prepared, not enabled)**
- Selects the signal whose `date` field matches today's date (YYYY-MM-DD, server-local time).
- Falls back to `ACTIVE_SIGNAL_ID` if no signal matches today.
- Server-evaluated at module load time via `getResolvedActiveSignal()`.

---

### 4. Pre-Flight Checklist Before Enabling Date Mode

Do NOT change `ACTIVE_SIGNAL_MODE` to `"date"` until ALL of the following are satisfied:

- [ ] Google Sheets Signal Summary has a row for every `signal_id` in `SIGNAL_ARCHIVE` that will be activated.
- [ ] A decision has been made on whether Insight Reports for each date-based signal are auto or manually approved.
- [ ] All signals in `SIGNAL_ARCHIVE` scheduled for the near future have been reviewed and their content confirmed (statistic, statement, prompt, theme).
- [ ] The timezone of the Vercel deployment is understood and accepted (server uses UTC — a "2026-05-26" signal activates at 00:00 UTC, not local midnight).
- [ ] Signal rotation on Vercel has been tested: deploy with `ACTIVE_SIGNAL_MODE = "date"` on preview branch, confirm the correct signal loads on the correct date.

---

### 5. /system-preview Changes

- §01 identity table: new "Activation Mode" row displays `Manual` or `Date-Based`.
- §04 System Status: "Signal Rotation" row now shows current mode and signal_id in detail. New "Date Activation" row shows `Prepared` (turns `Active` when mode switches to `"date"`).

---

### 6. Files Changed

- `src/lib/signals.ts` — added `ActiveSignalMode`, `ACTIVE_SIGNAL_MODE`, `getSignalForDate()`, `getResolvedActiveSignal()`; `ACTIVE_SIGNAL` now derived via `getResolvedActiveSignal()`
- `src/app/system-preview/page.tsx` — added `ACTIVE_SIGNAL_MODE` import; new §01 "Activation Mode" row; updated §04 Signal Rotation + Date Activation rows

---

## ══════════════════════════════════════════════
## HUMAN CONTROL INSIGHT REPORT + SYSTEM PREVIEW FIX — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

Human Control Insight Report (`insight-2026-05-25-week-02`) created in Google Sheets and confirmed live via `/api/insight-report`. Layer A (§05 duplicate step fix) and Layer B (§06 signal staleness notice) applied to `src/app/system-preview/page.tsx`. TypeScript: 0 errors. Only `src/app/system-preview/page.tsx` changed in code.

---

### 2. New Insight Report — Confirmed Live

| Field | Value |
|---|---|
| report_id | `insight-2026-05-25-week-02` |
| signal_id | `signal-2026-05-25` |
| signal_theme | Human Control |
| total_responses at creation | 7 |
| dominant_reaction | interest |
| dominant_percent | 57.14% |
| status | draft |

Reaction distribution at creation:

| Reaction | % | n |
|---|---|---|
| anxiety | 14.29% | 1 |
| interest | 57.14% | 4 |
| trust | 14.29% | 1 |
| discomfort | 14.29% | 1 |
| emptiness | 0% | 0 |

Encoding note: Curly apostrophes in Google Sheets text fields replaced with straight apostrophes to prevent CSV encoding issues.

---

### 3. /system-preview §06 — Confirmed Updated

- `/api/insight-report` now returns `insight-2026-05-25-week-02` with `mode: live`.
- `/system-preview` §06 displays the Human Control report correctly.
- The previous-signal staleness notice (Layer B) disappeared automatically — `report.signal_id` now matches `ACTIVE_SIGNAL_ID`.

---

### 4. Layer A — §05 Next Operational Steps Fix

Corrected list (duplicate "Create Insight Report" step removed from page.tsx):
- 01: Create next Insight Report once signal-2026-05-25 reaches a stronger response count.
- 02: Rotate to next signal by changing ACTIVE_SIGNAL_ID in src/lib/signals.ts and deploying.
- —: Production-grade later: replace public CSV endpoint with private Google Sheets API access.

---

### 5. Layer B — §06 Signal Staleness Notice

Conditional notice added to `/system-preview` §06. Shown only when `insightReport.signal_id !== ACTIVE_SIGNAL_ID`. Muted operator-note style, consistent with dark command-centre aesthetic. Disappears automatically when a matching report exists for the active signal. No API route changes. No signals.ts changes. No homepage changes.

---

### 6. Do Not Change

- `src/app/api/insight-report/route.ts` — untouched
- `src/app/api/signal-summary/route.ts` — untouched
- `src/app/api/signal-reaction/route.ts` — untouched
- `src/lib/signals.ts` — untouched
- Make / Google Sheets mapping — unchanged
- Google Sheets column structure — unchanged

---

## ══════════════════════════════════════════════
## SYSTEM PREVIEW CONFIRMED + §05 CLEANUP — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

`/system-preview` end-to-end confirmed on Vercel Preview. §05 Next Operational Steps cleaned up — one outdated instruction removed. TypeScript: 0 errors. Only `src/app/system-preview/page.tsx` changed.

---

### 2. /system-preview — Confirmed Working Sections

| § | Label | Confirmed State |
|---|---|---|
| 01 | Active Signal | `signal-2026-05-25` / Human Control / 58% — correct |
| 02 | Live Summary | `mode: live`, 2 responses, Interest 100% — real data flowing |
| 03 | Signal Archive | All 4 signals shown with Past / Active / Draft labels — correct |
| 04 | System Status | Signal Collection, Summary API, Raw Data, Summary CSV, Signal Rotation, Insight Reports — correct |
| 05 | Next Operational Steps | Cleaned up — see §3 below |
| 06 | Latest Insight Report | `insight-2026-05-24-week-01` loaded via `/api/insight-report` — mode: live |

---

### 3. §05 Next Operational Steps — Cleanup

Outdated step removed: `"Add Signal Summary row for signal-2026-05-25 in Google Sheets Signal Summary tab to enable live aggregate data."` — this work is done; live data is confirmed for signal-2026-05-25.

Current step 01: `"Create next Insight Report once signal-2026-05-25 reaches a stronger response count."`

Steps 02–04 unchanged:
- 02: Rotate to next signal by changing ACTIVE_SIGNAL_ID in src/lib/signals.ts and deploying.
- 03: Production-grade later: replace public CSV endpoint with private Google Sheets API access.

---

### 4. /api/insight-report — Confirmed Live

- Route: `src/app/api/insight-report/route.ts`
- Env var `INSIGHT_REPORTS_CSV_URL` is set in Vercel Preview.
- Latest qualifying row returned: `insight-2026-05-24-week-01` (status: `draft`).
- Report references `signal-2026-05-23` / AI Anxiety — this is expected. No Human Control (signal-2026-05-25) report has been written yet.
- A new Insight Report for signal-2026-05-25 should be created manually once the response count is stronger.

---

### 5. Live System — Unchanged

The following pipeline is confirmed unchanged:

```
Signal reaction click → /api/signal-reaction → Make → Sheet1
Signal Summary formulas → /api/signal-summary → homepage Live Emotional Data
Signal Summary formulas → /api/signal-summary → /system-preview §02 Live Summary
INSIGHT_REPORTS_CSV_URL → /api/insight-report → /system-preview §06 Latest Insight Report
```

No Make/Google mapping changes. No API route changes. No homepage changes. No env var changes.

---

## ══════════════════════════════════════════════
## INSIGHT REPORT API + SYSTEM PREVIEW §06 — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

`/api/insight-report` route created. `/system-preview` §06 layer added. TypeScript: 0 errors. Build: ✓ 16 pages, 4 Dynamic API routes. No other files changed.

---

### 2. New File

**`src/app/api/insight-report/route.ts`** — GET handler. `export const dynamic = "force-dynamic"`. Server-side only.

**Env var required:** `INSIGHT_REPORTS_CSV_URL`
- How to get: Google Sheets → Insight Reports tab → File → Share → Publish to web → CSV → copy URL.
- Locally: add to `.env.local` (do not commit).
- Vercel: Settings → Environment Variables → `INSIGHT_REPORTS_CSV_URL` → Preview (and Production when ready).

**Response shape:**
```json
{
  "ok": true,
  "mode": "live" | "fallback",
  "report": {
    "report_id": "insight-2026-05-24-week-01",
    "date_created": "2026-05-24",
    "signal_id": "signal-2026-05-23",
    "signal_theme": "AI Anxiety",
    "total_responses": 5,
    "dominant_reaction": "anxiety + interest",
    "dominant_percent": "40% / 40%",
    "emotional_pattern": "...",
    "interpretation": "...",
    "experience_implication": "...",
    "brand_partner_value": "...",
    "recommended_next_signal": "...",
    "status": "draft"
  } | null
}
```

**Selection logic:** last row with status `"draft"` or `"approved"` (case-insensitive); falls back to last row with any non-empty `report_id`.

**All failure paths** (env var missing, fetch error, parse error, no rows) return `mode: "fallback"`, `report: null`. Never returns non-2xx.

**CSV parser** uses RFC 4180-safe quoted-field handling — correctly handles commas inside interpretation/implication text fields.

---

### 3. /system-preview §06 — Latest Insight Report

New section added to `src/app/system-preview/page.tsx`:
- Fetches `/api/insight-report` client-side in `useEffect` (parallel to existing signal-summary fetch).
- Status bar shows: `Connecting…` / `Report Loaded` (green dot) / `No Report` (dim dot).
- **Fallback state:** shows "No insight report loaded yet." — calm, no error language.
- **Live state:** identity rows (report_id, date_created, signal_id, theme, responses, dominant, status) + text fields (emotional_pattern, interpretation, experience_implication, brand_partner_value, recommended_next_signal). Text fields only render when content exists.

---

### 4. Insight Reports Tab — Still Manual MVP

The Insight Reports Google Sheet tab is still manually authored. No automation has been added. The API reads and presents what is there — it does not write.

---

### 5. Make / Google Sheets

No change required. No Make scenario change needed. No new webhook. No new column mapping.

---

## ══════════════════════════════════════════════
## FIRST CONTROLLED SIGNAL SWITCH — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

First controlled active-signal switch performed. TypeScript: 0 errors. Build: ✓ Dynamic routes confirmed. Only `src/lib/signals.ts` changed (one line). No other files touched.

---

### 2. What changed

| Item | Before | After |
|---|---|---|
| `ACTIVE_SIGNAL_ID` | `"signal-2026-05-23"` | `"signal-2026-05-25"` |
| Active theme | AI Anxiety | Human Control |
| Active statistic | 67% | 58% |

`ACTIVE_SIGNAL` is derived automatically — no other code changed.

---

### 3. Archive state after switch

| signal_id | Theme | Status |
|---|---|---|
| `signal-2026-05-23` | AI Anxiety | Archived — data remains in Google Sheets |
| `signal-2026-05-24` | System Trust | Draft |
| `signal-2026-05-25` | Human Control | **Active** |
| `signal-2026-05-26` | Emotional Memory | Draft |

---

### 4. Required Google Sheets action (manual — not yet confirmed)

A row for `signal-2026-05-25` must exist in the **Signal Summary** tab before live aggregate data will return for this signal. Without it, `/api/signal-summary` returns `mode: "fallback"` with zero values — this is safe and expected until the row is added.

Old reactions under `signal-2026-05-23` remain in Google Sheets and are unaffected.

---

### 5. Make / Google Sheets

No change required. `signal_id` flows automatically from `ACTIVE_SIGNAL.signal_id`. New reactions submitted via the homepage will write `signal_id: "signal-2026-05-25"` to Sheet1.

---

## ══════════════════════════════════════════════
## SYSTEM PREVIEW PAGE — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

`/system-preview` internal page created. TypeScript: 0 errors. Build: ✓ 16 pages (was 15). No other files changed. Not linked in nav or footer.

---

### 2. New File

**`src/app/system-preview/page.tsx`** — `"use client"` page. Imports `ACTIVE_SIGNAL_ID`, `ACTIVE_SIGNAL`, `SIGNAL_ARCHIVE` directly from `@/lib/signals`. Fetches `/api/signal-summary` in `useEffect` (same pattern as homepage). No Framer Motion. No images. No new dependencies.

---

### 3. Page Sections

| § | Label | Content |
|---|---|---|
| 01 | Active Signal | ACTIVE_SIGNAL_ID, theme, date, status, source_page, statistic, statement, prompt |
| 02 | Live Summary | API mode badge, total responses, last_updated, reaction distribution bars |
| 03 | Signal Archive | All SIGNAL_ARCHIVE entries with Active / Past / Draft status |
| 04 | System Status | Signal Collection, Summary API, Raw Data, Summary CSV, Signal Rotation, Insight Reports |
| 05 | Next Operational Steps | Prioritised action list |

---

### 4. Access

Route: `/system-preview`
Auth: none — hidden by virtue of being unlinked
Not in navbar, footer, or any public page link.

---

### 5. Design

Premium dark ELIZIUM internal command centre style. Uses existing BG (`#050505`), typography classes (`font-display`, tracking patterns), and colour palette from the project. No external dependencies added.

---

### 6. What Is NOT Changed

- `src/app/page.tsx` — untouched
- `src/app/api/signal-summary/route.ts` — untouched
- `src/app/api/signal-reaction/route.ts` — untouched
- `src/lib/signals.ts` — untouched
- `src/components/layout/Navbar.tsx` — untouched (no link added)
- `src/components/layout/Footer.tsx` — untouched (no link added)
- Make / Google Sheets — no change required

---

## ══════════════════════════════════════════════
## ACTIVE_SIGNAL_ID ROTATION CONTROL — 2026-05-25
## ══════════════════════════════════════════════

### 1. Pass Status

`ACTIVE_SIGNAL_ID` single-control-point refactor complete. TypeScript: 0 errors. Build: ✓ Dynamic routes confirmed. Only `src/lib/signals.ts` changed. No other files touched.

---

### 2. What changed in `src/lib/signals.ts`

One new export introduced, one derivation changed:

| Item | Before | After |
|---|---|---|
| `ACTIVE_SIGNAL_ID` | Did not exist | `export const ACTIVE_SIGNAL_ID = "signal-2026-05-23"` — single string constant |
| `ACTIVE_SIGNAL` | Defined as an inline object literal | Derived: `getSignalById(ACTIVE_SIGNAL_ID)!` |

All consumers of `ACTIVE_SIGNAL` (`page.tsx`, `/api/signal-summary`, `/api/signal-reaction`) are **unchanged** — `ACTIVE_SIGNAL` remains typed as `Signal`, not `Signal | undefined`.

The non-null assertion `!` is intentional: if `ACTIVE_SIGNAL_ID` is ever set to an ID that does not exist in `SIGNAL_ARCHIVE`, a runtime error surfaces immediately — by design.

---

### 3. How to rotate to the next signal (AUTHORITATIVE — supersedes earlier instructions)

**Only one edit is ever needed:**

```ts
// src/lib/signals.ts — change this one line only
export const ACTIVE_SIGNAL_ID = "signal-2026-05-24";  // ← change to next signal_id
```

After changing `ACTIVE_SIGNAL_ID`:
1. Confirm the `signal_id` exists in `SIGNAL_ARCHIVE` in the same file.
2. Confirm a corresponding row exists in the Google Sheets Signal Summary tab for that `signal_id`.
3. Deploy. No other file changes required.

Do **not** edit `ACTIVE_SIGNAL` directly — it is now derived automatically.

---

### 4. Active Signal confirmed

- `ACTIVE_SIGNAL_ID` → `"signal-2026-05-25"`
- `ACTIVE_SIGNAL.signal_id` → `"signal-2026-05-25"` ✓
- `ACTIVE_SIGNAL.theme` → `"Human Control"` ✓
- `ACTIVE_SIGNAL.statistic` → `"58%"` ✓
- Signal reactions, Make webhook, Google Sheets: all unchanged
- Previous signal `signal-2026-05-23` (AI Anxiety) remains archived in SIGNAL_ARCHIVE and in Google Sheets

---

## ══════════════════════════════════════════════
## SIGNAL ARCHIVE — 2026-05-24
## ══════════════════════════════════════════════

### 1. Pass Status

Signal Archive structure introduced in `src/lib/signals.ts`. TypeScript: 0 errors. Build: ✓. No other files changed. Homepage visual output is identical.

---

### 2. What changed in `src/lib/signals.ts`

- `ACTIVE_SIGNAL` — **unchanged**. Still `signal-2026-05-23`. All live systems unaffected.
- `SIGNAL_ARCHIVE: Signal[]` — **new export**. Array of all signals, active at `[0]`, drafts below.
- `getSignalById(id)` — **new helper**. Returns a `Signal | undefined` from the archive by `signal_id`.
- `getActiveSignal()` — **new helper**. Returns `ACTIVE_SIGNAL`. Convenience for API consumers.

---

### 3. Archive contents

| Position | signal_id | Theme | Status |
|---|---|---|---|
| [0] — ACTIVE | `signal-2026-05-23` | AI Anxiety | Live |
| [1] | `signal-2026-05-24` | System Trust | Draft |
| [2] | `signal-2026-05-25` | Human Control | Draft |
| [3] | `signal-2026-05-26` | Emotional Memory | Draft |

---

### 4. How to rotate to a new signal

1. Update `ACTIVE_SIGNAL` in `src/lib/signals.ts` with the new signal's content.
2. Move that signal to `SIGNAL_ARCHIVE[0]` (or ensure it is already there).
3. Ensure a corresponding row exists in the Google Sheets Signal Summary tab for the new `signal_id`.
4. Deploy. No other file changes required.

---

### 5. Make / Google Sheets

No change required. `signal_id: "signal-2026-05-23"` continues to flow through Make unchanged. When a new signal is activated, its `signal_id` will flow through automatically. The Signal Summary sheet should eventually have one row per `signal_id`.

---

### 6. Draft signals — not activated, not wired

The three draft signals exist only in `src/lib/signals.ts`. They:
- Are not displayed on the homepage
- Do not affect `/api/signal-reaction` or `/api/signal-summary`
- Do not have Google Sheets Summary rows yet (not needed until activated)
- Are not automatically switched to on a schedule (no automation implemented)

---

## ══════════════════════════════════════════════
## SIGNAL SUMMARY API — 2026-05-24
## ══════════════════════════════════════════════

### 1. Pass Status

`/api/signal-summary` route added. TypeScript: 0 errors. Build: ✓ Dynamic.

---

### 2. New File

**`src/app/api/signal-summary/route.ts`** — GET handler. Server-side only. `export const dynamic = "force-dynamic"` prevents Next.js static caching.

---

### 3. What it does

1. Reads env var `SIGNAL_SUMMARY_CSV_URL` (server-side only, never exposed to client).
2. Fetches the published Signal Summary CSV with `cache: "no-store"`.
3. Parses the CSV and finds the row matching `ACTIVE_SIGNAL.signal_id`.
4. Returns normalised JSON.

**If the env var is missing, fetch fails, or no matching row is found → returns `mode: "fallback"` with zero values. Never returns a non-2xx status for data unavailability.**

---

### 4. Response shape

```json
{
  "ok": true,
  "mode": "live" | "fallback",
  "signal_id": "signal-2026-05-23",
  "total_responses": 42,
  "last_updated": "2026-05-24T10:00:00Z",
  "metrics": [
    { "reaction": "anxiety",    "label": "Anxiety",    "percent": 45.2, "count": 19 },
    { "reaction": "interest",   "label": "Interest",   "percent": 21.4, "count": 9  },
    { "reaction": "trust",      "label": "Trust",      "percent": 14.3, "count": 6  },
    { "reaction": "discomfort", "label": "Discomfort", "percent": 11.9, "count": 5  },
    { "reaction": "emptiness",  "label": "Emptiness",  "percent": 7.1,  "count": 3  }
  ]
}
```

Percent values are handled safely whether Google Sheets publishes them as `"50.00%"` or `"0.5"` (decimal).

---

### 5. Env var setup

**Name:** `SIGNAL_SUMMARY_CSV_URL`

**How to get it:**
1. Open the ELIZIUM Signal Reactions Google Sheet.
2. Go to the Signal Summary tab.
3. File → Share → Publish to web → select Signal Summary tab → CSV → Publish.
4. Copy the published CSV URL.

**Where to add it:**
- Locally: append `SIGNAL_SUMMARY_CSV_URL=https://docs.google.com/...` to `.env.local` (do not commit).
- Vercel: Settings → Environment Variables → `SIGNAL_SUMMARY_CSV_URL` → Preview (and Production when ready).
- Restart `npm run dev` after adding to `.env.local`.

---

### 6. What is NOT changed

- `src/app/api/signal-reaction/route.ts` — untouched. Raw reaction collection flow is unchanged.
- Make scenario and Google Sheets Sheet1 — untouched.
- Sheet1 (raw reactions) remains private. Only the Signal Summary tab is published as CSV.
- Homepage display — not yet connected to this route. Still uses `LIVE_EMOTIONAL_FALLBACK`.

---

### 7. Next step (not yet built)

Connect homepage §06 Live Emotional Data to `/api/signal-summary`.
Replace `LIVE_EMOTIONAL_FALLBACK` display with real aggregate data from this route.
Do not implement until explicitly instructed.

---

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



## Live Emotional Data — Homepage Connection Confirmed

Date confirmed: 24 May 2026

Status: LOCKED / WORKING

The homepage Live Emotional Data section is now connected to the live Signal Summary API.

Confirmed flow:
- User clicks a Signal of the Day reaction on the homepage.
- `/api/signal-reaction` sends the reaction to Make.
- Make writes the raw reaction row to Google Sheets `Sheet1`.
- `Signal Summary` tab calculates total responses, reaction counts, percentages, and last_updated.
- `/api/signal-summary` reads the published aggregate-only Signal Summary CSV.
- Homepage Live Emotional Data fetches `/api/signal-summary`.
- When `mode` is `live` and `total_responses > 0`, the homepage displays live reaction percentages.
- If the API fails or returns fallback, the homepage silently keeps the existing fallback metrics.

Important:
- Existing Signal reaction collection flow remains unchanged.
- Make/Google Sheets mapping remains unchanged.
- Raw `Sheet1` remains private.
- Only the aggregate Signal Summary CSV is published for MVP use.
- No dashboard, auth, Supabase, Firebase, or external database has been added.



## Insight Reports — Manual MVP Layer Created

Date confirmed: 24 May 2026

Status: LOCKED / MANUAL MVP

A new Google Sheets tab called `Insight Reports` has been created as the first interpretation layer for ELIZIUM METHOD.

Current sheet structure:
- `Sheet1` = raw Signal reaction log
- `Signal Summary` = aggregate counts, percentages, and last_updated
- `Insight Reports` = written strategic interpretation layer

Insight Reports columns:
- report_id
- date_created
- signal_id
- signal_theme
- total_responses
- dominant_reaction
- dominant_percent
- emotional_pattern
- interpretation
- experience_implication
- brand_partner_value
- recommended_next_signal
- status

First report:
- report_id: insight-2026-05-24-week-01
- signal_id: signal-2026-05-23
- signal_theme: AI Anxiety
- total_responses at creation: 5
- dominant pattern: anxiety + interest, 40% / 40%
- status: draft

Important:
- This report is manually generated at MVP stage.
- It is an early signal based on a small response count, not a final audience conclusion.
- It should be framed as an emotional interaction pattern, not a diagnosis or psychological profile.
- This layer proves the first ELIZIUM METHOD output: raw response → aggregate pattern → strategic emotional insight.
- No website/API connection to Insight Reports has been built yet.



## First Controlled Signal Rotation — Confirmed Working

Date confirmed: 25 May 2026

Status: LOCKED / WORKING

The first controlled active-signal switch has been completed successfully.

Previous active signal:
- signal-2026-05-23 — AI Anxiety

New active signal:
- signal-2026-05-25 — Human Control

Confirmed behaviour:
- ACTIVE_SIGNAL_ID now controls the active signal from `src/lib/signals.ts`.
- Homepage Signal of the Day now uses the Human Control signal.
- New Signal reactions are written to Google Sheets with `signal_id = signal-2026-05-25`.
- `Sheet1` keeps raw reactions for both old and new signals.
- `Signal Summary` calculates the new signal separately.
- `/api/signal-summary` returns `mode: live` for `signal-2026-05-25`.
- Homepage Live Emotional Data reads the current active signal’s summary.
- Previous signal data remains archived under `signal-2026-05-23`.

Google Sheets note:
- Each new active signal must have a matching row in `Signal Summary`.
- Formula range B:M should be copied from the working row.
- For `last_updated`, use the robust formula:
  `=IF($B4=0,"",INDEX(FILTER(Sheet1!D:D,TRIM(Sheet1!B:B)=TRIM(A4)),COUNTA(FILTER(Sheet1!D:D,TRIM(Sheet1!B:B)=TRIM(A4)))))`

Important:
- No Make mapping changes were required.
- No API payload changes were required.
- No dashboard/auth/database was added.
- Rotation is manual and controlled for now.
