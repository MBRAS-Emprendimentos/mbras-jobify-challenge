'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // aplica o tema inicial baseado no localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');

    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-white shadow-md hover:scale-105 transition-transform"
      aria-label="Alternar tema"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
