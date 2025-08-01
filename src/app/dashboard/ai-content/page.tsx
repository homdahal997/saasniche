"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Industry, ContentType } from "@/types";
import ContentList from "./ContentList";

const INDUSTRY_OPTIONS = [
	{ value: "MARKETING", label: "Marketing" },
	{ value: "LEGAL", label: "Legal" },
	{ value: "HEALTHCARE", label: "Healthcare" },
	{ value: "FINANCE", label: "Finance" },
	{ value: "TECHNOLOGY", label: "Technology" },
	{ value: "ECOMMERCE", label: "E-commerce" },
	{ value: "EDUCATION", label: "Education" },
	{ value: "REAL_ESTATE", label: "Real Estate" },
	{ value: "CONSULTING", label: "Consulting" },
	{ value: "HOSPITALITY", label: "Hospitality" },
	{ value: "MANUFACTURING", label: "Manufacturing" },
	{ value: "NON_PROFIT", label: "Non-Profit" },
	{ value: "OTHER", label: "Other" },
];
const CONTENT_TYPE_OPTIONS = [
	{ value: "MARKETING_COPY", label: "Marketing Copy" },
	{ value: "EMAIL_TEMPLATE", label: "Email Template" },
	{ value: "BLOG_POST", label: "Blog Post" },
	{ value: "SOCIAL_MEDIA", label: "Social Media" },
	{ value: "LEGAL_DOCUMENT", label: "Legal Document" },
	{ value: "CONTRACT_TEMPLATE", label: "Contract Template" },
	{ value: "PRIVACY_POLICY", label: "Privacy Policy" },
	{ value: "TERMS_OF_SERVICE", label: "Terms of Service" },
	{ value: "TECHNICAL_DOCUMENTATION", label: "Technical Documentation" },
	{ value: "API_DOCUMENTATION", label: "API Documentation" },
	{ value: "USER_MANUAL", label: "User Manual" },
	{ value: "PRESS_RELEASE", label: "Press Release" },
	{ value: "PRODUCT_DESCRIPTION", label: "Product Description" },
	{ value: "JOB_DESCRIPTION", label: "Job Description" },
	{ value: "OTHER", label: "Other" },
];

export default function AIContentPage() {
	const [title, setTitle] = useState("");
	const [industry, setIndustry] = useState("MARKETING");
	const [contentType, setContentType] = useState("MARKETING_COPY");
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
				body: JSON.stringify({
					title,
					industry,
					contentType,
					prompt,
					templateId: undefined,
					description: undefined,
					variables: undefined,
				}),
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
		<div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
			<div className="w-full max-w-xl">
				<Card>
					<CardHeader>
						<CardTitle>AI Content Generator</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Title
								</label>
								<input
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									required
									placeholder="e.g. Welcome Email for New Users"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Industry
									</label>
									<select
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
										value={industry}
										onChange={(e) => setIndustry(e.target.value)}
									>
										{INDUSTRY_OPTIONS.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Content Type
									</label>
									<select
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
										value={contentType}
										onChange={(e) => setContentType(e.target.value)}
									>
										{CONTENT_TYPE_OPTIONS.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Prompt
								</label>
								<textarea
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									rows={4}
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									required
									placeholder="Describe what you want the AI to generate..."
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Template (optional)
								</label>
								<input
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									value={template}
									onChange={(e) => setTemplate(e.target.value)}
									placeholder="e.g. You are a helpful assistant."
								/>
							</div>
							<Button
								type="submit"
								disabled={loading}
								className="w-full transition-transform duration-150 hover:scale-[1.02]"
							>
								{loading ? "Generating..." : "Generate Content"}
							</Button>
						</form>
						{error && (
							<div className="mt-4 text-red-600 animate-pulse">{error}</div>
						)}
						{result && (
							<div className="mt-6 animate-fade-in">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Generated Content
								</label>
								<div className="bg-white border rounded-md p-4 whitespace-pre-line text-gray-900">
									{typeof result === "object" && result !== null && "generatedContent" in result
										? result.generatedContent
										: result}
								</div>
							</div>
						)}
					</CardContent>
					<CardFooter className="flex flex-col gap-2">
						<Badge variant="secondary" className="w-full text-center">
							AI Content is generated securely and privately
						</Badge>
						<div className="w-full flex justify-end"></div>
					</CardFooter>
				</Card>
			</div>
			<div className="w-full max-w-2xl">
				{/* List of saved/generated content */}
				<ContentList />
			</div>
		</div>
	);
}
