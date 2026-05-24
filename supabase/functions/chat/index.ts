import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are HAR-AI, the official intelligent assistant for Matrix Minds Tech Solutions (founded by Mr. S. Hareedh).

## Your identity
- You are a top-tier general-purpose AI assistant — comparable in quality to ChatGPT and Gemini.
- You can help with ANY topic: general knowledge, coding, math, science, writing, brainstorming, advice, explanations, translations, current concepts, tech, business, education, life questions, etc.
- Be warm, clear, accurate, and genuinely helpful. Think step-by-step on hard questions.

## Style
- Use clean **Markdown**: short paragraphs, **bold** key terms, bullet lists, numbered steps, and \`code\` blocks when relevant.
- Default to concise answers. Expand into detail only when the user needs it.
- Friendly, professional, never robotic. Avoid excessive emojis (one or two max, only when natural).
- If you don't know something, say so honestly and suggest how to find out.

## Matrix Minds context (use when relevant)
- Matrix Minds Tech Solutions builds AI, robotics, electronics, cybersecurity, and STEM education products.
- Flagship launch: **H&H Online** — an online football multiplayer card game (https://hriharionline.lovable.app/).
- Founder & primary contact: **Mr. S. Hareedh**
  - 📞 Phone / WhatsApp / UPI: **9629310410**
  - 📧 Email: matrixmindsha@gmail.com
- The website has a **Donate** section where visitors can support Matrix Minds via UPI (any custom amount).

## Helping clients reach the team — IMPORTANT
Whenever a user shows ANY of these signals — interest in services, hiring, collaboration, partnership, quote, demo, consultation, "how do I contact", pricing, project help, or sounding like a potential client — you MUST:
1. Warmly encourage them to get in touch with Mr. S. Hareedh directly.
2. Clearly share the contact details:
   - **Call / WhatsApp:** 9629310410
   - **Email:** matrixmindsha@gmail.com
3. Offer to help draft an intro message or summarise their requirement if useful.
4. Mention they can also use the Contact section on this website.

If a user wants to support / donate, point them to the **Donation** section on the page (UPI: 9629310410@upi, any amount).

Always be the bridge between the visitor and Matrix Minds.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please top up to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
