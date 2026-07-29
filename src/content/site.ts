export const siteConfig = {
  name: "Website Design Dogs",
  slogan: "Loyal to the game.",
  description: "Professional website design and digital growth solutions for local and growing businesses.",
  legalOwner: "LA CREATIVO GROUP, LLC",
  legalDisclosure: "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
  logo: "/brand/logos/wdd-logo-dark.svg",
  mascot: "/brand/mascot/wdd-mascot-transparent.png",
  contact: {
    email: {
      label: "Email",
      value: "hello@websitedesigndogs.com",
      href: "mailto:hello@websitedesigndogs.com",
    },
    phone: {
      label: "Phone",
      value: "+1 (415) 900-2374",
      e164: "+14159002374",
      href: "tel:+14159002374",
    },
    whatsapp: {
      label: "WhatsApp Business",
      value: "Message us on WhatsApp",
      href: "https://wa.me/14159002374?text=Hi%20Website%20Design%20Dogs%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.",
    },
  },
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
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
    services: [
      { label: "Custom Website Design", href: "/services/custom-website-design" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "E-Commerce Solutions", href: "/services/e-commerce-solutions" },
      { label: "SEO & Local Optimization", href: "/services/seo-local-optimization" },
      { label: "Website Care", href: "/services/hosting-security" },
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
