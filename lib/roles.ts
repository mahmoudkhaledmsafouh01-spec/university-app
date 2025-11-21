export type UserRole = "ADMIN" | "INSTRUCTOR" | "STUDENT";

export function normalizeRole(role?: string | null): UserRole {
  if (role === "ADMIN" || role === "INSTRUCTOR" || role === "STUDENT") {
    return role;
  }

  return "STUDENT";
}