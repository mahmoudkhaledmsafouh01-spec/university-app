"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Unable to create user. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/dashboard/admin/users");
  }

  return (
    <form onSubmit={submit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create User</h1>
      <input
        name="name"
        placeholder="Name"
        className="border p-2 w-full"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        required
      />
      <input
        name="password"
        placeholder="Password"
        className="border p-2 w-full"
      />

      <select name="role" className="border p-2 w-full" required>
        <option value="ADMIN">ADMIN</option>
        <option value="INSTRUCTOR">INSTRUCTOR</option>
        <option value="STUDENT">STUDENT</option>
      </select>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}