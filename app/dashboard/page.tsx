import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "STUDENT") redirect("/dashboard/student");
  if (user.role === "ADMIN") redirect("/dashboard/admin");
  if (user.role === "INSTRUCTOR") redirect("/dashboard/instructor");

  return <h1>No role found</h1>;
}
