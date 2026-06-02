import type { FormState, SiteContent } from "./types";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    eyebrow: "Cleaning for homes, offices, landlords, and short-let spaces",
    headlinePrefix: "We Don't Just Clean,",
    rotatingWords: ["We Care", "We Restore", "We Refresh", "We Deliver"],
    body:
      "Reliable residential, office, commercial, deep, and end-of-tenancy cleaning with clear quotes and flexible scheduling.",
    ctaLabel: "Book a Cleaning Today",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Professional cleaners working in a bright office",
    gallery: [
      {
        label: "Homes",
        title: "Fresh, calm spaces for everyday living",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=82",
        imageAlt: "Clean modern residential home exterior",
      },
      {
        label: "Offices",
        title: "Workplaces cleaned around your schedule",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=82",
        imageAlt: "Professional cleaners working in a bright office",
      },
      {
        label: "Handover",
        title: "Detailed cleans for move-outs and managed lets",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=82",
        imageAlt: "Clean apartment interior ready for handover",
      },
    ],
  },
  about: {
    heading: "Trusted Cleaning Services With Professional Standards",
    body:
      "We help homes, offices, rentals, and commercial spaces feel fresher, healthier, and ready for daily use, inspections, guests, or handover.",
    trustPoints: [
      "Cleaning team matched to the service brief",
      "Clear scheduling and updates",
      "Detail-focused standards",
      "Flexible scheduling for regular, one-off, and deep cleaning",
    ],
    ctaLabel: "Get a Free Quote",
    memberHeadline: "Fast quotes",
    memberLabel: "For homes, offices, and managed properties",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Professional cleaner carefully wiping a home surface",
  },
  servicesIntro: {
    heading: "Residential, Office, Commercial, and Specialist Cleaning Services",
    body:
      "Choose the cleaning support that fits your space, schedule, and handover needs.",
  },
  services: [
    {
      title: "Residential Cleaning",
      description:
        "Regular or one-off home cleaning for kitchens, bathrooms, bedrooms, floors, and high-touch surfaces.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=82",
    },
    {
      title: "Office Cleaning",
      description:
        "Desk, meeting room, washroom, kitchen, reception, and shared-area cleaning for tidy workplaces.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=82",
    },
    {
      title: "Commercial Cleaning",
      description:
        "Cleaning for shops, managed buildings, communal areas, and customer-facing premises.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=82",
    },
    {
      title: "Deep Cleaning",
      description:
        "A more detailed clean for stubborn build-up, neglected areas, and full property refreshes.",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=82",
    },
    {
      title: "Carpet & Hard Floor",
      description:
        "Specialist care for carpets and hard floors that need a cleaner, fresher finish.",
      image: "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=1000&q=82",
    },
    {
      title: "Airbnb Maid Service",
      description:
        "Fast turnaround cleaning for guest-ready short-let and Airbnb-style properties.",
      image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1000&q=82",
    },
    {
      title: "Post-Construction Cleaning",
      description:
        "After-build cleaning for dust, residue, and handover-ready presentation.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=82",
    },
    {
      title: "Eco-Friendly Cleaning",
      description:
        "Eco-conscious product options where suitable for the property and cleaning brief.",
      image: "/cleaning-service.webp",
    },
  ],
  reviewsIntro: {
    heading: "What Clients Say About Our Cleaning Services",
    body:
      "Short feedback from homeowners, landlords, and business clients.",
  },
  reviews: [
    { name: "Sarah J.", role: "Homeowner", text: "Quick, efficient, and genuinely easy to deal with. The team paid attention to details." },
    { name: "David R.", role: "Small Business Owner", text: "Professional team, on time, and very thorough. They handled our office space perfectly." },
    { name: "Liya W.", role: "Property Manager", text: "They went above and beyond to clean every corner. The property looked much better for handover." },
    { name: "Mariam T.", role: "Tenant", text: "Booking was straightforward and communication was clear from start to finish." },
    { name: "James K.", role: "Facilities Coordinator", text: "Reliable support for a busy commercial environment. Clean results, punctual visits." },
    { name: "Helen O.", role: "Landlord", text: "The deep clean made a strong difference. The space looked brighter and fresher." },
  ],
  processIntro: {
    heading: "How Booking Works",
    body: "Three simple steps from enquiry to confirmed clean.",
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
  trustIntro: {
    heading: "Why Clients Choose Pace Setter",
    body: "Clear communication, flexible booking, and a team focused on presentable, healthy spaces.",
  },
  quoteIntro: {
    heading: "Transparent Quote Guidance",
    body: "No guesswork. Your quote is shaped by the property, condition, access, and cleaning frequency.",
  },
  faqIntro: {
    heading: "Frequently Asked Questions",
    body: "Helpful answers to the questions people usually ask before booking professional residential, office, or commercial cleaning services.",
  },
  faqs: [
    {
      question: "Are your cleaning staff vetted and insured?",
      answer: "We discuss vetting, insurance, access, and property requirements before work begins so expectations are clear.",
    },
    {
      question: "What happens if my regular cleaner is sick?",
      answer: "For regular arrangements, we agree backup and rescheduling expectations upfront.",
    },
    {
      question: "Do you provide your own cleaning equipment?",
      answer: "Yes. We can bring supplies, or use your preferred products where requested.",
    },
    {
      question: "Do you offer one-off and regular cleaning?",
      answer: "Yes. We can discuss one-off cleans, recurring cleaning schedules, and flexible arrangements based on the property and your preferred frequency.",
    },
    {
      question: "Do you work with both homes and businesses?",
      answer: "Yes. We support households, landlords, offices, retail spaces, and broader commercial environments that need dependable cleaning standards.",
    },
  ],
  booking: {
    heading: "Request a Fast Quote for Home or Office Cleaning",
    body:
      "Tell us what you need. Your request is saved, opened in WhatsApp, and drafted to our email for quick follow-up.",
    submitLabel: "Submit Your Request",
    successMessage: "Your booking was saved and opened in both WhatsApp and your email app.",
    recentLabel: "Recent saved enquiries",
    fallbackRecentText: "Cleaning request saved",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Clean, brightly lit home interior showing the results of professional cleaning",
  },
  cta: {
    heading: "Ready to Book Professional Cleaning Services?",
    body: "Get a fast quote for residential, office, commercial, deep, end-of-tenancy, or short-let cleaning.",
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
  expandedContent: {
    aboutMission: {
      heading: "Our Mission: Setting the Standard for Clean",
      paragraphs: [
        "Clean spaces should feel calm, healthy, and ready to use. That is the standard we work toward on every job.",
        "Whether it is a home, office, commercial space, or short-let property, we tailor the clean around the space and the outcome you need.",
      ],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Well-kept home exterior representing residential cleaning standards",
      features: [
        "Tailored cleaning plans",
        "Practical quality checks",
        "Clear quote process",
      ],
    },
    aboutPhilosophy: {
      heading: "The Pace Setter Philosophy: Trust Above All",
      paragraphs: [
        "Letting a cleaner into your property takes trust. We make the details clear before the job starts.",
        "You know what is included, what access is needed, and how scheduling will be handled.",
      ],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Professional cleaning team working in an office space",
      features: [
        "Clear expectations before cleaning begins.",
        "Access, insurance, and service requirements discussed upfront.",
        "Reliable updates around schedule changes.",
      ],
    },
    serviceAreas: [
      "Homes",
      "Offices",
      "Landlords",
      "Short-let hosts",
      "Retail spaces",
      "Managed buildings",
      "Commercial sites",
      "Move-out cleans",
    ],
    trustSignals: [
      {
        title: "Easy to reach",
        description: "WhatsApp, phone, email, and quote form all stay close at hand.",
      },
      {
        title: "Broad service cover",
        description: "Homes, offices, short lets, handovers, floors, and after-build cleans.",
      },
      {
        title: "Clear quoting",
        description: "We explain what affects the price before you commit.",
      },
      {
        title: "Built to stay current",
        description: "Services, FAQs, and client feedback can be updated as the business grows.",
      },
    ],
    quoteGuides: [
      {
        title: "Regular cleaning",
        description: "For homes, offices, and shared spaces on a weekly, fortnightly, or monthly schedule.",
      },
      {
        title: "One-off and deep cleaning",
        description: "For full refreshes, heavier build-up, or rooms that need extra detail.",
      },
      {
        title: "End-of-tenancy and handover",
        description: "For move-outs, inspections, appliances, bathrooms, flooring, and deadlines.",
      },
      {
        title: "Commercial and contract cleaning",
        description: "For site type, operating hours, frequency, access, and required cover.",
      },
    ],
  },
  updatedAt: "2026-06-02T00:00:00.000Z",
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
    trustIntro: { ...DEFAULT_SITE_CONTENT.trustIntro, ...content?.trustIntro },
    quoteIntro: { ...DEFAULT_SITE_CONTENT.quoteIntro, ...content?.quoteIntro },
    faqIntro: { ...DEFAULT_SITE_CONTENT.faqIntro, ...content?.faqIntro },
    faqs: content?.faqs ?? DEFAULT_SITE_CONTENT.faqs,
    booking: { ...DEFAULT_SITE_CONTENT.booking, ...content?.booking },
    cta: { ...DEFAULT_SITE_CONTENT.cta, ...content?.cta },
    contact: { ...DEFAULT_SITE_CONTENT.contact, ...content?.contact },
    expandedContent: {
      ...DEFAULT_SITE_CONTENT.expandedContent,
      ...content?.expandedContent,
      trustSignals: content?.expandedContent?.trustSignals ?? DEFAULT_SITE_CONTENT.expandedContent.trustSignals,
      quoteGuides: content?.expandedContent?.quoteGuides ?? DEFAULT_SITE_CONTENT.expandedContent.quoteGuides,
      serviceAreas: content?.expandedContent?.serviceAreas ?? DEFAULT_SITE_CONTENT.expandedContent.serviceAreas,
    },
    updatedAt: content?.updatedAt ?? DEFAULT_SITE_CONTENT.updatedAt,
  };
}
