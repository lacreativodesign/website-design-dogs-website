import Link from "next/link";
import { siteConfig } from "@/content/site";
import { BrandLogo } from "./brand-logo";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";

function FooterList({ title, items }: { title: string; items: readonly { label: string; href: string }[] }) { return <div><h2 className="footer-title">{title}</h2><ul className="mt-4 grid gap-3">{items.map((item) => <li key={`${title}-${item.label}`}><Link className="footer-link" href={item.href}>{item.label}</Link></li>)}</ul></div>; }
export function SiteFooter() {
  const year = new Date().getFullYear();
  return <footer className="site-footer"><div className="mx-auto max-w-[var(--container-width)] px-5 py-14 sm:px-6 lg:px-8 lg:py-18"><div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_1fr_0.8fr]"><div><BrandLogo /><p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-primary-orange)]">{siteConfig.slogan}</p><p className="mt-4 max-w-sm text-base leading-7 text-white/78">{siteConfig.description}</p><p className="mt-4 max-w-sm text-sm leading-6 text-white/68">{siteConfig.legalDisclosure}</p></div><FooterList title="Company" items={siteConfig.footer.company} /><FooterList title="Services" items={siteConfig.footer.services} /><FooterList title="Support" items={siteConfig.footer.support} /></div><div className="mt-12 flex flex-col gap-5 border-t border-white/12 pt-8"><nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Legal navigation">{siteConfig.footer.legal.map((item) => <Link key={item.href} className="footer-legal-link" href={item.href}>{item.label}</Link>)}<CookieSettingsButton /></nav><p className="text-sm leading-6 text-white/62">© {year} {siteConfig.name}. A service brand of {siteConfig.legalOwner}.</p></div></div></footer>;
}
