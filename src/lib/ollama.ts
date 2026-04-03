import axios from "axios";

export interface ResumeAnalysis {
  score: number;
  skills: string[];
  suggestions: string[];
  jobMatch?: number;
  experience?: number;
  education?: string;
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}

export async function analyzeWithLLM(resumeText: string): Promise<ResumeAnalysis> {
  const prompt = `
You are an expert resume analyzer. Analyze this resume and provide detailed feedback.

RESUME TEXT:
${resumeText}

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "score": number (0-100 based on overall quality),
  "skills": array of strings (technical and soft skills found),
  "suggestions": array of strings (3-5 actionable improvements),
  "jobMatch": number (0-100, how well this matches typical job requirements),
  "experience": number (years of experience),
  "education": string (highest degree),
  "contact": {
    "email": string or "",
    "phone": string or "",
    "linkedin": string or ""
  }
}

Be critical but fair. Focus on:
- Technical skills relevance
- Quantifiable achievements
- Clear impact statements
- ATS optimization
- Modern best practices
`;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: prompt,
        stream: false,
      },
      {
        timeout: 60000,
      }
    );

    let text = response.data.response.trim();
    
    // Remove markdown code blocks if present
    text = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    
    // Extract JSON from text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }

    const analysis = JSON.parse(text) as ResumeAnalysis;
    return analysis;
  } catch (error) {
    console.error("LLM Analysis Error:", error);
    // Return fallback analysis
    return {
      score: 65,
      skills: ["Parsing failed - check Ollama connection"],
      suggestions: [
        "Ensure Ollama is running: ollama serve",
        "Verify llama3 model is installed: ollama pull llama3",
        "Check LLM endpoint at http://localhost:11434",
      ],
      jobMatch: 60,
      experience: 0,
      education: "Unknown",
      contact: {},
    };
  }
}
