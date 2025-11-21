import { BookOpenCheck, GraduationCap, MessageSquare, Sparkles } from "lucide-react";

const shortcuts = [
  {
    label: "My courses",
    description: "Track assignments, attendance, and announcements.",
    href: "/dashboard/student/courses",
    icon: BookOpenCheck,
  },
  {
    label: "My grades",
    description: "See performance by course and export transcripts.",
    href: "/dashboard/student/grades",
    icon: GraduationCap,
  },
  {
    label: "Advisor messages",
    description: "Stay current on advising notes and action items.",
    href: "/dashboard/student/messages",
    icon: MessageSquare,
  },
];

const updates = [
  "Enrollment closes Friday — confirm your schedule.",
  "Library hours extended during midterms week.",
  "Remember to upload your internship paperwork.",
];

export default function StudentDashboard() {
  return (
    
  <div className="space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
              Welcome back, student
            </p>
            <div className="flex items-center gap-2 text-3xl font-semibold">
              <Sparkles className="h-7 w-7 text-amber-300" />
              <h1>Student dashboard</h1>
            </div>
            <p className="max-w-3xl text-sm text-slate-200">
              Keep everything for class in one place — check assignments, grades,
              and advisor updates without digging through emails.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white ring-1 ring-white/20">
            On track for the term
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-4 shadow-sm ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-slate-200">Credits</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">15</span>
              <span className="text-xs text-emerald-200">Full-time</span>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 shadow-sm ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-slate-200">GPA (term)</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">3.72</span>
              <span className="text-xs text-amber-200">Aim for 3.8+</span>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 shadow-sm ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-slate-200">Upcoming</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">2</span>
              <span className="text-xs text-sky-200">Deadlines this week</span>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Quick links</h2>
            <p className="text-sm text-slate-600">
              Jump directly into the areas you use the most.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {shortcuts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex gap-3 rounded-xl border border-slate-100 p-4 transition hover:-translate-y-[1px] hover:border-indigo-100 hover:shadow-sm"
                >
                  <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 ring-1 ring-indigo-100">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-600">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

      <div className="grid grid-cols-2 gap-6">
        <a href="/dashboard/student/courses" className="card">
          <div className="p-6 bg-white rounded shadow">My Courses</div>
        </a>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">What&apos;s next</h2>
                <p className="text-sm text-slate-600">Stay ahead of the week.</p>
              </div>
              <span className="text-xs font-semibold text-indigo-600">Updated daily</span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {updates.map((update) => (
                <li
                  key={update}
                  className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                  {update}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a href="/dashboard/student/grades" className="card">
          <div className="p-6 bg-white rounded shadow">My Grades</div>
        </a>
      </div>
        <aside className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Need a hand?</h2>
          <p className="text-sm text-slate-600">
            Check office hours, schedule time with advisors, or chat with support for quick help.
          </p>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="rounded-lg bg-indigo-50 p-3 text-indigo-800 ring-1 ring-indigo-100">
              📅 Advisor: 2:00 PM–4:00 PM (Hall 3B)
            </div>
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-800 ring-1 ring-emerald-100">
              ✅ Financial aid holds: None
            </div>
            <div className="rounded-lg bg-amber-50 p-3 text-amber-800 ring-1 ring-amber-100">
              ⏳ Next tuition payment due in 10 days
            </div>
          </div>
          <a
            href="mailto:helpdesk@university.edu"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-500"
          >
            Contact support
          </a>
        </aside>
      </section>
    </div>
  );
}