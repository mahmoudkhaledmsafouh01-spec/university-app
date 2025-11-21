import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_: NextRequest, { params }: Params) {
  const id = Number(params.id);

  const dept = await prisma.department.findUnique({
    where: { id },
    include: { courses: true },
  });

  if (!dept) {
    return NextResponse.json(
      { error: "Dipartimento non trovato" },
      { status: 404 }
    );
  }

  return NextResponse.json(dept);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  const { name } = await req.json();

  try {
    const updated = await prisma.department.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[DEPARTMENTS_PUT]", error);
    return NextResponse.json(
      { error: "Errore nell'aggiornamento del dipartimento" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const id = Number(params.id);

  try {
    await prisma.department.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DEPARTMENTS_DELETE]", error);
    return NextResponse.json(
      { error: "Errore nell'eliminazione del dipartimento" },
      { status: 500 }
    );
  }
}
