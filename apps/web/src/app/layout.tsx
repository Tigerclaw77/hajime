import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hajime Japan",
    template: "%s | Hajime Japan",
  },
  description:
    "Business formation coordination for Japan, with one clear plan across local professionals, documents, and next steps.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Hajime Japan",
    title: "Business Formation Coordination for Japan",
    description: "One clear plan across local professionals, documents, and next steps.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Formation Coordination for Japan",
    description: "One clear plan across local professionals, documents, and next steps.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
