export default function ContactPage() {
  return (
    <section className="container">
      <h1>Contact Me</h1>
      <p>
        หากต้องการติดต่อสอบถามหรือพูดคุยเกี่ยวกับรายวิชา Advanced Web Development —
        สามารถติดต่อได้ผ่านช่องทางด้านล่างนี้
      </p>

      <div className="card">
        <h2>ช่องทางการติดต่อ</h2>
        <ul>
          <li>⚡ Email: hakim050580@email.com</li>
          <li>💬 Line: __hakim__</li>
          <li>🧑‍💻 FB: Hakim Romae</li>
          <li>📷 IG: Itshakimmmx</li>



        </ul>
      </div>

      <div className="card mt-8">
        <h2>ส่งข้อความถึงฉัน</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300">ชื่อของคุณ</label>
            <input
              type="text"
              placeholder="กรอกชื่อ..."
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">อีเมล</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">ข้อความ</label>
            <textarea
              rows={4}
              placeholder="พิมพ์ข้อความของคุณ..."
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>

          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold"
          >
            ส่งข้อความ
          </button>
        </form>
      </div>
    </section>
  );
}
