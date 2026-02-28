
-- Create storage bucket for invoices
INSERT INTO storage.buckets (id, name, public) VALUES ('invoices', 'invoices', false);

-- RLS policies for invoices bucket - only authenticated users
CREATE POLICY "Authenticated users can upload invoices"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'invoices');

CREATE POLICY "Authenticated users can view invoices"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'invoices');

CREATE POLICY "Authenticated users can delete invoices"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'invoices');

-- Create table to link invoices to clients
CREATE TABLE public.client_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.client_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage client_invoices"
ON public.client_invoices FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
