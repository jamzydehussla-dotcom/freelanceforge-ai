import type { SupabaseClient } from "@supabase/supabase-js";
import { TIERS, getTier, type Feature } from "./tiers";

export type AccessCheck =
  | { allowed: true; tier: string; remaining: number | null }
  | { allowed: false; tier: string; reason: string };

export async function getUsageThisMonth(
  supabase: SupabaseClient,
  userId: string,
  feature: Feature
): Promise<number> {
  const start = new Date();
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);
  const iso = start.toISOString();

  const { count } = await supabase
    .from("ai_usage")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("feature", feature)
    .gte("created_at", iso);

  return count ?? 0;
}

export async function checkFeatureAccess(
  supabase: SupabaseClient,
  userId: string,
  plan: string | null | undefined,
  role: string | null | undefined,
  feature: Feature
): Promise<AccessCheck> {
  const tierKey = getTier(plan, role);
  const tier = TIERS[tierKey];

  if (tierKey === "owner") {
    return { allowed: true, tier: tierKey, remaining: null };
  }

  if (!tier.features.includes(feature)) {
    return {
      allowed: false,
      tier: tierKey,
      reason: feature + " is not included in your " + tier.label + " plan.",
    };
  }

  const limit = tier.limits[feature];

  if (limit === undefined) {
    // No limit declared for this feature in this tier - allow (Legends).
    return { allowed: true, tier: tierKey, remaining: null };
  }

  const used = await getUsageThisMonth(supabase, userId, feature);
  const remaining = Math.max(0, limit - used);

  if (used >= limit) {
    return {
      allowed: false,
      tier: tierKey,
      reason: "You have reached your " + tier.label + " limit of " + limit + " " + feature + " per month.",
    };
  }

  return { allowed: true, tier: tierKey, remaining };
}
