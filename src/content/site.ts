export const siteConfig = {
  name: "Website Design Dogs",
  slogan: "Loyal to the game.",
  description: "Professional website design and digital growth solutions for local and growing businesses.",
  legalOwner: "LA CREATIVO GROUP, LLC",
  legalDisclosure: "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
  logo: "/brand/logos/wdd-primary-full-color.svg",
  mascot: "/brand/mascot/wdd-mascot-transparent.png",
  primaryCta: { label: "Get a Free Quote", href: "/get-started" },
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Packages", href: "/packages" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  footer: {
    company: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact Us", href: "/contact" },
    ],
    services: [
      { label: "Website Design", href: "/services" },
      { label: "Website Development", href: "/services" },
      { label: "E-Commerce Solutions", href: "/services" },
      { label: "SEO & Local Optimization", href: "/services" },
      { label: "Website Care", href: "/services" },
    ],
    support: [
      { label: "Packages", href: "/packages" },
      { label: "FAQ", href: "/faq" },
      { label: "Get a Free Quote", href: "/get-started" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Refund & Cancellation", href: "/refund-cancellation-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
} as const;

export type SiteNavItem = (typeof siteConfig.primaryNav)[number];
