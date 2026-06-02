import { useEffect } from "react";
import { About } from "../landing/About";
import { Reviews } from "../landing/Reviews";
import { Process } from "../landing/Process";
import { CTA } from "../landing/CTA";
import { SEO } from "../components/SEO";
import { RichContentBlock } from "../components/RichContentBlock";
import { useSiteContent } from "../landing/SiteContentContext";
import { TrustSignals } from "../landing/TrustSignals";
import { ServiceAreas } from "../landing/ServiceAreas";

export function AboutPage() {
  const { expandedContent } = useSiteContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn how Pace Setter Cleaning Services supports homes, offices, landlords, short-let hosts, and commercial spaces with clear cleaning standards."
      />
      <About />
      <TrustSignals />
      <RichContentBlock data={expandedContent.aboutMission} />
      <RichContentBlock data={expandedContent.aboutPhilosophy} reverse />
      <ServiceAreas />
      <Reviews />
      <Process />
      <CTA />
    </>
  );
}
