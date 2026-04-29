-- Trip history (every selected plan)
CREATE TABLE public.trip_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  total_cost_inr NUMERIC NOT NULL DEFAULT 0,
  days_count INTEGER NOT NULL DEFAULT 1,
  start_city TEXT,
  interests TEXT,
  budget_inr NUMERIC,
  plan_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.trip_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own trip plans" ON public.trip_plans
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own trip plans" ON public.trip_plans
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own trip plans" ON public.trip_plans
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users delete own trip plans" ON public.trip_plans
FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_trip_plans_user_created ON public.trip_plans (user_id, created_at DESC);

-- Marketplace listings
CREATE TABLE public.marketplace_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  total_cost_inr NUMERIC NOT NULL DEFAULT 0,
  days_count INTEGER NOT NULL DEFAULT 1,
  price_inr NUMERIC NOT NULL DEFAULT 0,
  plan_data JSONB NOT NULL,
  sales_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view marketplace plans" ON public.marketplace_plans
FOR SELECT USING (true);

CREATE POLICY "Users list own plan" ON public.marketplace_plans
FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users update own listing" ON public.marketplace_plans
FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Users delete own listing" ON public.marketplace_plans
FOR DELETE USING (auth.uid() = seller_id);

CREATE TRIGGER trg_marketplace_plans_updated
BEFORE UPDATE ON public.marketplace_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_marketplace_plans_created ON public.marketplace_plans (created_at DESC);