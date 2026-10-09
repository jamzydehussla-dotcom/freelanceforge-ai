import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f0524] text-white">
      <header className="border-b border-violet-500/10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <span className="text-sm font-semibold tracking-[0.2em] text-cyan-300">FORGE</span>
          </Link>
          <Link href="/" className="text-xs text-violet-200/60 hover:text-white transition">Back to home</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-[11px] tracking-[0.3em] text-cyan-400/80 mb-4">TERMS OF SERVICE</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-xs text-violet-200/50 mb-10">Last updated: 9 October 2026</p>

        <div className="space-y-8 text-sm text-violet-100/75 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">1. About these terms</h2>
            <p>Freelance Forge AI ("FORGE", "the Service") is a career intelligence platform for freelancers. By creating an account or using the Service, you agree to these terms. If you do not agree, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">2. Your account</h2>
            <p>You are responsible for maintaining the security of your account and password. You must provide accurate information when signing up. You must be at least 16 years old to use the Service.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">3. Use of AI</h2>
            <p>FORGE uses third-party AI models to generate assessments, refinements and other outputs. AI outputs are suggestions, not guarantees. You are responsible for reviewing any output before using it (for example, before sending a CV to an employer). FORGE does not invent facts about your experience — its outputs are drawn from information you provide — but you should still verify accuracy.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">4. Acceptable use</h2>
            <p>You agree not to misuse the Service. This includes attempting to bypass usage limits, abusing free tiers, submitting unlawful content, or using the Service to harass others. We may suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">5. Plans and billing</h2>
            <p>Free and paid tiers may be offered. Paid plans, when active, will be billed monthly and renew automatically unless cancelled. Prices and limits are subject to change with reasonable notice.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">6. Your content</h2>
            <p>You retain ownership of any content you submit (CVs, opportunities, proposals). By using the Service, you grant us a limited licence to process that content for the purpose of providing the Service.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">7. Limitation of liability</h2>
            <p>The Service is provided "as is". We do not guarantee employment outcomes, interview success, or specific results. To the maximum extent permitted by law, our liability is limited to the amount you paid us in the previous twelve months.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">8. Changes</h2>
            <p>We may update these terms from time to time. Continued use of the Service after changes means you accept the updated terms.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">9. Contact</h2>
            <p>For questions about these terms, contact us at <Link href="/support" className="text-cyan-400 hover:text-cyan-300">Support</Link>.</p>
          </section>
        </div>
      </main>
      <footer className="border-t border-violet-500/10 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between text-[11px] text-violet-200/40">
          <span>Freelance Forge AI · part of the FORGE ecosystem</span>
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy →</Link>
        </div>
      </footer>
    </div>
  );
}
