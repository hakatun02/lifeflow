"use client";

import React, { useState } from "react";

export default function CreateEntryForm() {
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
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

      {response && (
        <div className="mt-6 p-4 bg-cream rounded border">
          <h2 className="font-semibold mb-2">Ответ ИИ:</h2>
          <p>{response}</p>
        </div>
      )}
    </form>
  );
}
