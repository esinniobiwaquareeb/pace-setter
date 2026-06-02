import { useEffect } from "react";
import { Booking } from "../landing/Booking";
import { Process } from "../landing/Process";
import { CTA } from "../landing/CTA";

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ paddingTop: "80px" }} />
      <Booking />
      <Process />
      <CTA />
    </>
  );
}
