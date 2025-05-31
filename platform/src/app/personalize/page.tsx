"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Sparkle } from "lucide-react";

interface CategoryFeedback {
  text: string;
  category: string;
  sentimentScore: number;
}

interface ApiResponse {
  categories: CategoryFeedback[];
  feedback: string;
  categoryCounts: Record<string, number>;
}

const PersonalizationPage = () => {
  const [feedback, setFeedback] = useState("");
  const [detailedFeedback, setDetailedFeedback] = useState<CategoryFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [generalFeedback, setGeneralFeedback] = useState("");
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  const analyzeFeedback = async () => {
    try {
      setLoading(true);
      setDetailedFeedback([]);
      setGeneralFeedback("");
      setCategoryCounts({});

      if (!feedback.trim()) {
        setGeneralFeedback("Please enter your feedback before analyzing.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/grader-personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: feedback }),
      });

      const data: ApiResponse = await res.json();

      if (res.ok && data?.categories) {
        setDetailedFeedback(data.categories);
        setGeneralFeedback(data.feedback ?? "");
        setCategoryCounts(data.categoryCounts ?? {});
      } else {
        setGeneralFeedback("No specific areas detected. Keep up the great work!");
        setCategoryCounts({});
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setGeneralFeedback("An error occurred. Please try again later.");
      setCategoryCounts({});
    } finally {
      setLoading(false);
    }
  };

  // Group feedbacks by category for display
  const feedbackByCategory = detailedFeedback.reduce<Record<string, CategoryFeedback[]>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto rounded-2xl p-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Personalize Your Feedback Analysis</h1>
        <p className="mb-6 text-purple-500">
          Enter teacher feedback below. Our AI will analyze and highlight areas you need to improve the most.
        </p>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={6}
          placeholder="Enter your feedback"
          className="w-full rounded-lg p-3 resize-none text-purple-900 font-medium border border-purple-300 mb-6"
        />

        <Button
          onClick={analyzeFeedback}
          className="flex items-center justify-center space-x-2 w-full mb-6"
          variant="filled"
          disabled={loading}
        >
          <Sparkle />
          <span>{loading ? "Analyzing..." : "Analyze Feedback"}</span>
        </Button>

        {/* Display general feedback if no detailed feedback */}
        {!loading && detailedFeedback.length === 0 && generalFeedback && (
          <div className="bg-purple-700 rounded-lg p-4 text-purple-200">
            <p>{generalFeedback}</p>
          </div>
        )}

        {/* Display detailed feedback grouped by category */}
        {detailedFeedback.length > 0 && (
          <div className="bg-purple-700 rounded-lg p-6 text-purple-200">
            <h2 className="text-xl font-semibold mb-4">Improvement Areas with Details:</h2>

            {/* Display category counts */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Feedback Summary by Category:</h3>
              <ul className="list-disc list-inside">
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <li key={category}>
                    <strong>{category}:</strong> {count} {count === 1 ? "item" : "items"}
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed feedback by category */}
            {Object.entries(feedbackByCategory).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-bold underline mb-2">{category}</h3>
                {items.map(({ text, sentimentScore }, i) => (
                  <li key={i} className="flex">
                    <span className="mr-2">•</span>
                    <div>
                      <p>{text}</p>
                      <p className="text-sm italic text-purple-300">
                        Strictness Tone: {sentimentScore.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizationPage;
