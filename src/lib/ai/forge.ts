import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) throw new Error("GROQ_API_KEY is not set in .env.local");

const groq = new Groq({ apiKey });

export type ForgeKind = "analysis" | "production";

const MODELS: Record<ForgeKind, string> = {
  analysis: "openai/gpt-oss-20b",
  production: "openai/gpt-oss-120b",
};

export type ForgeResult = {
  ok: boolean;
  text: string;
  model: string;
  tokensIn: number;
  tokensOut: number;
  error?: string;
};

export async function forgeGenerate(
  prompt: string,
  kind: ForgeKind = "production"
): Promise<ForgeResult> {
  const model = MODELS[kind];

  try {
    const completion = await Promise.race([
      groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: "You are FORGE, the AI of the FORGE ecosystem. Always return valid JSON when asked. Never add commentary outside JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 25000)
      ),
    ]);

    const text = completion.choices[0]?.message?.content ?? "";
    const usage = completion.usage;

    return {
      ok: true,
      text,
      model,
      tokensIn: usage?.prompt_tokens ?? 0,
      tokensOut: usage?.completion_tokens ?? 0,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, text: "", model, tokensIn: 0, tokensOut: 0, error: message };
  }
}
