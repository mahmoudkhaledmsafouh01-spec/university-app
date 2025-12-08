"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const roles = [
  { value: "STUDENT", label: "Student" },
  { value: "INSTRUCTOR", label: "Instructor" },
  { value: "ADMIN", label: "Admin" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement).value;

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.error || "Unable to register.");
      return;
    }

    router.push("/login?registered=true");
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "2rem" }}>
      <h1>Create Account</h1>
      <p style={{ marginBottom: "1rem" }}>
        Sign up to access courses, announcements, and grades.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input name="name" type="text" placeholder="Full name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" minLength={6} required />
        <select name="role" defaultValue="STUDENT">
          {roles.map((roleOption) => (
            <option key={roleOption.value} value={roleOption.value}>
              {roleOption.label}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
}