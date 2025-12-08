import {
  BarChart3,
  BookOpen,
  BookOpenCheck,
  GraduationCap,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const shortcuts: {
  label: string;
  description: string;
  href: string;
  icon: any;
}[] = [
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

const primaryCards = [
  {
    title: "My courses",
    href: "/dashboard/student/courses",
    description: "Track active classes, assignments, and attendance in one place.",
    icon: BookOpen,
    badge: "3 active",
    badgeClass: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  {
    title: "My grades",
    href: "/dashboard/student/grades",
    description: "Export transcripts and check GPA trends by course.",
    icon: BarChart3,
    badge: "Latest updated",
    badgeClass: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
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

        {/* STATS */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardStat label="Credits" value="15" sub="Full-time" />
          <DashboardStat label="GPA (term)" value="3.72" sub="Aim for 3.8+" />
          <DashboardStat label="Upcoming" value="2" sub="Deadlines this week" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">

          {/* SHORTCUTS SECTION */}
          <DashboardSection title="Quick links" description="Jump directly into the areas you use the most.">
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
          </DashboardSection>

          {/* FEATURED CARDS */}
          <div className="grid gap-4 sm:grid-cols-2">
            {primaryCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-[1px] hover:ring-indigo-100"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-slate-50 p-2 text-slate-700 ring-1 ring-slate-100">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{card.title}</p>
                    <p className="text-xs text-slate-600">{card.description}</p>
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${card.badgeClass}`}
                >
                  {card.badge}
                </span>
              </a>
            ))}
          </div>

          {/* UPDATES SECTION */}
          <DashboardSection
            title="What's next"
            description="Stay ahead of the week."
            action="Updated daily"
          >
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
          </DashboardSection>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Need a hand?</h2>
          <p className="text-sm text-slate-600">
            Check office hours, schedule time with advisors, or chat with support for quick help.
          </p>

          <SidebarInfo text="📅 Advisor: 2:00 PM–4:00 PM (Hall 3B)" color="indigo" />
          <SidebarInfo text="✅ Financial aid holds: None" color="emerald" />
          <SidebarInfo text="⏳ Next tuition payment due in 10 days" color="amber" />

          <a
            href="mailto:helpdesk@university.edu"
            className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Contact support
          </a>
        </aside>
      </section>
    </div>
  );
}

function DashboardStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-white/10 p-4 shadow-sm ring-1 ring-white/15">
      <p className="text-xs uppercase tracking-wide text-slate-200">{label}</p>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-xs text-sky-200">{sub}</span>
      </div>
    </div>
  );
}

function DashboardSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        {action && <span className="text-xs font-semibold text-indigo-600">{action}</span>}
      </div>
      {children}
    </div>
  );
}

function SidebarInfo({ text, color }: { text: string; color: string }) {
  return (
    <div className={`rounded-lg bg-${color}-50 p-3 text-${color}-800 ring-1 ring-${color}-100`}>
      {text}
    </div>
  );
}
