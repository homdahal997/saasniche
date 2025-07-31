import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

import { randomBytes } from "crypto";
import { sendMailgunEmail } from "@/lib/mailgun";

const RESET_TOKEN_EXPIRY_HOURS = 2;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    console.log("[ForgotPassword] User found, sending reset email to:", user.email);
    // Generate secure token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expires,
      },
    });
    // Send email with reset link using Mailgun
    // Use environment variables for base URL, no hardcoded logic
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;
    try {
      const mailgunResult = await sendMailgunEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${resetUrl}`,
        html: `<p>Click the link to reset your password:</p><p><a href=\"${resetUrl}\">${resetUrl}</a></p>`
      });
      console.log("Mailgun send result:", mailgunResult);
    } catch (e) {
      if (e && typeof e === "object" && "response" in e) {
        // Mailgun error with response
        console.error("Mailgun send error (response):", e.response && (typeof e.response.text === "function" ? e.response.text() : e.response));
      } else {
        console.error("Mailgun send error:", e);
      }
    }
  }
  // Always return success to prevent email enumeration
  return NextResponse.json({ ok: true });
}
