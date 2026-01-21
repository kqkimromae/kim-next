// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
// เพิ่ม useRouter เข้ามาด้วย (ถ้ายังไม่มี)
import { useRouter } from "next/navigation"; 

type Theme = "dark" | "light";

const nav = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/course", label: "Course" },
  { href: "/project", label: "Project" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // ✅ ประกาศ router

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) {
    return (
      <header className="site-header">
        <nav className="nav"><span className="nav-link">Loading...</span></nav>
      </header>
    );
  }

  return (
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

        {session && (
           <Link 
             className="nav-link" 
             href="/admin" 
             style={{ 
               color: (session.user as any).role === 'admin' ? '#ff4d4d' : '#888', 
               fontWeight: 'bold',
               display: 'flex',
               alignItems: 'center',
               gap: '5px'
             }}
           >
             Admin Panel 🔒
           </Link>
        )}

        

        {loading ? (
          <span className="nav-link">...</span>
        ) : session ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="nav-link" style={{ padding: 0, fontSize: '0.9rem' }}>
               {session.user?.name} ({(session.user as any).role})
            </span>
            <button className="btn" onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </button>
          </div>
        ) : (
          // -------------------------------------------------------------
          // ✅✅✅ แก้ตรงนี้ครับ! เปลี่ยนจาก signIn() เป็น Link หรือ router.push
          // เพื่อไม่ให้มันจำหน้า Home เป็น callbackUrl
          // -------------------------------------------------------------
          <Link href="/login" className="btn">
            Login
          </Link>
        )}
<button className="btn theme-btn" onClick={toggleTheme} style={{ marginRight: '1rem', marginLeft: '1rem' }}>
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
}