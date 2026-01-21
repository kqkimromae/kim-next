// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  // ถ้าไม่มี callbackUrl ให้บังคับไป /dashboard เสมอ
  const callbackUrl = sp.get("callbackUrl") || "/dashboard"; 
  
  const [form, setForm] = useState({ username: "demo", password: "1234" });
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username: form.username,
      password: form.password,
      callbackUrl,
    });

    if (!res?.ok) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      return;
    }

    // --- จุดที่แก้ไข: ใช้ window.location.href แทน router.push ---
    // วิธีนี้จะบังคับให้ Browser โหลดหน้าใหม่ มั่นใจได้ว่า Session มาครบแน่นอน
    window.location.href = callbackUrl; 
    // --------------------------------------------------------
  }

  return (
    <section className="container">
      <h1>Login</h1>
      <form className="card" onSubmit={onSubmit}>
        <label>Username</label>
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="demo or admin"
        />
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
        />
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        <button className="btn" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}