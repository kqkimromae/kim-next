// app/services/external.ts

// 1. กำหนด Type ของข้อมูลที่ Return เพื่อความชัดเจน
export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  image?: string;
}

export async function fetchExternal(
  source: "products" | "news",
  q?: string
): Promise<SearchResult[]> { // ระบุ Type ที่จะ Return
  
  // --- กรณี Products (FakeStoreAPI) ---
  if (source === "products") {
    // FakeStore ไม่มี search API โดยตรง -> ต้องดึงทั้งหมดแล้วมา filter เอง
    const res = await fetch("https://fakestoreapi.com/products", { 
      cache: "no-store" // แก้ nostore -> no-store
    });
    
    if (!res.ok) return [];
    
    const items = await res.json();
    
    const filtered = q
      ? items.filter((p: any) =>
          (p.title + " " + p.category).toLowerCase().includes(q.toLowerCase())
        )
      : items;

    // slice(0, 6) เพื่อจำกัดจำนวนผลลัพธ์
    return filtered.slice(0, 6).map((p: any) => ({
      id: String(p.id),
      title: p.title,
      subtitle: `$${p.price} • ${p.category}`,
      url: p.image, // หรือใช้ Link ไปหน้ารายละเอียดถ้ามี
      image: p.image
    }));
  }

  // --- กรณี News (Algolia / Hacker News) ---
  // ใช้ else หรือปล่อยไหลลงมาได้เลยเพราะด้านบน return ไปแล้ว
  
  const url = new URL("https://hn.algolia.com/api/v1/search");
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", "6");
  if (q) url.searchParams.set("query", q);

  try {
    const res = await fetch(url.toString(), { 
      cache: "no-store" // แก้ nostore -> no-store
    });

    if (!res.ok) return [];

    const data = await res.json();

    return (data.hits || []).map((h: any) => ({
      id: String(h.objectID),
      title: h.title,
      subtitle: `${h.points ?? 0} points • by ${h.author}`,
      // ถ้าไม่มี URL ให้ลิงก์ไปที่หน้า HN discussion แทน
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      image: undefined // ข่าว HN ปกติไม่มีรูป
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}