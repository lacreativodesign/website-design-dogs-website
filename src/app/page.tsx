import { BRAND_RELATIONSHIP, SITE_NAME, SITE_SLOGAN } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.20),transparent_32rem),linear-gradient(135deg,#061529_0%,#0B1F3A_48%,#102B4F_100%)] px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[var(--container-width)] items-center">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-orange)] shadow-[var(--shadow-sm)]">
            {SITE_SLOGAN}
          </p>
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">{SITE_NAME}</h1>
          <p className="mt-6 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
            Professional websites built to deliver results.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            {BRAND_RELATIONSHIP}
          </p>
          <div className="mt-10 rounded-[var(--radius-lg)] border border-white/12 bg-white/10 p-6 shadow-[var(--shadow-md)] backdrop-blur">
            <p className="text-base leading-7 text-white/90">
              The full Website Design Dogs marketing website is being built. This temporary Next.js foundation is ready for the next implementation phase.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
