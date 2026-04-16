## What It Is

**ApplyArc** is a real-time, Kanban-style job application tracker built as a full-stack portfolio project. It solves a genuine pain point: job seekers managing dozens of applications across spreadsheets with no structure, no visibility, and no collaboration. ApplyArc gives you a visual board, rich application details, analytics, and live multi-user sync — all in one place.

---

## The Problem It Solves

Most job seekers track applications in Google Sheets or Notion — tools not built for this workflow. There's no drag-and-drop pipeline, no at-a-glance analytics, no real-time updates when you're collaborating with a career coach or partner. ApplyArc fills that gap.

---

## Tech Stack

| Layer            | Technology                                           |
| ---------------- | ---------------------------------------------------- |
| Framework        | Next.js 15 (App Router) + TypeScript                 |
| Styling          | Tailwind CSS + shadcn/ui                             |
| Auth             | Firebase Auth (Google OAuth, GitHub, Email/Password) |
| Database         | MongoDB + Mongoose                                   |
| State Management | Redux Toolkit                                        |
| Real-time        | Socket.io                                            |
| Drag & Drop      | @dnd-kit                                             |
| Analytics        | Recharts                                             |
| Caching          | Upstash Redis                                        |
| Deployment       | Vercel                                               |

---

## Core Features

**Authentication**

- Multi-provider login via Firebase Auth (Google, GitHub, email/password)
- Server-side JWT verification using Firebase Admin SDK — every API route is protected
- Clean session lifecycle: login → board, logout → resets Redux state and redirects

**Kanban Board**

- Drag-and-drop application cards across pipeline stages: _Saved → Applied → OA → Interview → Offer → Rejected_
- Powered by @dnd-kit for accessible, smooth DnD interactions
- Board state lives in Redux Toolkit for predictable updates

**Application Detail Modal**

- Click any card to open a full detail view built with shadcn Dialog
- Editable fields: company, role, stage, job URL, salary, location, notes
- Changes dispatch `updateApplication` and sync to MongoDB

**Analytics Dashboard**

- Visual breakdown of applications by stage using Recharts
- Helps users identify bottlenecks in their pipeline at a glance

**Real-time Collaboration**

- Socket.io enables live board updates across multiple connected clients
- Cards move in real-time for all users viewing the same board

**Performance & Caching**

- Upstash Redis caches `GET /api/applications` responses
- Cache is invalidated automatically on any create, update, or delete
- Graceful degradation — if Redis is unavailable, the app falls back to MongoDB without crashing

**Security**

- Firebase Admin SDK verifies JWTs server-side on every request — no trust placed in client-sent headers
- HTTP security headers configured
- Zod schema validation on all API inputs
- Upstash rate limiting to prevent API abuse

---

## Architecture Highlights Worth Mentioning

- **Next.js App Router** with file-based API routes (`/api/applications`, `/api/applications/[id]`)
- **MongoDB with global connection caching** to avoid cold-start connection overhead on Vercel's serverless functions
- **Redux Toolkit** manages all client-side board state; async thunks handle API calls with `authHeader()` injecting the Firebase JWT
- **Cache-aside pattern** on read: check Redis → miss → hit MongoDB → populate cache
- All user data in MongoDB is **scoped strictly by Firebase uid** — no cross-user data access possible

---

## What You Learned Building This

Since this is a portfolio project, it's worth being honest in the README about what was new:

- Firebase Auth (including Admin SDK for server-side verification)
- Redux Toolkit (state management at scale)
- Socket.io (WebSocket-based real-time sync)
- Upstash Redis (caching strategy and invalidation)
- Next.js 15 App Router patterns (async params, server components, route handlers)

---

## Project Structure (high level)

```
applyarc/
├── app/
│   ├── api/applications/        # REST API routes
│   ├── board/                   # Kanban board page
│   ├── analytics/               # Analytics dashboard
│   └── login/                   # Auth page
├── components/
│   ├── modals/ApplicationModal  # Detail view
│   ├── ui/                      # shadcn + custom components
│   └── KanbanBoard/             # Board + card components
├── lib/
│   ├── mongodb.ts               # DB connection
│   ├── redis.ts                 # Upstash client
│   ├── firebaseAdmin.ts         # Admin SDK setup
│   └── verifyToken.ts           # JWT verification helper
├── store/                       # Redux slices + thunks
└── models/                      # Mongoose schemas
```

---
