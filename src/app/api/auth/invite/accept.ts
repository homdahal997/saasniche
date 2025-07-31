import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, name, password } = await req.json();
  if (!token || !name || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  const invite = await prisma.inviteToken.findUnique({ where: { token } });
  if (!invite || invite.expires < new Date()) {
    return NextResponse.json({ error: "Invite is invalid or expired" }, { status: 400 });
  }
  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email: invite.email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email: invite.email,
      password: hash,
      tenantId: invite.tenantId,
      role: "USER",
    },
  });
  // Delete invite token after use
  await prisma.inviteToken.delete({ where: { token } });
  return NextResponse.json({ success: true });
}
