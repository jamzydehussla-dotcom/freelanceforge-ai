const toolGroups = [
  {
    title: "Opportunity Intelligence",
    description: "Find and evaluate opportunities built around your strengths.",
    tools: [
      {
        name: "Opportunity Radar",
        description: "Discover relevant freelance jobs and projects.",
        featured: true,
        href: "/opportunities",
      },
      {
        name: "Smart Matching",
        description: "Match opportunities to your skills and experience.",
        featured: true,
        href: "/matching",
      },
      {
        name: "Opportunity Analyzer",
        description: "Analyze requirements, fit, risks and skill gaps.",
        featured: true,
        href: "/analysis",
      },
      {
        name: "Opportunity Alerts",
        description: "Stay informed about relevant new opportunities.",
        featured: false,
        href: "/alerts",
      },
    ],
  },
  {
    title: "Application & Proposal Tools",
    description: "Turn strong opportunities into stronger applications.",
    tools: [
      {
        name: "Proposal Studio",
        description: "Create tailored proposals for each opportunity.",
        featured: true,
        href: "/proposals",
      },
      {
        name: "AI CV Builder",
        description: "Create professional CVs for specific roles.",
        featured: true,
        href: "/cv-tailor",
      },
      {
        name: "Application Tracker",
        description: "Track applications and their progress.",
        featured: false,
        href: "/applications",
      },
      {
        name: "Profile Optimizer",
        description: "Improve your freelance profile and positioning.",
        featured: false,
        href: "/profile",
      },
    ],
  },
  {
    title: "AI Career Intelligence",
    description: "Understand your direction, performance and opportunities.",
    tools: [
      {
        name: "Forge Intelligence",
        description: "Get AI powered freelance guidance and insights.",
        featured: true,
        href: "/intelligence",
      },
      {
        name: "Career Strategy",
        description: "Plan your skills, specialization and career direction.",
        featured: false,
        href: "/career-strategy",
      },
      {
        name: "Career Analytics",
        description: "Review your application activity and progress.",
        featured: false,
        href: "/analytics",
      },
      {
        name: "Skills Gap Analyzer",
        description: "Identify skills to develop for target opportunities.",
        featured: false,
        href: "/skills-gap",
      },
    ],
  },
  {
    title: "Freelance Business",
    description: "Build a stronger and more organized freelance business.",
    tools: [
      {
        name: "Pricing Calculator",
        description: "Estimate project rates and potential earnings.",
        featured: false,
        href: "/pricing",
      },
      {
        name: "Income Planner",
        description: "Set income goals and plan expected revenue.",
        featured: false,
        href: "/income-planner",
      },
      {
        name: "Project Manager",
        description: "Organize client projects, tasks and deadlines.",
        featured: false,
        href: "/projects",
      },
      {
        name: "Client Workspace",
        description: "Organize client details and communication records.",
        featured: false,
        href: "/clients",
      },
    ],
  },
  {
    title: "Productivity & Workspace",
    description: "Keep your freelance work organized in one place.",
    tools: [
      {
        name: "AI Workspace",
        description: "A dedicated space for AI assisted freelance tasks.",
        featured: false,
        href: "/workspace",
      },
      {
        name: "Knowledge Library",
        description: "Save useful guides, templates and resources.",
        featured: false,
        href: "/library",
      },
      {
        name: "Smart Scheduler",
        description: "Organize application tasks and important dates.",
        featured: false,
        href: "/scheduler",
      },
      {
        name: "Document Vault",
        description: "Keep CVs, proposals and portfolio materials organized.",
        featured: false,
        href: "/documents",
      },
    ],
  },
];

const stats = [
  { label: "Saved Opportunities", value: "—" },
  { label: "Applications", value: "—" },
  { label: "Interviews", value: "—" },
  { label: "Profile Strength", value: "—" },
];

