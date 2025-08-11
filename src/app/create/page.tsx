// src/app/create/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type Entry = {
  id: string;
  userText: string;
  aiReply: string;
  createdAt: string;
};

export default function CreatePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lifeflow_entries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("lifeflow_entries", JSON.stringify(entries));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const userMessage = text.trim();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      // Лог в консоль для диагностики
      console.log("Ответ API:", data);

      const aiReply = data.reply ?? data.error ?? "Нет ответа";

      const newEntry: Entry = {
        id: Date.now().toString(),
        userText: userMessage,
        aiReply,
        createdAt: new Date().toISOString(),
      };

      setEntries((p) => [newEntry, ...p]);
      setText("");
    } catch (err) {
      console.error("Ошибка отправки:", err);
      const newEntry: Entry = {
        id: Date.now().toString(),
        userText: userMessage,
        aiReply: "Ошибка подключения к серверу",
        createdAt: new Date().toISOString(),
      };
      setEntries((p) => [newEntry, ...p]);
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setEntries([]);
    localStorage.removeItem("lifeflow_entries");
  }

  return (
    <main style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12 }}>Создать запись</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Напишите свои мысли здесь..."
          rows={5}
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", resize: "vertical" }}
        />
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#A8DADC",
              color: "#052B3A",
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              fontWeight: 600,
            }}
          >
            {loading ? "Отправка..." : "Создать и спросить ИИ"}
          </button>

          <button
            type="button"
            onClick={() => setText("")}
            style={{
              background: "#fff",
              border: "1px solid #ccc",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            Очистить
          </button>

          <button
            type="button"
            onClick={clearAll}
            style={{
              marginLeft: "auto",
              background: "#ff6b6b",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
            }}
          >
            Очистить все записи
          </button>
        </div>
      </form>

      <section style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 8 }}>История записей</h3>
        {entries.length === 0 && <p>Записей пока нет.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {entries.map((en) => (
            <article key={en.id} style={{ padding: 12, borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>{new Date(en.createdAt).toLocaleString()}</div>
              <div style={{ marginBottom: 8 }}>
                <strong>Вы:</strong>
                <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{en.userText}</div>
              </div>
              <div>
                <strong>ИИ:</strong>
                <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{en.aiReply}</div>
              </div>
            </article>
          ))}
          <div ref={endRef} />
        </div>
      </section>
    </main>
  );
}

