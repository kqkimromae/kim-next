import type { Metadata } from "next";
export const metadata: Metadata = { title: "About — Personal Web" };
export default function AboutPage() {
  return (
    <section className="container">
      <h1>About Me</h1>
      <p>
        สวัสดีครับ/ค่ะ ฉันคือ <strong>ชื่อนักศึกษา</strong> นักศึกษาวิชา Advanced Web Development
        สนใจด้าน Frontend/Full-stack และการสร้าง Web App ที่ใช้งานจริง
      </p>
      <div className="card">
        <h2>Skills</h2>
        <ul>
          <li>HTML/CSS/JS, TypeScript</li>
          <li>React / Next.js</li>
          <li>Git & GitHub</li>
        </ul>
      </div>
    </section>

  );

}