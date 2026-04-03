# Testing Guide

## Manual Testing Checklist

### Before Testing
- [ ] MongoDB is running
- [ ] Ollama is running (`ollama serve`)
- [ ] llama3 model is installed (`ollama list` shows llama3)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` configured with MongoDB URI

### Test 1: Development Server Starts

```bash
npm run dev
```

Expected output:
- ✓ Ready in Xms
- ✓ Local: http://localhost:3000

Open browser and verify:
- [ ] Landing page loads
- [ ] Navigation works
- [ ] No console errors

### Test 2: Upload Resume

1. Navigate to `/upload`
2. Prepare a sample PDF resume
3. Drag onto upload box or click to browse
4. Select PDF file

Expected behavior:
- [ ] File uploads successfully
- [ ] Loading spinner appears
- [ ] "Analyzing your resume..." message shows
- [ ] Results appear after 10-30 seconds

### Test 3: View Results

After upload completes, verify:
- [ ] Overall score displayed (0-100)
- [ ] Job match percentage shown
- [ ] Skills are extracted and displayed as tags
- [ ] Suggestions list populated (3-5 items)
- [ ] Experience years extracted
- [ ] Education level shown
- [ ] Contact info displayed if available

### Test 4: Dashboard Analytics

1. Navigate to `/dashboard`
2. Wait for data to load

Verify:
- [ ] Score distribution chart renders
- [ ] Top skills pie chart displays
- [ ] Quick stats show correct numbers
- [ ] Recent submissions list appears
- [ ] Each submission shows filename, score, date
- [ ] "View Details" expands to show full analysis

### Test 5: Multiple Resumes

Upload 2-3 different resumes and check:
- [ ] All appear in dashboard
- [ ] Charts update with new data
- [ ] Statistics recalculate
- [ ] No duplicate entries

### Test 6: Error Handling

Test error scenarios:

**Invalid file type:**
- Try uploading .docx or .txt
- Expected: Error message "Only PDF files are allowed"

**Empty PDF:**
- Upload blank PDF
- Expected: Error or fallback analysis

**Ollama not running:**
- Stop Ollama: `Ctrl+C` in Ollama terminal
- Try upload
- Expected: Fallback response with suggestions to start Ollama

### Test 7: Responsive Design

Test on different viewports:

**Mobile (< 640px):**
- [ ] Navigation collapses appropriately
- [ ] Content stacks vertically
- [ ] Charts resize properly
- [ ] Buttons are tappable

**Tablet (640px - 1024px):**
- [ ] Grid layouts adjust
- [ ] Text remains readable
- [ ] Images scale correctly

**Desktop (> 1024px):**
- [ ] Full layout displays
- [ ] Multi-column grids work
- [ ] Hover states function

### Test 8: Dark Mode

If system supports dark mode:
- [ ] Colors invert properly
- [ ] Text remains readable
- [ ] Charts visible on dark background
- [ ] No contrast issues

## API Testing with curl

### Test Analyze Endpoint

```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "file=@/path/to/your/resume.pdf"
```

Expected response:
```json
{
  "id": "...",
  "score": 75,
  "skills": ["JavaScript", "React", "Node.js"],
  "suggestions": ["Add more quantifiable achievements"],
  "jobMatch": 80,
  "experience": 3,
  "education": "Bachelor's Degree"
}
```

### Test Resumes Endpoint

```bash
curl http://localhost:3000/api/resumes
```

Expected: Array of resume objects

## Performance Testing

### Page Load Time

Using Chrome DevTools Lighthouse:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Generate report

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### API Response Time

Test endpoint latency:
```bash
# Install httpie if not installed
pip install httpie

# Test analyze endpoint timing
http --timing POST http://localhost:3000/api/analyze file:@resume.pdf
```

Expected:
- First byte: < 1s (excluding AI processing)
- Total time: Depends on AI model (10-30s typical)

## Browser Compatibility

Test in multiple browsers:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

Verify:
- Consistent styling
- All features work
- No browser-specific errors

## Known Limitations

1. **AI Analysis Time**: 10-30 seconds depending on model and hardware
2. **PDF Size**: Large files (>10MB) may be slow
3. **Scanned PDFs**: Image-based PDFs won't parse (need OCR)
4. **Non-English Resumes**: May have reduced accuracy

## Regression Testing

After making code changes:

1. Run type check: `npm run type-check`
2. Run linter: `npm run lint`
3. Build project: `npm run build`
4. Test core features (Tests 2-4 above)

## Integration Testing Checklist

Before deployment:

- [ ] All pages load without errors
- [ ] API endpoints return expected data
- [ ] Database queries work efficiently
- [ ] File uploads function correctly
- [ ] Charts render properly
- [ ] Authentication works (if enabled)
- [ ] Mobile responsive design intact
- [ ] No console errors in production build

## Reporting Issues

When you find bugs, document:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/OS version
5. Screenshots if applicable
6. Console errors

Create an issue on GitHub with this information.

---

**Happy Testing!** 🧪
