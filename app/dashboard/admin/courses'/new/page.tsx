// app/dashboard/admin/courses/new/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";

export default function NewCoursePage() {
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const code = (form.elements.namedItem("code") as HTMLInputElement).value;
    const credits = (form.elements.namedItem("credits") as HTMLInputElement).value;

    await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        code,
        credits: Number(credits),
      }),
    });

    router.push("/dashboard/admin/courses");
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
      <h1 className="text-xl font-semibold mb-4">New Course</h1>

      <FormInput label="Title" name="title" required />
      <FormInput label="Code" name="code" required />
      <FormInput label="Credits" name="credits" type="number" required />

      <button className="btn-primary">Create</button>
    </form>
  );
}