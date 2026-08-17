import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://connect.facebook.net",
  "frame-src https://challenges.cloudflare.com",
  "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "style-src 'self' 'unsafe-inline'",
  "base-uri 'self'",
  "form-action 'self'",
];

const previewRobotsHeader = { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" };
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "Content-Security-Policy", value: csp.join("; ") },
];

function shouldNoindexDeployment(): boolean {
  return process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";
}

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: shouldNoindexDeployment() ? [...securityHeaders, previewRobotsHeader] : securityHeaders }];
  },
};
export default nextConfig;
