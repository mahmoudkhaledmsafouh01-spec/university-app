interface CourseGradesPageProps {
  params: {
    id: string; // courseId
  };
}

interface Grade {
  id: number;
  value: number;
  courseId: number;
}

interface Student {
  id: number;
  name: string;
  grades?: Grade[];
}

interface Enrollment {
  id: number;
  student: Student;
}

interface Course {
  id: number;
  title: string;
  enrollments: Enrollment[];
}

export default async function CourseGrades({ params }: CourseGradesPageProps) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/courses/${params.id}`,
    { cache: "no-store" }
  );

  const course: Course = await res.json();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Grades: {course.title}</h1>

      <a
        href={`/dashboard/instructor/my-courses/${params.id}/grades/new`}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Assign Grade
      </a>

      <table className="w-full mt-6 bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3">Student</th>
            <th className="p-3">Grade</th>
          </tr>
        </thead>

        <tbody>
          {course.enrollments.map((enrollment) => {
            const grade = enrollment.student.grades?.find(
              (g) => g.courseId === course.id
            );

            return (
              <tr key={enrollment.id} className="border-b">
                <td className="p-3">{enrollment.student.name}</td>
                <td className="p-3">{grade?.value ?? "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
