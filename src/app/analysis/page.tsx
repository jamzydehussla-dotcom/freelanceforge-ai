"use client";

import { useEffect, useState, useMemo } from "react";
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
  budget_min: number | null;
  budget_max: number | null;
  budget_currency: string | null;
  deadline: string | null;
  created_at: string;
};

type Analysis = {
  id: string;
  opportunity_id: string | null;
  role: string | null;
  company: string | null;
  verdict: string;
  confidence: number;
  reasoning: string;
  criteria: any;
  green_flags: string[];
  red_flags: string[];
  next_action: string;
  created_at: string;
};

type MatchRow = { opportunity_id: string | null; overall_score: number | null };

const CRITERIA_LABELS: Record<string, string> = {
  opportunityQuality: "Opportunity quality",
  clientSignals: "Client signals",
  scopeClarity: "Scope clarity",
  riskLevel: "Risk level",
  effortVsReward: "Effort vs reward",
  strategicValue: "Strategic value",
};

const VERDICT_STYLE: Record<string, { label: string; chip: string; bar: string }> = {
  pursue: { label: "Pursue", chip: "text-emerald-300 border-emerald-400/40 bg-emerald-400/5", bar: "from-emerald-400 to-cyan-400" },
  consider: { label: "Consider", chip: "text-amber-300 border-amber-400/40 bg-amber-400/5", bar: "from-amber-400 to-violet-500" },
  skip: { label: "Skip", chip: "text-red-300 border-red-400/40 bg-red-400/5", bar: "from-red-400 to-violet-500" },
};

const VERDICT_COLUMNS = ["pursue", "consider", "skip"] as const;

