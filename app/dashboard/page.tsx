import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { normalizeRole } from "@/lib/roles";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  const role = normalizeRole(user.role);

  if (role === "STUDENT") return redirect("/dashboard/student");
  if (role === "ADMIN") return redirect("/dashboard/admin");
  if (role === "INSTRUCTOR") return redirect("/dashboard/instructor");

  return <h1>No role found</h1>;
}
