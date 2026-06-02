import { useEffect } from "react";
import { Hero } from "../landing/Hero";
import { Services } from "../landing/Services";
import { Reviews } from "../landing/Reviews";
import { FAQ } from "../landing/FAQ";
import { CTA } from "../landing/CTA";

export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
