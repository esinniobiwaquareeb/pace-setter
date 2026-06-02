import { useEffect } from "react";
import { About } from "../landing/About";
import { Reviews } from "../landing/Reviews";
import { Process } from "../landing/Process";
import { CTA } from "../landing/CTA";

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ paddingTop: "80px" }} />
      <About />
      <Reviews />
      <Process />
      <CTA />
    </>
  );
}
