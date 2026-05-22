export function scrollToSection(id: string) {
  const target = document.querySelector<HTMLElement>(id);
  if (!target) return;

  const header = document.querySelector<HTMLElement>(".site-header");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const headerTop = header ? Number.parseFloat(window.getComputedStyle(header).top || "0") : 0;
  const sectionGap = window.innerWidth <= 860 ? 12 : 18;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - headerTop - sectionGap;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  });
}
