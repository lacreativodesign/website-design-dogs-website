import localFont from "next/font/local";

export const headingFont = localFont({
  src: "../app/fonts/manrope-variable.woff2",
  display: "swap",
  variable: "--font-heading",
  weight: "200 800",
  preload: false,
});

export const bodyFont = localFont({
  src: "../app/fonts/manrope-variable.woff2",
  display: "swap",
  variable: "--font-body",
  weight: "200 800",
});
