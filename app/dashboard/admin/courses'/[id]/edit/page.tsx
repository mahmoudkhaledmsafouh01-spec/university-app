import { prisma } from "@/lib/prisma";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const id = Number(params.id);

  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) return <div>Not found</div>;

  return (
    <div>
      <h1>Edit Course</h1>
      <p>ID: {course.id}</p>
    </div>
  );
}
