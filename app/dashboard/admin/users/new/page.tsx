"use client";

import { useState } from "react";

export default function NewUserPage() {
  const [loading, setLoading] = useState(false);

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    await fetch("/api/admin/users/new", {
      method: "POST",
      body: form,
    });

    window.location.href = "/dashboard/admin/users";
  }

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create User</h1>

      <input name="name" placeholder="Name" className="border p-2 w-full" />
      <input name="email" placeholder="Email" className="border p-2 w-full" />
      <input
        name="password"
        placeholder="Password"
        className="border p-2 w-full"
      />

      <select name="role" className="border p-2 w-full">
        <option value="ADMIN">ADMIN</option>
        <option value="INSTRUCTOR">INSTRUCTOR</option>
        <option value="STUDENT">STUDENT</option>
      </select>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
