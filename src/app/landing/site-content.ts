import type { FormState, SiteContent } from "./types";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    eyebrow: "Professional cleaning for homes, offices, landlords, and commercial spaces",
    headlinePrefix: "We Don't Just Clean,",
    rotatingWords: ["We Care", "We Restore", "We Refresh", "We Deliver"],
    body:
      "Pace Setter Cleaning Services delivers reliable residential, office, commercial, end-of-tenancy, and deep cleaning with clear communication, flexible scheduling, and a practical quote process.",
    ctaLabel: "Book a Cleaning Today",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Professional cleaners working in a bright office",
  },
  about: {
    heading: "Trusted Cleaning Services With Professional Standards",
    body:
      "Pace Setter Cleaning Services LTD provides reliable residential cleaning, office cleaning, commercial cleaning, deep cleaning, and end-of-tenancy cleaning with a strong focus on detail, presentation, and customer satisfaction. We help homes feel fresher, workplaces stay professional, and properties remain ready for visitors, clients, tenants, or handover.",
    trustPoints: [
      "Vetted cleaning team with professional standards",
      "Reliability-focused scheduling and clear communication",
      "Detail-focused standards with client-first communication",
      "Flexible scheduling for regular, one-off, and deep cleaning",
    ],
    ctaLabel: "Get a Free Quote",
    memberHeadline: "Fast quotes",
    memberLabel: "For homes, offices, and managed properties",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cleaning products and a gloved hand wiping a table",
  },
  servicesIntro: {
    heading: "Residential, Office, Commercial, and Specialist Cleaning Services",
    body:
      "Explore professional cleaning services for homes, workplaces, short-let properties, end-of-tenancy handovers, communal spaces, and customer-facing premises that need to stay clean, healthy, and presentable.",
  },
  services: [
    {
      title: "Residential Cleaning",
      description:
        "Reliable home cleaning for kitchens, bathrooms, bedrooms, living areas, floors, and high-touch surfaces. Available for one-off or regular cleaning schedules.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Office Cleaning",
      description:
        "Professional office cleaning for desks, meeting rooms, washrooms, kitchens, reception areas, and shared spaces that need to stay staff-ready and client-ready.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Commercial Cleaning",
      description:
        "Commercial cleaning for retail spaces, managed buildings, communal areas, and customer-facing environments where presentation and hygiene matter.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Deep Cleaning",
      description:
        "Intensive top-to-bottom cleaning for properties that need a full refresh, including neglected areas, stubborn build-up, and detailed hygiene work.",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Carpet & Hard Floor",
      description:
        "Specialised carpet and hard floor cleaning using professional equipment to restore your floors to their best condition.",
      image: "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Airbnb Maid Service",
      description:
        "Fast, reliable turnaround cleaning for short-let and Airbnb-style properties, helping your space feel guest-ready between bookings.",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Post-Construction Cleaning",
      description:
        "Comprehensive after-build cleaning to remove dust, debris, and residue, ensuring new builds and renovations are ready for handover.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Eco-Friendly Cleaning",
      description:
        "Eco-conscious cleaning options using carefully selected products where suitable for the property, household, and cleaning requirement.",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
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
    { name: "Helen O.", role: "Landlord", text: "The deep clean made a strong difference. The space looked brighter and fresher." },
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
  trustIntro: {
    heading: "Why Clients Choose Pace Setter",
    body: "A cleaning service should feel dependable before a customer even makes an enquiry. These are the standards we focus on from the first conversation.",
  },
  quoteIntro: {
    heading: "Transparent Quote Guidance",
    body: "Cleaning prices depend on property size, condition, frequency, and access. We keep the process clear so customers know what affects the quote before they enquire.",
  },
  faqIntro: {
    heading: "Frequently Asked Questions",
    body: "Helpful answers to the questions people usually ask before booking professional residential, office, or commercial cleaning services.",
  },
  faqs: [
    {
      question: "Are your cleaning staff vetted and insured?",
      answer: "Our goal is to give every client confidence in who is entering their space. We recommend confirming any insurance, vetting, or DBS requirements during your quote so the right standard is agreed before work starts.",
    },
    {
      question: "What happens if my regular cleaner is sick?",
      answer: "For regular cleaning arrangements, we discuss backup plans and scheduling expectations upfront so you are not left guessing if a cleaner becomes unavailable.",
    },
    {
      question: "Do you provide your own cleaning equipment?",
      answer: "Yes, our team arrives fully equipped with professional-grade cleaning supplies and equipment. If you prefer us to use your own specific products, just let us know.",
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
      "Tell us what you need and we will prepare a cleaning quote for your home, office, retail unit, or commercial property. Your request is saved, opened in WhatsApp, and drafted to our email for faster follow-up.",
    submitLabel: "Submit Your Request",
    successMessage: "Your booking was saved and opened in both WhatsApp and your email app.",
    recentLabel: "Recent saved enquiries",
    fallbackRecentText: "Cleaning request saved",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Clean, brightly lit home interior showing the results of professional cleaning",
  },
  cta: {
    heading: "Ready to Book Professional Cleaning Services?",
    body: "Speak with Pace Setter Cleaning Services today for residential cleaning, office cleaning, commercial cleaning, deep cleaning, end-of-tenancy cleaning, and short-let turnaround support tailored to your schedule.",
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
        "Pace Setter Cleaning Services was built on a single, uncompromising principle: spaces should feel as good as they look. We recognized a gap in the market where reliability and deep attention to detail were often missing, leaving clients frustrated with inconsistent results.",
        "We approach every environment, whether it is a busy commercial office, a family home, or a fast-turnaround short-let property, with a tailored plan. Our mission is to elevate hygiene, improve presentation, and return valuable time to our clients.",
      ],
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Clean, brightly lit modern living room showing high standards of hygiene",
      features: [
        "Bespoke cleaning strategies tailored to each property.",
        "Rigorous quality control and spot-checks.",
        "Transparent pricing with no hidden fees.",
      ],
    },
    aboutPhilosophy: {
      heading: "The Pace Setter Philosophy: Trust Above All",
      paragraphs: [
        "We know that inviting a cleaning team into your personal home or secure commercial space requires immense trust. That is why our philosophy is centered completely around security, vetting, and peace of mind.",
        "The right cleaning arrangement should be clear from the start: who is attending, what is included, what access is needed, and what happens if a schedule changes. We keep those details visible so every client knows what to expect.",
      ],
      image: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Professional team member cleaning a surface with precision",
      features: [
        "Clear expectations before cleaning begins.",
        "Vetting and insurance requirements can be confirmed during quoting.",
        "Reliable communication around schedule changes.",
      ],
    },
    serviceAreas: [
      "London",
      "Manchester",
      "Birmingham",
      "Leeds",
      "Liverpool",
      "Sheffield",
      "Bristol",
      "Nottingham",
    ],
    trustSignals: [
      {
        title: "Clear contact routes",
        description: "Visitors can enquire by WhatsApp, email, phone, or the quote form, with the request saved for admin follow-up.",
      },
      {
        title: "Service depth",
        description: "The site now covers domestic, office, commercial, deep, floor, short-let, and post-construction cleaning instead of only broad categories.",
      },
      {
        title: "Quote clarity",
        description: "Customers are told what affects pricing before they submit, reducing uncertainty without publishing unsupported fixed rates.",
      },
      {
        title: "CMS-ready content",
        description: "Service information, FAQs, and client feedback can stay current as the business adds more verified proof.",
      },
    ],
    quoteGuides: [
      {
        title: "Regular cleaning",
        description: "Best for homes, offices, and shared spaces that need a recurring weekly, fortnightly, or monthly schedule.",
      },
      {
        title: "One-off and deep cleaning",
        description: "Quoted after understanding property size, current condition, rooms included, and whether specialist attention is needed.",
      },
      {
        title: "End-of-tenancy and handover",
        description: "Quoted around inspection requirements, appliances, bathrooms, flooring, access, and deadline.",
      },
      {
        title: "Commercial and contract cleaning",
        description: "Quoted around site type, operating hours, cleaning frequency, compliance needs, and required cover.",
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
