"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.error) {
        setReply(`Ошибка: ${data.error}`);
      } else {
        setReply(data.reply);
      }
    } catch (err) {
      console.error(err);
      setReply("Ошибка запроса");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Чат с GPT-4o-mini</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение"
          className="border p-2 rounded flex-grow"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {reply && (
        <div className="mt-4 p-4 border rounded w-full max-w-lg bg-gray-100">
          <strong>Ответ ИИ:</strong> {reply}
        </div>
      )}
    </main>
  );
}






