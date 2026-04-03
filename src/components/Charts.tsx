"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsProps {
  resumes: any[];
}

export default function Charts({ resumes }: ChartsProps) {
  // Prepare data for charts
  const scoreDistribution = {
    labels: ["0-20", "21-40", "41-60", "61-80", "81-100"],
    datasets: [
      {
        label: "Number of Resumes",
        data: [
          resumes.filter((r) => r.score <= 20).length,
          resumes.filter((r) => r.score > 20 && r.score <= 40).length,
          resumes.filter((r) => r.score > 40 && r.score <= 60).length,
          resumes.filter((r) => r.score > 60 && r.score <= 80).length,
          resumes.filter((r) => r.score > 80).length,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  // Top skills frequency
  const skillFrequency: Record<string, number> = {};
  resumes.forEach((resume) => {
    resume.skills?.forEach((skill: string) => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
    });
  });

  const topSkills = Object.entries(skillFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const skillsData = {
    labels: topSkills.map(([skill]) => skill),
    datasets: [
      {
        label: "Frequency",
        data: topSkills.map(([_, count]) => count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(199, 199, 199, 0.5)",
          "rgba(83, 102, 255, 0.5)",
          "rgba(255, 99, 255, 0.5)",
          "rgba(99, 255, 132, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(199, 199, 199)",
          "rgb(83, 102, 255)",
          "rgb(255, 99, 255)",
          "rgb(99, 255, 132)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const averageScore = resumes.length > 0
    ? Math.round(resumes.reduce((sum, r) => sum + r.score, 0) / resumes.length)
    : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
          <CardDescription>How resumes are distributed across score ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <Bar
            data={scoreDistribution}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Skills</CardTitle>
          <CardDescription>Most frequently appearing skills</CardDescription>
        </CardHeader>
        <CardContent>
          <Pie
            data={skillsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right" as const,
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Overview of all analyzed resumes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Resumes</p>
              <p className="text-2xl font-bold">{resumes.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-2xl font-bold">{averageScore}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Highest Score</p>
              <p className="text-2xl font-bold">
                {resumes.length > 0 ? Math.max(...resumes.map((r) => r.score)) : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
