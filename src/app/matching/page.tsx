export default function MatchingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
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
            AI MATCHING
          </span>
        </header>

        {/* Hero */}
        <section className="flex flex-1 items-center py-16 lg:py-24">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">
              Your Match Engine
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find the work that fits you.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Forge evaluates your skills, experience, preferences and career
              direction to identify opportunities that genuinely align with you.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Build My Match Profile
              </button>

              <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10">
                How Matching Works
              </button>
            </div>
          </div>
        </section>

                {/* Match Profile */}
        <section className="border-t border-white/10 py-14">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Your Freelance Profile
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              What Forge knows about you
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Your matching quality will improve as Forge understands more
              about your skills, experience, preferences and career direction.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Skills
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                  Not configured
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Experience
              </p>

              <div className="mt-4">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                  Not configured
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Work Preferences
              </p>

              <div className="mt-4">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                  Not configured
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Categories
              </p>

              <div className="mt-4">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                  Not configured
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Budget Expectations
              </p>

              <div className="mt-4">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                  Not configured
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Career Goals
              </p>

              <div className="mt-4">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                  Not configured
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Match Engine Preview */}
        <section className="border-t border-white/10 py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Forge Intelligence
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                Your Match Engine
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                Your personalized matching workspace will evaluate opportunities
                against the information you provide.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/10 bg-white/[0.03] p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  Matching Intelligence
                </span>

                <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs text-amber-300">
                  Coming Soon
                </span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">Skill Alignment</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Awaiting profile
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">Experience Fit</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Awaiting profile
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">Preference Fit</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Awaiting preferences
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-500">Career Relevance</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Awaiting profile
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm text-cyan-300">
                Matching intelligence is coming soon.
              </p>
            </div>
          </div>
        </section>

        {/* What Forge Evaluates */}
        <section className="border-t border-white/10 py-14">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              How Forge Thinks
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              What Forge will evaluate
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Matching is more than comparing keywords. Forge will consider
              the bigger picture before recommending an opportunity.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                01 — Skill Fit
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Does the work match what you can do?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Forge will compare the opportunity requirements with your
                relevant skills and capabilities.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                02 — Experience Fit
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Is the opportunity right for your level?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Forge will consider your experience when determining whether
                an opportunity is realistically suitable.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                03 — Goal Fit
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Does it support your direction?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Your career goals and preferred direction will help Forge
                identify opportunities with longer-term value.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-semibold text-cyan-300">
                04 — Opportunity Quality
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                Is it worth pursuing?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Forge will eventually evaluate factors such as relevance,
                potential value, competition and opportunity risk.
              </p>
            </div>
          </div>
        </section>

                {/* Match Result Preview */}
        <section className="border-t border-white/10 py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Future Match Results
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                See why Forge recommends an opportunity.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                When the matching engine is connected, every recommendation
                will come with context instead of just a number.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Match Result
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Personalized opportunity analysis
                  </h3>
                </div>

                <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs text-amber-300">
                  Coming Soon
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500">Why Forge recommends it</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Strong alignment with your skills and career direction.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500">Potential concerns</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Forge will identify factors you should consider before applying.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-500">Forge recommendation</p>
                  <p className="mt-2 text-sm text-cyan-300">
                    Recommendation will appear when matching is live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
              {/* Profile CTA */}
        <section className="border-t border-white/10 py-16">
          <div className="rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.03] to-transparent p-8 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                Better Profile. Better Matches.
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                The better Forge understands you, the better it can match you.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
                Complete your freelance profile so Forge can eventually use
                your experience, skills, preferences and goals to make smarter
                opportunity recommendations.
              </p>

              <button className="mt-8 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                Complete My Profile
              </button>
            </div>
          </div>
        </section>
    </main>
  );
}