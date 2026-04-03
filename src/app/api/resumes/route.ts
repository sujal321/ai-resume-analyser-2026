import { connectDB } from "@/lib/db";
import { Resume } from "@/models/Resume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const resumes = await Resume.find().sort({ createdAt: -1 });
    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}
