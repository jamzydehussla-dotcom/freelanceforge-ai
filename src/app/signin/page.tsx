"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  const inputClass =
    "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14082a] text-white flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img src="/forge-logo.svg" alt="FORGE" width={56} height={56} className="drop-shadow-[0_0_22px_rgba(139,92,246,0.75)]" />
          </div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Welcome back.</h1>
          <p className="text-sm text-violet-200/60 mt-2.5">Continue where you left off.</p>
        </div>

        <div className="rounded-2xl p-[1px] shadow-[0_0_50px_-15px_rgba(139,92,246,0.55)]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(139,92,246,0.35) 50%, rgba(236,72,153,0.55))" }}>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-[#1a0d3a]/85 backdrop-blur-xl p-7">
            <div>
              <label className="block text-xs text-violet-200/70 mb-1.5">Email</label>
              <input name="email" type="email" placeholder="you@example.com" className={inputClass} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs text-violet-200/70">Password</label>
                <Link href="/forgot-password" className="text-xs text-cyan-400/80 hover:text-cyan-300 transition">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className={inputClass + " pr-16"} />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cyan-400/80 hover:text-cyan-300">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2 shadow-[0_0_15px_-4px_rgba(239,68,68,0.7)]">{error}</p>
            )}

            <button type="submit" disabled={loading} className="w-full rounded-lg py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)" }}>
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="border-t border-violet-500/15 pt-4 text-center text-xs text-violet-200/60">
              New to Forge?{" "}
              <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition" style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}>Create an account</Link>
            </div>
          </form>
        </div>

        <p className="text-center text-[11px] text-violet-200/30 mt-6 tracking-wide">Freelance Forge AI — by FORGE</p>
      </div>
    </main>
  );
}
