import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import {
  SITE_NAME, OWNER_EMAIL, main, container, card, brandRow, brandText,
  h1, text, hr, footer, detailLabel, detailValue,
} from './_styles.ts'

interface Props {
  full_name?: string
  business_name?: string
  email?: string
  phone?: string
  scheduled_at?: string
  timezone?: string
  budget_range?: string
  launch_timeline?: string
  business_description?: string
  lead_id?: string
  booking_id?: string
}

function formatDateTime(iso?: string, tz?: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: tz || 'Europe/Brussels',
  })
  const time = d.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', hour12: false,
    timeZone: tz || 'Europe/Brussels',
  })
  return `${date} · ${time} (${tz || 'Europe/Brussels'})`
}

const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <>
      <Text style={detailLabel}>{label}</Text>
      <Text style={detailValue}>{value}</Text>
    </>
  ) : null

const OwnerNewBooking = (p: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New booking: {p.full_name || 'Lead'} — {formatDateTime(p.scheduled_at, p.timezone)}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandRow}>
          <Text style={brandText}>{SITE_NAME} · Internal</Text>
        </Section>
        <Section style={card}>
          <Heading style={h1}>New call booked</Heading>
          <Text style={text}>
            A qualified lead just scheduled a call. Don&rsquo;t forget to send the meeting link.
          </Text>

          <Hr style={hr} />

          <Row label="When" value={formatDateTime(p.scheduled_at, p.timezone)} />
          <Row label="Name" value={p.full_name} />
          <Row label="Business" value={p.business_name} />
          <Row label="Email" value={p.email} />
          <Row label="Phone" value={p.phone} />
          <Row label="Budget" value={p.budget_range} />
          <Row label="Timeline" value={p.launch_timeline} />
          <Row label="Project description" value={p.business_description} />
          <Row label="Lead ID" value={p.lead_id} />
          <Row label="Booking ID" value={p.booking_id} />

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
  component: OwnerNewBooking,
  to: OWNER_EMAIL,
  subject: (d: Record<string, any>) =>
    `New booking: ${d.full_name || 'Lead'}${d.business_name ? ' — ' + d.business_name : ''}`,
  displayName: 'Owner — New booking',
  previewData: {
    full_name: 'Jason Balongo',
    business_name: 'Acme Studio',
    email: 'jason@example.com',
    phone: '+32 470 00 00 00',
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    timezone: 'Europe/Brussels',
    budget_range: '2000-5000',
    launch_timeline: '1_month',
    business_description: 'Premium e-commerce store for handmade ceramics.',
    lead_id: '00000000-0000-0000-0000-000000000000',
    booking_id: '00000000-0000-0000-0000-000000000001',
  },
} satisfies TemplateEntry
