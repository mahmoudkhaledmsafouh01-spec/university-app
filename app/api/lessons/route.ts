import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, content, courseId } = await req.json();

  const lesson = await prisma.lesson.create({
    data: {
      title,
      content,
      courseId: Number(courseId),
    },
  });

  return NextResponse.json(lesson);
}
