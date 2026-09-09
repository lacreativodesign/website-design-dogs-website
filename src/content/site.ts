export const siteConfig = {
  name: "Website Design Dogs",
  slogan: "Loyal to the game.",
  description: "Professional website design and digital growth solutions for local and growing businesses.",
  legalOwner: "LA CREATIVO GROUP, LLC",
  legalDisclosure: "Website Design Dogs is a service brand of LA CREATIVO GROUP, LLC.",
  logo: "/brand/identity/wdd-logo-horizontal-black-glasses-1600.webp",
  mascot: "/brand/mascot/wdd-mascot-transparent.png",
  contact: {
    address: {
      label: "Location",
      value: "Austin, TX 78731 USA",
    },
    email: {
      label: "Email",
      value: "hello@websitedesigndogs.com",
      href: "mailto:hello@websitedesigndogs.com",
    },
    phone: {
      label: "Phone",
      value: "+1 (512) 764-7834",
      e164: "+15127647834",
      href: "tel:+15127647834",
    },
    whatsapp: {
      label: "WhatsApp Business",
      value: "Message us on WhatsApp",
      href: "https://wa.me/15127647834?text=Hi%20Website%20Design%20Dogs%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.",
    },
    availability: {
      label: "Working hours",
      days: "Monday–Friday",
      hours: "8:00 AM–5:00 PM CT",
    },
  },
  social: {
    facebook: {
      label: "Facebook",
      href: "https://www.facebook.com/WebsiteDesignDogs",
    },
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/websitedesigndogs/",
    },
  },
  primaryCta: { label: "Get a Free Quote", href: "/get-started" },
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Platforms", href: "/platforms" },
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
      { label: "Mobile App Development", href: "/services/mobile-app-development" },
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
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
