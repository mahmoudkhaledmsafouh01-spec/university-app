import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { name, email, role, password } = await req.json();

  const user = await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: password ? password : "",
    },
  });

  return NextResponse.json(user);
}
