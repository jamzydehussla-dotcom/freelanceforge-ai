export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-8 lg:px-10">
        {/* Brand */}
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-lg font-bold tracking-[0.25em] text-cyan-300">
              FORGE
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Freelance Forge AI
            </p>
          </div>

          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
            OPPORTUNITY ANALYSIS
          </span>
        </header>

        {/* Hero */}
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
              Forge Decision Intelligence
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Know before you apply.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Forge breaks down an opportunity so you can understand its
              value, requirements, risks and potential before investing your
              time.
            </p>

            <button className="mt-10 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              Analyze an Opportunity
            </button>
          </div>
        </section>

        {/* Analysis Workspace */}
        <section className="border-t border-white/10 py-14">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Analysis Workspace
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Bring an opportunity to Forge.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
                The future analysis engine will examine the opportunity and
                return a clear decision framework.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  Opportunity Input
                </span>

                <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs text-amber-300">
                  Coming Soon
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">Opportunity Title</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Waiting for analysis engine
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">
                    Opportunity Description
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Waiting for analysis engine
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs text-slate-500">Budget</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Not available
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs text-slate-500">Source</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Not available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* Forge Decision Framework */}
        <section className="border-t border-white/10 py-14">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Forge Decision Framework
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Look beyond the opportunity headline.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Forge will examine multiple dimensions of an opportunity before
              helping you decide whether it deserves your time.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                01 — Opportunity Quality
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                Is it worth pursuing?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Forge will eventually examine the overall quality and value of
                the opportunity.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                02 — Skill Alignment
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                Does it fit your capabilities?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Your skills will be compared with what the opportunity
                actually requires.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                03 — Earning Potential
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                Is the reward worth the work?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Forge will consider compensation in relation to the expected
                work and opportunity value.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                04 — Competition
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                How difficult may it be to win?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Future analysis will consider signals that may indicate the
                level of competition.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                05 — Risk Signals
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                What should you watch out for?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Forge will eventually identify potential warning signs and
                factors that deserve closer attention.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                06 — Strategic Value
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                Could it move your career forward?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Forge will consider whether an opportunity supports your
                broader freelance direction and goals.
              </p>
            </div>
          </div>
        </section>

                {/* Forge Verdict */}
        <section className="border-t border-white/10 py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Forge Verdict
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                A clearer decision, not just more information.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                When the analysis engine is live, Forge will turn the signals
                it discovers into a practical recommendation.
              </p>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.06] via-white/[0.03] to-transparent p-7">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  Decision Status
                </span>

                <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs text-amber-300">
                  Coming Soon
                </span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-center">
                  <p className="text-sm font-semibold text-white">Pursue</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Strong opportunity
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-center">
                  <p className="text-sm font-semibold text-white">Consider</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Review carefully
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-center">
                  <p className="text-sm font-semibold text-white">Skip</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Weak opportunity
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500">Why</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Waiting for Forge analysis.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500">Concerns</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Waiting for Forge analysis.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500">
                    Recommended next move
                  </p>
                  <p className="mt-2 text-sm text-cyan-300">
                    Analysis engine coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* Analysis History */}
        <section className="border-t border-white/10 py-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Analysis History
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Your recent analyses
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Keep track of opportunities you have evaluated and the
                decisions Forge helped you make.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
              No analyses yet
            </span>
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
            <p className="text-sm font-medium text-slate-300">
              Your analysis history will appear here.
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Once the Forge analysis engine is connected, your evaluated
              opportunities and decisions will be stored in this workspace.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}