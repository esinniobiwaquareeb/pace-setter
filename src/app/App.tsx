import { useEffect } from "react";
import { About } from "./landing/About";
import { Booking } from "./landing/Booking";
import { BUSINESS_NAME } from "./landing/content";
import { CTA } from "./landing/CTA";
import { Footer } from "./landing/Footer";
import { Header } from "./landing/Header";
import { Hero } from "./landing/Hero";
import { Reviews } from "./landing/Reviews";
import { Services } from "./landing/Services";

export default function App() {
  useEffect(() => {
    document.title = `${BUSINESS_NAME} | Residential, Office & Commercial Cleaning Services UK`;
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Booking />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
