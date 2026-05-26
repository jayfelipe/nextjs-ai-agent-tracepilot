import { NextRequest, NextResponse } from 'next/server';
import { TracePilot } from 'tracepilot-sdk';
import { traceGenerateText } from 'tracepilot-vercel';
import { openai } from '@ai-sdk/openai';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // 1. Inicializar TracePilot
  const tp = new TracePilot(process.env.TRACEPILOT_API_KEY!);
  await tp.startTrace("Next.js AI Agent Template");

  try {
    // 2. Ejecutar el agente con observabilidad automática
    const { text } = await traceGenerateText(tp, {
      model: openai('gpt-4o-mini'),
      prompt: prompt,
    });

    return NextResponse.json({ result: text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}