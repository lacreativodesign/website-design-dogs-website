import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-background)] px-6 text-[var(--color-foreground)]">
      <div className="max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-md)]">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-primary-orange)]">404</p>
        <h1 className="mt-3 text-3xl font-black">Page not found.</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">This temporary foundation does not include that page yet.</p>
        <Link className="mt-6 inline-flex rounded-[var(--radius-full)] bg-[var(--color-primary-orange)] px-5 py-3 font-bold text-white" href="/">Return home</Link>
      </div>
    </main>
  );
}
