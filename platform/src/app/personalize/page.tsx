"use client"

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Sparkle } from "lucide-react";

const PersonalizationPage = () => {
  const [feedbacks, setFeedbacks] = useState<string[]>([""]);
  const [improvements, setImprovements] = useState<string[]>([]);

  // Basic keyword-based improvement detection (mock AI)
  const analyzeFeedback = () => {
    const combinedText = feedbacks.join(" ").toLowerCase();

    const improvementKeywords = [
      { keyword: "grammar", area: "Grammar and Language Usage" },
      { keyword: "spelling", area: "Spelling" },
      { keyword: "structure", area: "Essay Structure" },
      { keyword: "clarity", area: "Clarity of Expression" },
      { keyword: "argument", area: "Argument Strength" },
      { keyword: "organization", area: "Organization of Ideas" },
      { keyword: "detail", area: "Detail and Depth" },
      { keyword: "punctuation", area: "Punctuation" },
      { keyword: "thesis", area: "Thesis Development" },
      { keyword: "evidence", area: "Use of Evidence" },
    ];

    const detected = improvementKeywords
      .filter(({ keyword }) => combinedText.includes(keyword))
      .map(({ area }) => area);

    if (detected.length === 0) {
      setImprovements(["No specific areas detected. Keep up the great work!"]);
    } else {
      setImprovements(detected);
    }
  };

  const handleFeedbackChange = (index: number, value: string) => {
    const newFeedbacks = [...feedbacks];
    newFeedbacks[index] = value;
    setFeedbacks(newFeedbacks);
  };

  const addFeedbackInput = () => {
    setFeedbacks([...feedbacks, ""]);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Personalize Your Feedback Analysis</h1>
        <p className="mb-6 text-purple-500">
          Enter teacher feedback below. Our AI will analyze and highlight areas you need to improve the most.
        </p>

        <div className="space-y-4 mb-6">
          {feedbacks.map((fb, idx) => (
            <textarea
              key={idx}
              value={fb}
              onChange={(e) => handleFeedbackChange(idx, e.target.value)}
              rows={4}
              placeholder={`Enter feedback #${idx + 1}`}
              className="w-full rounded-lg p-3 resize-none text-purple-900 font-medium"
            />
          ))}
        </div>

        <button
          onClick={addFeedbackInput}
          className="text-white mb-6 inline-block bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 font-semibold transition"
        >
          + Add Another Feedback
        </button>

        <Button onClick={analyzeFeedback} className="flex items-center justify-center space-x-2 w-full mb-6" variant="filled">
          <Sparkle /> <span>Analyze Feedback</span>
        </Button>

        {improvements.length > 0 && (
          <div className="bg-purple-700 rounded-lg p-4 text-purple-200">
            <h2 className="text-xl font-semibold mb-3">Improvement Areas:</h2>
            <ul className="list-disc list-inside space-y-1">
              {improvements.map((imp, i) => (
                <li key={i}>{imp}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizationPage;
