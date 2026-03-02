
-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view subscribers
CREATE POLICY "Authenticated users can read subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Only authenticated users can delete subscribers
CREATE POLICY "Authenticated users can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
USING (auth.uid() IS NOT NULL);
