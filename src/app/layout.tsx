import type { Metadata } from "next";
import "./globals.css";
import { rootMetadata } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
