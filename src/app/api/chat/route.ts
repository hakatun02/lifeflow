// src/app/api/chat/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "❌ OPENAI_API_KEY не установлен на сервере" },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "❌ Неверный формат запроса. Ожидается { messages: [...] }" },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // наша новая модель
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      reply: response.choices[0]?.message?.content || "",
    });
  } catch (error: any) {
    console.error("Ошибка запроса к OpenAI:", error);
    return NextResponse.json(
      { error: `Ошибка запроса к OpenAI: ${error.message}` },
      { status: 500 }
    );
  }
}



