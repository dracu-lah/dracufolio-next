import { ContactFormData } from "@/lib/validation/contact-schema";

/**
 * The EmailJS SDK is imported here, inside the call, rather than at the top of
 * the file. It is 15KB of JavaScript that only matters once somebody presses
 * Send, and at the top of the file it landed in the home page's first load
 * instead. The import resolves in a few hundred milliseconds on the press,
 * which the button already covers with its loading state.
 */
export async function sendContactEmail(
  data: ContactFormData,
): Promise<boolean> {
  const serviceId = "service_pk03a79";
  const templateId = "template_uz2gf3a";
  const apiKey = process.env.NEXT_PUBLIC_EMAILJS_API_KEY;

  if (!serviceId || !templateId || !apiKey) return false;

  try {
    const { default: emailjs } = await import("@emailjs/browser");
    await emailjs.send(serviceId, templateId, { ...data }, apiKey);
    return true;
  } catch {
    return false;
  }
}
