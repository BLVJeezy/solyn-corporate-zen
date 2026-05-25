import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import {
  SITE_NAME, OWNER_EMAIL, main, container, card, brandRow, brandText,
  h1, text, hr, footer, detailLabel, detailValue, colors,
} from './_styles.ts'

// ---------- Friendly label maps ----------
const LANG: Record<string, string> = {
  nl: 'Dutch (Nederlands)', fr: 'French (Français)', en: 'English', other: 'Other',
}
const REFERRAL: Record<string, string> = {
  google: 'Google', facebook: 'Facebook', instagram: 'Instagram',
  ai: 'AI recommendation', word_of_mouth: 'Word of mouth', other: 'Other',
}
const BUDGET: Record<string, string> = {
  '0-500': '€0 – €500', '500-1000': '€500 – €1,000', '1000-2000': '€1,000 – €2,000',
  '2000-5000': '€2,000 – €5,000', '5000+': '€5,000+',
}
const TIMELINE: Record<string, string> = {
  asap: 'ASAP', '1_month': 'Within 1 month', '3_months': 'Within 3 months', exploring: 'Just exploring',
}
const INVESTMENT: Record<string, string> = { yes: 'Yes', maybe: 'Maybe', no: 'No' }
const WEBSITE_TYPE: Record<string, string> = {
  hardcoded: 'Hardcoded / custom-built', cms: 'CMS (WordPress, Wix, Squarespace…)', unsure: 'Unsure',
}
const AI_RANKING: Record<string, string> = { yes: 'Yes', no: 'No', unsure: 'Unsure' }
const WEBSITE_ISSUE: Record<string, string> = {
  outdated_design: 'Outdated design', not_mobile_friendly: 'Not mobile friendly',
  slow_loading: 'Slow loading', poor_seo: 'Poor SEO', no_clients: 'Not generating clients',
  hard_to_update: 'Hard to update', bad_ux: 'Bad UX', unprofessional: 'Unprofessional', other: 'Other',
}
const STYLE_PREF: Record<string, string> = {
  modern_premium: 'Modern & premium', minimal_clean: 'Minimal & clean', corporate: 'Corporate',
  luxury: 'Luxury', creative: 'Creative', futuristic: 'Futuristic', bold: 'Bold',
}
const FEATURE: Record<string, string> = {
  booking: 'Booking system', contact_forms: 'Contact forms', payments: 'Payments',
  portfolio: 'Portfolio', reviews: 'Reviews', ai_chatbot: 'AI chatbot',
  automations: 'Automations', multilingual: 'Multilingual', seo: 'SEO',
  client_portal: 'Client portal', other: 'Other',
}

const label = (map: Record<string, string>, v: any) =>
  v == null || v === '' ? null : (map[String(v)] ?? String(v))

const labelList = (map: Record<string, string>, v: any): string | null => {
  const arr = Array.isArray(v) ? v : typeof v === 'string' && v ? v.split(',') : []
  if (!arr.length) return null
  return arr.map((k: string) => map[k.trim()] ?? k.trim()).join(', ')
}

const yn = (v: any): string | null =>
  v === true || v === 'true' ? 'Yes' : v === false || v === 'false' ? 'No' : null

interface Props {
  // Basic
  full_name?: string
  business_name?: string
  email?: string
  phone?: string
  business_description?: string
  preferred_language?: string
  referral_source?: string
  // Website
  has_website?: boolean | string
  website_url?: string
  website_issues?: string[] | string
  website_keep?: string
  style_inspiration?: string
  style_preference?: string[] | string
  // Project
  avoid_text?: string
  website_type?: string
  seo_important?: boolean | string
  ai_ranking?: string
  features_needed?: string[] | string
  // Budget
  budget_range?: string
  launch_timeline?: string
  investment_ready?: string
  // Meta
  qualification_status?: string
  disqualification_reason?: string
  lead_id?: string
  submitted_at?: string
}

const Row = ({ label: l, value }: { label: string; value?: string | null }) =>
  value ? (
    <>
      <Text style={detailLabel}>{l}</Text>
      <Text style={detailValue}>{value}</Text>
    </>
  ) : null

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={{
    fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
    color: colors.goldDark, fontWeight: 700, margin: '8px 0 14px',
  }}>{children}</Text>
)

