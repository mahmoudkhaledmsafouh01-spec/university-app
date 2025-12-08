import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { lessons: true, enrollments: true },
  });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const { title, code, credits, description } = await req.json();

   if (!title || !code || credits === undefined) {
    return NextResponse.json(
      { error: "Title, code, and credits are required" },
      { status: 400 }
    );
  }

  const course = await prisma.course.create({
    data: {
      title,
      code,
      credits: Number(credits),
            description,
          },
  });

  return NextResponse.json(course, { status: 201 });
}
