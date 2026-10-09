type DiagnoseInput = {
  cvText: string;
  role: string;
  company: string;
  industry: string;
  seniority: string;
  employmentType: string;
  workArrangement: string;
  keyRequirements: string;
  jobDescription: string;
};

export function buildDiagnosePrompt(input: DiagnoseInput): string {
  const p: string[] = [];
  p.push("You are FORGE, the AI of the FORGE ecosystem. Assess a CV against a target opportunity.");
  p.push("");
  p.push("Rules you must follow strictly:");
  p.push("- Reference only what appears in the CV text or the target opportunity below.");
  p.push("- Never invent employers, job titles, degrees, certifications, skills, or achievements.");
  p.push("- If information is missing, say so. Do not fill it in.");
  p.push("- Be specific and honest. If the CV is weak for the target, say so clearly.");
  p.push("- Return only valid JSON. No commentary. No markdown fences.");
  p.push("");
  p.push("CV TEXT:");
  p.push("---");
  p.push(input.cvText || "(no CV text provided)");
  p.push("---");
  p.push("");
  p.push("TARGET:");
  p.push("Role: " + (input.role || "(not provided)"));
  p.push("Company: " + (input.company || "(not provided)"));
  p.push("Industry: " + (input.industry || "(not provided)"));
  p.push("Seniority: " + (input.seniority || "(not provided)"));
  p.push("Employment type: " + (input.employmentType || "(not provided)"));
  p.push("Work arrangement: " + (input.workArrangement || "(not provided)"));
  p.push("Key requirements: " + (input.keyRequirements || "(not provided)"));
  p.push("Job description: " + (input.jobDescription || "(not provided)"));
  p.push("");
  p.push("Return ONLY valid JSON with this exact structure:");
  p.push("");
  p.push("A top-level object with two keys: categories and areas.");
  p.push("");
  p.push("categories is an object with exactly these keys, each an object with score (integer 0-100) and reasoning (one short sentence):");
  p.push("- roleAlignment");
  p.push("- experienceEvidence");
  p.push("- skillsAlignment");
  p.push("- evidenceImpact");
  p.push("- professionalPositioning");
  p.push("");
  p.push("areas is an object with exactly these keys, each an array of 2-4 short bullet strings:");
  p.push("- strongestEvidence");
  p.push("- missingEvidence");
  p.push("- positioningOpportunities");
  p.push("- refinementPriorities");
  return p.join("\n");
}


type ExtractInput = {
  role: string;
  company: string;
  industry: string;
  seniority: string;
  employmentType: string;
  workArrangement: string;
  keyRequirements: string;
  jobDescription: string;
};

export function buildExtractPrompt(input: ExtractInput): string {
  const p: string[] = [];
  p.push("You are FORGE, the AI of the FORGE ecosystem. Extract structured signals from a job opportunity.");
  p.push("");
  p.push("Rules you must follow strictly:");
  p.push("- Reference only what appears in the opportunity text below.");
  p.push("- Never invent skills, keywords, responsibilities, or priorities that are not implied by the text.");
  p.push("- If a section is thin or missing, return fewer items rather than making things up.");
  p.push("- Keep each item short: 1 to 5 words. No full sentences.");
  p.push("- Return only valid JSON. No commentary. No markdown fences.");
  p.push("");
  p.push("OPPORTUNITY:");
  p.push("Role: " + (input.role || "(not provided)"));
  p.push("Company: " + (input.company || "(not provided)"));
  p.push("Industry: " + (input.industry || "(not provided)"));
  p.push("Seniority: " + (input.seniority || "(not provided)"));
  p.push("Employment type: " + (input.employmentType || "(not provided)"));
  p.push("Work arrangement: " + (input.workArrangement || "(not provided)"));
  p.push("");
  p.push("Key requirements:");
  p.push(input.keyRequirements || "(not provided)");
  p.push("");
  p.push("Job description:");
  p.push(input.jobDescription || "(not provided)");
  p.push("");
  p.push("Return ONLY valid JSON with exactly these four keys, each an array of short strings:");
  p.push("- coreSkills: the specific skills the opportunity requires (3-10 items)");
  p.push("- keywords: exact terms and phrases the opportunity uses (3-10 items)");
  p.push("- responsibilities: what the role actually involves (2-8 items)");
  p.push("- prioritySignals: what the opportunity emphasises most (2-6 items)");
  return p.join("\n");
}


