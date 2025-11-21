"use client";

import FormInput from "@/components/FormInput";
import { FormEvent } from "react";

export default function NewDepartmentPage() {
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    await fetch("/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        code: (form.elements.namedItem("code") as HTMLInputElement).value,
      }),
    });

    window.location.href = "/dashboard/admin/departments";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">New Department</h1>

      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <FormInput label="Name" name="name" />
        <FormInput label="Code" name="code" />

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
