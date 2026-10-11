export type OppStatus = "new" | "considering" | "applied" | "won" | "skipped";

export type Opportunity = {
  id: string;
  user_id: string;
  role: string | null;
  company: string | null;
  client_name: string | null;
  source: string | null;
  source_url: string | null;
  category: string | null;
  work_type: string | null;
  experience_level: string | null;
  budget_min: number | null;
  budget_max: number | null;
  budget_currency: string | null;
  posted_date: string | null;
  deadline: string | null;
  description: string | null;
  key_requirements: string | null;
  notes: string | null;
  status: string;
  signals: any;
  created_at: string;
  updated_at: string;
};

export type SignalData = {
  coreSkills: string[];
  keywords: string[];
  responsibilities: string[];
  prioritySignals: string[];
};

export const SOURCES = ["Upwork", "Fiverr", "LinkedIn", "Freelancer", "Direct", "Other"];
export const WORK_TYPES = ["Remote", "Contract", "Part-time", "Full-time"];
export const BUDGET_BUCKETS = [
  { label: "Under $100", min: 0, max: 99 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000+", min: 1000, max: 99999999 },
];
export const STATUSES: { key: OppStatus; label: string; chip: string }[] = [
  { key: "new", label: "New", chip: "text-cyan-300 border-cyan-400/40 bg-cyan-400/5" },
  { key: "considering", label: "Considering", chip: "text-violet-300 border-violet-400/40 bg-violet-400/5" },
  { key: "applied", label: "Applied", chip: "text-amber-300 border-amber-400/40 bg-amber-400/5" },
  { key: "won", label: "Won", chip: "text-emerald-300 border-emerald-400/40 bg-emerald-400/5" },
  { key: "skipped", label: "Skipped", chip: "text-violet-200/40 border-violet-500/20 bg-white/[0.02]" },
];

export const EMPTY_FORM = {
  role: "",
  company: "",
  client_name: "",
  source: "",
  source_url: "",
  category: "",
  work_type: "",
  experience_level: "",
  budget_min: "",
  budget_max: "",
  budget_currency: "USD",
  posted_date: "",
  deadline: "",
  description: "",
  key_requirements: "",
  notes: "",
  status: "new" as OppStatus,
};
