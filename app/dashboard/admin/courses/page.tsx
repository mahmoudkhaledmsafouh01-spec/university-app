const catalog = [
  { code: "BIO 201", title: "Genetics", status: "Open" },
  { code: "CS 150", title: "Intro to Programming", status: "Waitlist" },
  { code: "ENG 320", title: "Rhetoric & Composition", status: "Open" },
];

export default function AdminCoursesPage() {
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

      <div className="grid gap-4 md:grid-cols-3">
        {catalog.map((course) => (
          <div
            key={course.code}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-indigo-100"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{course.title}</p>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">
                {course.code}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-600">Status: {course.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}