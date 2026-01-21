// app/api/protected/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
    return Response.json({ ok: true, user: session.user });
}