"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SelectOption = {
  id: number;
  title?: string;
  name?: string;
};

export default function NewAnnouncementPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [coursesRes, usersRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/users"),
        ]);

        if (!coursesRes.ok || !usersRes.ok) {
          throw new Error("Failed to load form options");
        }

        const [coursesData, usersData] = await Promise.all([
          coursesRes.json(),
          usersRes.json(),
        ]);

        setCourses(coursesData);
        setUsers(usersData);
      } catch (err) {
        console.error(err);
        setError("Unable to load courses or users.");
      }
    }

    loadOptions();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;

    const data = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      courseId: Number((form.elements.namedItem("courseId") as HTMLSelectElement).value),
      authorId: Number((form.elements.namedItem("authorId") as HTMLSelectElement).value),
    };

    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Unable to create announcement.");
      setSubmitting(false);
      return;
    }

    router.push("/dashboard/admin/announcements");
  }

  return (
    <div>
      <form
        onSubmit={submit}
        className="space-y-4 border p-4 rounded bg-white shadow"
      >
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="border w-full p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Message</label>
          <textarea
            name="message"
            className="border w-full p-2 rounded"
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          <label className="font-medium">Course</label>
          <select name="courseId" className="border w-full p-2 rounded" required>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Author</label>
          <select name="authorId" className="border w-full p-2 rounded" required>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
