"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";
import ResultCard from "@/components/ResultCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {!result ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Upload Your Resume</h1>
              <p className="text-xl text-muted-foreground">
                Get instant AI-powered feedback to improve your job application
              </p>
            </div>
            
            <UploadBox onUploadComplete={setResult} />
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Overall Score</CardTitle>
                  <CardDescription>Comprehensive resume evaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get a data-driven score based on content quality, structure, and industry standards.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Skills Analysis</CardTitle>
                  <CardDescription>Identify your key strengths</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    AI extracts and categorizes your technical and soft skills automatically.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 Smart Suggestions</CardTitle>
                  <CardDescription>Actionable improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Receive specific recommendations to make your resume stand out.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">Analysis Results</h1>
              <Button onClick={() => setResult(null)} variant="outline">
                Analyze Another Resume
              </Button>
            </div>
            
            <ResultCard data={result} />
          </div>
        )}
      </main>
    </div>
  );
}
