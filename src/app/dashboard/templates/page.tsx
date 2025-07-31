
import React from "react";
import Link from "next/link";
import TemplateList, { Template } from "./TemplateList";
import { prisma } from "@/lib/db";

export default async function TemplatesPage() {
  // Fetch templates directly from the database (public + tenant-specific)
  // TODO: Add tenantId from session if needed for multi-tenancy
  const templatesRaw = await prisma.template.findMany({
    where: {
      OR: [
        { isPublic: true },
        // { tenantId: ... } // Add tenantId logic if needed
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  // Serialize Date fields for client component
  const templates: Template[] = templatesRaw.map((t: any) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Templates</h1>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-lg">Browse and use content templates, or create your own.</span>
        <Link href="/dashboard/templates/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Create Template</Link>
      </div>
      <div className="border rounded p-6 bg-white shadow">
        <TemplateList templates={templates} />
      </div>
    </div>
  );
}
npx prisma migrate dev --name add_password_reset_tokennpx prisma migrate dev --name add_password_reset_token