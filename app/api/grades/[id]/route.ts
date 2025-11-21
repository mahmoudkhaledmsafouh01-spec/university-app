import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_: NextRequest, { params }: Params) {
  const id = Number(params.id);

  const grade = await prisma.grade.findUnique({
    where: { id },
    include: { student: true, course: true },
  });

  if (!grade) {
    return NextResponse.json({ error: "Voto non trovato" }, { status: 404 });
  }

  return NextResponse.json(grade);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  const { grade, type } = await req.json();

  try {
    const updated = await prisma.grade.update({
      where: { id },
      data: {
        grade: grade !== undefined ? Number(grade) : undefined,
        type: type ?? undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[GRADES_PUT]", error);
    return NextResponse.json(
      { error: "Errore nell'aggiornamento del voto" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const id = Number(params.id);

  try {
    await prisma.grade.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[GRADES_DELETE]", error);
    return NextResponse.json(
      { error: "Errore nell'eliminazione del voto" },
      { status: 500 }
    );
  }
}
