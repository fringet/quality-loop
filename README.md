# The Quality Loop

> **Making Spec Quality Compound** — A self-improving QA system designed for Lovie's AI-first building workflow.

## 🎯 The Vision

This demo presents **The Quality Loop**—the missing connector in Lovie's ecosystem that transforms a linear build pipeline into a self-improving cycle. Every spec contributes to organizational knowledge. Every run generates learnings that make the next spec better.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## What Is This?

The Quality Loop is a system that transforms Lovie's linear build pipeline into a self-improving cycle:

```
Spec → Build → Review → Deploy → Quality Loop → (back to) Spec
                                       ↓
                         ┌─────────────────────────┐
                         │  • Scorecard Engine     │
                         │  • Pattern Harvester    │
                         │  • Feedback Loop        │
                         └─────────────────────────┘
```

### The Problem It Solves
- Learning stays in individual builders' heads
- No way to reuse successful spec patterns
- Culture constraint violations go undetected
- Spec quality is subjective, not measurable

### The Solution
- Every run generates a **Scorecard** with traceable rationale
- High-scoring specs are harvested into **Gold Standards**
- Systemic issues surface in **Organizational Insights**
- Culture constraints become machine-checkable

## Features

- **Interactive Walkthrough** - Auto-opens on first visit to guide users through the concept
- **Live Demo** - Explore sample specs with full scorecards and culture violations
- **Pattern Library** - Reusable Gold Standards extracted from high-scoring specs
- **Insights Dashboard** - Organizational patterns and systemic issues
- **Responsive Design** - Mobile-friendly with smooth animations

## Project Structure

```
quality-loop/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── system-flow/
│   │   └── page.tsx                # Interactive system diagram
│   └── demo/
│       ├── page.tsx                # Demo hub dashboard
│       ├── specs/
│       │   ├── page.tsx            # Spec ledger
│       │   └── [id]/page.tsx       # Spec detail
│       ├── gold-standards/
│       │   └── page.tsx            # Gold Standards library
│       ├── insights/
│       │   └── page.tsx            # Organizational insights
│       └── culture-constraints/
│           └── page.tsx            # Culture rules reference
├── components/
│   ├── ui/                         # Reusable UI components
│   ├── nav.tsx                     # Navigation
│   └── walkthrough.tsx             # Interactive tour component
├── data/                           # Mock data (JSON)
│   ├── specs.json
│   ├── gold-standards.json
│   ├── culture-constraints.json
│   └── insights.json
└── lib/
    └── utils.ts                    # Helper functions
```

## Pages Overview

| Page | Description |
|------|-------------|
| `/` | Landing page with value proposition |
| `/system-flow` | Interactive diagram showing where Quality Loop fits |
| `/demo` | Dashboard with key metrics |
| `/demo/specs` | List of all specs with scores and filters |
| `/demo/specs/[id]` | Deep dive into scorecard, runs, and deltas |
| `/demo/gold-standards` | Reusable pattern library |
| `/demo/insights` | Organizational patterns and trends |
| `/demo/culture-constraints` | Culture rules the system checks against |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Data**: Static JSON (mock data)

## Mock Data

The demo includes 5 sample specs with varying quality scores:

| Spec | Score | Status |
|------|-------|--------|
| User Onboarding Flow | 94 | Gold Standard |
| Search Feature | 91 | Gold Standard |
| Dashboard Analytics | 85 | Good |
| Payment Integration | 78 | Needs Work |
| Notification System | 62 | Needs Attention |

## Lovie Culture Constraints

The system checks specs against these principles from the Lovie Culture Manifesto:

- **ASYNC_FIRST** - No required synchronous meetings
- **SEARCH_FIRST** - Information findable via search
- **MANAGER_OF_ONE** - Specs enable autonomy
- **CENTRALIZED_KNOWLEDGE** - Single source of truth
- **TRANSPARENT_WORKFLOWS** - Work visible to all

## Deployment

Deploy to Vercel with one click, or manually:

```bash
npm run build
npm start
```

## License

MIT

---

**Built by Ozan Özgöçer** — Designed with Lovie's vision in mind.
