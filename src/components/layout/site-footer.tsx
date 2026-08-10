import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { siteConfig } from "@/content/site";
import { SocialIcon } from "@/components/ui/icon";
import { BrandLogo } from "./brand-logo";

function FooterList({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="footer-title">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link className="footer-link" href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContact({ compact }: { compact: boolean }) {
  return (
    <div>
      <h2 className="footer-title">
        {compact ? "Project Enquiries" : "Contact"}
      </h2>
      <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/74">
        <li>
          <a className="footer-link" href={siteConfig.contact.email.href}>
            {siteConfig.contact.email.value}
          </a>
        </li>
        <li>
          <a className="footer-link" href={siteConfig.contact.phone.href}>
            {siteConfig.contact.phone.value}
          </a>
        </li>
        <li>{siteConfig.contact.address.value}</li>
      </ul>
    </div>
  );
}

function FooterSocials() {
  const socialLinks = [siteConfig.social.facebook, siteConfig.social.instagram] as const;

  return (
    <div className="footer-socials" aria-label="Website Design Dogs social profiles">
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
            <SocialIcon name={social.label.toLowerCase() as "facebook" | "instagram"} />
          </a>
        ) : (
          <span
            key={social.label}
            className="footer-socials__pending"
            aria-label={`${social.label} profile link pending`}
            aria-disabled="true"
            title={`${social.label} profile link pending`}
          >
            <SocialIcon name="instagram" />
          </span>
        ),
      )}
    </div>
  );
}

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`site-footer${compact ? " site-footer--compact" : ""}`}
    >
      <div className="mx-auto max-w-[var(--container-width)] px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="footer-grid grid gap-7 lg:grid-cols-[1.25fr_0.75fr_1.1fr_1fr]">
          <div>
            <BrandLogo />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary-orange)]">
              {siteConfig.slogan}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
              {siteConfig.description}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/68">
              {siteConfig.legalDisclosure}
            </p>
            <FooterSocials />
          </div>
          <FooterList
            title={compact ? "Quick Links" : "Company"}
            items={siteConfig.footer.company}
          />
          <FooterList title="Services" items={siteConfig.footer.services} />
          <FooterContact compact={compact} />
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-5">
          <nav
            className="flex flex-wrap gap-x-6 gap-y-3"
            aria-label="Legal navigation"
          >
            {siteConfig.footer.legal.map((item) => (
              <Link
                key={item.href}
                className="footer-legal-link"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton />
          </nav>
          <p className="text-sm leading-6 text-white/62">
            © {year} {siteConfig.name}. A service brand of{" "}
            {siteConfig.legalOwner}.
          </p>
        </div>
      </div>
    </footer>
  );
}
