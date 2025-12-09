import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const normalizedEmail = email?.toString().trim().toLowerCase();
    const normalizedPassword = password?.toString();

    if (!normalizedEmail || !normalizedPassword)
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user)
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });

    const valid = await bcrypt.compare(normalizedPassword, user.password);

    if (!valid)
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
