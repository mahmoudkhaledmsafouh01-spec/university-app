import {
  ClipboardList,
  GraduationCap,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

const students = [
  {
    name: "Ava Carter",
    email: "ava.carter@university.edu",
    department: "Computer Science",
    status: "Cleared",
    type: "Full-time",
    advisor: "Dr. Lin",  },
  {
    name: "Diego Rivera",
    email: "diego.rivera@university.edu",
    department: "Economics",
    status: "Advising",
    type: "Part-time",
    advisor: "Prof. Malik",  },
  {
    name: "Priya Nair",
    email: "priya.nair@university.edu",
    department: "Mathematics",
    status: "Pending docs",
    type: "Full-time",
    advisor: "Dr. Wilson", 
   },
];

const statusStyles: Record<string, string> = {
  Cleared: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  Advising: "bg-amber-50 text-amber-700 ring-amber-100",
  "Pending docs": "bg-sky-50 text-sky-700 ring-sky-100",
};

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
           Enrollment health
           <ShieldCheck className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
          <p className="text-xs text-slate-500">Advising follow-ups pending</p>
        </div>
      </div>

    <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Student roster</p>
            <p className="text-xs text-slate-500">Statuses, advising, and enrollment type in one view.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <ClipboardList className="h-4 w-4" /> Cohort checks
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <ShieldCheck className="h-4 w-4" /> Compliance
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
          {["All", "Full-time", "Part-time", "Requires follow-up"].map((filter) => (
            <button
              key={filter}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                filter === "All"
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
              }`}
              type="button"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> {filter}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Advisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {students.map((student) => (
                <tr key={student.email} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold">{student.name}</td>
                  <td className="px-4 py-3 text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {student.email}
                    </span>
                  </td>
                  <td className="px-4 py-3">{student.department}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-100">
                      {student.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                        statusStyles[student.status]
                      }`}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{student.advisor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}