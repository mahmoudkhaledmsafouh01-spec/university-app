import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeRole } from "@/lib/roles";

// Use the Node.js runtime so native bcrypt works in the route handler
export const runtime = "nodejs";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const { name, email, role, password } = await req.json();

    const normalizedEmail = email?.toString().trim().toLowerCase();
    const normalizedName = name?.toString().trim();
    const normalizedRole = normalizeRole(role);

    if (!normalizedName || !normalizedEmail || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        role: normalizedRole,
        password: hashedPassword,
      },
    });

    const { password: _password, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A user with this email already exists." },
          { status: 409 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create user. Please try again." },
      { status: 500 }
    );
  }
}
