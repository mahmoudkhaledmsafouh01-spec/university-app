import { GraduationCap } from "lucide-react";

export default function NewStudentPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Create</p>
          <h1 className="text-2xl font-bold text-slate-900">New student</h1>
        </div>
      </header>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <form className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Full name
            <input
              type="text"
              placeholder="Alex Morgan"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Email address
            <input
              type="email"
              placeholder="alex.morgan@university.edu"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Department
            <input
              type="text"
              placeholder="Computer Science"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Enrollment type
            <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Online</option>
            </select>
          </label>
          <label className="md:col-span-2 space-y-2 text-sm font-medium text-slate-700">
            Advisor notes
            <textarea
              rows={3}
              placeholder="Add advising or onboarding notes..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            >
              <GraduationCap className="h-4 w-4" /> Save student
            </button>
            <a
              href="/dashboard/admin/students"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}