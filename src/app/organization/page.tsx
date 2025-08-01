"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserManagement from "./UserManagement";
import { useUserRole } from "./useUserRole";
import AdminUserTable from "./AdminUserTable";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function OrganizationPage() {
  const [org, setOrg] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const role = useUserRole();

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

  if (!org || !role) return <div className="max-w-lg mx-auto py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Organization Settings</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Organization Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {(role === "ADMIN" || role === "OWNER") && (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <CardFooter className="p-0 mt-4">
                  <Button
                    type="submit"
                    className="w-full transition-transform duration-150 hover:scale-[1.02]"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Badge variant="secondary" className="mb-2">Active</Badge>
              </div>
              <div><span className="font-medium">Name:</span> {org.name}</div>
              <div><span className="font-medium">ID:</span> {org.id}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {(role === "ADMIN" || role === "OWNER") && <UserManagement />}
        {(role === "ADMIN" || role === "OWNER") && <AdminUserTable />}
      </div>
    </div>
  );
}
