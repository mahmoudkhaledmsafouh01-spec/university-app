import prisma from "@/lib/prisma";

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      course: true,
      author: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>

      <ul className="space-3">
        {announcements.map((a) => (
          <li key={a.id} className="border p-4 bg-white mb-3">
            <h2 className="font-bold text-lg">{a.title}</h2>

            {/* 👇 use `message`, NOT `content` */}
            <p className="mt-1">{a.message}</p>

            <p className="mt-2 text-xs text-gray-500">
              {a.course ? `Course: ${a.course.title}` : "General"}
              {" · "}
              {a.author ? `Author: ${a.author.name}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
