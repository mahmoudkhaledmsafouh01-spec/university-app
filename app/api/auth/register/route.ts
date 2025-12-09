import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { normalizeRole } from "@/lib/roles";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, password, role } = data;

    if (!name || !email || !password)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing)
      return NextResponse.json({ error: "Email already taken" }, { status: 400 });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: passwordHash, role: normalizeRole(role) },
    });

    const { password: _password, ...safeUser } = newUser;
    return NextResponse.json(safeUser);  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
