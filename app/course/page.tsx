import type { Metadata } from "next";
export const metadata: Metadata = { title: "Course — Personal Web" };
const modules = [
  { week: 1, topic: "Modern Web & Toolchain", status: "done" },
  { week: 2, topic: "Next.js App Router Basics", status: "in progress" },
  { week: 3, topic: "Styling: CSS/Tailwind", status: "up next" },

];



export default function CoursePage() {
  return (
    <section className="container">
      <h1>About the Course</h1>
      <p>สรุปหัวข้อและแผนการเรียนรายสัปดาห์อย่างย่อ</p>
      <div className="card">
        <h2>Weekly Plan</h2>
        <table className="table">
          <thead>
            <tr><th>Week</th><th>Topic</th><th>Status</th></tr>
          </thead>
          <tbody>
            {modules.map(m => (
              <tr key={m.week}>
                <td>{m.week}</td>
                <td>{m.topic}</td>
                <td>{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <small>**ให้นิสิตแก้ไข/เพิ่มรายละเอียดเองได้**</small>
      </div>
    </section>

  );

}