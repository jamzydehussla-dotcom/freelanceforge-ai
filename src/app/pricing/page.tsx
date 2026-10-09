"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TIERS } from "@/lib/tiers";
import { supabase } from "@/lib/supabase";

const ORDER: (keyof typeof TIERS)[] = ["free", "elite", "pro", "legend"];

const FEATURE_LABELS: Record<string, string> = {
  diagnose: "CV diagnosis",
  extract: "Signal extraction",
  refine: "CV refinement",
  export: "PDF / DOCX export",
  opportunities: "Opportunities radar",
  alerts: "FORGE alerts",
  matching: "FORGE matching",
  analysis: "Opportunity analysis",
  proposals: "Proposal studio",
  tracker: "Application tracker",
  profileOptimizer: "Profile optimizer",
  careerStrategy: "Career strategy",
  skillsGap: "Skills gap analyzer",
  autopilot: "Opportunity autopilot",
  warRoom: "Opportunity war room",
};

const HIGHLIGHTS: Record<string, string> = {
  free: "A complete CV experience. Try the flagship.",
  elite: "For freelancers actively hunting opportunities.",
  pro: "The full intelligence suite for winning work.",
  legend: "Automation and depth for serious professionals.",
};

export default function PricingPage() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (active) setSignedIn(!!data.user);
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0524] text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-[130px]" />

      <header className="relative z-10 border-b border-violet-500/10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <span className="text-sm font-semibold tracking-[0.2em] text-cyan-300" style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}>FORGE</span>
          </Link>
          {signedIn ? (
            <Link href="/dashboard" className="text-sm font-semibold text-black px-4 py-1.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>Go to dashboard</Link>
          ) : (
            <nav className="flex items-center gap-5">
              <Link href="/signin" className="text-sm text-violet-100/70 hover:text-white transition">Sign in</Link>
              <Link href="/signup" className="text-sm font-semibold text-black px-4 py-1.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>Get started</Link>
            </nav>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] tracking-[0.35em] text-cyan-400/85 mb-4">PLANS</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight" style={{ textShadow: "0 0 40px rgba(139,92,246,0.35)" }}>
            Choose how far FORGE goes with you.
          </h1>
          <p className="mt-5 text-sm text-violet-200/60 leading-relaxed">
            Start free. Upgrade when you need more. Every tier keeps FORGE doing the work — you provide, FORGE delivers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ORDER.map((key) => {
            const tier = TIERS[key];
            const isFree = key === "free";
            const isPaid = !isFree;
            const featured = key === "pro";
            return (
              <div key={key} className={"relative rounded-2xl p-[1px] " + (featured ? "" : "")} style={{ background: featured ? "linear-gradient(135deg, rgba(34,211,238,0.7), rgba(139,92,246,0.5) 50%, rgba(236,72,153,0.7))" : "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(139,92,246,0.15) 50%, rgba(236,72,153,0.2))" }}>
                <div className="rounded-2xl bg-[#170a34]/95 backdrop-blur-xl p-6 h-full flex flex-col">
                  {featured && (
                    <span className="self-start text-[9px] tracking-[0.18em] uppercase text-cyan-300 border border-cyan-400/40 rounded-full px-2.5 py-1 mb-4">Most chosen</span>
                  )}
                  <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300/60 mb-2">{tier.label}</p>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-3xl font-semibold text-white">${tier.priceUsd}</span>
                    {isPaid && <span className="text-xs text-violet-200/45">/ month</span>}
                  </div>
                  <p className="text-xs text-violet-200/55 leading-relaxed mb-6">{HIGHLIGHTS[key]}</p>
                  <ul className="space-y-2 mb-7 flex-1">
                    {tier.features.slice(0, 8).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/80">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400/70 shrink-0" />
                        <span>{FEATURE_LABELS[f] || f}</span>
                      </li>
                    ))}
                    {tier.features.length > 8 && (
                      <li className="text-xs text-violet-200/50 pl-3">+ {tier.features.length - 8} more</li>
                    )}
                  </ul>
                  {isFree ? (
                    <Link href={signedIn ? "/dashboard" : "/signup"} className="block text-center text-sm font-semibold text-black py-2.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{signedIn ? "Go to dashboard" : "Get started"}</Link>
                  ) : (
                    <button type="button" disabled className="text-sm font-medium text-violet-100/60 py-2.5 rounded-lg border border-violet-500/25 opacity-70 cursor-not-allowed">Coming soon</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-violet-200/40 mt-12 max-w-2xl mx-auto leading-relaxed">
          Paid plans are being finalised. They will unlock as soon as billing is connected. Free is available today — genuinely, not as a teaser.
        </p>
      </main>

      <footer className="relative z-10 border-t border-violet-500/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-[11px] text-violet-200/40">
          <div className="flex items-center gap-2">
            <img src="/forge-logo.svg" alt="" width={14} height={14} className="opacity-70" />
            <span>Freelance Forge AI · part of the FORGE ecosystem</span>
          </div>
          <span>Built by the founder</span>
        </div>
      </footer>
    </div>
  );
}
