// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // เปลี่ยนมาดึงข้อมูลผ่าน API แทนเพื่อให้ได้ข้อมูลล่าสุดที่เพิ่ง New เข้าไป    
    const res = await fetch("http://localhost:3000/api/posts", { 
    cache: "no-store" 
  });
const posts = await res.json();

// ค้นหา post จากข้อมูลที่ fetch มา
const post = posts.find((p: any) => p.slug === decodeURIComponent(slug));   

if (!post) {
    return notFound();
}

return (
    <article className="container" style={{ padding: "2rem" }}>
        <header>
            <a href="/blog" style={{ marginBottom: "1rem", display: "inline-block" }}>← Back to Blog</a>
            <h1>{post.title}</h1>
            <p><small>Date: {post.date}</small></p>
        </header>
        <hr />
        <div style={{ whiteSpace: "pre-wrap", marginTop: "1rem", fontSize: "1.1rem" }}>
            {post.content}
        </div>
    </article>
);
}