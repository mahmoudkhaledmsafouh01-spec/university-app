const departments = [
  { name: "Engineering", chair: "Dr. Harper", phone: "(555) 301-7780" },
  { name: "Humanities", chair: "Dr. Patel", phone: "(555) 293-1441" },
  { name: "Sciences", chair: "Dr. Wu", phone: "(555) 827-4400" },
];
export default function AdminDepartmentsPage() {
   return (
     <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
        <p className="text-sm text-slate-600">
          Quick reference for department chairs and contact info.
        </p>
      </div>

       <div className="grid gap-4 md:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-indigo-100"
          >
            <p className="text-sm font-semibold text-slate-900">{dept.name}</p>
            <p className="text-xs text-slate-600">Chair: {dept.chair}</p>
            <p className="text-xs text-slate-500">Contact: {dept.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
