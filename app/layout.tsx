import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Personal Web — Demo",
  description: "โครงสร้างตัวอย่างสำหรับงาน Personal Website (Next.js App Router)",

};
const nav = [

  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/course", label: "Course" },
  { href: "/project", label: "Project" },
  { href: "/contact", label: "Contact" },

];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="th">
      <body>
        <header className="site-header">
          <nav className="nav">
            <Link className="brand" href="/">Patcha Web</Link>
            <div className="spacer" />
            {nav.map((item) => (
              <Link key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="site-content">{children}</main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Your Name — Advanced Web Development</p>
        </footer>
      </body>
    </html>
  );
}