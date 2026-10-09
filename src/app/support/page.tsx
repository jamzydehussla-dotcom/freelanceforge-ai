"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["Bug", "Feedback", "Feature request", "Billing", "Account", "Other"] as const;
type Category = (typeof CATEGORIES)[number];

type SupportMessage = {
  id: string;
  category: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

export default function SupportPage() {
  const [loading, setLoading] = useState(true);
  const [planLabel, setPlanLabel] = useState("Free");
  const [category, setCategory] = useState<Category>("Bug");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([]);

  async function loadMessages() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;
    const { data } = await supabase
      .from("support_messages")
      .select("id, category, subject, message, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setMessages((data as SupportMessage[]) || []);
  }

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) { if (active) setLoading(false); return; }
      const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
      if (active && profile?.plan) setPlanLabel(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));
      await loadMessages();
      if (active) setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!subject.trim() || !message.trim()) {
      setError("Please add a subject and a message.");
      return;
    }
    setSubmitting(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setSubmitting(false); return; }
    const { error: insErr } = await supabase.from("support_messages").insert({
      user_id: user.id,
      category,
      subject: subject.trim(),
      message: message.trim(),
    });
    setSubmitting(false);
    if (insErr) { setError(insErr.message); return; }
    setSubject("");
    setMessage("");
    setCategory("Bug");
    setSuccess(true);
    await loadMessages();
    setTimeout(() => setSuccess(false), 4000);
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
            <h1 className="text-lg font-semibold tracking-tight">Support</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">We read every message</span>
        </header>
        <main className="flex-1 px-6 md:px-10 py-10 max-w-3xl w-full">
          {loading ? (
            <p className="text-sm text-violet-200/50">Loading...</p>
          ) : (
            <div className="space-y-10">
              <section>
                <p className="text-sm text-violet-200/65 leading-relaxed">
                  Send us a bug, a suggestion, a feature request, or a question. Your message goes directly to the FORGE support team, and only your own submissions are visible to you here.
                </p>
              </section>

              <section className="rounded-2xl border border-violet-500/25 bg-[#170a34]/70 backdrop-blur-sm p-7 space-y-6">
                <div>
                  <h2 className="text-base font-semibold mb-1">Send a message</h2>
                  <p className="text-xs text-violet-200/50">Choose a category and describe what you need.</p>
                </div>

                <div>
                  <label className={labelClass}>Category</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => {
                      const active = c === category;
                      return (
                        <button key={c} type="button" onClick={() => setCategory(c)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (active ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_15px_-4px_rgba(34,211,238,0.7)]" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>{c}</button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Subject</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="A short summary" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="Describe your issue or suggestion in detail..." className={inputClass + " resize-none"} />
                </div>

                {error && (
                  <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">{error}</p>
                )}
                {success && (
                  <p className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-3 py-2">Message sent. Thank you.</p>
                )}

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <button type="button" onClick={handleSubmit} disabled={submitting} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{submitting ? "Sending..." : "Send message"}</button>
                  <span className="text-[11px] text-violet-200/40">Support team access is being set up.</span>
                </div>
              </section>

              <section className="space-y-4">
                <div>
                  <h2 className="text-base font-semibold mb-1">Your recent messages</h2>
                  <p className="text-xs text-violet-200/50">Only you can see your submissions.</p>
                </div>
                {messages.length === 0 ? (
                  <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 px-5 py-8 text-center">
                    <p className="text-sm text-white/70">You have not sent anything yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((m) => {
                      const statusLabel = m.status === "in_review" ? "In review" : m.status === "resolved" ? "Resolved" : "New";
                      const statusColor = m.status === "resolved" ? "text-emerald-300 border-emerald-400/30" : m.status === "in_review" ? "text-amber-300 border-amber-400/30" : "text-cyan-300 border-cyan-400/30";
                      return (
                        <div key={m.id} className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 p-5">
                          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                            <div>
                              <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/50 mb-1">{m.category}</p>
                              <p className="text-sm text-white/90 font-medium">{m.subject}</p>
                            </div>
                            <span className={"text-[10px] tracking-[0.15em] uppercase border rounded-full px-2.5 py-1 " + statusColor}>{statusLabel}</span>
                          </div>
                          <p className="text-xs text-violet-200/60 whitespace-pre-wrap leading-relaxed mt-2">{m.message}</p>
                          <p className="text-[10px] text-violet-200/35 mt-3">{new Date(m.created_at).toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-4">Freelance Forge AI - by FORGE</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