export default function AnalysisPage() {
  const [loading, setLoading] = useState(true);
  const [planLabel, setPlanLabel] = useState("Free");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [matchScores, setMatchScores] = useState<Record<string, number>>({});
  const [view, setView] = useState<"queue" | "board">("queue");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [verdictFilter, setVerdictFilter] = useState("");
  const [openDetail, setOpenDetail] = useState<Analysis | null>(null);
  const [running, setRunning] = useState<string | null>(null);
  const [bulkRunning, setBulkRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setLoading(false); return; }

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
    if (profile?.plan) setPlanLabel(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));

    const { data: opps } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });
    setOpportunities((opps as Opportunity[]) || []);

    const { data: an } = await supabase
      .from("analysis_results")
      .select("*")
      .order("created_at", { ascending: false });
    setAnalyses((an as Analysis[]) || []);

    const { data: matches } = await supabase
      .from("matching_results")
      .select("opportunity_id, overall_score")
      .not("opportunity_id", "is", null);
    const map: Record<string, number> = {};
    (matches as MatchRow[] | null)?.forEach((m) => {
      if (m.opportunity_id && typeof m.overall_score === "number") {
        if (!map[m.opportunity_id] || m.overall_score > map[m.opportunity_id]) {
          map[m.opportunity_id] = m.overall_score;
        }
      }
    });
    setMatchScores(map);

    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const analysesByOpp = useMemo(() => {
    const map: Record<string, Analysis> = {};
    analyses.forEach((a) => { if (a.opportunity_id && !map[a.opportunity_id]) map[a.opportunity_id] = a; });
    return map;
  }, [analyses]);

  const pending = useMemo(() => {
    return opportunities.filter((o) => !analysesByOpp[o.id]);
  }, [opportunities, analysesByOpp]);

  const stats = useMemo(() => {
    const pursue = analyses.filter((a) => a.verdict === "pursue").length;
    const consider = analyses.filter((a) => a.verdict === "consider").length;
    const skip = analyses.filter((a) => a.verdict === "skip").length;
    return { total: analyses.length, pending: pending.length, pursue, consider, skip };
  }, [analyses, pending]);

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      const a = analysesByOpp[o.id];
      if (search) {
        const q = search.toLowerCase();
        const hay = ((o.role || "") + " " + (o.company || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (verdictFilter) {
        if (!a || a.verdict !== verdictFilter) return false;
      }
      if (statusFilter === "pending" && a) return false;
      if (statusFilter === "analysed" && !a) return false;
      return true;
    });
  }, [opportunities, analysesByOpp, search, verdictFilter, statusFilter]);

  async function analyseOne(o: Opportunity) {
    setRunning(o.id);
    setError("");
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: "analysis",
          input: {
            role: o.role || "",
            company: o.company || "",
            industry: o.category || "",
            seniority: o.experience_level || "",
            employmentType: o.work_type || "",
            workArrangement: o.work_type || "",
            keyRequirements: o.key_requirements || "",
            jobDescription: o.description || "",
            budgetMin: o.budget_min?.toString() || "",
            budgetMax: o.budget_max?.toString() || "",
            budgetCurrency: o.budget_currency || "USD",
            deadline: o.deadline || "",
            matchScore: matchScores[o.id]?.toString() || "",
          },
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Analysis failed");
      } else {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (user) {
          await supabase.from("analysis_results").insert({
            user_id: user.id,
            opportunity_id: o.id,
            role: o.role,
            company: o.company,
            verdict: data.data.verdict,
            confidence: data.data.confidence,
            reasoning: data.data.reasoning,
            criteria: data.data.criteria,
            green_flags: data.data.greenFlags,
            red_flags: data.data.redFlags,
            next_action: data.data.nextAction,
          });
          await load();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    }
    setRunning(null);
  }

  async function bulkAnalyse() {
    if (pending.length === 0) return;
    setBulkRunning(true);
    setError("");
    for (const o of pending.slice(0, 10)) {
      await analyseOne(o);
    }
    setBulkRunning(false);
  }

  useEffect(() => {
    if (autoRun && !bulkRunning && pending.length > 0 && !loading) {
      const t = setTimeout(() => { bulkAnalyse(); }, 2000);
      return () => clearTimeout(t);
    }
  }, [autoRun, pending.length, loading, bulkRunning]);

  async function deleteAnalysis(id: string) {
    if (!confirm("Delete this analysis? You can re-run it anytime.")) return;
    await supabase.from("analysis_results").delete().eq("id", id);
    if (openDetail?.id === id) setOpenDetail(null);
    await load();
  }

  const inputClass = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : planLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Analysis</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">Is this worth pursuing?</span>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8 max-w-7xl w-full">

          <section className="rounded-xl border border-violet-500/25 bg-[#170a34]/60 px-5 py-4 flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-center gap-3">
              <ForgeAI size={22} label="FORGE DECISION ENGINE" active={bulkRunning} />
            </div>
            <span className="text-xs text-violet-200/55 flex-1 min-w-[200px]">
              Every opportunity in your vault is queued for analysis. FORGE evaluates opportunity quality, client signals, scope clarity, risk, effort vs reward, and strategic value.
            </span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} className="accent-cyan-400 h-4 w-4" />
              <span className="text-xs text-violet-200/70">Auto-run</span>
            </label>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: "Total", value: stats.total },
              { label: "Pending", value: stats.pending },
              { label: "Pursue", value: stats.pursue },
              { label: "Consider", value: stats.consider },
              { label: "Skip", value: stats.skip },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-violet-500/20 bg-[#170a34]/70 p-4">
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-1.5">{s.label}</p>
                <p className="text-2xl font-semibold text-white/90">{s.value}</p>
              </div>
            ))}
          </section>

          <section className="flex items-center gap-3 mb-5 flex-wrap">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={inputClass + " max-w-xs"} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass + " max-w-[150px]"}>
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="analysed">Analysed</option>
            </select>
            <select value={verdictFilter} onChange={(e) => setVerdictFilter(e.target.value)} className={inputClass + " max-w-[150px]"}>
              <option value="">All verdicts</option>
              <option value="pursue">Pursue</option>
              <option value="consider">Consider</option>
              <option value="skip">Skip</option>
            </select>
            <div className="flex items-center gap-1 border border-violet-500/25 rounded-lg p-1">
              <button type="button" onClick={() => setView("queue")} className={"px-3 py-1.5 rounded-md text-xs transition " + (view === "queue" ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>Queue</button>
              <button type="button" onClick={() => setView("board")} className={"px-3 py-1.5 rounded-md text-xs transition " + (view === "board" ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>Board</button>
            </div>
            <div className="flex-1" />
            {pending.length > 0 && (
              <button type="button" onClick={bulkAnalyse} disabled={bulkRunning} className="text-sm font-semibold text-black px-5 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>
                {bulkRunning ? "Analysing queue..." : "Analyse queue (" + pending.length + ")"}
              </button>
            )}
          </section>

          {error && <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-4 py-3 mb-5">{error}</p>}

          {loading ? (
            <p className="text-sm text-violet-200/50">Loading...</p>
          ) : opportunities.length === 0 ? (
            <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/50 px-6 py-16 text-center">
              <div className="mx-auto mb-4"><ForgeAI size={32} /></div>
              <p className="text-base font-medium text-white/85">No opportunities to analyse yet.</p>
              <p className="text-xs text-violet-200/50 mt-2 mb-6">Add opportunities from the Opportunities page and they will appear here for analysis.</p>
              <a href="/opportunities" className="inline-block text-sm font-semibold text-black px-5 py-2.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)" }}>Go to Opportunities</a>
            </div>
          ) : view === "queue" ? (
            <div className="space-y-2">
              {filtered.map((o) => {
                const a = analysesByOpp[o.id];
                const isRunning = running === o.id;
                const v = a ? (VERDICT_STYLE[a.verdict] || VERDICT_STYLE.consider) : null;
                return (
                  <div key={o.id} className="rounded-xl border border-violet-500/20 bg-[#170a34]/60 hover:border-violet-400/40 transition p-4 flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-white/90 font-medium">{o.role || "Untitled role"}</p>
                      <p className="text-[11px] text-violet-200/50 mt-0.5">{o.company || "-"}{o.category ? " · " + o.category : ""}{matchScores[o.id] ? " · match " + matchScores[o.id] : ""}</p>
                    </div>
                    {a ? (
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-white/85">{a.confidence}%</span>
                        <button type="button" onClick={() => setOpenDetail(a)} className={"text-[10px] tracking-wider uppercase border rounded-full px-3 py-1.5 cursor-pointer " + v!.chip}>{v!.label}</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => analyseOne(o)} disabled={isRunning || bulkRunning} className="text-xs text-cyan-400 hover:text-cyan-300 transition disabled:opacity-60">{isRunning ? "Analysing..." : "Analyse →"}</button>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && <p className="text-xs text-violet-200/50 px-2 py-6">No matches for the current filters.</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {VERDICT_COLUMNS.map((vk) => {
                const col = filtered.filter((o) => analysesByOpp[o.id]?.verdict === vk);
                const v = VERDICT_STYLE[vk];
                return (
                  <div key={vk} className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 p-3">
                    <div className="flex items-center justify-between px-1 mb-3">
                      <span className={"text-[10px] tracking-[0.15em] uppercase border rounded-full px-2.5 py-1 " + v.chip}>{v.label}</span>
                      <span className="text-[11px] text-violet-200/50">{col.length}</span>
                    </div>
                    <div className="space-y-2">
                      {col.map((o) => {
                        const a = analysesByOpp[o.id];
                        return (
                          <div key={o.id} onClick={() => a && setOpenDetail(a)} className="rounded-lg border border-violet-500/15 bg-[#170a34]/70 p-3 cursor-pointer hover:border-violet-400/40 transition">
                            <p className="text-xs text-white/85 font-medium leading-snug">{o.role || "Untitled"}</p>
                            <p className="text-[11px] text-violet-200/50 mt-1">{o.company || "-"}</p>
                            {a && <p className="text-[10px] text-violet-200/40 mt-1.5">Confidence {a.confidence}%</p>}
                          </div>
                        );
                      })}
                      {col.length === 0 && <p className="text-[11px] text-violet-200/35 px-2 py-3">Nothing here yet.</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-12">Freelance Forge AI - by FORGE</p>
        </main>
      </div>

      {openDetail && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpenDetail(null)} />
          <div className="relative w-full max-w-xl h-full bg-[#170a34] border-l border-violet-500/30 overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-10 bg-[#170a34]/95 backdrop-blur-xl border-b border-violet-500/20 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-1">FORGE Analysis</p>
                <h2 className="text-base font-semibold text-white">{openDetail.role || "Untitled role"}</h2>
                <p className="text-xs text-violet-200/55 mt-0.5">{openDetail.company || "-"}</p>
              </div>
              <button type="button" onClick={() => setOpenDetail(null)} className="p-2 rounded-lg text-violet-200/60 hover:text-white hover:bg-violet-500/10">✕</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.45))" }}>
                <div className="rounded-2xl bg-[#12062a]/90 p-5">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-3">Verdict</p>
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <span className={"text-sm font-semibold tracking-wider uppercase border rounded-full px-4 py-2 " + (VERDICT_STYLE[openDetail.verdict]?.chip || VERDICT_STYLE.consider.chip)}>{VERDICT_STYLE[openDetail.verdict]?.label || openDetail.verdict}</span>
                    <span className="text-[10px] tracking-wider uppercase text-violet-200/50 border border-violet-500/25 rounded-full px-3 py-1.5">Confidence {openDetail.confidence}%</span>
                  </div>
                  <p className="text-xs text-white/85 leading-relaxed">{openDetail.reasoning}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-3">Decision framework</p>
                <div className="space-y-3">
                  {openDetail.criteria && Object.entries(openDetail.criteria).map(([key, c]: [string, any]) => (
                    <div key={key} className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/85 font-medium">{CRITERIA_LABELS[key] || key}</span>
                        <span className="text-xs text-violet-200/55">{c.score}/100</span>
                      </div>
                      <div className="h-1 rounded-full bg-violet-500/15 overflow-hidden mb-2">
                        <div className={"h-full rounded-full bg-gradient-to-r " + (VERDICT_STYLE[openDetail.verdict]?.bar || "from-cyan-400 to-violet-500")} style={{ width: c.score + "%" }} />
                      </div>
                      <p className="text-[11px] text-violet-200/55 leading-relaxed">{c.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {openDetail.green_flags?.length > 0 && (
                <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.03] p-5">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-emerald-300/80 mb-3">Green flags</p>
                  <ul className="space-y-2">
                    {openDetail.green_flags.map((g, i) => <li key={i} className="text-xs text-white/85 leading-relaxed">• {g}</li>)}
                  </ul>
                </div>
              )}

              {openDetail.red_flags?.length > 0 && (
                <div className="rounded-xl border border-red-500/25 bg-red-500/[0.03] p-5">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-red-300/80 mb-3">Red flags</p>
                  <ul className="space-y-2">
                    {openDetail.red_flags.map((g, i) => <li key={i} className="text-xs text-white/85 leading-relaxed">• {g}</li>)}
                  </ul>
                </div>
              )}

              {openDetail.next_action && (
                <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/[0.03] p-5">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-cyan-300/85 mb-2">Recommended next action</p>
                  <p className="text-sm text-white/90 leading-relaxed">{openDetail.next_action}</p>
                </div>
              )}

              <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-violet-500/15">
                <button type="button" onClick={() => deleteAnalysis(openDetail.id)} className="text-sm text-violet-200/60 hover:text-red-400 px-4 py-2.5 transition">Delete analysis</button>
                <span className="text-[11px] text-violet-200/40">Ran {new Date(openDetail.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
