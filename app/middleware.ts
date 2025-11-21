import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      // Utente loggato?
      return !!token;
    },
  },
});

// Pagine protette
export const config = {
  matcher: ["/dashboard/:path*"],
};
