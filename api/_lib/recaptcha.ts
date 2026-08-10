export type RecaptchaResult = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

/**
 * Verifies a reCAPTCHA v3 token against Google's API.
 * Returns true if the token is valid and score is >= 0.5 (standard human threshold).
 * If RECAPTCHA_SECRET_KEY is missing, logs a warning and returns true (bypassing verification in dev/local).
 */
export async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn("[reCAPTCHA Server] RECAPTCHA_SECRET_KEY is not set. Bypassing verification.");
    return true;
  }

  if (!token) {
    console.warn("[reCAPTCHA Server] No token provided.");
    return false;
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      console.error(`[reCAPTCHA Server] siteverify returned status ${response.status}`);
      return false;
    }

    const data = (await response.json()) as RecaptchaResult;

    if (!data.success) {
      console.warn("[reCAPTCHA Server] Validation failed:", data["error-codes"]);
      return false;
    }

    // reCAPTCHA v3 returns a score (from 0.0 to 1.0)
    // 0.5 is the default threshold.
    const score = data.score ?? 0;
    if (score < 0.5) {
      console.warn(`[reCAPTCHA Server] Blocked potential bot with score ${score}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[reCAPTCHA Server] Error verifying token:", err);
    return false;
  }
}
