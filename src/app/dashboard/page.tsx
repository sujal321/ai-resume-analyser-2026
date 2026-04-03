"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Charts from "@/components/Charts";
import ResultCard from "@/components/ResultCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";

interface Resume {
  _id: string;
  filename: string;
  score: number;
  skills: string[];
  suggestions: string[];
  jobMatch?: number;
  experience?: number;
  education?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch("/api/resumes");
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    
    // TODO: Implement delete API endpoint
    alert("Delete functionality coming soon!");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track and analyze all your resume submissions
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p>Loading...</p>
          </div>
        ) : resumes.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Resumes Yet</CardTitle>
              <CardDescription>
                Upload your first resume to see analytics and insights
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Analytics Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Analytics Overview</h2>
              <Charts resumes={resumes} />
            </section>

            {/* Recent Submissions */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Recent Submissions</h2>
              <div className="grid gap-4">
                {resumes.map((resume) => (
                  <Card key={resume._id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{resume.filename}</CardTitle>
                          <CardDescription>
                            Analyzed on {new Date(resume.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(resume._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Score</p>
                          <p className={`text-2xl font-bold ${
                            resume.score >= 80 ? "text-green-600" :
                            resume.score >= 60 ? "text-yellow-600" :
                            "text-red-600"
                          }`}>
                            {resume.score}/100
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Job Match</p>
                          <p className="text-2xl font-bold">{resume.jobMatch || "N/A"}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Skills Found</p>
                          <p className="text-2xl font-bold">{resume.skills.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Suggestions</p>
                          <p className="text-2xl font-bold">{resume.suggestions.length}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <details>
                          <summary className="cursor-pointer text-sm text-primary hover:underline">
                            View Details
                          </summary>
                          <div className="mt-4 p-4 bg-secondary rounded-lg">
                            <ResultCard data={resume} />
                          </div>
                        </details>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
