"use client";

import '../../styles/globals.css';  // Импорт глобальных стилей из корневой папки styles
import { Montserrat } from 'next/font/google';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // При загрузке проверяем локальную тему или системную
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Если нет сохранённой темы — смотрим на системную
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="bg-cream dark:bg-textdark min-h-screen transition-colors duration-500 flex flex-col items-center justify-center">
        <button
          onClick={toggleTheme}
          aria-label="Переключить тему"
          className="absolute top-4 right-4 p-2 rounded-full bg-pink text-textdark dark:bg-mint dark:text-cream shadow-lg hover:scale-110 transition-transform"
          title="Переключить тему"
        >
          {theme === 'light' ? (
            <MoonIcon className="h-6 w-6" />
          ) : (
            <SunIcon className="h-6 w-6" />
          )}
        </button>
        {children}
      </body>
    </html>
  );
}








