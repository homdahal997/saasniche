import formData from "form-data";
import Mailgun from "mailgun.js";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY!;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key: MAILGUN_API_KEY });

export async function sendMailgunEmail({ to, subject, text, html }: { to: string; subject: string; text?: string; html?: string }) {
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) throw new Error("Mailgun API key or domain not set");
  return mg.messages.create(MAILGUN_DOMAIN, {
    from: `SaaS Niche <noreply@${MAILGUN_DOMAIN}>`,
    to,
    subject,
    text,
    html,
  });
}
