export type Post = { 
    slug: string; 
    title: string; 
    content: string; 
    date: string; 
    tags?: string[] 
};

// ข้อมูลเริ่มต้น
let posts: Post[] = [
    { slug: "hello-nextjs", title: "Hello Next.js!", content: "เริ่มเรียนรู้การสร้างเว็บด้วย Next.js", date: "2025-12-23" },
    { slug: "learning-typescript", title: "TypeScript Basics", content: "พื้นฐาน TypeScript สำหรับมือใหม่", date: "2025-12-24" },
    { slug: "react-hooks-tips", title: "React Hooks Tips", content: "เทคนิคการใช้ hooks ต่างๆ ใน React", date: "2025-12-25" },
    { slug: "tailwind-css-guide", title: "Tailwind CSS Guide", content: "ตกแต่งเว็บไซต์ให้สวยงามด้วย Tailwind", date: "2025-12-26" },
    { slug: "deploying-nextjs", title: "Deploying Next.js", content: "วิธีเอาเว็บขึ้นไปรันบน Vercel", date: "2025-12-27" }
];

export function getAllPosts() { 
    return posts; 
}

export function addPost(p: Post) { 
    // ใช้ spread operator เพื่ออัปเดตค่าให้ฟังก์ชันอื่นเห็น
    posts = [p, ...posts]; 
}

export function getPostBySlug(slug: string) {
    // แก้ไขจุดนี้: ใช้ decodeURIComponent เพื่อแปลงรหัส URL กลับเป็นภาษาไทย
    return posts.find(p => p.slug === decodeURIComponent(slug));
}

export function deletePost(slug: string) { 
    posts = posts.filter(p => p.slug !== slug); 
}

export function updatePost(updatedPost: Post) {
    const index = posts.findIndex(p => p.slug === updatedPost.slug);
    if (index !== -1) {
        posts[index] = updatedPost;
    }
}