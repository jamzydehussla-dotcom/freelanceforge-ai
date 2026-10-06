"use client";
import { useState } from "react";
import Link from "next/link";
const capabilities = [
  {
    number: "01",
    title: "Opportunity Radar",
    description:
      "Discover relevant freelance opportunities from supported sources and bring them into one Forge workspace.",
    status: "Coming Soon",
  },
  {
    number: "02",
    title: "Smart Matching",
    description:
      "Compare opportunities with your skills, experience and preferences to identify stronger matches.",
    status: "Coming Soon",
  },
  {
    number: "03",
    title: "Opportunity Analyzer",
    description:
      "Analyze requirements, potential fit, risks, gaps and important details before you apply.",
    status: "Coming Soon",
  },
  {
    number: "04",
    title: "Opportunity Alerts",
    description:
      "Receive notifications when relevant opportunities become available based on your preferences.",
    status: "Coming Soon",
  },
];

const navigation = [
  { label: "Command Center", href: "/dashboard" },
  { label: "Opportunities", href: "/opportunities", active: true },
  { label: "AI Matching", href: "/matching" },
  { label: "Analysis", href: "/analysis" },
  { label: "Alerts", href: "/alerts" },
  { label: "Proposals", href: "/proposals" },
  { label: "CV Tailor", href: "/cv-tailor" },
];

export default function OpportunitiesPage() {
    const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [workType, setWorkType] = useState("");
  const [experience, setExperience] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

const handleSearch = () => {
  setMessage(
    "Your search criteria are ready. Live opportunity searching is coming soon."
  );
};

const clearFilters = () => {
  setSearch("");
  setCategory("");
  setWorkType("");
  setExperience("");
  setBudget("");
  setMessage("Search criteria cleared.");
};

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/95 px-5 py-6 lg:flex lg:flex-col">
          <Link href="/dashboard" className="mb-10 block">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-cyan-400">FORGE</span>
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Freelance Forge AI
            </div>
          </Link>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  item.active
                    ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="space-y-2">
              <Link
                href="/profile"
                className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
              >
                Profile
              </Link>

              <Link
                href="/settings"
                className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
              >
                Settings
              </Link>

              <Link
                href="/support"
                className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
              >
                Support
              </Link>
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Current Plan
            </p>
            <p className="mt-2 font-semibold text-white">Free</p>

            <Link
              href="/plans"
              className="mt-3 block text-sm text-cyan-300 hover:text-cyan-200"
            >
              Manage Plan →
            </Link>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Available plans: Free, Elite, Pro, Legend
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1">
          {/* Mobile header */}
          <div className="border-b border-white/10 px-5 py-5 lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/dashboard">
                <div className="text-lg font-bold">
                  <span className="text-cyan-400">FORGE</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Freelance Forge AI
                </div>
              </Link>

              <Link
                href="/dashboard"
                className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300"
              >
                Command Center
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Top bar */}
            <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-300">
                  Forge Opportunities
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Opportunities
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Your future workspace for discovering, evaluating and
                  managing freelance opportunities with Forge.
                </p>
              </div>

              <div className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300">
                Coming Soon
              </div>
            </div>

            {/* Coming Soon panel */}
            <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-indigo-500/10 p-7 sm:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative max-w-3xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-lg font-bold text-cyan-300">
                  F
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Your opportunity intelligence layer is being built.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Forge will eventually bring opportunity discovery,
                  intelligent matching, opportunity analysis and alerts into
                  one connected workspace. Live opportunity sources and AI
                  integrations are not active yet.
                </p>

                <div className="mt-6 inline-flex rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
                  No live opportunities are being displayed yet.
                </div>
              </div>
            </div>

            {/* Opportunity Radar */}
<div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        Opportunity Radar
      </p>

      <h2 className="mt-2 text-xl font-bold">
        Find opportunities that fit your goals
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Search and refine opportunities from your preferred criteria.
        Live opportunity sources are coming soon.
      </p>
    </div>

    <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-500">
      Coming Soon
    </span>
  </div>

    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
    <input
  type="text"
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  placeholder="Search by role, skill or keyword..."
      className="min-h-12 flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
    />

    <button
  onClick={handleSearch}
  className="min-h-12 rounded-xl bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
>
  Search Opportunities
</button>
  </div>

  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <select
  value={category}
  onChange={(event) => setCategory(event.target.value)}
  className="min-h-11 rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
>
      <option value="" disabled>Category</option>
      <option>Writing & Content</option>
      <option>Design</option>
      <option>Marketing</option>
      <option>Development</option>
      <option>Virtual Assistance</option>
      <option>AI & Data</option>
      <option>Education</option>
    </select>

    <select
  value={workType}
  onChange={(event) => setWorkType(event.target.value)}
  className="min-h-11 rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
>
  <option value="" disabled>Work Type</option>
      <option>Remote</option>
      <option>Contract</option>
      <option>Part-time</option>
      <option>Full-time</option>
    </select>

    <select
  value={experience}
  onChange={(event) => setExperience(event.target.value)}
  className="min-h-11 rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
>
  <option value="" disabled>Experience Level</option>
      <option>Entry Level</option>
      <option>Intermediate</option>
      <option>Expert</option>
    </select>

    <select
  value={budget}
  onChange={(event) => setBudget(event.target.value)}
  className="min-h-11 rounded-xl border border-white/10 bg-slate-950/70 px-4 text-sm text-slate-300 outline-none focus:border-cyan-400/40"
>
  <option value="" disabled>Budget</option>
      <option>Under $100</option>
      <option>$100 – $500</option>
      <option>$500 – $1,000</option>
      <option>$1,000+</option>
    </select>
  </div>

  <div className="mt-4 flex justify-end">
    <button
  onClick={clearFilters}
  className="min-h-11 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/10"
>
  Clear Filters
</button>
{message && (
  <p className="mt-4 text-sm text-cyan-300" role="status">
    {message}
  </p>
)}
  </div>
</div>

            {/* Capabilities */}
            <div className="mt-10">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Opportunity ecosystem
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  What Forge will bring together
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {capabilities.map((item) => (
                  <div
                    key={item.number}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-xs font-semibold tracking-widest text-cyan-400">
                        {item.number}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-sm font-medium text-slate-200">
                Forge principle
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Features will only be marked active when the underlying
                functionality has actually been built and connected.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}