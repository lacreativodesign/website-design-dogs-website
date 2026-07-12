"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-background)] px-6 text-[var(--color-foreground)]">
      <div className="max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-md)]">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-primary-orange)]">Error</p>
        <h1 className="mt-3 text-3xl font-black">Something went wrong.</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">Please try reloading this experience.</p>
        <button className="mt-6 rounded-[var(--radius-full)] bg-[var(--color-primary-orange)] px-5 py-3 font-bold text-white" onClick={reset}>Try again</button>
      </div>
    </main>
  );
}
