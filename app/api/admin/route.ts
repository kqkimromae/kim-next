import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. ดึง session ปัจจุบันมาเช็ค
  const session = await getServerSession(authOptions);

  // 2. ถ้ายังไม่ Login เลย -> คืนค่า 401 Unauthorized
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized (Please login first)" },
      { status: 401 }
    );
  }

  // 3. แปลง type user เพื่อเข้าถึง role
  const user = session.user as any;

  // 4. เช็ค Role: ถ้าไม่ใช่ admin -> คืนค่า 403 Forbidden (ตามโจทย์)
  if (user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: You do not have permission" }, // ข้อความแจ้งเตือน
      { status: 403 } // 👈 คืนค่า 403 ตามที่โจทย์ต้องการ
    );
  }

  // 5. ถ้าเป็น Admin -> คืนค่า 200 OK พร้อมข้อมูล
  return NextResponse.json(
    { 
      message: "Success", 
      data: "This is secret data for Admin only." 
    },
    { status: 200 }
  );
}