"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function OrganizationPage() {
  const [org, setOrg] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current organization info
    fetch("/api/organization/me")
      .then(res => res.json())
      .then(data => {
        setOrg(data);
        setName(data?.name || "");
      });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();
    try {
      const res = await fetch("/api/organization/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        toast.success("Organization updated!");
        setOrg({ ...org, name });
      } else {
        const data = await res.json();
        toast.error(data.error || "Update failed.");
      }
    } catch {
      toast.error("Network error.");
    }
    setLoading(false);
  };

  if (!org) return <div className="max-w-lg mx-auto py-10">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Organization Settings</h2>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block font-medium mb-1">Organization Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Organization Details</h3>
        <div className="bg-gray-50 p-4 rounded">
          <div><span className="font-medium">Name:</span> {org.name}</div>
          <div><span className="font-medium">ID:</span> {org.id}</div>
        </div>
      </div>
    </div>
  );
}
