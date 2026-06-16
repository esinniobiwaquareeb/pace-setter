import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_SITE_CONTENT, mergeSiteContent } from "../../src/app/landing/site-content";
import type { SavedBooking, SiteContent, SavedApplication } from "../../src/app/landing/types";

const CONTENT_PATHNAME = "cms/content.json";
const BOOKINGS_PATHNAME = "records/bookings.json";

function getDataFile(name: "content" | "bookings" | "applications") {
  return path.join(process.cwd(), "data", `${name}.json`);
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function blobRequest<T>(pathname: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`);
  const response = await fetch(`https://blob.vercel-storage.com${pathname}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Blob request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, data: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function getBlobJson<T>(pathname: string, fallback: T): Promise<T> {
  const params = new URLSearchParams({
    prefix: pathname,
    limit: "20",
  });
  const payload = await blobRequest<{ blobs: Array<{ url: string; pathname: string; uploadedAt: string }> }>(`/?${params.toString()}`);
  const match = payload.blobs
    .filter((blob) => blob.pathname === pathname)
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0];

  if (!match) return fallback;
  const response = await fetch(match.url, { cache: "no-store" });
  if (!response.ok) return fallback;
  return (await response.json()) as T;
}

async function putBlobJson(pathname: string, data: unknown) {
  await blobRequest(`/${pathname}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "x-content-type": "application/json",
      "x-add-random-suffix": "0",
      "x-cache-control-max-age": "0",
    },
  });
}

export async function getSiteContent() {
  if (hasBlobToken()) {
    const content = await getBlobJson<Partial<SiteContent>>(CONTENT_PATHNAME, DEFAULT_SITE_CONTENT);
    return mergeSiteContent(content);
  }

  const content = await readJsonFile<Partial<SiteContent>>(getDataFile("content"), DEFAULT_SITE_CONTENT);
  return mergeSiteContent(content);
}

export async function saveSiteContent(content: SiteContent) {
  const next = mergeSiteContent({ ...content, updatedAt: new Date().toISOString() });
  if (hasBlobToken()) {
    await putBlobJson(CONTENT_PATHNAME, next);
    return next;
  }

  await writeJsonFile(getDataFile("content"), next);
  return next;
}

export async function getBookings() {
  if (hasBlobToken()) {
    return await getBlobJson<SavedBooking[]>(BOOKINGS_PATHNAME, []);
  }

  return await readJsonFile<SavedBooking[]>(getDataFile("bookings"), []);
}

export async function saveBookings(bookings: SavedBooking[]) {
  if (hasBlobToken()) {
    await putBlobJson(BOOKINGS_PATHNAME, bookings);
    return;
  }

  await writeJsonFile(getDataFile("bookings"), bookings);
}

const APPLICATIONS_PATHNAME = "records/applications.json";

export async function getApplications() {
  if (hasBlobToken()) {
    return await getBlobJson<SavedApplication[]>(APPLICATIONS_PATHNAME, []);
  }

  return await readJsonFile<SavedApplication[]>(getDataFile("applications"), []);
}

export async function saveApplications(applications: SavedApplication[]) {
  if (hasBlobToken()) {
    await putBlobJson(APPLICATIONS_PATHNAME, applications);
    return;
  }

  await writeJsonFile(getDataFile("applications"), applications);
}
