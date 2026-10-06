export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <header className="border-b border-white/10 bg-[#070b12]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10">
              <div className="h-5 w-5 rotate-45 rounded-md border-2 border-cyan-300" />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                Freelance<span className="text-cyan-300">Forge</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                AI
              </div>
            </div>
          </a>

          <nav className="hidden gap-8 text-sm text-slate-400 md:flex">
            <a href="#how-it-works" className="hover:text-white">
              How It Works
            </a>
            <a href="#features" className="hover:text-white">
              Platform
            </a>
            <a href="#intelligence" className="hover:text-white">
              Intelligence
            </a>
          </nav>

          <a
            href="/dashboard"
            className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-200"
          >
            Enter the Forge
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <div className="mx-auto mb-7 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            The Freelance Intelligence System
          </div>

          <h1 className="text-5xl font-black leading-[1] tracking-[-0.05em] sm:text-6xl md:text-7xl">
            Don&apos;t just find
            <br />
            <span className="text-cyan-300">opportunities.</span>
            <br />
            Know what to do with them.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            FreelanceForge AI helps you discover relevant opportunities,
            understand where you stand, build stronger applications, and make
            smarter moves throughout your freelance career.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="rounded-xl bg-cyan-300 px-7 py-4 text-sm font-bold text-slate-950 hover:bg-cyan-200"
            >
              Enter the Forge →
            </a>

            <a
              href="#how-it-works"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold hover:bg-white/10"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            The Forge Method
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            From opportunity
            <span className="text-cyan-300"> to action.</span>
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-black tracking-[0.2em] text-cyan-300">
                01
              </p>
              <h3 className="mt-8 text-2xl font-bold">Discover</h3>
              <p className="mt-4 leading-7 text-slate-500">
                Find opportunities that actually align with your skills,
                experience and direction.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-black tracking-[0.2em] text-cyan-300">
                02
              </p>
              <h3 className="mt-8 text-2xl font-bold">Understand</h3>
              <p className="mt-4 leading-7 text-slate-500">
                See the opportunity through Forge Intelligence instead of
                relying only on the job description.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-sm font-black tracking-[0.2em] text-cyan-300">
                03
              </p>
              <h3 className="mt-8 text-2xl font-bold">Execute</h3>
              <p className="mt-4 leading-7 text-slate-500">
                Build your proposal, application and strategy around what
                actually matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
          Built Around Your Career
        </p>

        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          More than another
          <br />
          <span className="text-slate-500">freelance tool.</span>
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm font-bold text-cyan-300">01</p>
            <h3 className="mt-8 text-2xl font-bold">
              Opportunity Intelligence
            </h3>
            <p className="mt-4 leading-7 text-slate-500">
              See beyond the listing. Understand fit, requirements, gaps and
              the move worth making.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm font-bold text-cyan-300">02</p>
            <h3 className="mt-8 text-2xl font-bold">Proposal Studio</h3>
            <p className="mt-4 leading-7 text-slate-500">
              Build applications around the actual opportunity instead of
              sending another generic proposal.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm font-bold text-cyan-300">03</p>
            <h3 className="mt-8 text-2xl font-bold">Profile Optimizer</h3>
            <p className="mt-4 leading-7 text-slate-500">
              Position your experience, skills and professional story before
              you pitch yourself.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-sm font-bold text-cyan-300">04</p>
            <h3 className="mt-8 text-2xl font-bold">Career Strategy</h3>
            <p className="mt-4 leading-7 text-slate-500">
              Think beyond the next application and build a direction for your
              freelance career.
            </p>
          </div>
        </div>
      </section>

      <section
        id="intelligence"
        className="border-y border-white/10 bg-[#080e17]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Forge Intelligence
              </p>

              <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Your career has patterns.
                <span className="text-cyan-300"> Forge finds them.</span>
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-slate-500">
                FreelanceForge is designed to understand the bigger picture:
                your skills, applications, positioning and career direction.
              </p>

              <a
                href="#start"
                className="mt-8 inline-flex rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-5 py-3 text-sm font-bold text-cyan-200 hover:bg-cyan-300/10"
              >
                Ask Forge →
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0c131e] p-7">
              <div className="border-b border-white/10 pb-5">
                <p className="text-sm font-bold text-cyan-300">
                  FORGE INSIGHT
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Example intelligence
                </p>
              </div>

              <p className="mt-7 text-2xl font-bold leading-8">
                Your strongest opportunities currently sit at the intersection
                of{" "}
                <span className="text-cyan-300">AI + Content + English.</span>
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Strategic signal
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Consider strengthening your portfolio around AI-assisted
                  content workflows before expanding into a new specialization.
                </p>
              </div>

              <p className="mt-5 text-[10px] leading-5 text-slate-600">
                Example interface only. Live intelligence will be connected
                later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="start" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-400/[0.03]" />

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Your Next Move Starts Here
          </p>

          <h2 className="mt-6 text-5xl font-black tracking-[-0.05em] sm:text-7xl">
            Stop applying blindly.
            <br />
            <span className="text-cyan-300">Start moving deliberately.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl leading-7 text-slate-500">
            Build a smarter freelance workflow with intelligence working
            alongside you.
          </p>

          <a
            href="/dashboard"
            className="mt-9 inline-flex rounded-xl bg-cyan-300 px-8 py-4 text-sm font-black text-slate-950 hover:bg-cyan-200"
          >
            Enter FreelanceForge →
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="text-lg font-bold">
                Freelance<span className="text-cyan-300">Forge</span>{" "}
                <span className="text-slate-600">AI</span>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Discover. Understand. Execute.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Platform
              </p>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <a href="#features" className="block hover:text-white">
                  Features
                </a>
                <a href="#intelligence" className="block hover:text-white">
                  Intelligence
                </a>
                <a href="#how-it-works" className="block hover:text-white">
                  How It Works
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="mailto:jamzyblaq@gmail.com"
                  className="block break-all text-slate-600 hover:text-cyan-300"
                >
                  jamzyblaq@gmail.com
                </a>

                <a
                  href="mailto:thomasryanbennett@gmail.com"
                  className="block break-all text-slate-600 hover:text-cyan-300"
                >
                  thomasryanbennett@gmail.com
                </a>

                <a
                  href="mailto:delahcruhz@gmail.com"
                  className="block break-all text-slate-600 hover:text-cyan-300"
                >
                  delahcruhz@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-700">
            © 2026 FreelanceForge AI. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}