// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link"; // เพิ่ม Link เพื่อทำปุ่มย้อนกลับ

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    // 1. ถ้ายังไม่ Login -> ส่งไปหน้า Login
    if (!session) redirect("/login?callbackUrl=/admin");

    const role = (session.user as any).role;

    // 2. ถ้า Login แล้ว แต่ Role ไม่ใช่ Admin -> โชว์หน้า "ไม่มีสิทธิ์" (Access Denied)
    if (role !== "admin") {
        return (
            <section className="container" style={{ padding: "2rem", textAlign: "center" }}>
                <div className="card" style={{ borderTop: "5px solid #dc3545", maxWidth: "600px", margin: "0 auto" }}>
                    <h1 style={{ color: "#dc3545", fontSize: "3rem", margin: "10px 0" }}>🚫</h1>
                    <h2 style={{ color: "#dc3545" }}>Access Denied</h2>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
                    <p style={{ color: "#666", marginBottom: "20px" }}>
                        หน้านี้จำกัดสิทธิ์เฉพาะ <b>Admin</b> เท่านั้น <br />
                        สถานะของคุณคือ: <b>{role}</b>
                    </p>
                    
                    <Link href="/dashboard" className="btn">
                        ⬅ กลับไปหน้า Dashboard
                    </Link>
                </div>
            </section>
        );
    }

    // 3. ถ้าเป็น Admin ตัวจริง -> โชว์หน้า Admin Panel
    return (
        <section className="container">
            <h1>Admin Panel 🛡️</h1>
            <article className="card" style={{ borderLeft: "5px solid #28a745" }}>
                <h2>Welcome Administrator</h2>
                <p>ส่วนนี้สำหรับ <b>Admin</b> เท่านั้น</p>
                <p>Logged in as: <b>{session.user?.name}</b></p>
            </article>
        </section>
    );
}