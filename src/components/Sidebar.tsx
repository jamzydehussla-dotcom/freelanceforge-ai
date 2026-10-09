"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
      { name: "Billing", href: "/settings/billing", ready: true },
      { name: "Settings", href: "/settings", ready: true },
      { name: "Support", href: "/support", ready: true },
    ],
  },
];

export default function Sidebar({ planLabel }: { planLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/signin";
  }

  const navList = (
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
                    <Link href={item.href} onClick={() => setOpen(false)} className={"flex items-center justify-between px-3 py-2 rounded-lg text-sm transition " + (active ? "bg-violet-500/15 text-white border border-violet-500/30 shadow-[0_0_18px_-8px_rgba(139,92,246,0.9)]" : "text-violet-100/70 hover:text-white hover:bg-violet-500/10")}>
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
  );

  const footerBlock = (
    <div className="border-t border-violet-500/15 p-3 space-y-2">
      <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-violet-500/25 bg-violet-500/10">
        <span className="text-[11px] uppercase tracking-wider text-violet-200/70">Plan</span>
        <span className="text-xs font-medium text-cyan-300">{planLabel}</span>
      </div>
      <button onClick={handleSignOut} className="w-full text-left px-3 py-2 rounded-lg text-sm text-violet-100/60 hover:text-white hover:bg-red-500/10 transition">Sign out</button>
    </div>
  );

  const brandHeader = (
    <Link href="/dashboard" className="px-5 py-5 flex items-center gap-2.5 border-b border-violet-500/15">
      <img src="/forge-logo.svg" alt="FORGE" width={28} height={28} className="drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
      <span className="text-sm font-semibold tracking-[0.2em] text-cyan-300" style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}>FORGE</span>
    </Link>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-violet-500/15 bg-[#13072b]/90 backdrop-blur-xl flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/forge-logo.svg" alt="FORGE" width={24} height={24} className="drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]" />
          <span className="text-sm font-semibold tracking-[0.2em] text-cyan-300" style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}>FORGE</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open navigation" className="p-2 rounded-lg text-violet-100/80 hover:text-white hover:bg-violet-500/10 transition">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-[280px] max-w-[80vw] h-full bg-[#13072b] border-r border-violet-500/20 flex flex-col shadow-2xl">
            <button onClick={() => setOpen(false)} aria-label="Close navigation" className="absolute top-5 right-3 p-2 rounded-lg text-violet-100/70 hover:text-white hover:bg-violet-500/10 transition z-10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {brandHeader}
            {navList}
            {footerBlock}
          </div>
        </div>
      )}

      <aside className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-violet-500/15 bg-[#13072b]/80 backdrop-blur-xl">
        {brandHeader}
        {navList}
        {footerBlock}
      </aside>
    </>
  );
}
