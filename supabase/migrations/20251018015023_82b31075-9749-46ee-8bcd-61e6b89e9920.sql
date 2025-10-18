-- Create visitor analytics table
CREATE TABLE public.visitor_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  referrer text,
  user_agent text,
  country text,
  city text,
  device_type text,
  visited_at timestamptz NOT NULL DEFAULT now(),
  session_id text
);

-- Create index for faster queries
CREATE INDEX idx_visitor_analytics_visited_at ON public.visitor_analytics(visited_at DESC);
CREATE INDEX idx_visitor_analytics_page_path ON public.visitor_analytics(page_path);

-- Enable RLS (read-only for public, no authentication needed for tracking)
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert visitor data (for tracking)
CREATE POLICY "Allow public to insert visitor data"
  ON public.visitor_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a view for analytics summary (public read access)
CREATE OR REPLACE VIEW public.visitor_stats AS
SELECT 
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(DISTINCT page_path) as pages_visited,
  DATE_TRUNC('day', visited_at) as visit_date
FROM public.visitor_analytics
GROUP BY DATE_TRUNC('day', visited_at)
ORDER BY visit_date DESC;

-- Allow public to read analytics summary
CREATE POLICY "Allow public to read visitor stats"
  ON public.visitor_analytics
  FOR SELECT
  TO public
  USING (true);