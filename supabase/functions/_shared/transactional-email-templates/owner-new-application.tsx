import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import {
  SITE_NAME, OWNER_EMAIL, main, container, card, brandRow, brandText,
  h1, text, hr, footer, detailLabel, detailValue, colors,
} from './_styles.ts'

interface Props {
  full_name?: string
  business_name?: string
  email?: string
  phone?: string
  business_description?: string
  budget_range?: string
  launch_timeline?: string
  qualification_status?: string
  disqualification_reason?: string
  preferred_language?: string
  referral_source?: string
  lead_id?: string
}

const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <>
      <Text style={detailLabel}>{label}</Text>
      <Text style={detailValue}>{value}</Text>
    </>
  ) : null

const OwnerNewApplication = (p: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New {p.qualification_status || 'lead'}: {p.full_name || 'Unknown'} — {p.business_name || ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandRow}>
          <Text style={brandText}>{SITE_NAME} · Internal</Text>
        </Section>
        <Section style={card}>
          <Heading style={h1}>
            New application received
          </Heading>
          <Text style={text}>
            Status:{' '}
            <span style={{
              color: p.qualification_status === 'qualified' ? colors.goldDark : colors.body,
              fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '13px',
            }}>
              {p.qualification_status || 'unknown'}
            </span>
            {p.disqualification_reason ? ` (${p.disqualification_reason})` : ''}
          </Text>

          <Hr style={hr} />

          <Row label="Name" value={p.full_name} />
          <Row label="Business" value={p.business_name} />
          <Row label="Email" value={p.email} />
          <Row label="Phone" value={p.phone} />
          <Row label="Preferred language" value={p.preferred_language} />
          <Row label="Referral source" value={p.referral_source} />
          <Row label="Budget" value={p.budget_range} />
          <Row label="Timeline" value={p.launch_timeline} />
          <Row label="Project description" value={p.business_description} />
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
    phone: '+32 470 00 00 00',
    business_description: 'Premium e-commerce store for handmade ceramics.',
    budget_range: '2000-5000',
    launch_timeline: '1_month',
    qualification_status: 'qualified',
    preferred_language: 'en',
    referral_source: 'google',
    lead_id: '00000000-0000-0000-0000-000000000000',
  },
} satisfies TemplateEntry
