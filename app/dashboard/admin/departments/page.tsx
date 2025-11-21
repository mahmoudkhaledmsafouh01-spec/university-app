import prisma from "@/lib/prisma";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>

      <ul className="space-y-2">
        {departments.map((d) => (
          <li key={d.id} className="border p-3 bg-white">
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
