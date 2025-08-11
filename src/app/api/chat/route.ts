// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

type OpenAIError = {
  error?: { message?: string; type?: string; code?: string };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Поле 'message' обязательно и должно быть строкой" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is missing on server");
      return NextResponse.json({ error: "OPENAI_API_KEY не настроен на сервере" }, { status: 500 });
    }

    // Запрос прямо к REST API OpenAI (модель gpt-4o-mini)
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = (await resp.json()) as any;

    if (!resp.ok) {
      // Логируем ошибку с кодом и телом, чтобы видеть в Vercel logs
      console.error("OpenAI responded with error:", resp.status, data);
      const errMsg = (data as OpenAIError).error?.message ?? JSON.stringify(data);
      return NextResponse.json({ error: `OpenAI error: ${errMsg}` }, { status: resp.status });
    }

    // Берём ответ
    const reply = data?.choices?.[0]?.message?.content ?? null;

    if (!reply) {
      console.error("OpenAI returned no reply:", data);
      return NextResponse.json({ error: "OpenAI вернул пустой ответ" }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Ошибка в /api/chat:", err);
    const message = err?.message ?? String(err);
    return NextResponse.json({ error: `Server error: ${message}` }, { status: 500 });
  }
}


