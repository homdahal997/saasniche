import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { Button } from "@/components/ui/button";
import ContentSummary from "./ContentSummary";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  // Fetch total content count (server component)
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/content?limit=1`, {
    cache: 'no-store',
  });
  const data = await res.json();
  const totalContent = data?.pagination?.total ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-lg flex flex-col justify-between min-h-screen fixed left-0 top-0 z-40">
        <div>
          <div className="px-6 pt-6 pb-2 border-b">
            <span className="text-2xl font-bold text-indigo-700 block">SaaS Niche</span>
            <div className="text-xs text-gray-500 mt-2">Homda Organization</div>
            <div className="text-xs text-gray-400">Free Plan</div>
          </div>
          <nav className="mt-6 px-6 space-y-2">
            <SidebarLink href="/dashboard" label="Dashboard" icon="🏠" />
            <SidebarLink href="/dashboard/ai-content" label="Generate Content" icon="✨" />
            <SidebarLink href="/dashboard/ai-content" label="Content Library" icon="📚" />
            <SidebarLink href="/dashboard/team" label="Team" icon="👥" />
            <SidebarLink href="/dashboard/billing" label="Billing" icon="💳" />
            <SidebarLink href="/dashboard/settings" label="Settings" icon="⚙️" />
          </nav>
        </div>
        <div className="px-6 py-4 border-t">
          <a href="/auth/signout" className="text-sm text-gray-600 hover:text-red-600 font-semibold flex items-center gap-2">
            <span>Sign Out</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8 ml-64">
          {/* Welcome Message Only */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg">Welcome back, {session.user?.name}! 👋</p>
          </div>

          {/* Stat Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatWidget title="Total Content" value={String(totalContent)} trend="+20.1%" icon="📝" />
            <StatWidget title="Active Users" value="12" trend="+2" icon="👥" />
            <StatWidget title="API Usage" value="78%" trend="" icon="🔌" />
            <StatWidget title="Success Rate" value="97.2%" trend="+0.5%" icon="✅" />
          </div>

          {/* Main Grid: Quick Actions & Recent Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions - vertical card */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 items-start">
              <div className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</div>
              <a href="/dashboard/ai-content" className="w-full">
                <Button size="sm" variant="default" className="w-full mb-2">Generate New Content</Button>
              </a>
              <a href="/dashboard/ai-content" className="w-full">
                <Button size="sm" variant="secondary" className="w-full mb-2">Browse Content Library</Button>
              </a>
              <a href="/dashboard/team" className="w-full">
                <Button size="sm" variant="outline" className="w-full">Manage Team</Button>
              </a>
            </div>
            {/* Recent Content - right of Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-800">Recent Content</div>
                <a href="/dashboard/ai-content" className="text-indigo-600 hover:underline text-sm">View all</a>
              </div>
              <ContentSummary />
            </div>
          </div>

          {/* Usage Analytics - below both */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center mb-8">
            <div className="text-lg font-semibold text-gray-800 mb-2">Usage Analytics</div>
            <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
              {/* Placeholder for chart */}
              Analytics charts will be implemented with backend data
            </div>
          </div>
        </div>
      </main>
    </div>
  );
// SidebarLink component for sidebar navigation
function SidebarLink({ href, label, icon }: { href: string; label: string; icon?: string }) {
  return (
    <a href={href} className="flex items-center gap-3 px-3 py-2 rounded text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
// StatWidget component for dashboard stats
function StatWidget({ title, value, trend, icon }: { title: string; value: string; trend?: string; icon?: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {trend && <div className="text-xs text-green-600">{trend} from last month</div>}
    </div>
  );
}
}
