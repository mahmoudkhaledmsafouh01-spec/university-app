import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Params {
  id: string;
}

export default async function CourseDetailsPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  // Fetch course with enrollments
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/courses/${params.id}`,
    { cache: "no-store" }
  );

  const course = await res.json();

  // Security check (optional)
  if (Number(session?.user?.id) !== course.instructorId) {
    return (
      <div className="text-red-600 text-xl">
        You are not allowed to view this course.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {course.title} ({course.code})
      </h1>

      <a
        href={`/dashboard/instructor/my-courses/${params.id}/grades`}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Grades
      </a>

      <h2 className="text-2xl font-bold mt-8 mb-3">Enrolled Students</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3">Student Name</th>
            <th className="p-3">Email</th>
          </tr>
        </thead>

        <tbody>
          {course.enrollments.map((e: any) => (
            <tr key={e.id} className="border-b">
              <td className="p-3">{e.student.name}</td>
              <td className="p-3">{e.student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
