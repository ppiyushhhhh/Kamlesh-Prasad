import { describe, it, expect } from "vitest";
import { resolveApiKey, handleChat } from "../../api/chat";

describe("api/chat", () => {
  it("resolves the Gemini API key from environment", () => {
    const key = resolveApiKey();
    if (process.env.GEMINI_API_KEY) {
      expect(key).toBe(process.env.GEMINI_API_KEY);
    } else {
      expect(key).toBeUndefined();
    }
  });

  it("returns 400 for empty messages", async () => {
    const res = await handleChat({ message: "" });
    expect(res.status).toBe(400);
    expect(res.payload.error).toBe("Please enter a question.");
  });

  it("returns 400 for messages that exceed length limit", async () => {
    const longMessage = "a".repeat(1001);
    const res = await handleChat({ message: longMessage });
    expect(res.status).toBe(400);
  });

  it("successfully communicates with Gemini API when key is configured", async () => {
    if (!process.env.GEMINI_API_KEY) {
      // In CI environments without secrets configured, handleChat should return 503
      const res = await handleChat({ message: "Hello" });
      expect(res.status).toBe(503);
      return;
    }
    const res = await handleChat({ message: "Who is Kamlesh Prasad?" });
    expect(res.status).toBe(200);
    expect(typeof res.payload.reply).toBe("string");
    expect((res.payload.reply as string).length).toBeGreaterThan(0);
  }, 30000);
});