type RefineInput = {
  cvText: string;
  role: string;
  company: string;
  industry: string;
  seniority: string;
  keyRequirements: string;
  jobDescription: string;
  intents: string[];
  feedback?: string;
};

export function buildRefinePrompt(input: RefineInput): string {
  const p: string[] = [];
  p.push("You are FORGE, the AI of the FORGE ecosystem. Refine a CV against a target opportunity.");
  p.push("");
  p.push("CRITICAL RULES - never break these:");
  p.push("- Never invent employers, job titles, dates, degrees, skills, certifications, or achievements.");
  p.push("- Every fact in your output must exist in the original CV text.");
  p.push("- You may rewrite wording, sharpen bullets, reorder items, and emphasise what is relevant.");
  p.push("- You may NOT add anything that is not already present.");
  p.push("- If the CV lacks quantified results, do not fabricate numbers. Work with what is there.");
  p.push("- Return only valid JSON. No commentary. No markdown fences.");
  p.push("");
  p.push("ORIGINAL CV TEXT:");
  p.push("---");
  p.push(input.cvText || "(no CV text provided)");
  p.push("---");
  p.push("");
  p.push("TARGET OPPORTUNITY:");
  p.push("Role: " + (input.role || "(not provided)"));
  p.push("Company: " + (input.company || "(not provided)"));
  p.push("Industry: " + (input.industry || "(not provided)"));
  p.push("Seniority: " + (input.seniority || "(not provided)"));
  p.push("Key requirements: " + (input.keyRequirements || "(not provided)"));
  p.push("Job description: " + (input.jobDescription || "(not provided)"));
  p.push("");
  p.push("USER PRIORITIES (tailoring intent):");
  p.push(input.intents.length > 0 ? input.intents.join(", ") : "(none selected - use judgement)");
  p.push("");
  if (input.feedback && input.feedback.trim()) {
    p.push("USER FEEDBACK ON THE PREVIOUS REFINEMENT:");
    p.push(input.feedback.trim());
    p.push("Apply this feedback while respecting all the CRITICAL RULES above.");
    p.push("");
  }
  p.push("Return ONLY valid JSON with exactly these four keys:");
  p.push("");
  p.push("- refinedSummary: a rewritten Professional Summary (2-4 sentences), aligned to the target role");
  p.push("- refinedExperience: an array, one object per role in the original CV, each with:");
  p.push("  - title: the role title (unchanged from original)");
  p.push("  - company: the company name (unchanged from original)");
  p.push("  - dates: the dates (unchanged from original)");
  p.push("  - bullets: an array of rewritten bullet points (same facts, sharper language)");
  p.push("- refinedSkills: an array of the same skills from the CV, reordered by relevance to the target");
  p.push("- refinedEducation: an array, one object per education entry in the original CV, each with:");
  p.push("  - institution: the school or university name (unchanged from original)");
  p.push("  - degree: the degree or qualification (unchanged from original)");
  p.push("  - year: the year or date range (unchanged from original). If none is present, use empty string.");
  p.push("  - If the CV has no education section, return an empty array.");
  p.push("- refinedAdditional: an array of short strings covering anything else in the CV worth keeping (languages, certifications, awards, references). Reorganise and tidy, but do not invent. If nothing applies, return an empty array.");
  p.push("- keyChanges: an array of 3-5 short strings explaining what you changed and why");
  return p.join("\n");
}
