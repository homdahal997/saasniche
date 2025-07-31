import React from "react";

export default function ContentHistoryPage() {
  // Placeholder for content history data fetching
  // Will fetch content history from API in next step
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Content History</h1>
      <div className="mb-4 text-lg">View all your generated content here.</div>
      {/* Content history list will go here */}
      <div className="border rounded p-6 bg-white shadow">
        <p className="text-gray-500">No content found. (Content history list coming soon.)</p>
      </div>
    </div>
  );
}
