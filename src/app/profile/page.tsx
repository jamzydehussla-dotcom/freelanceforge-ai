"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";
import { PRIMARY_FIELD_GROUPS, EXPERIENCE_LEVELS } from "@/lib/fields";

type Profile = {
  id: string;
  full_name: string | null;
  plan: string | null;
  role: string | null;
  account_status: string | null;
  created_at: string | null;
  headline: string | null;
  bio: string | null;
  location: string | null;
  primary_field: string | null;
  experience_level: string | null;
  skills: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [primaryField, setPrimaryField] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) { if (active) setLoading(false); return; }
      setEmail(user.email || "");
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (!active) return;
      if (data) {
        const p = data as Profile;
        setProfile(p);
        setFullName(p.full_name || "");
        setHeadline(p.headline || "");
        setBio(p.bio || "");
        setLocation(p.location || "");
        setPrimaryField(p.primary_field || "");
        setExperienceLevel(p.experience_level || "");
        setSkills(p.skills ? p.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : []);
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  function markDirty() { setDirty(true); setSavedAt(null); }

  function addSkill() {
    const s = skillInput.trim();
    if (!s) return;
    if (skills.includes(s)) { setSkillInput(""); return; }
    setSkills([...skills, s]);
    setSkillInput("");
    markDirty();
  }

  function removeSkill(s: string) {
    setSkills(skills.filter((x) => x !== s));
    markDirty();
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) { setSaving(false); return; }
    const { error: updateError } = await supabase.from("profiles").update({ full_name: fullName, headline: headline, bio: bio, location: location, primary_field: primaryField, experience_level: experienceLevel, skills: skills.join(", ") }).eq("id", user.id);
    setSaving(false);
    if (updateError) { setError(updateError.message); return; }
    setDirty(false);
    setSavedAt(Date.now());
    setProfile((prev) => prev ? { ...prev, full_name: fullName, headline: headline, bio: bio, location: location, primary_field: primaryField, experience_level: experienceLevel, skills: skills.join(", ") } : prev);
  }

  function discard() {
    if (!profile) return;
    setFullName(profile.full_name || "");
    setHeadline(profile.headline || "");
    setBio(profile.bio || "");
    setLocation(profile.location || "");
    setPrimaryField(profile.primary_field || "");
    setExperienceLevel(profile.experience_level || "");
    setSkills(profile.skills ? profile.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : []);
    setDirty(false);
    setSavedAt(null);
  }

  const planLabel = profile?.plan ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1) : "-";
  const initials = (profile?.full_name || "").split(" ").map((p: string) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const memberSince = profile?.created_at ? new Date(profile.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "-";

  const inputClass = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : planLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Profile</h1>
          </div>
          <span className="text-xs text-violet-200/60">Your professional identity</span>
        </header>
        <main className="flex-1 px-6 md:px-10 py-10 max-w-4xl w-full pb-32">
          {loading ? (
            <p className="text-sm text-violet-200/50">Loading...</p>
          ) : (
            <div className="space-y-12">
              <section className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full flex items-center justify-center text-2xl font-semibold text-white border border-violet-500/30" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.35), rgba(139,92,246,0.35) 50%, rgba(236,72,153,0.35))" }}>
                  {initials || "?"}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{fullName || "Unnamed"}</h2>
                  <p className="text-sm text-violet-200/60 mt-1">{headline || "Add a headline below"}</p>
                  <span className="inline-block mt-2 text-[10px] tracking-[0.15em] uppercase text-cyan-300 border border-cyan-400/30 rounded px-2 py-1">{planLabel}</span>
                </div>
              </section>
              <section className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold mb-1">Professional details</h3>
                  <p className="text-xs text-violet-200/50">These fields help Forge understand what you do and where you fit.</p>
                </div>
                <div>
                  <label className="block text-xs text-violet-200/70 mb-1.5">Full name</label>
                  <input value={fullName} onChange={(e) => { setFullName(e.target.value); markDirty(); }} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-violet-200/70 mb-1.5">Headline</label>
                  <input value={headline} onChange={(e) => { setHeadline(e.target.value); markDirty(); }} placeholder="e.g. Full-stack developer - Next.js, Supabase" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-violet-200/70 mb-1.5">Bio</label>
                  <textarea value={bio} onChange={(e) => { setBio(e.target.value); markDirty(); }} rows={4} placeholder="A short professional summary..." className={inputClass + " resize-none"} />
                </div>
                <div>
                  <label className="block text-xs text-violet-200/70 mb-1.5">Location</label>
                  <input value={location} onChange={(e) => { setLocation(e.target.value); markDirty(); }} placeholder="City, Country" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-violet-200/70 mb-1.5">Primary field</label>
                    <select value={primaryField} onChange={(e) => { setPrimaryField(e.target.value); markDirty(); }} className={inputClass}>
                      <option value="">Select a field...</option>
                      {PRIMARY_FIELD_GROUPS.map((g) => (
                        <optgroup key={g.group} label={g.group}>
                          {g.items.map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-violet-200/70 mb-1.5">Experience level</label>
                    <select value={experienceLevel} onChange={(e) => { setExperienceLevel(e.target.value); markDirty(); }} className={inputClass}>
                      <option value="">Select level...</option>
                      {EXPERIENCE_LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
              <section className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold mb-1">Skills</h3>
                  <p className="text-xs text-violet-200/50">Add the tools, languages and capabilities you work with.</p>
                </div>
                <div className="flex gap-2">
                  <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} placeholder="Type a skill and press Enter" className={inputClass} />
                  <button type="button" onClick={addSkill} className="shrink-0 px-4 rounded-lg border border-violet-500/30 text-sm text-violet-100/80 hover:text-white hover:border-violet-400/50 transition">Add</button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-violet-100/85 border border-violet-500/30 bg-violet-500/10">
                        {s}
                        <button type="button" onClick={() => removeSkill(s)} className="text-violet-200/50 hover:text-red-400 transition">x</button>
                      </span>
                    ))}
                  </div>
                )}
              </section>
              <section className="space-y-4 border-t border-violet-500/15 pt-8">
                <div>
                  <h3 className="text-base font-semibold mb-1">Account</h3>
                  <p className="text-xs text-violet-200/50">Managed by Forge. Contact support to change these.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/40 px-4 py-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/40 mb-1">Email</p>
                    <p className="text-sm text-white/80">{email || "-"}</p>
                  </div>
                  <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/40 px-4 py-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/40 mb-1">Plan</p>
                    <p className="text-sm text-white/80">{planLabel}</p>
                  </div>
                  <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/40 px-4 py-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/40 mb-1">Role</p>
                    <p className="text-sm text-white/80">{profile?.role || "user"}</p>
                  </div>
                  <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/40 px-4 py-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/40 mb-1">Member since</p>
                    <p className="text-sm text-white/80">{memberSince}</p>
                  </div>
                </div>
              </section>
              {error && (
                <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">{error}</p>
              )}
              {savedAt && !dirty && (
                <p className="text-xs text-emerald-300 text-center">Saved</p>
              )}
              <p className="text-center text-[11px] text-violet-200/25 tracking-wide">Freelance Forge AI - by FORGE</p>
            </div>
          )}
        </main>
      </div>
      {dirty && (
        <div className="fixed bottom-0 left-0 right-0 md:left-[240px] z-20 border-t border-violet-500/25 bg-[#13072b]/95 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-violet-200/70">Unsaved changes</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={discard} className="text-sm text-violet-100/70 hover:text-white px-4 py-2 rounded-lg border border-violet-500/25 transition">Discard</button>
            <button type="button" onClick={handleSave} disabled={saving} className="text-sm font-semibold text-black px-5 py-2 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>
              {saving ? "Saving..." : "Save profile"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
