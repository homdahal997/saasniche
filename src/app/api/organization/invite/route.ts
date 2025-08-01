import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { sendMailgunEmail } from "@/lib/mailgun";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.tenantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Only allow admins to invite users
  if (session.user.role !== 'ADMIN' && session.user.role !== 'OWNER') {
    return NextResponse.json({ error: "Only admins can invite users" }, { status: 403 });
  }
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  // Create invite token
  const token = nanoid(32);
  await prisma.inviteToken.create({
    data: {
      email,
      token,
      tenantId: session.user.tenantId,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h expiry
    },
  });
  // Send invite email
  await sendMailgunEmail({
    to: email,
    subject: "You're invited!",
    text: `Accept your invite: ${process.env.NEXTAUTH_URL}/auth/invite?token=${token}`,
  });
  return NextResponse.json({ success: true });
}
