import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ArrowLeft, ClipboardCheck, GraduationCap, Users } from "lucide-react";

interface Params {
  id: string;
}

export default async function CourseDetailsPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/courses/${params.id}`,
    { cache: "no-store" }
  );

  const course = await res.json();

  if (Number(session?.user?.id) !== course.instructorId) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800 shadow">
        You are not allowed to view this course.
      </div>
    );
  }

  const enrollmentCount = course.enrollments?.length ?? 0;

  return (
     <div className="space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <GraduationCap className="h-6 w-6 text-amber-300" />
              <h1>
                {course.title} <span className="text-indigo-200">({course.code})</span>
              </h1>
            </div>
            <p className="text-sm text-indigo-100/90">
              Manage roster, grades, and communications for this class.
            </p>
          </div>
          <a
            href="/dashboard/instructor/my-courses"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </a>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-4 shadow-sm ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-indigo-100/80">Enrollment</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">{enrollmentCount}</span>
              <span className="text-xs text-emerald-200">Active</span>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 shadow-sm ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-indigo-100/80">Status</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">Live</span>
              <span className="text-xs text-amber-200">Visible to students</span>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 shadow-sm ring-1 ring-white/15">
            <p className="text-xs uppercase tracking-wide text-indigo-100/80">Next steps</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold">2</span>
              <span className="text-xs text-sky-200">Grading tasks</span>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Enrolled students</h2>
            <p className="text-sm text-slate-600">{enrollmentCount} students currently registered.</p>
          </div>
          <a
            href={`/dashboard/instructor/my-courses/${params.id}/grades`}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-500"
          >
            <ClipboardCheck className="h-4 w-4" /> View grades
          </a>
        </div>

        {enrollmentCount === 0 ? (
          <div className="mt-6 rounded-xl bg-slate-50 p-6 text-slate-600">
            No students are enrolled yet. When students join, their names and contact details will appear here.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-100 shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead className="bg-slate-50 text-left text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {course.enrollments.map((enrollment: any) => (
                  <tr key={enrollment.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-900">{enrollment.student.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{enrollment.student.email}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold text-emerald-600">
                      Enrolled
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}