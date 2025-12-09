import { Role } from "@prisma/client";

export type UserRole = Role;

export function normalizeRole(role?: unknown): UserRole {
  const normalized =
    typeof role === "string" ? role.toString().trim().toUpperCase() : undefined;

  if (
    normalized === Role.ADMIN ||
    normalized === Role.INSTRUCTOR ||
    normalized === Role.STUDENT
  ) {
    return normalized;
  }

  return Role.STUDENT;
}