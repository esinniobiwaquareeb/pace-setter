import { useEffect } from "react";
import { Reviews } from "../landing/Reviews";
import { CTA } from "../landing/CTA";

export function ReviewsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ paddingTop: "80px" }} />
      <Reviews />
      <CTA />
    </>
  );
}
