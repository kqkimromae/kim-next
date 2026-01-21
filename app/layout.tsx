// app/layout.tsx
import "./globals.css";
import Providers from "@/app/providers";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Abdulhakim Web",
  description: "Advanced Web Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <Providers>
          {/* Navbar อยู่ตรงนี้ (จัดการเรื่อง Theme และ Menu) */}
          <Navbar />

          {/* เนื้อหาหลัก */}
          <main className="site-content">
            {children}
          </main>

          {/* Footer ย้ายมาวางตรงนี้ เพราะเป็นส่วนหนึ่งของ Layout */}
          <footer className="site-footer">
            <p>
              © {new Date().getFullYear()} ABDULHAKIM — Advanced Web Development
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}