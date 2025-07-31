"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIContentPage() {
    const [prompt, setPrompt] = useState("");
    const [template, setTemplate] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult("");
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ prompt, template })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to generate content.");
            } else {
                setResult(data.content);
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardTitle>AI Content Generator</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prompt</label>
                            <textarea
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                rows={4}
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                required
                                placeholder="Describe what you want the AI to generate..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Template (optional)</label>
                            <input
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                value={template}
                                onChange={e => setTemplate(e.target.value)}
                                placeholder="e.g. You are a helpful assistant."
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Generating..." : "Generate Content"}
                        </Button>
                    </form>
                    {error && <div className="mt-4 text-red-600">{error}</div>}
                    {result && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Generated Content</label>
                            <div className="bg-white border rounded-md p-4 whitespace-pre-line text-gray-900">
                                {result}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
