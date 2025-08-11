import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Отсутствует или некорректное сообщение" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Отсутствует OPENAI_API_KEY в окружении" }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const text = completion.choices?.[0]?.message?.content ?? "Пустой ответ от ИИ";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Ошибка запроса к OpenAI:", error);
    return NextResponse.json(
      { error: "Ошибка при запросе к ИИ: " + (error.message || "Неизвестная ошибка") },
      { status: 500 }
    );
  }
}




