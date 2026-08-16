---
name: Kamlesh AI chatbot
description: Floating portfolio chatbot, knowledge base file, and server-side Gemini endpoint
type: feature
---
- Floating "Ask Kamlesh AI" widget: `src/components/ChatWidget.tsx`, lazy-loaded in `src/pages/Index.tsx`.
- Knowledge base + system prompt: `src/data/kamleshKnowledge.ts`. Must mirror portfolio content only — never invent facts. Update it whenever portfolio sections change.
- API: `api/chat.ts` (Vercel serverless, POST `/api/chat`), plus a dev middleware in `vite.config.ts` for local preview.
- Provider: Google Gemini via REST. Key comes from server-only env var `GEMINI_API_KEY` (set in Vercel). Never expose it client-side.
