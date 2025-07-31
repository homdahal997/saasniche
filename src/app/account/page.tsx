"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function AccountPage() {
  const { data: session, update } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [name, setName] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();
    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (res.ok) {
        toast.success("Profile updated!");
        update();
      } else {
        const data = await res.json();
        toast.error(data.error || "Update failed.");
      }
    } catch {
      toast.error("Network error.");
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    toast.dismiss();
    try {
      const res = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        toast.success("Password changed!");
        setPassword("");
        setConfirm("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Password change failed.");
      }
    } catch {
      toast.error("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <form onSubmit={handleProfileUpdate} className="bg-white p-6 rounded shadow space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
      <form onSubmit={handlePasswordChange} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
