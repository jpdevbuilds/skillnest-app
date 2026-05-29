"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/ThemeContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          SkillNest
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">

          <Link
            href="/"
            className="text-sm font-medium hover:opacity-70 transition"
          >
            Home
          </Link>

          <Link
            href="/recommend"
            className="text-sm font-medium hover:opacity-70 transition"
          >
            Generate
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:scale-105 transition"
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

        </div>

      </div>

    </nav>
  );
}