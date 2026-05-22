import type { Area, BookingStep, Faq, FormState, NavItem, Review, Service } from "./types";

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
  { label: "Areas", href: "#areas" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
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
  {
    title: "End of Tenancy Cleaning",
    description:
      "End of tenancy cleaning for landlords, agents, and tenants who need a property looking fresher, cleaner, and ready for inspection, handover, or new occupants.",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80",
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

export const AREAS: Area[] = [
  {
    title: "Homes & Apartments",
    description: "Routine and one-off cleaning for family homes, apartments, and managed residential properties.",
  },
  {
    title: "Offices & Studios",
    description: "Professional cleaning for desks, meeting rooms, washrooms, and shared areas that need to stay client-ready.",
  },
  {
    title: "Retail & Commercial Spaces",
    description: "Consistent cleaning support for customer-facing locations, shared buildings, and busy commercial environments.",
  },
];

export const BOOKING_STEPS: BookingStep[] = [
  {
    title: "Tell Us What You Need",
    description: "Share your property type, schedule, and cleaning requirements through the booking form.",
  },
  {
    title: "Get a Fast Quote",
    description: "We open your request in WhatsApp and email so your enquiry is easy to review and follow up quickly.",
  },
  {
    title: "Confirm Your Clean",
    description: "Once the details are agreed, we arrange a convenient cleaning time and keep communication simple.",
  },
];

export const FAQS: Faq[] = [
  {
    question: "What cleaning services do you offer?",
    answer:
      "We provide residential cleaning, office cleaning, commercial cleaning, and end of tenancy cleaning for properties that need reliable professional care.",
  },
  {
    question: "Do you offer one-off and regular cleaning?",
    answer:
      "Yes. We can discuss one-off cleans, recurring cleaning schedules, and flexible arrangements based on the property and your preferred frequency.",
  },
  {
    question: "How quickly can I get a quote?",
    answer:
      "The booking form opens your enquiry directly in WhatsApp and email, which helps us review your request quickly and respond with the next steps faster.",
  },
  {
    question: "Do you work with both homes and businesses?",
    answer:
      "Yes. We support households, landlords, offices, retail spaces, and broader commercial environments that need dependable cleaning standards.",
  },
];

export const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  address: "",
  frequency: "",
  phone: "",
  details: "",
};
