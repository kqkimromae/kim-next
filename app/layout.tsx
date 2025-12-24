"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/course", label: "Course" },
  { href: "/project", label: "Project" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function applyTheme(t: Theme) {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(t);
  }

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return (
    <html lang="th">
      <body>
        {/* HEADER */}
        <header className="site-header">
          <nav className="nav">
            <Link className="brand" href="/">
              Abdulhakim Web
            </Link>

            <div className="spacer" />

            {nav.map((item) => (
              <Link key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button className="btn theme-btn" onClick={toggleTheme}>
              {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </nav>
        </header>

        {/* CONTENT */}
        <main className="site-content">{children}</main>

        {/* FOOTER */}
        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} ABDULHAKIM — Advanced Web Development
          </p>
        </footer>
      </body>
    </html>
  );
}
