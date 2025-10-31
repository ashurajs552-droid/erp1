import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildPrompt } from '@/lib/tool-prompts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { toolId, params } = body as { toolId: string; params: Record<string, unknown> };

    if (!toolId) {
      return NextResponse.json({ error: 'Missing toolId' }, { status: 400 });
    }

    const prompt = buildPrompt(toolId, params || {});

    const apiKey = process.env.OPENAI_API_KEY;

    // If no API key, return a deterministic mock so the UI remains functional
    if (!apiKey) {
      const mock = `Mock result for ${toolId}\n\n(Provide OPENAI_API_KEY to enable live AI generation.)\n\nInput Summary:\n${JSON.stringify(params, null, 2)}`;
      return NextResponse.json({ result: mock, mock: true });
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user },
      ],
      temperature: prompt.temperature ?? 0.2,
    });

    const content = completion.choices?.[0]?.message?.content || 'No content returned.';
    return NextResponse.json({ result: content });
  } catch (err) {
    console.error('tools/generate error', err);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}


