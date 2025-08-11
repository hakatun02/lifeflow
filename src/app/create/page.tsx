"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    setResponse("Загрузка...");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: input }]
        }),
      });

      const data = await res.json();
      if (data.error) {
        setResponse(`Ошибка: ${data.error}`);
      } else {
        setResponse(data.content);
      }
    } catch (err) {
      setResponse(`Ошибка сети: ${err}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>💬 Чат с GPT-4o-mini</h1>
      <textarea
        rows={3}
        style={{ width: "100%", padding: "8px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={sendMessage} style={{ marginTop: "10px" }}>
        Отправить
      </button>
      <p style={{ marginTop: "15px" }}>
        <strong>Ответ ИИ:</strong> {response}
      </p>
    </div>
  );
}

