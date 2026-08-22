import { KAMLESH_SYSTEM_PROMPT } from "./_knowledge";

/**
 * Vercel serverless function: POST /api/chat
 * The Groq API key is read from the server-side env var GROQ_API_KEY
 * and is never sent to the browser.
 */

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;
const GENERIC_ERROR = "Sorry, I'm unable to respond right now. Please try again later.";


type HistoryItem = { role: "user" | "assistant"; content: string };

interface ChatRequest {
  message?: unknown;
  history?: unknown;
}

function sanitizeHistory(history: unknown): HistoryItem[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (h): h is HistoryItem =>
        !!h &&
        typeof h === "object" &&
        (("role" in h && (h as HistoryItem).role === "user") || (h as HistoryItem).role === "assistant") &&
        typeof (h as HistoryItem).content === "string" &&
        (h as HistoryItem).content.trim().length > 0,
    )
    .slice(-MAX_HISTORY)
    .map((h) => ({ role: h.role, content: h.content.slice(0, MAX_MESSAGE_LENGTH) }));
}

export function resolveApiKey(): string | undefined {
  const candidates = [process.env.GROQ_API_KEY];
  return candidates.find((v) => typeof v === "string" && v.trim().length > 0)?.trim();
}

export async function handleChat(body: ChatRequest): Promise<{ status: number; payload: Record<string, unknown> }> {
  const rawMessage = typeof body?.message === "string" ? body.message.trim() : "";

  if (!rawMessage) {
    return { status: 400, payload: { error: "Please enter a question." } };
  }
  if (rawMessage.length > MAX_MESSAGE_LENGTH) {
    return {
      status: 400,
      payload: { error: `Please keep your question under ${MAX_MESSAGE_LENGTH} characters.` },
    };
  }

  const apiKey = resolveApiKey();
  if (!apiKey) {
    console.error("No Groq API key configured (checked GROQ_API_KEY)");
    return { status: 503, payload: { error: GENERIC_ERROR } };
  }

  const primaryModel = process.env.GROQ_MODEL || "groq/compound-mini";
  const fallbackModel = process.env.GROQ_FALLBACK_MODEL || "openai/gpt-oss-20b";
  const history = sanitizeHistory(body?.history);

  const messages = [
    { role: "system", content: KAMLESH_SYSTEM_PROMPT },
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: rawMessage },
  ];

  const callGroq = async (model: string) => {
    return await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        max_tokens: 2048,
      }),
    });
  };

  try {
    let response = await callGroq(primaryModel);

    // Quota/transient failures: retry once, then try the fallback model.
    if (response.status === 429 || response.status >= 500) {
      await new Promise((r) => setTimeout(r, 1500));
      response = await callGroq(primaryModel);
    }
    if (!response.ok && fallbackModel && fallbackModel !== primaryModel) {
      const alt = await callGroq(fallbackModel);
      if (alt.ok) response = alt;
    }

    if (!response.ok) {
      const details = await response.text();
      console.error(`Groq request failed [${response.status}]: ${details}`);
      if (response.status === 429) {
        return {
          status: 429,
          payload: { error: "I'm getting a lot of questions right now. Please try again in a moment." },
        };
      }
      return { status: 502, payload: { error: GENERIC_ERROR } };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = (data.choices?.[0]?.message?.content ?? "").trim();

    if (!reply) {
      return { status: 502, payload: { error: GENERIC_ERROR } };
    }

    return { status: 200, payload: { reply } };

  } catch (err) {
    console.error("Chat handler error:", err);
    return { status: 502, payload: { error: GENERIC_ERROR } };
  }
}

interface VercelLikeRequest {
  method?: string;
  body?: unknown;
}

interface VercelLikeResponse {
  status: (code: number) => VercelLikeResponse;
  json: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  res.setHeader("Cache-Control", "no-store");

  // Health check: lets you verify from the browser whether the key is wired up
  // in the deployment environment, without ever exposing its value.
  if (req.method === "GET") {
    res.status(200).json({ ok: true, keyConfigured: Boolean(resolveApiKey()) });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body: ChatRequest = {};
  if (typeof req.body === "string") {
    try {
      body = JSON.parse(req.body) as ChatRequest;
    } catch {
      res.status(400).json({ error: "Something went wrong. Please try again." });
      return;
    }
  } else if (req.body && typeof req.body === "object") {
    body = req.body as ChatRequest;
  }

  const { status, payload } = await handleChat(body);
  res.status(status).json(payload);
}
