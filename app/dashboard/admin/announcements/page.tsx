const updates = [
  {
    title: "Library maintenance",
    detail: "Short maintenance window scheduled for Saturday 8:00 PM.",
    audience: "All users",
  },
  {
    title: "Orientation reminder",
    detail: "Share welcome materials with incoming students.",
    audience: "Instructors",
  },
];

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
          <p className="text-sm text-slate-600">
            Keep the campus updated with timely, targeted communication.
          </p>
        </div>
        <a
          href="/dashboard/admin/announcements/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
        >
          New announcement
        </a>
      </div>

            <div className="space-y-4">
        {updates.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600">{item.detail}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                {item.audience}
              </span>
            </div>
          </div>
        ))}
            </div>
    </div>
  );
}
