import prisma from "@/lib/prisma";

export default async function EditUser({ params }: any) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) return <p>User not found</p>;

  return (
    <form action="/api/admin/users/update" method="POST" className="p-6 space-y-4">
      <input type="hidden" name="id" defaultValue={user.id} />

      <h1 className="text-2xl font-bold">Edit User</h1>

      <input
        name="name"
        defaultValue={user.name}
        className="border p-2 w-full"
      />

      <input
        name="email"
        defaultValue={user.email}
        className="border p-2 w-full"
      />

      <select name="role" defaultValue={user.role} className="border p-2 w-full">
        <option value="ADMIN">ADMIN</option>
        <option value="INSTRUCTOR">INSTRUCTOR</option>
        <option value="STUDENT">STUDENT</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}
