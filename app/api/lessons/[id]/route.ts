import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(lesson);
}

export async function PUT(req: Request, { params }: Params) {
  const { title, content } = await req.json();

  const lesson = await prisma.lesson.update({
    where: { id: Number(params.id) },
    data: { title, content },
  });

  return NextResponse.json(lesson);
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.lesson.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
