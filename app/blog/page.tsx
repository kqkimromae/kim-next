// app/blog/page.tsx
import Link from "next/link";
import DeleteButton from "./DeleteButton"; 

// บังคับให้หน้านี้เป็น Dynamic (ไม่ใช้ Cache) เพื่อให้เห็นข้อมูลที่กด New หรือ Delete ทันที
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPage() {
  // ดึงข้อมูลจาก API ของเราเอง
  // ใส่ { cache: "no-store" } เพื่อป้องกันอาการข้อมูลเก่าค้าง (สาเหตุของ 404 ในบางครั้ง)
  const res = await fetch("http://localhost:3000/api/posts", { 
    cache: "no-store" 
  });
  
  if (!res.ok) {
    return <section className="container"><h1>เกิดข้อผิดพลาดในการดึงข้อมูล</h1></section>;
  }

  const posts = await res.json();

  return (
    <section className="container">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Blog Posts</h1>
        <Link className="btn" href="/blog/new" style={{ backgroundColor: "#0070f3", color: "white" }}>
          + Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>ยังไม่มีบทความในขณะนี้</p>
      ) : (
        <div className="grid">
          {posts.map((p: any) => (
            <article key={p.slug} className="card" style={{ border: "1px solid #eaeaea", padding: "1.5rem", borderRadius: "10px" }}>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{p.title}</h3>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>
                <small>Published: {p.date}</small>
              </p>
              
              <div className="row" style={{ gap: "10px", marginTop: "1rem" }}>
                {/* ปุ่มอ่านเนื้อหา */}
                <Link className="btn" href={`/blog/${p.slug}`} style={{ fontSize: "0.8rem" }}>
                  Read →
                </Link>
                
                {/* ปุ่มแก้ไข (Step 5) */}
                <Link className="btn btn-outline" href={`/blog/edit/${p.slug}`} style={{ fontSize: "0.8rem" }}>
                  Edit
                </Link>
                
                {/* ปุ่มลบ (Client Component) */}
                <DeleteButton slug={p.slug} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}