import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { BookOpen, CheckCircle, ClipboardList, Sparkles } from "lucide-react";

interface Course {
  id: number;
  title: string;
  code: string;
  instructorId: number;
}

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export default async function InstructorDashboard() {
  const session = await getServerSession(authOptions);
  console.log("[Instructor dashboard session]", session);

  const res = await fetch(`${baseUrl}/api/courses`, {    cache: "no-store",
  });

  const allCourses: Course[] = await res.json();
  const courses = allCourses.filter(
    (course) => course.instructorId === Number(session?.user?.id)
  );

  const quickStats = [
    {
      label: "Active courses",
      value: courses.length,
      detail: "Currently assigned",
      icon: BookOpen,
    },
    {
      label: "Reviewed syllabi",
      value: `${Math.max(courses.length - 1, 0)}/${courses.length || 1}`,
      detail: "Ready for students",
      icon: CheckCircle,
    },
    {
      label: "Pending tasks",
      value: courses.length ? "3" : "0",
      detail: "Grading & prep",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-100/80">
              Welcome back, {session?.user?.name ?? "Instructor"}
            </p>
            <div className="flex items-center gap-2 text-3xl font-semibold">
              <Sparkles className="h-7 w-7 text-amber-300" />
              <h1>Instructor workspace</h1>
            </div>
            <p className="max-w-2xl text-sm text-indigo-100/90">
              Track every course you lead, organize grading, and quickly jump
              into class-level actions without leaving the dashboard.
            </p>
          </div>
          <a
            href="/dashboard/instructor/my-courses"
            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-900 shadow transition hover:bg-indigo-50"
          >
            View all courses
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-3 shadow-sm ring-1 ring-white/15"
            >
              <div className="rounded-lg bg-white/20 p-2">
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-indigo-100/90">
                  {stat.label}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">{stat.value}</span>
                  <span className="text-xs text-emerald-200">{stat.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Your courses</h2>
            <p className="text-sm text-slate-600">
              Manage rosters, publish materials, and monitor class health at a glance.
            </p>
          </div>
          <a
            href="/dashboard/instructor/my-courses"
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
          >
            Go to course list →
          </a>
        </div>

        {courses.length === 0 ? (
          <div className="mt-6 rounded-xl bg-slate-50 p-6 text-slate-600">
            You do not have any assigned courses yet. Once courses are assigned,
            they will appear here with quick actions for grading, announcements, and attendance.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex h-full flex-col justify-between rounded-xl border border-slate-100 p-4 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.12)] transition hover:-translate-y-[1px] hover:border-indigo-100"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">
                      {course.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Stay on top of grading, attendance, and announcements from one place.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <a
                    href={`/dashboard/instructor/my-courses/${course.id}`}
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Manage course
                  </a>
                  <span className="text-xs text-emerald-600">Live</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
