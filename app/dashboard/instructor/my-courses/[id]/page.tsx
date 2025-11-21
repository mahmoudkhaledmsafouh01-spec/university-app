interface CoursePageParams {
  id: string;
}

interface Lesson {
  id: string;
  title: string;
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default async function InstructorCourseDetails({
  params,
}: {
  params: CoursePageParams;
}) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/courses/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="p-6">Error: Course not found.</div>;
  }

  const course: Course = await res.json();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <div className="grid grid-cols-2 gap-6">

        {/* Add Lesson */}
        <a
          href={`/dashboard/instructor/my-courses/${params.id}/lessons/new`}
          className="p-6 bg-white rounded shadow"
        >
          + Add Lesson
        </a>

        {/* Manage Grades */}
        <a
          href={`/dashboard/instructor/my-courses/${params.id}/grades`}
          className="p-6 bg-white rounded shadow"
        >
          Manage Grades
        </a>

      </div>

      <h2 className="mt-8 text-xl font-bold">Lessons</h2>

      <ul className="bg-white mt-2 p-4 rounded shadow">
        {course.lessons.map((l: Lesson) => (
          <li
            key={l.id}
            className="flex justify-between border-b py-2"
          >
            {l.title}

            <a
              href={`/dashboard/instructor/my-courses/${params.id}/lessons/${l.id}/edit`}
              className="text-blue-600"
            >
              Edit
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
