import { MAX_RETRIES } from "@/data/constant";
import axios from "axios";
import { NextResponse } from "next/server";
import { client } from "@/lib/mongo-client";
import { auth } from "@/lib/auth";  
import { headers } from "next/headers";

const handleGetUserPreference = async (request: Request) => {
  const db = client.db("test");
  const accountsCollection = db.collection("preferences");
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user?.email) return null;

  const user = await accountsCollection.findOne({ email: session.user.email });
  return user?.preferences || null;

};

// Grade the essay, including customization from preferences
const gradeEssay = async (
  essay: string,
  rubric: string,
  customizationNote: string | null = null
) => {
  const systemPrompt = "You are an expert essay grader and a JSON-only response generator.";

  const prompt = `You are an expert essay grader and a JSON-only response generator.

Grade the following essay based on the provided rubric and return a detailed evaluation:

Essay:
${essay}

Rubric:
${rubric}
${customizationNote ? `

Additional Customization Instructions from User Preferences. Take these into account when grading the essay:
${customizationNote}` : ""}

Requirements:
1. Provide a score for each rubric category.
2. Include detailed feedback for each category.
3. Summarize the overall strengths and weaknesses of the essay.

Format:
Return ONLY a valid and complete JSON object in the EXACT structure below — nothing else.

{
  "feedback": {
    "Content & Ideas": "Provide specific, constructive feedback on the depth, originality, and relevance of the content and ideas.",
    "Grammar & Mechanics": "Point out issues with grammar, punctuation, spelling, and sentence structure.",
    "Language & Style": "Evaluate the tone, vocabulary, transitions, and overall clarity of expression."
  },
  "summary": {
    "strengths": "Briefly summarize the strongest aspects of the essay.",
    "weaknesses": "Briefly summarize the most critical weaknesses of the essay."
  }
}

Rules:
- Do NOT include any explanation or notes before or after the JSON.
- Ensure there are no trailing commas or invalid characters.
- The response should be proper JSON that can be parsed by Javascript later on.
`;

  const apiKey = process.env.GROQ_API_KEY;
  let retries = 0;

  while (retries <= MAX_RETRIES) {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const text = response?.data?.choices?.[0]?.message?.content;
      if (!text) throw new Error("No content in response");

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON object found in the response");

      const gradingResult = JSON.parse(jsonMatch[0]);

      gradingResult.feedback ??= {
        "Content & Ideas": "",
        "Grammar & Mechanics": "",
        "Language & Style": "",
      };
      gradingResult.summary ??= {
        strengths: "",
        weaknesses: "",
      };

      return gradingResult;
    } catch (error) {
      retries++;
      if (retries > MAX_RETRIES) {
        console.error("Grading error:", error);
        throw new Error("Failed to generate valid grading result after retries.");
      }
    }
  }
};

// API route handler for POST /grade
export const POST = async (request: Request) => {


  const historyDb = client.db("history");
  const historyCollection = historyDb.collection("history");

  try {
    const { essay, rubric } = await request.json();

    if (!essay || !rubric) {
      return NextResponse.json(
        { error: "Essay and rubric are required." },
        { status: 400 }
      );
    }


        // Get user email from session
        const session = await auth.api.getSession({ headers: await headers() });
        const email = session?.user?.email || 'anonymous';
    
        
    // Get user preferences from DB based on session
    const preferences = await handleGetUserPreference(request);

    // Prepare customization note (stringify if object)
    const customizationNote =
      preferences && typeof preferences === "object"
        ? JSON.stringify(preferences, null, 2)
        : preferences;

    // Grade the essay with optional customization instructions
    const gradingResult = await gradeEssay(essay, rubric, customizationNote);

    await historyCollection.insertOne({
      email,
      prompt: essay,
      response: gradingResult,
      createdAt: new Date(),
      type: "grading",
    });


    return NextResponse.json(gradingResult);
  } catch (error) {
    console.error("POST /grade error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
