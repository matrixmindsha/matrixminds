import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, loading };
}

export function useStoreAccess(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      setProductIds([]);
      setChecking(false);
      return;
    }
    setChecking(true);
    Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("store_access").select("product_id").eq("user_id", userId),
    ]).then(([rolesResult, accessResult]) => {
        const roles = (rolesResult.data ?? []).map((r) => r.role as string);
        setIsAdmin(roles.includes("admin"));
        setProductIds((accessResult.data ?? []).map((row) => row.product_id));
        setChecking(false);
      });
  }, [userId]);

  const hasProductAccess = (productId: string) => isAdmin || productIds.includes(productId);

  return { hasProductAccess, isAdmin, productIds, checking };
}
