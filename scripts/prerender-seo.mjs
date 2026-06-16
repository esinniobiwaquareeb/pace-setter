import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

const routes = [
  {
    path: "",
    title: "Pacesetter Cleaning Services LTD | Residential, Office & Commercial Cleaning Services UK",
    description:
      "Pacesetter Cleaning Services LTD provides Airbnb maid service, communal area, deep, contract, emergency, carpet, and window cleaning with fast quote support.",
    sections: [
      ["Professional Cleaning Services", "Reliable residential, office, commercial, deep, and end-of-tenancy cleaning with clear quotes and flexible scheduling."],
      ["Why Clients Choose Pacesetter", "Easy contact by WhatsApp, phone, email, or quote form. Broad cleaning cover for homes, offices, short lets, commercial premises, floors, and handovers."],
      ["Services", "Airbnb maid service, communal area cleaning, deep cleaning, contract cleaning, emergency cleaning, carpet and hard floor cleaning, and external window cleaning."],
      ["Quote Guidance", "Quotes are shaped by property size, condition, access, cleaning frequency, deadlines, and any specialist requirements."],
    ],
  },
  {
    path: "about",
    title: "About Pacesetter Cleaning Services LTD",
    description:
      "Learn about Pacesetter Cleaning Services LTD, a professional cleaning company focused on reliable communication, flexible scheduling, and high presentation standards.",
    sections: [
      ["About Pacesetter", "We help homes, offices, rentals, and commercial spaces feel fresher, healthier, and ready for daily use, inspections, guests, or handover."],
      ["Trust and Communication", "Clients know what is included, what access is needed, and how scheduling is handled before cleaning begins."],
    ],
  },
  {
    path: "services",
    title: "Cleaning Services | Pacesetter Cleaning Services LTD",
    description:
      "Explore Airbnb maid service, communal area, deep, contract, emergency, carpet, and external window cleaning services.",
    sections: [
      ["Airbnb Maid Service", "Fast turnaround cleaning, linen changing, and restocking for guest-ready short-let properties."],
      ["Communal Area Cleaning", "Dedicated maintenance for lobbies, hallways, stairwells, and shared spaces in residential or commercial blocks."],
      ["Specialist Cleaning", "Deep cleaning, contract cleaning, emergency cleaning, carpet or hard floor cleaning, and external window cleaning."],
    ],
  },
  {
    path: "reviews",
    title: "Reviews | Pacesetter Cleaning Services LTD",
    description:
      "Read client feedback for Pacesetter Cleaning Services, including homeowners, landlords, and business clients.",
    sections: [
      ["Client Feedback", "Feedback focuses on reliable communication, punctual cleaning, and spaces that look brighter and fresher after each visit."],
    ],
  },
  {
    path: "faq",
    title: "FAQ | Pacesetter Cleaning Services LTD",
    description:
      "Answers to common questions about booking, one-off cleaning, regular cleaning, equipment, insurance, vetting, and commercial cleaning.",
    sections: [
      ["Frequently Asked Questions", "Pacesetter supports one-off and regular cleaning for homes, landlords, offices, retail spaces, and broader commercial environments."],
      ["Booking", "Use the quote form, WhatsApp, phone, or email to share your property type, schedule, access needs, and cleaning requirements."],
    ],
  },
  {
    path: "contact",
    title: "Contact Pacesetter Cleaning Services LTD",
    description:
      "Contact Pacesetter Cleaning Services LTD by phone, WhatsApp, email, or quote form for residential, office, commercial, and specialist cleaning.",
    sections: [
      ["Contact", "Phone +44 7894 239785, email info@pacesettercleaning.co.uk, or request a fast cleaning quote through the website."],
    ],
  },
  {
    path: "careers",
    title: "Join Our Team | Careers | Pacesetter Cleaning Services LTD",
    description:
      "Apply to join the Pacesetter team. We are hiring professional cleaners, maids, and window cleaners in London and Liverpool.",
    sections: [
      ["Work with Pacesetter", "We offer competitive pay, training, and flexible hours for residential, commercial, Airbnb, and window cleaners."],
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

  return `<main class="seo-static-content" aria-label="Pacesetter Cleaning Services overview">
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
