import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("[Dashboard layout session]", session);

  return (
    <div className="min-h-screen bg-slate-100/80 pb-12">
      <div className="mx-auto max-w-6xl p-6">{children}</div>
    </div>
  );
}
