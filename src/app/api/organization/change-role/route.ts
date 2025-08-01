import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.tenantId || (session.user.role !== "ADMIN" && session.user.role !== "OWNER")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { userId, role } = await req.json();
  if (!userId || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // Prevent demoting the only owner
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.tenantId !== session.user.tenantId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (user.role === "OWNER" && role !== "OWNER") {
    const ownerCount = await prisma.user.count({ where: { tenantId: session.user.tenantId, role: "OWNER" } });
    if (ownerCount <= 1) {
      return NextResponse.json({ error: "At least one owner required" }, { status: 400 });
    }
  }
  await prisma.user.update({ where: { id: userId }, data: { role } });
  return NextResponse.json({ success: true });
}
