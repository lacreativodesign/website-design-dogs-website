import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return <Link href="/" className={cn("brand-logo", className)} aria-label={`${siteConfig.name} home`}><Image src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={300} height={104} priority={priority} className="h-auto w-[172px] sm:w-[204px]" /></Link>;
}
