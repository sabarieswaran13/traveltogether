import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are "Yatra", the friendly AI travel assistant for Travel Together — a Tamil Nadu tourism platform.

You help travelers with:
- Suggestions for places to visit in Tamil Nadu (Chennai, Madurai, Kanyakumari, Ooty, Kodaikanal, Thanjavur, Rameshwaram, Pondicherry, Mahabalipuram, Yercaud).
- Tips on temples, food, culture, weather, and best times to visit.
- Help with the platform features: trip planner, private bus/lodge/guide bookings, the Safety guardian feature, the community feed.

Rules:
- Always reply about Tamil Nadu only. Politely redirect if asked about other places.
- Quote money in Indian Rupees (₹).
- Be warm, concise (2-4 short paragraphs max), and use friendly Tamil greetings like "Vanakkam!" when natural.
- Use markdown bullet points when listing places or tips.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = await request.json();
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return new Response(JSON.stringify({ error: "AI not configured" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              stream: true,
            }),
          });

          if (response.status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }), {
              status: 429,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (response.status === 402) {
            return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }), {
              status: 402,
              headers: { "Content-Type": "application/json" },
            });
          }
          if (!response.ok || !response.body) {
            return new Response(JSON.stringify({ error: "AI service error" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(response.body, {
            headers: { "Content-Type": "text/event-stream" },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
