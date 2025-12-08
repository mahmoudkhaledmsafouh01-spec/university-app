async function getUsers() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load users");
  }

  return res.json();
}

type User = {
  id: number;
  name: string;
  role: string;
  email: string;
};

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  INSTRUCTOR: "Instructor",
  STUDENT: "Student",
};

export default async function AdminUsersPage() {
  const users: User[] = await getUsers();

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
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-sm text-slate-500"
                >
                  No users yet. Add your first account to get started.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold">{user.name}</td>
                  <td className="px-4 py-3">
                    {roleLabels[user.role] ?? user.role}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
