import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ключ в Vercel переменных
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return new Response(
        JSON.stringify({ error: "❌ Неверный формат запроса. Ожидается { messages: [...] }" }),
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    return new Response(
      JSON.stringify({ content: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Ошибка на сервере" }),
      { status: 500 }
    );
  }
}



