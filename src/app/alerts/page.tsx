"use client";

import { useEffect, useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import ForgeAI from "@/components/ForgeAI";
import { supabase } from "@/lib/supabase";

type Alert = {
  id: string;
  type: string;
  priority: string;
  title: string;
  body: string | null;
  action_label: string | null;
  action_url: string | null;
  read: boolean;
  read_at: string | null;
  archived: boolean;
  archived_at: string | null;
  created_at: string;
};

type Prefs = {
  notify_account: boolean;
  notify_security: boolean;
  notify_platform: boolean;
  notify_reminders: boolean;
  notify_opportunities: boolean;
  email_enabled: boolean;
  email_digest: string;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
};

const PRIORITIES = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
  { key: "standard", label: "Standard" },
];

const TYPES = [
  { key: "all", label: "All types" },
  { key: "account", label: "Account" },
  { key: "security", label: "Security" },
  { key: "platform", label: "Platform" },
  { key: "reminders", label: "Reminders" },
  { key: "opportunities", label: "Opportunities" },
];

const PRIORITY_STYLE: Record<string, string> = {
  critical: "text-red-300 border-red-400/40 bg-red-400/5",
  high: "text-amber-300 border-amber-400/40 bg-amber-400/5",
  standard: "text-violet-200/70 border-violet-500/25 bg-violet-500/5",
};

function relativeTime(iso: string): string {
  const d = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - d);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return min + "m ago";
  const hr = Math.floor(min / 60);
  if (hr < 24) return hr + "h ago";
  const day = Math.floor(hr / 24);
  if (day < 7) return day + "d ago";
  return new Date(iso).toLocaleDateString();
}

