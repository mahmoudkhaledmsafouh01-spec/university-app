import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: Params) {
  const data = await req.json();

  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
