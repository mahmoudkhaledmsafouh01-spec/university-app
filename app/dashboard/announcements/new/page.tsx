import { redirect } from "next/navigation";

export default function AnnouncementCreateRedirect() {
  redirect("/dashboard/admin/announcements/new");
}