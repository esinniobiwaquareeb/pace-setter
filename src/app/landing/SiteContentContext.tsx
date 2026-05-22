import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { DEFAULT_SITE_CONTENT } from "./site-content";
import type { SiteContent } from "./types";

const SiteContentContext = createContext<SiteContent>(DEFAULT_SITE_CONTENT);

export function SiteContentProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent;
}) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
