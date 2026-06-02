export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  description: string;
  image: string;
};

export type Review = {
  name: string;
  role: string;
  text: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type BookingStep = {
  title: string;
  description: string;
};

export type TrustSignal = {
  title: string;
  description: string;
};

export type QuoteGuide = {
  title: string;
  description: string;
};

export type FormState = {
  name: string;
  email: string;
  address: string;
  frequency: string;
  phone: string;
  details: string;
};

export type SavedBooking = FormState & {
  createdAt: string;
};

export type HeroContent = {
  eyebrow: string;
  headlinePrefix: string;
  rotatingWords: string[];
  body: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
};

export type AboutContent = {
  heading: string;
  body: string;
  trustPoints: string[];
  ctaLabel: string;
  memberHeadline: string;
  memberLabel: string;
  image: string;
  imageAlt: string;
};

export type SectionIntro = {
  heading: string;
  body: string;
};

export type BookingContent = {
  heading: string;
  body: string;
  submitLabel: string;
  successMessage: string;
  recentLabel: string;
  fallbackRecentText: string;
  image: string;
  imageAlt: string;
};

export type CtaContent = {
  heading: string;
  body: string;
  buttonLabel: string;
};

export type ContactContent = {
  businessName: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  websiteUrl: string;
  whatsappPrimary: string;
  whatsappSecondary: string;
};

export type RichTextData = {
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  features?: string[];
};

export type ExpandedContent = {
  aboutMission: RichTextData;
  aboutPhilosophy: RichTextData;
  serviceAreas: string[];
  trustSignals: TrustSignal[];
  quoteGuides: QuoteGuide[];
};

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  servicesIntro: SectionIntro;
  services: Service[];
  reviewsIntro: SectionIntro;
  reviews: Review[];
  processIntro: SectionIntro;
  processSteps: BookingStep[];
  trustIntro: SectionIntro;
  quoteIntro: SectionIntro;
  faqIntro: SectionIntro;
  faqs: Faq[];
  booking: BookingContent;
  cta: CtaContent;
  contact: ContactContent;
  expandedContent: ExpandedContent;
  updatedAt: string;
};
