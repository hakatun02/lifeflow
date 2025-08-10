"use client";

import React, { useState } from "react";

export default function CreatePage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse("Ошибка от сервера: " + (data.error || "Неизвестная ошибка"));
      } else {
        setResponse(data.text);
      }
    } catch (error) {
      setResponse("Ошибка при отправке запроса.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Создать новую запись</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши свою запись..."
          className="w-full p-2 border rounded mb-4"
          rows={5}
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-mint text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-cream rounded border whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Ответ ИИ:</h2>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
