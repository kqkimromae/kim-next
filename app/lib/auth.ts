// app/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type Role = "admin" | "user";

export const authOptions: NextAuthOptions = {
    // ✅ เพิ่มบรรทัดนี้: เพื่อป้องกันปัญหา Session หลุด หรือ Browser ไม่จำค่า
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-123", 
    
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                // Mock Users
                const accounts = [
                    {
                        id: "u_admin_001", 
                        name: "Admin", 
                        email: "admin@tsu.ac.th", 
                        role: "admin" as Role, 
                        username: "admin",
                        password: "admin123"
                    },
                    {
                        id: "u_demo_001", 
                        name: "Demo Student", 
                        email: "demo@tsu.ac.th", 
                        role: "user" as Role, 
                        username: "demo", 
                        password: "1234"
                    },
                ];
                const found = accounts.find(
                    (a) => a.username === credentials.username && a.password === credentials.password
                );
                if (!found) return null;
                return {
                    id: found.id, name: found.name, email: found.email,
                    role: found.role
                } as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            (session.user as any).id = token.id;
            (session.user as any).role = token.role;
            return session;
        },
    },
    // ตั้งค่าหน้า Login ให้ถูกต้อง (อันนี้คุณมีแล้ว ถูกต้องครับ)
    pages: { signIn: "/login" },
};