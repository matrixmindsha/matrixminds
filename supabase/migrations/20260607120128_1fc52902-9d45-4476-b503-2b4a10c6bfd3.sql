
-- Replace storage SELECT policy with schema-qualified has_role, and add admin-only write policies
DROP POLICY IF EXISTS "Admins and members can read store assets" ON storage.objects;

CREATE POLICY "Admins and members can read store assets"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'store-assets'
  AND (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'member'::public.app_role))
);

CREATE POLICY "Admins can upload store assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'store-assets' AND private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update store assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'store-assets' AND private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'store-assets' AND private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete store assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'store-assets' AND private.has_role(auth.uid(), 'admin'::public.app_role));
