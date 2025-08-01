"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserRole } from "./useUserRole";

export default function AdminUserTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const role = useUserRole();

  const fetchUsers = () => {
    setLoading(true);
    fetch("/api/organization/users")
      .then(res => res.json())
      .then(data => setUsers(data || []))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoading(true);
    const res = await fetch("/api/organization/change-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });
    if (res.ok) {
      toast.success("Role updated");
      fetchUsers();
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to update role");
      setLoading(false);
    }
  };

  const handleRemove = async (userId: string) => {
    if (!confirm("Remove this user from the organization?")) return;
    setLoading(true);
    const res = await fetch("/api/organization/remove-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      toast.success("User removed");
      fetchUsers();
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to remove user");
      setLoading(false);
    }
  };

  if (role !== "ADMIN" && role !== "OWNER") return null;
  if (loading) return <div>Loading users...</div>;

  return (
    <div className="mt-10">
      <h3 className="font-semibold mb-2">Organization Users</h3>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                  disabled={user.role === "OWNER"}
                  className="border rounded px-2 py-1"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="OWNER">Owner</option>
                </select>
              </td>
              <td className="px-4 py-2">
                {user.role !== "OWNER" && (
                  <button
                    onClick={() => handleRemove(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
