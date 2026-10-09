import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

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

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
  }

  const blob = file as File;
  const name = blob.name.toLowerCase();
  const buffer = Buffer.from(await blob.arrayBuffer());

  try {
    if (name.endsWith(".pdf")) {
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
      const data = await pdfParse(buffer);
      const text = (data.text || "").trim();
      if (!text) return NextResponse.json({ ok: false, error: "Could not read text from this PDF. It may be a scanned image." }, { status: 400 });
      return NextResponse.json({ ok: true, text });
    }

    if (name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      const text = (result.value || "").trim();
      if (!text) return NextResponse.json({ ok: false, error: "Could not read text from this DOCX." }, { status: 400 });
      return NextResponse.json({ ok: true, text });
    }

    if (name.endsWith(".txt") || name.endsWith(".md")) {
      const text = buffer.toString("utf8").trim();
      if (!text) return NextResponse.json({ ok: false, error: "This file is empty." }, { status: 400 });
      return NextResponse.json({ ok: true, text });
    }

    return NextResponse.json({ ok: false, error: "Unsupported file type. Use PDF, DOCX, or TXT." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Extraction failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
