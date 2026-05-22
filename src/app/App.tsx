import { useEffect } from "react";
import { useState } from "react";
import { AdminApp } from "./admin/AdminApp";
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
import { SiteContentProvider } from "./landing/SiteContentContext";
import { Services } from "./landing/Services";
import { DEFAULT_SITE_CONTENT, mergeSiteContent } from "./landing/site-content";
import type { SiteContent } from "./landing/types";

export default function App() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const isAdminRoute =
    typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/admin") || new URLSearchParams(window.location.search).get("admin") === "1");

  useEffect(() => {
    document.title = `${BUSINESS_NAME} | Residential, Office & Commercial Cleaning Services UK`;
  }, []);

  useEffect(() => {
    if (isAdminRoute) return;

    void fetch("/api/content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setContent(mergeSiteContent(data as SiteContent)))
      .catch(() => {
        try {
          const stored = window.localStorage.getItem("pace-setter-site-content");
          setContent(stored ? mergeSiteContent(JSON.parse(stored) as SiteContent) : DEFAULT_SITE_CONTENT);
        } catch {
          setContent(DEFAULT_SITE_CONTENT);
        }
      });
  }, [isAdminRoute]);

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

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <SiteContentProvider content={content}>
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
    </SiteContentProvider>
  );
}
