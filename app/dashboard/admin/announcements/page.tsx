async function getAnnouncements() {
  const res = await fetch("http://localhost:3000/api/announcements", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load announcements");
  }

  return res.json();
}

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

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
        {announcements.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
            No announcements yet. Share an update with your community.
          </div>
                ) : (
          announcements.map((item: any) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-600">{item.message}</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {item.course?.title ?? "Course"} • {item.author?.name ?? "Author"}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
