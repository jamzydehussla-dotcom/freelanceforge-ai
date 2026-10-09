import jsPDF from "jspdf";

export type CvExportData = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  skills: string[];
  experience: { title: string; company: string; dates: string; bullets: string[] }[];
  education: { institution: string; degree: string; year: string }[];
  additional: string[];
  showAttribution: boolean;
};

function contactLine(d: CvExportData): string {
  return [d.email, d.phone, d.location, d.linkedin, d.website].filter(Boolean).join("  |  ");
}

export function exportPDF(data: CvExportData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 50;
  const maxW = pageW - margin * 2;
  let y = margin + 10;

  const ensure = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(26, 16, 36);
  doc.text(data.fullName || "Your Name", margin, y);
  y += 26;

  if (data.title) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(80, 70, 90);
    doc.text(data.title, margin, y);
    y += 18;
  }

  const contact = contactLine(data);
  if (contact) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110, 100, 120);
    doc.text(contact, margin, y);
    y += 20;
  }

  doc.setDrawColor(200, 195, 210);
  doc.line(margin, y, pageW - margin, y);
  y += 20;

  const sectionTitle = (t: string) => {
    ensure(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(26, 16, 36);
    doc.text(t.toUpperCase(), margin, y);
    y += 16;
  };

  const para = (t: string, size: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(50, 45, 60);
    const lines = doc.splitTextToSize(t, maxW) as string[];
    for (const ln of lines) {
      ensure(16);
      doc.text(ln, margin, y);
      y += 15;
    }
    y += 6;
  };

  if (data.summary) {
    sectionTitle("Professional Summary");
    para(data.summary, 11);
  }

  if (data.skills.length > 0) {
    sectionTitle("Core Skills");
    para(data.skills.join("  |  "), 11);
  }

  if (data.experience.length > 0) {
    sectionTitle("Professional Experience");
    for (const role of data.experience) {
      ensure(50);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 16, 36);
      doc.text(role.title, margin, y);
      y += 14;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(110, 100, 120);
      doc.text(role.company + (role.dates ? "  |  " + role.dates : ""), margin, y);
      y += 16;
      for (const b of role.bullets) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(50, 45, 60);
        const lines = doc.splitTextToSize("- " + b, maxW - 10) as string[];
        for (let i = 0; i < lines.length; i++) {
          ensure(14);
          doc.text(lines[i], margin + (i === 0 ? 0 : 10), y);
          y += 13;
        }
      }
      y += 8;
    }
  }

  if (data.education.length > 0) {
    sectionTitle("Education");
    for (const e of data.education) {
      ensure(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 16, 36);
      doc.text(e.degree, margin, y);
      y += 14;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(110, 100, 120);
      doc.text(e.institution + (e.year ? "  |  " + e.year : ""), margin, y);
      y += 18;
    }
    y += 4;
  }

  if (data.additional.length > 0) {
    sectionTitle("Additional Information");
    for (const a of data.additional) {
      para("- " + a, 10);
    }
  }

  if (data.showAttribution) {
    ensure(30);
    y += 10;
    doc.setDrawColor(220, 215, 230);
    doc.line(margin, y, pageW - margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(140, 135, 150);
    doc.text("Created with Freelance Forge AI", pageW / 2, y, { align: "center" });
  }

  doc.save((data.fullName || "cv").replace(/[^a-zA-Z0-9]+/g, "-") + "-forge.pdf");
}


export async function exportDOCX(data: CvExportData) {
  const docx = await import("docx");
  const { Document, Paragraph, TextRun, Packer, BorderStyle } = docx as any;

  const children: any[] = [];

  children.push(new Paragraph({ children: [new TextRun({ text: data.fullName || "Your Name", bold: true, size: 48, color: "1a1024" })], spacing: { after: 120 } }));

  if (data.title) {
    children.push(new Paragraph({ children: [new TextRun({ text: data.title, size: 24, color: "50465a" })], spacing: { after: 80 } }));
  }

  const contact = [data.email, data.phone, data.location, data.linkedin, data.website].filter(Boolean).join("  |  ");
  if (contact) {
    children.push(new Paragraph({ children: [new TextRun({ text: contact, size: 20, color: "6e6478" })], spacing: { after: 240 }, border: { bottom: { color: "c8c3d2", style: BorderStyle.SINGLE, size: 6, space: 8 } } }));
  }

  const heading = (t: string) => new Paragraph({ children: [new TextRun({ text: t.toUpperCase(), bold: true, size: 20, color: "1a1024" })], spacing: { before: 240, after: 100 } });

  if (data.summary) {
    children.push(heading("Professional Summary"));
    children.push(new Paragraph({ children: [new TextRun({ text: data.summary, size: 22, color: "322d3c" })], spacing: { after: 100 } }));
  }

  if (data.skills.length > 0) {
    children.push(heading("Core Skills"));
    children.push(new Paragraph({ children: [new TextRun({ text: data.skills.join("  |  "), size: 22, color: "322d3c" })], spacing: { after: 100 } }));
  }

  if (data.experience.length > 0) {
    children.push(heading("Professional Experience"));
    for (const role of data.experience) {
      children.push(new Paragraph({ children: [new TextRun({ text: role.title, bold: true, size: 22, color: "1a1024" })], spacing: { before: 140, after: 40 } }));
      children.push(new Paragraph({ children: [new TextRun({ text: role.company + (role.dates ? "  |  " + role.dates : ""), size: 20, color: "6e6478" })], spacing: { after: 80 } }));
      for (const b of role.bullets) {
        children.push(new Paragraph({ children: [new TextRun({ text: "- " + b, size: 20, color: "322d3c" })], spacing: { after: 40 } }));
      }
    }
  }

  if (data.education.length > 0) {
    children.push(heading("Education"));
    for (const e of data.education) {
      children.push(new Paragraph({ children: [new TextRun({ text: e.degree, bold: true, size: 22, color: "1a1024" })], spacing: { after: 40 } }));
      children.push(new Paragraph({ children: [new TextRun({ text: e.institution + (e.year ? "  |  " + e.year : ""), size: 20, color: "6e6478" })], spacing: { after: 100 } }));
    }
  }

  if (data.additional.length > 0) {
    children.push(heading("Additional Information"));
    for (const a of data.additional) {
      children.push(new Paragraph({ children: [new TextRun({ text: "- " + a, size: 20, color: "322d3c" })], spacing: { after: 40 } }));
    }
  }

  if (data.showAttribution) {
    children.push(new Paragraph({ children: [new TextRun({ text: "Created with Freelance Forge AI", size: 18, color: "8c8796" })], spacing: { before: 400 } }));
  }

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (data.fullName || "cv").replace(/[^a-z0-9]+/gi, "-") + "-forge.docx";
  a.click();
  URL.revokeObjectURL(url);
}
