// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  // เพิ่ม /admin และ /admin/:path* เข้าไป
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};