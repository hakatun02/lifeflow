// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Пришёл запрос:", body);

    return NextResponse.json({
      success: true,
      message: "Привет, это GPT-4o-mini (тест без API)"
    });
  } catch (error) {
    console.error("Ошибка API:", error);
    return NextResponse.json({ success: false, error: "Ошибка сервера" }, { status: 500 });
  }
}


