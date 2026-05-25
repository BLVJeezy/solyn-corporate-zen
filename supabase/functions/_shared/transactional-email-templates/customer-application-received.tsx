import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'
import {
  SITE_NAME, main, container, card, brandRow, brandText,
  h1, text, hr, footer,
} from './_styles.ts'

interface Props {
  name?: string
  business_name?: string
}

const CustomerApplicationReceived = ({ name, business_name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your application — {SITE_NAME} will be in touch shortly.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandRow}>
          <Text style={brandText}>{SITE_NAME}</Text>
        </Section>
        <Section style={card}>
          <Heading style={h1}>
            {name ? `Thank you, ${name}.` : 'Thank you for your application.'}
          </Heading>
          <Text style={text}>
            We&rsquo;ve received your project details{business_name ? ` for ${business_name}` : ''}.
            Our team is reviewing the brief and will personally reach out within one business day
            to discuss next steps.
          </Text>
          <Text style={text}>
            In the meantime, feel free to reply to this email with anything else you&rsquo;d like
            us to know — references, examples, or specific goals.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            {SITE_NAME} — crafting premium digital experiences.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CustomerApplicationReceived,
  subject: 'We received your application',
  displayName: 'Customer — Application received',
  previewData: { name: 'Jason', business_name: 'Acme Studio' },
} satisfies TemplateEntry
