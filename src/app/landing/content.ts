import type { FormState, NavItem, Review, Service } from "./types";

export const SITE_URL = "https://www.pacesettercleaning.co.uk";
export const BUSINESS_NAME = "Pace Setter Cleaning Services LTD";
export const WHATSAPP_PRIMARY = "https://wa.me/447894239785";
export const WHATSAPP_SECONDARY = "https://wa.me/447884310461";
export const PHONE_PRIMARY = "+44 7894 239785";
export const INFO_EMAIL = "info@pacesettercleaning.co.uk";
export const HERO_ROTATING_WORDS = [
  "We Care",
  "We Restore",
  "We Refresh",
  "We Deliver",
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book", href: "#book" },
];

export const SERVICES: Service[] = [
  {
    title: "Residential Cleaning",
    description:
      "Reliable residential cleaning services for kitchens, bathrooms, bedrooms, living areas, floors, and high-touch surfaces, helping your home stay fresh, healthy, and guest-ready.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Office Cleaning",
    description:
      "Professional office cleaning for desks, meeting rooms, washrooms, reception areas, and shared spaces, designed to keep your workplace clean, organised, and client-ready.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Commercial Cleaning",
    description:
      "Commercial cleaning services for retail spaces, shared buildings, and customer-facing environments where presentation, hygiene, and daily consistency matter.",
    image: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=900&q=80",
  },
];

export const REVIEWS: Review[] = [
  {
    name: "Sarah J.",
    role: "Homeowner",
    text: "Quick, efficient, and genuinely easy to deal with. The team paid attention to details.",
  },
  {
    name: "David R.",
    role: "Small Business Owner",
    text: "Professional team, on time, and very thorough. They handled our office space perfectly.",
  },
  {
    name: "Liya W.",
    role: "Property Manager",
    text: "They went above and beyond to clean every corner. The property looked much better for handover.",
  },
  {
    name: "Mariam T.",
    role: "Tenant",
    text: "Booking was straightforward and communication was clear from start to finish.",
  },
  {
    name: "James K.",
    role: "Facilities Coordinator",
    text: "Reliable support for a busy commercial environment. Clean results, punctual visits.",
  },
  {
    name: "Helen O.",
    role: "Landlord",
    text: "The end-of-tenancy clean made a strong difference. The space looked brighter and fresher.",
  },
];

export const TRUST_POINTS = [
  "Professional home, office, and commercial cleaning services",
  "Flexible scheduling for regular, one-off, and end-of-tenancy cleaning",
  "Detail-focused standards with client-first communication",
  "Trusted support for cleaner, healthier, more presentable spaces",
];

export const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  address: "",
  frequency: "",
  phone: "",
  details: "",
};
