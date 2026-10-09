import type { SupabaseClient } from "@supabase/supabase-js";

export type UserMemory = {
  minimumRate?: string;
  currency?: string;
  workBoundaries?: string;
  preferredTone?: string;
  timezone?: string;
  industries?: string;
  languages?: string;
  workAuthorization?: string;
  availability?: string;
  preferredWorkType?: string;
};

export async function getUserMemory(
  supabase: SupabaseClient,
  userId: string
): Promise<UserMemory> {
  try {
    const { data, error } = await supabase
      .from("user_memory")
      .select("memory")
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !data || !data.memory) return {};
    return (data.memory as UserMemory) || {};
  } catch {
    return {};
  }
}

const FIELD_LABELS: { key: keyof UserMemory; label: string }[] = [
  { key: "minimumRate", label: "Minimum rate" },
  { key: "currency", label: "Currency" },
  { key: "workBoundaries", label: "Work boundaries" },
  { key: "preferredTone", label: "Preferred tone" },
  { key: "timezone", label: "Timezone" },
  { key: "industries", label: "Industries" },
  { key: "languages", label: "Languages" },
  { key: "workAuthorization", label: "Work authorization" },
  { key: "availability", label: "Availability" },
  { key: "preferredWorkType", label: "Preferred work type" },
];

export function buildMemoryContext(memory: UserMemory): string {
  const lines: string[] = [];
  for (const { key, label } of FIELD_LABELS) {
    const value = memory[key];
    if (value && typeof value === "string" && value.trim()) {
      lines.push("- " + label + ": " + value.trim());
    }
  }

  if (lines.length === 0) return "";

  return [
    "USER MEMORY (facts FORGE has been told to remember about this user):",
    ...lines,
    "",
    "Respect these facts. Do not contradict them.",
    "",
  ].join("\n");
}
