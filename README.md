# Sara Haider — Developer Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge/deploy-status)](https://app.netlify.com/sites/amazing-marigold-2e7377/deploys)

## 🚀 Live Demo

**[https://amazing-marigold-2e7377.netlify.app](https://amazing-marigold-2e7377.netlify.app)**

---

## 📖 About

### What Problem Does It Solve?

Static portfolios don't answer visitor questions. Recruiters want to know: *"What exactly did you build? What tech did you use? What was your role?"* This portfolio lets them ask those questions directly and get instant, contextual answers.

### Who Is It For?

- **Recruiters** evaluating Flutter development skills
- **Developers** looking for project inspiration
- **Anyone** wanting to learn about Sara's work

### Why This Idea?

A portfolio that only shows screenshots is a showcase. A portfolio that answers questions is a **conversation**. This approach lets the visitor drive the experience and find exactly what they care about.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Shader Hero** | Custom GLSL fragment shader with mouse interaction |
| 🤖 **AI Chat** | Claude API-powered assistant for portfolio questions |
| 🎮 **3D Configurator** | Interactive robot with React Three Fiber |
| 📱 **Mobile-First** | Fully responsive across all devices |
| ♿ **Accessible** | WCAG 2.1 AA compliant (95/100) |
| 🔒 **Rate Limited** | 10 requests/minute to prevent API abuse |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| Tailwind CSS | Styling |
| React Three Fiber | 3D rendering |
| Three.js | 3D library |
| Claude API | AI chat assistant |
| Netlify | Hosting |

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key ([get one free](https://console.anthropic.com))

### Setup

```bash
# Clone the repository
git clone https://github.com/haidersara/flyrank-frontend-capstone.git

# Navigate to project
cd flyrank-frontend-capstone

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | **Yes** | Claude API key from console.anthropic.com |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL (for metadata) |

### Running Locally

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture

```
app/
├── layout.tsx          # Root layout with Nav/Footer
├── page.tsx            # Home with shader hero
├── chat/
│   └── page.tsx        # AI chat interface
├── 3d/
│   └── page.tsx        # 3D configurator
├── work/               # Case study pages
└── api/chat/
    └── route.ts        # Claude API proxy + rate limiting

components/
├── ShaderHero.tsx      # GLSL fragment shader
├── ThreeScene.tsx      # 3D robot configurator
├── Chat.tsx            # Chat interface with error handling
├── Nav.tsx             # Navigation
└── Footer.tsx          # Footer

lib/
├── ai/tools.ts         # searchProjects tool definition
└── data/projects.ts    # Case study data

public/                 # Static assets
```

---

## 🤖 AI Integration

### Chat Assistant

The chat at `/chat` uses Claude 3.5 Sonnet via the Anthropic API.

| Aspect | Detail |
|--------|--------|
| **Model** | Claude 3.5 Sonnet |
| **Purpose** | Answers questions about portfolio projects |
| **System Prompt** | Tuned for professional portfolio context |
| **Rate Limiting** | 10 requests per minute per IP |
| **maxDuration** | 30 seconds |

### Tool: `searchProjects`

The model has one server-side tool for querying case study data:

| Property | Value |
|----------|-------|
| **Name** | `searchProjects` |
| **When Called** | User asks about a specific project or tech |
| **Input** | `{ query: string }` |
| **Returns** | Matching projects with slug, name, status, summary, stack |

### How AI Tools Built This

| Feature | AI Usage |
|---------|----------|
| **Shader GLSL** | Claude helped write fragment shader with explanations |
| **3D Scene** | React Three Fiber boilerplate from AI |
| **Chat Integration** | AI SDK patterns from documentation |
| **Accessibility** | AI suggested fixes based on audit |
| **Tests** | AI generated test patterns |

### Prompting Strategy

- Iterative refinement with specific constraints
- AI used as **pair programmer**, not code generator
- All AI output manually verified and tested

---

## ♿ Accessibility

- ✅ WCAG 2.1 AA compliant (95/100)
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ `prefers-reduced-motion` support
- ✅ Skip-to-content link
- ✅ Proper ARIA labels
- ✅ Visible focus indicators

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| Performance | 73 |
| Accessibility | 95 |
| Best Practices | 100 |
| SEO | 100 |

[Full Audit Report](AUDIT.md)

---

## 🚀 Deployment

### Netlify

1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Set environment variables:
   - `ANTHROPIC_API_KEY`
4. Deploy

### Rollback Plan

- **Netlify**: Use deploy history to revert to any previous deployment
- **Git**: `git revert <commit>` and redeploy

### Monitoring

- Netlify Analytics for traffic
- Console logs for errors
- Rate limiting logs via headers

---

## 🔒 Security & Production Hygiene

| Measure | Implementation |
|---------|----------------|
| **Rate Limiting** | 10 requests/minute per IP (in-memory) |
| **Input Length** | 2000 character limit |
| **API Key** | Stored in environment variables |
| **maxDuration** | 30 seconds on streaming handlers |
| **HTTPS** | Enforced via Netlify |

---

## 🔧 Known Limitations & Future Improvements

### Current Limitations

- Rate limiting is in-memory (resets on deploy)
- No persistent chat history
- No user authentication

### Future Improvements

- Redis-based rate limiting for persistence
- Chat history storage
- User accounts for saved conversations
- More 3D models in configurator
- Dark/light mode toggle

---

## 📄 License

MIT

## 👤 Author

**Sara Haider**
- GitHub: [@haidersara](https://github.com/haidersara)
- LinkedIn: [Sara Haider](https://linkedin.com/in/sara-haider)
- Email: haidersara456@gmail.com

---

## 🙏 Acknowledgments

- FlyRank AI Internship program
- Anthropic for Claude API
- React Three Fiber community