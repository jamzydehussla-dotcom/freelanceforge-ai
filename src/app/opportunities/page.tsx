"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ForgeAI from "@/components/ForgeAI";
import { supabase } from "@/lib/supabase";
import {
  SOURCES,
  WORK_TYPES,
  BUDGET_BUCKETS,
  STATUSES,
  EMPTY_FORM,
  type Opportunity,
  type OppStatus,
  type SignalData,
} from "@/lib/opportunities";

const EXPERIENCE_LEVELS = ["Entry Level", "Intermediate", "Expert"];
const CATEGORIES = ["Writing & Content", "Design", "Marketing", "Development", "Virtual Assistance", "AI & Data", "Education"];

const inputClass = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";
const labelClass = "block text-[11px] tracking-wide text-violet-200/70 mb-1.5";

export default function OpportunitiesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [planLabel, setPlanLabel] = useState("Free");
  const [items, setItems] = useState<Opportunity[]>([]);
  const [view, setView] = useState<"list" | "board">("list");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [openDetail, setOpenDetail] = useState<Opportunity | null>(null);
  const [form, setForm] = useState<any>({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterWorkType, setFilterWorkType] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [extracting, setExtracting] = useState<string | null>(null);

  async function load() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setLoading(false); return; }
    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
    if (profile?.plan) setPlanLabel(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));
    const { data } = await supabase.from("opportunities").select("*").order("created_at", { ascending: false });
    setItems((data as Opportunity[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return items.filter((o) => {
      if (search) {
        const q = search.toLowerCase();
        const hay = ((o.role || "") + " " + (o.company || "") + " " + (o.client_name || "") + " " + (o.description || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filterCategory && o.category !== filterCategory) return false;
      if (filterWorkType && o.work_type !== filterWorkType) return false;
      if (filterExperience && o.experience_level !== filterExperience) return false;
      if (filterStatus && o.status !== filterStatus) return false;
      if (filterSource && o.source !== filterSource) return false;
      if (filterBudget) {
        const b = BUDGET_BUCKETS.find((x) => x.label === filterBudget);
        if (b) {
          const max = o.budget_max ?? o.budget_min ?? 0;
          if (max < b.min || max > b.max) return false;
        }
      }
      return true;
    });
  }, [items, search, filterCategory, filterWorkType, filterExperience, filterStatus, filterSource, filterBudget]);

  const stats = useMemo(() => ({
    saved: items.length,
    considering: items.filter((i) => i.status === "considering").length,
    applied: items.filter((i) => i.status === "applied").length,
    won: items.filter((i) => i.status === "won").length,
  }), [items]);

  function openAdd() { setEditing(null); setForm({ ...EMPTY_FORM }); setShowAdd(true); setError(""); }
  function openEdit(o: Opportunity) {
    setEditing(o);
    setForm({
      role: o.role || "", company: o.company || "", client_name: o.client_name || "",
      source: o.source || "", source_url: o.source_url || "", category: o.category || "",
      work_type: o.work_type || "", experience_level: o.experience_level || "",
      budget_min: o.budget_min?.toString() || "", budget_max: o.budget_max?.toString() || "",
      budget_currency: o.budget_currency || "USD", posted_date: o.posted_date || "",
      deadline: o.deadline || "", description: o.description || "", key_requirements: o.key_requirements || "",
      notes: o.notes || "", status: o.status as OppStatus,
    });
    setShowAdd(true); setError("");
  }

  async function handleSave() {
    setError("");
    if (!form.role.trim() && !form.company.trim()) { setError("Add at least a role or company."); return; }
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setSaving(false); return; }
    const payload: any = {
      user_id: user.id,
      role: form.role.trim() || null,
      company: form.company.trim() || null,
      client_name: form.client_name.trim() || null,
      source: form.source || null,
      source_url: form.source_url.trim() || null,
      category: form.category || null,
      work_type: form.work_type || null,
      experience_level: form.experience_level || null,
      budget_min: form.budget_min ? parseInt(form.budget_min, 10) : null,
      budget_max: form.budget_max ? parseInt(form.budget_max, 10) : null,
      budget_currency: form.budget_currency || "USD",
      posted_date: form.posted_date || null,
      deadline: form.deadline || null,
      description: form.description.trim() || null,
      key_requirements: form.key_requirements.trim() || null,
      notes: form.notes.trim() || null,
      status: form.status,
      updated_at: new Date().toISOString(),
    };
    let err;
    if (editing) {
      const r = await supabase.from("opportunities").update(payload).eq("id", editing.id);
      err = r.error;
    } else {
      const r = await supabase.from("opportunities").insert(payload);
      err = r.error;
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    setShowAdd(false); setEditing(null); await load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this opportunity?")) return;
    await supabase.from("opportunities").delete().eq("id", id);
    setOpenDetail(null);
    await load();
  }

  async function changeStatus(o: Opportunity, status: OppStatus) {
    await supabase.from("opportunities").update({ status, updated_at: new Date().toISOString() }).eq("id", o.id);
    await load();
    if (openDetail && openDetail.id === o.id) setOpenDetail({ ...o, status });
  }

  async function runExtract(o: Opportunity) {
    setExtracting(o.id);
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: "extract",
          input: {
            role: o.role || "", company: o.company || "", industry: o.category || "",
            seniority: o.experience_level || "", employmentType: o.work_type || "",
            workArrangement: o.work_type || "",
            keyRequirements: o.key_requirements || "",
            jobDescription: o.description || "",
          },
        }),
      });
      const data = await res.json();
      if (data.ok) {
        await supabase.from("opportunities").update({ signals: data.data, updated_at: new Date().toISOString() }).eq("id", o.id);
        await load();
        setOpenDetail((prev) => prev && prev.id === o.id ? { ...prev, signals: data.data } : prev);
      } else {
        alert(data.error || "Extraction failed");
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "Extraction failed");
    }
    setExtracting(null);
  }

  function tailorCV(o: Opportunity) {
    const params = new URLSearchParams();
    if (o.role) params.set("role", o.role);
    if (o.company) params.set("company", o.company);
    if (o.category) params.set("industry", o.category);
    if (o.experience_level) params.set("seniority", o.experience_level);
    if (o.work_type) params.set("employmentType", o.work_type);
    if (o.key_requirements) params.set("keyRequirements", o.key_requirements);
    if (o.description) params.set("jobDescription", o.description);
    router.push("/cv-tailor?" + params.toString());
  }

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : planLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Opportunities</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">Your opportunity pipeline</span>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8 max-w-7xl w-full">

          <section className="rounded-xl border border-violet-500/25 bg-[#170a34]/60 px-5 py-4 flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-center gap-3">
              <ForgeAI size={22} label="FORGE RADAR" />
            </div>
            <span className="text-xs text-violet-200/55 flex-1 min-w-[200px]">Auto-discovery of new listings is being built. Add opportunities manually for now - FORGE extracts the signals.</span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-violet-200/50 border border-violet-500/25 rounded-full px-3 py-1.5">Radar coming soon</span>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Saved", value: stats.saved },
              { label: "Considering", value: stats.considering },
              { label: "Applied", value: stats.applied },
              { label: "Won", value: stats.won },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-violet-500/20 bg-[#170a34]/70 p-4">
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-1.5">{s.label}</p>
                <p className="text-2xl font-semibold text-white/90">{s.value}</p>
              </div>
            ))}
          </section>

          <section className="flex items-center gap-3 mb-5 flex-wrap">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search role, company, notes..." className={inputClass + " max-w-sm"} />
            <div className="flex items-center gap-1 border border-violet-500/25 rounded-lg p-1">
              <button type="button" onClick={() => setView("list")} className={"px-3 py-1.5 rounded-md text-xs transition " + (view === "list" ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>List</button>
              <button type="button" onClick={() => setView("board")} className={"px-3 py-1.5 rounded-md text-xs transition " + (view === "board" ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>Board</button>
            </div>
            <div className="flex-1" />
            <button type="button" onClick={openAdd} className="text-sm font-semibold text-black px-5 py-2.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>+ Add opportunity</button>
          </section>

          <section className="flex items-center gap-2 mb-6 flex-wrap">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={inputClass + " max-w-[180px]"}>
              <option value="">All categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterWorkType} onChange={(e) => setFilterWorkType(e.target.value)} className={inputClass + " max-w-[160px]"}>
              <option value="">All work types</option>
              {WORK_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterExperience} onChange={(e) => setFilterExperience(e.target.value)} className={inputClass + " max-w-[160px]"}>
              <option value="">All levels</option>
              {EXPERIENCE_LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterBudget} onChange={(e) => setFilterBudget(e.target.value)} className={inputClass + " max-w-[160px]"}>
              <option value="">Any budget</option>
              {BUDGET_BUCKETS.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={inputClass + " max-w-[140px]"}>
              <option value="">All statuses</option>
              {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
            <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className={inputClass + " max-w-[140px]"}>
              <option value="">All sources</option>
              {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {(search || filterCategory || filterWorkType || filterExperience || filterBudget || filterStatus || filterSource) && (
              <button type="button" onClick={() => { setSearch(""); setFilterCategory(""); setFilterWorkType(""); setFilterExperience(""); setFilterBudget(""); setFilterStatus(""); setFilterSource(""); }} className="text-xs text-violet-200/60 hover:text-red-400 transition px-3 py-2.5">Clear filters</button>
            )}
          </section>

          {loading ? (
            <p className="text-sm text-violet-200/50">Loading...</p>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/50 px-6 py-16 text-center">
              <div className="mx-auto mb-4"><ForgeAI size={32} /></div>
              <p className="text-base font-medium text-white/85">No opportunities yet.</p>
              <p className="text-xs text-violet-200/50 mt-2 mb-6">Add a job posting and FORGE will extract the signals.</p>
              <button type="button" onClick={openAdd} className="text-sm font-semibold text-black px-5 py-2.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)" }}>+ Add opportunity</button>
            </div>
          ) : view === "list" ? (
            <div className="space-y-2">
              {filtered.map((o) => {
                const st = STATUSES.find((s) => s.key === o.status) || STATUSES[0];
                return (
                  <div key={o.id} className="rounded-xl border border-violet-500/20 bg-[#170a34]/60 hover:border-violet-400/40 transition p-4 flex items-center gap-4 flex-wrap cursor-pointer" onClick={() => setOpenDetail(o)}>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-white/90 font-medium">{o.role || "Untitled role"}</p>
                      <p className="text-xs text-violet-200/55 mt-0.5">{o.company || "Unknown company"}{o.source ? " · " + o.source : ""}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {o.category && <span className="text-[10px] tracking-wider uppercase text-violet-200/60 border border-violet-500/25 rounded-full px-2.5 py-1">{o.category}</span>}
                      {(o.budget_min || o.budget_max) && <span className="text-[10px] tracking-wider uppercase text-cyan-200/80 border border-cyan-400/25 rounded-full px-2.5 py-1">{o.budget_currency} {o.budget_min || 0}{o.budget_max ? "–" + o.budget_max : "+"}</span>}
                      <span className={"text-[10px] tracking-wider uppercase border rounded-full px-2.5 py-1 " + st.chip}>{st.label}</span>
                    </div>
                    <button type="button" onClick={(e) => { e.stopPropagation(); tailorCV(o); }} className="text-xs text-cyan-400 hover:text-cyan-300 transition">Tailor CV →</button>
                  </div>
                );
              })}
              {filtered.length === 0 && <p className="text-xs text-violet-200/50 px-2 py-6">No matches for the current filters.</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {STATUSES.map((s) => {
                const col = filtered.filter((o) => o.status === s.key);
                return (
                  <div key={s.key} className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 p-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-violet-200/60 mb-2 px-1">{s.label} · {col.length}</p>
                    <div className="space-y-2">
                      {col.map((o) => (
                        <div key={o.id} onClick={() => setOpenDetail(o)} className="rounded-lg border border-violet-500/15 bg-[#170a34]/70 p-3 cursor-pointer hover:border-violet-400/40 transition">
                          <p className="text-xs text-white/85 font-medium leading-snug">{o.role || "Untitled"}</p>
                          <p className="text-[11px] text-violet-200/50 mt-1">{o.company || "-"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-12">Freelance Forge AI - by FORGE</p>
        </main>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowAdd(false); setEditing(null); }} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-violet-500/30 bg-[#170a34] p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{editing ? "Edit opportunity" : "Add opportunity"}</h2>
              <button type="button" onClick={() => { setShowAdd(false); setEditing(null); }} className="p-2 rounded-lg text-violet-200/60 hover:text-white hover:bg-violet-500/10">✕</button>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Role</label><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Senior Frontend Engineer" className={inputClass} /></div>
                <div><label className={labelClass}>Company</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Acme Ltd" className={inputClass} /></div>
                <div><label className={labelClass}>Client name (optional)</label><input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} placeholder="e.g. Sarah from Acme" className={inputClass} /></div>
                <div><label className={labelClass}>Source</label><select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className={inputClass}><option value="">Select source...</option>{SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                <div className="md:col-span-2"><label className={labelClass}>Source URL</label><input value={form.source_url} onChange={(e) => setForm({ ...form, source_url: e.target.value })} placeholder="https://..." className={inputClass} /></div>
                <div><label className={labelClass}>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}><option value="">Select...</option>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Work type</label><select value={form.work_type} onChange={(e) => setForm({ ...form, work_type: e.target.value })} className={inputClass}><option value="">Select...</option>{WORK_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Experience level</label><select value={form.experience_level} onChange={(e) => setForm({ ...form, experience_level: e.target.value })} className={inputClass}><option value="">Select...</option>{EXPERIENCE_LEVELS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className={labelClass}>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>{STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}</select></div>
                <div><label className={labelClass}>Budget min</label><input value={form.budget_min} onChange={(e) => setForm({ ...form, budget_min: e.target.value })} placeholder="e.g. 500" className={inputClass} /></div>
                <div><label className={labelClass}>Budget max</label><input value={form.budget_max} onChange={(e) => setForm({ ...form, budget_max: e.target.value })} placeholder="e.g. 1500" className={inputClass} /></div>
                <div><label className={labelClass}>Currency</label><input value={form.budget_currency} onChange={(e) => setForm({ ...form, budget_currency: e.target.value })} placeholder="USD" className={inputClass} /></div>
                <div><label className={labelClass}>Posted date</label><input type="date" value={form.posted_date} onChange={(e) => setForm({ ...form, posted_date: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Deadline</label><input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>Key requirements</label><textarea rows={3} value={form.key_requirements} onChange={(e) => setForm({ ...form, key_requirements: e.target.value })} placeholder="Skills and requirements from the posting..." className={inputClass + " resize-none"} /></div>
              <div><label className={labelClass}>Job description</label><textarea rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Paste the job posting here..." className={inputClass + " resize-none"} /></div>
              <div><label className={labelClass}>Notes (private)</label><textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Your own notes..." className={inputClass + " resize-none"} /></div>
              {error && <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">{error}</p>}
              <div className="flex items-center gap-3 justify-end">
                <button type="button" onClick={() => { setShowAdd(false); setEditing(null); }} className="text-sm text-violet-100/70 hover:text-white px-5 py-2.5 rounded-lg border border-violet-500/25 transition">Cancel</button>
                <button type="button" onClick={handleSave} disabled={saving} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{saving ? "Saving..." : editing ? "Save changes" : "Add opportunity"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openDetail && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpenDetail(null)} />
          <div className="relative w-full max-w-xl h-full bg-[#170a34] border-l border-violet-500/30 overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-10 bg-[#170a34]/95 backdrop-blur-xl border-b border-violet-500/20 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-1">Opportunity</p>
                <h2 className="text-base font-semibold text-white">{openDetail.role || "Untitled role"}</h2>
                <p className="text-xs text-violet-200/55 mt-0.5">{openDetail.company || "-"}{openDetail.source ? " · " + openDetail.source : ""}</p>
              </div>
              <button type="button" onClick={() => setOpenDetail(null)} className="p-2 rounded-lg text-violet-200/60 hover:text-white hover:bg-violet-500/10">✕</button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className={labelClass}>Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => {
                    const active = openDetail.status === s.key;
                    return (
                      <button key={s.key} type="button" onClick={() => changeStatus(openDetail, s.key)} className={"px-3 py-1.5 rounded-full text-xs transition border " + (active ? s.chip : "text-violet-200/50 border-violet-500/20 hover:text-white hover:border-violet-400/40")}>{s.label}</button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button type="button" onClick={() => tailorCV(openDetail)} className="text-sm font-semibold text-black px-5 py-2.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>Tailor CV for this</button>
                <button type="button" onClick={() => runExtract(openDetail)} disabled={extracting === openDetail.id} className="text-sm text-violet-100/80 hover:text-white px-4 py-2.5 rounded-lg border border-violet-500/30 hover:border-violet-400/50 transition disabled:opacity-60">{extracting === openDetail.id ? "Extracting..." : openDetail.signals ? "Re-extract signals" : "Extract signals with FORGE"}</button>
                <button type="button" onClick={() => openEdit(openDetail)} className="text-sm text-violet-100/70 hover:text-white px-4 py-2.5 rounded-lg border border-violet-500/20 transition">Edit</button>
                <button type="button" onClick={() => handleDelete(openDetail.id)} className="text-sm text-violet-200/60 hover:text-red-400 px-4 py-2.5 transition">Delete</button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {openDetail.work_type && <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3"><p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Work type</p><p className="text-sm text-white/85">{openDetail.work_type}</p></div>}
                {openDetail.experience_level && <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3"><p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Level</p><p className="text-sm text-white/85">{openDetail.experience_level}</p></div>}
                {openDetail.category && <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3"><p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Category</p><p className="text-sm text-white/85">{openDetail.category}</p></div>}
                {(openDetail.budget_min || openDetail.budget_max) && <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3"><p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Budget</p><p className="text-sm text-white/85">{openDetail.budget_currency} {openDetail.budget_min || 0}{openDetail.budget_max ? " – " + openDetail.budget_max : "+"}</p></div>}
                {openDetail.client_name && <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3"><p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Client</p><p className="text-sm text-white/85">{openDetail.client_name}</p></div>}
                {openDetail.deadline && <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3"><p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Deadline</p><p className="text-sm text-white/85">{openDetail.deadline}</p></div>}
              </div>

              {openDetail.source_url && (
                <a href={openDetail.source_url} target="_blank" rel="noopener noreferrer" className="block text-xs text-cyan-400 hover:text-cyan-300 break-all">{openDetail.source_url}</a>
              )}

              {openDetail.signals && (
                <div className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.4), rgba(139,92,246,0.25) 50%, rgba(236,72,153,0.4))" }}>
                  <div className="rounded-2xl bg-[#12062a]/90 p-5">
                    <div className="mb-4"><ForgeAI size={20} label="FORGE INTELLIGENCE" /></div>
                    {[
                      { key: "coreSkills", label: "Core skills" },
                      { key: "keywords", label: "Keywords" },
                      { key: "responsibilities", label: "Responsibilities" },
                      { key: "prioritySignals", label: "Priority signals" },
                    ].map((row) => {
                      const items = openDetail.signals?.[row.key] || [];
                      return (
                        <div key={row.key} className="py-3 border-b border-violet-500/15 last:border-0">
                          <p className="text-[10px] tracking-[0.14em] uppercase text-violet-200/60 mb-2">{row.label}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((s: string, i: number) => <span key={i} className="text-[11px] text-cyan-200/85 border border-cyan-400/25 bg-cyan-400/5 rounded-full px-2.5 py-1">{s}</span>)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {openDetail.description && (
                <div>
                  <p className={labelClass}>Job description</p>
                  <p className="text-xs text-white/75 whitespace-pre-wrap leading-relaxed rounded-lg border border-violet-500/15 bg-[#12062a]/50 p-4">{openDetail.description}</p>
                </div>
              )}

              {openDetail.key_requirements && (
                <div>
                  <p className={labelClass}>Key requirements</p>
                  <p className="text-xs text-white/75 whitespace-pre-wrap leading-relaxed rounded-lg border border-violet-500/15 bg-[#12062a]/50 p-4">{openDetail.key_requirements}</p>
                </div>
              )}

              {openDetail.notes && (
                <div>
                  <p className={labelClass}>Notes</p>
                  <p className="text-xs text-white/75 whitespace-pre-wrap leading-relaxed rounded-lg border border-violet-500/15 bg-[#12062a]/50 p-4">{openDetail.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
