import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, SITE_URL, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display face carried over from the original HTML site's headings.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Looking for a reliable networking company in India? Cloute Technologies provides secure IT networking, cloud solutions and managed IT services for businesses across India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Every page sets its own full title (already ending in the brand name), so no "%s | Brand" template is used.
  title: "Networking Company in India | Cloute Technologies",
  description,
  applicationName: "Cloute Technologies",
  keywords: [
    "IT solutions company in Bangalore",
    "networking company in India",
    "managed IT services",
    "cybersecurity services",
    "cloud services",
    "software development company",
    "IT support and helpdesk",
    "IT hardware supplier",
    "IT recruitment",
    "Cloute Technologies",
  ],
  authors: [{ name: "Cloute Technologies", url: SITE_URL }],
  creator: "Cloute Technologies",
  publisher: "Cloute Technologies",
  // "./" resolves to each page's own URL; pages with an explicit canonical override it.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "Cloute Technologies",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", site: "@ClouteTech" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1e39",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <body className="flex min-h-svh flex-col">
        <JsonLd graph={[organizationJsonLd, websiteJsonLd]} />
        {children}
      </body>
    </html>
  );
}
