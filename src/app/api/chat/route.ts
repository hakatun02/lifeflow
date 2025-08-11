import { NextResponse } from "next/server";
import OpenAI from "openai";

// Инициализация OpenAI с ключом из переменной окружения
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Поле 'message' обязательно" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Новый быстрый и дешевый
      messages: [
        { role: "system", content: "Ты умный и дружелюбный ассистент." },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Нет ответа";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Ошибка OpenAI API:", error);
    return NextResponse.json(
      { error: error.message || "Ошибка при запросе к ИИ" },
      { status: 500 }
    );
  }
}


