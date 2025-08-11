import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Сообщение пустое" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || "Нет ответа",
    });
  } catch (error: any) {
    console.error("Ошибка OpenAI:", error);
    return NextResponse.json(
      { error: error.message || "Ошибка при запросе к OpenAI" },
      { status: 500 }
    );
  }
}


