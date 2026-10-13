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
  key_requirements: string | null;
  description: string | null;
  budget_min: number | null;
  budget_max: number | null;
  budget_currency: string | null;
};

type Proposal = {
  id: string;
  opportunity_id: string | null;
  title: string | null;
  opportunity_role: string | null;
  opportunity_company: string | null;
  status: string;
  brief: string | null;
  key_requirements: string | null;
  strategy: any;
  context_snapshot: any;
  subject_line: string | null;
  opening: string | null;
  problem_understanding: string | null;
  proposed_approach: string | null;
  relevant_experience: string | null;
  timeline: string | null;
  investment: string | null;
  closing: string | null;
  ps_line: string | null;
  why_this_works: string[] | null;
  before_you_send: string[] | null;
  key_changes: string[] | null;
  word_count: number | null;
  read_minutes: number | null;
  tone_match: number | null;
  personalisation_score: number | null;
  version: number;
  created_at: string;
};

const TONES = ["Professional", "Warm", "Technical", "Confident", "Consultative", "Direct"];
const POSITIONING = ["Specialist", "Senior Partner", "Cost-effective Expert", "Strategic Advisor", "Hands-on Builder"];
const LENGTHS = ["Concise", "Standard", "Detailed"];
const EMPHASIS_OPTIONS = ["Experience", "Process", "Results", "Understanding", "Value"];
const QUICK_CHIPS = ["Shorter", "More technical", "Warmer tone", "Stronger opening", "Less corporate"];

const inputClass = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";
const labelClass = "block text-[11px] tracking-wide text-violet-200/70 mb-1.5";

function countWords(s: string): number { return (s || "").trim().split(/\s+/).filter(Boolean).length; }

