import { redirect } from "next/navigation";

export default function DepartmentCreateRedirect() {
  redirect("/dashboard/admin/departments/new");
}