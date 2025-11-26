const enrolled = [
  { title: "Organic Chemistry", code: "CHEM 210", progress: "Week 3" },
  { title: "World History", code: "HIST 101", progress: "Week 5" },
];

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My courses</h1>
          <p className="text-sm text-slate-600">Track where you are each week.</p>
        </div>
        <a
          href="/dashboard/student"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
        >
          Back to dashboard
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {enrolled.map((course) => (
          <div
            key={course.code}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{course.title}</p>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">{course.code}</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">Current module: {course.progress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}