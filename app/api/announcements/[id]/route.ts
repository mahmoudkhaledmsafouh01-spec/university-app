import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_: NextRequest, { params }: Params) {
  const id = Number(params.id);

  const ann = await prisma.announcement.findUnique({
    where: { id },
    include: { author: true, course: true },
  });

  if (!ann) {
    return NextResponse.json(
      { error: "Annuncio non trovato" },
      { status: 404 }
    );
  }

  return NextResponse.json(ann);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const id = Number(params.id);

  try {
    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ANNOUNCEMENTS_DELETE]", error);
    return NextResponse.json(
      { error: "Errore nell'eliminazione dell'annuncio" },
      { status: 500 }
    );
  }
}
