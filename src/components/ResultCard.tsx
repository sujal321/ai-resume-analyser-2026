"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { BadgeCheck, TrendingUp, Briefcase, GraduationCap } from "lucide-react";

interface ResultCardProps {
  data: {
    score: number;
    jobMatch?: number;
    skills: string[];
    suggestions: string[];
    experience?: number;
    education?: string;
    contact?: {
      email?: string;
      phone?: string;
      linkedin?: string;
    };
  };
}

export default function ResultCard({ data }: ResultCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
              {data.score}/100
            </div>
            <p className="text-xs text-muted-foreground">
              {getScoreLabel(data.score)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Match</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.jobMatch || "N/A"}%</div>
            <p className="text-xs text-muted-foreground">ATS compatibility</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.experience ? `${data.experience}+ years` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Professional background</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Education</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{data.education || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Highest degree</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Identified</CardTitle>
          <CardDescription>
            Technical and soft skills detected in your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Suggestions</CardTitle>
          <CardDescription>Actionable improvements for your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside">
            {data.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm leading-relaxed">
                {suggestion}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Contact Info */}
      {data.contact && (data.contact.email || data.contact.phone || data.contact.linkedin) && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Extracted contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {data.contact.email && (
                <div>
                  <span className="font-medium">Email:</span> {data.contact.email}
                </div>
              )}
              {data.contact.phone && (
                <div>
                  <span className="font-medium">Phone:</span> {data.contact.phone}
                </div>
              )}
              {data.contact.linkedin && (
                <div>
                  <span className="font-medium">LinkedIn:</span> {data.contact.linkedin}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
