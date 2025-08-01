import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center">
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
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src="/avatars/tenant.png" alt="Tenant" />
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
              <CardTitle>Multi-Tenant Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Complete data isolation for each organization with secure tenant-based access control.
              </p>
              <Badge variant="secondary">Enterprise</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src="/avatars/template.png" alt="Templates" />
                <AvatarFallback>IT</AvatarFallback>
              </Avatar>
              <CardTitle>Industry-Specific Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Pre-built templates for marketing, legal, healthcare, finance, and more industries.
              </p>
              <Badge variant="outline">Templates</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src="/avatars/ai.png" alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <CardTitle>AI-Powered Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">
                Leverage GPT-4 to create high-quality, context-aware content for your business.
              </p>
              <Badge>Powered by GPT-4</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
