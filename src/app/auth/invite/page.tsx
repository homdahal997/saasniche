"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function InviteAcceptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/auth/invite/validate?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          setEmail(data.email);
          setValid(true);
        } else {
          toast.error(data.error || "Invalid or expired invite.");
        }
      });
  }, [token]);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    toast.dismiss();
    const res = await fetch("/api/auth/invite/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, name, password }),
    });
    if (res.ok) {
      toast.success("Account created! You can now sign in.");
      setTimeout(() => router.push("/auth/signin"), 2000);
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to accept invite.");
    }
    setLoading(false);
  };

  if (!token) return <div className="max-w-lg mx-auto py-10">No invite token provided.</div>;

  return (
    <div className="max-w-lg mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Accept Invitation</h2>
      {valid ? (
        <form onSubmit={handleAccept} className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2 bg-gray-100" value={email} disabled />
          </div>
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>
          <button type="submit" className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={loading}>
            {loading ? "Creating..." : "Accept Invite"}
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded shadow">Invite is invalid or expired.</div>
      )}
    </div>
  );
}
