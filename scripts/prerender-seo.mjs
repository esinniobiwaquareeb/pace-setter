import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

const routes = [
  {
    path: "",
    title: "Pace Setter Cleaning Services LTD | Residential, Office & Commercial Cleaning Services UK",
    description:
      "Pace Setter Cleaning Services LTD provides residential, office, commercial, deep, end-of-tenancy, short-let, post-construction, and floor cleaning with fast quote support.",
    sections: [
      ["Professional Cleaning Services", "Reliable residential, office, commercial, deep, and end-of-tenancy cleaning with clear quotes and flexible scheduling."],
      ["Why Clients Choose Pace Setter", "Easy contact by WhatsApp, phone, email, or quote form. Broad cleaning cover for homes, offices, short lets, commercial premises, floors, and handovers."],
      ["Services", "Residential cleaning, office cleaning, commercial cleaning, deep cleaning, carpet and hard floor cleaning, Airbnb and short-let cleaning, post-construction cleaning, and eco-conscious cleaning options."],
      ["Quote Guidance", "Quotes are shaped by property size, condition, access, cleaning frequency, deadlines, and any specialist requirements."],
    ],
  },
  {
    path: "about",
    title: "About Pace Setter Cleaning Services LTD",
    description:
      "Learn about Pace Setter Cleaning Services LTD, a professional cleaning company focused on reliable communication, flexible scheduling, and high presentation standards.",
    sections: [
      ["About Pace Setter", "We help homes, offices, rentals, and commercial spaces feel fresher, healthier, and ready for daily use, inspections, guests, or handover."],
      ["Trust and Communication", "Clients know what is included, what access is needed, and how scheduling is handled before cleaning begins."],
    ],
  },
  {
    path: "services",
    title: "Cleaning Services | Pace Setter Cleaning Services LTD",
    description:
      "Explore residential, office, commercial, deep, end-of-tenancy, short-let, post-construction, carpet, and hard floor cleaning services.",
    sections: [
      ["Residential Cleaning", "Regular or one-off home cleaning for kitchens, bathrooms, bedrooms, living areas, floors, and high-touch surfaces."],
      ["Office and Commercial Cleaning", "Cleaning for desks, meeting rooms, washrooms, kitchens, reception areas, managed buildings, retail spaces, and communal areas."],
      ["Specialist Cleaning", "Deep cleaning, end-of-tenancy cleaning, short-let turnaround cleaning, post-construction cleaning, and carpet or hard floor cleaning."],
    ],
  },
  {
    path: "reviews",
    title: "Reviews | Pace Setter Cleaning Services LTD",
    description:
      "Read client feedback for Pace Setter Cleaning Services, including homeowners, landlords, and business clients.",
    sections: [
      ["Client Feedback", "Feedback focuses on reliable communication, punctual cleaning, and spaces that look brighter and fresher after each visit."],
    ],
  },
  {
    path: "faq",
    title: "FAQ | Pace Setter Cleaning Services LTD",
    description:
      "Answers to common questions about booking, one-off cleaning, regular cleaning, equipment, insurance, vetting, and commercial cleaning.",
    sections: [
      ["Frequently Asked Questions", "Pace Setter supports one-off and regular cleaning for homes, landlords, offices, retail spaces, and broader commercial environments."],
      ["Booking", "Use the quote form, WhatsApp, phone, or email to share your property type, schedule, access needs, and cleaning requirements."],
    ],
  },
  {
    path: "contact",
    title: "Contact Pace Setter Cleaning Services LTD",
    description:
      "Contact Pace Setter Cleaning Services LTD by phone, WhatsApp, email, or quote form for residential, office, commercial, and specialist cleaning.",
    sections: [
      ["Contact", "Phone +44 7894 239785, email info@pacesettercleaning.co.uk, or request a fast cleaning quote through the website."],
    ],
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderFallback(route) {
  const sections = route.sections
    .map(([heading, body]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`)
    .join("");

  return `<main class="seo-static-content" aria-label="Pace Setter Cleaning Services overview">
      <h1>${escapeHtml(route.title)}</h1>
      <p>${escapeHtml(route.description)}</p>
      ${sections}
      <p><a href="tel:+447894239785">Call +44 7894 239785</a> or <a href="mailto:info@pacesettercleaning.co.uk">email info@pacesettercleaning.co.uk</a> for a cleaning quote.</p>
    </main>`;
}

function withRouteContent(template, route) {
  const url = `https://www.pacesettercleaning.co.uk/${route.path ? `${route.path}` : ""}`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<link rel="alternate" href="[^"]*" hreflang="en-gb" \/>/, `<link rel="alternate" href="${url}" hreflang="en-gb" />`)
    .replace(/<link rel="alternate" href="[^"]*" hreflang="x-default" \/>/, `<link rel="alternate" href="${url}" hreflang="x-default" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);

  html = html.replace('<div id="root"></div>', `<div id="root">${renderFallback(route)}</div>`);
  return html;
}

const template = await readFile(indexPath, "utf-8");

for (const route of routes) {
  const html = withRouteContent(template, route);
  if (route.path === "") {
    await writeFile(indexPath, html, "utf-8");
    continue;
  }

  const routeDir = path.join(distDir, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf-8");
}
