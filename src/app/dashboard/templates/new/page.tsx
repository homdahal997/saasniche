import React, { useState } from "react";
import { useRouter } from "next/navigation";

const industries = ["SaaS", "E-commerce", "Healthcare", "Education", "Other"];
const contentTypes = ["BlogPost", "Email", "AdCopy", "SocialMedia", "Other"];

export default function NewTemplatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    industry: industries[0],
    contentType: contentTypes[0],
    prompt: "",
    variables: "",
    isPublic: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          variables: form.variables.split(",").map((v) => v.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create template");
      }
      router.push("/dashboard/templates");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Template</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <input name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Industry</label>
          <select name="industry" value={form.industry} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Content Type</label>
          <select name="contentType" value={form.contentType} onChange={handleChange} className="w-full border rounded px-3 py-2">
            {contentTypes.map((ct) => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Prompt</label>
          <textarea name="prompt" value={form.prompt} onChange={handleChange} required rows={3} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block font-medium">Variables <span className="text-gray-500">(comma separated)</span></label>
          <input name="variables" value={form.variables} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. productName, audience" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} className="mr-2" />
          <label>Make template public (visible to all users)</label>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? "Creating..." : "Create Template"}
        </button>
      </form>
    </div>
  );
}
