CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are publicly readable"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert site settings"
ON public.site_settings FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
ON public.site_settings FOR UPDATE
TO authenticated
USING (true);

INSERT INTO public.site_settings (key, value) VALUES
  ('home_enabled', 'false'::jsonb),
  ('about_enabled', 'false'::jsonb)
ON CONFLICT (key) DO NOTHING;

ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;