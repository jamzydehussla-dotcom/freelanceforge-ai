"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";

const SECTIONS = [
  { key: "account", label: "Account", live: true },
  { key: "security", label: "Security", live: true },
  { key: "preferences", label: "Preferences", live: false },
  { key: "data", label: "Data & Privacy", live: false },
  { key: "about", label: "About & Legal", live: false },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<SectionKey>("account");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Free");
  const [role, setRole] = useState("user");
  const [memberSince, setMemberSince] = useState("—");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) { if (active) setLoading(false); return; }
      setEmail(user.email || "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, role, created_at")
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      if (profile) {
        if (profile.plan) setPlan(profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1));
        if (profile.role) setRole(profile.role);
        if (profile.created_at) setMemberSince(new Date(profile.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" }));
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={loading ? "..." : plan} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
          </div>
          <span className="text-xs text-violet-200/60 hidden md:inline">Account and preferences</span>
        </header>
        <main className="flex-1 px-6 md:px-10 py-10 max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <nav className="md:col-span-1">
              <ul className="space-y-1">
                {SECTIONS.map((s) => {
                  const active = section === s.key;
                  return (
                    <li key={s.key}>
                      <button type="button" onClick={() => setSection(s.key)} className={"w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition " + (active ? "bg-violet-500/15 text-white border border-violet-500/30" : "text-violet-100/70 hover:text-white hover:bg-violet-500/10 border border-transparent")}>
                        <span>{s.label}</span>
                        {!s.live && (<span className="text-[9px] tracking-wider uppercase text-violet-300/40 border border-violet-500/25 rounded px-1.5 py-0.5">Soon</span>)}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <Link href="/settings/billing" className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-violet-100/70 hover:text-white hover:bg-violet-500/10 border border-transparent transition">
                    <span>Billing</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="md:col-span-3">
              {section === "account" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base font-semibold mb-1">Account</h2>
                    <p className="text-xs text-violet-200/50">Your account details. These are managed by FORGE and cannot be edited here.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3">
                      <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Email</p>
                      <p className="text-sm text-white/85 break-all">{email || "-"}</p>
                    </div>
                    <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3">
                      <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Plan</p>
                      <p className="text-sm text-white/85">{plan}</p>
                    </div>
                    <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3">
                      <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Role</p>
                      <p className="text-sm text-white/85 capitalize">{role}</p>
                    </div>
                    <div className="rounded-lg border border-violet-500/15 bg-[#12062a]/50 px-4 py-3">
                      <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/45 mb-1">Member since</p>
                      <p className="text-sm text-white/85">{memberSince}</p>
                    </div>
                  </div>
                  <p className="text-xs text-violet-200/45 leading-relaxed">To change your professional details, visit <Link href="/profile" className="text-cyan-400 hover:text-cyan-300 transition">your profile</Link>. To manage your plan, visit <Link href="/settings/billing" className="text-cyan-400 hover:text-cyan-300 transition">billing</Link>.</p>
                </div>
              )}

              {section !== "account" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-base font-semibold mb-1 capitalize">{section === "data" ? "Data & Privacy" : section === "about" ? "About & Legal" : section}</h2>
                    <p className="text-xs text-violet-200/50">This section is being built. It will appear here once ready.</p>
                  </div>
                  <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 px-5 py-10 text-center">
                    <p className="text-sm text-white/70">Coming soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-12">Freelance Forge AI - by FORGE</p>
        </main>
      </div>
    </div>
  );
}
