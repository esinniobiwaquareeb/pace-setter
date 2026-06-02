import { useEffect } from "react";
import { Hero } from "../landing/Hero";
import { Services } from "../landing/Services";
import { Reviews } from "../landing/Reviews";
import { FAQ } from "../landing/FAQ";
import { CTA } from "../landing/CTA";
import { SEO } from "../components/SEO";

export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Professional Cleaning Services" 
        description="Premium residential, office, and commercial cleaning services. Fully insured and vetted staff. Book your 5-star clean today."
      />
      <Hero />
      <Services />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
