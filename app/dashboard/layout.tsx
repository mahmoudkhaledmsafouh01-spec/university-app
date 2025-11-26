export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100/80 pb-12">
      <div className="mx-auto max-w-6xl p-6">{children}</div>
    </div>
  );
}
