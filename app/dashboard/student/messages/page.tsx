const conversations = [
  { name: "Advisor", preview: "Please upload the internship form.", time: "Today" },
  { name: "Registrar", preview: "Enrollment window opens Monday.", time: "2d" },
];

export default function StudentMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-sm text-slate-600">Stay current on advisement and action items.</p>
        </div>
        <a
          href="/dashboard/student"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
        >
          Back to dashboard
        </a>
      </div>

      <div className="space-y-3">
        {conversations.map((thread) => (
          <div
            key={thread.name}
            className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{thread.name}</p>
                <p className="text-xs text-slate-600">{thread.preview}</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">{thread.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}