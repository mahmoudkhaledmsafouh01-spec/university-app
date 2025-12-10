import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { normalizeRole } from "@/lib/roles";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log("[Dashboard root session]", session);
 
  if (!session?.user) return redirect("/login");

  const role = normalizeRole(session.user.role);

  if (role === "STUDENT") return redirect("/dashboard/student");
  if (role === "ADMIN") return redirect("/dashboard/admin");
  if (role === "INSTRUCTOR") return redirect("/dashboard/instructor");

  return <h1>No role found</h1>;
}
