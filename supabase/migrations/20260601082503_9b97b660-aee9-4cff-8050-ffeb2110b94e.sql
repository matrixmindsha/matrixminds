CREATE TABLE public.store_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id text NOT NULL,
  payment_reference text,
  note text,
  granted_by uuid,
  granted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id),
  CONSTRAINT store_access_product_id_check CHECK (product_id IN ('ai', 'ml', 'ds', 'eh'))
);

GRANT SELECT ON public.store_access TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_access TO authenticated;
GRANT ALL ON public.store_access TO service_role;

ALTER TABLE public.store_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own store access"
ON public.store_access
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all store access"
ON public.store_access
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can create store access"
ON public.store_access
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update store access"
ON public.store_access
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete store access"
ON public.store_access
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));