export default function ProposalsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [planLabel, setPlanLabel] = useState("Free");

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOppId, setSelectedOppId] = useState("");
  const [useManual, setUseManual] = useState(false);
  const [manualRole, setManualRole] = useState("");
  const [manualCompany, setManualCompany] = useState("");
  const [manualBrief, setManualBrief] = useState("");
  const [manualRequirements, setManualRequirements] = useState("");

  const [cvText, setCvText] = useState("");
  const [memoryText, setMemoryText] = useState("");
  const [analysisReasoning, setAnalysisReasoning] = useState("");
  const [matchScore, setMatchScore] = useState("");

  const [tone, setTone] = useState("Professional");
  const [positioning, setPositioning] = useState("Specialist");
  const [length, setLength] = useState("Standard");
  const [emphasis, setEmphasis] = useState<string[]>(["Experience", "Value"]);
  const [strengthTags, setStrengthTags] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [refineNote, setRefineNote] = useState("");
  const [quickDirs, setQuickDirs] = useState<string[]>([]);

  const [history, setHistory] = useState<Proposal[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [copied, setCopied] = useState(false);

  async function load() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setLoading(false); return; }

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
    if (profile?.plan) setPlanLabel(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));

    const { data: opps } = await supabase.from("opportunities").select("id, role, company, key_requirements, description, budget_min, budget_max, budget_currency").order("created_at", { ascending: false });
    setOpportunities((opps as Opportunity[]) || []);

    const { data: cvRow } = await supabase.from("cvs").select("cv_text").eq("user_id", user.id).maybeSingle();
    if (cvRow?.cv_text) setCvText(cvRow.cv_text);

    const { data: memRow } = await supabase.from("user_memory").select("memory").eq("user_id", user.id).maybeSingle();
    if (memRow?.memory) {
      const m = memRow.memory as any;
      const lines: string[] = [];
      if (m.minimumRate) lines.push("Minimum rate: " + m.minimumRate + " " + (m.currency || ""));
      if (m.preferredTone) lines.push("Preferred tone: " + m.preferredTone);
      if (m.workBoundaries) lines.push("Boundaries: " + m.workBoundaries);
      if (m.industries) lines.push("Industries: " + m.industries);
      if (m.languages) lines.push("Languages: " + m.languages);
      setMemoryText(lines.join("\n"));
    }

    const { data: hist } = await supabase.from("proposals").select("*").order("created_at", { ascending: false }).limit(40);
    setHistory((hist as Proposal[]) || []);

    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    async function loadAnalysis() {
      if (!selectedOppId) { setAnalysisReasoning(""); setMatchScore(""); return; }
      const { data: an } = await supabase.from("analysis_results").select("reasoning").eq("opportunity_id", selectedOppId).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (an?.reasoning) setAnalysisReasoning(an.reasoning);
      const { data: m } = await supabase.from("matching_results").select("overall_score").eq("opportunity_id", selectedOppId).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (typeof m?.overall_score === "number") setMatchScore(String(m.overall_score));
    }
    loadAnalysis();
  }, [selectedOppId]);

  const stats = useMemo(() => {
    const drafts = history.filter((h) => h.status === "draft").length;
    const sent = history.filter((h) => h.status === "sent").length;
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const thisMonth = history.filter((h) => new Date(h.created_at).getTime() > monthAgo).length;
    return { total: history.length, drafts, sent, thisMonth };
  }, [history]);

  const filtered = useMemo(() => {
    return history.filter((h) => {
      if (statusFilter && h.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = ((h.title || "") + " " + (h.opportunity_role || "") + " " + (h.opportunity_company || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [history, search, statusFilter]);

  function toggleEmphasis(v: string) {
    setEmphasis((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  }

  async function runProposal(feedbackOverride?: string) {
    setError("");
    if (!useManual && !selectedOppId) { setError("Select an opportunity or switch to Paste new."); return; }
    if (useManual && !manualRole.trim() && !manualBrief.trim()) { setError("Add a role or brief."); return; }
    if (!cvText.trim()) { setError("Your CV text is empty. Add it from CV Tailor first."); return; }

    const opp = !useManual ? opportunities.find((o) => o.id === selectedOppId) : null;
    const role = useManual ? manualRole : (opp?.role || "");
    const company = useManual ? manualCompany : (opp?.company || "");
    const brief = useManual ? manualBrief : (opp?.description || "");
    const requirements = useManual ? manualRequirements : (opp?.key_requirements || "");

    const feedback = feedbackOverride || [refineNote, ...quickDirs].filter(Boolean).join(". ");

    setRunning(true);
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: "proposal",
          input: {
            role, company, brief, keyRequirements: requirements,
            cvText, memory: memoryText,
            analysisReasoning, matchScore,
            tone, positioningAngle: positioning, length,
            emphasis: emphasis.join(", "),
            strengthTags, customNotes, feedback,
          },
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Generation failed");
      } else {
        const d = data.data;
        const fullText = [d.subjectLine, d.opening, d.problemUnderstanding, d.proposedApproach, d.relevantExperience, d.timeline, d.investment, d.closing, d.psLine].join(" ");
        const words = countWords(fullText);
        const minutes = Math.max(1, Math.round(words / 220));

        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;
        if (user) {
          const payload: any = {
            user_id: user.id,
            opportunity_id: !useManual && selectedOppId ? selectedOppId : null,
            title: (role || "Untitled") + (company ? " — " + company : ""),
            opportunity_role: role || null,
            opportunity_company: company || null,
            status: "draft",
            brief,
            key_requirements: requirements,
            strategy: { tone, positioning, length, emphasis, strengthTags, customNotes },
            context_snapshot: { cvText, memoryText, analysisReasoning, matchScore },
            subject_line: d.subjectLine,
            opening: d.opening,
            problem_understanding: d.problemUnderstanding,
            proposed_approach: d.proposedApproach,
            relevant_experience: d.relevantExperience,
            timeline: d.timeline,
            investment: d.investment,
            closing: d.closing,
            ps_line: d.psLine,
            why_this_works: d.whyThisWorks,
            before_you_send: d.beforeYouSend,
            key_changes: d.keyChanges,
            word_count: words,
            read_minutes: minutes,
            tone_match: d.toneMatch,
            personalisation_score: d.personalisationScore,
            version: currentId ? 2 : 1,
            updated_at: new Date().toISOString(),
          };
          if (currentId) {
            await supabase.from("proposals").update(payload).eq("id", currentId);
            const { data: updated } = await supabase.from("proposals").select("*").eq("id", currentId).maybeSingle();
            if (updated) setProposal(updated as Proposal);
          } else {
            const { data: inserted } = await supabase.from("proposals").insert(payload).select("*").maybeSingle();
            if (inserted) { setProposal(inserted as Proposal); setCurrentId(inserted.id); }
          }
          setRefineNote(""); setQuickDirs([]);
          await load();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    }
    setRunning(false);
  }

  function toggleQuick(d: string) {
    setQuickDirs((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  }

  function fullTextOf(p: Proposal): string {
    return [
      "SUBJECT: " + (p.subject_line || ""),
      "",
      p.opening || "",
      "",
      p.problem_understanding || "",
      "",
      p.proposed_approach || "",
      "",
      p.relevant_experience || "",
      "",
      "Timeline: " + (p.timeline || ""),
      "",
      "Investment: " + (p.investment || ""),
      "",
      p.closing || "",
      p.ps_line ? "\n" + p.ps_line : "",
    ].join("\n");
  }

  async function copyProposal() {
    if (!proposal) return;
    await navigator.clipboard.writeText(fullTextOf(proposal));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function newProposal() {
    setProposal(null); setCurrentId(null);
    setRefineNote(""); setQuickDirs([]);
    setError("");
  }

  async function openExisting(p: Proposal) {
    setProposal(p);
    setCurrentId(p.id);
    if (p.strategy) {
      setTone(p.strategy.tone || "Professional");
      setPositioning(p.strategy.positioning || "Specialist");
      setLength(p.strategy.length || "Standard");
      setEmphasis(p.strategy.emphasis || []);
      setStrengthTags(p.strategy.strengthTags || "");
      setCustomNotes(p.strategy.customNotes || "");
    }
    if (p.opportunity_id) { setSelectedOppId(p.opportunity_id); setUseManual(false); }
    else { setUseManual(true); setManualRole(p.opportunity_role || ""); setManualCompany(p.opportunity_company || ""); setManualBrief(p.brief || ""); setManualRequirements(p.key_requirements || ""); }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProposal(id: string) {
    if (!confirm("Delete this proposal?")) return;
    await supabase.from("proposals").delete().eq("id", id);
    if (currentId === id) newProposal();
    await load();
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("proposals").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (proposal?.id === id) setProposal({ ...proposal, status });
    await load();
  }

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : planLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Proposal Studio</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">Your experience. Your value. Your proposal.</span>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8 max-w-7xl w-full">

          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total proposals", value: stats.total },
              { label: "Drafts", value: stats.drafts },
              { label: "Sent", value: stats.sent },
              { label: "This month", value: stats.thisMonth },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-violet-500/20 bg-[#170a34]/70 p-4">
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-1.5">{s.label}</p>
                <p className="text-2xl font-semibold text-white/90">{s.value}</p>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-violet-500/25 bg-[#170a34]/60 px-5 py-4 flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-center gap-3"><ForgeAI size={22} label="FORGE PROPOSAL" active={running} /></div>
            <span className="text-xs text-violet-200/55 flex-1 min-w-[200px]">FORGE writes a proposal grounded in your CV, memory, and opportunity context. Nothing invented — only what is real, positioned for this client.</span>
            {proposal && (
              <button type="button" onClick={newProposal} className="text-xs text-cyan-400 hover:text-cyan-300 transition border border-cyan-400/30 rounded-lg px-3 py-1.5">+ New proposal</button>
            )}
          </section>

          {error && <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-4 py-3 mb-5">{error}</p>}

          <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-6">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <h2 className="text-base font-semibold">Client & brief</h2>
                  <div className="flex items-center gap-1 border border-violet-500/25 rounded-lg p-1">
                    <button type="button" onClick={() => setUseManual(false)} className={"px-3 py-1.5 rounded-md text-xs transition " + (!useManual ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>From vault</button>
                    <button type="button" onClick={() => setUseManual(true)} className={"px-3 py-1.5 rounded-md text-xs transition " + (useManual ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>Paste new</button>
                  </div>
                </div>

                {!useManual ? (
                  opportunities.length === 0 ? (
                    <p className="text-xs text-violet-200/55">No saved opportunities yet. Switch to <button type="button" onClick={() => setUseManual(true)} className="text-cyan-400 hover:text-cyan-300">Paste new</button>.</p>
                  ) : (
                    <select value={selectedOppId} onChange={(e) => setSelectedOppId(e.target.value)} className={inputClass}>
                      <option value="">Select an opportunity...</option>
                      {opportunities.map((o) => (
                        <option key={o.id} value={o.id}>{(o.role || "Untitled") + (o.company ? " — " + o.company : "")}</option>
                      ))}
                    </select>
                  )
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className={labelClass}>Role</label><input value={manualRole} onChange={(e) => setManualRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer" className={inputClass} /></div>
                      <div><label className={labelClass}>Company</label><input value={manualCompany} onChange={(e) => setManualCompany(e.target.value)} placeholder="e.g. Acme Ltd" className={inputClass} /></div>
                    </div>
                    <div><label className={labelClass}>Key requirements</label><textarea rows={3} value={manualRequirements} onChange={(e) => setManualRequirements(e.target.value)} placeholder="Requirements from the posting..." className={inputClass + " resize-none"} /></div>
                    <div><label className={labelClass}>Brief / context</label><textarea rows={5} value={manualBrief} onChange={(e) => setManualBrief(e.target.value)} placeholder="What did they ask for? Any context from the posting?" className={inputClass + " resize-none"} /></div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-6">
                <h2 className="text-base font-semibold mb-4">Strategy</h2>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Tone</label>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map((t) => (<button key={t} type="button" onClick={() => setTone(t)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (tone === t ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>{t}</button>))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Positioning angle</label>
                    <div className="flex flex-wrap gap-2">
                      {POSITIONING.map((t) => (<button key={t} type="button" onClick={() => setPositioning(t)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (positioning === t ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>{t}</button>))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Length</label>
                    <div className="flex flex-wrap gap-2">
                      {LENGTHS.map((t) => (<button key={t} type="button" onClick={() => setLength(t)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (length === t ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>{t}</button>))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Emphasis</label>
                    <div className="flex flex-wrap gap-2">
                      {EMPHASIS_OPTIONS.map((t) => (<button key={t} type="button" onClick={() => toggleEmphasis(t)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (emphasis.includes(t) ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>{t}</button>))}
                    </div>
                  </div>
                  <div><label className={labelClass}>Strength tags to feature (optional)</label><input value={strengthTags} onChange={(e) => setStrengthTags(e.target.value)} placeholder="e.g. React, design systems, performance" className={inputClass} /></div>
                  <div><label className={labelClass}>Custom notes for FORGE (optional)</label><textarea rows={3} value={customNotes} onChange={(e) => setCustomNotes(e.target.value)} placeholder="Anything specific you want the proposal to reflect..." className={inputClass + " resize-none"} /></div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button type="button" onClick={() => runProposal()} disabled={running} className="text-sm font-semibold text-black px-6 py-3 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)" }}>{running ? "FORGE is writing..." : proposal ? "Regenerate" : "Generate proposal"}</button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-6 sticky top-6">
                <div className="mb-4"><ForgeAI size={20} label="CONTEXT LOADED" /></div>
                <div className="space-y-3">
                  {[
                    { label: "CV", value: cvText ? cvText.slice(0, 80).replace(/\n/g, " ") + "..." : "Not found — add from CV Tailor", ok: !!cvText },
                    { label: "Memory", value: memoryText ? memoryText.split("\n").slice(0, 2).join(" · ") : "Nothing on file", ok: !!memoryText },
                    { label: "Analysis", value: analysisReasoning ? analysisReasoning.slice(0, 90) + "..." : "Run Analysis for a stronger proposal", ok: !!analysisReasoning },
                    { label: "Match score", value: matchScore ? matchScore + "/100" : "Not run", ok: !!matchScore },
                  ].map((row) => (
                    <div key={row.label} className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={"h-1.5 w-1.5 rounded-full " + (row.ok ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" : "bg-violet-500/40")} />
                        <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/55">{row.label}</p>
                      </div>
                      <p className="text-[11px] text-white/70 leading-relaxed">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {proposal && (
            <>
              <section className="mb-8">
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                  <h2 className="text-base font-semibold">Draft</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select value={proposal.status} onChange={(e) => updateStatus(proposal.id, e.target.value)} className={inputClass + " max-w-[140px]"}>
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="replied">Replied</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                    <button type="button" onClick={copyProposal} className="text-xs text-violet-100/80 hover:text-white px-4 py-2.5 rounded-lg border border-violet-500/30 transition">{copied ? "Copied!" : "Copy text"}</button>
                  </div>
                </div>

                <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-5">
                  <div className="rounded-lg bg-[#f7f5fb] text-[#1a1024] p-10 md:p-14">
                    <div className="border-b border-[#1a1024]/15 pb-4 mb-6">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-[#1a1024]/50 mb-2">Subject line</p>
                      <p className="text-base font-semibold">{proposal.subject_line}</p>
                    </div>
                    <div className="space-y-5 text-sm leading-relaxed text-[#1a1024]/85">
                      <p>{proposal.opening}</p>
                      <p>{proposal.problem_understanding}</p>
                      <p>{proposal.proposed_approach}</p>
                      <p>{proposal.relevant_experience}</p>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1a1024]/50 mb-1.5">Timeline</p>
                        <p>{proposal.timeline}</p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-[#1a1024]/50 mb-1.5">Investment</p>
                        <p>{proposal.investment}</p>
                      </div>
                      <p>{proposal.closing}</p>
                      {proposal.ps_line && <p className="italic text-[#1a1024]/70">{proposal.ps_line}</p>}
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-violet-500/20 bg-[#12062a]/50 p-6">
                  <p className="text-sm font-medium text-white mb-1">Not quite right?</p>
                  <p className="text-xs text-violet-200/50 mb-5">Tell FORGE what to change - it will regenerate without you rewriting anything.</p>
                  <input value={refineNote} onChange={(e) => setRefineNote(e.target.value)} placeholder="e.g. Make it warmer, lead with results, drop the PS..." className={inputClass} />
                  <div className="flex flex-wrap gap-2 mt-4">
                    {QUICK_CHIPS.map((d) => (<button key={d} type="button" onClick={() => toggleQuick(d)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (quickDirs.includes(d) ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>{d}</button>))}
                  </div>
                  <div className="mt-5">
                    <button type="button" onClick={() => runProposal()} disabled={running} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{running ? "Regenerating..." : "Refine with FORGE"}</button>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 p-5">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-3">Quality scorecard</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between"><span className="text-xs text-violet-200/70">Word count</span><span className="text-xs text-white/85">{proposal.word_count || 0}</span></div>
                    <div className="flex items-center justify-between"><span className="text-xs text-violet-200/70">Read time</span><span className="text-xs text-white/85">{proposal.read_minutes || 0} min</span></div>
                    <div className="flex items-center justify-between"><span className="text-xs text-violet-200/70">Tone match</span><span className="text-xs text-cyan-300">{proposal.tone_match || 0}%</span></div>
                    <div className="flex items-center justify-between"><span className="text-xs text-violet-200/70">Personalisation</span><span className="text-xs text-cyan-300">{proposal.personalisation_score || 0}%</span></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03] p-5">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-emerald-300/80 mb-3">Why this works</p>
                  <ul className="space-y-2">
                    {(proposal.why_this_works || []).map((w, i) => <li key={i} className="text-xs text-white/80 leading-relaxed">• {w}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.03] p-5">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-amber-300/80 mb-3">Before you send</p>
                  <ul className="space-y-2">
                    {(proposal.before_you_send || []).map((w, i) => <li key={i} className="text-xs text-white/80 leading-relaxed">• {w}</li>)}
                  </ul>
                </div>
              </section>

              {(proposal.key_changes || []).length > 0 && (
                <section className="mb-8 rounded-2xl border border-violet-500/20 bg-[#12062a]/40 p-5">
                  <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/50 mb-2.5">What FORGE changed</p>
                  <ul className="space-y-1.5">
                    {(proposal.key_changes || []).map((k, i) => <li key={i} className="text-xs text-white/75 leading-relaxed">• {k}</li>)}
                  </ul>
                </section>
              )}
            </>
          )}

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-base font-semibold mb-1">Your proposals</h2>
                <p className="text-xs text-violet-200/50">Drafts, sent, and past proposals.</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={inputClass + " max-w-[180px]"} />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass + " max-w-[140px]"}>
                  <option value="">All statuses</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="replied">Replied</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-violet-200/50">Loading...</p>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/50 px-6 py-12 text-center">
                <p className="text-sm text-white/75">No proposals yet.</p>
                <p className="text-xs text-violet-200/50 mt-1.5">Generate your first one above.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((p) => (
                  <div key={p.id} className="rounded-xl border border-violet-500/20 bg-[#170a34]/60 hover:border-violet-400/40 transition p-4 flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px] cursor-pointer" onClick={() => openExisting(p)}>
                      <p className="text-sm text-white/90 font-medium">{p.title || "Untitled proposal"}</p>
                      <p className="text-[11px] text-violet-200/50 mt-0.5">{new Date(p.created_at).toLocaleDateString()} · {p.word_count || 0} words · {p.status}</p>
                    </div>
                    <button type="button" onClick={() => openExisting(p)} className="text-xs text-cyan-400 hover:text-cyan-300 transition">Open</button>
                    <button type="button" onClick={() => deleteProposal(p.id)} className="text-xs text-violet-200/60 hover:text-red-400 transition">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-12">Freelance Forge AI - by FORGE</p>
        </main>
      </div>
    </div>
  );
}
