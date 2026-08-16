import { KAMLESH_SYSTEM_PROMPT } from "../src/data/kamleshKnowledge";

/**
 * Vercel serverless function: POST /api/chat
 * The Gemini API key is read from the server-side env var GEMINI_API_KEY
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured");
    return { status: 503, payload: { error: GENERIC_ERROR } };
  }

  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
  const history = sanitizeHistory(body?.history);

  const contents = [
    ...history.map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    { role: "user", parts: [{ text: rawMessage }] },
  ];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: KAMLESH_SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.3, maxOutputTokens: 800 },
        }),
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const details = await response.text();
      console.error(`Gemini request failed [${response.status}]: ${details}`);
      return { status: 502, payload: { error: GENERIC_ERROR } };
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const reply = (data.candidates?.[0]?.content?.parts ?? [])
      .map((p) => p.text ?? "")
      .join("")
      .trim();

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
