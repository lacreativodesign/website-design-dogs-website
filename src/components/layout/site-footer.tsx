import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { siteConfig } from "@/content/site";
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
        <li>
          <a
            className="footer-link"
            href={siteConfig.contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.contact.whatsapp.label}
          </a>
        </li>
        <li>
          <Link className="footer-link" href="/get-started">
            Get a Free Quote
          </Link>
        </li>
      </ul>
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
        <div className="grid gap-7 lg:grid-cols-[1.4fr_0.8fr_1fr_0.8fr]">
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
