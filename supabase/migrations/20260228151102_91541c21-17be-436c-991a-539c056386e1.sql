
-- Replace permissive policies with auth-required ones

-- Leads
DROP POLICY "Allow all access to leads" ON public.leads;
CREATE POLICY "Authenticated users can manage leads" ON public.leads
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Lead notes
DROP POLICY "Allow all access to lead_notes" ON public.lead_notes;
CREATE POLICY "Authenticated users can manage lead_notes" ON public.lead_notes
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Clients
DROP POLICY "Allow all access to clients" ON public.clients;
CREATE POLICY "Authenticated users can manage clients" ON public.clients
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
