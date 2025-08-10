import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Сообщение не передано" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const aiMessage = completion.choices[0].message.content || "Нет ответа от ИИ.";

    return NextResponse.json({ text: aiMessage });
  } catch (error: any) {
    console.error("Ошибка запроса к OpenAI:", error);

    if (error.response?.data?.error?.message) {
      console.error("Сообщение ошибки от API:", error.response.data.error.message);
    }

    return NextResponse.json({ error: "Ошибка при запросе к ИИ." }, { status: 500 });
  }
}



