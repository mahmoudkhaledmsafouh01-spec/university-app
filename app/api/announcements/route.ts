import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true, course: true },
  });

  return NextResponse.json(announcements);
}

export async function POST(req: NextRequest) {
  try {
    const { title, message, courseId, authorId } = await req.json();

    if (!title || !message || !courseId || !authorId) {
      return NextResponse.json(
        { error: "title, message, courseId, authorId obbligatori" },
        { status: 400 }
      );
    }

    const ann = await prisma.announcement.create({
      data: {
        title,
        message,
        courseId: Number(courseId),
        authorId: Number(authorId),
      },
    });

    return NextResponse.json(ann, { status: 201 });
  } catch (error) {
    console.error("[ANNOUNCEMENTS_POST]", error);
    return NextResponse.json(
      { error: "Errore nella creazione dell'annuncio" },
      { status: 500 }
    );
  }
}
