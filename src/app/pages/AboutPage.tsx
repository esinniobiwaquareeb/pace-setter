import { useEffect } from "react";
import { About } from "../landing/About";
import { Reviews } from "../landing/Reviews";
import { Process } from "../landing/Process";
import { CTA } from "../landing/CTA";
import { SEO } from "../components/SEO";
import { RichContentBlock } from "../components/RichContentBlock";
import { useSiteContent } from "../landing/SiteContentContext";

export function AboutPage() {
  const { expandedContent } = useSiteContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about Pace Setter Cleaning Services. Fully insured, highly vetted, and committed to setting the standard for residential and commercial cleaning."
      />
      <About />
      <RichContentBlock data={expandedContent.aboutMission} />
      <RichContentBlock data={expandedContent.aboutPhilosophy} reverse />
      <Reviews />
      <Process />
      <CTA />
    </>
  );
}
