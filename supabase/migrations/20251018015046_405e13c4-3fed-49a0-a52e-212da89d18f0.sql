-- Drop the existing view with security definer
DROP VIEW IF EXISTS public.visitor_stats;

-- Recreate view without security definer (views are security invoker by default)
CREATE VIEW public.visitor_stats AS
SELECT 
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(DISTINCT page_path) as pages_visited,
  DATE_TRUNC('day', visited_at) as visit_date
FROM public.visitor_analytics
GROUP BY DATE_TRUNC('day', visited_at)
ORDER BY visit_date DESC;