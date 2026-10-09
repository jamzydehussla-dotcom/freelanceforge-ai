"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      trimmed,
      { redirectTo: window.location.origin + "/auth/callback?next=/reset-password" }
    );
    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSuccess("Check your inbox. A reset link was sent to " + trimmed + ".");
  }

  const inputClass =
    "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14082a] text-white flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[130px]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <img src="/forge-logo.svg" alt="FORGE" width={56} height={56} className="drop-shadow-[0_0_22px_rgba(139,92,246,0.75)]" />
          </div>
          <p className="text-[11px] tracking-[0.3em] text-cyan-400/80 mb-4">PASSWORD RECOVERY</p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Reset your password.</h1>
          <p className="text-sm text-violet-200/60 mt-2.5">Enter your email and we will send a reset link.</p>
        </div>

        <div className="rounded-2xl p-[1px] shadow-[0_0_50px_-15px_rgba(139,92,246,0.55)]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(139,92,246,0.35) 50%, rgba(236,72,153,0.55))" }}>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-[#1a0d3a]/85 backdrop-blur-xl p-7">
            <div>
              <label className="block text-xs text-violet-200/70 mb-1.5">Email</label>
              <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
            </div>

            {error && (
              <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2 shadow-[0_0_15px_-4px_rgba(239,68,68,0.7)]">{error}</p>
            )}

            {success && (
              <p className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-3 py-2 shadow-[0_0_15px_-4px_rgba(16,185,129,0.7)]">{success}</p>
            )}

            <button type="submit" disabled={loading || !!success} className="w-full rounded-lg py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)" }}>
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <div className="border-t border-violet-500/15 pt-4 text-center text-xs text-violet-200/60">
              Remembered it?{" "}
              <Link href="/signin" className="text-cyan-400 hover:text-cyan-300 transition" style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}>Sign in</Link>
            </div>
          </form>
        </div>

        <p className="text-center text-[11px] text-violet-200/30 mt-6 tracking-wide">Freelance Forge AI — by FORGE</p>
      </div>
    </main>
  );
}
