"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = new FormData(event.currentTarget);

  const fullName = String(form.get("fullName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const confirmPassword = String(form.get("confirmPassword") || "");
  const termsAccepted = form.get("terms") === "on";

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Please complete all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!termsAccepted) {
    alert("Please accept the Terms and Privacy Policy.");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created. Please check your email to verify your account.");
}

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* Forge Identity */}
        <section className="relative hidden overflow-hidden border-r border-white/10 px-10 py-12 lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-16">
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-bold tracking-[0.35em] text-cyan-400">
              FORGE
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Freelance Forge AI
            </p>
          </div>

          <div className="relative max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
              YOUR PROFESSIONAL WORKSPACE
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight xl:text-6xl">
              Build your freelance career around your real potential.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">
              One workspace for your professional profile, opportunities,
              applications and AI-powered career tools.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  ✓
                </span>
                Your data stays connected to your account
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  ✓
                </span>
                Start with the Free plan
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  ✓
                </span>
                Upgrade when you need more
              </div>
            </div>
          </div>

          <p className="relative text-xs text-slate-600">
            Freelance Forge AI
          </p>
        </section>

        {/* Sign Up */}
        <section className="flex items-center px-6 py-10 sm:px-10 lg:px-16">
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
                CREATE YOUR ACCOUNT
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Start building your Forge workspace.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Create your account and keep your professional workspace
                connected to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full Name
                </label>

                  <input
  id="fullName"
  name="fullName"
  type="text"
  autoComplete="name"
  placeholder="Your full name"
  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06]"
/>
         <div>
            
            </div>
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
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 transition hover:text-cyan-300"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 pt-1 text-sm text-slate-500">
                <input
  type="checkbox"
  name="terms"
  className="mt-1 h-4 w-4 rounded border-white/20 bg-white/[0.04]"
/>

                <span className="leading-6">
                  I agree to the Terms and Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Create My Forge Account
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <a
                href="/signin"
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Sign in
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}