export type DiagnoseCategory = { score: number; reasoning: string };
export type DiagnoseResult = {
  categories: {
    roleAlignment: DiagnoseCategory;
    experienceEvidence: DiagnoseCategory;
    skillsAlignment: DiagnoseCategory;
    evidenceImpact: DiagnoseCategory;
    professionalPositioning: DiagnoseCategory;
  };
  areas: {
    strongestEvidence: string[];
    missingEvidence: string[];
    positioningOpportunities: string[];
    refinementPriorities: string[];
  };
};

const CATEGORY_KEYS = ["roleAlignment","experienceEvidence","skillsAlignment","evidenceImpact","professionalPositioning"] as const;
const AREA_KEYS = ["strongestEvidence","missingEvidence","positioningOpportunities","refinementPriorities"] as const;

function stripFences(text: string): string {
  const t = text.trim();
  const m = t.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return m ? m[1].trim() : t;
}

export function parseDiagnose(text: string): { ok: true; data: DiagnoseResult } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stripFences(text));
  } catch {
    return { ok: false, error: "FORGE returned invalid JSON." };
  }

  if (!parsed || typeof parsed !== "object") return { ok: false, error: "Unexpected response shape." };
  const obj = parsed as Record<string, unknown>;
  const cats = obj.categories as Record<string, unknown> | undefined;
  const areas = obj.areas as Record<string, unknown> | undefined;
  if (!cats || !areas) return { ok: false, error: "Missing categories or areas." };

  const outCats: Record<string, DiagnoseCategory> = {};
  for (const k of CATEGORY_KEYS) {
    const v = cats[k] as Record<string, unknown> | undefined;
    if (!v || typeof v.score !== "number" || typeof v.reasoning !== "string") {
      return { ok: false, error: "Invalid category: " + k };
    }
    outCats[k] = { score: Math.max(0, Math.min(100, Math.round(v.score))), reasoning: v.reasoning };
  }

  const outAreas: Record<string, string[]> = {};
  for (const k of AREA_KEYS) {
    const v = areas[k];
    if (!Array.isArray(v) || !v.every((x) => typeof x === "string")) {
      return { ok: false, error: "Invalid area: " + k };
    }
    outAreas[k] = v as string[];
  }

  return {
    ok: true,
    data: {
      categories: outCats as DiagnoseResult["categories"],
      areas: outAreas as DiagnoseResult["areas"],
    },
  };
}


export type ExtractResult = {
  coreSkills: string[];
  keywords: string[];
  responsibilities: string[];
  prioritySignals: string[];
};

const EXTRACT_KEYS = ["coreSkills", "keywords", "responsibilities", "prioritySignals"] as const;

export function parseExtract(text: string): { ok: true; data: ExtractResult } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stripFences(text));
  } catch {
    return { ok: false, error: "FORGE returned invalid JSON." };
  }

  if (!parsed || typeof parsed !== "object") return { ok: false, error: "Unexpected response shape." };
  const obj = parsed as Record<string, unknown>;

  const out: Record<string, string[]> = {};
  for (const k of EXTRACT_KEYS) {
    const v = obj[k];
    if (!Array.isArray(v) || !v.every((x) => typeof x === "string")) {
      return { ok: false, error: "Invalid or missing field: " + k };
    }
    out[k] = (v as string[]).slice(0, 12);
  }

  return { ok: true, data: out as ExtractResult };
}


export type RefinedExperience = {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
};

export type RefinedEducation = {
  institution: string;
  degree: string;
  year: string;
};

export type RefineResult = {
  refinedSummary: string;
  refinedExperience: RefinedExperience[];
  refinedSkills: string[];
  refinedEducation: RefinedEducation[];
  refinedAdditional: string[];
  keyChanges: string[];
};

export function parseRefine(text: string): { ok: true; data: RefineResult } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stripFences(text));
  } catch {
    return { ok: false, error: "FORGE returned invalid JSON." };
  }

  if (!parsed || typeof parsed !== "object") return { ok: false, error: "Unexpected response shape." };
  const obj = parsed as Record<string, unknown>;

  if (typeof obj.refinedSummary !== "string") return { ok: false, error: "Missing refinedSummary." };

  if (!Array.isArray(obj.refinedExperience)) return { ok: false, error: "Missing refinedExperience." };
  const exp: RefinedExperience[] = [];
  for (const item of obj.refinedExperience as unknown[]) {
    if (!item || typeof item !== "object") return { ok: false, error: "Invalid experience entry." };
    const it = item as Record<string, unknown>;
    if (typeof it.title !== "string" || typeof it.company !== "string" || typeof it.dates !== "string") {
      return { ok: false, error: "Experience entry missing title, company or dates." };
    }
    if (!Array.isArray(it.bullets) || !(it.bullets as unknown[]).every((b) => typeof b === "string")) {
      return { ok: false, error: "Experience entry bullets invalid." };
    }
    exp.push({
      title: it.title,
      company: it.company,
      dates: it.dates,
      bullets: it.bullets as string[],
    });
  }

  if (!Array.isArray(obj.refinedSkills) || !(obj.refinedSkills as unknown[]).every((s) => typeof s === "string")) {
    return { ok: false, error: "refinedSkills invalid." };
  }

  const edu: RefinedEducation[] = [];
  if (Array.isArray(obj.refinedEducation)) {
    for (const item of obj.refinedEducation as unknown[]) {
      if (!item || typeof item !== "object") continue;
      const it = item as Record<string, unknown>;
      if (typeof it.institution !== "string" || typeof it.degree !== "string") continue;
      edu.push({ institution: it.institution, degree: it.degree, year: typeof it.year === "string" ? it.year : "" });
    }
  }
  const additional: string[] = Array.isArray(obj.refinedAdditional) ? (obj.refinedAdditional as unknown[]).filter((s) => typeof s === "string") as string[] : [];

  if (!Array.isArray(obj.keyChanges) || !(obj.keyChanges as unknown[]).every((s) => typeof s === "string")) {
    return { ok: false, error: "keyChanges invalid." };
  }

  return {
    ok: true,
    data: {
      refinedSummary: obj.refinedSummary,
      refinedExperience: exp,
      refinedSkills: obj.refinedSkills as string[],
      refinedEducation: edu,
      refinedAdditional: additional,
      keyChanges: (obj.keyChanges as string[]).slice(0, 8),
    },
  };
}
