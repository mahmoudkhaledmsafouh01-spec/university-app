"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import toast from "react-hot-toast";

const schema = z.object({
  title: z.string().min(2, "Title too short"),
  code: z.string().min(2, "Code too short"),
  credits: z.number().min(1, "Credits must be > 0"),
});

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();

        setTitle(data.title);
        setCode(data.code);
        setCredits(data.credits);
      } catch (err) {
        toast.error("Error loading course");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validazione
    const parsed = schema.safeParse({
      title,
      code,
      credits,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, code, credits }),
      });

      if (!res.ok) throw new Error();

      toast.success("Course updated!");
      router.push("/dashboard/courses");
    } catch {
      toast.error("Update failed");
    }
  }

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading course...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Course</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-gray-600">Title</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Code</label>
          <input
            className="w-full border p-2 rounded mt-1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Credits</label>
          <input
            type="number"
            className="w-full border p-2 rounded mt-1"
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
