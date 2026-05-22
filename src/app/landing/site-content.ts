import type { FormState, SiteContent } from "./types";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    eyebrow: "Professional cleaning services for homes, offices, and commercial spaces",
    headlinePrefix: "We Don't Just Clean,",
    rotatingWords: ["We Care", "We Restore", "We Refresh", "We Deliver"],
    body:
      "Pace Setter Cleaning Services delivers residential cleaning, office cleaning, and commercial cleaning that helps your property look sharper, feel healthier, and stay ready for everyday life or business.",
    ctaLabel: "Book a Cleaning Today",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Professional cleaners working in a bright office",
  },
  about: {
    heading: "Trusted Cleaning Services With Professional Standards",
    body:
      "Pace Setter Cleaning Services LTD provides reliable residential cleaning, office cleaning, and commercial cleaning with a strong focus on detail, presentation, and customer satisfaction. We help homes feel fresher, workplaces stay professional, and properties remain ready for visitors, clients, tenants, or handover.",
    trustPoints: [
      "Professional home, office, and commercial cleaning services",
      "Flexible scheduling for regular, one-off, and end-of-tenancy cleaning",
      "Detail-focused standards with client-first communication",
      "Trusted support for cleaner, healthier, more presentable spaces",
    ],
    ctaLabel: "Get a Free Quote",
    memberHeadline: "Join 500+",
    memberLabel: "Satisfied clients",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cleaning products and a gloved hand wiping a table",
  },
  servicesIntro: {
    heading: "Residential, Office, and Commercial Cleaning Services",
    body:
      "Explore professional cleaning services designed for homes, workplaces, shared buildings, and customer-facing spaces that need to stay clean, healthy, and presentable.",
  },
  services: [
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
  ],
  reviewsIntro: {
    heading: "What Clients Say About Our Cleaning Services",
    body:
      "Feedback from homeowners, landlords, and business clients who wanted reliable cleaning, clear communication, and spaces that genuinely looked better after each visit.",
  },
  reviews: [
    { name: "Sarah J.", role: "Homeowner", text: "Quick, efficient, and genuinely easy to deal with. The team paid attention to details." },
    { name: "David R.", role: "Small Business Owner", text: "Professional team, on time, and very thorough. They handled our office space perfectly." },
    { name: "Liya W.", role: "Property Manager", text: "They went above and beyond to clean every corner. The property looked much better for handover." },
    { name: "Mariam T.", role: "Tenant", text: "Booking was straightforward and communication was clear from start to finish." },
    { name: "James K.", role: "Facilities Coordinator", text: "Reliable support for a busy commercial environment. Clean results, punctual visits." },
    { name: "Helen O.", role: "Landlord", text: "The end-of-tenancy clean made a strong difference. The space looked brighter and fresher." },
  ],
  processIntro: {
    heading: "How Booking Works",
    body: "A simple three-step process that helps visitors understand what happens next and makes enquiries feel lower-risk.",
  },
  processSteps: [
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
  ],
  faqIntro: {
    heading: "Frequently Asked Questions",
    body: "Helpful answers to the questions people usually ask before booking professional residential, office, or commercial cleaning services.",
  },
  faqs: [
    {
      question: "What cleaning services do you offer?",
      answer: "We provide residential cleaning, office cleaning, commercial cleaning, and end of tenancy cleaning for properties that need reliable professional care.",
    },
    {
      question: "Do you offer one-off and regular cleaning?",
      answer: "Yes. We can discuss one-off cleans, recurring cleaning schedules, and flexible arrangements based on the property and your preferred frequency.",
    },
    {
      question: "How quickly can I get a quote?",
      answer: "The booking form opens your enquiry directly in WhatsApp and email, which helps us review your request quickly and respond with the next steps faster.",
    },
    {
      question: "Do you work with both homes and businesses?",
      answer: "Yes. We support households, landlords, offices, retail spaces, and broader commercial environments that need dependable cleaning standards.",
    },
  ],
  booking: {
    heading: "Request a Fast Quote for Home or Office Cleaning",
    body:
      "Tell us what you need and we will prepare a cleaning quote for your home, office, retail unit, or commercial property. Your request is saved, opened in WhatsApp, and drafted to our email for faster follow-up.",
    submitLabel: "Submit Your Request",
    successMessage: "Your booking was saved and opened in both WhatsApp and your email app.",
    recentLabel: "Recent saved enquiries",
    fallbackRecentText: "Cleaning request saved",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cleaner mopping a bright floor near a window",
  },
  cta: {
    heading: "Ready to Book Professional Cleaning Services?",
    body: "Speak with Pace Setter Cleaning Services today for reliable residential cleaning, office cleaning, and commercial cleaning tailored to your schedule and property needs.",
    buttonLabel: "Book a Cleaning Today",
  },
  contact: {
    businessName: "Pace Setter Cleaning Services LTD",
    phonePrimary: "+44 7894 239785",
    phoneSecondary: "+44 7884 310461",
    email: "info@pacesettercleaning.co.uk",
    websiteUrl: "https://www.pacesettercleaning.co.uk",
    whatsappPrimary: "https://wa.me/447894239785",
    whatsappSecondary: "https://wa.me/447884310461",
  },
  updatedAt: "2026-05-22T00:00:00.000Z",
};

export const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  address: "",
  frequency: "",
  phone: "",
  details: "",
};

export function mergeSiteContent(content?: Partial<SiteContent> | null): SiteContent {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...content,
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...content?.hero },
    about: { ...DEFAULT_SITE_CONTENT.about, ...content?.about },
    servicesIntro: { ...DEFAULT_SITE_CONTENT.servicesIntro, ...content?.servicesIntro },
    services: content?.services ?? DEFAULT_SITE_CONTENT.services,
    reviewsIntro: { ...DEFAULT_SITE_CONTENT.reviewsIntro, ...content?.reviewsIntro },
    reviews: content?.reviews ?? DEFAULT_SITE_CONTENT.reviews,
    processIntro: { ...DEFAULT_SITE_CONTENT.processIntro, ...content?.processIntro },
    processSteps: content?.processSteps ?? DEFAULT_SITE_CONTENT.processSteps,
    faqIntro: { ...DEFAULT_SITE_CONTENT.faqIntro, ...content?.faqIntro },
    faqs: content?.faqs ?? DEFAULT_SITE_CONTENT.faqs,
    booking: { ...DEFAULT_SITE_CONTENT.booking, ...content?.booking },
    cta: { ...DEFAULT_SITE_CONTENT.cta, ...content?.cta },
    contact: { ...DEFAULT_SITE_CONTENT.contact, ...content?.contact },
    updatedAt: content?.updatedAt ?? DEFAULT_SITE_CONTENT.updatedAt,
  };
}
