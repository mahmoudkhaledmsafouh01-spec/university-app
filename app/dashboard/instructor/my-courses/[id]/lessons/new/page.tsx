"use client";

import React from "react";

interface NewLessonParams {
  id: string;
}

export default function NewLessonPage({
  params,
}: {
  params: NewLessonParams;
}) {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    await fetch("/api/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: (form.elements.namedItem("title") as HTMLInputElement).value,
        content: (form.elements.namedItem("content") as HTMLTextAreaElement)
          .value,
        courseId: params.id,
      }),
    });

    window.location.href = `/dashboard/instructor/my-courses/${params.id}`;
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 shadow rounded w-96"
    >
      <h1 className="text-2xl font-bold mb-4">New Lesson</h1>

      <input
        name="title"
        placeholder="Lesson title"
        className="input mb-3"
      />

      <textarea
        name="content"
        placeholder="Content"
        className="input mb-3"
      ></textarea>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
