declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function loadRecaptchaScript(siteKey: string): Promise<void> {
  return new Promise((resolve) => {
    if (window.grecaptcha && window.grecaptcha.execute) {
      resolve();
      return;
    }
    const scriptId = "recaptcha-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", () => resolve());
    }
  });
}

/**
 * Executes reCAPTCHA v3 and returns a verification token.
 * If VITE_RECAPTCHA_SITE_KEY is missing, logs a warning and returns null.
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    console.warn("[reCAPTCHA] VITE_RECAPTCHA_SITE_KEY is not set. Skipping verification.");
    return null;
  }

  await loadRecaptchaScript(siteKey);

  return new Promise((resolve) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(siteKey, { action });
        resolve(token);
      } catch (err) {
        console.error("[reCAPTCHA] execution failed:", err);
        resolve(null);
      }
    });
  });
}
