export default function ProjectPage() {
    return (
      <section className="container">
        <h1>My Web Development Projects</h1>
        <p>
          หน้านี้รวบรวมโปรเจกต์และผลงานที่สร้างขึ้นในรายวิชา Advanced Web Development —
          แต่ละโปรเจกต์แสดงให้เห็นการประยุกต์ใช้เทคนิคจาก Next.js, Tailwind CSS และ API ต่าง ๆ
        </p>
  
        <div className="card">
          <h2>โปรเจกต์ที่พัฒนา</h2>
          <ul>
            <li>
              <strong>Project 1:</strong> เว็บไซต์แนะนำตัว (Personal Profile Website)
            </li>
            <li>
              <strong>Project 2:</strong> ระบบบันทึกข้อมูลด้วยฐานข้อมูล (Database CRUD App)
            </li>
            <li>
              <strong>Project 3:</strong> แอปพลิเคชันเชื่อมต่อ API ภายนอก (API Integration)
            </li>
          </ul>
        </div>
      </section>
    );
  }
  