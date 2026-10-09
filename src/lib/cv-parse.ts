export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
};

export function extractContactInfo(text: string): ContactInfo {
  const out: ContactInfo = { email: "", phone: "", location: "", linkedin: "", website: "" };
  if (!text) return out;

  const em = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (em) out.email = em[0];

  const li = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i);
  if (li) out.linkedin = li[0].replace(/^https?:\/\//i, "").replace(/^www\./i, "");

  const urls = text.match(/https?:\/\/[^\s)]+/gi) || [];
  for (const u of urls) {
    if (!/linkedin/i.test(u)) {
      out.website = u.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
      break;
    }
  }
  if (!out.website) {
    const bare = text.match(/\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|io|dev|ai|co|net|org|me|app)\b/i);
    if (bare && !/linkedin/i.test(bare[0])) {
      const emailDomain = out.email.split("@")[1] || "";
      if (bare[0].toLowerCase() !== emailDomain.toLowerCase()) out.website = bare[0];
    }
  }

  const lines = text.split(/\r?\n/).map((l) => l.trim());

  const phoneKeywords = /(phone|mobile|tel|cell)/i;
  for (const line of lines) {
    if (phoneKeywords.test(line)) {
      const m = line.match(/(\+?\d[\d\s\-().]{6,}\d)/);
      if (m && m[0].replace(/\D/g, "").length >= 8) { out.phone = m[0].trim(); break; }
    }
  }
  if (!out.phone) {
    for (const line of lines.slice(0, 15)) {
      const m = line.match(/(\+\d{1,3}[\s-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/);
      if (m) {
        const d = m[0].replace(/\D/g, "");
        if (d.length >= 8 && d.length <= 15) { out.phone = m[0].trim(); break; }
      }
    }
  }

  for (const line of lines.slice(0, 12)) {
    if (!line || /\d/.test(line)) continue;
    if (/@|http|linkedin/i.test(line)) continue;
    const m = line.match(/^([A-Za-z\s.'-]{2,40}),\s*([A-Za-z\s.'-]{2,40})$/);
    if (m) { out.location = line; break; }
  }

  return out;
}
