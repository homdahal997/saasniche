import Link from "next/link";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import ClientUserMenu from "./ClientUserMenu";
import React from "react";

export async function Navigation() {
  const session = await auth();
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-indigo-600">
            SaaS Niche
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/dev-plan" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dev Plan
            </Link>
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <ClientUserMenu email={session.user?.email || ""} />
              </>
            ) : (
              <Button asChild size="sm">
                <Link href="/auth/signin?callbackUrl=/dashboard">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
