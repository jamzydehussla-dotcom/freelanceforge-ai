"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name: string | null;
  plan: string | null;
  role: string | null;
  account_status: string | null;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileDone, setProfileDone] = useState(false);
  const [cvCount, setCvCount] = useState(0);
  const [refineCount, setRefineCount] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        if (active) setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, plan, role, account_status, headline, bio")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      const { count: cvTotal } = await supabase.from("cvs").select("id", { count: "exact", head: true }).eq("user_id", user.id);
      const { count: refTotal } = await supabase.from("ai_usage").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("feature", "refine");
      if (active) { setCvCount(cvTotal ?? 0); setRefineCount(refTotal ?? 0); }

      if (!error && data) {
        setProfile(data as Profile);
        const p = data as Profile & { headline?: string | null; bio?: string | null };
        setProfileDone(!!(p.headline && p.bio));
      } else {
        setProfile({
          full_name: (user.user_metadata?.full_name as string) || null,
          plan: null,
          role: null,
          account_status: null,
        });
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  const firstName = (profile?.full_name || "").split(" ")[0] || "";
  const planLabel = profile?.plan
    ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)
    : "—";

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "…" : planLabel} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Command Center</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-violet-200/60">{loading ? "" : firstName ? `Welcome, ${firstName}` : "Welcome"}</span>
            {!loading && profile?.plan && (
              <span className="text-[10px] tracking-[0.15em] uppercase text-cyan-300 border border-cyan-400/30 rounded px-2 py-1">{planLabel}</span>
            )}
          </div>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8 space-y-8 max-w-6xl w-full">
          <section>
            <p className="text-sm text-violet-200/60 max-w-2xl">Your workspace is ready. Nothing here is invented — this is what Forge actually knows so far.</p>
          </section>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Profile", value: profileDone ? "Set up" : "Not set up" },
              { label: "CVs", value: cvCount + (cvCount === 1 ? " saved" : " saved") },
              { label: "Refinements", value: refineCount + " run" },
              { label: "Alerts", value: "0 unread" },
            ].map((card) => (
              <div key={card.label} className="rounded-xl border border-violet-500/20 bg-[#170a34]/70 backdrop-blur-sm p-5">
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-2">{card.label}</p>
                <p className="text-lg font-medium text-white/85">{card.value}</p>
              </div>
            ))}
          </section>

          <section className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.35), rgba(139,92,246,0.25) 50%, rgba(236,72,153,0.35))" }}>
            <div className="rounded-2xl bg-[#170a34]/90 backdrop-blur-xl p-7">
              <h2 className="text-base font-semibold mb-1.5">Provide the inputs. FORGE does the rest.</h2>
              <p className="text-sm text-violet-200/55 mb-6 max-w-xl">FORGE works from what you give it. Some outputs are live now - others unlock as the platform is built.</p>
              <ul className="space-y-3">
                {[{ text: "FORGE learns your professional profile", ready: true }, { text: "FORGE analyses your CV against a target", ready: true }, { text: "FORGE surfaces matches worth your time", ready: false }].map((step, i) => (
                  <li key={step.text} className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-violet-500/20 bg-[#12062a]/60">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-cyan-300/70 font-mono">0{i + 1}</span>
                      <span className="text-sm text-white/85">{step.text}</span>
                    </div>
                    {step.ready ? (<span className="text-[9px] tracking-wider uppercase text-cyan-300 border border-cyan-400/30 rounded px-1.5 py-0.5">Open</span>) : (<span className="text-[9px] tracking-wider uppercase text-violet-300/45 border border-violet-500/25 rounded px-1.5 py-0.5">Coming Soon</span>)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-4">Freelance Forge AI — by FORGE</p>
        </main>
      </div>
    </div>
  );
}
