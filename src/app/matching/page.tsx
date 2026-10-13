"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ForgeAI from "@/components/ForgeAI";
import { supabase } from "@/lib/supabase";

type Opportunity = {
  id: string;
  role: string | null;
  company: string | null;
  category: string | null;
  work_type: string | null;
  experience_level: string | null;
  key_requirements: string | null;
  description: string | null;
};

type Factor = { score: number; weight: number; reasoning: string };

type MatchResult = {
  overallScore: number;
  verdict: string;
  confidence: number;
  reasoning: string;
  factors: {
    skills: Factor;
    experience: Factor;
    seniority: Factor;
    industry: Factor;
    workType: Factor;
    positioning: Factor;
  };
  strengths: string[];
  gaps: string[];
  recommendations: { priority: string; action: string }[];
};

type HistoryRow = {
  id: string;
  role: string | null;
  company: string | null;
  overall_score: number | null;
  verdict: string | null;
  created_at: string;
};

const FACTOR_LABELS: Record<string, string> = {
  skills: "Skills",
  experience: "Experience",
  seniority: "Seniority",
  industry: "Industry",
  workType: "Work type",
  positioning: "Positioning",
};

const VERDICT_STYLE: Record<string, { label: string; chip: string; bar: string }> = {
  strong: { label: "Strong match", chip: "text-emerald-300 border-emerald-400/40 bg-emerald-400/5", bar: "from-emerald-400 to-cyan-400" },
  good: { label: "Good match", chip: "text-cyan-300 border-cyan-400/40 bg-cyan-400/5", bar: "from-cyan-400 to-violet-500" },
  moderate: { label: "Moderate match", chip: "text-amber-300 border-amber-400/40 bg-amber-400/5", bar: "from-amber-400 to-violet-500" },
  weak: { label: "Weak match", chip: "text-red-300 border-red-400/40 bg-red-400/5", bar: "from-red-400 to-violet-500" },
};

const PRIORITY_STYLE: Record<string, string> = {
  high: "text-red-300 border-red-400/40 bg-red-400/5",
  medium: "text-amber-300 border-amber-400/40 bg-amber-400/5",
  low: "text-violet-200/70 border-violet-500/25 bg-violet-500/5",
};

