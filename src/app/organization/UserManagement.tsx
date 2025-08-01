"use client";
import { useState } from "react";
import toast from "react-hot-toast";

import { useUserRole } from "./useUserRole";

export default function UserManagement() {
  const role = useUserRole();
  const [inviteEmail, setInviteEmail] = useState("");
  const [addUser, setAddUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Invite user flow
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();
    try {
      const res = await fetch("/api/organization/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail }),
      });
      if (res.ok) {
        toast.success("Invitation sent!");
        setInviteEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to send invite.");
      }
    } catch {
      toast.error("Network error.");
    }
    setLoading(false);
  };

  // Add user directly flow
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();
    try {
      const res = await fetch("/api/organization/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addUser),
      });
      if (res.ok) {
        toast.success("User added!");
        setAddUser({ name: "", email: "", password: "" });
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to add user.");
      }
    } catch {
      toast.error("Network error.");
    }
    setLoading(false);
  };

  if (role !== "ADMIN" && role !== "OWNER") return null;
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* ...existing code for forms... */}
      <form onSubmit={handleInvite} className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="font-semibold mb-2">Invite User</h3>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="User email"
          value={inviteEmail}
          onChange={e => setInviteEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Invite"}
        </button>
      </form>
      <form onSubmit={handleAddUser} className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="font-semibold mb-2">Add User Directly</h3>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
          value={addUser.name}
          onChange={e => setAddUser({ ...addUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          value={addUser.email}
          onChange={e => setAddUser({ ...addUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          value={addUser.password}
          onChange={e => setAddUser({ ...addUser, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
