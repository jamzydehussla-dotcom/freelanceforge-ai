export default function CVTailorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
                <section className="relative overflow-hidden border-b border-white/10 pb-20">
          <div className="max-w-5xl">
            <p className="text-sm font-semibold tracking-[0.3em] text-cyan-400">
              FORGE CV TAILOR
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
              Make your experience impossible to overlook.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              Forge helps you turn your real experience, skills and
              achievements into a professional CV positioned around the
              opportunity you want.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-sm text-cyan-300">
                Built around your real experience
              </span>

              <span className="text-sm text-slate-500">
                AI tailoring coming soon
              </span>
            </div>
          </div>

          <div className="mt-16 grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            <div className="bg-slate-950 p-7 md:p-9">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                01
              </p>
              <h2 className="mt-5 text-xl font-semibold">
                Your Experience
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Start with the professional experience, skills and
                achievements you already have.
              </p>
            </div>

            <div className="bg-slate-950 p-7 md:p-9">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                02
              </p>
              <h2 className="mt-5 text-xl font-semibold">
                Your Opportunity
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Define the role and requirements you want your CV to target.
              </p>
            </div>

            <div className="bg-slate-950 p-7 md:p-9">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                03
              </p>
              <h2 className="mt-5 text-xl font-semibold">
                Your Stronger CV
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Forge will eventually transform the connection between both
                into a more targeted professional document.
              </p>
            </div>
          </div>
        </section>

              
           <section className="mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              YOUR CV WORKSPACE
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Bring your professional story into Forge.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
              Choose how you want to provide your CV. Forge will use your
              information as the foundation for the tailoring process.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-9">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                    CV INPUT
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Select your starting point
                  </h3>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500">
                  Ready
                </span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-5 text-left"
                >
                  <p className="text-sm font-semibold text-cyan-300">
                    Upload CV
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Bring an existing PDF or DOCX into your workspace.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition hover:border-cyan-400/20"
                >
                  <p className="text-sm font-semibold">Paste CV</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Add your existing CV content directly.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition hover:border-cyan-400/20"
                >
                  <p className="text-sm font-semibold">Build CV</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Create your professional profile from the beginning.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left transition hover:border-cyan-400/20"
                >
                  <p className="text-sm font-semibold">Saved CV</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Continue with a CV already stored in Forge.
                  </p>
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7 md:p-9">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                WORKSPACE STATUS
              </p>

              <h3 className="mt-4 text-2xl font-semibold">
                Your CV is the foundation.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Once your CV is provided, Forge can prepare it for the target
                opportunity while keeping your real experience at the center.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-sm text-slate-400">
                    CV provided
                  </span>
                  <span className="text-sm text-slate-600">
                    Awaiting input
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-sm text-slate-400">
                    Target opportunity
                  </span>
                  <span className="text-sm text-slate-600">
                    Not set
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Forge assessment
                  </span>
                  <span className="text-sm text-slate-600">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

                     <section className="mt-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              TARGETING CONSOLE
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Define the opportunity you want your CV to win.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              Tell Forge what you are targeting. The more context you provide,
              the more precisely the future tailoring engine can understand
              the role, requirements and signals that matter.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950">
            <div className="border-b border-white/10 bg-white/[0.02] p-7 md:p-9">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                    OPPORTUNITY IDENTITY
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    What are you targeting?
                  </h3>
                </div>

                <span className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-medium text-cyan-300">
                  Target not set
                </span>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Target Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI Specialist"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Company name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Industry / Field
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Technology, Education, Marketing"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Seniority
                  </label>
                  <select
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                  >
                    <option value="" disabled>
                      Select seniority
                    </option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                    <option>Lead</option>
                    <option>Executive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid gap-8 p-7 md:p-9 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                      OPPORTUNITY SOURCE
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Bring the opportunity context.
                    </h3>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4 text-left"
                  >
                    <p className="text-sm font-semibold text-cyan-300">
                      Job Description
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Paste the opportunity details directly.
                    </p>
                  </button>

                  <button
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-cyan-400/20"
                  >
                    <p className="text-sm font-semibold">
                      Job Link
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Connect an opportunity URL later.
                    </p>
                  </button>

                  <button
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-cyan-400/20"
                  >
                    <p className="text-sm font-semibold">
                      Saved Opportunity
                    </p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Use an opportunity already stored in Forge.
                    </p>
                  </button>
                </div>

                <div className="mt-7">
                  <label className="text-sm font-medium text-slate-300">
                    Job Description / Opportunity Details
                  </label>

                  <textarea
                    rows={8}
                    placeholder="Paste the full job description or opportunity details here..."
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium text-slate-300">
                    Key Requirements & Skills
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Add important skills, qualifications, tools, certifications or requirements..."
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-300">
                      Employment Type
                    </label>

                    <select
                      defaultValue=""
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300">
                      Work Arrangement
                    </label>

                    <select
                      defaultValue=""
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                    >
                      <option value="" disabled>
                        Select arrangement
                      </option>
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-6 md:p-7">
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                    TAILORING INTENT
                  </p>

                  <h3 className="mt-3 text-xl font-semibold">
                    What should Forge prioritize?
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Choose the direction you want the future tailoring engine
                    to emphasize.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "ATS Compatibility",
                      "Achievements",
                      "Skills Relevance",
                      "Experience",
                      "Keywords",
                      "Leadership",
                      "Impact",
                      "Concise & Direct",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-cyan-400/15 bg-cyan-400/[0.035] p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                        TARGET SIGNALS
                      </p>

                      <h3 className="mt-3 text-xl font-semibold">
                        What Forge will look for.
                      </h3>
                    </div>

                    <span className="text-xs text-slate-600">
                      Pending
                    </span>
                  </div>

                  <div className="mt-7 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-sm text-slate-400">
                        Core skills
                      </span>
                      <span className="text-xs text-slate-600">
                        Awaiting input
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-sm text-slate-400">
                        Keywords
                      </span>
                      <span className="text-xs text-slate-600">
                        Awaiting input
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-sm text-slate-400">
                        Responsibilities
                      </span>
                      <span className="text-xs text-slate-600">
                        Awaiting input
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Priority signals
                      </span>
                      <span className="text-xs text-slate-600">
                        Not detected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 md:p-7">
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                    TAILORING READINESS
                  </p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Opportunity profile
                      </span>

                      <span className="text-sm font-medium text-slate-500">
                        Incomplete
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-1/4 rounded-full bg-cyan-400/40" />
                    </div>

                    <p className="mt-4 text-xs leading-5 text-slate-600">
                      Readiness will update when the required opportunity
                      information is provided. No AI assessment has been
                      performed yet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

                <section className="mt-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              FORGE ASSESSMENT
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Understand your position before you change it.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              Forge will compare your professional evidence with the target
              opportunity before any tailoring takes place.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-7 md:p-9">
              <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                    DIAGNOSTIC OVERVIEW
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    Current CV assessment
                  </h3>
                </div>

                <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-500">
                  Not assessed
                </span>
              </div>

              <div className="mt-7 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Role Alignment
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        How closely your professional background supports the
                        target role.
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-600">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Experience Evidence
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        The strength of relevant experience demonstrated in
                        your CV.
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-600">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Skills Alignment
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        How well your demonstrated skills correspond with the
                        opportunity.
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-600">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Evidence & Impact
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Whether your CV demonstrates meaningful contribution
                        and outcomes.
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-600">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        Professional Positioning
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        Whether your CV presents you at the right professional
                        level for the opportunity.
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-slate-600">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-cyan-400/15 bg-cyan-400/[0.035] p-7 md:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                  FORGE DIAGNOSTIC
                </p>

                <h3 className="mt-4 text-2xl font-semibold">
                  What Forge will determine.
                </h3>

                <div className="mt-7 space-y-4">
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-sm font-medium">
                      Strongest evidence
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      The experience most relevant to the target.
                    </p>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <p className="text-sm font-medium">
                      Missing evidence
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Important areas not sufficiently demonstrated.
                    </p>
                  </div>

                  <div className="border-b border-white/10 pb-4">
                    <p className="text-sm font-medium">
                      Positioning opportunities
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Areas where your existing experience can be presented
                      more effectively.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Refinement priorities
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      The parts of the CV that should receive attention first.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-7 md:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                  ASSESSMENT STATUS
                </p>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      CV
                    </span>
                    <span className="text-xs text-slate-600">
                      Awaiting input
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Target opportunity
                    </span>
                    <span className="text-xs text-slate-600">
                      Awaiting input
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm font-medium">
                      Forge assessment
                    </span>
                    <span className="text-xs font-medium text-cyan-300">
                      Ready when both are provided
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-xs leading-5 text-slate-600">
                  No assessment has been performed yet. Results will appear
                  here when the Forge intelligence engine is connected.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                  NEXT STAGE
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  Assessment comes first. Tailoring comes next.
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Forge will use the assessment to determine where your CV
                  needs refinement before generating a stronger targeted
                  version.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 px-4 py-2 text-xs text-slate-600">
                Tailoring workspace — Coming Soon
              </span>
            </div>
          </div>
        </section>

                 <section className="mt-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              TAILORING WORKSPACE
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Turn the assessment into a stronger CV.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              This is where Forge will refine your existing professional
              story around the target opportunity without changing the truth
              of your experience.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-7 md:p-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                TAILORING OVERVIEW
              </p>

              <h3 className="mt-4 text-2xl font-semibold">
                Your refinement plan
              </h3>

              <div className="mt-7 space-y-5">
                <div>
                  <p className="text-xs text-slate-500">Current CV</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Awaiting CV
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Target role</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Not set
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Tailoring direction</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Not selected
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-xs text-slate-500">Workspace status</p>
                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    Ready when assessment is available
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 md:p-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                    REFINEMENT AREAS
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    Where should the CV improve?
                  </h3>
                </div>

                <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs text-slate-600">
                  Not started
                </span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-cyan-400/20"
                >
                  <p className="text-sm font-semibold">
                    Professional Summary
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    Position your professional identity around the target role.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-cyan-400/20"
                >
                  <p className="text-sm font-semibold">
                    Experience
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    Strengthen how relevant experience is communicated.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-cyan-400/20"
                >
                  <p className="text-sm font-semibold">
                    Skills
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    Improve the visibility and relevance of demonstrated
                    skills.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-cyan-400/20"
                >
                  <p className="text-sm font-semibold">
                    Achievements
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    Give meaningful results and contributions stronger
                    emphasis.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-cyan-400/20 sm:col-span-2"
                >
                  <p className="text-sm font-semibold">
                    Keywords
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    Improve relevant terminology without stuffing or inventing
                    experience.
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-cyan-400/15 bg-cyan-400/[0.035] p-7 md:p-9">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                  FORGE REFINEMENT ENGINE
                </p>

                <h3 className="mt-4 text-2xl font-semibold">
                  Your CV will be refined without inventing your experience.
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Forge will eventually use the assessment, target opportunity
                  and your selected refinement areas to produce stronger,
                  more relevant wording while keeping your professional
                  history factual.
                </p>
              </div>

              <span className="w-fit shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs text-cyan-300">
                AI refinement — Coming Soon
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs tracking-[0.15em] text-slate-500">
                  CURRENT VERSION
                </p>

                <p className="mt-3 text-sm text-slate-600">
                  Your existing CV remains the source document.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs tracking-[0.15em] text-slate-500">
                  REFINED VERSION
                </p>

                <p className="mt-3 text-sm text-slate-600">
                  A targeted version will appear here when the refinement
                  engine is connected.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-7 md:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                  TAILORING CONTROLS
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  Keep the document authentic.
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-500">
                  Preserve factual experience
                </span>

                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-500">
                  Strengthen relevance
                </span>

                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-500">
                  Improve clarity
                </span>

                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-500">
                  Maintain professional tone
                </span>
              </div>
            </div>
          </div>
        </section>

                 <section className="mt-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              PROFESSIONAL PREVIEW
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              See the CV as your next opportunity will see it.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              Your tailored CV will eventually appear here as a clean,
              professional document ready for final review.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/70 p-4 md:p-7">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-3 pb-5 md:flex-row md:items-center md:px-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                  CV DOCUMENT
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Professional preview
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-600">
                Preview pending
              </span>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl bg-white text-slate-900 shadow-2xl">
              <div className="p-7 sm:p-10 md:p-14">
                <div className="border-b border-slate-200 pb-7">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                      <div className="h-5 w-48 rounded bg-slate-200" />

                      <div className="mt-4 h-3 w-32 rounded bg-slate-100" />
                    </div>

                    <div className="space-y-2 md:text-right">
                      <div className="ml-auto h-2.5 w-40 rounded bg-slate-100" />
                      <div className="ml-auto h-2.5 w-32 rounded bg-slate-100" />
                      <div className="ml-auto h-2.5 w-36 rounded bg-slate-100" />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">
                    PROFESSIONAL SUMMARY
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 w-full rounded bg-slate-100" />
                    <div className="h-2.5 w-[94%] rounded bg-slate-100" />
                    <div className="h-2.5 w-[82%] rounded bg-slate-100" />
                  </div>
                </div>

                <div className="mt-9">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">
                    CORE SKILLS
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="h-7 w-24 rounded-full bg-slate-100" />
                    <span className="h-7 w-28 rounded-full bg-slate-100" />
                    <span className="h-7 w-20 rounded-full bg-slate-100" />
                    <span className="h-7 w-32 rounded-full bg-slate-100" />
                  </div>
                </div>

                <div className="mt-9">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">
                    PROFESSIONAL EXPERIENCE
                  </p>

                  <div className="mt-5 space-y-6">
                    <div>
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div className="h-3 w-48 rounded bg-slate-200" />
                        <div className="h-2.5 w-28 rounded bg-slate-100" />
                      </div>

                      <div className="mt-3 h-2.5 w-36 rounded bg-slate-100" />

                      <div className="mt-4 space-y-2">
                        <div className="h-2.5 w-full rounded bg-slate-100" />
                        <div className="h-2.5 w-[92%] rounded bg-slate-100" />
                        <div className="h-2.5 w-[86%] rounded bg-slate-100" />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div className="h-3 w-40 rounded bg-slate-200" />
                        <div className="h-2.5 w-28 rounded bg-slate-100" />
                      </div>

                      <div className="mt-3 h-2.5 w-32 rounded bg-slate-100" />

                      <div className="mt-4 space-y-2">
                        <div className="h-2.5 w-full rounded bg-slate-100" />
                        <div className="h-2.5 w-[88%] rounded bg-slate-100" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-9 grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">
                      EDUCATION
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-40 rounded bg-slate-200" />
                      <div className="h-2.5 w-32 rounded bg-slate-100" />
                      <div className="h-2.5 w-24 rounded bg-slate-100" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">
                      ADDITIONAL INFORMATION
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="h-2.5 w-36 rounded bg-slate-100" />
                      <div className="h-2.5 w-28 rounded bg-slate-100" />
                    </div>
                  </div>
                </div>

                <div className="mt-12 border-t border-slate-200 pt-4 text-center">
                  <p className="text-[8px] tracking-wide text-slate-300">
                    Created with Freelance Forge AI
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col justify-between gap-3 px-3 md:flex-row md:items-center md:px-5">
              <p className="text-xs leading-5 text-slate-600">
                The document above is a structural preview. Your real CV
                content will appear once the tailoring engine is connected.
              </p>

              <span className="shrink-0 text-xs text-slate-600">
                Free preview branding shown
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                  PLAN OUTPUT
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  Your plan determines the final document branding.
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Free CV generations will carry a subtle Freelance Forge AI
                  attribution. Eligible paid plans will generate the document
                  without this attribution.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-500">
                  Free — Forge attribution
                </span>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-2 text-xs text-cyan-300">
                  Paid plans — No attribution
                </span>
              </div>
            </div>
          </div>
        </section>

                 <section className="mt-20 pb-10">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.08] via-slate-950 to-slate-950 p-8 md:p-12">
            <div className="relative max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.25em] text-cyan-400">
                FINAL ACTION
              </p>

              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
                Make your experience work harder.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                When your CV has been reviewed and tailored, Forge will prepare
                the final professional document for your next opportunity.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-slate-500">
                  Final review
                </span>

                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-slate-500">
                  Professional document
                </span>

                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-slate-500">
                  Plan-based output
                </span>
              </div>
            </div>

            <div className="relative mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled
                className="rounded-xl bg-cyan-400/30 px-6 py-3 text-sm font-semibold text-cyan-100"
              >
                Generate Final CV
              </button>

              <button
                type="button"
                disabled
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-500"
              >
                Review CV
              </button>
            </div>

            <p className="relative mt-5 text-xs text-slate-600">
              Final generation and document export will become available when
              the CV tailoring engine is connected.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}