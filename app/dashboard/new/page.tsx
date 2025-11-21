// app/dashboard/admin/users/new/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";

export default function NewUserPage() {
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement).value;

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    router.push("/dashboard/admin/users");
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
      <h1 className="text-xl font-semibold mb-4">New User</h1>

      <FormInput label="Name" name="name" required />
      <FormInput label="Email" name="email" type="email" required />
      <FormInput label="Password" name="password" type="password" required />

      <div className="mb-4">
        <label className="block font-medium mb-1">Role</label>
        <select name="role" className="border rounded px-3 py-2 w-full">
          <option value="ADMIN">ADMIN</option>
          <option value="INSTRUCTOR">INSTRUCTOR</option>
          <option value="STUDENT">STUDENT</option>
        </select>
      </div>

      <button className="btn-primary">Create</button>
    </form>
  );
}
