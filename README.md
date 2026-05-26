<div align="center">

# Next.js AI Agent Template + TracePilot

**A production-ready boilerplate for building AI agents with time-travel debugging.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjayfelipe%2Fnextjs-ai-agent-tracepilot&env=TRACEPILOT_API_KEY,OPENAI_API_KEY&envDescription=API%20keys%20required%20to%20run%20the%20template&envLink=https%3A%2F%2Ftracepilotai.com%2F)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-6-black?style=flat-square&logo=vercel&logoColor=white)](https://sdk.vercel.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TracePilot](https://img.shields.io/badge/TracePilot-observability-6366f1?style=flat-square)](https://tracepilotai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

</div>

---

## Overview

This template gives you everything you need to ship an AI agent to production — without spending days wiring up observability, debugging pipelines, or prompt management infrastructure.

Built on **Next.js 16 App Router** and the **Vercel AI SDK v6**, it integrates **TracePilot** out of the box: a zero-config observability layer that automatically captures inputs, outputs, token counts, and latency for every agent run. When something breaks, you don't guess — you **fork the execution, edit the prompt, and replay it in seconds**.

```
clone → configure → npm run dev → ship
```

---

## Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.6 |
| UI | React | 19.2.4 |
| AI Primitives | Vercel AI SDK | 6.x |
| LLM Provider | OpenAI (`gpt-4o`) | `@ai-sdk/openai` 3.x |
| Observability | TracePilot | `tracepilot-vercel` 1.x |
| Styling | Tailwind CSS | 4.x |
| Language | TypeScript | 5.x |

---

## Features

| | Feature | Details |
|---|---|---|
| ⚡ | **App Router + Streaming** | Server components, edge-ready streaming responses |
| 🤖 | **Vercel AI SDK v6** | Unified API for OpenAI, Anthropic, Google, and more |
| 🔭 | **Zero-config Observability** | `tracepilot-vercel` instruments your agent automatically |
| 📊 | **Token & Latency Tracking** | Every LLM call logged with full cost attribution |
| ⏪ | **Time-Travel Debugging** | Fork any failed execution, mutate the prompt, replay instantly |
| 📡 | **Live Execution Dashboard** | Watch your agent think in real-time at tracepilotai.com |
| 🔒 | **End-to-end TypeScript** | Full type safety across routes, tools, and components |
| 🚀 | **One-click Deploy** | Production-ready Vercel deployment in under 2 minutes |

---

## How Time-Travel Debugging Works

```
Agent run fails in production
         │
         ▼
TracePilot captures the full execution trace
(prompt, tool calls, outputs, tokens, latency)
         │
         ▼
Open the trace in your TracePilot Dashboard
         │
         ▼
Fork it → edit the prompt or tool input
         │
         ▼
Replay — no redeployment, no reproduction steps
```

No more `console.log` archaeology. No more "works on my machine". You get the **exact state of the agent at the moment it failed** — and the ability to surgically fix it.

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/)
- A [TracePilot API key](https://tracepilotai.com/) — *free tier available*

### 1. Clone & Install

```bash
git clone https://github.com/jayfelipe/nextjs-ai-agent-tracepilot.git
cd nextjs-ai-agent-tracepilot
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your keys:

```env
# Required — get yours at platform.openai.com
OPENAI_API_KEY=sk-...

# Required — get yours for free at tracepilotai.com
TRACEPILOT_API_KEY=tp-...
```

### 3. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), send a prompt, and watch the execution appear live in your [TracePilot Dashboard](https://tracepilotai.com/dashboard).

---

## Project Structure

```
nextjs-ai-agent-tracepilot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # Streaming AI route with TracePilot
│   ├── layout.tsx
│   └── page.tsx                # Chat UI
├── lib/
│   └── tracepilot.ts           # TracePilot client configuration
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Configuration

TracePilot is configured once and works automatically across every agent route — no wrappers, no middleware, no code changes per-route.

```ts
// lib/tracepilot.ts
import TracePilot from "tracepilot-vercel";

export const tracepilot = new TracePilot({
  apiKey: process.env.TRACEPILOT_API_KEY,
});
```

Attach it to any AI SDK call with a single spread:

```ts
// app/api/chat/route.ts
import { tracepilot } from "@/lib/tracepilot";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    ...tracepilot.instrument(), // ← captures everything automatically
  });

  return result.toDataStreamResponse();
}
```

Every call is now tracked: inputs, outputs, model, tokens used, latency, and errors — visible instantly in your dashboard.

---

## Deploy to Production

One click. Two env vars. Done.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjayfelipe%2Fnextjs-ai-agent-tracepilot&env=TRACEPILOT_API_KEY,OPENAI_API_KEY&envDescription=API%20keys%20required%20to%20run%20the%20template&envLink=https%3A%2F%2Ftracepilotai.com%2F)

> Your agent will be live at `https://your-project.vercel.app` in under 2 minutes.

---

## GitHub Topics

To help others discover this repo, the following topics are set on this repository:

`nextjs` `ai-agent` `vercel-ai-sdk` `openai` `llm` `observability` `prompt-debugging` `time-travel-debugging` `typescript` `react` `boilerplate` `starter-template` `vercel` `gpt-4o` `ai`

> If you fork this template, add these topics in **Settings → Topics** on your own repo.

---

## Roadmap

- [ ] Multi-step agent with tool calling
- [ ] Persistent conversation history (Vercel KV)
- [ ] User authentication (NextAuth.js)
- [ ] TracePilot prompt version management
- [ ] Evaluation harness for agent runs
- [ ] Support for Anthropic Claude and Google Gemini

---

## Contributing

Contributions are welcome. Please open an issue before submitting a pull request for significant changes.

```bash
# 1. Fork the repo and clone it
git checkout -b feature/my-feature

# 2. Make your changes, then commit using conventional commits
git commit -m "feat: add my feature"

# 3. Push and open a Pull Request
git push origin feature/my-feature
```

---

## License

MIT © [jayfelipe](https://github.com/jayfelipe)

---

<div align="center">

Built with [Next.js](https://nextjs.org/) · [Vercel AI SDK](https://sdk.vercel.ai/) · [TracePilot](https://tracepilotai.com/)

</div>
