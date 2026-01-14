// app/api/aggregate/route.ts
import { NextResponse } from "next/server";

// ✅ ใช้ ../.. ถอยกลับไปที่ folder app (วิธีนี้ชัวร์ที่สุดถ้าระบบ alias มีปัญหา)
import { getAllPosts } from "../../lib/posts";      
import { fetchExternal } from "../../services/external"; 

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || undefined;
    
    const sourceParam = searchParams.get("source");
    const source = sourceParam === "news" ? "news" : "products";

    const [internal, external] = await Promise.all([
      getAllPosts(),
      fetchExternal(source, q)
    ]);

    return NextResponse.json({
      success: true,
      source,
      q,
      internal: internal || [],
      external: external || []
    });

  } catch (error) {
    console.error("API Aggregate Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", internal: [], external: [] },
      { status: 500 }
    );
  }
}