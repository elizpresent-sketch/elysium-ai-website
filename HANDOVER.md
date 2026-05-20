# ELIZIUM AI — Handover Document
_Last updated: May 2026_

---

## 1. Project

**Name:** ELIZIUM AI
**Local folder:** `/Users/elizavetazhuravleva/Desktop/elysium-ai-website`
**Shell path (bash tools):** `/sessions/upbeat-wonderful-volta/mnt/elysium-ai-website/`

### Hard Constraints — Never Override
- Do NOT deploy.
- Personal portfolio at `/Users/elizavetazhuravleva/Downloads/UNI/MP/ELIZAVETA_WEBSITE/04_final_site` — completely separate project, do not touch.
- All copy/written text — must remain word-for-word.
- All routes/hrefs — must remain unchanged.

---

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
