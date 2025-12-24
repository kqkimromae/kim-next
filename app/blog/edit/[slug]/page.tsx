"use client"; // ต้องใช้ Client Component เพราะมีฟอร์มและการกดปุ่ม

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params); // ดึง slug จาก URL
    const router = useRouter();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    // 1. ดึงข้อมูลเดิมมาใส่ในฟอร์ม
    useEffect(() => {
        fetch("/api/posts")
            .then(res => res.json())
            .then(posts => {
                const post = posts.find((p: any) => p.slug === slug);
                if (post) {
                    setTitle(post.title);
                    setContent(post.content);
                }
                setLoading(false);
            });
    }, [slug]);

    // 2. ฟังก์ชันเมื่อกดปุ่ม Update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/posts", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, title, content, date: new Date().toISOString().split('T')[0] })
        });

        if (res.ok) {
            router.push("/blog"); // แก้เสร็จแล้วกลับไปหน้าหลัก
            router.refresh();    // สั่งให้หน้าหลักโหลดข้อมูลใหม่
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <section className="container">
            <h1>Edit Post</h1>
            <form onSubmit={handleUpdate} className="card" style={{ padding: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Content:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        rows={5}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div className="row" style={{ gap: "10px" }}>
                    <button type="submit" className="btn">Update Post</button>
                    <button type="button" onClick={() => router.back()} className="btn btn-outline">Cancel</button>
                </div>
            </form>
        </section>
    );
}