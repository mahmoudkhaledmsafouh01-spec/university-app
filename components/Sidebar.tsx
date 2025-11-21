"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data, status } = useSession();
  const role = data?.user?.role;

  if (status === "loading") {
    return (
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
        <p>Loading...</p>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">University App</h2>

      <nav className="flex flex-col gap-3 text-sm">
        {role === "ADMIN" && (
          <>
            <Link href="/dashboard/admin">Admin Overview</Link>
            <Link href="/dashboard/admin/users">Users</Link>
            <Link href="/dashboard/admin/courses">Courses</Link>
            <Link href="/dashboard/admin/departments">Departments</Link>
            <Link href="/dashboard/admin/announcements">Announcements</Link>
          </>
        )}

        {role === "INSTRUCTOR" && (
          <>
            <Link href="/dashboard/instructor">Instructor Overview</Link>
            <Link href="/dashboard/instructor/my-courses">My Courses</Link>
            <Link href="/dashboard/instructor/announcements">Announcements</Link>
          </>
        )}

        {role === "STUDENT" && (
          <>
            <Link href="/dashboard/student">Student Overview</Link>
            <Link href="/dashboard/student/courses">My Courses</Link>
            <Link href="/dashboard/student/grades">My Grades</Link>
          </>
        )}
      </nav>
    </aside>
  );
}
