"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import ForgeAI from "@/components/ForgeAI";
import { supabase } from "@/lib/supabase";

type Memory = {
  minimumRate?: string;
  currency?: string;
  workBoundaries?: string;
  preferredTone?: string;
  timezone?: string;
  industries?: string;
  languages?: string;
  workAuthorization?: string;
  availability?: string;
  preferredWorkType?: string;
};

export default function MemoryPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [planLabel, setPlanLabel] = useState("Free");
  const [minimumRate, setMinimumRate] = useState("");
  const [currency, setCurrency] = useState("");
  const [workBoundaries, setWorkBoundaries] = useState("");
  const [preferredTone, setPreferredTone] = useState("");
  const [timezone, setTimezone] = useState("");
  const [industries, setIndustries] = useState("");
  const [languages, setLanguages] = useState("");
  const [workAuthorization, setWorkAuthorization] = useState("");
  const [availability, setAvailability] = useState("");
  const [preferredWorkType, setPreferredWorkType] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) { if (active) setLoading(false); return; }
      const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
      if (active && profile?.plan) setPlanLabel(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));
      const { data } = await supabase.from("user_memory").select("memory").eq("user_id", user.id).maybeSingle();
      if (!active) return;
      if (data?.memory) {
        const m = data.memory as Memory;
        setMinimumRate(m.minimumRate || "");
        setCurrency(m.currency || "");
        setWorkBoundaries(m.workBoundaries || "");
        setPreferredTone(m.preferredTone || "");
        setTimezone(m.timezone || "");
        setIndustries(m.industries || "");
        setLanguages(m.languages || "");
        setWorkAuthorization(m.workAuthorization || "");
        setAvailability(m.availability || "");
        setPreferredWorkType(m.preferredWorkType || "");
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  async function handleSave() {
    setSaving(true);
    setError("");
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setSaving(false); return; }
    const { error: upErr } = await supabase.from("user_memory").upsert({
      user_id: user.id,
      memory: { minimumRate, currency, workBoundaries, preferredTone, timezone, industries, languages, workAuthorization, availability, preferredWorkType },
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    setSaving(false);
    if (upErr) { setError(upErr.message); return; }
    setSavedAt(Date.now());
  }

  async function handleClear() {
    if (!confirm("Clear all FORGE memory? This removes everything FORGE has been told to remember.")) return;
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setSaving(false); return; }
    await supabase.from("user_memory").delete().eq("user_id", user.id);
    setMinimumRate(""); setCurrency(""); setWorkBoundaries(""); setPreferredTone(""); setTimezone("");
    setIndustries(""); setLanguages(""); setWorkAuthorization(""); setAvailability(""); setPreferredWorkType("");
    setSaving(false);
    setSavedAt(Date.now());
  }

  const inputClass = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";
  const labelClass = "block text-[11px] tracking-wide text-violet-200/70 mb-1.5";

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : planLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">FORGE Memory</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">What FORGE remembers about you</span>
        </header>
        <main className="flex-1 px-6 md:px-10 py-10 max-w-4xl w-full">
          {loading ? (
            <p className="text-sm text-violet-200/50">Loading...</p>
          ) : (
            <div className="space-y-10">
              <section className="rounded-2xl border border-violet-500/25 bg-[#170a34]/70 backdrop-blur-sm p-7">
                <div className="mb-5"><ForgeAI size={24} label="FORGE MEMORY" /></div>
                <p className="text-sm text-violet-200/70 leading-relaxed max-w-2xl">
                  FORGE remembers facts about how you work. Once you set them here, every feature respects them automatically - no need to repeat yourself. FORGE never invents memory; it only uses what you write.
                </p>
              </section>

              <section className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold mb-1">Practical preferences</h2>
                  <p className="text-xs text-violet-200/50">How you want FORGE to represent you and what you accept.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Minimum rate</label>
                    <input value={minimumRate} onChange={(e) => setMinimumRate(e.target.value)} placeholder="e.g. 50" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Currency</label>
                    <input value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="e.g. USD, GBP, NGN" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred tone</label>
                    <input value={preferredTone} onChange={(e) => setPreferredTone(e.target.value)} placeholder="e.g. Technical and direct" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Timezone</label>
                    <input value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="e.g. GMT+1" className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Work boundaries</label>
                    <input value={workBoundaries} onChange={(e) => setWorkBoundaries(e.target.value)} placeholder="e.g. No weekends, no on-call, no unpaid discovery calls" className={inputClass} />
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold mb-1">Working context</h2>
                  <p className="text-xs text-violet-200/50">How FORGE understands where and how you can work.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Languages</label>
                    <input value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="e.g. English (native), French (fluent)" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Work authorization</label>
                    <input value={workAuthorization} onChange={(e) => setWorkAuthorization(e.target.value)} placeholder="e.g. EU citizen, US work permit, Remote only" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Availability</label>
                    <input value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="e.g. 30 hrs/week, evenings only" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred work type</label>
                    <input value={preferredWorkType} onChange={(e) => setPreferredWorkType(e.target.value)} placeholder="e.g. Long-term projects, short contracts" className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Industries</label>
                    <input value={industries} onChange={(e) => setIndustries(e.target.value)} placeholder="e.g. Fintech, SaaS, developer tools" className={inputClass} />
                  </div>
                </div>
              </section>

              {error && (
                <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">{error}</p>
              )}

              <div className="flex items-center justify-between gap-4 rounded-xl border border-violet-500/20 bg-[#12062a]/60 px-5 py-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleSave} disabled={saving} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{saving ? "Saving..." : "Save memory"}</button>
                  <button type="button" onClick={handleClear} disabled={saving} className="text-sm text-violet-100/70 hover:text-red-400 px-4 py-2.5 rounded-lg border border-violet-500/25 transition disabled:opacity-60">Clear all</button>
                </div>
                <span className="text-xs text-violet-200/55">{savedAt ? "Saved" : "Your memory is private to you."}</span>
              </div>

              <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-4">Freelance Forge AI - by FORGE</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
