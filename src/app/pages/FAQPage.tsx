import { useEffect } from "react";
import { FAQ } from "../landing/FAQ";
import { Booking } from "../landing/Booking";
import { CTA } from "../landing/CTA";

export function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ paddingTop: "80px" }} />
      <FAQ />
      <Booking />
      <CTA />
    </>
  );
}
