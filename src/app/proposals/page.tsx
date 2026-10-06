export default function ProposalsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.3em] text-cyan-400">
              FORGE PROPOSAL STUDIO
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Build proposals that win the right clients.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              Create clear, persuasive freelance proposals with a structured
              workspace designed to help you communicate your value
              professionally.
            </p>
          </div>

          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            Coming Soon
          </span>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-500">01</p>
            <h2 className="mt-4 text-xl font-semibold">Understand</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Start with the project details, client needs and key
              requirements.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-500">02</p>
            <h2 className="mt-4 text-xl font-semibold">Position</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Shape your experience, strengths and approach around the
              client&apos;s priorities.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-500">03</p>
            <h2 className="mt-4 text-xl font-semibold">Present</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Build a professional proposal that communicates your value
              clearly and confidently.
            </p>
          </div>
        </div>

                <section className="mt-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
                OPPORTUNITY BRIEF
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Give Forge the project context.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Add the information needed to understand the project and
                prepare a stronger proposal.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Project title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the project title"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Client requirements
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Paste or describe the client's requirements..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Budget
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. $500"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Deadline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 weeks"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6 md:p-8">
              <p className="text-sm font-semibold text-cyan-400">
                BRIEF STATUS
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Ready for your project details.
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Your information will eventually power the proposal
                strategy and drafting process.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3">
                  <span className="text-sm text-slate-400">
                    Project details
                  </span>
                  <span className="text-xs text-slate-600">
                    Awaiting input
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3">
                  <span className="text-sm text-slate-400">
                    Client requirements
                  </span>
                  <span className="text-xs text-slate-600">
                    Awaiting input
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3">
                  <span className="text-sm text-slate-400">
                    Proposal strategy
                  </span>
                  <span className="text-xs text-slate-600">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
                PROPOSAL STRATEGY
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Decide how you want to stand out.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Shape your proposal around your strengths, communication
                style and the client's expectations.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Proposal tone
                </label>
                <select
                  defaultValue=""
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                >
                  <option value="" disabled>
                    Select a tone
                  </option>
                  <option>Professional</option>
                  <option>Confident</option>
                  <option>Friendly</option>
                  <option>Persuasive</option>
                  <option>Consultative</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Positioning
                </label>
                <select
                  defaultValue=""
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                >
                  <option value="" disabled>
                    Choose your approach
                  </option>
                  <option>Expertise-led</option>
                  <option>Results-focused</option>
                  <option>Value-focused</option>
                  <option>Problem-solving</option>
                  <option>Long-term partnership</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Key strengths to highlight
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your relevant skills, experience or strengths..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5">
              <p className="text-sm font-semibold text-cyan-300">
                Forge Strategy Guidance
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your selected tone, positioning and strengths will
                eventually guide how your proposal is structured.
                AI-powered recommendations are coming soon.
              </p>
            </div>
          </div>
        </section>

      
        <section className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
                  PROPOSAL BUILDER
                </p>
                <h2 className="mt-3 text-2xl font-bold">
                  Shape your proposal.
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Organize your ideas into a clear, professional proposal.
                </p>
              </div>

              <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-400">
                Draft workspace
              </span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
              <aside className="space-y-2">
                {[
                  "Opening statement",
                  "Project understanding",
                  "Proposed solution",
                  "Relevant experience",
                  "Project timeline",
                  "Closing statement",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                      index === 0
                        ? "border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300"
                        : "border border-white/5 text-slate-400"
                    }`}
                  >
                    <span className="text-xs text-slate-500">
                      0{index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </aside>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Proposal draft
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Opening statement
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500">
                    Not saved
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <label className="block text-sm font-medium text-slate-300">
                    Write your opening
                  </label>
                  <textarea
                    rows={9}
                    placeholder="Introduce yourself, show that you understand the client's needs, and make a strong first impression..."
                    className="w-full resize-y rounded-xl border border-white/10 bg-slate-900/60 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                  />
                  <p className="text-xs leading-5 text-slate-500">
                    Build each part of your proposal in a clear and
                    organized way. Draft saving and AI writing support
                    will be added later.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-between gap-3">
                  <button
                    type="button"
                    disabled
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-500 opacity-60"
                  >
                    Previous section
                  </button>
                  <button
                    type="button"
                    disabled
                    className="rounded-xl bg-cyan-400/20 px-5 py-3 text-sm font-semibold text-cyan-200 opacity-60"
                  >
                    Next section →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

                <section className="mt-10">
          <div className="rounded-3xl border border-violet-400/10 bg-violet-400/[0.03] p-6 md:p-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.2em] text-violet-300">
                FORGE SUGGESTIONS
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Strengthen your proposal before you send it.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Forge will eventually review your draft and highlight
                areas that could make your proposal clearer, stronger
                and more relevant to the client.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Clarity
                </span>
                <h3 className="mt-3 font-semibold">
                  Make your message clearer
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Identify areas that may need stronger or simpler
                  communication.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Relevance
                </span>
                <h3 className="mt-3 font-semibold">
                  Stay focused on the client
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Highlight whether your proposal speaks directly to
                  the project requirements.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Impact
                </span>
                <h3 className="mt-3 font-semibold">
                  Strengthen your value
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Identify opportunities to communicate your experience
                  and value more effectively.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">
                    Forge AI review
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    AI-powered proposal suggestions will become available
                    when the Forge intelligence system is connected.
                  </p>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-500">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </section>

                <section className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
                  PROPOSAL PREVIEW
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Review your proposal.
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  A polished preview of your completed proposal will
                  appear here.
                </p>
              </div>

              <span className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-500">
                Preview Mode
              </span>
            </div>

            <div className="mt-8 flex justify-center rounded-2xl border border-white/10 bg-slate-950 p-4 md:p-8">
              <article className="w-full max-w-3xl rounded-lg bg-white px-7 py-9 text-slate-900 shadow-2xl md:px-12 md:py-14">
                <div className="border-b border-slate-200 pb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Freelance Proposal
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Your Project Proposal
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Prepared with Forge Proposal Studio
                  </p>
                </div>

                <div className="space-y-7 pt-7">
                  <div>
                    <h4 className="font-semibold">
                      Opening Statement
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Your introduction and opening message will appear
                      here once your proposal is completed.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Project Understanding
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Your understanding of the client&apos;s needs will
                      appear here.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Proposed Solution
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Your proposed approach and solution will appear
                      here.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Relevant Experience
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Your relevant experience and strengths will appear
                      here.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      Project Timeline
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Your expected timeline and delivery approach will
                      appear here.
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-7">
                    <h4 className="font-semibold">
                      Closing Statement
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Your closing message and call to action will appear
                      here.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

                <section className="mt-10 pb-6">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-transparent p-8 md:p-12">
            <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
              YOUR EXPERIENCE. YOUR VALUE. YOUR PROPOSAL.
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              Put your best case forward.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
              Build a proposal that communicates your understanding,
              experience and value with clarity and confidence.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                disabled
                className="rounded-xl bg-cyan-400/20 px-5 py-3 text-sm font-semibold text-cyan-200 opacity-70"
              >
                Build My Proposal →
              </button>

              <span className="flex items-center rounded-xl border border-white/10 px-5 py-3 text-xs text-slate-500">
                Proposal generation coming soon
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}