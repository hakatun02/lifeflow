// src/app/layout.tsx
import React from "react";

export const metadata = {
  title: "LifeFlow",
  description: "Живой дневник с ИИ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, fontFamily: "Inter, system-ui, sans-serif", background: "#FAF3E0" }}>
        {children}
      </body>
    </html>
  );
}









