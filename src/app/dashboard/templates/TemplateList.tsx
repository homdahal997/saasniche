import React from "react";

export type Template = {
  id: string;
  name: string;
  description?: string;
  industry: string;
  contentType: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function TemplateList({ templates }: { templates: Template[] }) {
  if (!templates.length) {
    return <p className="text-gray-500">No templates found.</p>;
  }
  return (
    <div className="grid gap-4">
      {templates.map((tpl) => (
        <div key={tpl.id} className="border rounded p-4 bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-lg">{tpl.name}</div>
            <div className="text-gray-600 text-sm mb-1">{tpl.description}</div>
            <div className="text-xs text-gray-400">Industry: {tpl.industry} | Type: {tpl.contentType} {tpl.isPublic && <span className="ml-2 text-green-600">Public</span>}</div>
          </div>
          <div className="mt-2 md:mt-0">
            {/* Actions: Use, Edit, etc. */}
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Use</button>
          </div>
        </div>
      ))}
    </div>
  );
}
