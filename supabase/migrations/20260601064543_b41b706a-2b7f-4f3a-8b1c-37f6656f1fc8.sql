
-- Private bucket for paid downloads
INSERT INTO storage.buckets (id, name, public)
VALUES ('store-assets', 'store-assets', false)
ON CONFLICT (id) DO NOTHING;

-- Only admins/members can read from the bucket (service_role bypasses RLS)
CREATE POLICY "Admins and members can read store assets"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'store-assets'
  AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'member'))
);

-- Admin management of user_roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Auto-grant admin to owner on signup
CREATE OR REPLACE FUNCTION public.handle_owner_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'matrixmindsha@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_owner ON auth.users;
CREATE TRIGGER on_auth_user_created_owner
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_owner_signup();

-- Backfill admin role for owner if account exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'matrixmindsha@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
