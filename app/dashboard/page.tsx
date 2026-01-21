import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    
    // ถ้ายังไม่ Login เด้งไป Login
    if (!session) redirect("/login?callbackUrl=/dashboard");

    return (
        <section className="container">
            <h1>Dashboard</h1>
            <article className="card">
                <h3>Welcome back!</h3>
                <p><b>Logged in as:</b> {session.user?.name}</p>
                <p><b>User id:</b> {(session.user as any).id}</p>
                <p><b>Role:</b> {(session.user as any).role}</p>
            </article>
        </section>
    );
}