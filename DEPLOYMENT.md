# Deployment Guide

This guide covers deploying your AI Resume Analyzer to production.

## 🎯 Deployment Options

Since this app uses local Ollama (AI), you have several options:

### Option 1: All-in-One Local (Recommended for Personal Use)
Everything runs on your computer.

**Pros:**
- Free
- Full control
- No API costs
- Fast development

**Cons:**
- Requires your computer to stay on
- Not scalable for many users

**Setup:**
1. Keep MongoDB running
2. Keep Ollama running
3. Run `npm run build && npm start`
4. Access via localhost or expose with ngrok

### Option 2: Split Architecture (Recommended for Production)

Separate frontend, backend, and database.

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend    │────▶│  Database   │
│  (Vercel)   │     │  (Your PC/   │     │  (MongoDB   │
│             │     │   VPS)       │     │   Atlas)    │
└─────────────┘     └──────────────┘     └─────────────┘
```

## 📦 Step-by-Step Deployment

## Part 1: Deploy Frontend to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ai-resume-analyzer.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Add Environment Variables

In Vercel dashboard, add:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/resumeAI
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
```

### 4. Deploy

Click "Deploy" - Vercel will build and deploy your app!

**Frontend URL**: `https://your-app.vercel.app`

---

## Part 2: Deploy Backend API (Your Computer/VPS)

Since Ollama runs locally, your backend needs to be accessible.

### Option A: Expose Localhost with ngrok (Development)

1. **Install ngrok**
   ```bash
   npm install -g ngrok
   ```

2. **Run your Next.js app**
   ```bash
   npm run dev
   ```

3. **Expose port 3000**
   ```bash
   ngrok http 3000
   ```

4. **Get public URL**
   - ngrok gives you: `https://abc123.ngrok.io`
   - Update Vercel env vars with this URL

### Option B: Deploy to VPS (Production)

Rent a VPS (Virtual Private Server):

**Recommended Providers:**
- DigitalOcean Droplet ($6/month)
- Linode ($5/month)
- AWS EC2 (free tier eligible)
- Google Cloud Compute Engine

**Setup Steps:**

1. **Create Ubuntu 22.04 server**

2. **SSH into server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt-get install -y nodejs
   ```

4. **Install MongoDB**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   apt-get update
   apt-get install -y mongodb-org
   systemctl start mongod
   systemctl enable mongod
   ```

5. **Install Ollama**
   ```bash
   curl -fsSL https://ollama.ai/install.sh | sh
   ollama pull llama3
   ```

6. **Clone your repo**
   ```bash
   git clone https://github.com/yourusername/ai-resume-analyzer.git
   cd ai-resume-analyzer
   npm install
   ```

7. **Set environment variables**
   ```bash
   nano .env.local
   # Add your config
   ```

8. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

9. **Start app with PM2**
   ```bash
   pm2 start npm --name "resume-analyzer" -- start
   pm2 save
   pm2 startup
   ```

10. **Setup Firewall**
    ```bash
    ufw allow 3000/tcp
    ufw enable
    ```

**Backend URL**: `http://your-server-ip:3000`

---

## Part 3: Deploy Database (MongoDB Atlas)

### 1. Create Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster (M0 Free tier)
4. Choose cloud provider and region

### 2. Configure Access

**Database Access:**
- Create database user
- Set username/password

**Network Access:**
- Add IP address (0.0.0.0/0 for all IPs)

### 3. Get Connection String

1. Click "Connect"
2. Choose "Connect your application"
3. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/resumeAI
   ```

### 4. Update Environment Variables

**On Vercel (Frontend):**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/resumeAI
```

**On Backend (VPS):**
Same in `.env.local`

---

## 🔗 Connect Everything Together

### Update Frontend (Vercel)

In Vercel dashboard, set:
```env
API_BASE_URL=http://your-backend-url:3000
```

### Update Backend

If frontend and backend are separate:

1. **Enable CORS in Next.js config**

Create `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

---

## 🚀 Alternative: Docker Deployment

Containerize the entire application.

### 1. Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 2. Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/resumeAI
    depends_on:
      - mongo

  mongo:
    image: mongo:7.0
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo-data:
```

### 3. Build and Run

```bash
docker-compose up -d
```

**Note**: You'll still need Ollama running separately or include it in the Docker image.

---

## 🔒 Security Considerations

### Production Checklist

- [ ] Use HTTPS (Vercel provides this automatically)
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Restrict MongoDB network access
- [ ] Use environment variables (never commit secrets)
- [ ] Enable rate limiting on API routes
- [ ] Implement proper authentication
- [ ] Add input validation
- [ ] Set up error logging
- [ ] Configure CORS properly
- [ ] Regular security updates

### Rate Limiting

Add to API routes:
```typescript
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

// Apply in route handler
```

---

## 📊 Monitoring & Logging

### Vercel Analytics

Enable in Vercel dashboard:
- Web Vitals
- Function execution metrics
- Error tracking

### Server Monitoring (VPS)

Install monitoring tools:
```bash
# Install htop for resource monitoring
apt-get install htop

# Install fail2ban for security
apt-get install fail2ban
```

### Application Logging

Use services like:
- Sentry (error tracking)
- LogRocket (session replay)
- Datadog (full-stack monitoring)

---

## 💰 Cost Breakdown

### Free Tier (Personal)
- Frontend: Vercel Free ✓
- Database: MongoDB Atlas Free (512MB) ✓
- Backend: Your computer ✓
- **Total: $0/month**

### Production Setup
- Frontend: Vercel Pro ($20/month)
- Database: MongoDB Atlas M10 ($57/month)
- Backend: DigitalOcean Droplet ($6/month)
- **Total: ~$83/month**

### Optimized Production
- Frontend: Vercel Free ✓
- Database: MongoDB Atlas M2 ($9/month)
- Backend: Larger VPS ($12/month)
- **Total: ~$21/month**

---

## 🔄 CI/CD Pipeline

### Automatic Deployments

**Vercel**: Automatically deploys on git push to main branch.

**Backend (VPS)**: Use GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /app/ai-resume-analyzer
            git pull
            npm install
            pm2 restart resume-analyzer
```

---

## ✅ Post-Deployment Checklist

After deploying:

- [ ] Test all pages load
- [ ] Verify API endpoints work
- [ ] Check database connections
- [ ] Test file uploads
- [ ] Monitor error logs
- [ ] Set up SSL certificates
- [ ] Configure custom domain
- [ ] Test mobile responsiveness
- [ ] Run performance benchmarks
- [ ] Set up backups

---

## 🆘 Troubleshooting

### Frontend can't reach backend
- Check CORS settings
- Verify backend URL in env vars
- Ensure firewall allows traffic

### Database connection fails
- Whitelist IP addresses in MongoDB Atlas
- Verify connection string
- Check network access rules

### Ollama timeout
- Increase timeout in `ollama.ts`
- Use faster model (mistral instead of llama3)
- Upgrade server hardware

---

## 📞 Support

For deployment issues:
1. Check provider documentation
2. Review error logs
3. Search GitHub issues
4. Contact support

---

**Good luck with your deployment!** 🚀

Remember: Start simple (local deployment) and scale up as needed.
