"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="font-semibold text-lg">
        {data?.user?.name ? `Welcome, ${data.user.name}` : "Dashboard"}
      </h2>

      <div className="flex items-center gap-3 text-sm">
        {data?.user?.role && (
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
            {data.user.role}
          </span>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
