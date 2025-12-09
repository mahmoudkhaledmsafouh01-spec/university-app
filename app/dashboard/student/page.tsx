import React from "react";
import { redirect } from "next/navigation";
import { BookOpen, Bell, ClipboardList } from "lucide-react";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { normalizeRole } from "@/lib/roles";

export default async function StudentDashboard() {
  const user = await getCurrentUser();

  // Redirect if not logged in
  if (!user) {
    return redirect("/login");
  }

  // Normalize role before comparing
  const fixedRole = normalizeRole(user.role);

  // Redirect if logged user is NOT student
  if (fixedRole !== "STUDENT") {
    return redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white shadow-lg">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-100/80">
            Welcome
          </p>

          <h1 className="text-3xl font-semibold leading-tight">
            {user.name || "New student"}, your account is set up.
          </h1>

          <p className="max-w-2xl text-sm text-indigo-50/90">
            You&apos;re logged in as a student. Once you&apos;re enrolled in courses,
            you&apos;ll see them here along with announcements and grades.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <EmptyCard
          icon={BookOpen}
          title="Courses"
          message="No courses assigned yet. You&apos;ll see new courses after an admin or instructor enrolls you."
        />

        <EmptyCard
          icon={Bell}
          title="Announcements"
          message="Nothing to show. Course announcements will appear once you have enrollments."
        />

        <EmptyCard
          icon={ClipboardList}
          title="Grades"
          message="Grades will be listed here as soon as you start completing coursework."
        />
      </div>
    </div>
  );
}

function EmptyCard({
  icon: Icon,
  title,
  message,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  message: string;
}) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">For your eyes only</p>
        </div>
      </div>

      <p className="text-sm text-slate-600">{message}</p>
    </div>
  );
}
