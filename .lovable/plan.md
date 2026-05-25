
# Solyn Global — Qualification Funnel & Booking System

Replace the current Calendly-based `/book` page with a premium, multi-step lead qualification funnel and a native booking system. Built in your existing stack (React + Vite + Tailwind + Lovable Cloud). No Next.js migration.

---

## 1. User-facing flow (route: `/book`)

```text
Step 1  Basic Info ──► Step 2  Website Status ──► Step 3  Project Qualification
                                                          │
                                                          ▼
                                          Step 4  Budget & Timeline
                                                          │
                          ┌───────── qualification logic ─────────┐
                          ▼                                       ▼
                  NOT qualified                              QUALIFIED
                  Premium "thanks, not now" state            Step 5  Booking (date + time)
                                                                          │
                                                                          ▼
                                                          Confirmation screen
                                                          + Add to Calendar (.ics, Google, Outlook)
```

**Disqualification rule** (any of):
- Budget €0–€500 or €500–€1000
- "No" on investment readiness
- "Just exploring options" on timeline

**Funnel UX**
- Sticky top progress bar (4 segments before booking)
- Framer Motion slide+fade between steps
- Auto-save to `localStorage` per step (resume if reload)
- Zod validation per step, inline errors
- Premium dark glass UI on funnel (overrides site light theme for `/book` only — luxury SaaS feel as requested)
- Mobile-first, large tap targets, single column

---

## 2. Booking system (replaces Calendly)

- Custom calendar (built on shadcn `Calendar`)
- Owner availability config in `site_settings` (weekdays, hours, slot length 30min, timezone Europe/Brussels)
- Auto-detect visitor timezone, display both
- Live availability: query existing bookings, disable conflicting slots
- Disable past dates, weekends (configurable), and dates >30 days out
- Smooth slot picker with animated selection
- Confirm screen with order summary

**Meeting link**: per your choice, link starts empty. Owner pastes link from admin → triggers "link ready" email to client (optional toggle; v1 includes link in initial owner email + client gets placeholder + follow-up when set).

---

## 3. Database (new tables)

- **`qualified_leads`** — stores all funnel answers as structured columns + raw JSONB
  - contact: full_name, business_name, email, phone, business_description, referral_source
  - website: has_website (bool), website_url, website_issues (text[]), website_keep, style_inspiration, style_preference
  - project: avoid_text, website_type (hardcoded|cms), seo_important (bool), ai_ranking (yes|no|unsure), features_needed (text[])
  - budget: budget_range, launch_timeline, investment_ready
  - qualification_status (qualified|disqualified), disqualification_reason
- **`bookings`**
  - lead_id (fk), scheduled_at (timestamptz), duration_minutes, timezone, status (scheduled|cancelled|completed|rescheduled), meeting_link (nullable), cancellation_reason
- **`booking_availability`** (single row in `site_settings` as JSONB instead — simpler)

RLS: public INSERT on `qualified_leads`, public INSERT on `bookings` (with availability validation in edge function). Admin-only SELECT/UPDATE via `has_role(auth.uid(), 'admin')`.

---

## 4. Edge functions

1. **`submit-qualified-lead`** — validates payload (Zod), inserts lead, returns lead_id + qualification result. Sends owner notification email immediately on submit (qualified or not).
2. **`create-booking`** — validates slot availability server-side, inserts booking, sends owner notification + client confirmation emails. Rate-limited.
3. **`booking-availability`** — returns booked slots for a given date range.
4. **`generate-ics`** — returns `.ics` file for client download.

All use existing Lovable Emails queue (`enqueue_email` RPC).

---

## 5. Emails (Lovable Emails, premium HTML)

**Email 1 → owner (`jasonbalongo@gmail.com`)**
Subject: `New Qualified Solyn Global Lead Booked`
Sections: Contact · Business · Website · Project · Budget · Booking details · Meeting link placeholder (manual add link). Dark luxury HTML.

**Email 2 → client**
Subject: `Your Solyn Global Strategy Call Is Confirmed`
Headline + message per spec. Includes: date/time in their TZ, "meeting link will follow shortly" notice, Add to Calendar buttons (Google, Outlook web links + .ics download URL), preparation tips, intro video placeholder (easy-to-replace constant), Solyn branding.

---

## 6. Admin dashboard extension

New tab in existing `/admin`: **"Bookings"**
- List of qualified leads with status badge
- Detail panel: all funnel answers, booking details
- Actions: mark contacted, cancel meeting, reschedule (date/time picker), paste/edit meeting link → triggers "link is ready" email
- Search by name/email/business, filter by status/date range
- Export CSV
- Counts in dashboard overview KPIs

Matches existing admin SaaS aesthetic (glass header, noise textures).

---

## 7. Translations

NL / FR / EN for all funnel labels, options, validation messages, emails. Following existing `src/i18n/translations.ts` pattern.

---

## 8. What I will NOT do in this iteration

- Zoom API integration (per your choice — manual link)
- Webhook endpoints (can add later)
- CRM sync
- SendGrid (using Lovable Emails which is already set up)

---

## Technical details

**Files created**
- `src/pages/Apply.tsx` — funnel host page (replaces BookCall on `/book` route)
- `src/components/funnel/` — `FunnelLayout.tsx`, `ProgressBar.tsx`, `StepBasicInfo.tsx`, `StepWebsite.tsx`, `StepProject.tsx`, `StepBudget.tsx`, `StepBooking.tsx`, `StepConfirmation.tsx`, `StepDisqualified.tsx`
- `src/components/funnel/BookingCalendar.tsx`, `TimeSlotPicker.tsx`
- `src/lib/funnelSchema.ts` (Zod), `src/lib/funnelStorage.ts` (localStorage), `src/lib/qualification.ts`, `src/lib/ics.ts`
- `src/hooks/useFunnelState.ts`, `src/hooks/useAvailability.ts`
- `src/components/admin/BookingsSection.tsx`, `BookingDetailPanel.tsx`, `RescheduleDialog.tsx`
- `supabase/functions/submit-qualified-lead/index.ts`
- `supabase/functions/create-booking/index.ts`
- `supabase/functions/booking-availability/index.ts`
- `supabase/functions/generate-ics/index.ts`
- Migration: `qualified_leads`, `bookings` tables + RLS + indexes; seed booking availability into `site_settings`

**Files edited**
- `src/App.tsx` — `/book` now renders `Apply`; remove old `BookCall` import
- `src/pages/Admin.tsx` — add Bookings tab
- `src/i18n/translations.ts` — add funnel keys for NL/FR/EN
- Memory: add `mem://features/qualification-funnel`

**Files removed**
- `src/pages/BookCall.tsx`, `src/lib/calendly.ts`
- Update `mem://integrations/calendly-booking` → mark replaced

**Estimated scope**: ~25 new files, large but focused build. I'll create tasks and ship in one pass after you approve.

---

Approve and I'll start building.
