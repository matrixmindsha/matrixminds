UPDATE storage.buckets SET public = true WHERE id = 'store-assets';
CREATE POLICY "Public read store-assets" ON storage.objects FOR SELECT USING (bucket_id = 'store-assets');