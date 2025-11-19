export default function HomePage() {
  return (
    <section className="container">
      <h1>Welcome to My Personal Web</h1>
      <p>
        เว็บไซต์ส่วนตัวสำหรับรายวิชา Advanced Web Development —
        ใช้เมนูด้านบนเพื่อไปยังหน้า About / Course / Project / Contact
      </p>
      <div className="card">
        <h2>เป้าหมาย</h2>
        <ul>
          <li>ฝึกสร้างหน้าเว็บหลายหน้าใน Next.js (App Router)</li>
          <li>ออกแบบเนื้อหาและจัดวาง (Layout / Navigation / Footer)</li>
          <li>เตรียมต่อยอด Tailwind / API / Database ภายหลัง</li>
        </ul>
      </div>
    </section>

  );

}