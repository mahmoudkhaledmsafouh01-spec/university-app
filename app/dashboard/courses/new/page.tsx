import { redirect } from "next/navigation";

export default function CourseCreateRedirect() {
  redirect("/dashboard/admin/courses/new");
}