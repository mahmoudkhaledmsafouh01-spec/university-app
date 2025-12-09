import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeRole } from "@/lib/roles";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = data.name?.toString().trim();
    const email = data.email?.toString().trim().toLowerCase();
    const password = data.password?.toString();
    const role = data.role;

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
    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 409 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });  }
}
