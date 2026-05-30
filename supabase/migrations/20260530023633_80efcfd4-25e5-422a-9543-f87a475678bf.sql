
-- 1. Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. Lock visitor_analytics SELECT to admins only
DROP POLICY IF EXISTS "Allow public to read visitor stats" ON public.visitor_analytics;

CREATE POLICY "Admins can read visitor stats"
  ON public.visitor_analytics FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Tighten public INSERT policy (replace WITH CHECK true)
DROP POLICY IF EXISTS "Allow public to insert visitor data" ON public.visitor_analytics;

CREATE POLICY "Public can log visits"
  ON public.visitor_analytics FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    page_path IS NOT NULL
    AND length(page_path) <= 512
    AND (user_agent IS NULL OR length(user_agent) <= 1024)
    AND (referrer IS NULL OR length(referrer) <= 1024)
    AND (session_id IS NULL OR length(session_id) <= 128)
    AND (device_type IS NULL OR length(device_type) <= 32)
  );

-- Revoke anon SELECT on the table
REVOKE SELECT ON public.visitor_analytics FROM anon;

-- 4. Recreate visitor_stats view with security_invoker so it respects RLS of caller
DROP VIEW IF EXISTS public.visitor_stats;
CREATE VIEW public.visitor_stats
WITH (security_invoker = on) AS
  SELECT
    count(*) AS total_visits,
    count(DISTINCT session_id) AS unique_visitors,
    count(DISTINCT page_path) AS pages_visited,
    date_trunc('day', visited_at) AS visit_date
  FROM public.visitor_analytics
  GROUP BY date_trunc('day', visited_at)
  ORDER BY date_trunc('day', visited_at) DESC;

GRANT SELECT ON public.visitor_stats TO authenticated;
