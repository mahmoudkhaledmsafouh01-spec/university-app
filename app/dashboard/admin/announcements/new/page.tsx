import prisma from "@/lib/prisma";

export default async function NewAnnouncementPage() {
  // Load courses
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  // Load users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Announcement</h1>

      <form
        action="/api/announcements"
        method="POST"
        className="space-y-4 border p-4 rounded bg-white shadow"
      >
        {/* TITLE */}
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="font-medium">Content</label>
          <textarea
            name="content"
            className="border w-full p-2 rounded"
            rows={4}
            required
          ></textarea>
        </div>

        {/* COURSE */}
        <div>
          <label className="font-medium">Course</label>
          <select name="courseId" className="border w-full p-2 rounded" required>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* AUTHOR */}
        <div>
          <label className="font-medium">Author</label>
          <select name="authorId" className="border w-full p-2 rounded" required>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
