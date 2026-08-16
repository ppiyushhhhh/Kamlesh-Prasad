import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Dev-only middleware so /api/chat also works with `vite dev`
// (in production this is served by the Vercel serverless function in /api/chat.ts).
const devChatApi = (): PluginOption => ({
  name: "dev-chat-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res) => {
      res.setHeader("Content-Type", "application/json");
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: "Method not allowed" }));
        return;
      }
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
        const { handleChat } = await server.ssrLoadModule("/api/chat.ts");
        const { status, payload } = await handleChat(body);
        res.statusCode = status;
        res.end(JSON.stringify(payload));
      } catch {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Something went wrong. Please try again." }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), devChatApi(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
