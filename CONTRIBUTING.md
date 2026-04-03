# Contributing to AI Resume Analyzer

Thank you for your interest in contributing! This guide will help you get started.

## 🌟 How to Contribute

### Reporting Bugs

1. Check existing issues first
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Open an issue with `[FEATURE]` prefix
2. Describe the feature and use case
3. Explain why it would be valuable
4. Provide examples if possible

### Code Contributions

#### 1. Fork and Clone

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

#### 2. Set Up Development Environment

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

#### 4. Make Changes

Follow these guidelines:
- Use TypeScript
- Follow existing code style
- Add comments for complex logic
- Update README.md if adding features
- Test thoroughly

#### 5. Test Your Changes

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Manual testing
npm run dev
```

#### 6. Commit Changes

Use conventional commits:
```bash
git commit -m "feat: add job description matching"
git commit -m "fix: resolve PDF parsing error"
git commit -m "docs: update installation instructions"
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

#### 7. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title
- Description of changes
- Related issue numbers
- Screenshots if UI changes

## 📋 Code Style Guidelines

### TypeScript
- Use strict mode
- Define interfaces for objects
- Avoid `any` - use proper types
- Export types used in multiple files

### Component Structure

```typescript
"use client";

import { useState } from "react";
import { ComponentProps } from "@/types";

export default function MyComponent({ prop }: ComponentProps) {
  // State hooks
  const [state, setState] = useState<Type>();
  
  // Event handlers
  const handleClick = () => {
    // Implementation
  };
  
  // Render
  return <div>Content</div>;
}
```

### File Naming
- Components: PascalCase (e.g., `UploadBox.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Pages: lowercase with folders (e.g., `upload/page.tsx`)

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Use responsive prefixes (`md:`, `lg:`)
- Define custom colors in `globals.css`

## 🧪 Testing Guidelines

### Manual Testing Checklist

For new features:
- [ ] Works on Chrome/Edge
- [ ] Works on Firefox
- [ ] Works on mobile viewport
- [ ] Handles errors gracefully
- [ ] Loading states work correctly
- [ ] Data persists correctly

### API Testing

Test endpoints with tools like Postman or curl:

```bash
# Test analyze endpoint
curl -X POST http://localhost:3000/api/analyze \
  -F "file=@sample-resume.pdf"

# Test resumes endpoint
curl http://localhost:3000/api/resumes
```

## 📚 Documentation

When adding features, update:
- `README.md` - Main documentation
- `QUICKSTART.md` - Setup guide
- Inline code comments
- TypeScript docstrings for complex functions

Example:
```typescript
/**
 * Analyzes resume text using local LLM
 * @param text - Extracted text from PDF
 * @returns Promise<ResumeAnalysis> - Analysis results
 * @throws Error if LLM service is unavailable
 */
export async function analyzeWithLLM(text: string) {
  // Implementation
}
```

## 🔍 Areas for Contribution

### High Priority
- [ ] Job description matching algorithm
- [ ] ATS keyword optimization
- [ ] Resume template suggestions
- [ ] Export to Word/PDF functionality
- [ ] Email notifications

### Medium Priority
- [ ] Multi-language support
- [ ] LinkedIn integration
- [ ] Advanced analytics dashboard
- [ ] A/B testing for resume versions
- [ ] Mobile app (React Native)

### Nice to Have
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Drag-and-drop file reordering
- [ ] Social sharing of scores
- [ ] Gamification (badges, achievements)

## 💬 Communication

- Be respectful and constructive
- Help newcomers
- Discuss major changes before implementing
- Tag maintainers for urgent issues

## 🎯 Review Process

1. Maintainer reviews code quality
2. Tests are verified
3. Documentation is checked
4. Merge approval from 1+ maintainers
5. PR is merged

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Added to contributors page (future feature)

## Questions?

Feel free to open an issue with `[QUESTION]` prefix or reach out to maintainers.

---

**Thank you for contributing! 🎉**

Your contributions make this project better for everyone.
