import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { normalizeRole } from "./roles";

const authSecret = process.env.NEXTAUTH_SECRET;

if (!authSecret) {
  console.warn(
    "NEXTAUTH_SECRET is not set. Falling back to an insecure development secret; set NEXTAUTH_SECRET in your environment for proper cookie encryption."
  );
}

export const authOptions: AuthOptions = {
 secret: authSecret ?? "development-nextauth-secret",
 providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          return null;      
          }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          console.log("Invalid password");
          return null;
        }

        const role = normalizeRole(user.role?.toString());
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = normalizeRole(user.role?.toString());
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = normalizeRole(token.role?.toString());
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
