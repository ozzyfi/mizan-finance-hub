import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            system?: string;
            messages?: ChatMessage[];
          };
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          const resp = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-3-flash-preview",
                messages: [
                  { role: "system", content: body.system ?? "" },
                  ...(body.messages ?? []),
                ],
              }),
            },
          );

          if (!resp.ok) {
            const errText = await resp.text();
            return new Response(
              JSON.stringify({ error: errText || "AI gateway error" }),
              {
                status: resp.status,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const data = (await resp.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const reply = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          return new Response(
            JSON.stringify({
              error: e instanceof Error ? e.message : "Unknown error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
