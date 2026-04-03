import Link from "next/link";
import { ArrowRight, Upload, BarChart3, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Powered by Local AI
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-4xl">
            Transform Your Resume with{" "}
            <span className="text-primary">AI-Powered Insights</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Get instant, professional feedback on your resume. Our advanced AI analyzes 
            content, structure, and ATS compatibility to help you land more interviews.
          </p>
          
          <div className="flex gap-4">
            <Link href="/upload">
              <Button size="lg" className="gap-2">
                Analyze Your Resume
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card">
            <Upload className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-muted-foreground">
              Simply drag and drop your PDF resume. Our system handles the rest automatically.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <BarChart3 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-muted-foreground">
              Get scored on content quality, structure, keywords, and ATS compatibility.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <CheckCircle className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Actionable Feedback</h3>
            <p className="text-muted-foreground">
              Receive specific, actionable suggestions to improve your resume instantly.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-secondary/30 rounded-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
            <p className="text-muted-foreground">
              Upload your PDF resume using our simple drag-and-drop interface.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground">
              Our local AI analyzes content, skills, experience, and formatting.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-muted-foreground">
              Receive detailed scores, skill extraction, and improvement suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Improve Your Resume?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers who have optimized their resumes with AI.
          </p>
          <Link href="/upload">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