function ToolIcon({ name }: { name: string }) {
  const firstLetter = name.charAt(0);

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-bold text-white">
      {firstLetter}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950 lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <a href="/dashboard" className="block">
              <div className="text-xl font-bold tracking-tight">
                Freelance<span className="text-cyan-400">Forge</span>
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                AI
              </div>
            </a>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Workspace
            </div>

            <a
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Command Center
            </a>

            <a
              href="/opportunities"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Opportunities
            </a>

            <a
              href="/matching"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              AI Matching
            </a>

            <a
              href="/analysis"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Analysis
            </a>

            <a
              href="/alerts"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Alerts
            </a>

            <a
              href="/proposals"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Proposals
            </a>

            <a
              href="/cv-tailor"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              CV Tailor
            </a>

            <div className="my-6 border-t border-white/10" />

            <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account
            </div>

            <a
              href="/profile"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Profile
            </a>

            <a
              href="/settings"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Settings
            </a>

            <a
              href="/support"
              className="flex items-center rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Support
            </a>
          </nav>

          <div className="p-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-medium text-slate-500">Current Plan</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-semibold text-white">Free</span>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Active
                </span>
              </div>

              <a
                href="/plans"
                className="mt-4 block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Manage Plan →
              </a>

              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="text-[11px] leading-5 text-slate-500">
                  Available plans: Free, Elite, Pro and Legend.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1">
          {/* Mobile header */}
          <header className="border-b border-white/10 bg-slate-950/90 px-5 py-5 backdrop-blur lg:px-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-cyan-300">
                  Freelance Forge AI
                </div>
                <h1 className="mt-1 text-xl font-bold tracking-tight text-white lg:text-2xl">
                  Command Center
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/alerts"
                  aria-label="Notifications"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                >
                  •
                </a>

                <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-xs font-bold text-slate-950">
                    U
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Freelancer</p>
                    <p className="text-[10px] text-slate-500">Free Plan</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="mt-5 flex gap-2 overflow-x-auto lg:hidden">
              {["Command Center", "Opportunities", "Matching", "Analysis", "Alerts"].map(
                (item, index) => (
                  <a
                    key={item}
                    href={
                      index === 0
                        ? "/dashboard"
                        : index === 1
                          ? "/opportunities"
                          : index === 2
                            ? "/matching"
                            : index === 3
                              ? "/analysis"
                              : "/alerts"
                    }
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium ${
                      index === 0
                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/[0.03] text-slate-400"
                    }`}
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>
          </header>

          <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10 lg:py-10">
            {/* Welcome */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.12] via-slate-900 to-blue-600/[0.08] p-7 lg:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Welcome back
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Your next move starts here.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Your freelance activity and tools in one workspace.
                </p>
              </div>
            </section>

            {/* Stats */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                >
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-xs text-slate-600">
                    Live figures will appear when connected.
                  </p>
                </div>
              ))}
            </section>

            {/* Tools */}
            <section className="mt-12">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Your tools
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Everything you need to move forward
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Explore the Forge workspace and use the tools that matter most to your
                  freelance career.
                </p>
              </div>

              <div className="space-y-10">
                {toolGroups.map((group) => (
                  <section key={group.title}>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white">{group.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{group.description}</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {group.tools.map((tool) => (
                        <a
                          key={tool.name}
                          href={tool.href}
                          className={`group rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.06] ${
                            tool.featured
                              ? "border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.08] to-white/[0.025]"
                              : "border-white/10 bg-white/[0.025]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <ToolIcon name={tool.name} />

                            {tool.featured && (
                              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
                                Forge
                              </span>
                            )}
                          </div>

                          <h4 className="mt-5 font-semibold text-white group-hover:text-cyan-300">
                            {tool.name}
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {tool.description}
                          </p>

                          <div className="mt-5 text-xs font-semibold text-slate-600 transition group-hover:text-cyan-300">
                            Explore →
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            {/* Roadmap */}
            <section className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Future roadmap
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    More Forge intelligence is coming.
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Opportunity Autopilot and Opportunity War Room remain future
                    concepts and are not active tools yet.
                  </p>
                </div>

                <span className="w-fit rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-500">
                  Roadmap
                </span>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
