// lib/constants.ts
import { Briefcase, BarChart2, Zap, TrendingUp } from "lucide-react";
import { c } from "./theme";

export const features = [
  {
    Icon: Briefcase,
    color: c.indigo,
    title: "Visual Kanban Board",
    desc: "Drag applications through 6 pipeline stages — Saved, Applied, OA, Interview, Offer — on a board purpose-built for job seekers.",
  },
  {
    Icon: BarChart2,
    color: c.cyan,
    title: "Smart Analytics",
    desc: "Response rate, interview conversion, salary distribution, and weekly activity — all rendered in beautiful interactive charts.",
  },
  {
    Icon: Zap,
    color: c.violet,
    title: "Real-time Sync",
    desc: "Socket.io powered live updates. Share your board with a mentor and watch changes appear instantly, no refresh needed.",
  },
  {
    Icon: TrendingUp,
    color: c.emerald,
    title: "Progress Insights",
    desc: "Identify which roles and companies move fastest in your pipeline. Know exactly when to follow up.",
  },
];

export const mockCards = [
  {
    co: "Google",
    role: "SWE Intern",
    i: "G",
    ic: "#4285F4",
    stage: "Applied",
    sc: c.indigo,
    sbg: "rgba(129,140,248,.12)",
    sbc: "rgba(129,140,248,.28)",
  },
  {
    co: "Stripe",
    role: "Frontend Eng",
    i: "S",
    ic: "#635BFF",
    stage: "Interview",
    sc: c.orange,
    sbg: "rgba(251,146,60,.12)",
    sbc: "rgba(251,146,60,.28)",
  },
  {
    co: "Linear",
    role: "Software Eng",
    i: "L",
    ic: c.violet,
    stage: "Offer ✓",
    sc: c.emerald,
    sbg: "rgba(52,211,153,.12)",
    sbc: "rgba(52,211,153,.28)",
  },
  {
    co: "Meta",
    role: "Product Analyst",
    i: "M",
    ic: "#0082FB",
    stage: "Applied",
    sc: c.indigo,
    sbg: "rgba(129,140,248,.12)",
    sbc: "rgba(129,140,248,.28)",
  },
  {
    co: "Vercel",
    role: "DevRel",
    i: "V",
    ic: "#e2e8f0",
    stage: "OA Round",
    sc: c.amber,
    sbg: "rgba(251,191,36,.12)",
    sbc: "rgba(251,191,36,.28)",
  },
  {
    co: "Anthropic",
    role: "SWE Intern",
    i: "A",
    ic: c.orange,
    stage: "Interview",
    sc: c.orange,
    sbg: "rgba(251,146,60,.12)",
    sbc: "rgba(251,146,60,.28)",
  },
];

export const stages = [
  {
    label: "Saved",
    color: "#94a3b8",
    bg: "rgba(148,163,184,.1)",
    border: "rgba(148,163,184,.2)",
  },
  {
    label: "Applied",
    color: c.indigo,
    bg: "rgba(129,140,248,.1)",
    border: "rgba(129,140,248,.22)",
  },
  {
    label: "OA",
    color: c.amber,
    bg: "rgba(251,191,36,.1)",
    border: "rgba(251,191,36,.22)",
  },
  {
    label: "Interview",
    color: c.orange,
    bg: "rgba(251,146,60,.1)",
    border: "rgba(251,146,60,.22)",
  },
  {
    label: "Offer",
    color: c.emerald,
    bg: "rgba(52,211,153,.1)",
    border: "rgba(52,211,153,.22)",
  },
  {
    label: "Rejected",
    color: c.rose,
    bg: "rgba(248,113,113,.1)",
    border: "rgba(248,113,113,.2)",
  },
];

export const stats = [
  { value: "2.4k+", label: "Job Seekers" },
  { value: "60ms", label: "Avg. Load" },
  { value: "98.9%", label: "Uptime" },
  { value: "4.9★", label: "Rating" },
];

export const steps = [
  {
    n: "01",
    title: "Add applications",
    desc: "Import from LinkedIn or add manually. Takes under 10 seconds per application.",
  },
  {
    n: "02",
    title: "Track every stage",
    desc: "Move cards through your pipeline. Add notes, salary, links, and interview dates.",
  },
  {
    n: "03",
    title: "Analyze & improve",
    desc: "Spot patterns and double down on what's driving callbacks and offers.",
  },
];

export const perks = [
  "Free to start",
  "6 pipeline stages",
  "Real-time sync",
  "Export anytime",
];
