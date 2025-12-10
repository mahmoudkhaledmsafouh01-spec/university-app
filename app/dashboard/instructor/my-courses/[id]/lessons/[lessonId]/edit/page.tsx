interface EditLessonParams {
  id: string;
  lessonId: string;
}

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export default async function EditLessonPage({
  params,
}: {
  params: EditLessonParams;
}) {
  const res = await fetch(
    `${baseUrl}/api/lessons/${params.lessonId}`,
    { cache: "no-store" }
  );

  const lesson = await res.json();

  // Server action with correct typing
  async function updateLesson(formData: FormData) {
    "use server";

    await fetch(
      `${baseUrl}/api/lessons/${params.lessonId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: formData.get("title") as string,
          content: formData.get("content") as string,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return (
    <form action={updateLesson} className="bg-white p-6 shadow rounded w-96">
      <h1 className="text-2xl font-bold mb-4">Edit Lesson</h1>

      <input
        name="title"
        defaultValue={lesson.title}
        className="input mb-3"
      />

      <textarea
        name="content"
        defaultValue={lesson.content}
        className="input mb-3"
      ></textarea>

      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
        Update
      </button>
    </form>
  );
}
