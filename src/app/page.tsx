import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Добро пожаловать в LifeFlow!</h1>
      <p className="mb-4">
        Здесь вы можете создавать новые записи с помощью ИИ.
      </p>
      <Link
        href="/create"
        className="inline-block bg-mint text-white px-6 py-3 rounded hover:bg-mint-dark transition"
      >
        Создать новую запись
      </Link>
    </main>
  );
}






