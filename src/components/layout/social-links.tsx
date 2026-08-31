import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/icon";

const socialLinks = [
  { ...siteConfig.social.facebook, icon: "facebook" },
  { ...siteConfig.social.instagram, icon: "instagram" },
  {
    label: "WhatsApp",
    href: siteConfig.contact.whatsapp.href,
    icon: "whatsapp",
  },
] as const;

export function SocialLinks({
  className,
  label = "Website Design Dogs social profiles",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("footer-socials", className)} aria-label={label}>
      {socialLinks.map((social) =>
        social.href ? (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
          >
            <SocialIcon name={social.icon} />
          </a>
        ) : (
          <span
            key={social.label}
            className="footer-socials__pending"
            aria-label={`${social.label} profile link pending`}
            aria-disabled="true"
            title={`${social.label} profile link pending`}
          >
            <SocialIcon name={social.icon} />
          </span>
        ),
      )}
    </div>
  );
}
