"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminNewCoursePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      code: (form.elements.namedItem("code") as HTMLInputElement).value,
      credits: Number((form.elements.namedItem("credits") as HTMLInputElement).value),
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Unable to create course.");
      setSubmitting(false);
      return;
    }

    router.push("/dashboard/admin/courses");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create a course</h1>
        <p className="text-sm text-slate-600">
          Define the basics and publish when you are ready.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
      >
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-slate-800">Course title</span>
          <input
            name="title"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Advanced Chemistry"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-slate-800">Course code</span>
          <input
            name="code"
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="CHEM 410"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-slate-800">Credits</span>
          <input
            name="credits"
            type="number"
            min={0}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="3"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-semibold text-slate-800">Summary</span>
          <textarea
            name="description"
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Share what students will learn and any prerequisites."
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save course"}
          </button>
          <a
            href="/dashboard/admin/courses"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}