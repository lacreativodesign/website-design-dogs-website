import type { NextConfig } from "next";

const csp = (frameAncestors: "'none'" | "'self'") => [
  "default-src 'self'",
  "object-src 'none'",
  `frame-ancestors ${frameAncestors}`,
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://connect.facebook.net",
  "frame-src 'self' https://challenges.cloudflare.com",
  "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "style-src 'self' 'unsafe-inline'",
  "base-uri 'self'",
  "form-action 'self'",
];

const previewRobotsHeader = {
  key: "X-Robots-Tag",
  value: "noindex, nofollow, noarchive",
};

const sharedSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const securityHeaders = [
  ...sharedSecurityHeaders,
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: csp("'none'").join("; ") },
];

const portfolioConceptHeaders = [
  ...sharedSecurityHeaders,
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: csp("'self'").join("; ") },
];

function shouldNoindexDeployment(): boolean {
  return (
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development"
  );
}

function withPreviewRobots(
  headers: ReadonlyArray<{ key: string; value: string }>,
) {
  return shouldNoindexDeployment()
    ? [...headers, previewRobotsHeader]
    : [...headers];
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/offers",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/portfolio/live",
        destination: "/portfolio/live/index.html",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/portfolio/live/:path*",
        headers: withPreviewRobots(portfolioConceptHeaders),
      },
      {
        source: "/:path((?!portfolio/live).*)",
        headers: withPreviewRobots(securityHeaders),
      },
    ];
  },
};

export default nextConfig;
