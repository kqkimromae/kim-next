// app/blog/page.tsx
import Link from "next/link";
import DeleteButton from "./DeleteButton"; // <--- เพิ่มบรรทัดนี้
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; q?: string }>;
}) {
  // 1. (Next.js 15/16) ต้อง await searchParams ก่อนใช้งาน
  const { source: rawSource, q: rawQ } = await searchParams;

  const source = rawSource === "news" ? "news" : "products";
  const q = rawQ || "";

  // 2. แก้ไขจุดที่ Error: เขียน URL ให้จบในบรรทัดเดียว (ห้ามเคาะ enter กลางชื่อตัวแปร)
 const res = await fetch(
  `http://localhost:3000/api/aggregate?source=${source}&q=${encodeURIComponent(q)}`,
  { cache: "no-store" }
);

  
  const data = await res.json();

  return (
    <section className="container">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Blog Aggregator</h1>
        <div className="row">
          <Link className="btn" href="/blog?source=products">Products</Link>
          <Link className="btn" href="/blog?source=news">News</Link>
          <Link className="btn" href="/blog/new">+ New</Link>
        </div>
      </div>

      {/* 3. Search Form ที่เพิ่มเข้ามา */}
      <form className="row" action="/blog" method="get" style={{ margin: "20px 0", gap: "10px", alignItems: "center" }}>
        <input type="hidden" name="source" value={source} />
        <input 
            name="q" 
            defaultValue={q} 
            placeholder="search..." 
            style={{ padding: "8px" }}
        />
        <button className="btn" type="submit">Search</button>
      </form>

      <h2>My Posts</h2>
      <div className="grid">
        {data.internal.map((p: any) => (
          <article key={p.slug} className="card">
            <h3>{p.title}</h3>
            
            {/* ส่วนที่เพิ่ม: จัดกลุ่มปุ่มต่างๆ ให้สวยงาม */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              
              {/* 1. ปุ่มอ่าน (ของเดิม) */}
              <Link className="btn" href={`/blog/${p.slug}`}>
                Read →
              </Link>

              {/* 2. ปุ่มแก้ไข (เพิ่มใหม่) */}
              {/* ตรวจสอบว่าเส้นทาง /blog/edit/[slug] ตรงกับ Folder ที่คุณสร้างไว้ */}
              <Link className="btn" style={{ backgroundColor: '#f0ad4e', color: 'white' }} href={`/blog/edit/${p.slug}`}>
                Edit
              </Link>

              {/* 3. ปุ่มลบ (เรียกใช้ Component ที่มีอยู่แล้ว) */}
              <DeleteButton slug={p.slug} />
              
            </div>

          </article>
        ))}
      </div>

      <h2 style={{ marginTop: 18 }}>
        {source === "news" ? "External News" : "External Products"}
      </h2>
      
      {data.error ? <p><small>{data.error}</small></p> : null}
      
      <div className="grid">
        {data.external.map((x: any) => (
          <article key={x.id} className="card">
            {x.image ? (
              <img
                src={x.image}
                alt=""
                style={{ width: "100%", height: 160, objectFit: "contain" }}
              />
            ) : null}
            <h3>{x.title}</h3>
            {x.subtitle ? <p><small>{x.subtitle}</small></p> : null}
            {x.url ? (
              <a className="btn" href={x.url} target="_blank">
                Open{" "}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}