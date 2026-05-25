
-- Enums
CREATE TYPE public.qualification_status AS ENUM ('qualified', 'disqualified');
CREATE TYPE public.website_type_pref AS ENUM ('hardcoded', 'cms', 'unsure');
CREATE TYPE public.ai_ranking_pref AS ENUM ('yes', 'no', 'unsure');
CREATE TYPE public.investment_ready_pref AS ENUM ('yes', 'maybe', 'no');
CREATE TYPE public.booking_status AS ENUM ('scheduled', 'cancelled', 'completed', 'rescheduled');

-- Qualified leads
CREATE TABLE public.qualified_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Contact
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_description TEXT,
  referral_source TEXT,

  -- Website status
  has_website BOOLEAN NOT NULL DEFAULT false,
  website_url TEXT,
  website_issues TEXT[] DEFAULT '{}',
  website_keep TEXT,
  style_inspiration TEXT,
  style_preference TEXT,

  -- Project
  avoid_text TEXT,
  website_type public.website_type_pref,
  seo_important BOOLEAN,
  ai_ranking public.ai_ranking_pref,
  features_needed TEXT[] DEFAULT '{}',

  -- Budget & timeline
  budget_range TEXT NOT NULL,
  launch_timeline TEXT NOT NULL,
  investment_ready public.investment_ready_pref NOT NULL,

  -- Qualification
  qualification_status public.qualification_status NOT NULL,
  disqualification_reason TEXT,

  -- Admin
  contacted BOOLEAN NOT NULL DEFAULT false,
  admin_notes TEXT,

  raw_payload JSONB
);

CREATE INDEX idx_qualified_leads_created_at ON public.qualified_leads(created_at DESC);
CREATE INDEX idx_qualified_leads_status ON public.qualified_leads(qualification_status);
CREATE INDEX idx_qualified_leads_email ON public.qualified_leads(email);

ALTER TABLE public.qualified_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit qualified leads"
ON public.qualified_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view qualified leads"
ON public.qualified_leads FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update qualified leads"
ON public.qualified_leads FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete qualified leads"
ON public.qualified_leads FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_qualified_leads_updated_at
BEFORE UPDATE ON public.qualified_leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  lead_id UUID NOT NULL REFERENCES public.qualified_leads(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  timezone TEXT NOT NULL DEFAULT 'Europe/Brussels',
  status public.booking_status NOT NULL DEFAULT 'scheduled',
  meeting_link TEXT,
  cancellation_reason TEXT
);

CREATE INDEX idx_bookings_scheduled_at ON public.bookings(scheduled_at);
CREATE INDEX idx_bookings_lead_id ON public.bookings(lead_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings"
ON public.bookings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
ON public.bookings FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Default availability config
INSERT INTO public.site_settings (key, value)
VALUES ('booking_availability', jsonb_build_object(
  'timezone', 'Europe/Brussels',
  'slot_minutes', 30,
  'weekday_hours', jsonb_build_object(
    '1', jsonb_build_array('09:00', '17:00'),
    '2', jsonb_build_array('09:00', '17:00'),
    '3', jsonb_build_array('09:00', '17:00'),
    '4', jsonb_build_array('09:00', '17:00'),
    '5', jsonb_build_array('09:00', '17:00')
  ),
  'max_days_ahead', 30,
  'min_hours_notice', 12
))
ON CONFLICT (key) DO NOTHING;
