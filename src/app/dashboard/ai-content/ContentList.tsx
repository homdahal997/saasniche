

"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface ContentItem {
  id: string;
  title: string;
  contentType: string;
  industry: string;
  generatedContent: string;
  createdAt: string;
}

export default function ContentList() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewItem, setViewItem] = useState<ContentItem | null>(null);
  const limit = 10;

  // TipTap editor instance (client-only, top-level)
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setEditContent(editor.getHTML());
    },
    editable: !!editId,
    immediatelyRender: false,
  });

  // Sync editor content when editId or editContent changes
  useEffect(() => {
    if (editor && editId) {
      editor.commands.setContent(editContent || '');
      editor.setEditable(true);
    } else if (editor) {
      editor.commands.setContent('');
      editor.setEditable(false);
    }
  }, [editId, editContent, editor]);

  const fetchContents = async (params = {}) => {
    setLoading(true);
    setError("");
    try {
      const url = new URL("/api/content", window.location.origin);
      url.searchParams.set("limit", String(limit));
      url.searchParams.set("page", String(page));
      if (search) url.searchParams.set("search", search);
      if (filterType) url.searchParams.set("contentType", filterType);
      if (filterIndustry) url.searchParams.set("industry", filterIndustry);
      const res = await fetch(url.toString());
      const data = await res.json();
      if (res.ok) {
        setContents(data.contents);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setError(data.error || "Failed to fetch content");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterType, filterIndustry]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchContents();
  };

  const startEdit = (item: ContentItem) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditContent(item.generatedContent);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/content/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, generatedContent: editContent }),
      });
      if (res.ok) {
        setContents((prev) => prev.map((c) => c.id === id ? { ...c, title: editTitle, generatedContent: editContent } : c));
        cancelEdit();
      } else {
        alert("Failed to save changes.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Saved AI Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2 mb-4 items-end">
          <input
            className="border rounded px-2 py-1"
            placeholder="Search by title or content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-2 py-1"
            value={filterType}
            onChange={e => { setFilterType(e.target.value); setPage(1); }}
          >
            <option value="">All Types</option>
            <option value="MARKETING_COPY">Marketing Copy</option>
            <option value="EMAIL_TEMPLATE">Email Template</option>
            <option value="BLOG_POST">Blog Post</option>
            <option value="SOCIAL_MEDIA">Social Media</option>
            <option value="LEGAL_DOCUMENT">Legal Document</option>
            <option value="CONTRACT_TEMPLATE">Contract Template</option>
            <option value="PRIVACY_POLICY">Privacy Policy</option>
            <option value="TERMS_OF_SERVICE">Terms of Service</option>
            <option value="TECHNICAL_DOCUMENTATION">Technical Documentation</option>
            <option value="API_DOCUMENTATION">API Documentation</option>
            <option value="USER_MANUAL">User Manual</option>
            <option value="PRESS_RELEASE">Press Release</option>
            <option value="PRODUCT_DESCRIPTION">Product Description</option>
            <option value="JOB_DESCRIPTION">Job Description</option>
            <option value="OTHER">Other</option>
          </select>
          <select
            className="border rounded px-2 py-1"
            value={filterIndustry}
            onChange={e => { setFilterIndustry(e.target.value); setPage(1); }}
          >
            <option value="">All Industries</option>
            <option value="MARKETING">Marketing</option>
            <option value="LEGAL">Legal</option>
            <option value="HEALTHCARE">Healthcare</option>
            <option value="FINANCE">Finance</option>
            <option value="TECHNOLOGY">Technology</option>
            <option value="ECOMMERCE">E-commerce</option>
            <option value="EDUCATION">Education</option>
            <option value="REAL_ESTATE">Real Estate</option>
            <option value="CONSULTING">Consulting</option>
            <option value="HOSPITALITY">Hospitality</option>
            <option value="MANUFACTURING">Manufacturing</option>
            <option value="NON_PROFIT">Non-Profit</option>
            <option value="OTHER">Other</option>
          </select>
          <Button type="submit" size="sm">Search</Button>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && contents.length === 0 && (
          <div className="text-gray-500">No content found.</div>
        )}
        <div className="space-y-4">
          {contents.map((item) => (
            <div key={item.id} className="border rounded p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div>
                  {editId === item.id ? (
                    <input
                      className="font-semibold border rounded px-2 py-1 w-48"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      disabled={saving}
                    />
                  ) : (
                    <span className="font-semibold">{item.title}</span>
                  )}
                  <span className="ml-2 text-xs text-gray-500">[{item.contentType}]</span>
                  <span className="ml-2 text-xs text-gray-400">{item.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
                  <Button size="sm" variant="secondary" onClick={() => setViewItem(item)}>View</Button>
                  {editId === item.id ? (
                    <>
                      <Button size="sm" variant="outline" onClick={() => saveEdit(item.id)} disabled={saving}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={cancelEdit} disabled={saving}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => startEdit(item)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={async () => {
                        if (confirm('Are you sure you want to delete this content?')) {
                          try {
                            const res = await fetch(`/api/content/${item.id}`, { method: 'DELETE' });
                            if (res.ok) {
                              setContents((prev) => prev.filter((c) => c.id !== item.id));
                            } else {
                              alert('Failed to delete content.');
                            }
                          } catch {
                            alert('Network error.');
                          }
                        }
                      }}>Delete</Button>
                    </>
                  )}
                </div>
              </div>
              <div className="whitespace-pre-line text-gray-900">
                {editId === item.id ? (
                  <div className="w-full border rounded px-2 py-1 mt-1 bg-white">
                    <EditorContent editor={editor} />
                  </div>
                ) : (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.generatedContent }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
          <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      {/* Modal for viewing content details */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setViewItem(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{viewItem.title}</h2>
            <div className="mb-2 text-sm text-gray-500">
              <span className="mr-2">Type: <span className="font-medium">{viewItem.contentType}</span></span>
              <span className="mr-2">Industry: <span className="font-medium">{viewItem.industry}</span></span>
              <span>Created: {new Date(viewItem.createdAt).toLocaleString()}</span>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <div className="bg-gray-50 border rounded p-4 whitespace-pre-line text-gray-900 max-h-96 overflow-auto">
                {viewItem.generatedContent}
              </div>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
  );
}
