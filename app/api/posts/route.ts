// app/api/posts/route.ts
import { getAllPosts, addPost, deletePost, updatePost } from "@/app/lib/posts";
import { revalidatePath } from "next/cache";

// 1. ดึงข้อมูลทั้งหมด
export async function GET() {
    return Response.json(getAllPosts());
}

// 2. เพิ่มบทความใหม่
export async function POST(req: Request) {
    const data = await req.json();
    addPost(data);
    revalidatePath("/blog"); 
    return Response.json({ ok: true });
}

// 3. ลบบทความตาม slug
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (slug) {
        deletePost(slug);
        revalidatePath("/blog");
        return Response.json({ ok: true });
    }
    return Response.json({ ok: false }, { status: 400 });
}

// 4. แก้ไขบทความ

export async function PUT(req: Request) {
    const data = await req.json();
    updatePost(data);
    revalidatePath("/blog");
    return Response.json({ ok: true });
}