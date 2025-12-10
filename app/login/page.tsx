"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const error = params.get("error");
  const registered = params.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(
    error ? "Invalid credentials" : null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setFormError("Invalid credentials");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("LOGIN FAILED", err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-slate-600">
          Sign in to access your university dashboard.
        </p>
      </div>

      {registered && (
        <p className="text-sm font-medium text-green-700">
          Account created successfully. You can sign in now.
        </p>
      )}

      {formError && (
        <p className="text-sm font-medium text-red-600">{formError}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none"
        >
          {submitting ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-600">
        Need an account?{" "}
        <a className="font-semibold text-slate-900 underline" href="/register">
          Sign up
        </a>
        .
      </p>
    </div>
  );
}
