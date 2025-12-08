async function getCourses() {
 const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/courses`, {    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load courses");
  }

  return res.json();
}

export default async function AdminCoursesPage() {
  const courses = await getCourses();
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Course catalog</h1>
          <p className="text-sm text-slate-600">
            Review active courses and create new offerings.
          </p>
        </div>
        <a
          href="/dashboard/admin/courses/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
        >
          Create course
        </a>
      </div>

       {courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
          No courses yet. Create your first course to populate the catalog.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {courses.map((course: any) => (
            <div
              key={course.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-indigo-100"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">
                  {course.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600">Credits: {course.credits}</p>
              {course.description && (
                <p className="mt-2 text-xs text-slate-500 line-clamp-3">{course.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}