// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Добро пожаловать в LifeFlow 🌿</h1>
      <p style={{ marginBottom: 18 }}>
        Это тестовая версия: можно создать запись и получить ответ от GPT-4o-mini.
      </p>

      <Link href="/create">
        <a
          style={{
            display: "inline-block",
            background: "#A8DADC",
            color: "#052B3A",
            padding: "10px 16px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Создать новую запись
        </a>
      </Link>
    </main>
  );
}






