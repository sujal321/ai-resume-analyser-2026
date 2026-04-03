# Quick Start Guide 🚀

Get your AI Resume Analyzer running in 5 minutes!

## Step 1: Install Prerequisites

### Install Node.js (if not already installed)
Download from: https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

### Install MongoDB (Local option)
**Windows:** Download from https://www.mongodb.com/try/download/community
**macOS:** `brew install mongodb-community`
**Linux:** Follow distro-specific instructions

OR use MongoDB Atlas (cloud, no installation):
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string

### Install Ollama (Local AI)
**Download:** https://ollama.ai

After installation:
```bash
ollama pull llama3
```

## Step 2: Set Up the Project

Navigate to project directory:
```bash
cd "ai-resume-analyzer"
```

Install dependencies:
```bash
npm install
```

## Step 3: Configure Environment

Edit `.env.local` file:

**For local MongoDB:**
```env
MONGODB_URI=mongodb://127.0.0.1:27017/resumeAI
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumeAI
```

**Optional - Enable Google OAuth:**
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret-key
NEXTAUTH_SECRET=run-this-command-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 4: Start Services

### Terminal 1: Start MongoDB (if local)
**Windows (Admin):**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
```

### Terminal 2: Start Ollama
```bash
ollama serve
```

Keep this terminal open - Ollama needs to stay running.

### Terminal 3: Start Development Server
```bash
npm run dev
```

## Step 5: Open the Application

Open your browser: **http://localhost:3000**

You should see the landing page! 🎉

## Step 6: Test the System

1. **Click "Analyze Your Resume"** or go to `/upload`
2. **Upload a sample PDF resume**
3. **Wait for analysis** (10-30 seconds)
4. **View results!**

## Troubleshooting

### ❌ "Cannot connect to MongoDB"
**Solution:** Make sure MongoDB is running
```bash
# Windows (Admin PowerShell)
net start MongoDB

# Check if running
mongod --version
```

### ❌ "Ollama connection failed"
**Solution:** 
1. Verify Ollama is running: `ollama serve`
2. Check model exists: `ollama list`
3. If no llama3: `ollama pull llama3`

### ❌ "Module not found" errors
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ TypeScript errors
**Solution:** Build to check errors
```bash
npm run build
```

## Production Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Backend (Run Locally or on VPS)
Since we're using local Ollama, the backend must run where Ollama is installed.

**Option 1: All-in-one local**
- Everything runs on localhost:3000

**Option 2: Split deployment**
- Frontend: Vercel
- Backend API: Your computer/VPS with Ollama
- Database: MongoDB Atlas

Update `NEXTAUTH_URL` to production URL when deploying.

## Next Steps

✅ **Test with multiple resumes** - See dashboard analytics  
✅ **Customize the prompt** - Edit `src/lib/ollama.ts` for different analysis criteria  
✅ **Add job descriptions** - Implement job matching feature  
✅ **Export results** - Add PDF export functionality  
✅ **Share on GitHub** - Showcase your project!  

## Performance Tips

1. **Faster AI**: Use smaller models like `mistral` instead of `llama3`
2. **Better accuracy**: Use larger models or fine-tuned versions
3. **Batch processing**: Upload multiple resumes at once
4. **Caching**: Store LLM responses for similar resumes

## Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Check code quality

# Ollama
ollama serve         # Start AI server
ollama pull llama3   # Download model
ollama list          # List installed models

# MongoDB
mongod --version     # Check MongoDB version
mongo                # MongoDB shell
```

## Support

- **Documentation:** See `README.md`
- **Setup Script:** Run `powershell -ExecutionPolicy Bypass -File setup.ps1`
- **Issues:** Check troubleshooting section above

---

**Happy coding! 🚀**

If you found this helpful, consider starring the repo on GitHub! ⭐
