import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  fullName: string;
  email: string;
  organization?: string;
  reason: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = {
  fullName: 200,
  email: 200,
  organization: 200,
  reason: 100,
  message: 5000,
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const organization = body.organization?.trim() ?? "";
  const reason = body.reason?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // Validation
  if (!isNonEmptyString(fullName) || fullName.length > MAX_LENGTH.fullName) {
    return NextResponse.json(
      { error: "Please provide a valid name." },
      { status: 400 }
    );
  }

  if (
    !isNonEmptyString(email) ||
    !EMAIL_REGEX.test(email) ||
    email.length > MAX_LENGTH.email
  ) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (organization.length > MAX_LENGTH.organization) {
    return NextResponse.json(
      { error: "Organization name is too long." },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(reason) || reason.length > MAX_LENGTH.reason) {
    return NextResponse.json(
      { error: "Please select a reason for reaching out." },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(message) || message.length > MAX_LENGTH.message) {
    return NextResponse.json(
      { error: "Please include a message." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Missing Resend configuration. Ensure RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL are set."
    );
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toISOString();

  const textBody = [
    `New message from the Equal Horizons contact form`,
    ``,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Organization: ${organization || "Not provided"}`,
    `Reason: ${reason}`,
    `Submitted: ${timestamp}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Inter, Arial, sans-serif; color: #1C2340; line-height: 1.6;">
      <h2 style="color: #293681; margin-bottom: 4px;">New Equal Horizons contact form submission</h2>
      <p style="color: #4274D9; font-size: 13px; margin-top: 0;">${escapeHtml(timestamp)}</p>
      <table style="border-collapse: collapse; margin-top: 16px;">
        <tbody>
          <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Name</td><td>${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Organization</td><td>${escapeHtml(organization || "Not provided")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; font-weight: 600;">Reason</td><td>${escapeHtml(reason)}</td></tr>
        </tbody>
      </table>
      <p style="margin-top: 20px; font-weight: 600;">Message</p>
      <p style="white-space: pre-wrap; border-left: 3px solid #95CCDD; padding-left: 12px;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Equal Horizons Contact: ${reason}`,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again." },
      { status: 500 }
    );
  }
}
