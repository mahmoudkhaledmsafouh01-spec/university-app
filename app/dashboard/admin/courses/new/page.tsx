export default function AdminNewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create a course</h1>
        <p className="text-sm text-slate-600">
          Define the basics and publish when you are ready.
        </p>
      </div>

      <form className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-slate-800">Course title</span>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Advanced Chemistry"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-slate-800">Course code</span>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="CHEM 410"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-slate-800">Summary</span>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Share what students will learn and any prerequisites."
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            Save draft
          </button>
          <a
            href="/dashboard/admin/courses"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}