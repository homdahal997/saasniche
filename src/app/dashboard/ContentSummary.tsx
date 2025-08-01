"use client";
import { useEffect, useState } from "react";

export default function ContentSummary() {
  const [stats, setStats] = useState({ total: 0, month: 0, tokens: 0, templates: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/content?limit=5");
        const data = await res.json();
        if (res.ok) {
          setStats({
            total: data.pagination?.total || 0,
            month: data.contents.filter((c:any) => new Date(c.createdAt).getMonth() === new Date().getMonth()).length,
            tokens: data.contents.reduce((sum:any, c:any) => sum + (c.tokensUsed || 0), 0),
            templates: new Set(data.contents.map((c:any) => c.contentType)).size,
          });
          setRecent(data.contents.slice(0, 5));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Total Content</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
          <p className="text-3xl font-bold text-green-600">{stats.month}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Tokens Used</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.tokens}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.templates}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Content</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="text-gray-500">No content generated yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recent.map((c) => (
              <li key={c.id} className="py-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{c.title}</span>
                  <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500">{c.contentType} | {c.industry}</div>
                <div className="text-gray-700 mt-1 line-clamp-2">{c.generatedContent}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
