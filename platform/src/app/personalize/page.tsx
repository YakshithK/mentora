"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Sparkle } from "lucide-react";

const PersonalizationPage = () => {
  const [feedbacks, setFeedbacks] = useState<string[]>([""]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const analyzeFeedback = async () => {
    try {
      setLoading(true);
      const combinedText = feedbacks.join(" ");

      const res = await fetch("/api/grader-personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: combinedText }),
      });

      const data = await res.json();

      if (res.ok && data?.category_counts) {
        const categories = Object.keys(data.category_counts);
        setImprovements(
          categories.length > 0
            ? categories
            : ["No specific areas detected. Keep up the great work!"]
        );
      } else {
        setImprovements(["No specific areas detected. Keep up the great work!"]);
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setImprovements(["An error occurred. Please try again later."]);
    } finally {
      setLoading(false);
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
      <div className="mx-auto rounded-2xl p-8 max-w-3xl">
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
              className="w-full rounded-lg p-3 resize-none text-purple-900 font-medium border border-purple-300"
            />
          ))}
        </div>

        <button
          onClick={addFeedbackInput}
          className="text-white mb-6 inline-block bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2 font-semibold transition"
        >
          + Add Another Feedback
        </button>

        <Button
          onClick={analyzeFeedback}
          className="flex items-center justify-center space-x-2 w-full mb-6"
          variant="filled"
          disabled={loading}
        >
          <Sparkle />
          <span>{loading ? "Analyzing..." : "Analyze Feedback"}</span>
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
