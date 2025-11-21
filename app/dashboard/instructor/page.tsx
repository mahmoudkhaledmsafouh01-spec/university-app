import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Course {
  id: number;
  title: string;
  code: string;
  instructorId: number;
}

export default async function MyCoursesPage() {
  const session = await getServerSession(authOptions);

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/courses`, {
    cache: "no-store",
  });

  const allCourses: Course[] = await res.json();

  const courses = allCourses.filter(
    (c) => c.instructorId === Number(session?.user?.id)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3">Title</th>
            <th className="p-3">Code</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="p-3">{c.title}</td>
              <td className="p-3">{c.code}</td>
              <td className="p-3">
                <a
                  href={`/dashboard/instructor/my-courses/${c.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Manage
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
