import { createClient } from "@/lib/supabase/middleware";
"use client";

import { FormEvent, useState } from "react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = "/dashboard";
}

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        {/* Forge Welcome */}
        <section className="relative hidden overflow-hidden border-r border-white/10 px-10 py-12 lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-16">
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-bold tracking-[0.35em] text-cyan-400">
              FORGE
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Freelance Forge AI
            </p>
          </div>

          <div className="relative max-w-lg">
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
              WELCOME BACK
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight xl:text-6xl">
              Your professional workspace is waiting.
            </h1>

            <p className="mt-7 text-base leading-8 text-slate-400">
              Continue from where you left off and keep your freelance
              career, opportunities and professional tools connected.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">
                  Your Workspace
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Your personal Forge environment stays connected to your
                  account.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white">
                  Your Progress
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Continue building from where you stopped.
                </p>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-slate-600">
            Freelance Forge AI
          </p>
        </section>

        {/* Sign In */}
        <section className="flex items-center px-6 py-10 sm:px-10 lg:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <p className="text-sm font-bold tracking-[0.35em] text-cyan-400">
                FORGE
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Freelance Forge AI
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-cyan-400">
                SIGN IN
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back to Forge.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Sign in to continue to your professional workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 transition hover:text-cyan-300"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 pt-1 text-sm text-slate-500">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded border-white/20 bg-white/[0.04]"
                />

                <span>Remember me</span>
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Sign In to Forge
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have a Forge account?{" "}
              <a
                href="/signup"
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Create one
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}