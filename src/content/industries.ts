export type Industry = {
  slug: string;
  title: string;
  marker: string;
  description: string;
  websiteFocus: string;
};

export const industries: Industry[] = [
  {
    slug: "home-services",
    title: "Home Services",
    marker: "HS",
    description: "Clear service areas, trust information, and quote paths.",
    websiteFocus: "Make urgent next steps easy to find.",
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    marker: "PS",
    description: "Authority-led pages that organize expertise and enquiries.",
    websiteFocus: "Turn complex offers into a clear decision path.",
  },
  {
    slug: "health-wellness",
    title: "Health & Wellness",
    marker: "HW",
    description: "Accessible service information and simple appointment paths.",
    websiteFocus: "Help visitors understand services before contacting you.",
  },
  {
    slug: "restaurants-hospitality",
    title: "Restaurants & Hospitality",
    marker: "RH",
    description: "Mobile-first menus, location details, and booking actions.",
    websiteFocus: "Put high-intent information within easy reach.",
  },
  {
    slug: "retail-ecommerce",
    title: "Retail & E-Commerce",
    marker: "EC",
    description: "Product discovery, collection structure, and purchase journeys.",
    websiteFocus: "Reduce friction between discovery and checkout.",
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    marker: "RE",
    description: "Focused property, service, and lead-capture experiences.",
    websiteFocus: "Connect the right visitor with the right next step.",
  },
  {
    slug: "creative-businesses",
    title: "Creative Businesses",
    marker: "CB",
    description: "Distinctive work presentation without losing usability.",
    websiteFocus: "Balance personality, proof, and practical conversion.",
  },
  {
    slug: "local-organizations",
    title: "Local Organizations",
    marker: "LO",
    description: "Useful information architecture for community audiences.",
    websiteFocus: "Make programs, updates, and contact routes easier to use.",
  },
];

export const industryBySlug = new Map(
  industries.map((industry) => [industry.slug, industry]),
);
