interface PageProps {
  params: { id: string };
}

const panels = [
  { title: "Roster", detail: "See enrolled students and attendance." },
  { title: "Assignments", detail: "Draft, publish, and grade coursework." },
  { title: "Announcements", detail: "Share quick updates with the class." },
];

export default function InstructorCourseDetail({ params }: PageProps) {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Course
          </p>

          <h1 className="text-2xl font-bold text-slate-900">
            Course #{params.id}
          </h1>

          <p className="text-sm text-slate-600">
            Centralize everything for this class.
          </p>
        </div>

        <a
          href="/dashboard/instructor/my-courses"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
        >
          Back to courses
        </a>
      </div>

      {/* Panels */}
      <div className="grid gap-4 md:grid-cols-3">
        {panels.map((panel) => (
          <div
            key={panel.title}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-900">
              {panel.title}
            </p>
            <p className="text-xs text-slate-600">{panel.detail}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
