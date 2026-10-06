
export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold tracking-[0.3em] text-cyan-400">
          FORGE ALERTS
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Stay informed. Stay in control.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              Your central place to track important notifications,
              account updates, reminders and activity across your
              Forge workspace.
            </p>
          </div>

          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
            Coming Soon
          </span>
        </div>
      </div>
            <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">New Alerts</p>
            <p className="mt-3 text-3xl font-bold">—</p>
            <p className="mt-2 text-xs text-slate-500">
              Notifications not yet reviewed
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">Unread</p>
            <p className="mt-3 text-3xl font-bold">—</p>
            <p className="mt-2 text-xs text-slate-500">
              Updates awaiting attention
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">Reminders</p>
            <p className="mt-3 text-3xl font-bold">—</p>
            <p className="mt-2 text-xs text-slate-500">
              Important upcoming reminders
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">Platform Updates</p>
            <p className="mt-3 text-3xl font-bold">—</p>
            <p className="mt-2 text-xs text-slate-500">
              Updates and announcements from Forge
            </p>
          </div>
        </div>
      </section>
            <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
              NOTIFICATION STREAM
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Your latest updates
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Important notifications and reminders will appear here.
            </p>
          </div>

          <div className="relative border-l border-white/10 pl-6">
            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-cyan-400" />

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold">
                    Your alert center is ready.
                  </h3>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                    Coming Soon
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your notifications will appear here once the alert
                  system is connected.
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Standard</span>
                  <span>•</span>
                  <span>Awaiting connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
              ALERT PREFERENCES
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Choose how Forge keeps you informed.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Notification controls will become available when the alert
              system is connected.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Account notifications",
                "Security alerts",
                "Platform announcements",
                "Important reminders",
                "Email notifications",
                "In-app notifications",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 px-5 py-4"
                >
                  <span className="text-sm font-medium">{item}</span>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold text-cyan-400">
              NOTIFICATION CONTROL
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Your preferences stay yours.
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              When notification controls are enabled, you will be able
              to decide which updates you receive and where they appear.
            </p>
          </div>
        </div>
      </section>

            <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400">
              NOTIFICATION PRIORITY
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Know what needs your attention.
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Forge will organize notifications by importance so
              critical updates stand out without making everything
              feel urgent.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.03] p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
                Critical
              </span>

              <h3 className="mt-3 font-semibold">
                Urgent account notices
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Important security or account notices that may require
                immediate attention.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                High
              </span>

              <h3 className="mt-3 font-semibold">
                Important updates
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Updates that matter and may require you to take action.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Standard
              </span>

              <h3 className="mt-3 font-semibold">
                General notifications
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                General announcements and routine notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

            <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-transparent p-8 md:p-12">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
            YOUR WORKSPACE. YOUR CONTROL.
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Never miss what matters.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            Stay on top of important updates, manage your notification
            preferences and keep your Forge experience organized.
          </p>

          <button
            type="button"
            className="mt-7 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Manage Alert Preferences →
          </button>
        </div>
      </section>
    </main>
  );
}
