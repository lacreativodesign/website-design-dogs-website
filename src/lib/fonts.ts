import localFont from "next/font/local";

export const headingFont = localFont({
  src: [
    { path: "../app/fonts/barlow-semi-condensed-400.woff2", weight: "400" },
    { path: "../app/fonts/barlow-semi-condensed-600.woff2", weight: "600" },
    { path: "../app/fonts/barlow-semi-condensed-700.woff2", weight: "700" },
    { path: "../app/fonts/barlow-semi-condensed-800.woff2", weight: "800" },
    { path: "../app/fonts/barlow-semi-condensed-900.woff2", weight: "900" },
  ],
  display: "swap",
  variable: "--font-heading",
});

export const bodyFont = localFont({
  src: "../app/fonts/manrope-variable.woff2",
  display: "swap",
  variable: "--font-body",
  weight: "200 800",
});
