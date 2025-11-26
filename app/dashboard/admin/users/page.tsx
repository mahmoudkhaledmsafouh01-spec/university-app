const mockUsers = [
  { name: "Olivia Rhye", role: "Instructor", email: "olivia@university.edu" },
  { name: "Milo Carter", role: "Student", email: "milo@university.edu" },
  { name: "Beatriz Lee", role: "Admin", email: "beatriz@university.edu" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-slate-900">User directory</h1>
        <p className="text-sm text-slate-600">
          Manage access and invite new teammates to the university platform.
        </p>
      </header>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <a
          href="/dashboard/admin/users/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
        >
          Add a user
        </a>

        <a
          href="/dashboard/admin"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
        >
          Back to overview
        </a>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {mockUsers.map((user) => (
              <tr key={user.email} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">{user.name}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3 text-slate-500">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
