import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { forgeGenerate, type ForgeKind } from "@/lib/ai/forge";
import { buildDiagnosePrompt, buildExtractPrompt, buildRefinePrompt, buildMatchingPrompt, buildAnalysisPrompt, buildProposalPrompt } from "@/lib/ai/prompts";
import { parseDiagnose, parseExtract, parseRefine, parseMatching, parseAnalysis, parseProposal } from "@/lib/ai/validate";
import { getUserMemory, buildMemoryContext } from "@/lib/ai/memory";
import { checkFeatureAccess } from "@/lib/gating";
import type { Feature } from "@/lib/tiers";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll() {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  let body: { feature?: string; prompt?: string; input?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const feature = body.feature || "ping";
  const prompt = body.prompt || "";

  if (feature === "ping" && !prompt) {
    return NextResponse.json({ ok: false, error: "Missing prompt" }, { status: 400 });
  }

  let finalPrompt = prompt;
  const input = (body.input || {}) as Record<string, string | string[]>;
  const asString = (v: unknown): string => (typeof v === "string" ? v : "");
  const asStringArray = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => typeof x === "string") as string[] : []);

  if (feature === "ping") {
    finalPrompt = prompt;
  } else if (feature === "diagnose") {
    finalPrompt = buildDiagnosePrompt({
      cvText: asString(input.cvText),
      role: asString(input.role),
      company: asString(input.company),
      industry: asString(input.industry),
      seniority: asString(input.seniority),
      employmentType: asString(input.employmentType),
      workArrangement: asString(input.workArrangement),
      keyRequirements: asString(input.keyRequirements),
      jobDescription: asString(input.jobDescription),
    });
  } else if (feature === "extract") {
    finalPrompt = buildExtractPrompt({
      role: asString(input.role),
      company: asString(input.company),
      industry: asString(input.industry),
      seniority: asString(input.seniority),
      employmentType: asString(input.employmentType),
      workArrangement: asString(input.workArrangement),
      keyRequirements: asString(input.keyRequirements),
      jobDescription: asString(input.jobDescription),
    });
  } else if (feature === "matching") {
    finalPrompt = buildMatchingPrompt({
      cvText: asString(input.cvText),
      role: asString(input.role),
      company: asString(input.company),
      industry: asString(input.industry),
      seniority: asString(input.seniority),
      employmentType: asString(input.employmentType),
      workArrangement: asString(input.workArrangement),
      keyRequirements: asString(input.keyRequirements),
      jobDescription: asString(input.jobDescription),
    });
  } else if (feature === "analysis") {
    finalPrompt = buildAnalysisPrompt({
      role: asString(input.role),
      company: asString(input.company),
      industry: asString(input.industry),
      seniority: asString(input.seniority),
      employmentType: asString(input.employmentType),
      workArrangement: asString(input.workArrangement),
      keyRequirements: asString(input.keyRequirements),
      jobDescription: asString(input.jobDescription),
      budgetMin: asString(input.budgetMin),
      budgetMax: asString(input.budgetMax),
      budgetCurrency: asString(input.budgetCurrency),
      deadline: asString(input.deadline),
      matchScore: asString(input.matchScore),
    });
  } else if (feature === "proposal") {
    finalPrompt = buildProposalPrompt({
      role: asString(input.role),
      company: asString(input.company),
      brief: asString(input.brief),
      keyRequirements: asString(input.keyRequirements),
      cvText: asString(input.cvText),
      memory: asString(input.memory),
      analysisReasoning: asString(input.analysisReasoning),
      matchScore: asString(input.matchScore),
      tone: asString(input.tone),
      positioningAngle: asString(input.positioningAngle),
      length: asString(input.length),
      emphasis: asString(input.emphasis),
      strengthTags: asString(input.strengthTags),
      customNotes: asString(input.customNotes),
      feedback: asString(input.feedback),
    });
  } else if (feature === "refine") {
    finalPrompt = buildRefinePrompt({
      cvText: asString(input.cvText),
      role: asString(input.role),
      company: asString(input.company),
      industry: asString(input.industry),
      seniority: asString(input.seniority),
      keyRequirements: asString(input.keyRequirements),
      jobDescription: asString(input.jobDescription),
      intents: asStringArray(input.intents),
      feedback: asString(input.feedback),
    });
  } else {
    return NextResponse.json({ ok: false, error: "Unknown feature: " + feature }, { status: 400 });
  }

  const GATED: Feature[] = ["diagnose", "extract", "refine", "matching", "proposals"];
  if (GATED.includes(feature as Feature)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, role")
      .eq("id", user.id)
      .maybeSingle();

    const access = await checkFeatureAccess(
      supabase,
      user.id,
      profile?.plan,
      profile?.role,
      feature as Feature
    );

    if (!access.allowed) {
      return NextResponse.json({ ok: false, error: access.reason }, { status: 403 });
    }
  }

  const memory = await getUserMemory(supabase, user.id);
  const memoryBlock = buildMemoryContext(memory);
  if (memoryBlock) {
    finalPrompt = memoryBlock + "\n" + finalPrompt;
  }

  const kind: ForgeKind =
    feature === "diagnose" || feature === "extract" ? "analysis" : "production";
  const result = await forgeGenerate(finalPrompt, kind);

  try {
    await supabase.from("ai_usage").insert({
      user_id: user.id,
      feature,
      model: result.model,
      tokens_in: result.tokensIn,
      tokens_out: result.tokensOut,
    });
  } catch {}

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  if (feature === "diagnose") {
    const parsed = parseDiagnose(result.text);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, feature, data: parsed.data });
  }

  if (feature === "extract") {
    const parsed = parseExtract(result.text);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, feature, data: parsed.data });
  }

  if (feature === "matching") {
    const parsed = parseMatching(result.text);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, feature, data: parsed.data });
  }

  if (feature === "analysis") {
    const parsed = parseAnalysis(result.text);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, feature, data: parsed.data });
  }

  if (feature === "proposal") {
    const parsed = parseProposal(result.text);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, feature, data: parsed.data });
  }

  if (feature === "refine") {
    const parsed = parseRefine(result.text);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, feature, data: parsed.data });
  }

  return NextResponse.json({ ok: true, text: result.text, feature });
}
