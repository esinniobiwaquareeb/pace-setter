import { useEffect } from "react";
import { BUSINESS_NAME } from "../landing/content";

interface SEOProps {
  title: string;
  description: string;
}

const SITE_URL = "https://www.pacesettercleaning.co.uk";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT =
  "Pace Setter Cleaning Service branded preview for residential, office, commercial, and specialist cleaning.";

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${BUSINESS_NAME}`;
    const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/$/, "");
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertLink("canonical", canonicalUrl);
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", OG_IMAGE);
    upsertMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", OG_IMAGE);
    upsertMeta('meta[property="og:image:type"]', "property", "og:image:type", "image/png");
    upsertMeta('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    upsertMeta('meta[property="og:image:height"]', "property", "og:image:height", "630");
    upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", OG_IMAGE_ALT);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", OG_IMAGE);
    upsertMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", OG_IMAGE_ALT);
  }, [title, description]);

  return null;
}
