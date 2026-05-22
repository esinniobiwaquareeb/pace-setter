import type { FormState, NavItem, Review, Service } from "./types";

export const SITE_URL = "https://www.pacesettercleaning.co.uk";
export const BUSINESS_NAME = "Pace Setter Cleaning Services LTD";
export const WHATSAPP_PRIMARY = "https://wa.me/447894239785";
export const WHATSAPP_SECONDARY = "https://wa.me/447884310461";
export const PHONE_PRIMARY = "+44 7894 239785";
export const INFO_EMAIL = "info@pacesettercleaning.co.uk";

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
    description: "Keep your home fresh with our regular cleaning, covering kitchens, bathrooms, floors, and surfaces.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Office Cleaning",
    description: "Structured cleaning for workspaces to maintain a professional, organized environment with minimal disruption.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Commercial Cleaning",
    description: "Reliable cleaning for retail and shared buildings to ensure a welcoming experience for staff and visitors.",
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
  "Affordable packages",
  "100% satisfaction guarantee",
  "Flexible scheduling for homes and workplaces",
  "Clear communication from quote to completion",
];

export const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  address: "",
  frequency: "",
  phone: "",
  details: "",
};
