export type Tier = "free" | "elite" | "pro" | "legend" | "owner";

export type Feature =
  | "diagnose"
  | "extract"
  | "refine"
  | "export"
  | "opportunities"
  | "alerts"
  | "matching"
  | "analysis"
  | "proposals"
  | "tracker"
  | "profileOptimizer"
  | "careerStrategy"
  | "skillsGap"
  | "autopilot"
  | "warRoom";

export type TierDefinition = {
  label: string;
  priceUsd: number;
  features: Feature[];
  limits: Partial<Record<Feature, number>>;
  cvsAttribution: boolean;
};

export const TIERS: Record<Tier, TierDefinition> = {
  free: {
    label: "Free",
    priceUsd: 0,
    features: ["diagnose", "extract", "refine", "export"],
    limits: { diagnose: 3, extract: 3, refine: 2, export: 1 },
    cvsAttribution: true,
  },
  elite: {
    label: "Elite",
    priceUsd: 19,
    features: ["diagnose", "extract", "refine", "export", "opportunities", "alerts"],
    limits: { diagnose: 20, extract: 20, refine: 15, export: 5, alerts: 20 },
    cvsAttribution: false,
  },
  pro: {
    label: "Pro",
    priceUsd: 39,
    features: ["diagnose", "extract", "refine", "export", "opportunities", "alerts", "matching", "analysis", "proposals", "tracker", "profileOptimizer"],
    limits: { diagnose: 60, extract: 60, refine: 50, export: 15, alerts: 100, proposals: 10, matching: 30 },
    cvsAttribution: false,
  },
  legend: {
    label: "Legend",
    priceUsd: 79,
    features: ["diagnose", "extract", "refine", "export", "opportunities", "alerts", "matching", "analysis", "proposals", "tracker", "profileOptimizer", "careerStrategy", "skillsGap", "autopilot", "warRoom"],
    limits: {},
    cvsAttribution: false,
  },
  owner: {
    label: "Owner",
    priceUsd: 0,
    features: ["diagnose", "extract", "refine", "export", "opportunities", "alerts", "matching", "analysis", "proposals", "tracker", "profileOptimizer", "careerStrategy", "skillsGap", "autopilot", "warRoom"],
    limits: {},
    cvsAttribution: false,
  },
};

// Rule: features added AFTER this list defaults to Pro + Legend only.
// When you add a new feature, add it to pro.features and legend.features first.
// Trickle down to elite/free only when you decide to.

export function getTier(plan: string | null | undefined, role: string | null | undefined): Tier {
  if (role === "owner") return "owner";
  if (plan === "elite" || plan === "pro" || plan === "legend") return plan;
  return "free";
}
