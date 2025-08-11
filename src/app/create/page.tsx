"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Добавляем сообщение пользователя в историю
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `❌ Ошибка: ${data.error}` },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ Ошибка запроса: ${err.message}` },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>💬 GPT-4o-mini чат</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          minHeight: 300,
          marginBottom: 10,
          overflowY: "auto",
        }}
      >
        {messages.map((msg, idx) => (
          <p key={idx} style={{ color: msg.role === "user" ? "blue" : "green" }}>
            <b>{msg.role === "user" ? "Вы" : "ИИ"}:</b> {msg.content}
          </p>
        ))}
        {loading && <p>⌛ ИИ думает...</p>}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите сообщение..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Отправить
        </button>
      </div>
    </div>
  );
}

