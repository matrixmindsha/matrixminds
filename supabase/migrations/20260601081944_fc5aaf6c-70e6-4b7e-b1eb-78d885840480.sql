-- Make store-assets bucket private so files can only be accessed via signed URLs from the edge function
UPDATE storage.buckets SET public = false WHERE id = 'store-assets';

-- Drop any public read policy if present
DROP POLICY IF EXISTS "Public can read store-assets" ON storage.objects;
DROP POLICY IF EXISTS "Public read store-assets" ON storage.objects;

-- Add 'member' role to app_role enum if not already present
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel='member' AND enumtypid='public.app_role'::regtype) THEN
    ALTER TYPE public.app_role ADD VALUE 'member';
  END IF;
END$$;