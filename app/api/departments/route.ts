import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(departments);
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "name è obbligatorio" },
        { status: 400 }
      );
    }

    const dept = await prisma.department.create({
      data: { name },
    });

    return NextResponse.json(dept, { status: 201 });
  } catch (error) {
    console.error("[DEPARTMENTS_POST]", error);
    return NextResponse.json(
      { error: "Errore nella creazione del dipartimento" },
      { status: 500 }
    );
  }
}
