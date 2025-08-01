import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-indigo-50 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 text-center">
          Create Professional Content for Any Industry
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 text-center max-w-2xl">
          Generate tailored marketing copy, legal templates, and technical documentation with AI. Designed for teams and organizations across all industries.
        </p>
        <div className="flex gap-4">
          <Link href="/signup" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Start Free Trial</Link>
          <Link href="/about" className="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-lg font-semibold shadow hover:bg-indigo-50 transition">Learn More</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Everything You Need to Scale Content Creation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Powered Generation",
              desc: "Advanced AI models trained on industry-specific content patterns",
            },
            {
              title: "Industry-Specific",
              desc: "Tailored templates for legal, marketing, technical, and business content",
            },
            {
              title: "Multi-Tenant",
              desc: "Secure organization workspaces with team collaboration features",
            },
            {
              title: "Content Library",
              desc: "Organize, edit, and manage all your generated content in one place",
            },
            {
              title: "Team Collaboration",
              desc: "Share templates, review content, and collaborate with your team",
            },
            {
              title: "Enterprise Security",
              desc: "SOC 2 compliant with advanced data protection and privacy controls",
            },
          ].map((f, i) => (
            <div key={i} className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                {/* Placeholder for icon/image */}
                <span className="text-2xl text-indigo-600 font-bold">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{f.title}</h3>
              <p className="text-gray-600 text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <h2 className="text-3xl font-bold text-center mb-10">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Starter",
              price: "$29/month",
              desc: "Perfect for small teams and startups",
              features: ["Up to 5 team members", "1,000 AI generations/month", "Basic templates library", "Email support"],
              cta: "Start Free Trial",
              highlight: false,
            },
            {
              title: "Professional",
              price: "$99/month",
              desc: "For growing businesses and agencies",
              features: ["Up to 25 team members", "5,000 AI generations/month", "Premium templates library", "Custom prompts & training", "Priority support"],
              cta: "Start Free Trial",
              highlight: true,
            },
            {
              title: "Enterprise",
              price: "Custom",
              desc: "For large organizations",
              features: ["Unlimited team members", "Unlimited AI generations", "Custom integrations", "Dedicated support", "SLA & compliance"],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((p, i) => (
            <div key={i} className={`rounded-lg shadow-lg p-8 flex flex-col items-center border ${p.highlight ? 'border-indigo-600' : 'border-gray-200'} bg-white`}>
              <h3 className="text-2xl font-bold mb-2 text-center">{p.title}</h3>
              <p className="text-3xl font-extrabold text-indigo-600 mb-2">{p.price}</p>
              <p className="text-gray-700 mb-4 text-center">{p.desc}</p>
              <ul className="mb-6 text-gray-600 text-sm space-y-2">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-400 rounded-full inline-block"></span>{f}</li>
                ))}
              </ul>
              <Link href={p.title === "Enterprise" ? "/contact" : "/signup"} className={`px-6 py-2 rounded-lg font-semibold shadow ${p.highlight ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-indigo-600'} hover:bg-indigo-700 hover:text-white transition`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-white flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Ready to Transform Your Content Creation?</h2>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">Join thousands of businesses using AI to create better content faster.</p>
        <div className="flex gap-4">
          <Link href="/signup" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Start Your Free Trial</Link>
          <Link href="/demo" className="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-lg font-semibold shadow hover:bg-indigo-50 transition">Schedule Demo</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="text-gray-600">ContentAI © 2025 ContentAI. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#features" className="text-gray-600 hover:text-indigo-600">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</Link>
            <Link href="#about" className="text-gray-600 hover:text-indigo-600">About</Link>
            <Link href="/login" className="text-gray-600 hover:text-indigo-600">Sign In</Link>
            <Link href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-800">Get Started</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
