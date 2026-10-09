"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [{ name: "Command Center", href: "/dashboard", ready: true }],
  },
  {
    label: "Opportunity Intelligence",
    items: [
      { name: "Opportunities", href: "/opportunities", ready: false },
      { name: "FORGE Matching", href: "/matching", ready: false },
      { name: "Analysis", href: "/analysis", ready: false },
      { name: "Alerts", href: "/alerts", ready: false },
    ],
  },
  {
    label: "Application",
    items: [
      { name: "Proposals", href: "/proposals", ready: false },
      { name: "CV Tailor", href: "/cv-tailor", ready: true },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Profile", href: "/profile", ready: true },
      { name: "FORGE Memory", href: "/memory", ready: true },
      { name: "Pricing", href: "/pricing", ready: true },
      { name: "Settings", href: "/settings", ready: true },
      { name: "Support", href: "/support", ready: true },
    ],
  },
];

export default function Sidebar({ planLabel }: { planLabel: string }) {
  const pathname = usePathname();

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/signin";
  }

  return (
    <aside className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-violet-500/15 bg-[#13072b]/80 backdrop-blur-xl">
      <Link href="/dashboard" className="px-5 py-5 flex items-center gap-2.5 border-b border-violet-500/15">
        <img src="/forge-logo.svg" alt="FORGE" width={28} height={28} className="drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
        <span className="text-sm font-semibold tracking-[0.2em] text-cyan-300" style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}>FORGE</span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] tracking-[0.18em] uppercase text-violet-300/40">{group.label}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                if (item.ready) {
                  return (
                    <li key={item.name}>
                      <Link href={item.href} className={"flex items-center justify-between px-3 py-2 rounded-lg text-sm transition " + (active ? "bg-violet-500/15 text-white border border-violet-500/30 shadow-[0_0_18px_-8px_rgba(139,92,246,0.9)]" : "text-violet-100/70 hover:text-white hover:bg-violet-500/10")}>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.name}>
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-violet-100/35 cursor-not-allowed">
                      <span>{item.name}</span>
                      <span className="text-[9px] tracking-wider uppercase text-violet-300/40 border border-violet-500/25 rounded px-1.5 py-0.5">Soon</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-violet-500/15 p-3 space-y-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-violet-500/25 bg-violet-500/10">
          <span className="text-[11px] uppercase tracking-wider text-violet-200/70">Plan</span>
          <span className="text-xs font-medium text-cyan-300">{planLabel}</span>
        </div>
        <button onClick={handleSignOut} className="w-full text-left px-3 py-2 rounded-lg text-sm text-violet-100/60 hover:text-white hover:bg-red-500/10 transition">
          Sign out
        </button>
      </div>
    </aside>
  );
}
