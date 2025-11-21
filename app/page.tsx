
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8 max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-3xl font-bold">University System 🚀</h1>
      <p className="text-slate-600">
        Simple Next.js + Prisma + NextAuth CRUD app.
      </p>
      <Link
        href="/login"
        className="inline-block px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
      >
        Go to Login
      </Link>
    </main>
  );
}
