import { redirect } from "next/navigation";

export default function UserCreateRedirect() {
  redirect("/dashboard/admin/users/new");
}