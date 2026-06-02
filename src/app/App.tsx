import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AdminApp } from "./admin/AdminApp";
import { BUSINESS_NAME } from "./landing/content";
import { Footer } from "./landing/Footer";
import { Header } from "./landing/Header";
import { SiteContentProvider } from "./landing/SiteContentContext";
import { DEFAULT_SITE_CONTENT, mergeSiteContent } from "./landing/site-content";
import type { SiteContent } from "./landing/types";

// Pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { FAQPage } from "./pages/FAQPage";
import { ContactPage } from "./pages/ContactPage";

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

  const location = useLocation();

  useEffect(() => {
    // Wait a brief moment for the DOM to update after a route change
    const timeoutId = setTimeout(() => {
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

      sections.forEach((section) => {
        // If it was already visible from a previous render, we might need to remove the class
        // or just let it stay visible. Since we navigate to a new page, these are likely fresh DOM nodes.
        observer.observe(section);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <SiteContentProvider content={content}>
      <div className="app-shell">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch all to redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SiteContentProvider>
  );
}
