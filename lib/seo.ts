// Single source for the canonical site URL and the sitewide structured data (Organization + WebSite).
import { company, socials } from "@/lib/site";

export const SITE_URL = "https://cloute.co.in";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** The PIN code is read from the address in content/common.json so the two never drift apart. */
const postalCode = company.address.match(/\b(\d{6})\b/)?.[1];

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: company.name,
  legalName: company.legalName,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/cloute-logo.png`,
  description:
    "Cloute Technologies is an IT solutions company in Bengaluru, India, offering networking and infrastructure, software development, IT support, managed IT, cybersecurity, cloud, digital marketing, IT hardware supply and IT recruitment.",
  email: company.supportEmail,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1125, 21st A-cross 14th Main, Sector 3, HSR Layout",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    ...(postalCode ? { postalCode } : {}),
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: company.phone,
      email: company.supportEmail,
      areaServed: "IN",
      availableLanguage: ["English"],
    },
    { "@type": "ContactPoint", contactType: "sales", email: company.salesEmail, areaServed: "IN" },
  ],
  sameAs: socials.filter((item) => item.network !== "whatsapp").map((item) => item.href),
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: company.name,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}
