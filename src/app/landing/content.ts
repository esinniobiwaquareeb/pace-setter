import type { NavItem } from "./types";
import { DEFAULT_SITE_CONTENT, INITIAL_FORM } from "./site-content";

export const SITE_URL = DEFAULT_SITE_CONTENT.contact.websiteUrl;
export const BUSINESS_NAME = DEFAULT_SITE_CONTENT.contact.businessName;
export const WHATSAPP_PRIMARY = DEFAULT_SITE_CONTENT.contact.whatsappPrimary;
export const WHATSAPP_SECONDARY = DEFAULT_SITE_CONTENT.contact.whatsappSecondary;
export const PHONE_PRIMARY = DEFAULT_SITE_CONTENT.contact.phonePrimary;
export const INFO_EMAIL = DEFAULT_SITE_CONTENT.contact.email;
export { INITIAL_FORM };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Book", href: "#book" },
];
