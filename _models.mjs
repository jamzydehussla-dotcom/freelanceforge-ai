import { readFileSync } from "fs";
import { GoogleGenAI } from "@google/genai";

const env = readFileSync(".env.local", "utf8");
for (const line of env.split("\n")) {
  const [k, ...v] = line.split("=");
  if (k && v.length) process.env[k.trim()] = v.join("=").trim();
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

try {
  const list = await ai.models.list();
  for await (const m of list) {
    if (m.name && m.name.toLowerCase().includes("flash")) console.log(m.name);
  }
} catch (e) {
  console.error("ERR:", e.message);
}
