import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  console.log("[Invite Validate] Token received:", token);
  if (!token) {
    console.log("[Invite Validate] No token provided");
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }
  const invite = await prisma.inviteToken.findUnique({ where: { token } });
  console.log("[Invite Validate] Invite found:", invite);
  if (!invite) {
    console.log("[Invite Validate] No invite found for token");
    return NextResponse.json({ error: "Invite is invalid or expired" }, { status: 400 });
  }
  if (invite.expires < new Date()) {
    console.log("[Invite Validate] Invite expired:", invite.expires, "now:", new Date());
    return NextResponse.json({ error: "Invite is invalid or expired" }, { status: 400 });
  }
  return NextResponse.json({ email: invite.email });
}
