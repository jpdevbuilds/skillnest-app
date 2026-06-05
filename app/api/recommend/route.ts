import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { skill, level, budget, hours } = await req.json();

    const prompt = `Create a realistic step-by-step learning roadmap for learning "${skill}". 
      The user's experience level is: ${level}.
      Their budget constraint is: ${budget}. 
      Their weekly time availability is: ${hours} hours per week.

      CRITICAL INSTRUCTION FOR RESOURCES:
      When recommending platforms or core gear, use these EXACT phrases so our system can format them:
      - For courses, say "Recommended Course: [Platform Name]" (e.g., Recommended Course: Udemy or Recommended Course: Coursera)
      - For books, say "Recommended Book: [Book Title by Author]"
      - For hosting/tools, say "Recommended Tool: [Tool Name]" (e.g., Recommended Tool: Hostinger)

      Return the roadmap as beautifully formatted Markdown text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // 🌟 THE REAL FIX: Remove the parentheses. It's a getter property!
    const markdownText = response.text || "";

    if (!markdownText) {
      throw new Error("Gemini returned an empty response string.");
    }

    // Wrap it inside an object with the "roadmap" key so your frontend can read it seamlessly
    return NextResponse.json({ roadmap: markdownText });

  } catch (error) {
    console.error("Gemini Route Error:", error);
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
  }
}