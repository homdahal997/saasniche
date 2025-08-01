import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import ContentSummary from "./ContentSummary";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
        </div>
        <ContentSummary />
        <div className="grid lg:grid-cols-3 gap-8">
          <DashboardClient />
          <div className="bg-gradient-to-br from-indigo-100 to-indigo-300 p-6 rounded-lg shadow flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 text-indigo-900">AI Content Generator</h2>
            <p className="text-gray-700 mb-4 text-center">Generate high-quality content for your business using AI. Click below to get started!</p>
            <a href="/dashboard/ai-content">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded transition-transform duration-150 hover:scale-105 shadow-lg">
                Go to AI Content Generator
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
