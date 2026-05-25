/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as customerApplicationReceived } from './customer-application-received.tsx'
import { template as customerBookingConfirmed } from './customer-booking-confirmed.tsx'
import { template as ownerNewApplication } from './owner-new-application.tsx'
import { template as ownerNewBooking } from './owner-new-booking.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'customer-application-received': customerApplicationReceived,
  'customer-booking-confirmed': customerBookingConfirmed,
  'owner-new-application': ownerNewApplication,
  'owner-new-booking': ownerNewBooking,
}
