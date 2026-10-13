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


type MatchingInput = {
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

export function buildMatchingPrompt(input: MatchingInput): string {
  const p: string[] = [];
  p.push("You are FORGE, the AI of the FORGE ecosystem. Evaluate how well a CV matches a specific opportunity.");
  p.push("");
  p.push("CRITICAL RULES:");
  p.push("- Reference only what appears in the CV text or the opportunity below.");
  p.push("- Never invent skills, experience, or qualifications the CV does not contain.");
  p.push("- Be honest. If the CV is a weak match, say so with specific reasoning.");
  p.push("- Return only valid JSON. No commentary. No markdown fences.");
  p.push("");
  p.push("CV TEXT:");
  p.push("---");
  p.push(input.cvText || "(no CV text provided)");
  p.push("---");
  p.push("");
  p.push("OPPORTUNITY:");
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
  p.push("- overallScore: integer 0-100 representing overall match quality");
  p.push("- verdict: one of \"strong\", \"good\", \"moderate\", \"weak\"");
  p.push("- confidence: integer 0-100 representing how confident you are given the available information");
  p.push("- reasoning: 2-4 sentence explanation of the overall score");
  p.push("- factors: object with these keys, each { score: 0-100, weight: 1-10, reasoning: short string }:");
  p.push("  - skills");
  p.push("  - experience");
  p.push("  - seniority");
  p.push("  - industry");
  p.push("  - workType");
  p.push("  - positioning");
  p.push("- strengths: array of 3-6 short strings describing what makes this a good fit");
  p.push("- gaps: array of 2-6 short strings describing what is missing or weak");
  p.push("- recommendations: array of 3-6 objects, each { priority: \"high\"|\"medium\"|\"low\", action: short string }");
  return p.join("\n");
}


type AnalysisInput = {
  role: string;
  company: string;
  industry: string;
  seniority: string;
  employmentType: string;
  workArrangement: string;
  keyRequirements: string;
  jobDescription: string;
  budgetMin: string;
  budgetMax: string;
  budgetCurrency: string;
  deadline: string;
  matchScore: string;
};

export function buildAnalysisPrompt(input: AnalysisInput): string {
  const p: string[] = [];
  p.push("You are FORGE, the AI of the FORGE ecosystem. Decide whether a freelancer should pursue a specific opportunity.");
  p.push("");
  p.push("Your job is to make a clear recommendation: pursue, consider, or skip.");
  p.push("");
  p.push("CRITICAL RULES:");
  p.push("- Reference only what appears in the opportunity below.");
  p.push("- Never invent details about the client, budget, or scope.");
  p.push("- Be decisive. If evidence is thin, say so and recommend skipping or considering - not pursuing on hope.");
  p.push("- Return only valid JSON. No commentary. No markdown fences.");
  p.push("");
  p.push("OPPORTUNITY:");
  p.push("Role: " + (input.role || "(not provided)"));
  p.push("Company: " + (input.company || "(not provided)"));
  p.push("Industry: " + (input.industry || "(not provided)"));
  p.push("Seniority: " + (input.seniority || "(not provided)"));
  p.push("Employment type: " + (input.employmentType || "(not provided)"));
  p.push("Work arrangement: " + (input.workArrangement || "(not provided)"));
  p.push("Budget: " + (input.budgetMin || "?") + " - " + (input.budgetMax || "?") + " " + (input.budgetCurrency || "USD"));
  p.push("Deadline: " + (input.deadline || "(not provided)"));
  p.push("Match score (from prior FORGE matching): " + (input.matchScore || "(not run)"));
  p.push("Key requirements: " + (input.keyRequirements || "(not provided)"));
  p.push("Job description: " + (input.jobDescription || "(not provided)"));
  p.push("");
  p.push("Return ONLY valid JSON with this exact structure:");
  p.push("");
  p.push("- verdict: one of \"pursue\", \"consider\", \"skip\"");
  p.push("- confidence: integer 0-100 (how confident you are in this verdict)");
  p.push("- reasoning: 2-4 sentence explanation");
  p.push("- criteria: object with these keys, each { score: 0-100, reasoning: short string }:");
  p.push("  - opportunityQuality (is this a real, valuable opportunity?)");
  p.push("  - clientSignals (any warning signs about the client or posting?)");
  p.push("  - scopeClarity (is the scope clearly defined?)");
  p.push("  - riskLevel (higher score = lower risk)");
  p.push("  - effortVsReward (does the payoff justify the effort?)");
  p.push("  - strategicValue (does this advance long-term positioning?)");
  p.push("- greenFlags: array of 2-5 short strings");
  p.push("- redFlags: array of 0-5 short strings");
  p.push("- nextAction: one short, specific string advising the user on what to do next");
  return p.join("\n");
}


type ProposalInput = {
  role: string;
  company: string;
  brief: string;
  keyRequirements: string;
  cvText: string;
  memory: string;
  analysisReasoning: string;
  matchScore: string;
  tone: string;
  positioningAngle: string;
  length: string;
  emphasis: string;
  strengthTags: string;
  customNotes: string;
  feedback: string;
};

export function buildProposalPrompt(input: ProposalInput): string {
  const p: string[] = [];
  p.push("You are FORGE, the AI of the FORGE ecosystem. Write a professional freelance proposal that wins work.");
  p.push("");
  p.push("CRITICAL RULES:");
  p.push("- Reference only facts that appear in the user's CV, memory, or the brief below.");
  p.push("- Never invent experience, clients, results, or credentials.");
  p.push("- Never promise rates, timelines, or outcomes the user has not authorised.");
  p.push("- Match the requested tone, positioning angle, and length precisely.");
  p.push("- Be specific. Vague proposals get ignored.");
  p.push("- Return only valid JSON. No commentary. No markdown fences.");
  p.push("");
  p.push("OPPORTUNITY:");
  p.push("Role: " + (input.role || "(not provided)"));
  p.push("Company: " + (input.company || "(not provided)"));
  p.push("Brief: " + (input.brief || "(not provided)"));
  p.push("Key requirements: " + (input.keyRequirements || "(not provided)"));
  p.push("");
  p.push("USER'S CV:");
  p.push("---");
  p.push(input.cvText || "(no CV provided)");
  p.push("---");
  p.push("");
  p.push("USER MEMORY:");
  p.push(input.memory || "(nothing on file)");
  p.push("");
  p.push("PRIOR FORGE ANALYSIS:");
  p.push("Reasoning: " + (input.analysisReasoning || "(not run)"));
  p.push("Match score: " + (input.matchScore || "(not run)"));
  p.push("");
  p.push("STRATEGY:");
  p.push("Tone: " + (input.tone || "Professional"));
  p.push("Positioning angle: " + (input.positioningAngle || "Specialist"));
  p.push("Length: " + (input.length || "Standard"));
  p.push("Emphasis: " + (input.emphasis || "Experience, Process, Value"));
  p.push("Strength tags to feature: " + (input.strengthTags || "(none)"));
  p.push("Custom notes: " + (input.customNotes || "(none)"));
  if (input.feedback && input.feedback.trim()) {
    p.push("");
    p.push("USER FEEDBACK ON THE PREVIOUS DRAFT:");
    p.push(input.feedback.trim());
    p.push("Apply this feedback while respecting all CRITICAL RULES above.");
  }
  p.push("");
  p.push("Return ONLY valid JSON with this exact structure:");
  p.push("");
  p.push("- subjectLine: a compelling subject line (max 12 words)");
  p.push("- opening: 1-2 sentences that hook the reader. Specific, not generic.");
  p.push("- problemUnderstanding: 2-3 sentences showing you read the brief and understand what they need.");
  p.push("- proposedApproach: 3-5 sentences describing how you would tackle this, grounded in your real experience.");
  p.push("- relevantExperience: 2-4 sentences highlighting the most relevant work from the CV.");
  p.push("- timeline: 1-3 sentences describing a realistic approach to timing. Do not promise specific dates unless the brief specifies.");
  p.push("- investment: 1-3 sentences on pricing approach. Only include rates the user has authorised. If none provided, describe approach without specific numbers.");
  p.push("- closing: 1-2 sentences ending with a clear, low-pressure next step.");
  p.push("- psLine: one optional PS line (empty string if not needed).");
  p.push("- whyThisWorks: array of 3-5 short strings explaining why this proposal should resonate.");
  p.push("- beforeYouSend: array of 3-5 short actionable strings (e.g. \"Verify the timeline with your calendar\").");
  p.push("- keyChanges: array of 3-5 short strings describing what you did (empty array on first draft).");
  p.push("- toneMatch: integer 0-100 (how well the tone matches the strategy)");
  p.push("- personalisationScore: integer 0-100 (how tailored the proposal is to this specific opportunity)");
  return p.join("\n");
}
