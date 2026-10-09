"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";
import { TIERS, getTier, type Feature } from "@/lib/tiers";
import { getUsageThisMonth } from "@/lib/gating";

const FEATURE_LABELS: Record<string, string> = {
  diagnose: "CV diagnoses",
  extract: "Signal extractions",
  refine: "CV refinements",
  export: "CV exports",
  alerts: "Alerts received",
  proposals: "Proposals generated",
  matching: "Matches evaluated",
};

const GATED: Feature[] = ["diagnose", "extract", "refine", "export", "alerts", "proposals", "matching"];

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<string>("free");
  const [role, setRole] = useState<string>("user");
  const [periodEnd, setPeriodEnd] = useState<string | null>(null);
  const [usage, setUsage] = useState<Record<string, number>>({});

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) { if (active) setLoading(false); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, role, subscription_period_end")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;
      const p = profile?.plan || "free";
      const r = profile?.role || "user";
      setPlan(p);
      setRole(r);
      setPeriodEnd(profile?.subscription_period_end || null);

      const tierKey = getTier(p, r);
      const tier = TIERS[tierKey];
      const results: Record<string, number> = {};
      for (const f of GATED) {
        if (!tier.features.includes(f)) continue;
        if (tier.limits[f] === undefined) continue;
        results[f] = await getUsageThisMonth(supabase, user.id, f);
      }
      if (active) {
        setUsage(results);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const tierKey = getTier(plan, role);
  const tier = TIERS[tierKey];
  const isOwner = tierKey === "owner";
  const planLabel = tier.label;

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : planLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Billing</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">Your plan and usage</span>
        </header>
        <main className="flex-1 px-6 md:px-10 py-10 max-w-4xl w-full">

          {loading ? (
            <p className="text-sm text-violet-200/50">Loading your account…</p>
          ) : (
            <div className="space-y-8">
              <section className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.45))" }}>
                <div className="rounded-2xl bg-[#170a34]/90 backdrop-blur-xl p-7">
                  <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
                    <div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-violet-300/55 mb-2">Current plan</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-semibold text-white">{planLabel}</span>
                        {isOwner && (<span className="text-sm text-cyan-300">Unrestricted access, no billing</span>)}
                        {!isOwner && tier.priceUsd === 0 && (<span className="text-sm text-violet-200/55">No charge</span>)}
                        {!isOwner && tier.priceUsd > 0 && (<span className="text-sm text-violet-200/55">{"$" + tier.priceUsd + " per month"}</span>)}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] tracking-[0.22em] uppercase text-violet-300/55 mb-2">Renewal</p>
                      <p className="text-sm text-white/80">
                        {isOwner ? "Not applicable" : periodEnd ? new Date(periodEnd).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "No active billing"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-violet-200/55 leading-relaxed max-w-xl mb-6">
                    {isOwner ? "You hold unrestricted access to every FORGE capability." : tierKey === "free" ? "Free provides the complete CV experience at no cost - every stage of the flagship, uncompromised." : "Your subscription grants full access to the " + tier.label + " tier."}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link href="/pricing" className="text-sm font-semibold text-black px-5 py-2.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>Compare plans</Link>
                    <button type="button" disabled className="text-sm text-violet-100/60 px-5 py-2.5 rounded-lg border border-violet-500/25 cursor-not-allowed">Manage subscription</button>
                    <span className="text-[11px] text-violet-200/40">Billing portal will open once payments are connected.</span>
                  </div>
                </div>
              </section>

              <section className="space-y-5">
                <div>
                  <h2 className="text-base font-semibold mb-1">Usage this month</h2>
                  <p className="text-xs text-violet-200/50">Counts reset on the first of each month.</p>
                </div>
                {isOwner ? (
                  <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 px-5 py-4">
                    <p className="text-sm text-white/75">Owner accounts are not subject to usage limits.</p>
                  </div>
                ) : Object.keys(usage).length === 0 ? (
                  <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 px-5 py-4">
                    <p className="text-sm text-white/70">No usage recorded this month.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(usage).map(([feature, used]) => {
                      const limit = tier.limits[feature as Feature] ?? 0;
                      const pct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
                      const nearLimit = limit > 0 && used >= limit;
                      return (
                        <div key={feature} className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 p-5">
                          <div className="flex items-center justify-between gap-4 mb-3">
                            <span className="text-sm text-white/85">{FEATURE_LABELS[feature] || feature}</span>
                            <span className={"text-xs " + (nearLimit ? "text-amber-300" : "text-violet-200/60")}>{used} of {limit}</span>
                          </div>
                          <div className="h-1 rounded-full bg-violet-500/15 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: pct + "%" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <p className="text-xs text-violet-200/45 leading-relaxed border-t border-violet-500/15 pt-6">
                Plan changes and payment processing are being finalised. Your current plan remains active at no additional cost until billing is connected.
              </p>

              <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-4">Freelance Forge AI - by FORGE</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
