import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/templates - List templates (public + user/tenant)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tenantId = session.user.tenantId;
  // Fetch public templates and tenant-specific templates
  const templates = await prisma.template.findMany({
    where: {
      OR: [
        { isPublic: true },
        { tenantId: tenantId },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ templates });
}

// POST /api/templates - Create a new template
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tenantId = session.user.tenantId;
  const body = await req.json();
  const { name, description, industry, contentType, prompt, variables, isPublic } = body;
  if (!name || !industry || !contentType || !prompt || !Array.isArray(variables)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const template = await prisma.template.create({
    data: {
      name,
      description,
      industry,
      contentType,
      prompt,
      variables,
      isPublic: !!isPublic,
      tenantId: isPublic ? null : tenantId,
    },
  });
  return NextResponse.json({ template });
}
