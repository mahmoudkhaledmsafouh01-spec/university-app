"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
  const params = useSearchParams();
  const error = params.get("error");
  const registered = params.get("registered");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div>
      <h1>Login</h1>

      {registered && (
        <p style={{ color: "green" }}>
          Account created successfully. You can sign in now.
        </p>
      )}

      {error && <p style={{ color: "red" }}>Invalid credentials</p>}

      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

        <p style={{ marginTop: "1rem" }}>
        Need an account? <a href="/register">Sign up</a>.
      </p>
    </div>
  );
}