export default function MatchingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [planLabel, setPlanLabel] = useState("Free");

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOppId, setSelectedOppId] = useState("");
  const [cvText, setCvText] = useState("");
  const [manualRole, setManualRole] = useState("");
  const [manualCompany, setManualCompany] = useState("");
  const [manualDescription, setManualDescription] = useState("");
  const [manualRequirements, setManualRequirements] = useState("");
  const [useManual, setUseManual] = useState(false);

  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState("");

  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [historyFilter, setHistoryFilter] = useState("");
  const [historySearch, setHistorySearch] = useState("");

  async function load() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setLoading(false); return; }

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
    if (profile?.plan) setPlanLabel(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));

    const { data: opps } = await supabase
      .from("opportunities")
      .select("id, role, company, category, work_type, experience_level, key_requirements, description")
      .order("created_at", { ascending: false });
    setOpportunities((opps as Opportunity[]) || []);

    const { data: cvRow } = await supabase.from("cvs").select("cv_text").eq("user_id", user.id).maybeSingle();
    if (cvRow?.cv_text) setCvText(cvRow.cv_text);

    const { data: hist } = await supabase
      .from("matching_results")
      .select("id, role, company, overall_score, verdict, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    setHistory((hist as HistoryRow[]) || []);

    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const stats = useMemo(() => {
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const thisMonth = history.filter((h) => new Date(h.created_at).getTime() > monthAgo);
    const scored = history.filter((h) => typeof h.overall_score === "number");
    const avg = scored.length > 0 ? Math.round(scored.reduce((s, h) => s + (h.overall_score || 0), 0) / scored.length) : 0;
    const best = scored.length > 0 ? Math.max(...scored.map((h) => h.overall_score || 0)) : 0;
    return { total: history.length, thisMonth: thisMonth.length, avg, best };
  }, [history]);

  const filteredHistory = useMemo(() => {
    return history.filter((h) => {
      if (historyFilter && h.verdict !== historyFilter) return false;
      if (historySearch) {
        const q = historySearch.toLowerCase();
        const hay = ((h.role || "") + " " + (h.company || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [history, historyFilter, historySearch]);

  async function runMatch() {
    setError("");
    setResult(null);

    if (!cvText.trim()) { setError("Provide your CV text first."); return; }

    let payloadInput: any = {};
    if (!useManual && selectedOppId) {
      const opp = opportunities.find((o) => o.id === selectedOppId);
      if (!opp) { setError("Selected opportunity not found."); return; }
      payloadInput = {
        cvText: cvText,
        role: opp.role || "",
        company: opp.company || "",
        industry: opp.category || "",
        seniority: opp.experience_level || "",
        employmentType: opp.work_type || "",
        workArrangement: opp.work_type || "",
        keyRequirements: opp.key_requirements || "",
        jobDescription: opp.description || "",
      };
    } else {
      if (!manualRole.trim() && !manualDescription.trim()) {
        setError("Add a role or paste a job description.");
        return;
      }
      payloadInput = {
        cvText: cvText,
        role: manualRole,
        company: manualCompany,
        industry: "",
        seniority: "",
        employmentType: "",
        workArrangement: "",
        keyRequirements: manualRequirements,
        jobDescription: manualDescription,
      };
    }

    setRunning(true);
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature: "matching", input: payloadInput }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Matching failed");
      } else {
        setResult(data.data);
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (user) {
          await supabase.from("matching_results").insert({
            user_id: user.id,
            opportunity_id: !useManual && selectedOppId ? selectedOppId : null,
            role: payloadInput.role || null,
            company: payloadInput.company || null,
            cv_text: cvText,
            target_description: payloadInput.jobDescription || null,
            overall_score: data.data.overallScore,
            verdict: data.data.verdict,
            confidence: data.data.confidence,
            reasoning: data.data.reasoning,
            strengths: data.data.strengths,
            gaps: data.data.gaps,
            factors: data.data.factors,
            recommendations: data.data.recommendations,
          });
          const { data: hist } = await supabase
            .from("matching_results")
            .select("id, role, company, overall_score, verdict, created_at")
            .order("created_at", { ascending: false })
            .limit(30);
          setHistory((hist as HistoryRow[]) || []);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Matching failed");
    }
    setRunning(false);
  }

  function tailorCV() {
    const params = new URLSearchParams();
    if (!useManual && selectedOppId) {
      const opp = opportunities.find((o) => o.id === selectedOppId);
      if (opp) {
        if (opp.role) params.set("role", opp.role);
        if (opp.company) params.set("company", opp.company);
        if (opp.category) params.set("industry", opp.category);
        if (opp.experience_level) params.set("seniority", opp.experience_level);
        if (opp.work_type) params.set("employmentType", opp.work_type);
        if (opp.key_requirements) params.set("keyRequirements", opp.key_requirements);
        if (opp.description) params.set("jobDescription", opp.description);
      }
    } else {
      if (manualRole) params.set("role", manualRole);
      if (manualCompany) params.set("company", manualCompany);
      if (manualRequirements) params.set("keyRequirements", manualRequirements);
      if (manualDescription) params.set("jobDescription", manualDescription);
    }
    router.push("/cv-tailor?" + params.toString());
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
            <h1 className="text-lg font-semibold tracking-tight">FORGE Matching</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">How well does this fit you?</span>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8 max-w-7xl w-full">

          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total matches", value: stats.total },
              { label: "This month", value: stats.thisMonth },
              { label: "Avg score", value: stats.avg + "/100" },
              { label: "Best score", value: stats.best + "/100" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-violet-500/20 bg-[#170a34]/70 p-4">
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-1.5">{s.label}</p>
                <p className="text-2xl font-semibold text-white/90">{s.value}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-6">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <h2 className="text-base font-semibold">Opportunity</h2>
                  <div className="flex items-center gap-1 border border-violet-500/25 rounded-lg p-1">
                    <button type="button" onClick={() => setUseManual(false)} className={"px-3 py-1.5 rounded-md text-xs transition " + (!useManual ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>From vault</button>
                    <button type="button" onClick={() => setUseManual(true)} className={"px-3 py-1.5 rounded-md text-xs transition " + (useManual ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>Paste new</button>
                  </div>
                </div>

                {!useManual ? (
                  opportunities.length === 0 ? (
                    <p className="text-xs text-violet-200/55">No saved opportunities yet. Switch to <button type="button" onClick={() => setUseManual(true)} className="text-cyan-400 hover:text-cyan-300">Paste new</button> or add one from the <a href="/opportunities" className="text-cyan-400 hover:text-cyan-300">Opportunities page</a>.</p>
                  ) : (
                    <select value={selectedOppId} onChange={(e) => setSelectedOppId(e.target.value)} className={inputClass}>
                      <option value="">Select an opportunity...</option>
                      {opportunities.map((o) => (
                        <option key={o.id} value={o.id}>{(o.role || "Untitled") + (o.company ? " - " + o.company : "")}</option>
                      ))}
                    </select>
                  )
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Role</label><input value={manualRole} onChange={(e) => setManualRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer" className={inputClass} /></div>
                      <div><label className={labelClass}>Company</label><input value={manualCompany} onChange={(e) => setManualCompany(e.target.value)} placeholder="e.g. Acme Ltd" className={inputClass} /></div>
                    </div>
                    <div><label className={labelClass}>Key requirements</label><textarea rows={3} value={manualRequirements} onChange={(e) => setManualRequirements(e.target.value)} placeholder="Key skills and requirements..." className={inputClass + " resize-none"} /></div>
                    <div><label className={labelClass}>Job description</label><textarea rows={5} value={manualDescription} onChange={(e) => setManualDescription(e.target.value)} placeholder="Paste the posting..." className={inputClass + " resize-none"} /></div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-6">
                <h2 className="text-base font-semibold mb-2">Your CV</h2>
                <p className="text-xs text-violet-200/50 mb-4">Auto-loaded from your saved CV. Edit here if needed.</p>
                <textarea rows={10} value={cvText} onChange={(e) => setCvText(e.target.value)} placeholder="Paste or edit your CV text..." className={inputClass + " resize-none"} />
              </div>

              {error && <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-4 py-3">{error}</p>}

              <div className="flex items-center gap-3 flex-wrap">
                <button type="button" onClick={runMatch} disabled={running} className="text-sm font-semibold text-black px-6 py-3 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)" }}>{running ? "FORGE is matching..." : "Run FORGE Matching"}</button>
                {result && <button type="button" onClick={tailorCV} className="text-sm text-violet-100/80 hover:text-white px-5 py-3 rounded-lg border border-violet-500/30 hover:border-violet-400/50 transition">Tailor CV for this →</button>}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl p-[1px] sticky top-6" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.45))" }}>
                <div className="rounded-2xl bg-[#170a34]/90 backdrop-blur-xl p-6">
                  <div className="mb-4"><ForgeAI size={22} label="FORGE MATCH" active={running} /></div>

                  {!result && !running && (
                    <p className="text-xs text-violet-200/55 leading-relaxed">Run a match to see how well your CV fits this opportunity. FORGE evaluates skills, experience, seniority, industry, work type, and positioning.</p>
                  )}

                  {running && (
                    <p className="text-xs text-violet-200/55">FORGE is evaluating fit...</p>
                  )}

                  {result && (
                    <div className="space-y-5">
                      <div>
                        <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-2">Overall fit</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-semibold text-white">{result.overallScore}</span>
                          <span className="text-sm text-violet-200/50">/100</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <span className={"text-[10px] tracking-wider uppercase border rounded-full px-3 py-1.5 " + (VERDICT_STYLE[result.verdict]?.chip || VERDICT_STYLE.moderate.chip)}>{VERDICT_STYLE[result.verdict]?.label || result.verdict}</span>
                          <span className="text-[10px] tracking-wider uppercase text-violet-200/50 border border-violet-500/25 rounded-full px-3 py-1.5">Confidence {result.confidence}%</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-2">Reasoning</p>
                        <p className="text-xs text-white/80 leading-relaxed">{result.reasoning}</p>
                      </div>

                      <div>
                        <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-3">Factor breakdown</p>
                        <div className="space-y-3">
                          {Object.entries(result.factors).map(([key, factor]) => (
                            <div key={key}>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[11px] text-violet-200/75">{FACTOR_LABELS[key] || key}</span>
                                <span className="text-[11px] text-violet-200/55">{factor.score}/100 · weight {factor.weight}</span>
                              </div>
                              <div className="h-1 rounded-full bg-violet-500/15 overflow-hidden">
                                <div className={"h-full rounded-full bg-gradient-to-r " + (VERDICT_STYLE[result.verdict]?.bar || "from-cyan-400 to-violet-500")} style={{ width: factor.score + "%" }} />
                              </div>
                              <p className="text-[11px] text-violet-200/50 mt-1.5">{factor.reasoning}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {result && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03] p-6">
                <p className="text-[10px] tracking-[0.18em] uppercase text-emerald-300/80 mb-3">Strengths</p>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => <li key={i} className="text-xs text-white/85 leading-relaxed">• {s}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.03] p-6">
                <p className="text-[10px] tracking-[0.18em] uppercase text-amber-300/80 mb-3">Gaps</p>
                <ul className="space-y-2">
                  {result.gaps.map((g, i) => <li key={i} className="text-xs text-white/85 leading-relaxed">• {g}</li>)}
                </ul>
              </div>
              {result.recommendations.length > 0 && (
                <div className="md:col-span-2 rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-6">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-4">Recommendations</p>
                  <div className="space-y-2">
                    {result.recommendations.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3">
                        <span className={"text-[10px] tracking-wider uppercase border rounded-full px-2.5 py-1 shrink-0 " + (PRIORITY_STYLE[r.priority] || PRIORITY_STYLE.low)}>{r.priority}</span>
                        <p className="text-xs text-white/85 leading-relaxed">{r.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-base font-semibold mb-1">Match history</h2>
                <p className="text-xs text-violet-200/50">Your last 30 matches.</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <input value={historySearch} onChange={(e) => setHistorySearch(e.target.value)} placeholder="Search..." className={inputClass + " max-w-[180px]"} />
                <select value={historyFilter} onChange={(e) => setHistoryFilter(e.target.value)} className={inputClass + " max-w-[140px]"}>
                  <option value="">All verdicts</option>
                  <option value="strong">Strong</option>
                  <option value="good">Good</option>
                  <option value="moderate">Moderate</option>
                  <option value="weak">Weak</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-violet-200/50">Loading...</p>
            ) : filteredHistory.length === 0 ? (
              <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/50 px-6 py-12 text-center">
                <p className="text-sm text-white/75">No matches yet.</p>
                <p className="text-xs text-violet-200/50 mt-1.5">Run your first match above.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredHistory.map((h) => {
                  const v = VERDICT_STYLE[h.verdict || "moderate"] || VERDICT_STYLE.moderate;
                  return (
                    <div key={h.id} className="rounded-xl border border-violet-500/20 bg-[#170a34]/60 hover:border-violet-400/40 transition p-4 flex items-center gap-4 flex-wrap">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-white/90 font-medium">{h.role || "Untitled role"}</p>
                        <p className="text-[11px] text-violet-200/50 mt-0.5">{h.company || "-"} · {new Date(h.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className="text-lg font-semibold text-white/85">{h.overall_score}/100</span>
                      <span className={"text-[10px] tracking-wider uppercase border rounded-full px-3 py-1.5 " + v.chip}>{v.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-12">Freelance Forge AI - by FORGE</p>
        </main>
      </div>
    </div>
  );
}
