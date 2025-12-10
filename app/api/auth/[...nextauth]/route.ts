import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Explicitly use the Node.js runtime so native bcrypt works inside authorize()

export const runtime = "nodejs";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
