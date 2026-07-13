import { cn } from "@/lib/utils";
export function Section({ children, className, alternate = false, id }: { children: React.ReactNode; className?: string; alternate?: boolean; id?: string }) {
  return <section id={id} className={cn("py-16 sm:py-20 lg:py-28", alternate && "bg-[var(--color-section-alt)]", className)}>{children}</section>;
}
