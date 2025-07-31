"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function ClientUserMenu({ email }: { email: string }) {
  return (
    <>
      <span className="text-gray-500 text-sm">{email}</span>
      <Button size="sm" variant="outline" onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
        Sign Out
      </Button>
    </>
  );
}
