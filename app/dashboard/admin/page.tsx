import {
  BellRing,
  BookOpen,
  Building2,
  Building,
  GraduationCap,
  Megaphone,
  Plus,
  School,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";

const quickStats = [
  {
    label: "Active users",
    value: "482",
    delta: "+18 this week",
    icon: Users,
  },
  {
    label: "Courses running",
    value: "128",
    delta: "12 need review",
    icon: BookOpen,
  },
  {
    label: "Departments",
    value: "24",
    delta: "All synced",
    icon: Building2,
  },
  {
    label: "Announcements",
    value: "6",
    delta: "2 scheduled",
    icon: Megaphone,
  },
];

const managementAreas = [
  {
    label: "Users",
    description: "Invite admins, instructors, and support staff.",
    icon: UserPlus,
    href: "/dashboard/admin/users",
    createHref: "/dashboard/admin/users/new",
  },
  {
    label: "Students",
    description: "Track enrollment, cohorts, and onboarding.",
    icon: School,
    href: "/dashboard/admin/students",
    createHref: "/dashboard/admin/students/new",
  },
  {
    label: "Departments",
    description: "Keep chair contacts and faculty rosters updated.",
    icon: Building,
    href: "/dashboard/admin/departments",
    createHref: "/dashboard/admin/departments/new",
  },
  {
    label: "Courses",
    description: "Set up curriculum details and modules.",
    icon: BookOpen,
    href: "/dashboard/admin/courses",
    createHref: "/dashboard/admin/courses/new",
  },
  {
    label: "Announcements",
    description: "Publish campus-wide updates and notices.",
    icon: Megaphone,
    href: "/dashboard/admin/announcements",
    createHref: "/dashboard/admin/announcements/new",
  },
];

const workload = [
  {
    title: "User management",
    status: "3 onboarding requests pending",
    accent: "bg-indigo-50 text-indigo-700",
    badge: "Priority",
  },
  {
    title: "Course approvals",
    status: "5 drafts awaiting sign-off",
    accent: "bg-amber-50 text-amber-700",
    badge: "Review",
  },
  {
    title: "Department updates",
    status: "Campus directory refreshed today",
    accent: "bg-emerald-50 text-emerald-700",
    badge: "Healthy",
  },
  {
    title: "Announcements",
    status: "Orientation notice scheduled for 9:00 AM",
    accent: "bg-sky-50 text-sky-700",
    badge: "Scheduled",
  },
];

const quickLinks = [
  {
    label: "Create user",
    href: "/dashboard/admin/users/new",
    description: "Invite staff, instructors, or students",
    icon: UserPlus,
  },
  {
    label: "Create announcement",
    href: "/dashboard/admin/announcements/new",
    description: "Share campus-wide updates quickly",
    icon: Megaphone,
  },
  {
    label: "Create course",
    href: "/dashboard/admin/courses/new",
    description: "Set up curriculum details quickly",
    icon: BookOpen,  },
  {
    label: "New department",
    href: "/dashboard/admin/departments/new",
    description: "Manage chairs and contact info",
    icon: Building2,
  },
  {
    label: "Add student profile",
    href: "/dashboard/admin/students/new",
    description: "Capture enrollment details and advisors",
    icon: GraduationCap,
  },
];

const announcements = [
  {
    title: "Semester kickoff",
    category: "Student life",
    time: "Today, 8:15 AM",
    detail: "Reminder to finalize onboarding for new cohorts and confirm instructor allocations.",
  },
  {
    title: "Maintenance window",
    category: "IT services",
    time: "Tomorrow, 6:00 PM",
    detail: "Library network will undergo scheduled maintenance; notify faculty of potential downtime.",
  },
  {
    title: "Policy review",
    category: "Compliance",
    time: "This week",
    detail: "Annual audit requires updated department safety guidelines before Friday.",
  },
];

export default function AdminOverview() {
  return (
   <div className="space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-200/70">
              Welcome back, Admin
            </p>
            <div className="flex items-center gap-2 text-3xl font-semibold">
              <Sparkles className="h-7 w-7 text-amber-300" />
              <h1>Admin Dashboard</h1>
            </div>
            <p className="max-w-3xl text-sm text-slate-200">
              Keep the university running smoothly with quick actions, live summaries,
              and at-a-glance health indicators.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/dashboard/admin/announcements/new"
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                New announcement
              </a>
              <a
                href="/dashboard/admin/users/new"
                className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow transition hover:bg-amber-300"
              >
                Add user
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-3 shadow-sm ring-1 ring-white/15"
            >
              <div className="rounded-lg bg-white/20 p-2">
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-slate-200">{item.label}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">{item.value}</span>
                  <span className="text-xs text-emerald-200">{item.delta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
                  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Manage everything</h2>
                <p className="text-sm text-slate-600">
                  Jump straight into users, students, departments, courses, and announcements.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <Plus className="h-4 w-4" /> New records ready
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {managementAreas.map((area) => (
                <div
                  key={area.label}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.12)] hover:border-indigo-100"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
                      <area.icon className="h-5 w-5" />
                    </div>
                    <a
                      href={area.createHref}
                      className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-indigo-500"
                    >
                      <Plus className="h-3.5 w-3.5" /> New
                    </a>
                  </div>
                  <div className="space-y-1">
                    <a
                      href={area.href}
                      className="text-sm font-semibold text-slate-900 hover:text-indigo-700"
                    >
                      {area.label}
                    </a>
                    <p className="text-xs text-slate-600">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Today&apos;s overview</h2>
                <p className="text-sm text-slate-600">
                  Keep up with the latest requests, reviews, and approvals.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <ShieldCheck className="h-4 w-4" /> Systems healthy
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {workload.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-slate-100 p-4 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.12)]"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">{card.title}</p>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${card.accent}`}>
                      {card.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{card.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Latest announcements</h2>
                <p className="text-sm text-slate-600">Recent communications to keep everyone aligned.</p>
              </div>
              <a
                href="/dashboard/admin/announcements"
                className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
              >
                View all
              </a>
            </div>
            <div className="mt-4 space-y-4">
              {announcements.map((note) => (
                <div
                  key={note.title}
                  className="rounded-xl border border-slate-100 px-4 py-3 transition hover:border-indigo-100 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{note.title}</p>
                      <p className="text-xs text-slate-600">{note.detail}</p>
                    </div>
                    <span className="flex h-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                      <BellRing className="h-4 w-4" />
                      {note.category}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{note.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
              <span className="text-xs font-semibold text-indigo-600">2 min setup</span>
            </div>
            <div className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-start justify-between rounded-xl border border-slate-100 px-4 py-3 transition hover:-translate-y-[1px] hover:border-indigo-200 hover:shadow-sm"
                >
                 <div className="flex items-start gap-3">
                    {link.icon && (
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
                        <link.icon className="h-4 w-4" />
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                        {link.label}
                      </p>
                      <p className="text-xs text-slate-600">{link.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-indigo-500 group-hover:text-indigo-600">→</span>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">System notices</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                Backups completed at 3:00 AM. Restore point verified.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                Security review due for 2 instructor accounts without MFA.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                Enrollment window opens Monday. Confirm capacity settings.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}