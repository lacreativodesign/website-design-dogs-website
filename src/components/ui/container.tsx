import { cn } from "@/lib/utils";
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full max-w-[var(--container-width)] px-5 sm:px-6 lg:px-8 mx-auto", className)}>{children}</div>;
}
