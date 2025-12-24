"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบบทความนี้?")) {
      // แก้ไขบรรทัดนี้: ใช้ backticks และลบช่องว่าง
      const res = await fetch(`/api/posts?slug=${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("ลบข้อมูลสำเร็จ");
        router.refresh(); // รีเฟรชหน้าเพื่อให้ข้อมูลอัปเดต
      } else {
        alert("เกิดข้อผิดพลาดในการลบ");
      }
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="btn" 
      style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
    >
      Delete
    </button>
  );
}