import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const course = await prisma.course.findUnique({
    where: { id: Number(params.id) },
    include: {
      lessons: true,
      enrollments: {
        include: { student: true },
      },
    },
  });

  return NextResponse.json(course);
}

export async function PUT(req: Request, { params }: Params) {
  const data = await req.json();

  const course = await prisma.course.update({
    where: { id: Number(params.id) },
    data: {
      ...data,
      credits: Number(data.credits),
    },
  });

  return NextResponse.json(course);
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.course.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
