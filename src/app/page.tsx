import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0524] text-white">
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-[130px]" />

      <header className="relative z-10 border-b border-violet-500/10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <span className="text-sm font-semibold tracking-[0.2em] text-cyan-300" style={{ textShadow: "0 0 10px rgba(34,211,238,0.6)" }}>FORGE</span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link href="/pricing" className="text-sm text-violet-100/70 hover:text-white transition">Pricing</Link>
            <Link href="/signin" className="text-sm text-violet-100/70 hover:text-white transition">Sign in</Link>
            <Link href="/signup" className="text-sm font-semibold text-black px-4 py-1.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>Get started</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-2xl mx-auto px-6 pt-20 pb-16 text-center">
          <p className="text-[11px] tracking-[0.3em] text-cyan-400/80 mb-5">FREELANCE FORGE AI</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]" style={{ textShadow: "0 0 40px rgba(139,92,246,0.35)" }}>
            Your career, sharpened by intelligence.
          </h1>
          <p className="mt-6 text-base text-violet-200/60 leading-relaxed">
            Discover opportunities, judge which deserve your time, and position yourself to win them.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <Link href="/signup" className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)" }}>Get started</Link>
            <Link href="/signin" className="text-sm font-medium text-violet-100/80 hover:text-white px-6 py-2.5 rounded-lg border border-violet-500/30 hover:border-violet-400/50 transition">Sign in</Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-violet-500/15 bg-violet-500/10">
            <div className="bg-[#12072b]/80 p-6">
              <p className="text-[10px] tracking-[0.2em] text-cyan-400/70 mb-3 font-mono">01 · DISCOVER</p>
              <p className="text-sm text-violet-100/70 leading-relaxed">Opportunities filtered to what actually fits you.</p>
            </div>
            <div className="bg-[#12072b]/80 p-6">
              <p className="text-[10px] tracking-[0.2em] text-cyan-400/70 mb-3 font-mono">02 · DECIDE</p>
              <p className="text-sm text-violet-100/70 leading-relaxed">Judgement, with reasoning — not guesswork.</p>
            </div>
            <div className="bg-[#12072b]/80 p-6">
              <p className="text-[10px] tracking-[0.2em] text-cyan-400/70 mb-3 font-mono">03 · POSITION</p>
              <p className="text-sm text-violet-100/70 leading-relaxed">CVs and proposals shaped around the opportunity.</p>
            </div>
          </div>
          <p className="text-center text-xs text-violet-200/40 mt-8">
            Building in the open. Account creation, sign-in and your Command Center are live today.
          </p>
        </section>
      </main>

      <footer className="relative z-10 border-t border-violet-500/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-[11px] text-violet-200/40">
          <div className="flex items-center gap-2">
            <img src="/forge-logo.svg" alt="" width={14} height={14} className="opacity-70" />
            <span>Freelance Forge AI · part of the FORGE ecosystem</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <span>Built by the founder</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
