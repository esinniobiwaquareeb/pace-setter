import { useEffect } from "react";
import { About } from "./landing/About";
import { Booking } from "./landing/Booking";
import { BUSINESS_NAME } from "./landing/content";
import { CTA } from "./landing/CTA";
import { FAQ } from "./landing/FAQ";
import { Footer } from "./landing/Footer";
import { Header } from "./landing/Header";
import { Hero } from "./landing/Hero";
import { Process } from "./landing/Process";
import { Reviews } from "./landing/Reviews";
import { Services } from "./landing/Services";

export default function App() {
  useEffect(() => {
    document.title = `${BUSINESS_NAME} | Residential, Office & Commercial Cleaning Services UK`;
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Process />
        <FAQ />
        <Booking />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
