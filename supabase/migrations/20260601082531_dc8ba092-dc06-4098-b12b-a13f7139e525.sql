REVOKE EXECUTE ON FUNCTION public.handle_owner_signup() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_owner_signup() TO service_role;