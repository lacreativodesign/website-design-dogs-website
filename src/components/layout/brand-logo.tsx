import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("brand-logo", className)} aria-label={`${siteConfig.name} home`}>
      <Image
        src={siteConfig.logo}
        alt=""
        width={58}
        height={64}
        priority={priority}
        className="brand-logo__mark"
      />
      <span className="brand-logo__wordmark" aria-hidden="true">
        <span>Website Design</span>
        <strong>Dogs</strong>
      </span>
    </Link>
  );
}
