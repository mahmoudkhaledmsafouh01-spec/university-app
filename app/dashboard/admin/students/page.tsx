import { GraduationCap, Mail, Users } from "lucide-react";

const students = [
  {
    name: "Ava Carter",
    email: "ava.carter@university.edu",
    department: "Computer Science",
    status: "Full-time",
  },
  {
    name: "Diego Rivera",
    email: "diego.rivera@university.edu",
    department: "Economics",
    status: "Part-time",
  },
  {
    name: "Priya Nair",
    email: "priya.nair@university.edu",
    department: "Mathematics",
    status: "Full-time",
  },
];

export default function AdminStudentsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <GraduationCap className="h-6 w-6 text-indigo-600" /> Students
          </h1>
          <p className="text-sm text-slate-600">
            Keep an eye on cohorts, enrollment, and advising details.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/dashboard/admin/students/new"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            <GraduationCap className="h-4 w-4" />
            Add student
          </a>
          <a
            href="/dashboard/admin"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
          >
            Back to overview
          </a>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
            Active students
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">3</p>
          <p className="text-xs text-slate-500">Sample data for demonstration.</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
            Departments covered
            <GraduationCap className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">3</p>
          <p className="text-xs text-slate-500">Computer Science, Economics, Mathematics</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
            Enrollment status
            <Mail className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
          <p className="text-xs text-slate-500">Advising follow-ups pending</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {students.map((student) => (
              <tr key={student.email} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold">{student.name}</td>
                <td className="px-4 py-3 text-slate-500">{student.email}</td>
                <td className="px-4 py-3">{student.department}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}