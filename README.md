# AI Resume Analyzer 🚀

A production-grade, full-stack AI-powered resume analysis platform built with Next.js, local LLM (Ollama), and MongoDB.

![Features](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![AI](https://img.shields.io/badge/AI-Ollama%20LLM-purple?logo=openai)

## ✨ Features

- **🤖 AI-Powered Analysis**: Local LLM (no API costs) provides intelligent resume feedback
- **📊 Comprehensive Scoring**: Overall score, job match percentage, skills extraction
- **💡 Actionable Suggestions**: Specific, implementable improvements
- **📈 Analytics Dashboard**: Track trends, skill frequency, score distribution
- **🔐 Multi-User Support**: Optional authentication with NextAuth.js
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS + shadcn/ui
- **📄 PDF Parsing**: Automatic text extraction from PDF resumes
- **💾 Persistent Storage**: MongoDB integration for historical tracking

## 🏗️ Architecture

```
ai-resume-analyzer/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   ├── analyze/       # POST: Upload & analyze resume
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   └── resumes/       # GET: List all analyses
│   │   ├── dashboard/         # Analytics dashboard page
│   │   ├── upload/            # Resume upload page
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── Navbar.tsx
│   │   ├── UploadBox.tsx      # Drag-drop upload component
│   │   ├── ResultCard.tsx     # Analysis results display
│   │   └── Charts.tsx         # Analytics visualizations
│   ├── lib/
│   │   ├── db.ts              # MongoDB connection
│   │   ├── ollama.ts          # Local LLM integration
│   │   ├── pdf.ts             # PDF text extraction
│   │   └── utils.ts           # Utility functions
│   └── models/
│       └── Resume.ts          # Mongoose schema
├── public/uploads/            # Stored PDF files
└── .env.local                 # Environment variables
```

## 🚀 Quick Start

### Prerequisites

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **MongoDB** - [Install locally](https://www.mongodb.com/docs/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **Ollama** - [Download](https://ollama.ai)

### Installation

1. **Clone the repository**
```bash
cd ai-resume-analyzer
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.local` and configure:
```bash
# MongoDB (local or Atlas URI)
MONGODB_URI=mongodb://127.0.0.1:27017/resumeAI

# Optional: Google OAuth for multi-user mode
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Required for auth
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
```

4. **Start MongoDB** (if running locally)
```bash
# Windows (as admin)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. **Install and run Ollama**
```bash
# Install from https://ollama.ai

# Pull the llama3 model
ollama pull llama3

# Start Ollama server
ollama serve
```

6. **Run the development server**
```bash
npm run dev
```

Open [https://splendid-mochi-b5eadd.netlify.app/](https://splendid-mochi-b5eadd.netlify.app/) to see the application!

## 📖 Usage

### Analyzing a Resume

1. Navigate to `/upload`
2. Drag and drop a PDF resume or click to browse
3. Wait for AI analysis (10-30 seconds depending on model)
4. View detailed results including:
   - Overall score (0-100)
   - Job match percentage
   - Extracted skills
   - Years of experience
   - Education level
   - Contact information
   - Actionable suggestions

### Dashboard Analytics

Visit `/dashboard` to see:
- Score distribution across all submissions
- Most common skills (pie chart)
- Average scores and statistics
- Historical submission list

## 🔧 Configuration

### Changing the AI Model

Edit `src/lib/ollama.ts` to use different models:

```typescript
model: "llama3" // Options: llama3, mistral, codellama, etc.
```

Available models: `ollama list` after pulling with `ollama pull <model-name>`

### Database Options

**Local MongoDB:**
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/resumeAI
```

**MongoDB Atlas (Cloud):**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumeAI
```

### Enabling Authentication

Authentication is currently commented out for demo purposes. To enable:

1. Uncomment auth checks in `src/app/api/analyze/route.ts`
2. Configure Google OAuth credentials in `.env.local`
3. Set up OAuth consent screen in Google Cloud Console

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: MongoDB + Mongoose
- **AI/ML**: Ollama (Local LLM)
- **PDF Processing**: pdf-parse
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Auth**: NextAuth.js

## 📊 API Endpoints

### `POST /api/analyze`

Upload and analyze a resume.

**Request:**
```typescript
FormData {
  file: File // PDF resume
}
```

**Response:**
```typescript
{
  id: string;
  score: number;
  skills: string[];
  suggestions: string[];
  jobMatch: number;
  experience: number;
  education: string;
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
  filename: string;
}
```

### `GET /api/resumes`

Retrieve all analyzed resumes.

**Response:**
```typescript
Resume[] // Array of resume analysis objects
```

## 🎨 Customization

### Branding

Update colors in `src/app/globals.css`:
```css
--primary: #0284c7; /* Change to your brand color */
```

### Prompt Engineering

Improve AI analysis by editing the prompt in `src/lib/ollama.ts`:
```typescript
const prompt = `
You are an expert resume analyzer...
// Customize evaluation criteria here
`;
```

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod --config /path/to/mongod.conf`
- Check connection string in `.env.local`

### "Ollama connection failed"
- Verify Ollama is running: `ollama serve`
- Check if model is installed: `ollama list`
- Test endpoint: `curl http://localhost:11434/api/tags`

### "PDF parsing failed"
- Ensure PDF is not password-protected
- Check file size (should be < 10MB)
- Verify text is extractable (not scanned images)

### TypeScript errors
```bash
npm run build # Check for compilation errors
```

## 📈 Future Enhancements

- [ ] Job description matching
- [ ] ATS keyword optimization
- [ ] Multi-language support
- [ ] Export to Word/PDF with suggestions
- [ ] A/B testing for resume versions
- [ ] Integration with LinkedIn
- [ ] Email notifications
- [ ] Advanced analytics (time series, trends)

## 🔒 Security Notes

- File uploads are stored locally - consider cloud storage for production
- Sanitize user inputs before database insertion
- Use HTTPS in production
- Rotate `NEXTAUTH_SECRET` regularly
- Implement rate limiting for API routes

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 💡 Tips for Best Results

1. **Use clear PDFs**: Text-based PDFs work best (not scanned images)
2. **Detailed resumes**: More content = better analysis
3. **Modern formats**: Standard sections (Experience, Education, Skills)
4. **Quantifiable achievements**: Numbers help AI understand impact

## 🎯 Performance Benchmarks

- **Upload & Parse**: ~1-2 seconds
- **AI Analysis**: ~10-30 seconds (depends on model & hardware)
- **Dashboard Load**: < 500ms (with indexed MongoDB queries)

## 🌟 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Ollama](https://ollama.ai/)
- [shadcn/ui](https://ui.shadcn.com/)
- [MongoDB](https://www.mongodb.com/)

---

**Made with ❤️ using AI and lots of coffee ☕**

For questions or support, open an issue on GitHub.
