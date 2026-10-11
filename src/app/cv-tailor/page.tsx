"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { extractContactInfo } from "@/lib/cv-parse";
import { exportPDF, exportDOCX, type CvExportData } from "@/lib/export-cv";
import Sidebar from "@/components/Sidebar";
import ForgeAI from "@/components/ForgeAI";

const STAGES = [
  { n: "01", name: "Input" },
  { n: "02", name: "Target" },
  { n: "03", name: "Diagnose" },
  { n: "04", name: "Improve" },
  { n: "05", name: "View" },
  { n: "06", name: "Generate" },
];

const MODES = ["Upload", "Paste", "Build", "Saved"] as const;
type Mode = (typeof MODES)[number];

const SOURCE_MODES = ["Job description", "Job link", "Saved opportunity"] as const;
type SourceMode = (typeof SOURCE_MODES)[number];

const SENIORITY = ["Entry", "Mid", "Senior", "Lead", "Principal"];
const EMPLOYMENT_TYPES = ["Remote", "Contract", "Part-time", "Full-time"];
const WORK_ARRANGEMENTS = ["On-site", "Hybrid", "Remote"];

const INTENTS = [
  "ATS Compatibility",
  "Achievements",
  "Skills Relevance",
  "Experience",
  "Keywords",
  "Leadership",
  "Impact",
  "Concise & Direct",
];

const QUICK_DIRECTIONS = ["Shorter", "More technical", "More leadership", "Warmer tone", "Less corporate"];

