# HelalYol Refactor Plan

Rebrand and narrow the existing Mizan app into **HelalYol** — a focused, Turkish-first decision-support MVP for interest-free financing.

## Scope (what changes)

### 1. Brand & copy
- Replace visible "Mizan" with **HelalYol** across Turkish UI (logo, header, footer, titles, meta).
- Keep "Mizan" only as internal module/package name. No code rename of files/classes needed.
- Update `src/i18n/translations.ts` with new TR copy:
  - Tagline: *Kredi değil, faizsiz yol bul.*
  - Landing hero, subhead, CTAs, dashboard summary, journey labels, disclaimers.
- Default language stays `tr`. EN strings updated lightly to match.

### 2. Landing page (`src/routes/index.tsx`)
Rebuild as a clean fintech landing:
- **Hero**: headline, subhead, two CTAs (`Yol Haritamı Çıkar` → `/onboarding`, `Sözleşme Kontrolü Gör` → `/contract`), and a mock chat card showing the example Q&A + 3 mini result chips (Katılım bankası, Satıcı vadeli satış, Tasarruf finansmanı). *(Mock chips show short labels + "Uygun" / "Avantajlı" style tags — no `78/100` numbers, per existing constraint in repo against numerical scores. I will use tag labels instead of the spec's `78/100` to stay consistent with the project rule.)*
- **"Ne yapmak istiyorsun?"** section: 4 large cards (Ev / Araba / KOBİ / Sözleşme), each with icon, description, `Başla` CTA.
- Footer with strong disclaimer box.
- Remove pricing grid and broad feature lists.

### 3. Dashboard simplification (`src/routes/_app.dashboard.tsx`)
- Top line: *Bugün ne için faizsiz yol arıyorsunuz?*
- 4 primary action cards (same 4 journeys).
- "Son oluşturulan yol haritaları" section with 3 fake demo entries.
- Demote Zekat / Planner / Settings — remove from primary quick actions; keep accessible via sidebar under a "Diğer araçlar" group.

### 4. Sidebar (`src/components/AppSidebar.tsx`)
- Primary group: Dashboard, Ev, Araba, KOBİ, Sözleşme.
- Secondary group ("Diğer araçlar"): Zekat, Planner, Settings.

### 5. Journey forms
- Add a reusable `JourneyForm` component driving a stepped flow.
- Update existing journey routes to use new fields per spec:
  - `_app.compare.home.tsx`: price, peşinat, monthly capacity, timeline, openness to katılım/tasarruf/satıcı vadeli.
  - `_app.compare.vehicle.tsx`: price, peşinat, monthly, bireysel/ticari, timeline, openness flags.
  - Add `_app.business.index.tsx` (new) as the unified KOBİ form (purpose, amount, equity, capacity, duration, documentation, collateral). Existing `_app.business.*` sub-routes can remain reachable but the entry is the new form.
- Hide `_app.compare.personal.tsx` and `_app.compare.card.tsx` from nav (files stay).

### 6. Result cards
Update `ResultCard` to add:
- "Yöntem uygunluğu" label (tag-based, NOT a numeric score — keeps repo rule).
- "Neden bu skor?" expandable section listing positive factors + things to check (per-option content lives in data files).
- Existing "Sorulacak sorular" accordion preserved.
- Risk badge + estimated need + estimated period preserved.
- `ChecklistBox` rendered below results.

Update `src/data/compareOptions.ts` and `src/data/smeOptions.ts` to add `whyScore: { positives, checks }` per option, using the examples from the spec for Katılım Bankası, Satıcı Vadeli, Leasing/Ijara.

### 7. Contract analysis (`src/routes/_app.contract.tsx`)
- Rename heading to *Sözleşme Ne Diyor?*
- Replace existing finding cards with the 5 demo cards from spec (Toplam Maliyet, Gecikme Cezası, Erken Kapama, Teminat/İpotek, Danışma Kurulu) with statuses (Bulundu / Kontrol edilmeli / Belirsiz / Mevcut / Sorulmalı).
- Add `Bankaya Sorulacak Soruları Oluştur` button revealing 7 questions from spec.
- Include `ChecklistBox` and strong `DisclaimerBox`.

### 8. New shared components
- `src/components/ChecklistBox.tsx` — 10-item Faizsiz Finans Kontrol Listesi.
- `src/components/ScoreExplanation.tsx` — collapsible positives/checks block used inside `ResultCard`.
- `src/components/HeroMockCard.tsx` — landing hero chat mock.
- `src/components/PrimaryActionCards.tsx` — reusable 4-card grid used on landing + dashboard.
- `src/components/Footer.tsx` — disclaimer footer for landing.
- Strengthen `DisclaimerBox` with the long disclaimer text.

### 9. Visual style
- Stay on existing palette (primary green `#1A6B3C`, gold accent) — already matches "soft green, dark green CTA" requirement.
- Tighten landing to white bg, rounded cards, soft shadows. No new decorative Islamic patterns.

## Out of scope
- No backend, no auth, no AI calls — all results remain client-side mocks (matches current architecture).
- No file rename of `Mizan`-named modules; brand swap is copy-only.
- Personal loan + Card comparison routes kept on disk but unlinked.
- No numeric scores anywhere (overrides spec's `78/100` mock — uses tag labels instead, consistent with existing project constraint).

## Technical notes
- All edits stay in `src/`. No new packages.
- Routes follow existing `_app.*` flat convention; new KOBİ entry added as `_app.business.index.tsx` (`/business`).
- `translations.ts` gains new keys; both `tr` and `en` populated to keep type safety.
- Forms use local `useState`, results derived synchronously via existing `getHomeOptions` / `getSmeOptions` helpers (extended).
