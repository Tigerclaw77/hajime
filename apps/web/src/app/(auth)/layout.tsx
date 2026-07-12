import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="brand-mark" aria-hidden="true">
          始
        </div>
        <div className="w-full max-w-sm">{children}</div>
        <p className="text-xs text-faint">Business launch coordination, clearly managed.</p>
      </section>
      <section className="auth-context" aria-label="Service principles">
        <div className="max-w-lg">
          <span className="text-xs font-semibold text-white/60">One calm operating view</span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white">
            Know what is happening, who owns it, and what comes next.
          </h2>
          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/15 pt-6 text-xs leading-5 text-white/55">
            <p>Clear project stage</p>
            <p>Accountable ownership</p>
            <p>Honest timing</p>
          </div>
        </div>
      </section>
    </main>
  );
}