export default function CVTailorPage() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("Upload");
  const [targetRole, setTargetRole] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [seniority, setSeniority] = useState("");
  const [sourceMode, setSourceMode] = useState<SourceMode>("Job description");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [keyRequirements, setKeyRequirements] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [workArrangement, setWorkArrangement] = useState("");
  const [intents, setIntents] = useState<string[]>([]);
  const [cvText, setCvText] = useState("");
  const [refineNote, setRefineNote] = useState("");
  const [pdPhone, setPdPhone] = useState("");
  const [pdEmail, setPdEmail] = useState("");
  const [pdLocation, setPdLocation] = useState("");
  const [pdLinkedin, setPdLinkedin] = useState("");
  const [pdWebsite, setPdWebsite] = useState("");
  const [quickDirections, setQuickDirections] = useState<string[]>([]);

  function toggleIntent(i: string) {
    setIntents((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  }

  function toggleQuickDirection(d: string) {
    setQuickDirections((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  const [diagnoseData, setDiagnoseData] = useState<any>(null);
  const [diagnoseLoading, setDiagnoseLoading] = useState(false);
  const [diagnoseError, setDiagnoseError] = useState("");
  const [extractData, setExtractData] = useState<any>(null);
  const [extractLoading, setExtractLoading] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [refineData, setRefineData] = useState<any>(null);
  const [refineLoading, setRefineLoading] = useState(false);
  const [refineError, setRefineError] = useState("");
  const [fullName, setFullName] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [planLabel, setPlanLabel] = useState("—");

  async function runDiagnose() {
    setDiagnoseLoading(true);
    setDiagnoseError("");
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: "diagnose",
          input: {
            cvText,
            role: targetRole,
            company,
            industry,
            seniority,
            employmentType,
            workArrangement,
            keyRequirements,
            jobDescription,
          },
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setDiagnoseError(data.error || "Unknown error");
      } else {
        setDiagnoseData(data.data);
      }
    } catch (err) {
      setDiagnoseError(err instanceof Error ? err.message : "Request failed");
    }
    setDiagnoseLoading(false);
  }

  async function runExtract() {
    setExtractLoading(true);
    setExtractError("");
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: "extract",
          input: {
            role: targetRole,
            company: company,
            industry: industry,
            seniority: seniority,
            employmentType: employmentType,
            workArrangement: workArrangement,
            keyRequirements: keyRequirements,
            jobDescription: jobDescription,
          },
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setExtractError(data.error || "Unknown error");
      } else {
        setExtractData(data.data);
      }
    } catch (err) {
      setExtractError(err instanceof Error ? err.message : "Request failed");
    }
    setExtractLoading(false);
  }

  async function runRefine(feedback?: string) {
    setRefineLoading(true);
    setRefineError("");
    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feature: "refine",
          input: {
            cvText,
            role: targetRole,
            company,
            industry,
            seniority,
            keyRequirements,
            jobDescription,
            intents,
            feedback: feedback || [refineNote, ...quickDirections].filter(Boolean).join(". "),
          },
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setRefineError(data.error || "Unknown error");
      } else {
        setRefineData(data.data);
      }
    } catch (err) {
      setRefineError(err instanceof Error ? err.message : "Request failed");
    }
    setRefineLoading(false);
  }

  function buildExportData(): CvExportData {
    return {
      fullName: fullName,
      title: targetRole,
      email: pdEmail,
      phone: pdPhone,
      location: pdLocation,
      linkedin: pdLinkedin,
      website: pdWebsite,
      summary: refineData?.refinedSummary || "",
      skills: Array.isArray(refineData?.refinedSkills) ? refineData.refinedSkills : [],
      experience: Array.isArray(refineData?.refinedExperience) ? refineData.refinedExperience : [],
      education: Array.isArray(refineData?.refinedEducation) ? refineData.refinedEducation : [],
      additional: Array.isArray(refineData?.refinedAdditional) ? refineData.refinedAdditional : [],
      showAttribution: true,
    };
  }

  function handleExportPDF() {
    const data = buildExportData();
    if (!data.summary && data.experience.length === 0) {
      alert("Refine your CV with FORGE before exporting.");
      return;
    }
    exportPDF(data);
  }

  async function handleExportDOCX() {
    const data = buildExportData();
    if (!data.summary && data.experience.length === 0) {
      alert("Refine your CV with FORGE before exporting.");
      return;
    }
    await exportDOCX(data);
  }

  async function handleFileUpload(file: File) {
    setUploadLoading(true);
    setUploadError("");
    setUploadSuccess("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/extract-file", { method: "POST", body: form });
      const data = await res.json();
      if (!data.ok) {
        setUploadError(data.error || "Upload failed");
      } else {
        setCvText(data.text);
        const info = extractContactInfo(data.text);
        const filled: string[] = [];
        if (info.email && !pdEmail) { setPdEmail(info.email); filled.push("email"); }
        if (info.phone && !pdPhone) { setPdPhone(info.phone); filled.push("phone"); }
        if (info.location && !pdLocation) { setPdLocation(info.location); filled.push("location"); }
        if (info.linkedin && !pdLinkedin) { setPdLinkedin(info.linkedin); filled.push("LinkedIn"); }
        if (info.website && !pdWebsite) { setPdWebsite(info.website); filled.push("website"); }
        const charMsg = "Extracted " + data.text.length.toLocaleString() + " characters.";
        const fillMsg = filled.length > 0 ? " Auto-filled " + filled.length + " personal detail" + (filled.length > 1 ? "s" : "") + ": " + filled.join(", ") + "." : "";
        setUploadSuccess(charMsg + fillMsg + " You can edit below.");
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    }
    setUploadLoading(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) handleFileUpload(file);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
  }

  function handleClearAll() {
    if (!confirm("Clear your CV, target, and all FORGE results? This cannot be undone.")) return;
    setCvText("");
    setTargetRole("");
    setCompany("");
    setIndustry("");
    setSeniority("");
    setSourceMode("Job description");
    setJobDescription("");
    setJobLink("");
    setKeyRequirements("");
    setEmploymentType("");
    setWorkArrangement("");
    setIntents([]);
    setPdEmail("");
    setPdPhone("");
    setPdLocation("");
    setPdLinkedin("");
    setPdWebsite("");
    setDiagnoseData(null);
    setExtractData(null);
    setRefineData(null);
    setRefineNote("");
    setQuickDirections([]);
    setMode("Upload");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [loadedOnce, setLoadedOnce] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) { if (active) setLoadedOnce(true); return; }
      setFullName((user.user_metadata?.full_name as string) || "");
      const { data: profileRow } = await supabase.from("profiles").select("plan").eq("id", user.id).maybeSingle();
      if (active && profileRow?.plan) setPlanLabel(profileRow.plan.charAt(0).toUpperCase() + profileRow.plan.slice(1));
      const { data } = await supabase.from("cvs").select("*").eq("user_id", user.id).maybeSingle();
      if (!active) return;
      if (data) {
        setCvText(data.cv_text || "");
        setTargetRole(data.target_role || "");
        setCompany(data.company || "");
        setIndustry(data.industry || "");
        setSeniority(data.seniority || "");
        if (data.source_mode) setSourceMode(data.source_mode as SourceMode);
        setJobDescription(data.job_description || "");
        setJobLink(data.job_link || "");
        setKeyRequirements(data.key_requirements || "");
        setEmploymentType(data.employment_type || "");
        setWorkArrangement(data.work_arrangement || "");
        if (Array.isArray(data.intents)) setIntents(data.intents);
        setPdEmail(data.pd_email || "");
        setPdPhone(data.pd_phone || "");
        setPdLocation(data.pd_location || "");
        setPdLinkedin(data.pd_linkedin || "");
        setPdWebsite(data.pd_website || "");
        if (data.diagnose_data) setDiagnoseData(data.diagnose_data);
        if (data.extract_data) setExtractData(data.extract_data);
        if (data.refine_data) setRefineData(data.refine_data);
      }
      setLoadedOnce(true);
    })();
  }, []);

  useEffect(() => {
    if (!searchParams) return;
    const r = searchParams.get("role");
    const cmp = searchParams.get("company");
    const ind = searchParams.get("industry");
    const sen = searchParams.get("seniority");
    const emp = searchParams.get("employmentType");
    const kr = searchParams.get("keyRequirements");
    const jd = searchParams.get("jobDescription");
    if (r || cmp || ind || sen || emp || kr || jd) {
      if (r) setTargetRole(r);
      if (cmp) setCompany(cmp);
      if (ind) setIndustry(ind);
      if (sen) setSeniority(sen);
      if (emp) setEmploymentType(emp);
      if (kr) setKeyRequirements(kr);
      if (jd) setJobDescription(jd);
      setSourceMode("Job description");
    }
  }, [searchParams]);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!loadedOnce) return;
    const t = setTimeout(async () => {
      setSaveStatus("saving");
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) { setSaveStatus("idle"); return; }
      await supabase.from("cvs").upsert({
        user_id: user.id,
        cv_text: cvText,
        target_role: targetRole,
        company: company,
        industry: industry,
        seniority: seniority,
        source_mode: sourceMode,
        job_description: jobDescription,
        job_link: jobLink,
        key_requirements: keyRequirements,
        employment_type: employmentType,
        work_arrangement: workArrangement,
        intents: intents,
        pd_email: pdEmail,
        pd_phone: pdPhone,
        pd_location: pdLocation,
        pd_linkedin: pdLinkedin,
        pd_website: pdWebsite,
        diagnose_data: diagnoseData,
        extract_data: extractData,
        refine_data: refineData,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 1500);
    }, 1500);
    return () => clearTimeout(t);
  }, [loadedOnce, cvText, targetRole, company, industry, seniority, sourceMode, jobDescription, jobLink, keyRequirements, employmentType, workArrangement, intents, pdEmail, pdPhone, pdLocation, pdLinkedin, pdWebsite, diagnoseData, extractData, refineData]);

  const targetFilled = !!(targetRole || company || jobDescription || jobLink || keyRequirements);

  const inputClass = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)] resize-none";
  const inputSmall = "w-full rounded-lg border border-violet-500/20 bg-[#12062a] px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_15px_-2px_rgba(34,211,238,0.6)]";
  const labelClass = "block text-[11px] tracking-wide text-violet-200/70 mb-1.5";

  return (
    <div className="min-h-screen bg-[#0f0524] text-white flex">
      <Sidebar planLabel={planLabel} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-violet-500/15 px-6 md:px-10 py-5 flex items-center justify-between bg-[#13072b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src="/forge-logo.svg" alt="FORGE" width={26} height={26} className="md:hidden drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
            <h1 className="text-lg font-semibold tracking-tight">CV Tailor</h1>
          </div>
          {saveStatus === "saving" && (<span className="text-[10px] tracking-[0.15em] uppercase text-violet-300/50">Saving...</span>)}
          {saveStatus === "saved" && (<span className="text-[10px] tracking-[0.15em] uppercase text-cyan-400/85">Saved</span>)}
          <span className="text-xs text-violet-200/60 hidden md:inline">Position your CV around a real opportunity</span>
        </header>

        <main className="flex-1 px-6 md:px-10 py-12 max-w-6xl w-full">
          <section className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] text-cyan-400/85 mb-5">FORGE YOUR CV</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight" style={{ textShadow: "0 0 40px rgba(139,92,246,0.35)" }}>
              Make your experience impossible to overlook.
            </h2>
            <p className="mt-5 text-sm text-violet-200/60 leading-relaxed">
              Forge helps you turn your real experience, skills and achievements into a professional CV positioned around the opportunity you want.
            </p>
            <p className="inline-block mt-6 text-[10px] tracking-[0.15em] uppercase text-violet-200/55 border border-violet-500/25 rounded-full px-3 py-1.5">
              You provide the experience · FORGE handles the tailoring · Coming soon
            </p>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {STAGES.map((s, i) => {
                const active = i === 0;
                return (
                  <div key={s.n} className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className={"h-2.5 w-2.5 rounded-full " + (active ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" : "bg-violet-500/30 border border-violet-500/40")} />
                      <div className="flex items-baseline gap-1.5">
                        <span className={"text-[10px] font-mono " + (active ? "text-cyan-400" : "text-violet-300/40")}>{s.n}</span>
                        <span className={"text-xs " + (active ? "text-white font-medium" : "text-violet-200/40")}>{s.name}</span>
                      </div>
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className={"h-px w-6 md:w-14 " + (active ? "bg-cyan-400/40" : "bg-violet-500/20")} />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10">
            <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/60 px-6 py-4 flex items-center flex-wrap gap-x-8 gap-y-3">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-violet-500/40" />
                <span className="text-[10px] tracking-[0.16em] uppercase text-violet-200/50">CV input</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className={"h-2 w-2 rounded-full " + (targetFilled ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" : "bg-violet-500/40")} />
                <span className="text-[10px] tracking-[0.16em] uppercase text-violet-200/50">Target input</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-violet-500/40" />
                <span className="text-[10px] tracking-[0.16em] uppercase text-violet-200/50">FORGE assessment</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-violet-500/40" />
                <span className="text-[10px] tracking-[0.16em] uppercase text-violet-200/50">FORGE refinement</span>
              </div>
            </div>
          </section>

          <div className="flex items-center gap-3 mb-6 mt-12">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            <span className="text-[10px] font-mono text-cyan-400">01</span>
            <span className="text-sm font-medium text-white tracking-wide">INPUT</span>
            <span className="text-xs text-violet-200/40 ml-2">Provide the CV you want FORGE to work from</span>
          </div>

          <section>
            <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 backdrop-blur-sm p-7">
              <div className="flex flex-wrap gap-2 mb-6">
                {MODES.map((m) => {
                  const active = m === mode;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={"px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition " + (active ? "text-cyan-300 border border-cyan-400/40 bg-cyan-400/5 shadow-[0_0_15px_-4px_rgba(34,211,238,0.7)]" : "text-violet-200/50 border border-violet-500/20 hover:text-white hover:border-violet-400/40")}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>

              {mode === "Upload" && (
              <div className="space-y-4">
                {!cvText ? (
                  <label onDrop={handleDrop} onDragOver={handleDragOver} className="block cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-[#12062a]/40 px-6 py-14 text-center hover:border-violet-400/50 transition">
                    <input type="file" accept=".pdf,.docx,.txt,.md" onChange={handleFileChange} className="hidden" />
                    <div className="mx-auto h-10 w-10 rounded-full border border-violet-500/30 flex items-center justify-center mb-4">
                      <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                    </div>
                    {uploadLoading ? (<p className="text-sm text-white/85">FORGE is reading your file...</p>) : (<>
                      <p className="text-sm text-white/75">Drag a PDF or DOCX here - or click to browse.</p>
                      <p className="text-xs text-violet-200/40 mt-2">Supported: PDF, DOCX, TXT, MD</p>
                    </>)}
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <p className="text-xs text-cyan-300/85">{uploadSuccess || "File loaded. Edit below if needed."}</p>
                      <button type="button" onClick={() => { setCvText(""); setUploadSuccess(""); setUploadError(""); }} className="text-xs text-violet-200/60 hover:text-red-400 transition">Remove file</button>
                    </div>
                    <textarea rows={12} value={cvText} onChange={(e) => setCvText(e.target.value)} className={inputClass} />
                  </div>
                )}
                {uploadError && (<p className="text-xs text-red-300 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">{uploadError}</p>)}
              </div>
            )}

            {mode === "Paste" && (
                <textarea rows={12} value={cvText} onChange={(e) => setCvText(e.target.value)} placeholder="Paste your existing CV content here..." className={inputClass} />
              )}

              {mode === "Build" && (
                <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/40 px-6 py-14 text-center">
                  <p className="text-sm text-white/75">Guided CV builder</p>
                  <p className="text-xs text-violet-200/40 mt-2">Coming soon.</p>
                </div>
              )}

              {mode === "Saved" && (
                <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/40 px-6 py-14 text-center">
                  <p className="text-sm text-white/75">No saved CVs yet.</p>
                  <p className="text-xs text-violet-200/40 mt-2">Saved CVs will appear here once storage is connected.</p>
                </div>
              )}
            </div>

            
          </section>

          <section className="mt-10">
            <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 backdrop-blur-sm p-7">
              <div className="mb-5">
                <h3 className="text-sm font-medium text-white">Personal details</h3>
                <p className="text-xs text-violet-200/50 mt-1">Facts FORGE places on your CV. Not tailored - just placed.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Email</label>
                  <input value={pdEmail} onChange={(e) => setPdEmail(e.target.value)} placeholder="you@example.com" className={inputSmall} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input value={pdPhone} onChange={(e) => setPdPhone(e.target.value)} placeholder="+1 555 000 0000" className={inputSmall} />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input value={pdLocation} onChange={(e) => setPdLocation(e.target.value)} placeholder="City, Country" className={inputSmall} />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn</label>
                  <input value={pdLinkedin} onChange={(e) => setPdLinkedin(e.target.value)} placeholder="linkedin.com/in/..." className={inputSmall} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Website (optional)</label>
                  <input value={pdWebsite} onChange={(e) => setPdWebsite(e.target.value)} placeholder="yoursite.com" className={inputSmall} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Photo</label>
                  <div className="rounded-lg border border-dashed border-violet-500/25 bg-[#12062a]/40 px-5 py-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full border border-violet-500/30 flex items-center justify-center text-xs text-violet-200/40">IMG</div>
                    <div>
                      <p className="text-xs text-white/75">Photo upload will be enabled in a future update.</p>
                      <p className="text-[11px] text-violet-200/40 mt-1">Optional. Your CV works fine without one.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              <span className="text-[10px] font-mono text-cyan-400">02</span>
              <span className="text-sm font-medium text-white tracking-wide">TARGET</span>
              <span className="text-xs text-violet-200/40 ml-2">Define the opportunity this CV should be positioned around</span>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 backdrop-blur-sm p-7 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300/50">Opportunity identity</p>
                  <div>
                    <label className={labelClass}>Target role</label>
                    <input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer" className={inputSmall} />
                  </div>
                  <div>
                    <label className={labelClass}>Company / Organization</label>
                    <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Acme Ltd" className={inputSmall} />
                  </div>
                  <div>
                    <label className={labelClass}>Industry / Field</label>
                    <input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Fintech" className={inputSmall} />
                  </div>
                  <div>
                    <label className={labelClass}>Seniority</label>
                    <select value={seniority} onChange={(e) => setSeniority(e.target.value)} className={inputSmall}>
                      <option value="">Select seniority...</option>
                      {SENIORITY.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300/50">Opportunity source</p>
                  <div className="flex flex-wrap gap-2">
                    {SOURCE_MODES.map((m) => {
                      const active = m === sourceMode;
                      return (
                        <button key={m} type="button" onClick={() => setSourceMode(m)} className={"px-3 py-1.5 rounded-lg text-[11px] tracking-wide transition " + (active ? "text-cyan-300 border border-cyan-400/40 bg-cyan-400/5 shadow-[0_0_15px_-4px_rgba(34,211,238,0.7)]" : "text-violet-200/50 border border-violet-500/20 hover:text-white hover:border-violet-400/40")}>
                          {m}
                        </button>
                      );
                    })}
                  </div>

                  {sourceMode === "Job description" && (
                    <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={8} placeholder="Paste the job description or opportunity details here..." className={inputClass} />
                  )}

                  {sourceMode === "Job link" && (
                    <input value={jobLink} onChange={(e) => setJobLink(e.target.value)} placeholder="https://..." className={inputSmall} />
                  )}

                  {sourceMode === "Saved opportunity" && (
                    <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/40 px-6 py-10 text-center">
                      <p className="text-sm text-white/75">No saved opportunities yet.</p>
                      <p className="text-xs text-violet-200/40 mt-2">Saved opportunities will appear here once the Opportunity Radar is connected.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-violet-500/15 pt-7 space-y-5">
                <div>
                  <label className={labelClass}>Key requirements & skills</label>
                  <textarea value={keyRequirements} onChange={(e) => setKeyRequirements(e.target.value)} rows={4} placeholder="List the key requirements, skills and must-haves from the opportunity..." className={inputClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Employment type</label>
                    <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className={inputSmall}>
                      <option value="">Select employment type...</option>
                      {EMPLOYMENT_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Work arrangement</label>
                    <select value={workArrangement} onChange={(e) => setWorkArrangement(e.target.value)} className={inputSmall}>
                      <option value="">Select work arrangement...</option>
                      {WORK_ARRANGEMENTS.map((w) => (<option key={w} value={w}>{w}</option>))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-violet-500/15 pt-7">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white">Tailoring intent</h4>
                  <p className="text-xs text-violet-200/50 mt-1">Tell Forge what to prioritise when tailoring.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {INTENTS.map((i) => {
                    const active = intents.includes(i);
                    return (
                      <button key={i} type="button" onClick={() => toggleIntent(i)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (active ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_15px_-4px_rgba(34,211,238,0.7)]" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10">
  <div className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.45))" }}>
    <div className="rounded-2xl bg-[#170a34]/90 backdrop-blur-xl p-7">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <div className="mb-3"><ForgeAI size={22} label="FORGE INTELLIGENCE" active={extractLoading} /></div>
          <p className="text-xs text-violet-200/55 max-w-xl leading-relaxed">Once you provide a target opportunity, FORGE extracts the signals below — the same ones it will tailor your CV against.</p>
        </div>
        <span className="shrink-0 text-[10px] tracking-[0.15em] uppercase text-violet-200/55 border border-violet-500/25 rounded-full px-3 py-1.5">{extractLoading ? "FORGE is extracting" : extractData ? "Extracted" : "Awaiting analysis"}</span>
      </div>
      {extractError && (<div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3"><p className="text-xs text-red-300">{extractError}</p></div>)}
      <div className="divide-y divide-violet-500/15 mt-2">
        {[{ key: "coreSkills", label: "Core skills" }, { key: "keywords", label: "Keywords & phrases" }, { key: "responsibilities", label: "Responsibilities" }, { key: "prioritySignals", label: "Priority signals" }].map((row) => {
          const items = extractData?.[row.key];
          return (<div key={row.key} className="flex items-start justify-between gap-4 py-4"><span className="text-[11px] tracking-[0.14em] uppercase text-violet-200/70 w-44 shrink-0 pt-1">{row.label}</span><div className="flex-1 flex flex-wrap gap-1.5 justify-end">{items && items.length > 0 ? (items.map((it: string, i: number) => (<span key={i} className="text-[11px] text-cyan-200/85 border border-cyan-400/25 bg-cyan-400/5 rounded-full px-2.5 py-1">{it}</span>))) : (<span className="text-xs text-violet-200/35 pt-1">Not analysed yet — provide a target above</span>)}</div></div>);
        })}
      </div>
      <div className="mt-6 flex items-center gap-4 flex-wrap">
        <button type="button" onClick={runExtract} disabled={extractLoading || !targetFilled} className="text-sm font-semibold text-black px-5 py-2 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{extractLoading ? "FORGE is extracting..." : extractData ? "Re-extract signals" : "Extract signals with FORGE"}</button>
        {!targetFilled && <span className="text-xs text-violet-200/45">Fill in the target above first.</span>}
      </div>
    </div>
  </div>
</section>

          

          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              <span className="text-[10px] font-mono text-cyan-400">03</span>
              <span className="text-sm font-medium text-white tracking-wide">DIAGNOSE</span>
              <span className="text-xs text-violet-200/40 ml-2">FORGE reads your CV against the target</span>
            </div>
            <div className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.45))" }}>
              <div className="rounded-2xl bg-[#170a34]/90 backdrop-blur-xl p-7">
                <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                  <ForgeAI size={24} label="FORGE ASSESSMENT" active={diagnoseLoading} />
                  <span className="shrink-0 text-[10px] tracking-[0.15em] uppercase text-violet-200/55 border border-violet-500/25 rounded-full px-3 py-1.5">
                    {diagnoseLoading ? "FORGE is assessing" : diagnoseData ? "Assessed" : "Awaiting analysis"}
                  </span>
                </div>
                <p className="text-xs text-violet-200/55 max-w-xl leading-relaxed mb-6">
                  {diagnoseData ? "FORGE has assessed your CV against the target. Review the findings below." : "Assessment comes first. Tailoring comes next. FORGE evaluates your position before proposing any changes."}
                </p>
                {diagnoseError && (
                  <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
                    <p className="text-xs text-red-300">{diagnoseError}</p>
                  </div>
                )}
                <div className="divide-y divide-violet-500/15">
                  {[
                    { key: "roleAlignment", label: "Role Alignment" },
                    { key: "experienceEvidence", label: "Experience Evidence" },
                    { key: "skillsAlignment", label: "Skills Alignment" },
                    { key: "evidenceImpact", label: "Evidence & Impact" },
                    { key: "professionalPositioning", label: "Professional Positioning" },
                  ].map((cat) => {
                    const d = diagnoseData?.categories?.[cat.key];
                    return (
                      <div key={cat.key} className="py-4">
                        <div className="flex items-center gap-5">
                          <span className="text-[11px] tracking-[0.14em] uppercase text-violet-200/70 w-52 shrink-0">{cat.label}</span>
                          <div className="flex-1 h-1 rounded-full bg-violet-500/15 overflow-hidden">
                            {d && <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: d.score + "%" }} />}
                          </div>
                          <span className="text-[11px] text-violet-200/55 w-16 text-right">{d ? d.score + "/100" : "—"}</span>
                        </div>
                        {d && <p className="text-xs text-violet-200/55 mt-2 ml-[13rem]">{d.reasoning}</p>}
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {[
                    { key: "strongestEvidence", label: "Strongest evidence" },
                    { key: "missingEvidence", label: "Missing evidence" },
                    { key: "positioningOpportunities", label: "Positioning opportunities" },
                    { key: "refinementPriorities", label: "Refinement priorities" },
                  ].map((area) => {
                    const items = diagnoseData?.areas?.[area.key];
                    return (
                      <div key={area.key} className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 p-5">
                        <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/50 mb-2.5">{area.label}</p>
                        {items && items.length > 0 ? (
                          <ul className="space-y-1.5">
                            {items.map((it: string, i: number) => (
                              <li key={i} className="text-xs text-white/80 leading-relaxed">• {it}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-violet-200/35">Nothing to show yet — provide a CV and a target.</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-7 flex items-center gap-4 flex-wrap">
                  <button type="button" onClick={runDiagnose} disabled={diagnoseLoading} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)" }}>
                    {diagnoseLoading ? "FORGE is assessing..." : diagnoseData ? "Re-run assessment" : "Assess with FORGE"}
                  </button>
                  {!cvText && <span className="text-xs text-violet-200/45">Add your CV text in Stage 1 for an accurate assessment.</span>}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16">
  <div className="flex items-center gap-3 mb-6">
    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
    <span className="text-[10px] font-mono text-cyan-400">04</span>
    <span className="text-sm font-medium text-white tracking-wide">IMPROVE</span>
    <span className="text-xs text-violet-200/40 ml-2">FORGE refines your CV against your target</span>
  </div>
  <div className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.45), rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.45))" }}>
    <div className="rounded-2xl bg-[#170a34]/90 backdrop-blur-xl p-7">
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <div className="mb-3"><ForgeAI size={24} label="FORGE REFINEMENT" active={refineLoading} /></div>
          <p className="text-xs text-violet-200/55 max-w-xl leading-relaxed">FORGE will refine your summary, experience and skills against the target. Nothing is invented - only sharpened.</p>
        </div>
        <span className="shrink-0 text-[10px] tracking-[0.15em] uppercase text-violet-200/55 border border-violet-500/25 rounded-full px-3 py-1.5">{refineLoading ? "FORGE is refining" : refineData ? "Refined" : "Awaiting input"}</span>
      </div>
      {refineError && (<div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3"><p className="text-xs text-red-300">{refineError}</p></div>)}
      <div className="mt-6">
        <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/50 mb-3">Refined CV preview</p>
        {refineData ? (
          <div className="rounded-xl border border-cyan-400/25 bg-[#12062a]/60 px-6 py-6 space-y-6">
            <div>
              <p className="text-[10px] tracking-[0.16em] uppercase text-cyan-300/80 mb-2">Professional Summary</p>
              <p className="text-sm text-white/85 leading-relaxed">{refineData.refinedSummary}</p>
            </div>
            {Array.isArray(refineData.refinedExperience) && refineData.refinedExperience.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.16em] uppercase text-cyan-300/80 mb-3">Experience</p>
                <div className="space-y-4">
                  {refineData.refinedExperience.map((r: any, i: number) => (
                    <div key={i} className="border-l-2 border-violet-500/30 pl-4">
                      <p className="text-sm text-white/90 font-medium">{r.title}</p>
                      <p className="text-xs text-violet-200/55 mt-0.5">{r.company} - {r.dates}</p>
                      <ul className="mt-2 space-y-1">
                        {Array.isArray(r.bullets) && r.bullets.map((b: string, j: number) => (<li key={j} className="text-xs text-white/75 leading-relaxed">- {b}</li>))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {Array.isArray(refineData.refinedSkills) && refineData.refinedSkills.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.16em] uppercase text-cyan-300/80 mb-2">Skills (reordered by relevance)</p>
                <div className="flex flex-wrap gap-1.5">{refineData.refinedSkills.map((s: string, i: number) => (<span key={i} className="text-[11px] text-cyan-200/85 border border-cyan-400/25 bg-cyan-400/5 rounded-full px-2.5 py-1">{s}</span>))}</div>
              </div>
            )}
            {Array.isArray(refineData.refinedEducation) && refineData.refinedEducation.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.16em] uppercase text-cyan-300/80 mb-3">Education</p>
                <div className="space-y-2">
                  {refineData.refinedEducation.map((e: any, i: number) => (
                    <div key={i} className="text-xs text-white/80">
                      <span className="text-white/90 font-medium">{e.degree}</span>
                      <span className="text-violet-200/55"> — {e.institution}</span>
                      {e.year && <span className="text-violet-200/45"> · {e.year}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {Array.isArray(refineData.refinedAdditional) && refineData.refinedAdditional.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.16em] uppercase text-cyan-300/80 mb-2">Additional Information</p>
                <ul className="space-y-1">
                  {refineData.refinedAdditional.map((a: string, i: number) => (<li key={i} className="text-xs text-white/75 leading-relaxed">- {a}</li>))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-violet-500/20 bg-[#12062a]/50 px-6 py-12 text-center">
            <p className="text-sm text-white/70">FORGE will produce your refined CV here once you provide the input above.</p>
            <p className="text-xs text-violet-200/35 mt-2">Nothing is invented. Only what is real gets sharpened.</p>
          </div>
        )}
      </div>
      {refineData && Array.isArray(refineData.keyChanges) && refineData.keyChanges.length > 0 && (
        <div className="mt-6 rounded-xl border border-violet-500/20 bg-[#12062a]/40 px-5 py-4">
          <p className="text-[10px] tracking-[0.16em] uppercase text-violet-300/50 mb-2.5">What FORGE changed</p>
          <ul className="space-y-1.5">{refineData.keyChanges.map((k: string, i: number) => (<li key={i} className="text-xs text-white/75 leading-relaxed">- {k}</li>))}</ul>
        </div>
      )}
      <div className="mt-7 flex items-center gap-4 flex-wrap">
        <button type="button" onClick={() => runRefine()} disabled={refineLoading || !cvText} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 25px -6px rgba(34,211,238,0.7)" }}>{refineLoading ? "FORGE is refining..." : refineData ? "Re-refine with FORGE" : "Refine with FORGE"}</button>
        {!cvText && <span className="text-xs text-violet-200/45">Add your CV text in Stage 1 first.</span>}
      </div>
      <p className="text-xs text-violet-200/45 mt-5">You will review every change before it is saved. FORGE never invents experience, employers, or skills - it sharpens what is real.</p>
    </div>
  </div>
</section>

          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              <span className="text-[10px] font-mono text-cyan-400">05</span>
              <span className="text-sm font-medium text-white tracking-wide">VIEW & REFINE</span>
              <span className="text-xs text-violet-200/40 ml-2">The CV FORGE produced - refine until it is right</span>
            </div>
            <div className="rounded-2xl border border-violet-500/20 bg-[#170a34]/70 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-[10px] tracking-[0.15em] uppercase text-violet-300/50">Professional preview</span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-violet-200/55 border border-violet-500/25 rounded-full px-3 py-1.5">Draft preview - Awaiting FORGE output</span>
              </div>
              <div className="rounded-lg bg-[#f7f5fb] text-[#1a1024] p-10 md:p-14">
<div className="border-b border-[#1a1024]/15 pb-6">
<h3 className="text-2xl font-semibold tracking-tight">{fullName || "Your Name"}</h3>
<p className="text-sm text-[#1a1024]/60 mt-1.5">{targetRole || "Professional Title"}</p>
<p className="text-xs text-[#1a1024]/50 mt-2">{[pdEmail, pdPhone, pdLocation, pdLinkedin, pdWebsite].filter(Boolean).join(" · ") || "Email · Phone · Location · LinkedIn"}</p>
</div>
<div className="mt-8"><h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a1024]/70 mb-2.5">Professional Summary</h4><p className="text-sm text-[#1a1024]/80 leading-relaxed">{refineData?.refinedSummary || "FORGE will populate this from your real experience."}</p></div>
<div className="mt-8"><h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a1024]/70 mb-2.5">Core Skills</h4><p className="text-sm text-[#1a1024]/80 leading-relaxed">{refineData?.refinedSkills?.length ? refineData.refinedSkills.join(" · ") : "FORGE will reorder and align these to your target opportunity."}</p></div>
<div className="mt-8"><h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a1024]/70 mb-3">Professional Experience</h4>{refineData?.refinedExperience?.length ? (<div className="space-y-5">{refineData.refinedExperience.map((r: any, i: number) => (<div key={i}><p className="text-sm font-semibold text-[#1a1024]/90">{r.title}</p><p className="text-xs text-[#1a1024]/60 mt-0.5">{r.company} · {r.dates}</p><ul className="mt-1.5 space-y-1">{Array.isArray(r.bullets) && r.bullets.map((b: string, j: number) => (<li key={j} className="text-sm text-[#1a1024]/75 leading-relaxed">· {b}</li>))}</ul></div>))}</div>) : (<p className="text-sm text-[#1a1024]/45 italic">FORGE will sharpen each role around relevance and impact.</p>)}</div>
{refineData?.refinedEducation?.length > 0 && (<div className="mt-8"><h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a1024]/70 mb-3">Education</h4><div className="space-y-2">{refineData.refinedEducation.map((e: any, i: number) => (<div key={i} className="text-sm text-[#1a1024]/80"><span className="font-medium">{e.degree}</span><span className="text-[#1a1024]/60"> · {e.institution}</span>{e.year && <span className="text-[#1a1024]/50"> · {e.year}</span>}</div>))}</div></div>)}
{refineData?.refinedAdditional?.length > 0 && (<div className="mt-8"><h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a1024]/70 mb-2.5">Additional Information</h4><ul className="space-y-1">{refineData.refinedAdditional.map((a: string, i: number) => (<li key={i} className="text-sm text-[#1a1024]/75 leading-relaxed">· {a}</li>))}</ul></div>)}
<p className="text-[10px] text-[#1a1024]/35 mt-12 pt-4 border-t border-[#1a1024]/10 text-center">Created with Freelance Forge AI</p>
</div>
<div className="mt-6 rounded-xl border border-violet-500/20 bg-[#12062a]/50 p-6">
                <p className="text-sm font-medium text-white mb-1">Not quite right?</p>
                <p className="text-xs text-violet-200/50 mb-5">Tell FORGE what to change - it will refine again without you editing anything by hand.</p>
                <input value={refineNote} onChange={(e) => setRefineNote(e.target.value)} placeholder="e.g. Make it shorter, more technical focus, less corporate tone..." className={inputSmall} />
                <div className="flex flex-wrap gap-2 mt-4">
                  {QUICK_DIRECTIONS.map((d) => {
                    const active = quickDirections.includes(d);
                    return (
                      <button key={d} type="button" onClick={() => toggleQuickDirection(d)} className={"px-3.5 py-1.5 rounded-full text-xs transition " + (active ? "text-cyan-300 border border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_15px_-4px_rgba(34,211,238,0.7)]" : "text-violet-200/60 border border-violet-500/25 hover:text-white hover:border-violet-400/50")}>
                        {d}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 mt-6 flex-wrap">
                  <button type="button" onClick={() => runRefine()} disabled={refineLoading || !cvText} className="text-sm font-semibold text-black px-6 py-2.5 rounded-lg transition hover:brightness-110 disabled:opacity-60" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>{refineLoading ? "FORGE is refining..." : "Refine again with FORGE"}</button>
                  <button type="button" onClick={() => { const el = document.getElementById("stage-generate"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="text-sm font-medium text-violet-100/80 hover:text-white px-6 py-2.5 rounded-lg border border-violet-500/30 hover:border-violet-400/50 transition">This looks good - Generate</button>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16" id="stage-generate">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              <span className="text-[10px] font-mono text-cyan-400">06</span>
              <span className="text-sm font-medium text-white tracking-wide">GENERATE</span>
              <span className="text-xs text-violet-200/40 ml-2">Save, download, or start a new version</span>
            </div>

            {(!pdEmail || !pdPhone || !pdLocation) && (
              <div className="rounded-xl border border-violet-500/25 bg-[#12062a]/60 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs text-white/85">A few details are missing.</p>
                  <p className="text-[11px] text-violet-200/50 mt-1">Filling these makes your CV complete. {"Email · Phone · Location"} — you can skip this.</p>
                </div>
                <span className="text-[11px] tracking-wider uppercase text-violet-200/45 border border-violet-500/25 rounded-full px-3 py-1.5">Add missing details</span>
              </div>
            )}

            <div className="mt-5 rounded-2xl border border-violet-500/20 bg-[#170a34]/70 backdrop-blur-sm p-7 space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="mb-2"><ForgeAI size={22} label="FORGE FINAL CV" /></div>
                  <p className="text-xs text-violet-200/55">Your CV is ready to export once FORGE has produced a refined version.</p>
                </div>
                <span className="text-[10px] tracking-[0.15em] uppercase text-violet-200/50 border border-violet-500/25 rounded-full px-3 py-1.5">Not ready — refine first</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button type="button" onClick={handleExportPDF} className="text-sm font-semibold text-black px-6 py-3 rounded-lg transition hover:brightness-110" style={{ background: "linear-gradient(90deg, #22d3ee, #8b5cf6 50%, #ec4899)", boxShadow: "0 0 22px -6px rgba(34,211,238,0.7)" }}>Download PDF</button>
                <button type="button" onClick={handleExportDOCX} className="text-sm font-medium text-violet-100/80 hover:text-white px-6 py-3 rounded-lg border border-violet-500/30 hover:border-violet-400/50 transition">Download DOCX</button>
              </div>

              <p className="text-[11px] text-violet-200/40 text-center">Exports use the refined CV from Stage 4. Refine first if you have not yet.</p>

              <div className="border-t border-violet-500/15 pt-5 space-y-3">
                <p className="text-[11px] text-violet-200/45">Free plan includes a subtle FORGE attribution at the bottom of your CV. Upgrade to remove it.</p>
                <button type="button" onClick={handleClearAll} className="text-xs text-violet-200/60 hover:text-red-400 transition">Start a new CV</button>
              </div>
            </div>
          </section>

          <p className="text-center text-[11px] text-violet-200/25 tracking-wide pt-14">
            Freelance Forge AI — by FORGE
          </p>
        </main>
      </div>
    </div>
  );
}
