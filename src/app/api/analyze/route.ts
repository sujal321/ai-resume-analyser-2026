import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { extractText } from "@/lib/pdf";
import { analyzeWithLLM } from "@/lib/ollama";
import { connectDB } from "@/lib/db";
import { Resume } from "@/models/Resume";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    // Check authentication (optional - can be disabled for single-user mode)
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    // Extract text from PDF
    const resumeText = await extractText(filePath);

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. Please ensure it's a valid resume." },
        { status: 400 }
      );
    }

    // Analyze with LLM
    const analysis = await analyzeWithLLM(resumeText);

    // Connect to database and save results
    await connectDB();
    const savedResume = await Resume.create({
      filename: file.name,
      score: analysis.score,
      skills: analysis.skills,
      suggestions: analysis.suggestions,
      jobMatch: analysis.jobMatch,
      experience: analysis.experience,
      education: analysis.education,
      contact: analysis.contact,
      userId: undefined, // session?.user?.id when auth is enabled
    });

    return NextResponse.json({
      id: savedResume._id,
      ...analysis,
      filename: file.name,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process resume. Please try again." },
      { status: 500 }
    );
  }
}
