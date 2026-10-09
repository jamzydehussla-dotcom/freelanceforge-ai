"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");
    const terms = form.get("terms");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!terms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess("Account created. Please check your email to verify.");
  }

  const inputClass =
    "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14082a] text-white flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/forge-logo.svg"
              alt="FORGE"
              width={56}
              height={56}
              className="drop-shadow-[0_0_22px_rgba(139,92,246,0.75)]"
            />
          </div>
          <h1 className="text-3xl font-semibold text-white">Create your account</h1>
          <p className="text-sm text-violet-200/60 mt-2">
            Begin building your freelance future.
          </p>
        </div>

        <div
          className="rounded-2xl p-[1px] shadow-[0_0_50px_-15px_rgba(139,92,246,0.55)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(139,92,246,0.35) 50%, rgba(236,72,153,0.55))",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl bg-[#1a0d3a]/85 backdrop-blur-xl p-6"
          >
            <div>
              <label className="block text-xs text-violet-200/70 mb-1.5">Full name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-violet-200/70 mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-violet-200/70 mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className={inputClass + " pr-16"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cyan-400/80 hover:text-cyan-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-violet-200/70 mb-1.5">Confirm password</label>
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                className={inputClass}
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-violet-200/70">
              <input name="terms" type="checkbox" className="mt-0.5 accent-cyan-400" />
              <span>I agree to the <Link href="/terms" target="_blank" className="text-cyan-400 hover:text-cyan-300 transition">Terms</Link> and <Link href="/privacy" target="_blank" className="text-cyan-400 hover:text-cyan-300 transition">Privacy Policy</Link>.</span>
            </label>

            {error && (
              <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2 shadow-[0_0_15px_-4px_rgba(239,68,68,0.7)]">
                {error}
              </p>
            )}

            {success && (
              <p className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-3 py-2 shadow-[0_0_15px_-4px_rgba(16,185,129,0.7)]">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)",
                boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)",
              }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-xs text-violet-200/60 pt-2">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-cyan-400 hover:text-cyan-300 transition"
                style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}