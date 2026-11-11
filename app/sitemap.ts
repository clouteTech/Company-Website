import type { MetadataRoute } from "next";

import blogs from "@/content/blogs.json";
import { SITE_URL } from "@/lib/seo";

// Public pages only (every route below exists under app/(site)). /enquiries and /thank-you are noindex and left out.
const routes = [
  "",
  "/about-us",
  "/blogs",
  "/cloud-services",
  "/contact",
  "/cybersecurity-services",
  "/digital-marketing-services",
  "/it-support-and-helpdesk",
  "/managed-it-services",
  "/networking-and-infrastructure",
  "/products",
  "/recruitment",
  "/software-development-services",
  "/technology",
];

// A fixed date, not new Date(): claiming every page changed on every request misleads crawlers (and the
// current time can't be read during prerendering with cacheComponents enabled).
const latestPost = blogs.posts.reduce((latest, post) => (post.isoDate > latest ? post.isoDate : latest), "2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: route === "/blogs" ? latestPost : undefined,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
  const posts = blogs.posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: post.isoDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
