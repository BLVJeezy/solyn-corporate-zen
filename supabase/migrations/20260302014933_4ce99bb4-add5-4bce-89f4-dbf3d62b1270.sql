
-- Create site_analytics table for tracking website visits
CREATE TABLE public.site_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page_path text NOT NULL DEFAULT '/',
  referrer text,
  device_type text DEFAULT 'desktop',
  source_type text DEFAULT 'direct',
  event_type text DEFAULT 'page_view',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking) 
CREATE POLICY "Anyone can insert analytics" ON public.site_analytics FOR INSERT WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can read analytics" ON public.site_analytics FOR SELECT TO authenticated USING (true);

-- Indexes for performance
CREATE INDEX idx_site_analytics_created_at ON public.site_analytics (created_at DESC);
CREATE INDEX idx_site_analytics_session_id ON public.site_analytics (session_id);
CREATE INDEX idx_site_analytics_event_type ON public.site_analytics (event_type);
