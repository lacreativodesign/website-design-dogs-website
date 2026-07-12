import { cn } from "@/lib/utils";
import { Badge } from "./badge";
export function SectionHeading({ eyebrow, title, children, className }: { eyebrow?: string; title: string; children?: React.ReactNode; className?: string }) {
  return <div className={cn("max-w-3xl", className)}>{eyebrow ? <Badge>{eyebrow}</Badge> : null}<h2 className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-4xl">{title}</h2>{children ? <p className="mt-4 text-lg leading-8 text-[var(--color-text-muted)]">{children}</p> : null}</div>;
}
