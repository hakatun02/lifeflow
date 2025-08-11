"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.reply) {
        setResponse(data.reply);
      } else if (data.error) {
        setResponse("Ошибка: " + data.error);
      }
    } catch (err) {
      setResponse("Ошибка подключения к серверу");
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>GPT-4o-mini Chat</h1>
      <textarea
        style={{ width: "100%", height: "80px", marginBottom: "10px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите сообщение..."
      />
      <br />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <strong>Ответ ИИ:</strong>
        <p>{response}</p>
      </div>
    </main>
  );
}






