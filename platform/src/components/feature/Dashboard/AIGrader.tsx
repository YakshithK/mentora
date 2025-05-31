import Button from '@/components/ui/Button';
import { Sparkle, X, CircleCheckBig } from 'lucide-react';
import React, { useState } from 'react';

const AIGrader = () => {
  const [essay, setEssay] = useState('');
  const [rubric, setRubric] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  interface GradingResult {
    feedback: Record<string, string>;
    summary: {
      strengths: string;
      weaknesses: string;
    };
  }

  const [result, setResult] = useState<GradingResult | null>(null);

  const handleGrade = async () => {
    if (!essay.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/grader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ essay, rubric }),
      });

      const data = await response.json();
      setResult(data);
      setShowFeedback(true); // Show full-screen overlay
    } catch (error) {
      console.error('Error grading essay:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center space-x-3 text-2xl font-bold text-purple-900">
          <CircleCheckBig /> <span>AI Essay Grader</span>
        </h1>
        <p className="text-gray-700 mb-2">
          Paste your essay below and let our AI provide feedback and a grade.
        </p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <textarea
          className="w-3/4 p-4 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 bg-purple-50 text-purple-900 placeholder-purple-400 text-lg"
          placeholder="Type your essay here..."
          rows={8}
          onChange={(e) => setEssay(e.target.value)}
          value={essay}
        />
        <textarea
          className="w-3/4 p-4 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 bg-purple-50 text-purple-900 placeholder-purple-400 text-lg"
          placeholder="Enter grading rubric here..."
          rows={8}
          onChange={(e) => setRubric(e.target.value)}
          value={rubric}
        />
      </div>

      <Button
        className="flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        onClick={handleGrade}
        disabled={loading}
      >
        <Sparkle size={15} /> <span>{loading ? 'Grading...' : 'Grade it!'}</span>
      </Button>

      {showFeedback && result && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-95 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-800">AI Feedback</h2>
            <button onClick={() => setShowFeedback(false)}>
              <X className="w-6 h-6 text-purple-800 hover:text-purple-600" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-800">Feedback</h3>
              <ul className="list-disc list-inside text-purple-900">
                {Object.entries(result.feedback).map(([category, comment]) => (
                  <li key={category}><strong>{category}:</strong> {comment}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-800">Summary</h3>
              <p><strong>Strengths:</strong> {result.summary.strengths}</p>
              <p><strong>Weaknesses:</strong> {result.summary.weaknesses}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGrader;
