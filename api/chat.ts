import { KAMLESH_SYSTEM_PROMPT } from "./_knowledge";

/**
 * Vercel serverless function: POST /api/chat
 * The Gemini API key is read from the server-side env var GEMINI_API_KEY
 * and is never sent to the browser.
 * Supports both streaming responses (SSE) and traditional JSON replies.
 */

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY = 12;
const GENERIC_ERROR = "Sorry, I'm unable to respond right now. Please try again later.";

type HistoryItem = { role: "user" | "assistant"; content: string };

export interface ChatRequest {
  message?: unknown;
  history?: unknown;
  stream?: unknown;
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
  const candidates = [
    process.env.GEMINI_API_KEY,
    process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    process.env.GOOGLE_API_KEY,
    process.env.VITE_GEMINI_API_KEY,
  ];
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
    console.error("No Gemini API key configured (checked GEMINI_API_KEY)");
    return { status: 503, payload: { error: GENERIC_ERROR } };
  }

  const primaryModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const fallbackModel = process.env.GEMINI_FALLBACK_MODEL || "";
  const history = sanitizeHistory(body?.history);

  const contents = [
    ...history.map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    { role: "user", parts: [{ text: rawMessage }] },
  ];

  // Gemini requires the conversation contents to start with a user turn
  let formattedContents = contents;
  while (formattedContents.length > 0 && formattedContents[0].role === "model") {
    formattedContents = formattedContents.slice(1);
  }
  if (formattedContents.length === 0) {
    formattedContents = [{ role: "user", parts: [{ text: rawMessage }] }];
  }

  const callGemini = async (model: string) => {
    return await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: KAMLESH_SYSTEM_PROMPT }] },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2048,
          },
        }),
      },
    );
  };

  try {
    let response = await callGemini(primaryModel);

    // Quota/transient failures: retry once, then try the fallback model if specified.
    if (response.status === 429 || response.status >= 500) {
      await new Promise((r) => setTimeout(r, 1500));
      response = await callGemini(primaryModel);
    }
    if (!response.ok && fallbackModel && fallbackModel !== primaryModel) {
      const alt = await callGemini(fallbackModel);
      if (alt.ok) response = alt;
    }

    if (!response.ok) {
      const details = await response.text();
      console.error(`Gemini request failed [${response.status}]: ${details}`);
      if (response.status === 429) {
        return {
          status: 429,
          payload: { error: "I'm getting a lot of questions right now. Please try again in a moment." },
        };
      }
      return { status: 502, payload: { error: GENERIC_ERROR } };
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string; thought?: boolean }> } }>;
    };

    const rawParts = data.candidates?.[0]?.content?.parts ?? [];
    const textParts = rawParts.filter((p) => !p.thought && typeof p.text === "string");
    const reply = (textParts.length > 0 ? textParts : rawParts)
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

export async function handleStreamChat(
  body: ChatRequest,
  res: {
    setHeader: (name: string, value: string) => void;
    write: (chunk: string) => boolean | void;
    end: (chunk?: string) => void;
    flushHeaders?: () => void;
  },
): Promise<void> {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  if (typeof res.flushHeaders === "function") res.flushHeaders();

  const rawMessage = typeof body?.message === "string" ? body.message.trim() : "";
  if (!rawMessage) {
    res.write(`data: ${JSON.stringify({ error: "Please enter a question." })}\n\n`);
    res.end();
    return;
  }
  if (rawMessage.length > MAX_MESSAGE_LENGTH) {
    res.write(
      `data: ${JSON.stringify({ error: `Please keep your question under ${MAX_MESSAGE_LENGTH} characters.` })}\n\n`,
    );
    res.end();
    return;
  }

  const apiKey = resolveApiKey();
  if (!apiKey) {
    res.write(`data: ${JSON.stringify({ error: GENERIC_ERROR })}\n\n`);
    res.end();
    return;
  }

  const primaryModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const history = sanitizeHistory(body?.history);

  const contents = [
    ...history.map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    { role: "user", parts: [{ text: rawMessage }] },
  ];

  let formattedContents = contents;
  while (formattedContents.length > 0 && formattedContents[0].role === "model") {
    formattedContents = formattedContents.slice(1);
  }
  if (formattedContents.length === 0) {
    formattedContents = [{ role: "user", parts: [{ text: rawMessage }] }];
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(primaryModel)}:streamGenerateContent?alt=sse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: KAMLESH_SYSTEM_PROMPT }] },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2048,
          },
        }),
      },
    );

    if (!response.ok || !response.body) {
      // Fallback: use handleChat
      const fallback = await handleChat(body);
      if (fallback.status === 200 && fallback.payload.reply) {
        res.write(`data: ${JSON.stringify({ text: fallback.payload.reply })}\n\n`);
      } else {
        res.write(`data: ${JSON.stringify({ error: (fallback.payload.error as string) || GENERIC_ERROR })}\n\n`);
      }
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const dataStr = trimmed.slice(5).trim();
        if (!dataStr || dataStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(dataStr);
          const rawParts = parsed.candidates?.[0]?.content?.parts ?? [];
          const text = rawParts
            .filter((p: { thought?: boolean; text?: string }) => !p.thought && typeof p.text === "string")
            .map((p: { text?: string }) => p.text ?? "")
            .join("");
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        } catch {
          // ignore chunk boundaries
        }
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("handleStreamChat error:", err);
    res.write(`data: ${JSON.stringify({ error: GENERIC_ERROR })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
}

interface VercelLikeRequest {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
}

interface VercelLikeResponse {
  status: (code: number) => VercelLikeResponse;
  json: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
  write?: (chunk: string) => boolean | void;
  end?: (chunk?: string) => void;
  flushHeaders?: () => void;
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

  if (Boolean(body.stream) && typeof res.write === "function" && typeof res.end === "function") {
    await handleStreamChat(body, res as {
      setHeader: (name: string, value: string) => void;
      write: (chunk: string) => boolean | void;
      end: (chunk?: string) => void;
      flushHeaders?: () => void;
    });
    return;
  }

  const { status, payload } = await handleChat(body);
  res.status(status).json(payload);
}
