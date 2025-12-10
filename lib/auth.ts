import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { normalizeRole } from "./roles";

const defaultNextAuthUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
const urlHost = new URL(defaultNextAuthUrl).hostname;
const usingHttps = defaultNextAuthUrl.startsWith("https://");
const cookieDomain = urlHost === "localhost" ? undefined : urlHost;

const authSecret = process.env.NEXTAUTH_SECRET;

if (!authSecret) {
  console.warn(
    "NEXTAUTH_SECRET is not set. Falling back to an insecure development secret; set NEXTAUTH_SECRET in your environment for proper cookie encryption."
  );
}

if (!process.env.NEXTAUTH_URL) {
  console.warn(
    `NEXTAUTH_URL is not set. Defaulting to ${defaultNextAuthUrl} so NextAuth can issue cookies correctly.`
  );
}

export const authOptions: AuthOptions = {
  secret: authSecret ?? "development-nextauth-secret",
  useSecureCookies: usingHttps,
  cookies: {
    sessionToken: {
      name: usingHttps
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: usingHttps,
        domain: cookieDomain,
      },
    },
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const email = credentials?.email?.trim().toLowerCase();
          const password = credentials?.password;

          if (!email || !password) {
            return null;
          }

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            return null;
          }

          const role = normalizeRole(user.role);

          return {
            id: String(user.id),
            email: user.email,
            role,
            name: user.name,
          };
        } catch (err) {
          console.error("LOGIN ERROR:", err);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = normalizeRole(token.role as string);
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

