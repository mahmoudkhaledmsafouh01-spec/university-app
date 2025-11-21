"use client";

import { useEffect, useState, FormEvent } from "react";

interface AssignGradePageProps {
  params: {
    id: string; // courseId
  };
}

interface Student {
  id: number;
  name: string;
}

export default function AssignGrade({ params }: AssignGradePageProps) {
  const [students, setStudents] = useState<Student[]>([]);

  // Load students enrolled in the course
  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((r) => r.json())
      .then((course) =>
        setStudents(
          course.enrollments.map((e: any) => ({
            id: e.student.id,
            name: e.student.name,
          }))
        )
      );
  }, [params.id]);

  // Submit handler
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const studentId = (form.elements.namedItem("studentId") as HTMLSelectElement)
      .value;

    const value = (form.elements.namedItem("value") as HTMLInputElement).value;

    await fetch("/api/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: Number(studentId),
        courseId: Number(params.id),
        value: Number(value),
      }),
    });

    window.location.href = `/dashboard/instructor/my-courses/${params.id}/grades`;
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 shadow rounded w-96">
      <h1 className="text-2xl font-bold mb-4">Assign Grade</h1>

      <label className="block mb-1 font-medium">Student</label>
      <select
        name="studentId"
        className="w-full border p-2 rounded mb-3"
        required
      >
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <label className="block mb-1 font-medium">Grade</label>
      <input
        type="number"
        name="value"
        placeholder="Grade"
        className="w-full border p-2 rounded mb-3"
        min={0}
        max={100}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit
      </button>
    </form>
  );
}
