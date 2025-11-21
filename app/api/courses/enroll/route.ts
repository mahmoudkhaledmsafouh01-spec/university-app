import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { studentId, courseId } = await req.json();

  const enroll = await prisma.enrollment.create({
    data: {
      studentId: Number(studentId),
      courseId: Number(courseId),
    },
  });

  return NextResponse.json(enroll);
}
