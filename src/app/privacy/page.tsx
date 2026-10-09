import Link from "next/link";

export default function PrivacyPage() {
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
        <p className="text-[11px] tracking-[0.3em] text-cyan-400/80 mb-4">PRIVACY POLICY</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-xs text-violet-200/50 mb-10">Last updated: 9 October 2026</p>

        <div className="space-y-8 text-sm text-violet-100/75 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">1. Overview</h2>
            <p>Freelance Forge AI ("FORGE") is a career intelligence platform. This policy explains what personal data we collect, how we use it, and your rights. We aim to collect as little as possible while providing the Service.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">2. What we collect</h2>
            <p>When you use FORGE, we collect: your name and email (from sign-up), your password (stored securely by our authentication provider, never readable by us), professional details you choose to provide (profile, CV content, opportunities, memory preferences), and technical data required to run the Service (usage counts, AI request logs).</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">3. How we use it</h2>
            <p>Your data is used to: (a) authenticate you, (b) provide the features you use, (c) send AI requests on your behalf, (d) enforce fair-use limits on your account, and (e) improve the reliability of the Service. We do not sell your data. We do not share your CVs or proposals with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">4. Third-party services</h2>
            <p>FORGE uses the following providers to operate: Supabase (authentication and database storage, hosted in West EU/Ireland), Groq (AI model inference for generating assessments and refinements), and other infrastructure providers as needed. Data sent to AI providers is limited to the content necessary to produce the output you requested.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">5. Your rights (GDPR)</h2>
            <p>If you are located in the European Economic Area or United Kingdom, you have the right to: access the personal data we hold about you, request correction of inaccuracies, request deletion of your account and data, and object to or restrict certain processing. To exercise any of these rights, contact us via <Link href="/support" className="text-cyan-400 hover:text-cyan-300">Support</Link>.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">6. Data retention</h2>
            <p>We retain your account data for as long as your account exists. If you delete your account, associated data is removed within a reasonable period, except where retention is required for legal or accounting reasons.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">7. Security</h2>
            <p>We use industry-standard security practices including encrypted connections, isolated database access, and row-level access controls so that users can only access their own data. No online service is perfectly secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">8. Children</h2>
            <p>The Service is not intended for users under 16. We do not knowingly collect data from anyone under this age.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">9. Changes</h2>
            <p>We may update this policy from time to time. Continued use of the Service after changes means you accept the updated policy.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">10. Contact</h2>
            <p>For privacy-related questions, contact us at <Link href="/support" className="text-cyan-400 hover:text-cyan-300">Support</Link>.</p>
          </section>
        </div>
      </main>
      <footer className="border-t border-violet-500/10 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between text-[11px] text-violet-200/40">
          <span>Freelance Forge AI · part of the FORGE ecosystem</span>
          <Link href="/terms" className="hover:text-white transition">Terms of Service →</Link>
        </div>
      </footer>
    </div>
  );
}
