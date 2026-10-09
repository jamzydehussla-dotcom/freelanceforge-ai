"use client";

export default function ForgeAI({
  size = 28,
  active = false,
  label,
}: {
  size?: number;
  active?: boolean;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <div
        className="relative rounded-full flex items-center justify-center shrink-0"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 35% 35%, rgba(34,211,238,0.55), rgba(139,92,246,0.45) 55%, rgba(236,72,153,0.35))",
          boxShadow: active
            ? "0 0 18px -2px rgba(34,211,238,0.8)"
            : "0 0 12px -4px rgba(139,92,246,0.6)",
        }}
      >
        <span
          className={"block rounded-full bg-white " + (active ? "animate-pulse" : "")}
          style={{ width: size * 0.28, height: size * 0.28 }}
        />
      </div>
      {label && (
        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-400/85">
          {label}
        </span>
      )}
    </div>
  );
}
