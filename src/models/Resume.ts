import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  filename: String,
  score: Number,
  skills: [String],
  suggestions: [String],
  jobMatch: Number,
  experience: Number,
  education: String,
  contact: {
    email: String,
    phone: String,
    linkedin: String,
  },
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

export const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
