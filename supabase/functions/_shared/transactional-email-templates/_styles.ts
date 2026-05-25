// Shared inline styles for Solyn transactional emails.
// Brand: warm cream background, deep near-black ink, gold accent.

export const SITE_NAME = 'Solyn'
export const SITE_URL = 'https://solyn-global.com'
export const OWNER_EMAIL = 'jasonbalongo@gmail.com'

export const colors = {
  ink: '#14110F',
  body: '#55524E',
  muted: '#8A857F',
  cream: '#F8F5EF',
  border: '#E8E2D6',
  gold: '#C9A24C',
  goldDark: '#A4842F',
  white: '#FFFFFF',
}

export const main = {
  backgroundColor: '#FFFFFF',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
  margin: 0,
  padding: 0,
}

export const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 24px 24px',
}

export const card = {
  backgroundColor: colors.cream,
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
  padding: '36px 32px',
}

export const brandRow = {
  textAlign: 'center' as const,
  marginBottom: '28px',
}

export const brandText = {
  fontSize: '14px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: colors.gold,
  fontWeight: 600,
  margin: 0,
}

export const h1 = {
  fontSize: '26px',
  lineHeight: 1.25,
  fontWeight: 700,
  color: colors.ink,
  margin: '0 0 16px',
  letterSpacing: '-0.01em',
}

export const text = {
  fontSize: '15px',
  lineHeight: 1.65,
  color: colors.body,
  margin: '0 0 16px',
}

export const small = {
  fontSize: '13px',
  lineHeight: 1.6,
  color: colors.muted,
  margin: '0 0 8px',
}

export const button = {
  display: 'inline-block',
  backgroundColor: colors.ink,
  color: colors.white,
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '999px',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.02em',
}

export const hr = {
  border: 'none',
  borderTop: `1px solid ${colors.border}`,
  margin: '28px 0',
}

export const detailLabel = {
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: colors.muted,
  fontWeight: 600,
  margin: '0 0 4px',
}

export const detailValue = {
  fontSize: '15px',
  color: colors.ink,
  margin: '0 0 18px',
  fontWeight: 500,
}

export const footer = {
  fontSize: '12px',
  color: colors.muted,
  textAlign: 'center' as const,
  margin: '24px 0 0',
  lineHeight: 1.6,
}
