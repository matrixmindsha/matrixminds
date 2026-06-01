// Returns a short-lived signed URL for a file in the private `store-assets` bucket,
// but ONLY for callers who are signed in and approved for that exact product.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_FILES = new Set([
  "AI_Mastery.pdf",
  "AI_Mastery_SourceCode.zip",
  "Machine_Learning.pdf",
  "Machine_Learning_SourceCode.zip",
  "Data_Science.pdf",
  "Data_Science_SourceCode.zip",
  "Ethical_Hacking.pdf",
  "Ethical_Hacking_SourceCode.zip",
]);

const PRODUCT_FILES: Record<string, string[]> = {
  ai: ["AI_Mastery.pdf", "AI_Mastery_SourceCode.zip"],
  ml: ["Machine_Learning.pdf", "Machine_Learning_SourceCode.zip"],
  ds: ["Data_Science.pdf", "Data_Science_SourceCode.zip"],
  eh: ["Ethical_Hacking.pdf", "Ethical_Hacking_SourceCode.zip"],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }

    // Verify the caller's JWT
    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return json({ error: "Unauthorized" }, 401);
    }
    const uid = userData.user.id;

    // Check role via service-role client (bypasses RLS, reads user_roles)
    const admin = createClient(SUPABASE_URL, SERVICE);
    const body = await req.json().catch(() => ({}));
    const file = String(body?.file ?? "");
    const productId = String(body?.productId ?? "");
    if (!ALLOWED_FILES.has(file) || !PRODUCT_FILES[productId]?.includes(file)) {
      return json({ error: "Invalid file" }, 400);
    }

    const { data: roles, error: roleErr } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", uid);

    if (roleErr) {
      return json({ error: "Role check failed" }, 500);
    }
    const has = (r: string) => roles?.some((row: { role: string }) => row.role === r);
    if (!has("admin")) {
      const { data: access, error: accessErr } = await admin
        .from("store_access")
        .select("id")
        .eq("user_id", uid)
        .eq("product_id", productId)
        .maybeSingle();

      if (accessErr) {
        return json({ error: "Access check failed" }, 500);
      }
      if (!access) {
        return json({ error: "Access denied. Please pay and request admin approval for this product." }, 403);
      }
    }

    const { data: signed, error: signErr } = await admin
      .storage
      .from("store-assets")
      .createSignedUrl(file, 60);
    if (signErr || !signed) {
      return json({ error: signErr?.message ?? "Sign failed" }, 500);
    }

    return json({ url: signed.signedUrl }, 200);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
