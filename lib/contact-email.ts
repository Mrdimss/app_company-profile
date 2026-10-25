import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let transporter: Transporter | undefined;
let transporterConfig = "";

function getContactTransporter(): {
  transporter: Transporter;
  sender: string;
  recipient: string;
} | null {
  const sender = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, "");
  const recipient = process.env.CONTACT_EMAIL?.trim();

  if (!sender || !EMAIL_PATTERN.test(sender) || !password || !recipient || !EMAIL_PATTERN.test(recipient)) {
    return null;
  }

  const configKey = `${sender}\u0000${password}`;
  if (!transporter || configKey !== transporterConfig) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      auth: { user: sender, pass: password },
    });
    transporterConfig = configKey;
  }

  return { transporter, sender, recipient };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
  country: string;
  receivedAt: Date;
}): Promise<boolean> {
  const mail = getContactTransporter();
  if (!mail) {
    console.error("Contact email notification is not configured.");
    return false;
  }

  const receivedAt = input.receivedAt.toISOString();
  const text = [
    "New message received from the Girik website.",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Company: ${input.company}`,
    `Country: ${input.country}`,
    `Subject: ${input.subject}`,
    "",
    "Message:",
    input.message,
    "",
    `Received at: ${receivedAt}`,
    "Manage this message in the Admin Dashboard.",
  ].join("\n");
  const html = `
    <h2>New message from the Girik website</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
    <p><strong>Company:</strong> ${escapeHtml(input.company)}</p>
    <p><strong>Country:</strong> ${escapeHtml(input.country)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>
    <p><strong>Received at:</strong> ${escapeHtml(receivedAt)}</p>
    <p>Manage this message in the Admin Dashboard.</p>
  `;

  try {
    await mail.transporter.sendMail({
      from: { name: "Girik Company Website", address: mail.sender },
      to: mail.recipient,
      replyTo: { name: input.name, address: input.email },
      subject: `[Girik Contact] Pesan baru dari ${input.name}`,
      text,
      html,
    });
    return true;
  } catch {
    console.error("Contact email notification delivery failed.");
    return false;
  }
}