export default function AlertsPage() {
  const [loading, setLoading] = useState(true);
  const [planLabel, setPlanLabel] = useState("Free");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [tab, setTab] = useState<"inbox" | "archived">("inbox");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [readFilter, setReadFilter] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  async function load() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setLoading(false); return; }

    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
    if (profile?.plan) setPlanLabel(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));

    const { data: alertsData } = await supabase
      .from("alerts")
      .select("*")
      .order("created_at", { ascending: false });
    setAlerts((alertsData as Alert[]) || []);

    const { data: prefsData } = await supabase
      .from("alert_preferences")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (prefsData) {
      setPrefs(prefsData as Prefs);
    } else {
      const defaults: Prefs = {
        notify_account: true,
        notify_security: true,
        notify_platform: true,
        notify_reminders: true,
        notify_opportunities: true,
        email_enabled: false,
        email_digest: "weekly",
        quiet_hours_start: null,
        quiet_hours_end: null,
      };
      await supabase.from("alert_preferences").insert({ user_id: user.id, ...defaults });
      setPrefs(defaults);
    }

    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const visible = useMemo(() => {
    return alerts.filter((a) => {
      if (tab === "inbox" && a.archived) return false;
      if (tab === "archived" && !a.archived) return false;
      if (priorityFilter !== "all" && a.priority !== priorityFilter) return false;
      if (typeFilter !== "all" && a.type !== typeFilter) return false;
      if (readFilter === "unread" && a.read) return false;
      if (readFilter === "read" && !a.read) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = ((a.title || "") + " " + (a.body || "")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [alerts, tab, priorityFilter, typeFilter, readFilter, search]);

  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return {
      unread: alerts.filter((a) => !a.read && !a.archived).length,
      critical: alerts.filter((a) => a.priority === "critical" && !a.archived).length,
      week: alerts.filter((a) => new Date(a.created_at).getTime() > weekAgo).length,
      total: alerts.filter((a) => !a.archived).length,
    };
  }, [alerts]);

  async function markRead(a: Alert, read: boolean) {
    await supabase.from("alerts").update({ read, read_at: read ? new Date().toISOString() : null }).eq("id", a.id);
    setAlerts((prev) => prev.map((x) => x.id === a.id ? { ...x, read, read_at: read ? new Date().toISOString() : null } : x));
  }

  async function archive(a: Alert, archived: boolean) {
    await supabase.from("alerts").update({ archived, archived_at: archived ? new Date().toISOString() : null }).eq("id", a.id);
    setAlerts((prev) => prev.map((x) => x.id === a.id ? { ...x, archived, archived_at: archived ? new Date().toISOString() : null } : x));
    if (openId === a.id) setOpenId(null);
  }

  async function markAllRead() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;
    await supabase.from("alerts").update({ read: true, read_at: new Date().toISOString() }).eq("user_id", user.id).eq("read", false).eq("archived", false);
    setAlerts((prev) => prev.map((x) => !x.archived ? { ...x, read: true } : x));
  }

  async function markAllUnread() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;
    await supabase.from("alerts").update({ read: false, read_at: null }).eq("user_id", user.id).eq("archived", false);
    setAlerts((prev) => prev.map((x) => !x.archived ? { ...x, read: false } : x));
  }

  async function savePrefs() {
    if (!prefs) return;
    setSavingPrefs(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setSavingPrefs(false); return; }
    await supabase.from("alert_preferences").upsert({ user_id: user.id, ...prefs, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    setSavingPrefs(false);
  }

  function togglePref(key: keyof Prefs) {
    if (!prefs) return;
    setPrefs({ ...prefs, [key]: !prefs[key] } as Prefs);
  }

  const inputClass = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : planLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Alerts</h1>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setShowPrefs(true)} className="text-xs text-violet-200/70 hover:text-white transition border border-violet-500/25 rounded-lg px-3 py-1.5">Preferences</button>
            <span className="text-xs text-violet-200/60 hidden md:inline">Stay informed. Stay in control.</span>
          </div>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8 max-w-6xl w-full">

          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Unread", value: stats.unread },
              { label: "Critical", value: stats.critical },
              { label: "This week", value: stats.week },
              { label: "In inbox", value: stats.total },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-violet-500/20 bg-[#170a34]/70 p-4">
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-1.5">{s.label}</p>
                <p className="text-2xl font-semibold text-white/90">{s.value}</p>
              </div>
            ))}
          </section>

          <section className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-1 border border-violet-500/25 rounded-lg p-1">
              <button type="button" onClick={() => setTab("inbox")} className={"px-3 py-1.5 rounded-md text-xs transition " + (tab === "inbox" ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>Inbox</button>
              <button type="button" onClick={() => setTab("archived")} className={"px-3 py-1.5 rounded-md text-xs transition " + (tab === "archived" ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>Archived</button>
            </div>
            <div className="flex items-center gap-1 border border-violet-500/25 rounded-lg p-1">
              {PRIORITIES.map((p) => (
                <button key={p.key} type="button" onClick={() => setPriorityFilter(p.key)} className={"px-3 py-1.5 rounded-md text-xs transition " + (priorityFilter === p.key ? "bg-violet-500/20 text-white" : "text-violet-200/60 hover:text-white")}>{p.label}</button>
              ))}
            </div>
            <div className="flex-1" />
            <button type="button" onClick={markAllRead} className="text-xs text-violet-200/70 hover:text-white transition px-3 py-2">Mark all read</button>
            <button type="button" onClick={markAllUnread} className="text-xs text-violet-200/70 hover:text-white transition px-3 py-2">Mark all unread</button>
          </section>

          <section className="flex items-center gap-2 mb-6 flex-wrap">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search alerts..." className={inputClass + " max-w-sm"} />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={inputClass + " max-w-[170px]"}>
              {TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
            <select value={readFilter} onChange={(e) => setReadFilter(e.target.value as any)} className={inputClass + " max-w-[140px]"}>
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </section>

          {loading ? (
            <p className="text-sm text-violet-200/50">Loading...</p>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/50 px-6 py-16 text-center">
              <div className="mx-auto mb-4"><ForgeAI size={32} /></div>
              {alerts.length === 0 ? (
                <>
                  <p className="text-base font-medium text-white/85">Your alert center is ready.</p>
                  <p className="text-xs text-violet-200/50 mt-2">Notifications will appear here as the platform grows.</p>
                </>
              ) : (
                <>
                  <p className="text-base font-medium text-white/85">No alerts match the current filters.</p>
                  <p className="text-xs text-violet-200/50 mt-2">Try adjusting filters or clearing search.</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {visible.map((a) => {
                const isOpen = openId === a.id;
                const pStyle = PRIORITY_STYLE[a.priority] || PRIORITY_STYLE.standard;
                return (
                  <div key={a.id} className={"rounded-xl border bg-[#170a34]/60 transition " + (a.read ? "border-violet-500/15" : "border-violet-400/35")}>
                    <div onClick={() => { setOpenId(isOpen ? null : a.id); if (!a.read) markRead(a, true); }} className="p-4 flex items-center gap-4 flex-wrap cursor-pointer">
                      <div className="flex items-center gap-3">
                        {!a.read && <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />}
                        {a.read && <span className="h-2 w-2 rounded-full bg-transparent" />}
                      </div>
                      <div className="flex-1 min-w-[180px]">
                        <p className={"text-sm " + (a.read ? "text-white/70" : "text-white/95 font-medium")}>{a.title}</p>
                        <p className="text-[11px] text-violet-200/50 mt-0.5">{a.type} · {relativeTime(a.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={"text-[10px] tracking-wider uppercase border rounded-full px-2.5 py-1 " + pStyle}>{a.priority}</span>
                        {a.archived && <span className="text-[10px] tracking-wider uppercase text-violet-200/40 border border-violet-500/20 rounded-full px-2.5 py-1">Archived</span>}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="px-4 pb-4 border-t border-violet-500/15 pt-4">
                        {a.body && <p className="text-xs text-white/75 whitespace-pre-wrap leading-relaxed mb-3">{a.body}</p>}
                        <div className="flex items-center gap-3 flex-wrap">
                          {a.action_url && a.action_label && (
                            <a href={a.action_url} className="text-xs font-semibold text-black px-4 py-2 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)" }}>{a.action_label}</a>
                          )}
                          <button type="button" onClick={() => markRead(a, !a.read)} className="text-xs text-violet-100/70 hover:text-white transition px-3 py-2 rounded-lg border border-violet-500/25">{a.read ? "Mark unread" : "Mark read"}</button>
                          <button type="button" onClick={() => archive(a, !a.archived)} className="text-xs text-violet-100/70 hover:text-white transition px-3 py-2 rounded-lg border border-violet-500/25">{a.archived ? "Restore" : "Archive"}</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-12">Freelance Forge AI - by FORGE</p>
        </main>
      </div>

      {showPrefs && prefs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPrefs(false)} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-violet-500/30 bg-[#170a34] p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Alert preferences</h2>
              <button type="button" onClick={() => setShowPrefs(false)} className="p-2 rounded-lg text-violet-200/60 hover:text-white hover:bg-violet-500/10">✕</button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-3">Notification categories</p>
                <div className="space-y-2">
                  {[
                    { key: "notify_account", label: "Account", desc: "Login, signup, plan changes" },
                    { key: "notify_security", label: "Security", desc: "Password, sessions, unusual activity" },
                    { key: "notify_platform", label: "Platform", desc: "New features, updates, announcements" },
                    { key: "notify_reminders", label: "Reminders", desc: "Deadlines, follow-ups, tasks" },
                    { key: "notify_opportunities", label: "Opportunities", desc: "New listings and matches (when radar is live)" },
                  ].map((row) => (
                    <label key={row.key} className="flex items-center justify-between gap-4 rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3 cursor-pointer">
                      <div>
                        <p className="text-sm text-white/85">{row.label}</p>
                        <p className="text-[11px] text-violet-200/50 mt-0.5">{row.desc}</p>
                      </div>
                      <input type="checkbox" checked={(prefs as any)[row.key]} onChange={() => togglePref(row.key as keyof Prefs)} className="accent-cyan-400 h-4 w-4" />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-3">Email notifications</p>
                <label className="flex items-center justify-between gap-4 rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3 cursor-pointer mb-3">
                  <div>
                    <p className="text-sm text-white/85">Enable email alerts</p>
                    <p className="text-[11px] text-violet-200/50 mt-0.5">Email delivery is being set up</p>
                  </div>
                  <input type="checkbox" checked={prefs.email_enabled} onChange={() => togglePref("email_enabled")} className="accent-cyan-400 h-4 w-4" />
                </label>
                {prefs.email_enabled && (
                  <select value={prefs.email_digest} onChange={(e) => setPrefs({ ...prefs, email_digest: e.target.value })} className={inputClass}>
                    <option value="instant">Instant</option>
                    <option value="daily">Daily digest</option>
                    <option value="weekly">Weekly digest</option>
                  </select>
                )}
              </div>

              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-violet-300/50 mb-3">Quiet hours</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-violet-200/70 mb-1.5">From</label>
                    <input type="time" value={prefs.quiet_hours_start || ""} onChange={(e) => setPrefs({ ...prefs, quiet_hours_start: e.target.value || null })} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[11px] text-violet-200/70 mb-1.5">To</label>
                    <input type="time" value={prefs.quiet_hours_end || ""} onChange={(e) => setPrefs({ ...prefs, quiet_hours_end: e.target.value || null })} className={inputClass} />
                  </div>
                </div>
                <p className="text-[11px] text-violet-200/45 mt-2">No alerts will be delivered during quiet hours.</p>
              </div>

              <div className="flex items-center gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowPrefs(false)} className="text-sm text-violet-100/70 hover:text-white px-5 py-2.5 rounded-lg border border-violet-500/25 transition">Close</button>
                <button type="button" onClick={savePrefs} disabled={savingPrefs} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{savingPrefs ? "Saving..." : "Save preferences"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
