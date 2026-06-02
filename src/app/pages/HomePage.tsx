import { useEffect } from "react";
import { Hero } from "../landing/Hero";
import { Services } from "../landing/Services";
import { Reviews } from "../landing/Reviews";
import { FAQ } from "../landing/FAQ";
import { CTA } from "../landing/CTA";
import { SEO } from "../components/SEO";
import { TrustSignals } from "../landing/TrustSignals";
import { QuoteGuide } from "../landing/QuoteGuide";

export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Professional Cleaning Services" 
        description="Residential, office, commercial, deep, end-of-tenancy, and short-let cleaning with fast quote support by phone, WhatsApp, or email."
      />
      <Hero />
      <TrustSignals />
      <Services />
      <QuoteGuide />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
