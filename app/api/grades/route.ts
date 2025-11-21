import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const grades = await prisma.grade.findMany({
    include: {
      student: true,
      course: true,
    },
  });

  return NextResponse.json(grades);
}

export async function POST(req: NextRequest) {
  try {
    const { userId, courseId, grade, type } = await req.json();

    if (!userId || !courseId || grade === undefined || !type) {
      return NextResponse.json(
        { error: "userId, courseId, grade e type sono obbligatori" },
        { status: 400 }
      );
    }

    const g = await prisma.grade.create({
      data: {
        userId: Number(userId),
        courseId: Number(courseId),
        grade: Number(grade),
        type,
      },
    });

    return NextResponse.json(g, { status: 201 });
  } catch (error) {
    console.error("[GRADES_POST]", error);
    return NextResponse.json(
      { error: "Errore nella creazione del voto" },
      { status: 500 }
    );
  }
}
