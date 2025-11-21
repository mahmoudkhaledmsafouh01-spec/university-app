import prisma from "@/lib/prisma";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      department: true,
      instructor: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {courses.length === 0 && <p>No courses found.</p>}

      <ul className="space-y-3">
        {courses.map((c) => (
          <li key={c.id} className="border p-4 bg-white">
            {/* 👇 use `title`, NOT `name` */}
            <p className="font-bold text-lg">{c.title}</p>

            <p className="text-sm text-gray-600">
              Code: {c.code} · Credits: {c.credits}
            </p>

            {c.department && (
              <p className="text-sm text-gray-500">
                Department: {c.department.name}
              </p>
            )}

            {c.description && (
              <p className="mt-1 text-sm text-gray-700">{c.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}