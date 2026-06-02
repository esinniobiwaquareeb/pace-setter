import { useEffect } from "react";
import { Services } from "../landing/Services";
import { Process } from "../landing/Process";
import { FAQ } from "../landing/FAQ";
import { CTA } from "../landing/CTA";

export function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ paddingTop: "80px" }} />
      <Services />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
}
