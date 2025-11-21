// app/dashboard/admin/users/page.tsx
import DeleteButton from "@/components/DeleteButton";

type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
};

export default async function UsersPage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users`, {
    cache: "no-store",
  });
  const users: User[] = await res.json();

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <a href="/dashboard/admin/users/new" className="btn-primary">
          + New
        </a>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 flex gap-2">
                <a
                  href={`/dashboard/admin/users/${u.id}/edit`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </a>
                <DeleteButton apiUrl="/api/users" id={u.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
