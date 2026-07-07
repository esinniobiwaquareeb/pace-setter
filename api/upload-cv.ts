import { json } from "./_lib/http.js";

/**
 * POST /api/upload-cv
 * Body: { fileName: string; fileBase64: string }   (fileBase64 is a data-URL)
 * Returns: { url: string }
 *
 * Uploads the CV PDF to Cloudinary (server-side, credentials never exposed to
 * the browser) and returns the secure public URL.
 */
export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return json({ error: "Cloudinary is not configured." }, { status: 500 });
  }

  let body: { fileName?: string; fileBase64?: string };
  try {
    body = (await request.json()) as { fileName?: string; fileBase64?: string };
  } catch {
    return json({ error: "Invalid request body." }, { status: 400 });
  }

  const { fileName, fileBase64 } = body;
  if (!fileBase64) {
    return json({ error: "No file data provided." }, { status: 400 });
  }

  // Build the upload folder/public_id
  const timestamp = Math.floor(Date.now() / 1000);
  const safeName = (fileName ?? "cv")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 60);
  const publicId = `careers/cvs/${timestamp}_${safeName}`;

  // Build the SHA-1 signature that Cloudinary requires
  const paramStr = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = await sha1Hex(`${paramStr}${apiSecret}`);

  // Cloudinary expects the raw base64 string (strip the data-URL prefix if present)
  const base64Data = fileBase64.includes(",")
    ? fileBase64.split(",")[1]
    : fileBase64;

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  let result: { secure_url?: string; error?: { message: string } };
  try {
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: `data:application/pdf;base64,${base64Data}`,
        public_id: publicId,
        api_key: apiKey,
        timestamp: timestamp,
        signature: signature,
      }),
    });
    result = (await response.json()) as typeof result;
  } catch (err) {
    return json({ error: `Upload request failed: ${String(err)}` }, { status: 502 });
  }

  if (result.error) {
    return json({ error: result.error.message }, { status: 422 });
  }

  return json({ url: result.secure_url });
}

// ---- Minimal SHA-1 using the Web Crypto API (available in Node 18+) ----
async function sha1Hex(input: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