const OwnerNewApplication = (p: Props) => {
  const submitted = p.submitted_at ? new Date(p.submitted_at).toLocaleString('en-GB', {
    dateStyle: 'medium', timeStyle: 'short',
  }) : null
  const statusColor = p.qualification_status === 'qualified' ? colors.goldDark : colors.body

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        New {p.qualification_status || 'lead'}: {p.full_name || 'Unknown'} — {p.business_name || ''}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={brandRow}>
            <Text style={brandText}>{SITE_NAME} · Internal</Text>
          </Section>
          <Section style={card}>
            <Heading style={h1}>New application received</Heading>
            <Text style={text}>
              Status:{' '}
              <span style={{
                color: statusColor, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.08em', fontSize: '13px',
              }}>{p.qualification_status || 'unknown'}</span>
              {p.disqualification_reason ? ` — ${p.disqualification_reason}` : ''}
            </Text>
            {submitted && <Text style={{ ...text, marginTop: '-8px' }}>Submitted: {submitted}</Text>}

            <Hr style={hr} />
            <SectionTitle>Contact</SectionTitle>
            <Row label="Full name" value={p.full_name} />
            <Row label="Business name" value={p.business_name} />
            <Row label="Email" value={p.email} />
            <Row label="Phone" value={p.phone} />
            <Row label="Preferred language" value={label(LANG, p.preferred_language)} />
            <Row label="How they heard about us" value={label(REFERRAL, p.referral_source)} />
            <Row label="Business description" value={p.business_description} />

            <Hr style={hr} />
            <SectionTitle>Current website</SectionTitle>
            <Row label="Has a website" value={yn(p.has_website)} />
            <Row label="Website URL" value={p.website_url} />
            <Row label="Website issues" value={labelList(WEBSITE_ISSUE, p.website_issues)} />
            <Row label="What to keep" value={p.website_keep} />
            <Row label="Style inspiration" value={p.style_inspiration} />
            <Row label="Style preferences" value={labelList(STYLE_PREF, p.style_preference)} />

            <Hr style={hr} />
            <SectionTitle>Project requirements</SectionTitle>
            <Row label="Things to avoid" value={p.avoid_text} />
            <Row label="Preferred website type" value={label(WEBSITE_TYPE, p.website_type)} />
            <Row label="SEO important" value={yn(p.seo_important)} />
            <Row label="Wants AI ranking" value={label(AI_RANKING, p.ai_ranking)} />
            <Row label="Features needed" value={labelList(FEATURE, p.features_needed)} />

            <Hr style={hr} />
            <SectionTitle>Budget & timeline</SectionTitle>
            <Row label="Budget range" value={label(BUDGET, p.budget_range)} />
            <Row label="Launch timeline" value={label(TIMELINE, p.launch_timeline)} />
            <Row label="Investment ready" value={label(INVESTMENT, p.investment_ready)} />

            <Hr style={hr} />
            <SectionTitle>Meta</SectionTitle>
            <Row label="Lead ID" value={p.lead_id} />

            <Hr style={hr} />
            <Text style={footer}>
              Sent to {OWNER_EMAIL} — internal notification from {SITE_NAME}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: OwnerNewApplication,
  to: OWNER_EMAIL,
  subject: (d: Record<string, any>) =>
    `New ${d.qualification_status || 'lead'}: ${d.full_name || 'Unknown'}${d.business_name ? ' — ' + d.business_name : ''}`,
  displayName: 'Owner — New application',
  previewData: {
    full_name: 'Jason Balongo',
    business_name: 'Acme Studio',
    email: 'jason@example.com',
    phone: '+32 470 12 34 56',
    business_description: 'Premium e-commerce store for handmade ceramics, shipping across the EU.',
    preferred_language: 'en',
    referral_source: 'google',
    has_website: true,
    website_url: 'https://acme-studio.com',
    website_issues: ['outdated_design', 'slow_loading', 'poor_seo'],
    website_keep: 'The logo and brand colors.',
    style_inspiration: 'https://apple.com, https://linear.app',
    style_preference: ['modern_premium', 'minimal_clean'],
    avoid_text: 'No stock photography, no purple gradients.',
    website_type: 'cms',
    seo_important: true,
    ai_ranking: 'yes',
    features_needed: ['booking', 'payments', 'multilingual', 'seo'],
    budget_range: '2000-5000',
    launch_timeline: '1_month',
    investment_ready: 'yes',
    qualification_status: 'qualified',
    lead_id: '00000000-0000-0000-0000-000000000000',
    submitted_at: new Date().toISOString(),
  },
} satisfies TemplateEntry
