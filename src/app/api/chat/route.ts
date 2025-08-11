import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' must be an array" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || "",
    });
  } catch (error: any) {
    console.error("Ошибка запроса к OpenAI:", error);
    return NextResponse.json(
      { error: `Ошибка запроса к OpenAI: ${error.message}` },
      { status: 500 }
    );
  }
}


