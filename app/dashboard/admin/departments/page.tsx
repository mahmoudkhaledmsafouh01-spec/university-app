async function getDepartments() {
  const res = await fetch("http://localhost:3000/api/departments", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load departments");
  }

  return res.json();
}

export default async function AdminDepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
        <p className="text-sm text-slate-600">
          Quick reference for department chairs and contact info.
        </p>
      </div>

     {departments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
          No departments yet. Create one to organize your courses.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {departments.map((dept: any) => (
            <div
              key={dept.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-indigo-100"
            >
              <p className="text-sm font-semibold text-slate-900">{dept.name}</p>
            </div>
          ))}
        </div>
      )}
      </div>
  );
}
