const grades = [
  { course: "Calculus II", score: "A-", updated: "Yesterday" },
  { course: "English Comp", score: "B+", updated: "2 days ago" },
];

export default function StudentGradesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My grades</h1>
          <p className="text-sm text-slate-600">Track performance across each course.</p>
        </div>
        <a
          href="/dashboard/student"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
        >
          Back to dashboard
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {grades.map((item) => (
              <tr key={item.course} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">{item.course}</td>
                <td className="px-4 py-3">{item.score}</td>
                <td className="px-4 py-3 text-slate-500">{item.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}