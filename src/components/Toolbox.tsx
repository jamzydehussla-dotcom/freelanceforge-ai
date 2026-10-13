"use client";

import Link from "next/link";
import { useState } from "react";
import { TOOLS, TOOL_GROUPS, userHasAccess, type Tool } from "@/lib/toolbox";

const TIER_LABEL: Record<string, string> = {
  free: "Free",
  elite: "Elite",
  pro: "Pro",
  legend: "Legend",
};

function ToolTile({ tool, userTier }: { tool: Tool; userTier: string }) {
  const hasAccess = userHasAccess(userTier, tool.tier);
  const isLive = tool.status === "live";
  const canOpen = isLive && hasAccess;

  const inner = (
    <div
      className={
        "h-full rounded-xl border p-4 transition flex flex-col " +
        (canOpen
          ? "border-violet-500/25 bg-[#170a34]/70 hover:border-cyan-400/50 hover:bg-[#1a0d3a] hover:shadow-[0_0_25px_-10px_rgba(34,211,238,0.5)] cursor-pointer"
          : "border-violet-500/15 bg-[#12062a]/40")
      }
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className={"text-sm font-medium leading-snug " + (canOpen ? "text-white" : "text-white/60")}>
          {tool.name}
        </p>
        {!hasAccess && (
          <span className="shrink-0 text-[9px] tracking-[0.12em] uppercase text-violet-300/70 border border-violet-500/30 rounded px-1.5 py-0.5 bg-violet-500/5">
            {TIER_LABEL[tool.tier]}
          </span>
        )}
      </div>
      <p className="text-[11px] text-violet-200/50 leading-relaxed flex-1">{tool.description}</p>
      {!isLive && (
        <p className="text-[9px] tracking-[0.18em] uppercase text-violet-300/45 mt-3">Coming soon</p>
      )}
    </div>
  );

  if (canOpen && tool.href) {
    return (
      <Link href={tool.href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function Toolbox({ userTier }: { userTier: string }) {
  const [showRoadmap, setShowRoadmap] = useState(false);

  const liveTools = TOOLS.filter((t) => t.status === "live");
  const soonTools = TOOLS.filter((t) => t.status === "soon");
  const isFreeOrElite = userTier === "free" || userTier === "elite";

  return (
    <section
      className="rounded-2xl p-[1px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(34,211,238,0.35), rgba(139,92,246,0.25) 50%, rgba(236,72,153,0.35))",
      }}
    >
      <div className="rounded-2xl bg-[#170a34]/90 backdrop-blur-xl p-7">
        <div className="mb-7">
          <h2 className="text-base font-semibold mb-1.5">FORGE Toolbox</h2>
          <p className="text-xs text-violet-200/55 max-w-xl leading-relaxed">
            Everything FORGE can do for you. Live tools are ready now — the roadmap shows what is coming.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300/55 mb-3">Available now</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveTools.map((t) => (
              <ToolTile key={t.name} tool={t} userTier={userTier} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowRoadmap((v) => !v)}
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-violet-500/20 bg-[#12062a]/50 px-4 py-3 hover:border-violet-400/40 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] uppercase text-violet-300/55">Roadmap</span>
            <span className="text-xs text-violet-200/50">{soonTools.length} tools in development</span>
          </div>
          <span className="text-xs text-violet-200/60">{showRoadmap ? "Hide" : "Show"}</span>
        </button>

        {showRoadmap && (
          <div className="mt-6 space-y-7">
            {TOOL_GROUPS.map((g) => {
              const items = soonTools.filter((t) => t.group === g);
              if (items.length === 0) return null;
              return (
                <div key={g}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300/55 mb-3">{g}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((t) => (
                      <ToolTile key={t.name} tool={t} userTier={userTier} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isFreeOrElite && (
          <p className="text-[11px] text-violet-200/45 mt-7 text-center">
            Tiles marked with a tier require that plan.{" "}
            <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 transition">
              Compare plans
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
