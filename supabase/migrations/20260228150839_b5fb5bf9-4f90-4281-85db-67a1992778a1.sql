
CREATE TYPE public.billing_cycle AS ENUM ('maandelijks', 'jaarlijks');

ALTER TABLE public.clients
  ADD COLUMN setup_fee TEXT,
  ADD COLUMN recurring_fee TEXT,
  ADD COLUMN billing_cycle billing_cycle DEFAULT 'maandelijks',
  ADD COLUMN start_date DATE;
