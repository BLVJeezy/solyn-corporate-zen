import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import {
  SITE_NAME, main, container, card, brandRow, brandText,
  h1, text, hr, footer, button, detailLabel, detailValue, colors,
} from './_styles.ts'

interface Props {
  name?: string
  scheduled_at?: string // ISO
  timezone?: string
  meeting_link?: string
}

function formatDate(iso?: string, tz?: string) {
  if (!iso) return { date: '—', time: '—' }
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: tz || 'Europe/Brussels',
  })
  const time = d.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', hour12: false,
    timeZone: tz || 'Europe/Brussels',
  })
  return { date, time }
}

const CustomerBookingConfirmed = ({ name, scheduled_at, timezone, meeting_link }: Props) => {
  const { date, time } = formatDate(scheduled_at, timezone)
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your call with {SITE_NAME} is confirmed for {date} at {time}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={brandRow}>
            <Text style={brandText}>{SITE_NAME}</Text>
          </Section>
          <Section style={card}>
            <Heading style={h1}>
              {name ? `You're booked, ${name}.` : 'Your call is confirmed.'}
            </Heading>
            <Text style={text}>
              We&rsquo;re looking forward to discussing your project. Here are the details:
            </Text>

            <Text style={detailLabel}>Date</Text>
            <Text style={detailValue}>{date}</Text>

            <Text style={detailLabel}>Time</Text>
            <Text style={detailValue}>{time} ({timezone || 'Europe/Brussels'})</Text>

            <Text style={detailLabel}>Duration</Text>
            <Text style={detailValue}>30 minutes</Text>

            {meeting_link ? (
              <>
                <Text style={detailLabel}>Meeting link</Text>
                <Text style={{ ...detailValue, marginBottom: '24px' }}>
                  <Link href={meeting_link} style={{ color: colors.goldDark }}>
                    {meeting_link}
                  </Link>
                </Text>
                <Button href={meeting_link} style={button}>Join the call</Button>
              </>
            ) : (
              <Text style={{ ...text, color: colors.muted, fontStyle: 'italic' }}>
                We&rsquo;ll send the meeting link separately before the call.
              </Text>
            )}

            <Hr style={hr} />
            <Text style={text}>
              Need to reschedule? Just reply to this email and we&rsquo;ll sort it out.
            </Text>
            <Text style={footer}>
              {SITE_NAME} — crafting premium digital experiences.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: CustomerBookingConfirmed,
  subject: 'Your call with Solyn is confirmed',
  displayName: 'Customer — Booking confirmed',
  previewData: {
    name: 'Jason',
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    timezone: 'Europe/Brussels',
    meeting_link: '',
  },
} satisfies TemplateEntry
