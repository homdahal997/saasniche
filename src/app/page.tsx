import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Content Generation for <span className="text-indigo-600">Niche Markets</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create customized marketing copy, legal templates, and technical documentation 
            tailored for your industry with the power of AI.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/dev-plan">View Dev Plan</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Multi-Tenant Architecture</h3>
            <p className="text-gray-600">
              Complete data isolation for each organization with secure tenant-based access control.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Industry-Specific Templates</h3>
            <p className="text-gray-600">
              Pre-built templates for marketing, legal, healthcare, finance, and more industries.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">AI-Powered Generation</h3>
            <p className="text-gray-600">
              Leverage GPT-4 to create high-quality, context-aware content for your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
