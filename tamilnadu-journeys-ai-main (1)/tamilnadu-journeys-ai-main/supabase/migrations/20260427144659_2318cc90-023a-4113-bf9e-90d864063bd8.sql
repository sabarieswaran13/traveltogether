-- 1. Role enum + user_roles table
CREATE TYPE public.app_role AS ENUM ('tourist', 'guide', 'admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Update handle_new_user trigger to auto-assign roles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));

  -- Every new user is a tourist
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'tourist')
  ON CONFLICT DO NOTHING;

  -- Auto-grant admin to the designated admin email
  IF lower(NEW.email) = 'sapariee703@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Guide applications
CREATE TABLE public.guide_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  city TEXT NOT NULL,
  languages TEXT NOT NULL,
  experience_years INTEGER NOT NULL DEFAULT 0,
  bio TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ
);
ALTER TABLE public.guide_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own application" ON public.guide_applications
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own application" ON public.guide_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins update applications" ON public.guide_applications
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- 4. Admin-managed inventory: hotels, lodges, buses
CREATE TABLE public.admin_hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.0,
  amenities TEXT,
  contact TEXT,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.admin_lodges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.0,
  amenities TEXT,
  contact TEXT,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.admin_buses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator TEXT NOT NULL,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  departure_time TEXT NOT NULL,
  arrival_time TEXT NOT NULL,
  price INTEGER NOT NULL,
  bus_type TEXT NOT NULL DEFAULT 'AC Sleeper',
  total_seats INTEGER NOT NULL DEFAULT 40,
  contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_lodges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_buses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone views hotels" ON public.admin_hotels FOR SELECT USING (true);
CREATE POLICY "Admins manage hotels" ON public.admin_hotels FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone views lodges" ON public.admin_lodges FOR SELECT USING (true);
CREATE POLICY "Admins manage lodges" ON public.admin_lodges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone views buses" ON public.admin_buses FOR SELECT USING (true);
CREATE POLICY "Admins manage buses" ON public.admin_buses FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Hot plans (replaces marketplace)
DROP TABLE IF EXISTS public.marketplace_plans;

CREATE TABLE public.hot_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  cover_image TEXT,
  climate TEXT NOT NULL DEFAULT 'warm',
  interests TEXT NOT NULL DEFAULT '',
  budget_inr INTEGER NOT NULL DEFAULT 10000,
  days_count INTEGER NOT NULL DEFAULT 3,
  total_cost_inr NUMERIC NOT NULL DEFAULT 0,
  popularity INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.5,
  plan_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.hot_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views hot plans" ON public.hot_plans FOR SELECT USING (true);
CREATE POLICY "Admins manage hot plans" ON public.hot_plans FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Trip plans gets confirmed flag
ALTER TABLE public.trip_plans
  ADD COLUMN IF NOT EXISTS confirmed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS source_hot_plan_id UUID REFERENCES public.hot_plans(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS climate TEXT;

-- 7. Trip reviews
CREATE TABLE public.trip_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_name TEXT NOT NULL,
  city TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trip_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views reviews" ON public.trip_reviews FOR SELECT USING (true);
CREATE POLICY "Users insert own review" ON public.trip_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own review" ON public.trip_reviews
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own review" ON public.trip_reviews
  FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins delete any review" ON public.trip_reviews
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 8. Bookings: extra form fields
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS traveler_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS payment_method TEXT,
  ADD COLUMN IF NOT EXISTS id_proof TEXT,
  ADD COLUMN IF NOT EXISTS service_id UUID;
