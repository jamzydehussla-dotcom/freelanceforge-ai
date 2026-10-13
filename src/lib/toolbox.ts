export type ToolTier = "free" | "elite" | "pro" | "legend";
export type ToolStatus = "live" | "soon";

export type Tool = {
  name: string;
  description: string;
  group: string;
  href?: string;
  tier: ToolTier;
  status: ToolStatus;
};

export const TOOL_GROUPS = [
  "Opportunity Intelligence",
  "Application & Proposal",
  "AI Career Intelligence",
  "Freelance Business",
  "Productivity & Workspace",
  "Creative & Growth",
];

export const TOOLS: Tool[] = [
  { name: "CV Tailor", description: "Tailor your CV to any opportunity with real AI.", group: "Workspace", href: "/cv-tailor", tier: "free", status: "live" },
  { name: "FORGE Memory", description: "Facts FORGE remembers about how you work.", group: "Workspace", href: "/memory", tier: "free", status: "live" },
  { name: "Profile", description: "Your professional identity — feeds every feature.", group: "Workspace", href: "/profile", tier: "free", status: "live" },
  { name: "Opportunities", description: "Your saved opportunity vault with signal extraction.", group: "Opportunity Intelligence", href: "/opportunities", tier: "elite", status: "live" },
  { name: "FORGE Matching", description: "See how well each opportunity fits you.", group: "Opportunity Intelligence", href: "/matching", tier: "pro", status: "live" },
  { name: "Analysis", description: "Pursue, consider, or skip — with reasoning.", group: "Opportunity Intelligence", href: "/analysis", tier: "pro", status: "live" },
  { name: "Alerts", description: "Stay informed. Stay in control.", group: "Opportunity Intelligence", href: "/alerts", tier: "elite", status: "live" },
  { name: "Opportunity Radar", description: "Automatic discovery across platforms.", group: "Opportunity Intelligence", tier: "pro", status: "soon" },
  { name: "Opportunity Autopilot", description: "Find, evaluate, prepare, and assist — automated.", group: "Opportunity Intelligence", tier: "legend", status: "soon" },
  { name: "Opportunity War Room", description: "A strategic workspace for high-value opportunities.", group: "Opportunity Intelligence", tier: "legend", status: "soon" },
  { name: "Proposal Studio", description: "Write stronger proposals, tailored to each client.", group: "Application & Proposal", tier: "pro", status: "soon" },
  { name: "Application Tracker", description: "Track every application through its stages.", group: "Application & Proposal", tier: "pro", status: "soon" },
  { name: "Profile Optimizer", description: "Strengthen how you present yourself.", group: "Application & Proposal", tier: "pro", status: "soon" },
  { name: "SOW & Contract Forge", description: "Turn discovery calls into clear contracts.", group: "Application & Proposal", tier: "legend", status: "soon" },
  { name: "Career Analytics", description: "Understand your patterns and progress.", group: "AI Career Intelligence", tier: "pro", status: "soon" },
  { name: "Career Strategy", description: "Long-term direction based on your real data.", group: "AI Career Intelligence", tier: "legend", status: "soon" },
  { name: "Skills Gap Analyzer", description: "See what to build next for the roles you want.", group: "AI Career Intelligence", tier: "legend", status: "soon" },
  { name: "Pricing Calculator", description: "Price your work with clarity.", group: "Freelance Business", tier: "pro", status: "soon" },
  { name: "Income Planner", description: "Plan revenue and track progress.", group: "Freelance Business", tier: "pro", status: "soon" },
  { name: "Project Manager", description: "Manage active client work.", group: "Freelance Business", tier: "pro", status: "soon" },
  { name: "Client Workspace", description: "A dedicated space for each client.", group: "Freelance Business", tier: "pro", status: "soon" },
  { name: "AI Workspace", description: "A single space for everything FORGE generates.", group: "Productivity & Workspace", tier: "pro", status: "soon" },
  { name: "Knowledge Library", description: "Store references, notes, and reusable content.", group: "Productivity & Workspace", tier: "pro", status: "soon" },
  { name: "Smart Scheduler", description: "Scheduling that respects your boundaries.", group: "Productivity & Workspace", tier: "pro", status: "soon" },
  { name: "Document Vault", description: "Secure storage for your professional documents.", group: "Productivity & Workspace", tier: "pro", status: "soon" },
  { name: "Shadow Portfolio", description: "A per-client landing page built around your best work.", group: "Creative & Growth", tier: "legend", status: "soon" },
  { name: "Interview Prep", description: "Practice interviews tailored to the opportunity.", group: "Creative & Growth", tier: "legend", status: "soon" },
  { name: "Email Triage", description: "Freelance-aware inbox management.", group: "Creative & Growth", tier: "legend", status: "soon" },
  { name: "Audio AI", description: "Listen to FORGE reading its insights aloud.", group: "Creative & Growth", tier: "legend", status: "soon" },
];

export const TIER_ORDER: Record<string, number> = {
  free: 0, elite: 1, pro: 2, legend: 3, owner: 4,
};

export function userHasAccess(userTier: string, toolTier: ToolTier): boolean {
  return (TIER_ORDER[userTier] ?? 0) >= (TIER_ORDER[toolTier] ?? 0);
}
